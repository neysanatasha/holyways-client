import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "react-query";
import { UserContext } from "../../context/userContext";
import API from "../../config/api";
import { Alert } from "react-bootstrap";

const ModalRegister = ({ registShow, setRegistShow, switchLogin }) => {
  const [message, setMessage] = useState(null);
  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });
  const { fullName, phone, email, password } = form;

  const handleChange = (e) => {
    setForm((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = useMutation(async (event) => {
    try {
      event.preventDefault();
      // Configuration content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
        // Data body
        const body = JSON.stringify(form);

        // Insert data ke database
        let result = await API.post("/register", body, config);
        // console.log("ini result", result.data.code);

        // Notifikasi
        if (result.data.code === 200) {
          const alert = (
            <Alert variant="success" className="py-1">
              Success Register
            </Alert>
          );
          setMessage(alert);
          setForm({
            fullName: "",
            phone: "",
            email: "",
            password: "",
          });
          // switchLogin()
        } else {
          const alert = (
            <Alert variant="danger" className="py-1">
              Failed regist
            </Alert>
          );
          setMessage(alert);
        }
        setRegistShow(false);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });


  return (
    <>
      <Modal show={registShow} onHide={() => setRegistShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && message}
          <Form onSubmit={(event) => handleSubmit.mutate(event)}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Control
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                className="bg-light"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Control
                type="number"
                placeholder="Phone Number"
                name="phone"
                value={phone}
                onChange={handleChange}
                className="bg-light"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                className="bg-light"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                className="bg-light"
                autoFocus
              />
            </Form.Group>
          <Button style={{ width: "100%" }} variant="danger" type="submit">
            Register
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center align-center">
          <a
            onClick={switchLogin}
            className="text-decoration-none"
            style={{ cursor: "pointer" }}
          >
            <p className="text-white text-muted">
              Already have an account? Klik
              <span className="fw-bold"> Here</span>
            </p>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalRegister;
