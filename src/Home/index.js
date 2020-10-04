import React from "react";
import "./index.css";

export default class Home extends React.Component {
  getLogo = (Logo) => React.createElement(Logo);

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
