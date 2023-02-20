import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import ListRaiseFund from './ListRaiseFund';
import dataRaiseFund from '../DataDummy/DummyDataRaiseFund';
import {useQuery} from 'react-query'
import API from '../../config/api';

const ContainerRaiseFund = () => {
    let {data: funds} = useQuery("fundsCache",async () => {
        const response = await API.get("/funds")
        console.log("ini response donate",response)

        const resultResponse = response.data.data

        return resultResponse
    })
    return (
        <div>
             <Container className="my-5">
                <Row className="mb-5">
                {funds?.map((item, index) => {
                    return(
                    <Col md={4} key={index}>
                        <ListRaiseFund
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

export default ContainerRaiseFund;