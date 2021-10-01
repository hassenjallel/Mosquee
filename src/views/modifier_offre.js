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
import { useHistory } from "react-router-dom";
import GetCookie from "./cookies";
const Modifier_offre = (props) => {
  let offre = props.location.state;
  const history = useHistory();
  let [nomOffreCheck, setNomOffreCheck] = useState();

  let offrepicture = "null";
  let nom_mosquee = localStorage.getItem("nom_mosquee");
  console.log(nom_mosquee)
  function fileselect(event) {

    const fileList = event.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = (event) => {



      offrepicture = event.target.result;


    }



  }

  function modifier_un_offre(e) {
    e.preventDefault();
    var r = window.confirm("Etes vous sur de vouloir Modifier!");
    console.log(r)
    if (r == true) {
      if (offrepicture === "null") {

        offrepicture = offre.pictureName;
      }
      let request = {
        _id: offre._id,
        nom_offre: document.getElementById("nom_offre").value,
        description: document.getElementById("description").value,
        type: document.getElementById("type_offres").value,
        mail_admin: offre.mail_admin,
        pictureName: offrepicture,
        date_debut: document.getElementById("date_debut").value,
        date_fin: document.getElementById("date_fin").value,
        nbr_personnes: document.getElementById("nbr_personne").value,
        nom_mosquee: offre.nom_mosquee,
        prix: document.getElementById("prix").value,
        ville: localStorage.getItem("ville"),
        condidats: offre.condidats,
      }

      offre.condidats.map((item) =>
        axios.post("http://localhost:5000/offre/sendemailOnUpdate/" + item.email_condidat + "/" + item.nom_condidat, request).then(resp => {
          console.log("les emails est bien envoye")
        }).catch(err => {
          console.log(err);
        }),
        console.log("dkhal lel fonction map")
      )
      console.log(request);
      if ((nomOffreCheck === false) && (request.date_debut !== "") && (request.date_fin !== "") && (request.nbr_personnes !== "") && (request.prix !== "") && (request.description !== "") && (request.imagename !== "")) {

        axios.put("http://localhost:5000/offre/" + offre._id, request).then(resp => {
          history.push({
            pathname: 'offre_detaile',
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
    if (e.target.value === offre.nom_offre) {
      document.getElementById("NomOffreVerifie").innerText = " valide"
      document.getElementById("NomOffreVerifie").style.color = "green"
      setNomOffreCheck(false)

    } else {
      axios.get("http://localhost:5000/offre/getoffrebyname/" + e.target.value).then(resp => {
        console.log(resp.data)

        if (resp.data == "mawjoud") {
          console.log("mawjoud")
          document.getElementById("NomOffreVerifie").innerText = " nom offre est deja existe"
          document.getElementById("NomOffreVerifie").style.color = "red"
          setNomOffreCheck(true);
        } else {
          console.log("hah")
          document.getElementById("NomOffreVerifie").innerText = "valide"
          document.getElementById("NomOffreVerifie").style.color = "green"
          setNomOffreCheck(false)
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
                <center> <CardTitle tag="h5">modifier offre </CardTitle>  </center>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label> nom d'offre</label>
                        <Input
                          id="nom_offre"
                          defaultValue={offre.nom_offre}
                          type="text"
                          onChange={Nom_CoursVerif}
                        />
                        <label id="NomOffreVerifie" htmlFor="exampleInputEmail1">

                        </label>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>type d'offre</label>
                        <select name="type_offre" id="type_offres" Value={offre.type} style={{ width: "100%", height: "35px", borderRadius: "4px", position: "relative", backgroundColor: "rgba(255,255,255,0.3)", transition: "0.3s all" }}>
                          <option value="haja" selected="selected">haja</option>
                          <option value="omra">omra</option>

                        </select>
                      </FormGroup>
                    </Col>

                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>date de départ</label>
                        <Input
                          id="date_debut"
                          type="date"
                          defaultValue={offre.date_debut}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>date d'arrivée</label>
                        <Input
                          id="date_fin"
                          type="date"
                          defaultValue={offre.date_fin}

                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>nombre de personne</label>
                        <Input
                          id="nbr_personne"
                          type="number"
                          defaultValue={offre.nbr_personnes}

                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>prix d'offre</label>
                        <Input
                          id="prix"
                          placeholder="prix"
                          type="number"
                          defaultValue={offre.prix}

                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>image </label>
                        <div class="custom-file" style={{ height: "38px" }} >
                          <input type="file" class="custom-file-input" id="file" onChange={fileselect} style={{ height: "38px" }} />
                          <label class="custom-file-label" for="file" style={{ height: "38px" }} >image de mosquee</label>
                        </div>
                      </FormGroup>
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
                          defaultValue={offre.description}

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
                        onClick={modifier_un_offre}
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

export default Modifier_offre;
