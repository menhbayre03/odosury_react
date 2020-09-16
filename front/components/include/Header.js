import React, { Component } from "react";
import { connect } from 'react-redux';
const reducer = ({ main }) => ({ main });

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotf: false
        }
    }

    render() {
        return (
            <div className="header">
                <img src="/images/logo-school.png" alt=""/>
                <div className="header-menu">
                    <a href="/api/logout">
                        <div>
                            <ion-icon name="log-out"/>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default  connect(reducer)(Header);