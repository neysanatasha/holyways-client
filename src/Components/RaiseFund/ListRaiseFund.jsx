import React from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useNavigate } from 'react-router-dom';


const ListRaiseFund = ({id,thumbnail, title, desc, fund}) => {
    let navigate = useNavigate()
    return (
        <Card className='rounded border-0 bg-light text-dark'>
        <Card.Img variant="top" src={'http://localhost:5000/uploads/'+thumbnail} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <p className='text-muted'>{desc}</p>
            <div>
                <ProgressBar now={20} variant="danger" />
            </div>
            <div className="d-flex mt-3 align-center justify-content-center" style={{width:"100%"}}>
                <div className="mt-2">
                    Rp {fund}
                </div>
                <div>
                    <button onClick={()=> navigate(`/detail-donation/${id}`)} className="text-light bg-danger fw-bold" style={{padding:"5px 30px 5px", border:"none", borderRadius:"8px", marginLeft:"120px"}}>
                        View Fund
                    </button>
                </div>
            </div>
        </Card.Body>
        </Card>
    );
};

export default ListRaiseFund;