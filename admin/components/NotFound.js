import React, { Component } from "react";
import { connect } from 'react-redux';
const reducer = ({ main }) => ({ main });

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div>404</div>
        );
    }
}

export default  connect(reducer)(NotFound);