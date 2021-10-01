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
import React , {useState} from "react";

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
const Ajouter_cours=()=> {
  const history = useHistory();
 
  let offrepicture="null";
  let nom_mosquee= localStorage.getItem("nom_mosquee");
  let [nomCoursCheck, setNomCoursCheck] = useState();

  console.log(nom_mosquee)
  function fileselect(event) {

    const fileList = event.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = (event) => {
        
       
            
        offrepicture = event.target.result;
        

    }



}

function ajouter_un_cours(e) {
  e.preventDefault();

  let request = {
      nom_cours:document.getElementById("nom_cours").value,
      description:document.getElementById("description").value,
      mail_admin:document.getElementById("mail_admin").value,
      imagename:offrepicture,
      date_debut:document.getElementById("date_debut").value,
      date_fin:document.getElementById("date_fin").value,
      nbr_personnes:document.getElementById("nbr_personne").value,
      nom_mosquee:document.getElementById("nom_mosquee").value,
      ville:localStorage.getItem("ville"),

  }
  console.log(request);
  if(nomCoursCheck===false && request.description!=="" && request.imagename!=="" && request.nbr_personnes!=="" && request.date_debut!=="" && request.date_fin!==""){

  axios.post("http://localhost:5000/cours/", request ).then(resp => {
            alert("le cours est bien ajouter")
            history.push({
              pathname: '/admin/consulter_cours',
        
            });
        }).catch(err => {
            console.log(err);
        })
      }else{
        alert("quelque chose ne va pas s'il vous plaît vérifier vos informations")


      }
}
async function Nom_CoursVerif(e){
  axios.get("http://localhost:5000/cours/getcoursbyname/" + e.target.value).then(resp => {
    console.log(resp.data )

    if (resp.data=="mawjoud"){
      console.log("mawjoud")
     document.getElementById("NomCoursVerifie").innerText=" nom offre est deja existe"
     document.getElementById("NomCoursVerifie").style.color="red"
     setNomCoursCheck(true);
    }else{
      console.log("hah")
      document.getElementById("NomCoursVerifie").innerText="valide"
    document.getElementById("NomCoursVerifie").style.color="green"
    setNomCoursCheck(false)
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
              <center>  <CardTitle tag="h5">ajouter cours </CardTitle>  </center>
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
                          onChange={Nom_CoursVerif}
                        />
                          <label id="NomCoursVerifie"  htmlFor="exampleInputEmail1">
                          
                          </label>
                      </FormGroup>
                    </Col>
                    
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                        e-mail de l'administrateur
                        </label>
                        <Input id="mail_admin" defaultValue={localStorage.getItem("email")} placeholder="Email" type="email" />
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
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>date fin de cours</label>
                        <Input
                         id="date_fin"
                          type="date"
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
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>nom de mosquee</label>
                        <Input
                        id="nom_mosquee"
                        value={nom_mosquee}
                        type="text"
                        />
                      </FormGroup>
                    </Col>
                  
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>image </label>
                        <Input  type="file"  onChange={fileselect} />
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
                        onClick={ajouter_un_cours}
                      >
                        ajouter cours
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

export default Ajouter_cours;
