import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import convertRupiah from "rupiah-format";

const ListDonate = ({ name, date, total, status }) => {
  return (
    <div>
      {status === "success" ? (
        <Card className="mb-3 bg-light">
          <Card.Body>
            <Card.Title className="fw-bold">{name}</Card.Title>
            <Card.Text>
              <p className="mt-3">
                {moment(date).format("dddd, DD MMMM YYYY")}
              </p>
            </Card.Text>
            <Card.Text>
              <div className="text-danger">
                Total: {convertRupiah.convert(total)}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListDonate;
