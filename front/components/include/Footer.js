import React, { Component } from "react";
import { connect } from 'react-redux';
import {
    isMobile
} from "react-device-detect";
import { Container, Col, Row } from 'react-bootstrap';
const reducer = ({ main }) => ({ main });

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={{backgroundColor: '#151314'}}>
                <Container>
                    <Row style={{alignItems: 'center', padding: '30px 0'}}>
                        <Col md={6} className="section-1" style={{
                            textAlign: isMobile ? 'center' : 'left'
                        }}>
                            <div className="logo" style={{display: 'inline-block'}}>
                                <img src="/images/logo.png" alt="" width={200}/>
                            </div>
                        </Col>
                        <Col md={6} className="section-2">
                            <div>
                            <span style={
                                isMobile ? {
                                    fontSize: 12,
                                    color: '#fff',
                                    padding: '6px 0px 6px 15px',
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    width: '100%',
                                    display: 'block',
                                    marginTop: 20,
                                } : {
                                    display: 'block',
                                    fontSize: 12,
                                    color: '#fff',
                                    padding: '6px 0px 6px 15px',
                                    fontWeight: 600,
                                    width: '100%',
                                    textAlign: 'right'
                                }
                            }>
                                © 2021 All Rights Reserved.
                            </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default  connect(reducer)(Footer);
