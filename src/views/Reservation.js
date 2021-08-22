import "./Reservation.css";
import axios from 'axios';
import React, { useState, useContext } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
const Reservation = (props) => {


    let list = props.location.state.condidats;
 

    return (
        <>
            <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
              <center>  <CardTitle tag="h4">All Reservation</CardTitle>  </center>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>nom condidat</th>
                      <th>prenom condidat</th>
                      <th>email_condidat</th>
                      <th>numero_condidat</th>
                      <th>cin_condidat</th>

                    </tr>
                  </thead>
                  {list.map((item) =>
                  <tbody>
                    <tr>
                      <td>{item.nom_condidat}</td>
                      <td>{item.prenom_condidat}</td>
                      <td>{item.email_condidat}</td>
                      <td>{item.numero_condidat}</td>
                      <td>{item.cin_condidat}</td>

                    </tr>
                   
                  </tbody>
                  )}
                </Table>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
        </>

    )
}
export default Reservation;