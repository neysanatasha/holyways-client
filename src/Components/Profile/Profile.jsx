import React, { useState } from "react";
import "../../css/profile.css";
import pp from "../../assets/images/profile.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useQuery } from "react-query";
import API from "../../config/api";
import moment from "moment";
import convertRupiah from "rupiah-format"

const Profile = () => {
  const [state] = useContext(UserContext);
  const [user, setUser] = useState(null);

  const [transaction, setTransaction] = useState([]);

  let { data: transactions } = useQuery("transactionCache", async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    };

    const response = await API.get(`/check-auth`, config);
    // console.log("response transaction", response);

    const transaction = await API.get(`/user/${response.data?.data?.id}`);

    const resultResponse = transaction.data.data.transaction;
    // const resultResponseFund = transaction.data.data.transaction.fund
    setUser(transaction.data?.data);
    setTransaction(resultResponse);
    console.log("ini result response transaction", resultResponse);
    // console.log("ini result response fund", resultResponseFund);

    return resultResponse;
  });

  console.log("======", transactions);

  return (
    <div className="main-container2">
      <div className="section-1">
        <div className="my-profile fw-bold">My profile</div>
        <div className="side-to-side1">
          <div className="left-side1">
            <img src={pp} alt="" />
          </div>
          <div className="right-side1">
            <div className="text-danger fw-bold">Full Name</div>
            <p>{state.user.fullName}</p>
            <div className="text-danger fw-bold mt-4">Email</div>
            <p>{state.user.email}</p>
            <div className="text-danger fw-bold mt-4">Phone</div>
            <p>{state.user.phone}</p>
          </div>
        </div>
      </div>
      <div className="section-2">
        <div className="history-donation fw-bold">History Donation</div>
        {transactions?.map((item, index) => {
          return (
            <div key={index}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title className="fw-bold">
                    {item?.fund?.title}
                  </Card.Title>
                  <Card.Text>
                    <p className="mt-3"> {moment(item?.startdate).format("dddd, DD MMMM YYYY")}</p>
                  </Card.Text>
                  <Card.Text
                    className="d-flex mt-3 align-center"
                    style={{ width: "100%" }}
                  >
                    <div className="mt-2 text-danger">
                      Total: {convertRupiah.convert(item?.donateAmount)}
                    </div>
                    <div>
                      <p className={item?.status === "success" ? "status text-success" : "status text-warning bg-light fw-bold" }>{item?.status === "success" ? "Finished" : "Pending"}</p>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
