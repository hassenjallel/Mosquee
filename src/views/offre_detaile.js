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
import { useHistory } from "react-router-dom";
import "./offre_detaile.css"
// core components


function Offre_details(props) {


  console.log("props.location.state")

  const history = useHistory();
  console.log(props.location.state)
  let offer = props.location.state;
  let nbr_condidats = offer.condidats.length
  const goToReservation = () => {
    history.push({
      pathname: '/admin/Reservation',
      state: offer // your data array of objects
    });

  }
  const deleteOffre = () => {
    console.log(offer.condidats)
    offer.condidats.map((item) =>


      axios.post("http://localhost:5000/offre/sendemail/" + item.email_condidat + "/" + item.nom_condidat).then(resp => {
        console.log("les emails est bien envoye")
      }).catch(err => {
        console.log(err);
      }),
      console.log("dkhal lel fonction map")
    )

    axios.delete("http://localhost:5000/cours/" + offer.nom_offre).then(resp => {
      console.log("le cours  a ete supprimer");
    }).catch(err => {
      console.log(err);
    })


    history.push({
      pathname: '/admin/consulter_cours',
      state: offer // your data array of objects
    });



  }
  return (
    <>
    <center><h4>offre detaile</h4></center>
      <div className="d-flex justify-content-center container mt-5">
        <div className="card_offre_detaile p-3 bg-white"><i className="fa fa-apple"></i>
          <div className="about-product text-center mt-2"><img src={offer.pictureName} width="600" />
            <div>
              <h4>{offer.nom_mosquee}</h4>
              <h6 className="mt-0 text-black-50">{offer.ville}</h6>
            </div>
          </div>
          <div className="stats mt-2">
            <div className="d-flex justify-content-between p-price"><span>nom offre</span><span>{offer.nom_offre}</span></div>
           
            <div className="d-flex justify-content-between p-price"><span>date debut</span><span>{offer.date_debut}</span></div>
            <div className="d-flex justify-content-between p-price"><span>date fin</span><span>{offer.date_fin}</span></div>
            <div className="d-flex justify-content-between p-price"><span>mail admin</span><span>{offer.mail_admin}</span></div>
            <div className="d-flex justify-content-between p-price"><span>description :</span><span>{offer.description}</span></div>


          </div>
          <div className="d-flex justify-content-between total font-weight-bold mt-4"><span>  {nbr_condidats > 0 && <Button
            className="btn-round"
          
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
                color="primary"
                type="submit"
                onClick={deleteOffre}
              >
                supprimer
              </Button>
            </span></div>
        </div>
      </div>

    
    </>
  );
}

export default Offre_details;
