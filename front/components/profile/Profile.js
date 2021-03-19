import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import {Container, Row, Col, Button, Form} from "react-bootstrap";
import config from "../../config";
import Sidebar from "./Sidebar";
import Api from "../../../admin/actions/api";
import ReactPasswordStrength from "react-password-strength";
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
                email: false,
                username: false,
                phone: false,
            },
            password: '',
            newPassword: '',
            newPasswordRepeat: '',

            email: '',
            phone: '',
            username: '',
            submitLoading: false,
            passLoading: false

        };
    }

    componentDidMount() {
        const {history, main: {user}} = this.props;
        config.get('ga').pageview(window.location.pathname + window.location.search);
        if(user) {
            window.scroll(0, 0);
            this.setState({email: user.email || '', phone: user.phone || '', username: user.username || ''})
        } else {
            history.push('/');
        }
    }

    changePhone(e) {
        if(isNaN(e.target.value)) {
            this.setState({phone: ''})
        } else {
            this.setState({phone: parseInt(e.target.value, 10)})
        }
    }

    changePass(e) {
        this.setState({newPassword: e.password, passValid: e.isValid})
    }

    async handleSubmit(e) {
        const {main: {user}} = this.props;
        e.preventDefault();
        this.setState({submitLoading: true});
        let errors = {};
        let noErr = {};
        if(this.state.email == null || this.state.email === '') {
            errors.email = true
        } else {
            noErr.email = false
        }
        if(this.state.username == null || this.state.username === '') {
            errors.username = true
        } else {
            noErr.username = false
        }
        if(this.state.phone.toString() != null && this.state.phone.toString() !== '' && !isNaN(this.state.phone)) {
            if(this.state.phone.toString().length === 8) {
                noErr.phone = false
            } else {
                errors.phone = true
            }
        } else {
            noErr.phone = false
        }
        if(Object.keys(errors).length === 0 && errors.constructor === Object) {
            this.setState({error : {...this.state.error, ...noErr}});
            let data = {
                email: this.state.email,
                username: this.state.username,
                phone: this.state.phone
            };
            const response = await Api.login(`/api/change/info/${user._id}`, data);
            if (response.success === true) {
                if(response.sucmod) {
                    config.get('emitter').emit('success', response.msg);
                    this.setState({submitLoading: false});
                } else {
                    this.setState({submitLoading: false});
                }
            } else {
                this.setState({submitLoading: false});
                config.get('emitter').emit('warning', response.msg);
            }
        } else {
            this.setState({submitLoading: false});
            this.setState({error : {...this.state.error, ...errors, ...noErr}});
        }
    }

    async handlePass(e) {
        const {main: {user}} = this.props;
        e.preventDefault();
        this.setState({passLoading: true});
        let errors = {};
        let noErr = {};
        if(this.state.password == null || this.state.password === '') {
            errors.password = true;
        } else {
            noErr.password = false;
        }
        if(this.state.newPassword == null || this.state.newPassword === '') {
            errors.newPassword = true;
            errors.passwordNoValid = false
        } else {
            if(this.state.passValid) {
                noErr.newPassword = false;
                noErr.passwordNoValid = false
            } else {
                errors.newPassword = true;
                errors.passwordNoValid = true
            }
        }
        if(this.state.newPasswordRepeat == null || this.state.newPasswordRepeat === '') {
            errors.newPasswordRepeat = true
        } else {
            if(this.state.newPassword === this.state.newPasswordRepeat ) {
                noErr.passwordNoMatch = false;
                noErr.newPasswordRepeat = false

            } else {
                errors.passwordNoMatch = true;
                errors.newPasswordRepeat = true
            }
        }
        if(Object.keys(errors).length === 0 && errors.constructor === Object) {
            this.setState({error : {...this.state.error, ...noErr}});
            let data = {
                password: this.state.password,
                newPassword: this.state.newPassword,
                newPasswordRepeat: this.state.newPasswordRepeat,
            };
            const response = await Api.login(`/api/change/pass/${user._id}`, data);
            if (response.success === true) {
                if(response.sucmod) {
                    config.get('emitter').emit('success', response.msg);
                    this.setState({passLoading: false});
                } else {
                    this.setState({passLoading: false});
                }
            } else {
                this.setState({passLoading: false});
                config.get('emitter').emit('warning', response.msg);
            }
        } else {
            this.setState({passLoading: false});
            this.setState({error : {...this.state.error, ...errors, ...noErr}});
        }
    }

    render() {
        const {main: {user}} = this.props;
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
                                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                                    <h4>Ерөнхий мэдээлэл</h4>
                                                    <Row>
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label>Имэйл *</Form.Label>
                                                                <Form.Control
                                                                    placeholder="example.gmail.com"
                                                                    onChange={(e) => this.setState({email: e.target.value})}
                                                                    value={this.state.email}
                                                                    isInvalid={!!this.state.error.email}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Имэйл хаяг оруулна уу.
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label>Хэрэглэгчийн нэр *</Form.Label>
                                                                <Form.Control
                                                                    placeholder="odosury"
                                                                    onChange={(e) => this.setState({username: e.target.value})}
                                                                    value={this.state.username}
                                                                    isInvalid={!!this.state.error.username}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Хэрэглэгчийн нэр оруулна уу.
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label>Утасны дугаар</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault()}
                                                                    placeholder="99999999"
                                                                    onChange={(e) => this.changePhone(e)}
                                                                    value={this.state.phone}
                                                                    isInvalid={!!this.state.error.phone}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Утасны бугаар буруу байна уу.
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <div style={{textAlign: 'right'}}>
                                                        <Button type="submit">Хадгалах</Button>
                                                    </div>
                                                </Form>
                                                <h4 style={{marginTop: 40}}>Нууц үг солих</h4>
                                                <Form onSubmit={this.handlePass.bind(this)}>
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
                                                                    hidden={true}
                                                                    type="password"
                                                                    onChange={(e) => this.setState({newPassword: e.target.value})}
                                                                    placeholder="*************"
                                                                    value={this.state.newPassword}
                                                                    isInvalid={!!this.state.error.newPassword}
                                                                />
                                                                <ReactPasswordStrength
                                                                    className="customClass"
                                                                    minLength={5}
                                                                    minScore={3}
                                                                    scoreWords={['хэт богино', 'сул', 'дунд', 'сайн', 'маш сайн']}
                                                                    tooShortWord={'боломжгүй'}
                                                                    changeCallback={this.changePass.bind(this)}
                                                                    inputProps={{ isInvalid: this.state.error.newPassword, value: this.state.newPassword, placeholder: "*************", name: "newPassword", autoComplete: "off", className: "form-control" }}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {
                                                                        this.state.error.passwordNoValid ? 'Нууц үг хангалтгүй байна' : 'Нууц үг оруулна уу.'
                                                                    }
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
                                                                    {
                                                                        this.state.error.passwordNoMatch ? 'Нууц үг зөрж байна' : 'Нууц үг давтах оруулна уу.'
                                                                    }
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <div style={{textAlign: 'right'}}>
                                                        <Button type="submit">Хадгалах</Button>
                                                    </div>
                                                </Form>
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