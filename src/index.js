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
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cours_details from "views/cours_detaile";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Offre_detaile from "views/offre_detaile";

import AdminLayout from "layouts/Admin.js";
import Login from "views/login";
import Edit_Profil from "views/edit_admin";
let rot =document.getElementById("root");
console.log(rot)
ReactDOM.render(
  <BrowserRouter>
  <main>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
   
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/offre_detaile" render={(props) => <Offre_detaile {...props} />} />
    </Switch>
    </main>
  </BrowserRouter>,
  document.getElementById("root")
  
);
