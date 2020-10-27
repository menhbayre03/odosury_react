import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "./include/Header";
import config from "../config";
import Footer from "./include/Footer";
import ReactPasswordStrength from 'react-password-strength';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Api from "../../admin/actions/api";
import Cookies from "js-cookie";
const reducer = ({ main, auth }) => ({ main, auth });

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                username: false,
                password: false,

                emailRegister: false,
                usernameRegister: false,
                phoneRegister: false,
                passwordRegister: false,
                passwordRepeatRegister: false,
                passwordNoMatch: false,
                passwordNoValid: false,
            },
            username: '',
            password: '',

            passValid: false,
            emailRegister: '',
            usernameRegister: '',
            phoneRegister: '',
            passwordRegister: '',
            passwordRepeatRegister: '',



            verifyLoading: false,
            registerLoading: false,
            loading: false,
            registerDone: false,
            verifyMsg: '',
            accessToken: '',
            pendingEmail: ''
        };
    }

    async componentDidMount() {
        window.scroll(0,0);
        if(this.props.match.params.token) {
            this.setState({verifyLoading: true});
            const response = await Api.login(`/api/verify/${this.props.match.params.token}`);
            if (response.success === true) {
                this.setState({username: response.username, verifyLoading: false, verifyMsg: 'Амжилттай идэвхижлээ. Нэвтэрж орно уу.'});
            } else {
                this.setState({verifyLoading: false, verifyMsg: ''});
                config.get('emitter').emit('warning', response.msg);
            }
        }
    }

    changePass(e) {
        this.setState({passwordRegister: e.password, passValid: e.isValid})
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        let errors = {};
        let noErr = {};
        if(this.state.username == null || this.state.username === '') {
            errors.username = true
        } else {
            noErr.username = false
        }
        if(this.state.password == null || this.state.password === '') {
            errors.password = true
        } else {
            noErr.password = false
        }
        if(Object.keys(errors).length === 0 && errors.constructor === Object) {
            this.setState({error : {...this.state.error, ...noErr}});
            let data = {
                username: this.state.username,
                password: this.state.password,
            };
            const response = await Api.login(`/api/login`, data);
            if (response.success === true) {
                if(response.pending) {
                    this.setState({loading: false, registerDone: true, pendingEmail: response.email, accessToken: response.accessToken});
                } else {
                    this.setState({loading: false});
                    Cookies.set('odosuryCard', JSON.stringify({bundles: [], lessons: []}));
                    window.location = "/";
                }
            } else {
                this.setState({loading: false});
                config.get('emitter').emit('warning', response.msg);
            }
        } else {
            this.setState({loading: false});
            this.setState({error : {...this.state.error, ...errors, ...noErr}});
        }
    }

    changePhone(e) {
        if(isNaN(e.target.value)) {
            this.setState({phoneRegister: ''})
        } else {
            this.setState({phoneRegister: parseInt(e.target.value, 10)})
        }
    }

    async reSend() {
        this.setState({resendLoading: true});
        const response = await Api.login(`/api/resend/email`, {email: this.state.pendingEmail ? this.state.pendingEmail : this.state.emailRegister, accessToken: this.state.accessToken});
        if (response.success === true) {
            config.get('emitter').emit('success', 'Амжилттай илгээлээ');
            this.setState({resendLoading: false});
        } else {
            this.setState({resendLoading: true});
            config.get('emitter').emit('warning', response.msg);
        }
    }

    async closeActivate() {
        this.setState({
            registerLoading: false,
            registerDone: false,
            accessToken: '',
            pendingEmail: '',

            passValid: false,
            emailRegister: '',
            usernameRegister: '',
            phoneRegister: '',
            passwordRegister: '',
            passwordRepeatRegister: '',});
    }

    async handleSubmitRegister(e) {
        e.preventDefault();
        this.setState({registerLoading: true});
        let errors = {};
        let noErr = {};
        if(this.state.emailRegister == null || this.state.emailRegister === '') {
            errors.emailRegister = true
        } else {
            noErr.emailRegister = false
        }
        if(this.state.usernameRegister == null || this.state.usernameRegister === '') {
            errors.usernameRegister = true
        } else {
            noErr.usernameRegister = false
        }
        if(this.state.phoneRegister.toString() != null && this.state.phoneRegister.toString() !== '' && !isNaN(this.state.phoneRegister)) {
            if(this.state.phoneRegister.toString().length === 8) {
                noErr.phoneRegister = false
            } else {
                errors.phoneRegister = true
            }
        } else {
            noErr.phoneRegister = false
        }
        if(this.state.passwordRegister == null || this.state.passwordRegister === '') {
            errors.passwordRegister = true;
            errors.passwordNoValid = false
        } else {
            if(this.state.passValid) {
                noErr.passwordRegister = false;
                noErr.passwordNoValid = false
            } else {
                errors.passwordRegister = true;
                errors.passwordNoValid = true
            }
        }
        if(this.state.passwordRepeatRegister == null || this.state.passwordRepeatRegister === '') {
            errors.passwordRepeatRegister = true
        } else {
            if(this.state.passwordRegister === this.state.passwordRepeatRegister ) {
                noErr.passwordNoMatch = false;
                noErr.passwordRepeatRegister = false

            } else {
                errors.passwordNoMatch = true;
                errors.passwordRepeatRegister = true
            }
        }
        if(Object.keys(errors).length === 0 && errors.constructor === Object) {
            this.setState({error : {...this.state.error, ...noErr}});
            let data = {
                email: this.state.emailRegister,
                username: this.state.usernameRegister,
                phone: this.state.phoneRegister,
                password: this.state.passwordRegister,
                passwordRepeat: this.state.passwordRepeatRegister,
            };
            const response = await Api.login(`/api/register`, data);
            if (response.success === true) {
                if(response.alemod) {
                    config.get('emitter').emit('successs', response.msg);
                }
                this.setState({resendLoading: false, registerLoading: false, registerDone: true, accessToken: response.accessToken});
            } else {
                this.setState({registerLoading: false});
                config.get('emitter').emit('warning', response.msg);
            }
        } else {
            this.setState({registerLoading: false});
            this.setState({error : {...this.state.error, ...errors, ...noErr}});
        }
    }

    render() {
        const {main : {user}, auth} = this.props;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="login-container" style={{position: 'relative'}}>
                    <Container>
                        <Row>
                            <Col md={{ span: 8, offset: 2 }}>
                                {
                                    this.state.verifyLoading ? (
                                        <img style={{
                                            position: 'absolute',
                                            height: 120,
                                            top: '30%',
                                            left: 'calc(100% / 2 - 60px)',
                                            color: '#000'
                                        }} src="/images/sync-outline-black.svg" className="spinner"/>
                                    ) : null
                                }
                                {
                                    !this.state.verifyLoading && this.state.verifyMsg ? (
                                        <h3 style={{
                                            marginBottom: 40,
                                            marginTop: -20,
                                            fontSize: 24,
                                            fontWeight: 600,
                                            color: '#22bb33',
                                            textAlign: 'center'
                                        }}>{this.state.verifyMsg}</h3>
                                    ) : null
                                }
                                <Row style={{pointerEvents: this.state.verifyLoading ? 'none' : 'unset', opacity: this.state.verifyLoading ? 0.2 : 1}}>
                                    <Col md={{ span: 5 }}>
                                        <div className="log-block login"><h4 className="title text-center">
                                            <strong>Нэвтрэх</strong></h4>
                                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                                <Form.Group>
                                                    <Form.Label>Хэрэглэгчийн нэр</Form.Label>
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
                                                <Form.Group>
                                                    <Form.Label>Нууц үг</Form.Label>
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
                                                <div className="text-right">
                                                    <span className="forgot">Нууц үгээ мартсан</span>
                                                </div>
                                                <div className="text-center">
                                                <Button style={{position: 'relative', paddingLeft: this.state.loading ? 35 : 20}} disabled={this.state.loading} type="submit" className="btn btn-btn btn-submit">
                                                    {
                                                        this.state.loading ? (
                                                            <img src="/images/sync-outline.svg" className="spinner"/>
                                                        ) :  (
                                                            null
                                                        )
                                                    }
                                                    Нэвтрэх
                                                </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </Col>
                                    <Col md={{ span: 5, offset: 2 }}>
                                        {
                                            this.state.registerDone ? (
                                                <div>
                                                    {
                                                        this.state.pendingEmail ? (
                                                            <h3 style={{
                                                                marginBottom: 5,
                                                                fontSize: 22,
                                                                fontWeight: 600,
                                                                color: 'rgb(255 0 0)'
                                                            }}>Баталшаажуулаагүй байна.</h3>
                                                        ) : (
                                                            <h3 style={{
                                                                marginBottom: 5,
                                                                fontSize: 24,
                                                                fontWeight: 600,
                                                                color: '#22bb33'
                                                            }}>Амжилттай бүртгэгдлээ.</h3>
                                                        )
                                                    }
                                                    <p style={{
                                                        marginBottom: 2,
                                                        fontSize: 16,
                                                        fontWeight: 400
                                                    }}>Имэйл - ээ баталгаажуулна уу.</p>
                                                    <p style={{
                                                        fontSize: 16,
                                                        fontWeight: 400
                                                    }}>Имэйл хаяг: <span style={{color: 'black', fontWeight: 700}}>{ this.state.pendingEmail ? (this.state.pendingEmail || '') : (this.state.emailRegister || '')}</span></p>
                                                    <Button onClick={() => this.reSend()} style={{position: 'relative', paddingLeft: this.state.resendLoading ? 35 : 20}} disabled={this.state.resendLoading} type="submit" className="btn btn-btn btn-submit">
                                                        {
                                                            this.state.resendLoading ? (
                                                                <img src="/images/sync-outline.svg" className="spinner"/>
                                                            ) :  (
                                                                null
                                                            )
                                                        }
                                                        Дахин илгээх
                                                    </Button>
                                                    <Button variant="secondary" onClick={() => this.closeActivate()} style={{marginLeft: 15}} type="button">
                                                        Бүртгүүлэх
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="log-block login"><h4 className="title text-center">
                                                    <strong>Бүртгүүлэх</strong></h4>
                                                    <Form onSubmit={this.handleSubmitRegister.bind(this)}>
                                                        <Form.Group>
                                                            <Form.Label>Имэйл *</Form.Label>
                                                            <Form.Control
                                                                placeholder="example.gmail.com"
                                                                onChange={(e) => this.setState({emailRegister: e.target.value})}
                                                                value={this.state.emailRegister}
                                                                isInvalid={!!this.state.error.emailRegister}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Имэйл хаяг оруулна уу.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Хэрэглэгчийн нэр *</Form.Label>
                                                            <Form.Control
                                                                placeholder="odosury"
                                                                onChange={(e) => this.setState({usernameRegister: e.target.value})}
                                                                value={this.state.usernameRegister}
                                                                isInvalid={!!this.state.error.usernameRegister}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Хэрэглэгчийн нэр оруулна уу.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Утасны дугаар</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault()}
                                                                placeholder="99119911"
                                                                onChange={(e) => this.changePhone(e)}
                                                                value={this.state.phoneRegister}
                                                                isInvalid={!!this.state.error.phoneRegister}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Утасны бугаар буруу байна уу.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Нууц үг *</Form.Label>
                                                            <Form.Control
                                                                hidden={true}
                                                                type="password"
                                                                placeholder="*************"
                                                                value={this.state.passwordRegister}
                                                                isInvalid={!!this.state.error.passwordRegister}
                                                            />
                                                            <ReactPasswordStrength
                                                                className="customClass"
                                                                minLength={5}
                                                                minScore={3}
                                                                scoreWords={['хэт богино', 'сул', 'дунд', 'сайн', 'маш сайн']}
                                                                tooShortWord={'боломжгүй'}
                                                                changeCallback={this.changePass.bind(this)}
                                                                inputProps={{ isInvalid: this.state.error.passwordRegister, value: this.state.passwordRegister, placeholder: "*************", name: "passwordRegister", autoComplete: "off", className: "form-control" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {
                                                                    this.state.error.passwordNoValid ? 'Нууц үг хангалтгүй байна' : 'Нууц үг оруулна уу.'
                                                                }
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Нууц үг давтах *</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                onChange={(e) => this.setState({passwordRepeatRegister: e.target.value})}
                                                                placeholder="*************"
                                                                value={this.state.passwordRepeatRegister}
                                                                isInvalid={!!this.state.error.passwordRepeatRegister}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {
                                                                    this.state.error.passwordNoMatch ? 'Нууц үг зөрж байна' : 'Нууц үг давтах оруулна уу.'
                                                                }
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <div className="text-center">
                                                            <small id="emailHelp" style={{marginBottom: 15}}
                                                                   className="form-text text-muted text-center">Та бүртгүүлэх
                                                                товчийг манай <a href="#">үйлчилгээний нөхцөл</a>ийг хүлээн
                                                                зөвшөөрсөнд тооцно.
                                                            </small>
                                                            <Button style={{position: 'relative', paddingLeft: this.state.registerLoading ? 35 : 20}} disabled={this.state.registerLoading} type="submit" className="btn btn-btn btn-submit">
                                                                {
                                                                    this.state.registerLoading ? (
                                                                        <img src="/images/sync-outline.svg" className="spinner"/>
                                                                    ) :  (
                                                                        null
                                                                    )
                                                                }
                                                                Бүртгүүлэх
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </div>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Home);