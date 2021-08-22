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
import React, { useEffect, useState, useContext } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import axios from 'axios';
import Reservation from "./Reservation";
// core components
import { useHistory } from "react-router-dom";


function Cours_details(props) {

  const history = useHistory();

  console.log(props.location.state)
  let cour = props.location.state;
  let nbr_condidats = cour.condidats.length

  const goToReservation = () => {
    history.push({
      pathname: '/admin/Reservation',
      state: cour // your data array of objects
    });

  }


  const deleteCours = () => {
    console.log(cour.condidats)
    cour.condidats.map((item) =>


      axios.post("http://localhost:5000/offre/sendemail/" + item.email_condidat + "/" + item.nom_condidat).then(resp => {
        console.log("les emails est bien envoye")
      }).catch(err => {
        console.log(err);
      }),
      console.log("dkhal lel fonction map")
    )

    axios.delete("http://localhost:5000/cours/" + cour.nom_cours).then(resp => {
      console.log("le cours  a ete supprimer");
    }).catch(err => {
      console.log(err);
    })


    history.push({
      pathname: '/admin/consulter_cours',
      state: cour // your data array of objects
    });



  }
  return (
    <>

      <center><h4>cours detaile</h4></center>
      <div className="d-flex justify-content-center container mt-5">
        <div className="card_offre_detaile p-3 bg-white"><i className="fa fa-apple"></i>
          <div className="about-product text-center mt-2"><img src={cour.pictureName} width="600" />
            <div>
              <h4>{cour.nom_mosquee}</h4>
              <h6 className="mt-0 text-black-50">{cour.ville}</h6>
            </div>
          </div>
          <div className="stats mt-2">
            <div className="d-flex justify-content-between p-price"><span>nom cour</span><span>{cour.nom_cours}</span></div>

            <div className="d-flex justify-content-between p-price"><span>date debut</span><span>{cour.date_debut}</span></div>
            <div className="d-flex justify-content-between p-price"><span>date fin</span><span>{cour.date_fin}</span></div>
            <div className="d-flex justify-content-between p-price"><span>mail admin</span><span>{cour.mail_admin}</span></div>
            <div className="d-flex justify-content-between p-price"><span>description :</span><span>{cour.description}</span></div>


          </div>
          <div className="d-flex justify-content-between total font-weight-bold mt-4"><span>  {nbr_condidats > 0 && <Button
            className="btn-round"
            color="primary"

            type="submit"
            onClick={goToReservation}
          >
            Reservation
          </Button>
          }</span>
            <span>

              <Button
                style={{ backgroundColor: "#f44336" }}
                className="btn-round"
                color="red"
                type="submit"
                onClick={deleteCours}
              >
                supprimer
              </Button>
            </span></div>
        </div>
      </div>
    </>
  );
}

export default Cours_details;
