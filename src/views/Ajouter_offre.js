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
import React,{useState} from "react";

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
const Ajouter_offre = () => {
  const history = useHistory();
 
  let offrepicture = "";
  let nom_mosquee = localStorage.getItem("nom_mosquee");
  console.log(nom_mosquee)
  let [nomOffreCheck, setNomOffreCheck] = useState();

  function fileselect(event) {

    const fileList = event.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = (event) => {



      offrepicture = event.target.result;


    }



  }

  function ajouter_un_offre(e) {
    e.preventDefault();
    let request = {
      nom_offre: document.getElementById("nom_offre").value,
      description: document.getElementById("description").value,
      type: document.getElementById("type_offres").value,
      mail_admin: document.getElementById("mail_admin").value,
      imagename: offrepicture,
      date_debut: document.getElementById("date_debut").value,
      date_fin: document.getElementById("date_fin").value,
      nbr_personnes: document.getElementById("nbr_personne").value,
      nom_mosquee: document.getElementById("nom_mosquee").value,
      prix: document.getElementById("prix").value,
      ville:localStorage.getItem("ville"),
    }
    console.log(request);
    if((nomOffreCheck===false) && (request.date_debut !=="") && (request.date_fin!=="") && (request.nbr_personnes!=="")&& (request.prix!=="") && (request.description!=="")&& (request.imagename!=="")){
    axios.post("http://localhost:5000/offre/", request).then(resp => {
      history.push({
        pathname: '/admin/consulter_offres',
  
      });
    }).catch(err => {
      console.log(err);
    })}else{
      alert("quelque chose ne va pas s'il vous plaît vérifier vos informations")
    }
  }
  async function Nom_offreVerif(e){
    axios.get("http://localhost:5000/offre/getoffrebyname/" + e.target.value).then(resp => {
      console.log(resp.data )

      if (resp.data=="mawjoud"){
        console.log("mawjoud")
       document.getElementById("NomOffreVerifie").innerText=" nom offre est deja existe"
       document.getElementById("NomOffreVerifie").style.color="red"
       setNomOffreCheck(true);
      }else{
        console.log("hah")
        document.getElementById("NomOffreVerifie").innerText="valide"
      document.getElementById("NomOffreVerifie").style.color="green"
      setNomOffreCheck(false)
      }
     }).catch(err => {
       console.log(err);
     })
  
  }
  return (
    <>
      <div className="content">
        <Row>

          <Col md="8">
            <Card className="card-user">
              <CardHeader>
              <center> <CardTitle tag="h5">ajouter offre </CardTitle>  </center>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label> nom de l'offre</label>
                        <Input
                          id="nom_offre"
                          placeholder="nom offre"
                          type="text"
                          onChange={Nom_offreVerif}

                        />
                            <label id="NomOffreVerifie"  htmlFor="exampleInputEmail1">
                          
                          </label>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>type de l'offre</label>
                        <select name="type_offre" id="type_offres" style={{ width: "100%", height: "35px", borderRadius: "4px", position: "relative", backgroundColor: "rgba(255,255,255,0.3)", transition: "0.3s all" }}>
                          <option value="haja" selected="selected">haja</option>
                          <option value="omra">omra</option>

                        </select>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                        e-mail de l'administrateur
                        </label>
                        <Input id="mail_admin" placeholder="Email" value={localStorage.getItem("email")} type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Date de départ</label>
                        <Input
                          id="date_debut"
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label> date d'arrivée</label>
                        <Input
                          id="date_fin"
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>nombre de personne</label>
                        <Input
                          id="nbr_personne"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>nom de mosquée</label>
                        <Input
                          id="nom_mosquee"
                          value={ nom_mosquee }
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>prix d'offre</label>
                        <Input
                          id="prix"
                          placeholder="prix"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label>image </label>
                        <Input type="file" onChange={fileselect} />
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
                        onClick={ajouter_un_offre}
                      >
                        ajouter offre
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

export default Ajouter_offre;
