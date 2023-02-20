import React, { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ListViewFund from "./ListViewFund";
import dataViewFund from "../DataDummy/DataDummyViewFund";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../context/userContext";
import API from "../../config/api";

const ContainerViewFund = () => {
  const [state] = useContext(UserContext);
  let navigate = useNavigate();
  const { fund_id } = useParams();
  const [statusPending, setStatusPending] = useState([])

  let { data: fundsListPending } = useQuery("detailCache", async () => {
    const response = await API.get("/fund/" + fund_id);
    console.log("ini response list donate pending",response.data.data?.transaction);
    // setDataPending(response.data.data?.transaction);
    const resultResponsePending = response.data.data.transaction
    
    console.log("ini data pending", resultResponsePending);
    return resultResponsePending;
  });

  return (
    <>
        <Container className="my-5">
          <p className="fw-bold" style={{ fontSize: "30px" }}>
            Donation has not been approved (1)
          </p>
          <Row className="mb-5">
            {fundsListPending?.map((item, index) => {
              return ( 
                <Col md={12} key={index}>
                  <ListViewFund
                    name={item.user?.fullName}
                    date={item.startdate}
                    total={item.donateAmount}
                    status={item.status}
                  />
                </Col>
              );
            })}
          </Row> 
        </Container>
    </>
  );
};

export default ContainerViewFund;
