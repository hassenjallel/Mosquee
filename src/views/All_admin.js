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

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  Table,
  Row,
  Col,
  Input
} from "reactstrap";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import GetCookie from "./cookies";
function All_admin() {
  const history = useHistory();


  let [alladmin, setAlladmin] = useState([]);
const [search , setSerach]=useState('')
  useEffect(() => {
    const getallAdmin = async () => {


      axios.get("http://localhost:5000/Admin").then(resp => {

        setAlladmin(resp.data)

      }).catch(err => {
        console.log(err);
      })



    };

    getallAdmin();
  }, []
  );



  async function deleteAdmin(item) {


    axios.delete("http://localhost:5000/Admin/" + item.pseudo).then(resp => {
      console.log(resp);
      window.location.reload();

    }).catch(err => {
      console.log(err);
    })
    axios.delete("http://localhost:5000/offre/nom_mosque/" + item.nom_mosquee).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err);
    })

    axios.put("http://localhost:5000/cours/nom_mosque/" + item.nom_mosquee).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err);
    })





  }
  async function banAdmin(pseudo) {


    axios.put("http://localhost:5000/Admin/ban_mosquee/" + pseudo).then(resp => {
      console.log(resp);
      window.location.reload();


    }).catch(err => {
      console.log(err);
    })





  }

  async function reactiver(pseudo) {
console.log("hahha")
console.log(pseudo)
    axios.put("http://localhost:5000/Admin/reactiver_mosquee/" + pseudo).then(resp => {
        console.log(resp);
        window.location.reload();




    }).catch(err => {
    })
  




}
const filtredAdmins = alladmin.filter(admin=>{
  return admin.pseudo.toLowerCase().includes(search.toLowerCase())
})
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <center>     <CardTitle tag="h4"> consulter  tous les admins</CardTitle>  </center>
                        <center><Input onChange={e=>setSerach(e.target.value)} placeholder="chercher avec pseudo" style={{width:"300px"}}/></center>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>pseudo</th>
                      <th> email</th>
                      <th>nom mosquee</th>
                      <th>nom</th>
                      <th>prenom</th>
                      <th>cin</th>
                      <th>supprimer</th>
                      <th>desactiver/reactiver</th>

                    </tr>
                  </thead>
                  {filtredAdmins.map((item) =>
                    <tbody>
                      <tr>
                        <td>{item.pseudo}</td>
                        <td>{item.email}</td>
                        <td>{item.nom_mosquee}</td>
                        <td>{item.nom}</td>
                        <td>{item.prenom}</td>
                        <td>{item.cin}</td>

                        <td>
                          <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                            onClick={() => deleteAdmin(item)}
                          >
                            supprimer
                          </Button>
                        </td>
                        {item.verifier === "true" && (
                          <td>

                            <Button
                              className="btn-round"
                              color="primary"
                              type="submit"
                              onClick={() => banAdmin(item.pseudo)}
                            >
                              desactiver
                            </Button>


                          </td>
                        )}
                        {item.verifier === "false" && (
                          <td>

                            <Button
                              className="btn-round"
                              color="primary"
                              type="submit"
                              onClick={() => reactiver(item.pseudo)}
                            >
                              reactiver
                            </Button>


                          </td>
                        )}      </tr>

                    </tbody>
                  )}
                </Table>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    </>
  );
}

export default All_admin;
