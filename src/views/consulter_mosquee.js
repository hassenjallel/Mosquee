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
// core components
import {
    dashboard24HoursPerformanceChart,
    dashboardEmailStatisticsChart,
    dashboardNASDAQChart,
} from "variables/charts.js";
import { useHistory } from "react-router-dom";
import "./consulter_mosquee.css"
import GetCookie from "./cookies";
function Consulter_all_mosquee() {
    const history = useHistory();

  
    let type = localStorage.getItem("type");
    let [allville, setAllville] = useState([]);
    let [allmosquee, setAllmosquee] = useState([]);
    let [display, setDisplay] = useState(false);
    let [displayMosqueList, setDisplayMosqueList] = useState(false);
    useEffect(() => {
        const get_all_ville_mosquee = async () => {
            axios.get("http://localhost:5000/Admin/all/villes").then(resp => {
                setAllville(resp.data)
            console.log(resp.data)
            }).catch(err => {
                console.log(err);
            })

        }

        get_all_ville_mosquee();
    }, []
    );





    function handleChange(e) {
        console.log(e.target.innerHTML)
        setDisplayMosqueList(true);
        axios.get("http://localhost:5000/Admin/all_mosquee/" + e.target.innerHTML).then(resp => {

            setAllmosquee(resp.data)
            console.log(allmosquee)
        }).catch(err => {
            console.log(err);
        })


    }

    const mosqueeDetails = (item) => {
        history.push({
            pathname: '/admin/mosquee-detail',
            state: item// your data array of objects
        });



    }


    return (
        <>

            <Row style={{ margin: "70px" }}>
                <FormGroup style={{ width: "250px", height: "40px" }}>
                    <label>ville</label>
                    <Autocomplete
                        id="ville"
                        options={allville}

                        renderInput={(params) => <TextField {...params} variant="standard" className="form-control" style={{ width: "300px" }}
                        />}
                        onChange={handleChange}
                    />
                </FormGroup>

            </Row>

            {displayMosqueList && (
                    <div className="container-fluid d-flex justify-content-center">
                    <div className="row mt-5">
                    {allmosquee.map((item) =>
                      <Row>
                        <Col md="12">
                      <div className="d-flex justify-content-center container mt-5">
                      <div className="card_consulter_cours p-3 bg-white"><i className="fa fa-apple"></i>
                        <div className="about-product text-center mt-2"><img src={item.pictureName} width="300" height="200" />
                          <div>
                            <h4>{item.nom_mosquee}</h4>
        
                          </div>
                        </div>
                        <div className="stats mt-2">
                          <div className="d-flex justify-content-between p-price"><span>email</span><span>{item.email}</span></div>
                          <div className="d-flex justify-content-between p-price"><span>numero d'imem</span><span>{item.numero_telephone}</span></div>
                          <div className="d-flex justify-content-between p-price"><span>verifier</span><span>{item.verifier}</span></div>

        
        
                        </div>
                        
                        <center>
                          <div className="mt-4"><span> <Button
                            className="btn-round"
                            style={{ backgroundColor: "#f44336" }}
                            type="submit"
                            onClick={()=>mosqueeDetails(item)}
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
        
              


        </>
    );
}

export default Consulter_all_mosquee;
