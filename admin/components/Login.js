import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Api from '../actions/api'
import config from '../config';
import {Row, Form, Input, Button, message} from 'antd'
import {
    UserOutlined,
    KeyOutlined,
} from '@ant-design/icons';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.loginEnter = this.loginEnter.bind(this);
    }

    componentDidMount() {
        let self = this;
        this.redirectLogin = config.get('emitter').addListener('redirectLogin',function(){
            setTimeout(() => {
                self.props.router.push('/erp');
            }, 300);
        });
        this.error = config.get('emitter').addListener('error',function(text){
            if (text) {
                message.warning(text)
            }
        });
        this.warning = config.get('emitter').addListener('warning',function(text){
            if (text) {
                message.warning(text)
            }
        });
        this.success = config.get('emitter').addListener('success',function(text){
            if (text) {
                message.success(text)
            }
        });
    }

    componentWillUnmount() {
        this.redirectLogin.remove();
        this.error.remove();
        this.warning.remove();
        this.success.remove();
    }

    async loginEnter(data) {
        const response = await Api.login(`/admin/login`, data);
        if (response.success === true) {
            // let d = new Date();
            // d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
            // let expires = "expires=" + d.toUTCString();
            // console.log(expires)
            // document.cookie = "token=" + response.token + ";" + response.maxAge + ";path=/";
            window.location = "/admin";
        } else {
            message.error(response.message);
        }
    };

    render() {
        return (
            <Fragment>
                <div className="login-container">
                    <div className="form___3Tq4m">
                        <div className="logo___3tfTW">
                            <h2 style={{fontSize: 32, lineHeight: '24px', color: '#555'}}>OdoSury</h2>
                        </div>
                        <Form
                            onFinish={this.loginEnter.bind(this)}>
                            <Form.Item name={'username'} hasFeedback rules={[{ required: true , message: 'Нэвтрэх нэр оруулна уу' }]}>
                                <Input
                                    type="text"
                                    prefix={<UserOutlined style={{ fontSize: 13 }} />}
                                    placeholder={`Нэвтрэх нэр`}
                                />
                            </Form.Item>
                            <Form.Item name={'password'} hasFeedback rules={[{ required: true, message: 'Нууц үг оруулна уу' }]}>
                                <Input
                                    type="password"
                                    prefix={<KeyOutlined style={{ fontSize: 13 }} />}
                                    placeholder={`Нууц үг`}
                                />
                            </Form.Item>
                            <Row>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    loading={this.state.loading}
                                >
                                    Нэвтрэх
                                </Button>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.main.user
    }
}

export default connect(mapStateToProps)((Login));
