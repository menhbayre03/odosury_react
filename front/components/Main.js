import React, { Component } from "react";
import { connect } from 'react-redux';
import {renderRoutes} from 'react-router-config';
import config from "../config";
import Payment from "./include/Payment";
import Api from "../../admin/actions/api";
import Cookies from "js-cookie";
import {Button, Form, Modal, Row, Col} from "react-bootstrap";
import FacebookLogin from "react-facebook-login";
import * as actions from "../actions/auth_actions";
import ReactPasswordStrength from "react-password-strength";

const reducer = ({ main, payment, auth}) => ({ main, payment, auth});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
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
            data: null,

            active: 'login'
        };
        config.config({history: this.props.history});
    }
    componentDidMount() {
        const { main: {userReset, token}, history} = this.props;
        let self = this;
        if(userReset) {
            this.setState({
                showResetForm: true,
                active: 'reset',
                passResetUser: userReset,
                passResetToken: token,
                showLogin: true
            })
        }
        this.openLogin = config.get('emitter').addListener('openLogin', function (data) {
            self.setState({showLogin: true, data: data || null})
        })
    }
    componentWillUnmount() {
        this.openLogin && this.openLogin.remove();
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
    async responseFacebook(data) {
        this.setState({fbLoading: true});
        // const res = await config.get('fbApi').login();
        // if(res && res.status === "connected" && (res.authResponse || {}).accessToken) {
        const response = await Api.login(`/api/fb/login`, {token: data.accessToken});
        if (response.success === true) {
            var sss = this.state.data;
            this.setState({fbLoading: false, showLogin: false, data : null}, () => dispatch(actions.setUser(response, sss)));
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
        const {dispatch} = this.props;
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
                var sss = this.state.data || null;
                this.setState({loading: false, showLogin: false, data : null}, () => dispatch(actions.setUser(response, sss)));
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

    closeLogin() {
        this.setState({
            showLogin: false,
            username: '',
            password: '',

            passValid: false,
            emailRegister: '',
            usernameRegister: '',
            phoneRegister: '',
            passwordRegister: '',
            passwordRepeatRegister: '',
            terms: false,
        })
    }

    async handleSubmitRegister(e) {
        const {dispatch} = this.props;
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
            if(this.state.passwordRegister.length < 6) {
                errors.passwordRegister = true;
                errors.passwordNoValid = true
            } else {
                noErr.passwordRegister = false;
                noErr.passwordNoValid = false
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
            errors.terms = true;
            config.get('emitter').emit('warning', 'Үйлчилгээний нөxцөл зөвшөөрөөгүй байна');

        } else {
            noErr.terms = false;
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
                var sss = this.state.data || null;
                this.setState({resendLoading: false, registerLoading: false, registerDone: true, loading: false, showLogin: false, data : null}, () => dispatch(actions.setUser(response, sss)));
                config.get('emitter').emit('success', 'Системд нэвтэрлээ');
                // this.setState({resendLoading: false, registerLoading: false, registerDone: true, username: response.username, active: 'login'});
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
            if(this.state.passReset.length < 6) {
                errors.passReset = true;
                errors.passResetNoValid = true
            } else {
                noErr.passReset = false;
                noErr.passResetNoValid = false
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
                config.get('emitter').emit('success', 'Амжилттай солигдлоо, нэвтэрж орно уу');
                this.setState({
                    passReset: '',
                    passResetRepeat: '',
                    passResetUser: {},
                    passResetToken: '',
                    passResetDone: true,
                    passResetValid: false,
                    showResetForm: false,
                    passResetLoading: false,
                    active: 'login',
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
        const { route: {routes}} = this.props;
        return (
            <React.Fragment>
                <main className="main-main">
                    <Payment/>
                    {renderRoutes(routes)}
                    <Modal size="lg" className="loginModal" show={this.state.showLogin} onHide={this.closeLogin.bind(this)}>
                        {/*<Modal.Header closeButton>*/}
                        {/*    <span>Нэвтрэх</span>*/}
                        {/*</Modal.Header>*/}
                        <div className="log-block login">
                            <Row noGutters={true}>
                                <Col md={6}>
                                    {
                                        this.state.active === 'register' ? (
                                            <div className="login-left">
                                                <div className="login-secret" style={{position: 'absolute', top: 0, right: 0}}>
                                                    <ion-icon onClick={this.closeLogin.bind(this)} name="close" className="login-right-button" style={{
                                                        fontSize: 24,
                                                        color: 'gray',
                                                        padding: 10,
                                                        cursor: 'pointer'
                                                    }} />
                                                </div>
                                                <h4>Бүртгүүлэх</h4>
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
                                                            Утасны дугаар буруу байна уу.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Нууц үг *</Form.Label>
                                                        <Form.Control
                                                            hidden={false}
                                                            type="password"
                                                            placeholder="*************"
                                                            value={this.state.passwordRegister}
                                                            isInvalid={!!this.state.error.passwordRegister}
                                                            onChange={(e)=> this.setState({passwordRegister: e.target.value})}
                                                        />
                                                        {/* <ReactPasswordStrength
                                                            className="customClass"
                                                            minLength={5}
                                                            minScore={3}
                                                            scoreWords={['хэт богино', 'сул', 'дунд', 'сайн', 'маш сайн']}
                                                            tooShortWord={'боломжгүй'}

                                                            changeCallback={this.changePass.bind(this)}
                                                            inputProps={{ isInvalid: this.state.error.passwordRegister, value: this.state.passwordRegister, placeholder: "*************", name: "passwordRegister", autoComplete: "off", className: "form-control" }}
                                                        /> */}
                                                        <Form.Control.Feedback type="invalid">
                                                            {
                                                                this.state.error.passwordNoValid ? 'Нууц үг хангалтгүй байна (6-аас дээш урттай байх)' : 'Нууц үг оруулна уу.'
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
                                                        <Form.Check onChange={() => this.setState({terms: !this.state.terms})} type="checkbox" label="Үйлчигээний нөхцөлийг зөвшөөрч байна" isInvalid={!!this.state.error.terms} id="reg-check" htmlFor="reg-check" />
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
                                                <div className="login-bottom-button">
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
                                                            {/*<ion-icon name="logo-facebook"/>*/}
                                                            <span>Facebook</span></div>
                                                    </div>
                                                    <Button style={{position: 'relative', paddingLeft: this.state.loading ? 35 : 20}} onClick={() => this.setState({active: 'login'})} className="btn btn-btn btn-submit">
                                                        Нэвтрэх
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            this.state.active === 'reset' ? (
                                                this.state.showResetForm ? (
                                                    <div className="login-left">
                                                        <div className="login-secret" style={{position: 'absolute', top: 0, right: 0}}>
                                                            <ion-icon onClick={this.closeLogin.bind(this)} name="close" className="login-right-button" style={{
                                                                fontSize: 24,
                                                                color: 'gray',
                                                                padding: 10,
                                                                cursor: 'pointer'
                                                            }} />
                                                        </div>
                                                        <h4>Нууц үг сэргээх</h4>
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
                                                                    <Form.Control
                                                                        hidden={false}
                                                                        type="password"
                                                                        placeholder="*************"
                                                                        value={this.state.passReset}
                                                                        isInvalid={!!this.state.error.passReset}
                                                                        onChange={(e)=> this.setState({passReset: e.target.value})}
                                                                    />
                                                                    {/* <ReactPasswordStrength
                                                                        className="customClass"
                                                                        minLength={5}
                                                                        minScore={3}
                                                                        scoreWords={['хэт богино', 'сул', 'дунд', 'сайн', 'маш сайн']}
                                                                        tooShortWord={'боломжгүй'}
                                                                        changeCallback={(e) =>  this.setState({passReset: e.password, passResetValid: e.isValid})}
                                                                        inputProps={{ isInvalid: this.state.error.passReset, value: this.state.passReset, placeholder: "*************", name: "passReset", autoComplete: "off", className: "form-control" }}
                                                                    /> */}
                                                                    {/* <Form.Control.Feedback type="invalid">
                                                                        {
                                                                            this.state.error.passResetNoValid ? 'Нууц үг хангалтгүй байна' : 'Нууц үг оруулна уу.'
                                                                        }
                                                                    </Form.Control.Feedback> */}
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {
                                                                            this.state.error.passResetNoValid ? 'Нууц үг хангалтгүй байна (6-аас дээш урттай байх)' : 'Нууц үг оруулна уу.'
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
                                                        <div className="login-bottom-button">
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
                                                                    {/*<ion-icon name="logo-facebook"/>*/}
                                                                    <span>Facebook</span></div>
                                                            </div>
                                                            <Button style={{position: 'relative', paddingLeft: this.state.loading ? 35 : 20}} onClick={() => this.setState({active: 'login'})} className="btn btn-btn btn-submit">
                                                                Нэвтрэх
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    ) : (
                                                    <div className="login-left">
                                                        <div className="login-secret" style={{position: 'absolute', top: 0, right: 0}}>
                                                            <ion-icon onClick={this.closeLogin.bind(this)} name="close" className="login-right-button" style={{
                                                                fontSize: 24,
                                                                color: 'gray',
                                                                padding: 10,
                                                                cursor: 'pointer'
                                                            }} />
                                                        </div>
                                                        <h4>Нууц үг сэргээх</h4>
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
                                                        <div className="login-bottom-button">
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
                                                                    {/*<ion-icon name="logo-facebook"/>*/}
                                                                    <span>Facebook</span></div>
                                                            </div>
                                                            <Button style={{position: 'relative', paddingLeft: this.state.loading ? 35 : 20}} onClick={() => this.setState({active: 'login'})} className="btn btn-btn btn-submit">
                                                                Нэвтрэх
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    )
                                            ) : (
                                                <div className="login-left" style={{position: 'relative'}}>
                                                    <div className="login-secret" style={{position: 'absolute', top: 0, right: 0}}>
                                                        <ion-icon onClick={this.closeLogin.bind(this)} name="close" className="login-right-button" style={{
                                                            fontSize: 24,
                                                            color: 'gray',
                                                            padding: 10,
                                                            cursor: 'pointer'
                                                        }} />
                                                    </div>
                                                    <h4>Нэвтрэх</h4>
                                                    <Form onSubmit={this.handleSubmit.bind(this)}>
                                                        <Form.Group>
                                                            <Form.Label>Хэрэглэгчийн нэр / Имэйл</Form.Label>
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
                                                        <div className="text-right">
                                                            <span style={{cursor: 'pointer'}} onClick={() => this.setState({active: 'reset'})} className="forgot">Нууц үгээ мартсан</span>
                                                        </div>
                                                    </Form>
                                                    <div className="login-bottom-button">
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
                                                                {/*<ion-icon name="logo-facebook"/>*/}
                                                                <span>Facebook</span></div>
                                                        </div>
                                                        <Button style={{position: 'relative', paddingLeft: this.state.loading ? 35 : 20}} onClick={() => this.setState({active: 'register'})} className="btn btn-btn btn-submit">
                                                            Бүртгүүлэх
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </Col>
                                <Col md={6}>
                                    <div className="login-right" style={{position: 'relative'}}>
                                        <ion-icon onClick={this.closeLogin.bind(this)} name="close" className="login-right-button" style={{
                                            fontSize: 24,
                                            color: '#fff',
                                            padding: 10,
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            cursor: 'pointer'
                                        }} />
                                        <img src="/images/logo.png" alt=""/>
                                        <div>
                                            <h3>ТАСРАЛТГҮЙ СУРАЛЦ</h3>
                                            <p>Таны сурч хөгжих хязгааргүй хэрэгцээг хангахын тулд бүгдийг нэг дор цогцлоосон онлайн сургалтын платформд тавтай морил.</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Modal>
                </main>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Home);
