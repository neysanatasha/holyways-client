import React from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import {useMutation} from 'react-query'
import API from "../../config/api";

const AddRaiseFund = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null); // preview Foto

  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    goals: "",
    description: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.type === "file" ? event.target.files : event.target.value,
    });

    if (event.type === "file") {
      let url = URL.createObjectURL(event.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (event) => {
    try {
      event.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };
      
      const formData = new FormData();
      formData.set("title", form?.title)
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name)
      formData.set("goals", form?.goals)
      formData.set("description", form?.description)
      console.log(form);
      
      const response = await API.post("/fund", formData, config);
      console.log("ini response raise fund",response);

      navigate("/raisefund");

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
    <div style={{ margin: "5rem 10rem" }}>
      <div className="mb-5" style={{ fontSize: "30px" }}>
        Make Raise Fund
      </div>
      <Form onSubmit={(event) => handleSubmit.mutate(event)}>
        <Form.Group className="mb-3" controlId="">
          <Form.Control className="bg-light" type="text" name="title" onChange={handleChange} placeholder="Title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFund">
          <Form.Label
            className=" bg-danger text-light fw-bold px-1 py-1"
            style={{
              borderRadius: "8px",
              border: "1px solid",
              cursor: "pointer",
            }}
          >
            {" "}
            Attache Thumbnail
          </Form.Label>
          <Form.Control
            type="file"
            name="thumbnail"
            onChange={handleChange}
            className="bg-dark"
            hidden
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="">
          <Form.Control
            className="bg-light"
            type="number"
            name="goals"
            onChange={handleChange}
            placeholder="Goals Donation"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Control
            className="bg-light"
            as="textarea"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            style={{ height: "200px", resize: "none" }}
          />
        </Form.Group>
        <div className="d-flex justify-content-end mt-5">
          <Button
            variant="danger"
            className="text-light fw-bold px-5"
            type="submit"
          >
            Public Fundraising
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddRaiseFund;
