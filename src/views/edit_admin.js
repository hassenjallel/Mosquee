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
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
import axios from 'axios';
import { useHistory } from "react-router-dom";

function EditUser() {
    const history = useHistory();

    const pseudo = localStorage.getItem("pseudo");
    function edituser() {

        let request = {
            pseudo: document.getElementById("pseudo").value,
            email: document.getElementById("email").value,
            mot_de_passe: document.getElementById("mot_de_passe").value,

            nom: document.getElementById("nom_admin").value,
            prenom: document.getElementById("prenom").value,
            cin: document.getElementById("cin").value,
        }
       

        const config = { Headers: { "content-type": "application/json" } };
        axios.put("http://localhost:5000/Admin/" + pseudo, request, config).then(resp => {
            localStorage.setItem("pseudo",request.pseudo)
            localStorage.setItem("email",request.email)
            localStorage.setItem("mot_de_passe",request.mot_de_passe)
            localStorage.setItem("nom",request.nom)
            localStorage.setItem("prenom",request.prenom)
            localStorage.setItem("cin",request.cin)
            history.push({
                pathname: 'profil',

            });
        }).catch(err => {
            console.log(err);
        })



    };


    return (
        <>
            <div className="content">
                <Row>

                    <Col md="8">
                        <Card className="card-user">
                            <CardHeader>
                                <center> <CardTitle tag="h5">votre profil </CardTitle></center>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label> pseudo</label>
                                                <Input
                                                    id="pseudo"

                                                    defaultValue={localStorage.getItem("pseudo")}
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pl-1" md="6">
                                            <FormGroup>
                                                <label htmlFor="exampleInputEmail1">
                                                    email
                                                </label>
                                                <Input id="email"
                                                    defaultValue={localStorage.getItem("email")}

                                                    type="email" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>mot de passe</label>
                                                <Input
                                                    defaultValue={localStorage.getItem("mot_de_passe")}
                                                    id="mot_de_passe"


                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <FormGroup>
                                                <label>nom</label>
                                                <Input
                                                    defaultValue={localStorage.getItem("nom")}

                                                    id="nom_admin"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <FormGroup>
                                                <label>prenom</label>
                                                <Input
                                                    defaultValue={localStorage.getItem("prenom")}
                                                    id="prenom"

                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pl-1" md="4">
                                            <FormGroup>
                                                <label>cin </label>
                                                <Input type="text"
                                                    id="cin"


                                                    defaultValue={localStorage.getItem("cin")} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <a href="#" onClick={edituser} className="btn btn-lg  btn-block  text-uppercase font-weight-bold mb-2" style={{ backgroundColor: "#FFC312" }}>
                                                update
                                            </a>
                                        </div>

                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default EditUser;
