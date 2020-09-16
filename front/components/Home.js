import React, { Component } from "react";
import { connect } from 'react-redux';
const reducer = ({ main, erpWall}) => ({ main, erpWall });

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {

    }
    render() {

        return (
            <div className="container-fluid">
                Home
            </div>
        );
    }
}

export default  connect(reducer)(Home);