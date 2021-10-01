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
import React, { useRef, useEffect, useState, useContext } from "react";
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
import Link from 'react-scroll'

import axios from 'axios';
import Reservation from "./Reservation";

import { useHistory } from "react-router-dom";
import Consulter_cours from "views/consulter_cours";
import Consulter_offre from "./consulter_offre";
import "./mosquee_detaile.css"
import GetCookie from "./cookies";
function Mosquee_details(props) {
    const divRef = useRef();
    const history = useHistory();
 
    console.log(props.location.state)
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
    let [allcours, setAllcours] = useState(false);
    let [alloffres, setAlloffres] = useState([]);
    let [displayOffre, setDisplayOffre] = useState(false);
    let [displaycours, setDisplaycours] = useState(false);
    let type = localStorage.getItem("type");
    function getalloffre() {

        setDisplayOffre(true)
        setDisplaycours(false)

    }
    function getallcours() {
        setDisplayOffre(false)
        setDisplaycours(true)
        window.scrollTo(3000, 1500);


    }
    async function banMosquee(pseudo) {


        axios.put("http://localhost:5000/Admin/ban_mosquee/" + mosquee.pseudo).then(resp => {
            console.log(resp);
            history.push({
                pathname: '/admin/consulter_mosquee',

            });


        }).catch(err => {
            console.log(err);
        })





    }
    async function gotoupdateMosque() {
        history.push({
            pathname: '/admin/update_mosquee',
            state: mosquee
        });
    }
    async function reactiver(pseudo) {


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
            <center><h4> mosquee detaile</h4></center>

            <div className="d-flex justify-content-center container mt-5">
                <div className="card_mosquee p-3 bg-white">
                    <div className="float-right">
                        <i className="nc-icon nc-settings-gear-65  " onClick={gotoupdateMosque} />
                    </div>
                    <div className="about-product text-center mt-2">

                        <img src={mosquee.pictureName} width="600" />
                        <div>
                            <h4>{mosquee.nom_mosquee}</h4>
                            <h6 className="mt-0 text-black-50">{mosquee.ville}</h6>
                        </div>
                    </div>
                    <div className="stats mt-2">
                        <div className="d-flex justify-content-between p-price"><span>email</span><span>{mosquee.email}</span></div>
                        <div className="d-flex justify-content-between p-price"><span>numero d'imem</span><span>{mosquee.numero_telephone}</span></div>
                        <div className="d-flex justify-content-between p-price"><span>nom d'imem:</span><span>{mosquee.nom}</span></div>
                        <div className="d-flex justify-content-between p-price"><span>prenom d'imem:</span><span>{mosquee.prenom}</span></div>
                        <div className="d-flex justify-content-between p-price"><span>cin d'imem:</span><span>{mosquee.cin}</span></div>


                    </div>

                    <div className="d-flex justify-content-between total font-weight-bold mt-4"><span>

                        <Button
                            className="btn-round"
                            style={{ backgroundColor: "#f44336" }}
                            type="submit"
                            onClick={getalloffre}
                        >
                            offres
                        </Button>
                    </span>

                        <span>
                            <Button
                                className="btn-round"
                                style={{ backgroundColor: "#f44336" }}
                                type="submit"
                                onClick={getallcours}
                                
                            >
cours                            </Button></span>
                    </div>
                </div>
            </div>


            {displayOffre &&
            <section id="displayCours">
                
                <Consulter_offre id="consulter_offre">{mosquee.nom_mosquee}</Consulter_offre>
                </section>
                
            }
            {displaycours &&
                <Consulter_cours>{mosquee.nom_mosquee}</Consulter_cours>
            }
        </>
    );
}

export default Mosquee_details;
