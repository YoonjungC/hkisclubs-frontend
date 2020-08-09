import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

import IosBookmarkOutline from "react-ionicons/lib/IosBookmarkOutline";
import IosDocumentOutline from "react-ionicons/lib/IosDocumentOutline";
import IosGlobeOutline from "react-ionicons/lib/IosGlobeOutline";
import IosChatboxesOutline from "react-ionicons/lib/IosChatboxesOutline";

const INFO_SECTIONS = [
  {
    text: "All Club Information in One Space",
    logo: <IosChatboxesOutline fontSize="100px" />,
  },
  {
    text: "Find Out Events Happening for Each Club",
    logo: <IosGlobeOutline fontSize="100px" />,
  },
  {
    text: "Bookmark Your Favorite Clubs",
    logo: <IosDocumentOutline fontSize="100px" />,
  },
];

export default class Home extends React.Component {
  getLogo = (Logo) => React.createElement(Logo);

  /* componentDidMount() {
    fetch('http://127.0.0.1:8000/google')
    .then(response => response.json())
    .then(response => {
      // console.log('response', response)
      const google_redirect_url = response.google_auth;
      window.location.assign(google_redirect_url);
    })
  } */

  cell = (text, logo) => {
    return (
      <div className="infoContainer">
        <h4 className="infoBox">
          {text}
          <div>{logo}</div>
        </h4>
      </div>
    );
  };

  render() {
    return (
      <div className="homeContent">
        <div id="home">
          <div id="home-maintext">
            <h1> HKIS Clubs </h1> 
            <h2> Discover clubs all year-round </h2>
          </div>
          <div id="backgroundImg">
            <img src={require("../media/background.png")} alt="background" />
          </div>
        </div>

        <div id = "boxesHeader">
          <h1> Built for students, </h1>
          <h2> Here's what HKIS Clubs does. </h2>
        </div>
        
        <div className="boxes">
          <div id="first">
            <h4> All Club Information </h4>
            <h5> in One Space </h5>
            
          </div>

          <div  id="second">
            <h4> Find Out Events  </h4>
            <h5> Happening for Each Club </h5>
            
          </div>
          <div id="third">
            <h4> Bookmark </h4>
            <h5> Your Favorite Clubs </h5>
            
          </div>
        </div>
      </div>
    );
  }
}

/* <div className="boxes"> 
          {INFO_SECTIONS.map((info) => (
            this.cell(info.text, info.logo)
          ))}
          </div> 
          
    */
