import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import {Container, Row, Col, Button, Tabs, Tab, Accordion, Card, Form} from "react-bootstrap";
import * as actions from '../../actions/bundle_actions';
import config from "../../config";
import GridItem from "../include/GridItem";
import Loader from "../include/Loader";
import Sidebar from "./Sidebar";
const reducer = ({ main, bundle }) => ({ main, bundle });

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            error: {
                password: false,
                newPassword: false,
                newPasswordRepeat: false,
            },
            password: '',
            newPassword: '',
            newPasswordRepeat: '',
        };
    }

    componentDidMount() {
        const {history, main: {user}} = this.props;
        if(user) {
            window.scroll(0, 0);
        } else {
            history.push('/');
        }
    }

    render() {
        const {main: {user}, bundle: {bundle, loading}} = this.props;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <Container>
                    <div className="profile-container">
                        <Row>
                            <Col md={3}>
                                <Sidebar location={this.props.location}/>
                            </Col>
                            <Col md={9}>
                                <div className="profile">
                                    {
                                        user ? (
                                            <div>
                                                <h4>Ерөнхий мэдээлэл</h4>
                                                <Row>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>Хэрэглэгчйн нэр</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Хэрэглэгчйн нэр"
                                                                value={user.username}
                                                                disabled
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>Имэйл хаяг</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Имэйл хаяг"
                                                                value={user.email}
                                                                disabled
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>Утас</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="99999999"
                                                                value={user.phone}
                                                                disabled
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <div style={{textAlign: 'right'}}>
                                                    <Button>Хадгалах</Button>
                                                </div>
                                                <h4 style={{marginTop: 40}}>Нууц үг солих</h4>
                                                <Row>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>Хуучин нууц үг</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                onChange={(e) => this.setState({password: e.target.value})}
                                                                placeholder="*************"
                                                                value={this.state.password}
                                                                isInvalid={!!this.state.error.password}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Нууц үг оруулна уу.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>Шинэ нууц үг</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                onChange={(e) => this.setState({newPassword: e.target.value})}
                                                                placeholder="*************"
                                                                value={this.state.newPassword}
                                                                isInvalid={!!this.state.error.newPassword}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Нууц үг оруулна уу.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>Шинэ нууц үг давтах</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                onChange={(e) => this.setState({newPasswordRepeat: e.target.value})}
                                                                placeholder="*************"
                                                                value={this.state.newPasswordRepeat}
                                                                isInvalid={!!this.state.error.newPasswordRepeat}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Нууц үг оруулна уу.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <div style={{textAlign: 'right'}}>
                                                    <Button>Хадгалах</Button>
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Bundle);