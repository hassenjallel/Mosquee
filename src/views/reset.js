import React from "react";




import axios from 'axios';
import "./login.css";
import { validate } from 'email-validator';
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
const Reset = (props) => {
  const history = useHistory();
  let code = Math.random().toString(36).substring(2);
  let emailDone = false;
  let codeDone = false;
  let i = 0;
  let emailValid="false";
  let CodeValid="false";
let passdValid="false"
  async function valid() {
    console.log("dakhlet lel finc")

    if (emailValid===true) {
      console.log("emailValid")

      document.getElementById("iconCode").style.display = "block"
      document.getElementById("code").style.display = "block"
      document.getElementById("title").innerText = "vérifiez votre e-mail"
      emailDone = true;
     axios.post("http://localhost:5000/Admin/mailResetPassword/" + document.getElementById("email").value + "/" + code).then(resp => {


      })
    }
    if ( CodeValid===true && codeDone === false) {
      codeDone = true;
      document.getElementById("title").innerText = "changez votre mot de passe"

      document.getElementById("iconLock1").style.display = "block"
      document.getElementById("iconLock2").style.display = "block"

      document.getElementById("password1").style.display = "block"
      document.getElementById("password2").style.display = "block"
      let elem =document.getElementById("btnValid")
      elem.parentNode.removeChild(elem);
      document.getElementById("btnUp").style.display = "block"

    }
    if (codeDone === true && emailDone === true) {
      let request = {
        email: document.getElementById("email").value,
        password: document.getElementById("password1").value,
        rep_password: document.getElementById("password2").value,
      }
      if (!passdValid) {
        alert("les deux mot de passe doit être compatible")
      } else if (request.password.length > 0 && request.rep_password.length > 0 && request.password === request.rep_password) {
        alert(document.getElementById("email").value);
        axios.put("http://localhost:5000/Admin/forg-password", request).then(resp => {
          console.log(resp)
          alert("félicitations votre mot de passe a été changé");
          history.push({
            pathname: '/login',
          })

        })

      }
    }


  }
  async function update(e) {
    e.preventDefault();

    let request = {
      email: document.getElementById("email").value,
      password: document.getElementById("password1").value,
      rep_password: document.getElementById("password2").value,
    }
    console.log(request)
    axios.put("http://localhost:5000/Admin/forg-password/"+request.email+"/"+request.password).then(resp => {
      console.log(resp)
      alert("félicitations votre mot de passe a été changé");
      history.push({
        pathname: '/login',
      })

    })


  }
  async function emailValidator(e){
    console.log(e.target.value);
    if(validate(e.target.value)    ){
      document.getElementById("email").style.borderColor="green"
      emailValid=true;

    }else{
      emailValid=false;

      document.getElementById("email").style.borderColor="red"

    }
  }
  async function CodeValidator(e){
    if(code===e.target.value){
      document.getElementById("code").style.borderColor="green"
      CodeValid=true;
    }else{
      CodeValid=false;

      document.getElementById("code").style.borderColor="red"

    }

  }
  async function passwordValid(e){
    if( document.getElementById("password1").value ===e.target.value){
      document.getElementById("password1").style.borderColor="green"
      document.getElementById("password2").style.borderColor="green"
      passdValid=true
    }else{
      passdValid=false

      document.getElementById("password1").style.borderColor="red"
      document.getElementById("password2").style.borderColor="red"

    }
    
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

                  <h3 className="login-heading mb-4" id="title"> ajoutez votre email pour obtenir votre code</h3>
                  <form  >


                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">  <Icon.Envelope /></span>
                      </div>
                      <input type="text" id="email" className="form-control" onChange={emailValidator} placeholder="email" aria-label="Email" aria-describedby="basic-addon1" required />
                      
                    </div>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">  <Icon.Envelope id="iconCode" style={{ display: "none" }} /></span>
                      </div>
                      <input type="text" id="code" style={{ display: "none" }} onChange={CodeValidator} className="form-control" placeholder="code" aria-label="Email" aria-describedby="basic-addon1" required />
                    </div>


                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">  <Icon.Lock id="iconLock1" style={{ display: "none" }} /></span>
                      </div>
                      <input type="text" id="password1" style={{ display: "none" }} className="form-control" placeholder="code" aria-label="Email" aria-describedby="basic-addon1" required />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">  <Icon.Lock id="iconLock2" style={{ display: "none" }} /></span>
                      </div>
                      <input type="text" id="password2" onChange={passwordValid} style={{ display: "none" }} className="form-control" placeholder="code" aria-label="Email" aria-describedby="basic-addon1" required />
                    </div>

                    {/**  <button className="btn btn-lg  btn-block  text-uppercase font-weight-bold mb-2" style={{ backgroundColor: "#FFC312" }} type="submit">CONNECT</button>*/}
                    <input type="button" href="" name="submitvalid" id="btnValid"  onClick={valid}  className="btn btn-lg  btn-block  text-uppercase font-weight-bold mb-2" style={{ backgroundColor: "#FFC312" }} value="valide" />
                    <input type="submit" href="" name="submitupdate"id="btnUp" onClick={update} className="btn btn-lg  btn-block  text-uppercase font-weight-bold mb-2" style={{ backgroundColor: "#FFC312" , display:"none" }} value="enregistrer" />

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

export default Reset;


