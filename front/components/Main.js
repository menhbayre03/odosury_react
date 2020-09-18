import React, { Component } from "react";
import { connect } from 'react-redux';
import {renderRoutes} from 'react-router-config';
import Header from "../components/include/Header";
import config from "../config";

const reducer = ({ main}) => ({ main});

class Home extends Component {
    constructor(props) {
        super(props);
        config.config({history: this.props.history});
    }
    render() {
        const { route: {routes}} = this.props;
        return (
            <React.Fragment>
                <div className="main-main">
                    {renderRoutes(routes)}
                </div>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Home);