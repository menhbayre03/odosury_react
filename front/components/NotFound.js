import React, { Component } from "react";
import { connect } from 'react-redux';
import config from "../config";

const reducer = ({ main }) => ({ main });

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        config.get('ga').pageview(window.location.pathname + window.location.search);
    }

    handleChange(event) {
        const { value } = event.target;
        this.setState(() => {
            return {
                value
            };
        });
    }

    render() {
        return (
            <React.Fragment>
                <p>404</p>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(NotFound);