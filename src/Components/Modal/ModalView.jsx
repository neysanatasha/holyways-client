import React from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";
import buktiTF from "../../assets/images/bukti.png";
import moment from 'moment'
import convertRupiah from 'rupiah-format'

const ModalView = ({ showView, setShowView, name, date, total, status }) => {
  return (
    <>
      <Modal show={showView} onHide={() => setShowView(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Body>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Donate Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>                  
                  <td>{name}</td>
                  <td>{convertRupiah.convert(total)}</td>
                  <td>{moment(date).format("ddd, DD MMM YYYY  ")}</td>
                  <td className="text-warning">{status}</td>
                </tr>
              </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer className="justify-content-center align-center">
          <Button style={{ width: "100%" }} variant="danger" onClick={() => setShowView(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalView;
