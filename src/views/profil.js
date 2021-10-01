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
import GetCookie from "./cookies";
import { useHistory } from "react-router-dom";

function User() {
    const history = useHistory();
  
   
    let type = localStorage.getItem("type")
    function goToEditprofil() {
        history.push({
            pathname: 'edit_profil',

        });
    }



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
                                                    placeholder="pseudo"
                                                    value={localStorage.getItem("pseudo")}
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
                                                    placeholder="Email"
                                                    value={localStorage.getItem("email")}
                                                    type="email" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <FormGroup>
                                                <label>mot de passe</label>
                                                <Input
                                                    placeholder="mot de passe"
                                                    id="mot_de_passe"
                                                    value={localStorage.getItem("mot_de_passe")}

                                                    type="password"
                                                />
                                            </FormGroup>
                                        </Col>
                                        {type === "admin" && (
                                            <>
                                                <Col className="pr-1" md="4">
                                                    <FormGroup>
                                                        <label>mosquee</label>
                                                        <Input
                                                            placeholder="mot de passe"
                                                            id="mot_de_passe"
                                                            value={localStorage.getItem("nom_mosquee")}

                                                            type="text"
                                                        />
                                                    </FormGroup>

                                                </Col>
                                                <Col className="pr-1" md="4">
                                                    <FormGroup>
                                                        <label>ville</label>
                                                        <Input
                                                            placeholder="ville"
                                                            id="ville"
                                                            value={localStorage.getItem("ville")}

                                                            type="text"
                                                        />
                                                    </FormGroup>

                                                </Col>
                                            </>
                                          )  }


                                    </Row>

                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <FormGroup>
                                                <label>nom</label>
                                                <Input
                                                    placeholder="nom"
                                                    value={localStorage.getItem("nom")}

                                                    id="nom admin"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <FormGroup>
                                                <label>prenom</label>
                                                <Input
                                                    placeholder="prenom"
                                                    id="prenom"
                                                    value={localStorage.getItem("prenom")}

                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pl-1" md="4">
                                            <FormGroup>
                                                <label>cin </label>
                                                <Input type="text"
                                                    id="cin"
                                                    value={localStorage.getItem("cin")}

                                                    placeholder="cin" />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                className="btn-round"
                                                color="primary"
                                                type="submit"
                                                onClick={goToEditprofil}
                                            >
                                                modifier
                                            </Button>
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

export default User;
