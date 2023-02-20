import React from "react";
import ContainerRaiseFund from "./ContainerRaiseFund";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const MainPage = () => {
  let navigate = useNavigate()

  return (
    <div style={{ width: "100%" }}>
      <div className="d-flex  justify-content-between" style={{ marginTop: "50px", padding:"0 120px" }}>
        <div style={{}}>
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>My Raise Fund</p>
        </div>
        <div className="" style={{ }}>
          <Button className="bg-danger fw-bold" style={{border:"none"}} onClick={() => navigate('/add-raisefund')} >Make Raise Fund</Button>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <ContainerRaiseFund />
      </div>
    </div>
  );
};

export default MainPage;
