import React from "react";




import axios from 'axios';
import "./login.css";

import * as Icon from 'react-bootstrap-icons';
import { useHistory } from "react-router-dom";
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
const Login = () => {
  const history = useHistory();
  localStorage.removeItem('nom_mosquee');
  localStorage.removeItem('type');
  localStorage.removeItem('nom');
  localStorage.removeItem('prenom');
  localStorage.removeItem('cin');
  localStorage.removeItem('email');
  localStorage.removeItem('pseudo');
  localStorage.removeItem('mot_de_passe');
  async function Signin(e) {


    e.preventDefault();
    const config = { Headers: { "content-type": "application/json" } };
    let request = {
      pseudo: document.getElementById("pseudo").value,
      mot_de_passe: document.getElementById("password").value,
    }
    axios.post("http://localhost:5000/Admin/login", request, config).then(resp => {

      console.log(resp);
      if (resp.data.user.verifier ==="true") {
        localStorage.setItem('nom_mosquee', resp.data.user.nom_mosquee);
        localStorage.setItem('type', resp.data.user.type);
        localStorage.setItem('nom', resp.data.user.nom);
        localStorage.setItem('prenom', resp.data.user.prenom);
        localStorage.setItem('cin', resp.data.user.cin);
        localStorage.setItem('email', resp.data.user.email);
        localStorage.setItem('pseudo', resp.data.user.pseudo);
        localStorage.setItem('ville', resp.data.user.ville);
        history.push({
          pathname: '/admin/profil',
          state: resp.data // your data array of objects
        });
      } else {
        alert("vous avez banni de la part de superviseur , svp contact le superviseur")
      }
    }).catch(err => {
      alert("svp  verife votre mot de passe ou pseudo")
    })

  }

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="d-none d-md-flex col-md-4 col-lg-7 bg-image"></div>
        <div className="col-md-8 col-lg-5">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">Sign In!</h3>
                  <form  >


                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">  <Icon.Envelope /></span>
                      </div>
                      <input type="text" id="pseudo" className="form-control" placeholder="pseudo" aria-label="Email" aria-describedby="basic-addon1" />
                    </div>


                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">  <Icon.Lock /></span>
                      </div>
                      <input type="text" id="password" className="form-control" placeholder="mot_de_passe" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>

                    <div className="text-center">
                      <a className="small" href="" >Forgot password?</a></div>
                    {/**  <button className="btn btn-lg  btn-block  text-uppercase font-weight-bold mb-2" style={{ backgroundColor: "#FFC312" }} type="submit">CONNECT</button>*/}
                    <input type="submit" href="" name="submit" onClick={Signin} className="btn btn-lg  btn-block  text-uppercase font-weight-bold mb-2" style={{ backgroundColor: "#FFC312" }} value="CONNECT" />

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;


