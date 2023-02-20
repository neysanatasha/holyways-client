import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import ListDonate from './ListDonate';
import dataDonate from "../DataDummy/DummyData"
import {useQuery} from 'react-query'
import API from '../../config/api';

const ContainerDonate = () => {
    let {data: funds} = useQuery("fundsCache",async () => {
        const response = await API.get("/funds")
        console.log("ini response donate",response)

        const resultResponse = response.data.data

        return resultResponse
    })
    return (
        <div>
            <Container className="my-5">
                <h3 className="text-danger text-center fw-bold" style={{marginTop:"300px"}}>Donate Now</h3>
                <Row>
                {funds?.map((item, index) => {
                    return(
                    <Col md={4} key={index}>
                        <ListDonate 
                            id={item.id}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            desc={item.description}
                            fund={item.goals}
                        />
                    </Col>
                    )
                })}
                </Row>
            </Container>
        </div>
    );
};

export default ContainerDonate;