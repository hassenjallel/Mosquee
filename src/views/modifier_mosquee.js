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

import GetCookie from "./cookies";
const Update_mosquee = (props) => {
  const history = useHistory();


  let mosquee = props.location.state;
  let activer;
  let desactiver;
  if (mosquee.verifier === "true") {
    desactiver = true;
    activer = false
  } else {
    activer = true;
    desactiver = false
  }
  let mosqueepicture = "null";

  function fileselect(event) {

    const fileList = event.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = (event) => {



      mosqueepicture = event.target.result;
console.log(mosqueepicture)

    }



  }

  function update_mosquee(e) {

    e.preventDefault();
    var r = window.confirm("Etes vous sur de vouloir Modifier");
    console.log(r)
    if (r == true) {
      if (mosqueepicture === "null") {

        mosqueepicture = mosquee.pictureName;
    }
      let request = {
        pseudo: document.getElementById("pseudo").value,
        email: document.getElementById("email").value,
        mot_de_passe: document.getElementById("mot_de_passe").value,
        pictureName: mosqueepicture,

        nom_mosquee: document.getElementById("nom_mosquee").value,
        nom: document.getElementById("nom_admin").value,
        prenom: document.getElementById("prenom").value,
        cin: document.getElementById("cin").value,

        numero_telephone: document.getElementById("numero").value,
      }

      axios.put("http://localhost:5000/Admin/super_admin/mosque/" + mosquee.pseudo, request).then(resp => {
        history.push({
          pathname: '/admin/consulter_mosquee',

        });
      }).catch(err => {
        console.log(err);
      })



    };
  }

  async function banMosquee(e) {
    e.preventDefault();


    axios.put("http://localhost:5000/Admin/ban_mosquee/" + mosquee.pseudo).then(resp => {
      console.log(resp);
      history.push({
        pathname: '/admin/consulter_mosquee',

      });


    }).catch(err => {
      console.log(err);
    })





  }

  async function reactiver(e) {

    e.preventDefault();

    axios.put("http://localhost:5000/Admin/reactiver_mosquee/" + mosquee.pseudo).then(resp => {
      console.log(resp);
      history.push({
        pathname: '/admin/consulter_mosquee',

      });



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
                <center><CardTitle tag="h5">modifier  mosquee </CardTitle> </center>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label> pseudo</label>
                        <Input
                          id="pseudo"
                          defaultValue={mosquee.pseudo}
                          type="text"
                        />
                      </FormGroup>
                    </Col>

                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          email
                        </label>
                        <Input id="email" defaultValue={mosquee.email} placeholder="Email" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>mot de passe</label>
                        <Input
                          placeholder="mot de passe"
                          defaultValue={mosquee.mot_de_passe}
                          id="mot_de_passe"
                          type="text"
                        />
                      </FormGroup>
                    </Col>

                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>nom mosquee</label>
                        <Input
                          placeholder="nom mosquee"
                          defaultValue={mosquee.nom_mosquee}
                          id="nom_mosquee"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>numéro de téléphone</label>
                        <Input
                          placeholder="numéro de téléphone"
                          defaultValue={mosquee.numero_telephone}
                          id="numero"
                          type="number"
                        />
                      </FormGroup>
                    </Col>


                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>image de mosquee</label>

                        <div class="custom-file" style={{ height: "38px" }} >
                          <input type="file" class="custom-file-input" id="file" onChange={fileselect} style={{ height: "38px" }} />
                          <label class="custom-file-label" for="file" style={{ height: "38px" }} >image de mosquee</label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>nom</label>
                        <Input
                          placeholder="nom"
                          defaultValue={mosquee.nom}
                          id="nom_admin"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>prenom</label>
                        <Input
                          placeholder="prenom"
                          defaultValue={mosquee.prenom}
                          id="prenom"
                          type="text"
                        />
                      </FormGroup>
                    </Col>

                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>cin </label>
                        <Input type="text" id="cin" defaultValue={mosquee.cin} placeholder="cin" />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <a href="#" onClick={update_mosquee} className="btn btn-lg  btn-block  text-uppercase font-weight-bold mb-2" style={{ backgroundColor: "#FFC312" }}>
                        enregistrer
                      </a>
                    </div>
                    {desactiver && (
                      <div className="update ml-auto mr-auto">
                        <a href="#" onClick={banMosquee} className="btn btn-lg  btn-block  text-uppercase font-weight-bold mb-2" style={{ backgroundColor: "#FFC312" }}>
                          desactiver
                        </a>
                      </div>

                    )}
                    {activer && (
                      <div className="update ml-auto mr-auto">
                        <a href="#" onClick={reactiver} className="btn btn-lg  btn-block  text-uppercase font-weight-bold mb-2" style={{ backgroundColor: "#FFC312" }}>
                          reactiver
                        </a>
                      </div>

                    )}

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

export default Update_mosquee;
