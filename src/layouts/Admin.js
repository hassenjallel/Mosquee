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
import React , { useState }from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";
import axios from 'axios';

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routesAdmin from "routes.js";
import routesSuperAdmin from "../routesSuperAdmin";
import { useHistory } from "react-router-dom";
import GetCookie from "views/cookies";
var ps;

function Dashboard(props) {
  const history =useHistory();
  let nom="mosquee"
  let cook = GetCookie(nom)
  if(cook.length==0){
    history.push({
      pathname:'/login'
    })
  }
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
 

  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };    
 if (localStorage.getItem('type')==="admin"){
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routesAdmin}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routesAdmin.map((prop, key) => {
           
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
        </Switch>
        
      </div>
   
    </div>
  );
        }else{
          return (
            <div className="wrapper">
              <Sidebar
                {...props}
                routes={routesSuperAdmin}
                bgColor={backgroundColor}
                activeColor={activeColor}
              />
              <div className="main-panel" ref={mainPanel}>
                <DemoNavbar {...props} />
                <Switch>
                  {routesSuperAdmin.map((prop, key) => {
                   
                    return (
                      <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                      />
                    );
                  })}
                </Switch>
                
              </div>
           
            </div>
          );
        }
}

export default Dashboard;
