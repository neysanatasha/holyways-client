import React from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useNavigate } from 'react-router-dom';
import convertRupiah from 'rupiah-format'
import { Button } from 'react-bootstrap';

const ListDonate = ({id,thumbnail, title, desc, fund}) => {
    let  navigate = useNavigate()

    return (
        <Card className='rounded border-0 bg-light text-dark '>
        <Card.Img variant="top" src={'http://localhost:5000/uploads/'+thumbnail}  style={{height:"250px", objectFit:"cover"}}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <p className='text-muted'>{desc}</p>
            <div>
                <ProgressBar now={30} variant="danger" />
            </div>
            <div className="d-flex mt-3 align-center justify-content-between" style={{width:"100%"}}>
                <div className="mt-2">
                    {convertRupiah.convert(fund)}
                </div>
                <div>
                    <Button onClick={()=> navigate(`/detail-donation/${id}`)} className="text-light bg-danger fw-bold" style={{padding:"5px 30px 5px", border:"none", borderRadius:"8px"}}>
                        Donate
                    </Button>
                    {/* <button onClick={()=> navigate(`/detail-donation/${id}`)} className="text-light bg-danger fw-bold" style={{padding:"5px 30px 5px", border:"none", borderRadius:"8px", marginLeft:"150px"}}>
                        Donate
                    </button> */}
                </div>
            </div>
        </Card.Body>
        </Card>
    );
};

export default ListDonate;