import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "react-query";
import API from "../../config/api";
import { Alert } from "react-bootstrap";
import { UserContext } from "../../context/userContext";

const ModalLogin = ({ loginShow, setLoginShow, switchRegister }) => {
  const [login, setIsLogin] = useState(false);
  const [message, setMessage] = useState(null);
  const [state, dispatch] = useContext(UserContext)

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = useMutation(async (event) => {
    try {
      event.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      let result = await API.post("/login", body, config);
      console.log("ini result login", result);

      if (result.data.code === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: result.data.data,
        });

        const alert = (
          <Alert variant="success" className="py-1">
            Success Login
          </Alert>
        );
        setMessage(alert);
        setForm({
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed regist
          </Alert>
        );
        setMessage(alert);
      }
      setIsLogin(true);
      setLoginShow(false);
    } catch (error) {
      let alert = (
        <Alert variant="danger" className="py-1">
          Failed Login
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <Modal show={loginShow} onHide={() => setLoginShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && message}
          <Form onSubmit={(event) => handleSubmit.mutate(event)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center align-center">
          <a
            onClick={switchRegister}
            className="text-decoration-none"
            style={{ cursor: "pointer" }}
          >
            <p className="text-white text-muted">
              Don't have an account? Klik<span className="fw-bold"> Here</span>
            </p>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalLogin;
