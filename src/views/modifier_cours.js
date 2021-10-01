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
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from "react-router-dom";
import GetCookie from "./cookies";
const Modifier_cours = (props) => {
    const history = useHistory();
    let [nomCoursCheck, setNomCoursCheck] = useState();

    let cours = props.location.state;
    console.log(cours)
    let courspicture = "null";
    let nom_mosquee = localStorage.getItem("nom_mosquee");
    console.log(nom_mosquee)
    function fileselect(event) {

        const fileList = event.target.files;

        let reader = new FileReader();
        reader.readAsDataURL(fileList[0]);
        reader.onload = (event) => {



            courspicture = event.target.result;


        }



    }

    function modifier_un_cours(e) {
        e.preventDefault();

        var r = window.confirm("Etes vous sur de vouloir Modifier!");
        console.log(r)
        if (r == true) {



            if (courspicture === "null") {

                courspicture = cours.pictureName;
            }
            let request = {
                _id: cours._id,
                nom_cours: document.getElementById("nom_cours").value,
                description: document.getElementById("description").value,
                mail_admin: cours.mail_admin,
                pictureName: courspicture,
                date_debut: document.getElementById("date_debut").value,
                date_fin: document.getElementById("date_fin").value,
                nbr_personnes: document.getElementById("nbr_personne").value,
                nom_mosquee: cours.nom_mosquee,
                ville: cours.ville,
                condidats: cours.condidats

            }
            console.log(request);
            cours.condidats.map((item) =>
                axios.post("http://localhost:5000/cours/sendemailOnUpdate/" + item.email_condidat + "/" + item.nom_condidat, request).then(resp => {
                    console.log("les emails est bien envoye")
                }).catch(err => {
                    console.log(err);
                }),
                console.log("dkhal lel fonction map")
            )

            if (nomCoursCheck === false && request.description !== "" && request.imagename !== "" && request.nbr_personnes !== "" && request.date_debut !== "" && request.date_fin !== "") {

                axios.put("http://localhost:5000/cours/" + cours._id, request).then(resp => {

                    history.push({
                        pathname: 'cours-detaile',
                        state: request
                    });
                }).catch(err => {
                    console.log(err);
                })
            } else {
                alert("quelque chose ne va pas s'il vous plaît vérifier vos informations")

            }
        }
    }
    async function Nom_CoursVerif(e) {
        if (e.target.value === cours.nom_cours) {
            document.getElementById("NomCoursVerifie").innerText = " valide"
            document.getElementById("NomCoursVerifie").style.color = "green"
            setNomCoursCheck(false)

        } else {
            axios.get("http://localhost:5000/cours/getcoursbyname/" + e.target.value).then(resp => {
                console.log(resp.data)

                if (resp.data == "mawjoud") {
                    console.log("mawjoud")
                    document.getElementById("NomCoursVerifie").innerText = " nom offre est deja existe"
                    document.getElementById("NomCoursVerifie").style.color = "red"
                    setNomCoursCheck(true);
                } else {
                    console.log("hah")
                    document.getElementById("NomCoursVerifie").innerText = "valide"
                    document.getElementById("NomCoursVerifie").style.color = "green"
                    setNomCoursCheck(false)
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
                                <center>  <CardTitle tag="h5">modifier cours </CardTitle>  </center>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label> nom de cours</label>
                                                <Input
                                                    id="nom_cours"
                                                    placeholder="nom cours"
                                                    type="text"
                                                    defaultValue={cours.nom_cours}
                                                    onChange={Nom_CoursVerif}

                                                />
                                                <label id="NomCoursVerifie" htmlFor="exampleInputEmail1">

                                                </label>
                                            </FormGroup>
                                        </Col>


                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>date début de cours</label>
                                                <Input
                                                    id="date_debut"
                                                    type="date"
                                                    defaultValue={cours.date_debut}

                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <FormGroup>
                                                <label>date fin de cours</label>
                                                <Input
                                                    id="date_fin"
                                                    type="date"
                                                    defaultValue={cours.date_fin}

                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>nombre de personne</label>
                                                <Input
                                                    id="nbr_personne"
                                                    type="number"
                                                    defaultValue={cours.nbr_personnes}

                                                />
                                            </FormGroup>
                                        </Col>


                                        <Col className="pl-1" md="6">
                                            <FormGroup>
                                                <label>image </label>
                                                <div class="custom-file" style={{ height: "38px" }} >
                                                    <input type="file" class="custom-file-input" id="file" onChange={fileselect} style={{ height: "38px" }} />
                                                    <label class="custom-file-label" for="file" style={{ height: "38px" }} >image </label>
                                                </div>                      </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>description </label>
                                                <Input
                                                    id="description"
                                                    type="textarea"
                                                    placeholder="description"
                                                    defaultValue={cours.description}

                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                className="btn-round"
                                                color="primary"
                                                type="submit"
                                                onClick={modifier_un_cours}
                                            >
                                                enregistrer
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

export default Modifier_cours;
