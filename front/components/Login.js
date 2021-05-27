import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "./include/Header";
import config from "../config";
import Footer from "./include/Footer";
import ReactPasswordStrength from 'react-password-strength';
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Api from "../../admin/actions/api";
import Cookies from "js-cookie";
const reducer = ({ main, auth }) => ({ main, auth });
import FacebookLogin from 'react-facebook-login';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                username: false,
                password: false,

                emailRegister: false,
                usernameRegister: false,
                usernameErrorText: null,
                phoneRegister: false,
                passwordRegister: false,
                passwordRepeatRegister: false,
                passwordNoMatch: false,
                passwordNoValid: false,
                terms: false,

                passResetNoMatch: false,
                passResetNoValid: false,
                passReset: false,
                passResetRepeat: false,

            },
            username: '',
            password: '',

            passValid: false,
            emailRegister: '',
            usernameRegister: '',
            phoneRegister: '',
            passwordRegister: '',
            passwordRepeatRegister: '',
            terms: false,



            verifyLoading: false,
            registerLoading: false,
            loading: false,
            fbLoading: false,
            registerDone: false,
            verifyMsg: '',
            accessToken: '',
            pendingEmail: '',
            showReset: false,
            resetLoading: false,
            email_reset: '',

            passReset: '',
            passResetRepeat: '',
            passResetUser: {},
            passResetToken: '',
            passResetDone: false,
            passResetValid: false,
            showResetForm: false,
            passResetLoading: false,
        };
    }

    async componentDidMount() {
        const {main: {userReset, token}} = this.props;
        config.get('ga').pageview(window.location.pathname + window.location.search);
        window.scroll(0,0);
        // config.get('fbApi').whenLoaded().then(() => this.setState({sdkLoaded: true}));
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
        if(userReset && this.props.location.state.showResetForm) {
            this.setState({
                passResetUser: userReset,
                passResetToken: token,
                showResetForm: true
            })
        }
    }
    async ResetSubmit(event){
        event.preventDefault();
        this.setState({resetLoading: true});
        var cc = {
            email:this.state.email_reset,
        };
        if (this.state.email_reset == null || this.state.email_reset === '') {
            config.get('emitter').emit('warning', 'Имэйл хаяг оруулна уу');
            this.setState({resetLoading: false});
        } else {
            const response = await Api.login(`/api/password/reset`, cc);
            if (response.success === true) {
                this.setState({resetLoading: false});
                config.get('emitter').emit('success', response.msg);

            } else {
                this.setState({resetLoading: false});
                config.get('emitter').emit('warning', response.msg);
            }
        }
    }
    // async responseFacebook() {
    //     this.setState({fbLoading: true});
    //     const res = await config.get('fbApi').login();
    //     if(res && res.status === "connected" && (res.authResponse || {}).accessToken) {
    //         const response = await Api.login(`/api/fb/login`, {token: res.authResponse.accessToken});
    //         if (response.success === true) {
    //             this.setState({fbLoading: false});
    //             Cookies.set('odosuryCard', JSON.stringify({bundles: [], lessons: []}));
    //             window.location = "/";
    //         } else {
    //             this.setState({fbLoading: false});
    //             config.get('emitter').emit('warning', response.msg);
    //         }
    //     }
    // }
    async responseFacebook(data) {
        this.setState({fbLoading: true});
        // const res = await config.get('fbApi').login();
        // if(res && res.status === "connected" && (res.authResponse || {}).accessToken) {
            const response = await Api.login(`/api/fb/login`, {token: data.accessToken});
            if (response.success === true) {
                this.setState({fbLoading: false});
                Cookies.set('odosuryCard', JSON.stringify({bundles: [], lessons: []}));
                window.location = "/";
            } else {
                this.setState({fbLoading: false});
                config.get('emitter').emit('warning', response.msg);
            }
        // }
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
        const usernameRegex = /^[0-9a-za-z_]*$/;
        this.setState({registerLoading: true});
        let errors = {};
        let noErr = {};
        if(this.state.emailRegister == null || this.state.emailRegister === '') {
            errors.emailRegister = true
        } else {
            noErr.emailRegister = false
        }

        if(this.state.usernameRegister == null || this.state.usernameRegister === '') {
            errors.usernameRegister = true;
            errors.usernameErrorText = null;
        } else if(!usernameRegex.test(this.state.usernameRegister.trim())){
            errors.usernameRegister = true;
            errors.usernameErrorText = 'Хэрэглэгчийн нэр бичиглэл буруу байна! Жижиг a-z, тоо болон _ оруулж болно.';
        } else {
            noErr.usernameRegister = false;
            noErr.usernameErrorText = null;
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
        if(!this.state.terms) {
            errors.terms = true
        } else {
            noErr.terms = false
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
                // this.setState({resendLoading: false, registerLoading: false, registerDone: true, accessToken: response.accessToken});
                this.setState({resendLoading: false, registerLoading: false, registerDone: true, username: response.username});
            } else {
                this.setState({registerLoading: false});
                config.get('emitter').emit('warning', response.msg);
            }
        } else {
            this.setState({registerLoading: false});
            this.setState({error : {...this.state.error, ...errors, ...noErr}});
        }
    }

    async handleSubmitReset(e) {
        e.preventDefault();
        this.setState({passResetLoading: true});
        let errors = {};
        let noErr = {};

        if(this.state.passReset == null || this.state.passReset === '') {
            errors.passReset = true;
            errors.passResetNoValid = false
        } else {
            if(this.state.passResetValid) {
                noErr.passReset = false;
                noErr.passResetNoValid = false
            } else {
                errors.passReset = true;
                errors.passResetNoValid = true
            }
        }
        if(this.state.passResetRepeat == null || this.state.passResetRepeat === '') {
            errors.passwordRepeatRegister = true
        } else {
            if(this.state.passReset === this.state.passResetRepeat ) {
                noErr.passResetNoMatch = false;
                noErr.passResetRepeat = false

            } else {
                errors.passResetNoMatch = true;
                errors.passResetRepeat = true
            }
        }
        if(Object.keys(errors).length === 0 && errors.constructor === Object) {
            this.setState({error : {...this.state.error, ...noErr}});
            let data = {
                token: this.state.passResetToken,
                newPassword: this.state.passReset,
                newPasswordRepeat: this.state.passResetRepeat,
            };
            const response = await Api.login(`/api/reset/passwordSave/${this.state.passResetUser._id}`, data);
            if (response.success === true) {
                // config.get('emitter').emit('successs', response.msg);
                this.setState({
                    passReset: '',
                    passResetRepeat: '',
                    passResetUser: {},
                    passResetToken: '',
                    passResetDone: true,
                    passResetValid: false,
                    showResetForm: false,
                    passResetLoading: false,

                    username: response.username
                });
            } else {
                this.setState({passResetLoading: false});
                config.get('emitter').emit('warning', response.msg);
            }
        } else {
            this.setState({passResetLoading: false});
            this.setState({error : {...this.state.error, ...errors, ...noErr}});
        }
    }

    render() {
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
                                {
                                    this.state.passResetDone ? (
                                        <h3 style={{
                                            marginBottom: 40,
                                            marginTop: -20,
                                            fontSize: 24,
                                            fontWeight: 600,
                                            color: '#22bb33',
                                            textAlign: 'center'
                                        }}>Нууц үг Амжилттай солигдлоо нэвтрэх үйлдэл хийнэ үү.</h3>
                                    ) : null
                                }
                                <Row style={{pointerEvents: this.state.verifyLoading ? 'none' : 'unset', opacity: this.state.verifyLoading ? 0.2 : 1}}>
                                    <Col xl={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} md={{ span: 8, offset: 2 }} sm={{ span: 10, offset: 1 }}>
                                        <div className="log-block login">
                                            <h4 className="title text-center">
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
                                                    <span style={{cursor: 'pointer'}} onClick={() => this.setState({showReset: true})} className="forgot">Нууц үгээ мартсан</span>
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
                                            <div className="facebook-login">
                                                <FacebookLogin
                                                    appId="1025498560826970"
                                                    autoLoad={false}
                                                    isMobile={false}
                                                    callback={(response)=>this.responseFacebook(response)}
                                                    render={renderProps => (
                                                        <Button variant="danger" onClick={renderProps.onClick}>
                                                            Facebook
                                                        </Button>
                                                    )}
                                                />
                                                <div style={{cursor: 'pointer'}} className="fb">
                                                    <ion-icon name="logo-facebook"/>
                                                    <span>Facebook-ээр нэвтрэх</span></div>
                                            </div>
                                            {/*{*/}
                                            {/*    this.state.sdkLoaded ? (*/}
                                            {/*        <div style={{cursor: 'pointer'}} className="fb"*/}
                                            {/*             onClick={this.responseFacebook.bind(this)}>*/}
                                            {/*            <ion-icon name="logo-facebook"/>*/}
                                            {/*            <span>Facebook-ээр нэвтрэх</span></div>*/}
                                            {/*    ) : (*/}
                                            {/*        <div style={{cursor: 'pointer'}} className="fb">*/}
                                            {/*            <ion-icon name="logo-facebook"/>*/}
                                            {/*            <span>Ачааллаж байна...</span></div>*/}
                                            {/*    )*/}
                                            {/*}*/}
                                        </div>
                                    </Col>
                                    <Col xl={{ span: 5, offset: 2 }} lg={{ span: 6, offset: 0 }} md={{ span: 8, offset: 2 }} sm={{ span: 10, offset: 1 }} className="register-login">
                                        {
                                            this.state.showResetForm && !this.state.passResetDone ? (
                                                <div className="log-block login"><h4 className="title text-center">
                                                    <strong style={{color: '#bb1a1a'}}>Нууц үг сэргээх</strong></h4>
                                                    <Form onSubmit={this.handleSubmitReset.bind(this)}>
                                                        <Form.Group>
                                                            <Form.Group>
                                                                <Form.Label>Нууц үг *</Form.Label>
                                                                <Form.Control
                                                                    hidden={true}
                                                                    type="password"
                                                                    placeholder="*************"
                                                                    value={this.state.passReset}
                                                                    isInvalid={!!this.state.error.passReset}
                                                                />
                                                                <ReactPasswordStrength
                                                                    className="customClass"
                                                                    minLength={5}
                                                                    minScore={3}
                                                                    scoreWords={['хэт богино', 'сул', 'дунд', 'сайн', 'маш сайн']}
                                                                    tooShortWord={'боломжгүй'}
                                                                    changeCallback={(e) =>  this.setState({passReset: e.password, passResetValid: e.isValid})}
                                                                    inputProps={{ isInvalid: this.state.error.passReset, value: this.state.passReset, placeholder: "*************", name: "passReset", autoComplete: "off", className: "form-control" }}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {
                                                                        this.state.error.passResetNoValid ? 'Нууц үг хангалтгүй байна' : 'Нууц үг оруулна уу.'
                                                                    }
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Form.Label>Нууц үг давтах *</Form.Label>
                                                                <Form.Control
                                                                    type="password"
                                                                    onChange={(e) => this.setState({passResetRepeat: e.target.value})}
                                                                    placeholder="*************"
                                                                    value={this.state.passResetRepeat}
                                                                    isInvalid={!!this.state.error.passResetRepeat}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {
                                                                        this.state.error.passResetNoMatch ? 'Нууц үг зөрж байна' : 'Нууц үг давтах оруулна уу.'
                                                                    }
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Form.Group>
                                                        <div className="text-center">
                                                            <Button style={{position: 'relative', paddingLeft: this.state.passResetLoading ? 35 : 20}} disabled={this.state.passResetLoading} type="submit" className="btn btn-btn btn-submit">
                                                                {
                                                                    this.state.passResetLoading ? (
                                                                        <img src="/images/sync-outline.svg" className="spinner"/>
                                                                    ) :  (
                                                                        null
                                                                    )
                                                                }
                                                                Солих
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </div>
                                            ) : (
                                                this.state.registerDone ? (
                                                    <div>
                                                        {
                                                            this.state.pendingEmail ? (
                                                                <h3 style={{
                                                                    marginBottom: 5,
                                                                    fontSize: 22,
                                                                    fontWeight: 600,
                                                                    color: 'rgb(255 0 0)'
                                                                }}>Баталгаажуулаагүй байна.</h3>
                                                            ) : (
                                                                <h3 style={{
                                                                    marginBottom: 5,
                                                                    fontSize: 24,
                                                                    fontWeight: 600,
                                                                    color: '#22bb33'
                                                                }}>Амжилттай бүртгэгдлээ.</h3>
                                                            )
                                                        }
                                                        {
                                                            this.state.pendingEmail ? (
                                                                <React.Fragment>
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
                                                                </React.Fragment>
                                                            ) : (
                                                                null
                                                            )
                                                        }

                                                    </div>
                                                ) : (
                                                    <div className="log-block login">
                                                        <h4 className="title text-center"><strong>Бүртгүүлэх</strong></h4>
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
                                                                    {this.state.error.usernameErrorText ? this.state.error.usernameErrorText : 'Хэрэглэгчийн нэр оруулна уу.'}
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
                                                            <Form.Group className="reg-check">
                                                                <Form.Check onChange={() => this.setState({terms: !this.state.terms})} type="checkbox" label="Үйлчигээний нөхцөлийг зөвшөөрч байна" isInvalid={!!this.state.error.terms}/>
                                                            </Form.Group>
                                                            <div className="text-center">
                                                                <small id="emailHelp" style={{marginBottom: 15}}
                                                                       className="form-text text-muted text-center">Та бүртгүүлэх
                                                                    товчийг дарсанаар манай <span style={{color: '#1a1aa2', cursor: 'pointer'}} onClick={() => this.setState({showModal: true})}>үйлчилгээний нөхцөл</span> - ийг хүлээн
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
                                            )
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    <Modal size="sm" className="resetModal" show={this.state.showReset} onHide={() => this.setState({showReset: false, email_reset: ''})} backdrop='static'>
                        <Modal.Header closeButton>
                            <span>Нууц үг сэргээх</span>
                        </Modal.Header>
                        <Modal.Body style={{ padding: 20, background: '#F5F5F5'}}>
                            <div style={{padding: 0, minHeight: "unset"}} className="login-container">
                                <div className="log-block login">
                                    <Form onSubmit={this.ResetSubmit.bind(this)}>
                                        <Form.Group>
                                            <Form.Label>Имэйл хаяг</Form.Label>
                                            <Form.Control
                                                placeholder="Имэйл хаяг"
                                                onChange={(e) => this.setState({email_reset: e.target.value})}
                                                value={this.state.email_reset}
                                            />
                                        </Form.Group>
                                        <div className="text-center">
                                            <Button style={{position: 'relative', paddingLeft: this.state.resetLoading ? 35 : 20}} disabled={this.state.resetLoading} type="submit" className="btn btn-btn btn-submit">
                                                {
                                                    this.state.resetLoading ? (
                                                        <img src="/images/sync-outline.svg" className="spinner"/>
                                                    ) :  (
                                                        null
                                                    )
                                                }
                                                Илгээх
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <Modal show={this.state.showModal}  onHide={() => this.setState({showModal: false})} size={"lg"}>
                        <Modal.Header closeButton/>
                        <Modal.Body>
                            <div className="register-term">
                                <h2>ҮЙЛЧИЛГЭЭНИЙ НӨХЦӨЛ</h2>
                                <p style={{textAlign: 'center'}}>2020 он Улаанбаатар хот</p>
                                <p>Та OdoSury.com сургалтын платформд бүртгүүлснээр үйлчилгээний нөхцөл болон талуудын эрх үүргийг зөвшөөрч байгаа болно. Хэрэв энэхүү үйлчилгээний нөхцөлийг зөвшөөрөөгүй тохиолдолд odosury.com платформд байрших хичээлийг үзэх боломжгүй болно.</p>
                                <p>Энэхүү үйлчилгээний нөхцөлд дурьдсан нэр томъёог дараахь утгаар ойлгоно. Үүнд:</p>

                                <h3>НЭГ: НЭР ТОМЬЁО</h3>
                                <p>1. Энэхүү гэрээнд заасан нэр томъёог дараах утгаар ойлгоно. </p>
                                <p>1.2 “Багш” гэж цахим сургалтанд өөрийн оюуны бүтээл, мэдлэг, туршлагаа odosury платформ дээр байршуулж буй оюуны өмч эзэмшигч иргэн, хуулийн этгээдийг хэлнэ.</p>
                                <p>1.3 “Контент” гэж сургагч талын оюуны хөдөлмөрийн дүнд бий болсон видео, аудио, поверпойнт гэх мэт төрөл бүрийн форматаар бэлдсэн  хичээлүүд.</p>
                                <p>1.4 “Оюуны өмч” гэж Сургагч тал өөрийн контентоо оюуны өмчийн эрхийг зохих байгууллагад бүртгүүлсэн байхыг.</p>
                                <p>1.5 “Платформ” гэж сургагч талын контентийг байршуулах цахим хэрэглэгдэхүүн.</p>
                                <p>1.6 “Аппликэйшн” гэж сургагч талын контентийг байршуулах гар утасны цахим хэрэглэгдэхүүн.</p>
                                <p>1.7 “Нэгж хичээл” гэж сургагч талын бэлдсэн 1 видео хичээлийг.</p>
                                <p>1.8 “Курс хичээл” гэж Сургагч талын бэлдсэн олон тооны видео контентийг.</p>
                                <p>1.9 “Суралцагч” гэж контент худалдан авч буй хүмүүсийг тус тус ойлгоно.</p>

                                <h3>ХОЁР: ТАЛУУДЫН ЭРХ ҮҮРЭГ</h3>
                                <p><b>2.1 Суралцагч тал:</b> </p>
                                <p>2.1.1 Суралцагч тал контент худалдан авсан өдрөөс эхлэн заасан хугацаанд тухайн контентыг дахин давтан үзэх эрхтэй.</p>
                                <p>2.1.2 Сургагч талд сургалттай холбоотой санал хүсэлт гаргах эрхтэй.</p>
                                <p>2.1.3 Сургагч талаас сургалттай холбоотой бичиг баримт авах эрхтэй.</p>
                                <p>2.1.4 Суралцагч сертификат авахгүй тохиолдолд төгсөх шалгалтыг өгөхгүй байх эрхтэй.</p>
                                <p>2.1.5 Төлбөр төлөх хугацааг хойшлуулсан бол уг тохиролцсон хугацаанд суралцагч тал  төлбөрөө төлөх үүрэгтэй.</p>
                                <p>2.1.6 Суралцагч худалдаж авсан контентоо буцаах эрхгүй ба сонголт хийхээсээ өмнө жишээ контентыг сайтар үзэж сонголтоо хийх үүрэгтэй.</p>
                                <p>2.1.7 Гэрээнд заасан төлбөр тооцоогоо цаг тухайд нь төлөх үүрэгтэй.</p>
                                <p>2.1.8 Хичээл төгсөхөд сургагч талын зүгээс олгогдох баримт бичигт зөвхөн шалгалтын дүнгээр тавигдана гэдэгийг хүлээн зөвшөөрөх үүрэгтэй.</p>
                                <p>2.1.9 Суралцагч бүртгүүлэхдээ өөрийн мэдээллийг үнэн зөв бүрэн бөглөх үүрэгтэй.</p>
                                <p><b>2.2 Сургагч тал: </b></p>
                                <p>2.2.1 Суралцагчийг хичээлээ бүрэн үзэж судалж байгаа эсэхийг хянах эрхтэй.</p>
                                <p>2.2.2 Суралцагчыг сургалтын төлбөрөө цаг тухайд нь төлөхийг шаардах эрхтэй.</p>
                                <p>2.2.3 Хэрэв суралцагч тал нь сургалтын төлбөрөө хичээл эхлэхэд дутуу төлсөн бол уг төлбөрийг гүйцэд төлтөл сургагч тал суралцагчийг хичээлд оруулахгүй байх эрхтэй.</p>
                                <p>2.2.4 Суралцагчид олгох төгсөх үеийн бичиг баримтанд төгсөлтийн шалгалтын дүнг үндэслэж мэдээлэл бичигдэхийг анхааруулах эрхтэй.</p>
                                <p>2.2.5 Сургагч тал сургалтын платформд байрших хичээлүүдэд ямар ч үед урьдчилан мэдэгдэлгүйгээр өөрчлөлт оруулах эрхтэй.</p>
                                <p>2.2.6 Сургалт чөлөөтэй явагдах нөхцөлийг бүрдүүлэх үүрэгтэй</p>
                                <p>2.2.7 Сургалтын хичээлийг цаг тухайд нь платформд оруулах үүрэгтэй</p>
                                <p>2.2.8 Суралцагчийг төгсөхөд сургалтанд хамрагдсаныг нотлох бичиг баримтаар хангах үүрэгтэй</p>

                                <h3>ГУРАВ: СУРГАЛТЫН ТУХАЙ</h3>
                                <p>3.1 Сургалт бүр нь заасан хугаацаатай ба тухайн хугацаандаа явагдаж дуусна. / нэг удаагийн сургалт нь онлайн учир сурагчдын тоо хамаарахгүй, хугацааны хувьд янз бүр байна./</p>
                                <p>3.3 Суралцагч нь энэхүү гэрээний заасан хугацаанд  7 болон түүнээс илүү хугацаагаар хоцрохоор бол энэ тухайгаа багш эсвэл сургагч талын сургалтын менежерт мэдэгдэнэ.</p>
                                <p>3.4 Суралцагч нь хичээлээс хамааран явцын шалгалт өгөх бөгөөд энэ нь тухайн суралцагчийн сурсан мэдлэгийн түвшинг тогтоох зорилготойг талууд харилцан тохиролцов.</p>
                                <p>3.5 Суралцагч сургагч талын сургалтанд хамрагдсаныг нотлох бичиг баримтыг авахдаа сургалтын төгсгөлд төгсөлтийн шалгалтанд хамрагдана.</p>
                                <p>3.6 Суралцагчид болон сургагч тал харилцан тохиролцож хичээл оролтыг түр хойшлуулах, өдөр сарыг өөрчилж болно.</p>

                                <h3>ДӨРӨВ: ОНЦГОЙ НӨХЦӨЛ</h3>
                                <p>4.1 Талууд харилцан тохиролцсоны үндсэн дээр дараах тохиолдолоос бусад тохиолдолд ямар ч үед сургалтын төлбөрийг буцаахгүй байхаар тохиролцов.</p>
                                <p>Үүнд:</p>
                                <p>4.1.1 Суралцагч тал нь гэрээ байгуулсанаас хойш аливаа осол гэмтэл, аваар ослын улмаас хөдөлмөрийн чадварийн 30 ба түүнээс дээш хувиа алдсан болох нь мэргэжлийн байгууллагын дүгнэлтээр тогтоогдсон</p>
                                <p>4.1.2 Сургагч тал нь татан буугдсан</p>
                                <p>4.2 4.1 -д зааснаас бусад ямарч тохиолдолд сургалтын төлбөрийг буцаахгүй байхаар харилцан тохиролцов.</p>

                                <h3>ТАВ: БУСАД</h3>
                                <p>5.1 Суралцагч тал гэрээг зөвшөөрөх товчийг дарсан тохиолдолд энэхүү гэрээ нь хүчин төгөлдөр болох бөгөөд талуудын хооронд маргаан гарах аваас зөвшилцөлийн замаар шийдвэрлэх бүхийл арга хэмжээг авна. </p>
                                <p>5.2 Суралцагч нь сургалтын заасан хугацаанд хичээлдээ суугаагүй нь төлбөр буцаах үндэслэл болохгүй.</p>
                                <p>5.3  Татац хэлбэрээр байршисан хичээлийг цааш хувьлан олшруулах олон нийтэд түгээхийг хориглоно.</p>
                                <p>5.4 Сургагч тал сургалтын платформоо сайжруулж шинэчилж болох ба энэ тухай суралцагч талд урьпчилан мэдэгдэхгүй байж болно.</p>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Home);