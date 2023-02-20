import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ListDonate from "./ListDonate";
import dataListDonate from "../DataDummy/DataDummyListDonate";
import { UserContext } from "../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../config/api";
import {useQuery} from "react-query"
import { useState } from "react";

const ContainerListDonate = () => {
  const [state] = useContext(UserContext);
  let navigate = useNavigate();
  const [visible, setVisible] = useState(3)
  const { fund_id } = useParams();
  
  const handleLoadMore = () => {
    setVisible((prev) => prev + 3)
  }

  const [dataApproved, setDataApproved] = useState([])

  let { data: fundsListApproved } = useQuery("detailCache", async () => {
    const response = await API.get("/fund/" + fund_id);
    console.log("ini response list donate approved", response.data.data?.transaction);
  setDataApproved(response.data.data?.transaction)

    return response.data.data?.transaction;
  });

  console.log("ini fund list",fundsListApproved)


  return (
    <div>
      <Container className="my-5">
        <p className="fw-bold" style={{ fontSize: "30px" }}>
          List Donation ({fundsListApproved?.length})
        </p>
        <Row className="mb-5">
          {dataApproved?.slice(0, visible).map((item, index) => {
            return (
              <Col md={12} key={index}>
                <ListDonate
                  name={item?.user?.fullName}
                  date={item?.startdate}
                  total={item?.donateAmount}
                  status={item?.status}
                />
              </Col>
            );
          })}
            <Button className="bg-transparent text-danger fw-bolder" onClick={handleLoadMore} style={{border:"none"}}>
              Load More
            </Button>
        </Row>
      </Container>
    </div>
  );
};

export default ContainerListDonate;
