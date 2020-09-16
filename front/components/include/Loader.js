import React, { Component } from "react";
import { connect } from 'react-redux';

const reducer = ({ main }) => ({ main });

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { status } = this.props;
        if(status != 1) {
            return (
                <div className="main-loader">
                    {this.props.children}
                </div>
            );
        } else {
            return (
                <div className="main-loader" style={{paddingTop: 30, paddingBottom: 30}}>
                    <div className="sk-circle">
                        <div className="sk-circle1 sk-child"/>
                        <div className="sk-circle2 sk-child"/>
                        <div className="sk-circle3 sk-child"/>
                        <div className="sk-circle4 sk-child"/>
                        <div className="sk-circle5 sk-child"/>
                        <div className="sk-circle6 sk-child"/>
                        <div className="sk-circle7 sk-child"/>
                        <div className="sk-circle8 sk-child"/>
                        <div className="sk-circle9 sk-child"/>
                        <div className="sk-circle10 sk-child"/>
                        <div className="sk-circle11 sk-child"/>
                        <div className="sk-circle12 sk-child"/>
                    </div>
                </div>
            )
        }
    }
}

export default  connect(reducer)(Loader);