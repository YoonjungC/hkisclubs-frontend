import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import "./App.css";

import ClubsPage from "./ClubsPage";

import Header from "./Header";

import Faq from "./Faq"; 
import Home from "./Home";
import Login from "./Login";
import { API_URL, FRONTEND_URL } from "./constants/api";

class App extends React.Component {
  state = {
    user: {},
    loggedIn: false,
    fetching: true,
  }

  componentDidMount() {
    console.log("process env", process.env)
    // gets an authenticated user
    fetch(`${API_URL}/auth/google/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
          console.log('user has logged in', data);
            this.setState({
              user: data.user,
              loggedIn: true,
            })
        }

        this.setState({
          fetching: false
        })
    })
  }

  handleLogout = () => {
    fetch(`${API_URL}/auth/google/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(() => {
      this.setState({
        loggedIn: false,
        user: {},
      });
      window.open(FRONTEND_URL, "_self")
    })
  }

  updateBookmarks = (saved) => {
    let user = this.state.user;
    user.saved = saved;
    this.setState({
      user
    });
  }

  render() {
    return (
    <Router> 
      <div className="App">
        <Header auth={this.state} logout={this.handleLogout}/> 

        <Switch>
          <Route path="/clubs">
            <ClubsPage auth={this.state} updateBookmarks={this.updateBookmarks}/>
          </Route>
          <Route path="/faq">
            <Faq/> 
          </Route>
          <Route path="/login" render={(props) => (
            <Login {...props} auth={this.state}/>
          )}>
          </Route>
          <Route path="/">
            <Home/> 
          </Route>
        </Switch>
    
        <div id="footer">
          <div id="bottomfooter">
            <h3
              style={{
                color: "gray",
                fontSize: 13,
                fontWeight: "normal",
                fontStyle: "italic",
              }}
            >
              Made with
              <a href="/" id="heart">
                <img
                  src={require("./media/heart.png")}
                  alt="heart"
                  width="15px;"
                />
              </a>
              by Yoonjung Choi @SDLT
            </h3>
            <img
                  src={require("./media/sdltlogo.png")}
                  alt="sdltlogo"
                  width="100px;"
                />
          </div>
        </div>
      </div>  
      </Router>
    );
  }
}

export default App;
