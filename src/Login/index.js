import React from "react";
import "./index.css";
import { API_URL } from "../constants/api";
import qs from 'qs';

export default class Login extends React.Component {
    onClickAuth = () => {
        window.open(`${API_URL}/login`, '_self');
    }

    render() {
        const { user, loggedIn, fetching } = this.props.auth
        const queries = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });  

        if (fetching) {
            return (
                <div className="login">
                    <p> Loading...</p>
                </div>
            )
        }
        return (
            <div className="login">
                {
                    loggedIn
                        ? (
                            <p> Hi, you are logged in with {user.email} </p>
                        )
                        : (
                            <button onClick={this.onClickAuth}>Login with HKIS Email</button>
                        )
                }
                {
                    queries.error && queries.error === '401'
                    ? <p id="error">You did not log in with HKIS email</p>
                    : null
                }
            </div>
        );
    }
}
