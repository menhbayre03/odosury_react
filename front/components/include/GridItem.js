import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const reducer = ({ main }) => ({ main });

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotf: false
        }
    }

    render() {
        const {item, watching} = this.props;
        return (
            <div className="grid-item">
                <Link to="#">
                    <div className="grid-item-box">
                        <img src="http://demo.foxthemes.net/courseplusv3.3/assets/images/course/p-1.png" alt=""/>
                            <div className="contents">
                                <h3> JavaScript </h3>
                                {
                                    watching ? (
                                        <div className="progressbar">
                                            <div className="filler" style={{width:`${item*10}%`}}/>
                                        </div>
                                    ) : (
                                        <p> JavaScript is how you build interactivity on the web ...</p>
                                    )
                                }
                            </div>
                            <div className="footer">
                                <h5><ion-icon name="library"/> 24 Lectures </h5>
                                <div>
                                    <h5>
                                        <ion-icon name="time"/>
                                        55 Hours </h5>
                                </div>
                            </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default  connect(reducer)(Header);