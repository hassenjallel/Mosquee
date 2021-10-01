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
import consulter_cours from "views/consulter_cours";
import consulter_offres from "views/consulter_offre";
import cours_detaile from "views/cours_detaile";
import Offre_detaile from "views/offre_detaile";
import Login from "views/login";

import Ajouteroffre from "views/Ajouter_offre";
import Ajoutercours from "views/Ajouter_cours";
import profil from "views/profil";
import edit_profil from "views/edit_admin";

import Reservation from "views/Reservation";
import List_admin from "views/All_admin";
import Add_user from "views/User";
import LogOut from "views/login";
import Consulter_mosquee from"views/consulter_mosquee";
import Mosquee_details from "views/mosquee_detail";
import Update_mosquee from "views/modifier_mosquee";
import Modifier_offre from "views/modifier_offre";
import Modifier_cours from "views/modifier_cours";
  var routesAdmin = [
    {
      path: "/profil",
      name: "profil",
      icon: "fas fa-user",
      component: profil,
      layout: "/admin",
    },
  

    {
      path: "/ajouter_offre",
      name: "ajouter offer",
      icon: "nc-icon nc-simple-add",
      component: Ajouteroffre,
      layout: "/admin",
    },
    {
      path: "/ajouter_cours",
      name: "ajouter cours",
      icon: "nc-icon nc-simple-add",
      component: Ajoutercours,
      layout: "/admin",
    },

    {
      path: "/consulter_cours",
      name: "consulter_cours",
      icon: "nc-icon nc-bank",
      component: consulter_cours,
      layout: "/admin",
    },

    {
      path: "/consulter_offres",
      name: "consulter offres",
      icon: "nc-icon nc-bank",
      component: consulter_offres,
      layout: "/admin",
    },
 
    {
      path: "login",
      name: "deconnexion",
      icon: "fas fa-sign-out-alt",
      component: LogOut,
      layout: "/",
    },

    {
      path: "/edit_profil",
      name: "",
      component: edit_profil,
      layout: "/admin",
    },

    {
      path: "/cours-detaile",
      name: "",
      component: cours_detaile,
      layout: "/admin",
    },
    {
      path: "/offre_detaile",
      name: "",
      component: Offre_detaile,
      layout: "/admin",
    },
    {
      path: "/Reservation",
      name: "",
      component: Reservation,
      layout: "/admin",
    },
    {
      path: "/Modifier_offre",
      name: "",
      component: Modifier_offre,
      layout: "/admin",
    },
    {
      path: "/Modifier_cours",
      name: "",
      component: Modifier_cours,
      layout: "/admin",
    },

  ];
 

export default routesAdmin;
