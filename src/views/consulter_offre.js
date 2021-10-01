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
  FormGroup,

  Row,
  Col,
} from "reactstrap";
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./consulter_offre.css";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import { useHistory } from "react-router-dom";
import GetCookie from "./cookies";
const Consulter_all_offres = (props) => {

  let [alloffres, setAlloffres] = useState([]);
  let [allville, setAllville] = useState([]);
  let [allmosquee, setAllmosquee] = useState([]);
  let [display, setDisplay] = useState(true);
  let [displayMosqueList, setDisplayMosqueList] = useState(false);

  let type = localStorage.getItem("type");
  let nom_mosq = localStorage.getItem("nom_mosquee")

  if (type === "super_admin") {
    nom_mosq = props.children;
  }

  useEffect(() => {
    const getallOffres = async () => {
      if (type === "admin") {
        setDisplay(true)
      }

      axios.get("http://localhost:5000/offre/nom_mosquee/" + nom_mosq).then(resp => {

        setAlloffres(resp.data)

      }).catch(err => {
        console.log(err);
      })



    };

    getallOffres();
  }, []
  );

  alloffres.map((item) => {
    console.log("date with splite " + item.date_debut.split('T')[0])

    item.date_debut = item.date_debut.split('T')[0];
    item.date_fin = item.date_fin.split('T')[0];

  })

  console.log(alloffres)

  const history = useHistory();

  const offreDetails = (item) => {

    history.push({
      pathname: '/admin/offre_detaile',
      state: item// your data array of objects
    });



  }




  return (
    <>



      <div>
        
       
        {display && (
            <div className="container-fluid d-flex justify-content-center">
            <div className="row mt-5">
            {alloffres.map((item) =>
              <Row>
                <Col md="12">
              <div className="d-flex justify-content-center container mt-5">
              <div className="card_consulter_offre p-3 bg-white"><i className="fa fa-apple"></i>
                <div className="about-product text-center mt-2"><img src={item.pictureName} width="300" height="200" />
                  <div>
                    <h4>{item.nom_offre}</h4>

                  </div>
                </div>
                <div className="stats mt-2">
                  <div className="d-flex justify-content-between p-price"><span>date de départ</span><span>{item.date_debut}</span></div>
                  <div className="d-flex justify-content-between p-price"><span>date d'arrivée</span><span>{item.date_fin}</span></div>



                </div>
                
                <center>
                  <div className="mt-4"><span> <Button
                    className="btn-round"
                    style={{ backgroundColor: "#f44336" }}
                    type="submit"
                    onClick={()=>offreDetails(item)}
                  >
                    détails
                  </Button></span></div></center>
              </div>
            </div>
            </Col>
            </Row>
            )}
         
              </div>
              </div>
        )}

      </div>
    </>
  );
}

export default Consulter_all_offres;
