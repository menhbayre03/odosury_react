import React, { Component } from "react";
import { connect } from 'react-redux';
import {renderRoutes} from 'react-router-config';
import config from "../config";
import Pyament from "./include/Payment";

const reducer = ({ main, payment}) => ({ main, payment});

class Home extends Component {
    constructor(props) {
        super(props);
        config.config({history: this.props.history});
    }
    componentDidMount() {
        const { main: {userReset}, history} = this.props;
        if(userReset) {
            history.push('/login', {showResetForm: true})
        }
    }

    render() {
        const { route: {routes}} = this.props;
        return (
            <React.Fragment>
                <main className="main-main">
                    <Pyament/>
                    {renderRoutes(routes)}
                </main>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Home);
