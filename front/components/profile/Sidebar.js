import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Tabs, Tab, Accordion, Card } from "react-bootstrap";
import config from "../../config";
import {locale} from "../../../../amjilt_school/src/lang";
const reducer = ({ main, bundle }) => ({ main, bundle });

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
        };
    }

    render() {
        let url = (location.pathname || '').split("/").filter(v => v);
        return (
            <React.Fragment>
                <div className="profile-sidebar">
                    Sidebar

                    <Link to="/classes">
                        <li className={`${url.indexOf('info') >= 0 || url.indexOf('class') >= 0 ? 'active' : ''}`}>
                            <ion-icon name="cube"/>
                            <span>Ерөнхий мэдээлэл</span>
                        </li>
                        <li className={`${url.indexOf('info') >= 0 || url.indexOf('class') >= 0 ? 'active' : ''}`}>
                            <ion-icon name="cube"/>
                            <span>Худалдан авалтийн түүх</span>
                        </li>
                        <li className={`${url.indexOf('info') >= 0 || url.indexOf('class') >= 0 ? 'active' : ''}`}>
                            <ion-icon name="cube"/>
                            <span>Худалдаж авсан хичээлүүд</span>
                        </li>
                        <li className={`${url.indexOf('info') >= 0 || url.indexOf('class') >= 0 ? 'active' : ''}`}>
                            <ion-icon name="cube"/>
                            <span>Хадгалсан хичээлүүд</span>
                        </li>
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Bundle);