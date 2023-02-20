import React, { useEffect, useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import { Modal, Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import API from "../../config/api";

const ModalDonate = ({ showDonate, setShowDonate, funds }) => {
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();

  // console.log("zzzzzzzzzzzz", funds);

  const [form, setForm] = useState({
    donateAmount: 0,
  });

  const { donateAmount } = form;

  const handleChange = (e) => {
      setForm((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        fund_id : funds?.id,

      }))
  }

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey =process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handlePayment = useMutation(async (event) => {
    try {
      event.preventDefault();
      let result = await API.post("/transaction", form, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      });
      console.log(result);

      // create variable token for store token payment from response here
      const token = result.data.data.token;

      setForm({
        donateAmount: null,
      })

      // init snap for display payment page with token here
      window.snap.pay(token, {
        onSuccess: function (result) {
          navigate("/detail-donation");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          navigate("/detail-donation");
        },
        onError: function (result) {
          /* You may add your own implementation here */
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("You closed the popup without finishing the payment");
        },
      });
    } catch (err) {
      console.log("masuk sin iga",err);
    }
  });

  return (
    <>
      <Modal show={showDonate} onHide={() => setShowDonate(false)}>
        <Modal.Body>
          <Form onSubmit={(event) => handlePayment.mutate(event)}>
            <Form.Group
              className="mb-3 mt-3"
              controlId="donateAmount"
            >
              <Form.Control
                type="number"
                placeholder="Nominal Donation"
                name="donateAmount"
                value={form.donateAmount}
                onChange={handleChange}
                className="bg-light"
                autoFocus
              />
            </Form.Group>
            {/* <Form.Group className="mb-3 d-flex" controlId="formBasicDonate">
              <Form.Label
                className=" bg-danger text-light fw-bold px-3 py-1 mt-3"
                style={{
                  borderRadius: "8px",
                  border: "1px solid",
                  cursor: "pointer",
                }}
              >
                {" "}
                Attache Payment <FaFileInvoice variant="light" style={{fontSize:"20px"}}/>
              </Form.Label>
              <Form.Control
                type="file"
                name="thumbnailPayment"
                className="bg-dark"
                hidden
              />
              <div className="w-55 ps-2 mt-4">
                <p className="text-muted" style={{fontSize:"11px"}}>*transfers can be made to holyways accounts</p>
              </div>
            </Form.Group> */}
          <Button style={{ width: "100%" }} variant="danger" type="submit">
            Donate
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDonate;
