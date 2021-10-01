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
import React, { useState } from "react";

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
import { validate } from 'email-validator';

import axios from 'axios';
import { useHistory } from "react-router-dom";
import GetCookie from "./cookies";
function EditUser() {
    const history = useHistory();
  
    let [Admincheck, setAdminCheck] = useState(false);
    let [passwordcheck, setpasswordCheck] = useState(false);
    let [pseudocheck, setpseudoCheck] = useState(false);
    const pseudo = localStorage.getItem("pseudo");
    function edituser(e) {
        e.preventDefault();

        var r = window.confirm("Etes vous sur de vouloir Modifier!");
        console.log(r)
        if (r == true) {
        let request = {
            pseudo: document.getElementById("pseudo").value,
            email: document.getElementById("email").value,
            mot_de_passe: document.getElementById("mot_de_passe").value,
            numero_telephone: document.getElementById("numero").value,
            nom: document.getElementById("nom_admin").value,
            prenom: document.getElementById("prenom").value,
            cin: document.getElementById("cin").value,
        }


        const config = { Headers: { "content-type": "application/json" } };
        if(Admincheck===false && passwordcheck===true  && pseudocheck===false){

        axios.put("http://localhost:5000/Admin/" + pseudo, request, config).then(resp => {
            localStorage.setItem("pseudo", request.pseudo)
            localStorage.setItem("email", request.email)
            localStorage.setItem("mot_de_passe", request.mot_de_passe)
            localStorage.setItem("nom", request.nom)
            localStorage.setItem("prenom", request.prenom)
            localStorage.setItem("cin", request.cin)
            localStorage.setItem("numero_telephone", request.numero_telephone)

            history.push({
                pathname: 'profil',

            });
        }).catch(err => {
            console.log(err);
        })
    }else{
            alert("quelque chose ne va pas s'il vous plaît vérifier vos informations")

        }
    }

    };
    async function emailVerif(e) {
        if (e.target.value === localStorage.getItem("email")) {
            document.getElementById("emailVerifie").innerText = " valide"
            document.getElementById("emailVerifie").style.color = "green"
        } else {
            axios.get("http://localhost:5000/Admin/" + e.target.value).then(resp => {
                if (resp.data.length > 0) {

                    document.getElementById("emailVerifie").innerText = " email est deja existe"
                    document.getElementById("emailVerifie").style.color = "red"
                    setAdminCheck(true);
                } else {
                    setAdminCheck(false);

                }
            }).catch(err => {
                console.log(err);
            })

            if (!validate(e.target.value)) {
                document.getElementById("emailVerifie").innerText = "invalide format email"
                document.getElementById("emailVerifie").style.color = "red"

            } else {
                document.getElementById("emailVerifie").innerText = " valide"
                document.getElementById("emailVerifie").style.color = "green"

            }

        }
    }
    async function passwordCheck(e) {
        if (e.target.value.length < 8) {
            document.getElementById("passowrdVerifie").innerText = "la longueur du mot de passe doit être supérieure à 8"
            document.getElementById("passowrdVerifie").style.color = "red"
            setpasswordCheck(false)

        } else {
            document.getElementById("passowrdVerifie").innerText = "valide"
            document.getElementById("passowrdVerifie").style.color = "green"
            setpasswordCheck(true)


        }
    }
    async function pseudoVerif(e) {
        if (e.target.value === localStorage.getItem("pseudo")) {
            document.getElementById("pseudoVerifie").innerText = " valide"
            document.getElementById("pseudoVerifie").style.color = "green"
        } else {
            axios.get("http://localhost:5000/Admin/pseudo/" + e.target.value).then(resp => {
                if (resp.data.length > 0) {

                    document.getElementById("pseudoVerifie").innerText = " pseudo est deja existe"
                    document.getElementById("pseudoVerifie").style.color = "red"
                    setpseudoCheck(true);
                } else {
                    document.getElementById("pseudoVerifie").innerText = "valide"
                    document.getElementById("pseudoVerifie").style.color = "green"
                    setpseudoCheck(false)
                }
            }).catch(err => {
                console.log(err);
            })
        }
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
                                                    onChange={pseudoVerif}
                                                    defaultValue={localStorage.getItem("pseudo")}
                                                    type="text"
                                                />
                                                <label id="pseudoVerifie" htmlFor="exampleInputEmail1">

                                                </label>
                                            </FormGroup>
                                        </Col>

                                        <Col className="pl-1" md="6">
                                            <FormGroup>
                                                <label htmlFor="exampleInputEmail1">
                                                    email
                                                </label>
                                                <Input id="email"
                                                    defaultValue={localStorage.getItem("email")}
                                                    onChange={emailVerif}
                                                    type="email" />
                                                <label id="emailVerifie" htmlFor="exampleInputEmail1">

                                                </label>
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
                                                    onChange={passwordCheck}
                                                    type="password"
                                                />
                                                <label id="passowrdVerifie" htmlFor="exampleInputEmail1">

                                                </label>
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>numero </label>
                                                <Input
                                                    defaultValue={localStorage.getItem("numero_telephone")}
                                                    id="numero"
                                                    required

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
                                                    required
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
                                                    required
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pl-1" md="4">
                                            <FormGroup>
                                                <label>cin </label>
                                                <Input type="text"
                                                    id="cin"

                                                    required
                                                    defaultValue={localStorage.getItem("cin")} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <a href="#" onClick={edituser} className="btn btn-lg  btn-block  text-uppercase font-weight-bold mb-2" style={{ backgroundColor: "#FFC312" }}>
                                            enregistrer  
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
