/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import GetCookie from "./cookies";
import { useHistory } from "react-router-dom";
function Tables() {
  const history = useHistory();


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
  );
}

export default Tables;
