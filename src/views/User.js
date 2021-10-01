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
import React , { useEffect, useState, useContext }from "react";

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
import GetCookie from "./cookies";
import { useHistory } from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function User() {
  let mosqueepicture="null";
  const history = useHistory();

  function fileselect(event) {

    const fileList = event.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = (event) => {
        
       
            
        mosqueepicture = event.target.result;
        

    }



}  
let [Admincheck, setAdminCheck] = useState(false);
let [passwordcheck, setpasswordCheck] = useState(false);
let [mosqueecheck, setmosqueeCheck] = useState(false);
let [pseudocheck, setpseudoCheck] = useState(false);


  const villes = ['Paris', 'Nice', 'Bordeaux', 'Lyon', 'Marseille', 'Toulouse', 'Lille', 'Nantes', 'Strasbourg', 'Monpellier',
    'Rennes', 'Angers', 'Dijon', 'Grenoble', 'Saint-Etienne', 'Brest', 'Le Havre', 'Reims', 'Caen', 'Metz'
    , 'Toulon', 'Aix-en-Provence', 'Nimes', 'Tours', 'Nancy', 'Rouen', 'Clermont-Ferrand', 'Le Mans',
    'Besancon', 'Avignon', 'La Rochelle', 'Poitiers', 'Mulhouse', 'Limoges', 'Orleans', 'Annecy', 'Perpignan',
    'Amiens', 'Creteil', 'Pau', 'Saint-Denis', 'Dunkerque', 'Bayonne', 'Chambery', 'Villeurbanne', 'Montreuil',
    'Lorient', 'Aubervilliers', 'Roubaix', 'Vitry-Sur-Seine', 'Tourcoing']
  function adduser() {
    let request = {
      pseudo: document.getElementById("pseudo").value,
      email: document.getElementById("email").value,
      mot_de_passe: document.getElementById("mot_de_passe").value,
      ville: document.getElementById("vills_box").value,
      nom_mosquee: document.getElementById("nom_mosquee").value,
      nom: document.getElementById("nom_admin").value,
      prenom: document.getElementById("prenom").value,
      cin: document.getElementById("cin").value,
      imagename:mosqueepicture,
      numero_telephone :document.getElementById("numero").value,
    }
    const config = { Headers: { "content-type": "application/json" } };
    if(Admincheck===false && passwordcheck===true && mosqueecheck===false && pseudocheck===false){
    axios.post("http://localhost:5000/Admin/add_user", request).then(resp => {
      history.push({
        pathname: 'list_admin',

      });
    }).catch(err => {
      console.log(err);
    })
  }else {
    alert("quelque chose ne va pas s'il vous plaît vérifier vos informations")
  }


  };
  async function emailVerif(e){
  axios.get("http://localhost:5000/Admin/" + e.target.value).then(resp => {
   if (resp.data.length>0){

    document.getElementById("emailVerifie").innerText=" email est deja existe"
    document.getElementById("emailVerifie").style.color="red"
    setAdminCheck(true);
   }else{
    setAdminCheck(false);

   }
  }).catch(err => {
    console.log(err);
  })

  if(!validate(e.target.value)    ){
    document.getElementById("emailVerifie").innerText="invalide format email"
    document.getElementById("emailVerifie").style.color="red"

  }else{
    document.getElementById("emailVerifie").innerText=" valide"
    document.getElementById("emailVerifie").style.color="green"

  }
  

}
async  function passwordCheck(e){
  if(e.target.value.length<8){
    document.getElementById("passowrdVerifie").innerText="la longueur du mot de passe doit être supérieure à 8"
    document.getElementById("passowrdVerifie").style.color="red"
    setpasswordCheck(false)

  }else{
    document.getElementById("passowrdVerifie").innerText="valide"
    document.getElementById("passowrdVerifie").style.color="green"
    setpasswordCheck(true)


  }
}
 function nomMosqueeCheck(e){
  axios.get("http://localhost:5000/Admin/nom_mosque/" + e.target.value).then(resp => {
    if (resp.data.length>0){
 
     document.getElementById("mosqueeVerifie").innerText=" mosquee est deja existe"
     document.getElementById("mosqueeVerifie").style.color="red"
     setmosqueeCheck(true);
    }else{
      document.getElementById("mosqueeVerifie").innerText="valide"
    document.getElementById("mosqueeVerifie").style.color="green"
      setmosqueeCheck(false)
    }
   }).catch(err => {
     console.log(err);
   })

   
 
}
async function pseudoVerif(e){
  axios.get("http://localhost:5000/Admin/pseudo/" + e.target.value).then(resp => {
    if (resp.data.length>0){
 
     document.getElementById("pseudoVerifie").innerText=" pseudo est deja existe"
     document.getElementById("pseudoVerifie").style.color="red"
     setpseudoCheck(true);
    }else{
      document.getElementById("pseudoVerifie").innerText="valide"
    document.getElementById("pseudoVerifie").style.color="green"
    setpseudoCheck(false)
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
                <center><CardTitle tag="h5">ajouter admin </CardTitle> </center>
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
                          type="text"
                          onChange={pseudoVerif}
                        />
                        <label id="pseudoVerifie"  htmlFor="exampleInputEmail1">
                          
                          </label>
                      </FormGroup>
                    </Col>

                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          email
                        </label>
                        <Input id="email" onChange={emailVerif} placeholder="Email" type="email" />
                        <label id="emailVerifie"  htmlFor="exampleInputEmail1">
                          
                        </label>
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
                          type="text"
                          onChange={passwordCheck}
                        />
                        <label id="passowrdVerifie"  htmlFor="exampleInputEmail1">
                          
                          </label>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <Autocomplete

                          id="vills_box"
                          options={villes}
                          renderInput={(params) => <TextField {...params} variant="standard" label=" Ville"  style={{ width: "250px", height: "50px", }} />}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>nom mosquee</label>
                        <Input
                          placeholder="nom mosquee"
                          id="nom_mosquee"
                          type="text"
                          onChange={nomMosqueeCheck}
                        />
                          <label id="mosqueeVerifie"  htmlFor="exampleInputEmail1">
                          
                          </label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>numéro de téléphone</label>
                        <Input
                          placeholder="numéro de téléphone"
                          id="numero"
                          type="number"
                        />
                      </FormGroup>
                    </Col>


                    <Col className="pl-1" md="6">
                      <FormGroup>
                      <label>image de mosquee</label>

                        <div class="custom-file" style={{height:"38px"}} >
                          <input type="file" class="custom-file-input" id="file" onChange={fileselect}  style={{height:"38px"}} />
                          <label class="custom-file-label" for="file" style={{height:"38px"}} >image de mosquee</label>
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
                          id="prenom"
                          type="text"
                        />
                      </FormGroup>
                    </Col>

                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>cin </label>
                        <Input type="text" id="cin" placeholder="cin" />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <a href="#" onClick={adduser}   className="btn btn-lg  btn-block  text-uppercase font-weight-bold mb-2" style={{ backgroundColor: "#FFC312" }}>
                        ajouter
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

export default User;
