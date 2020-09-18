import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import Routes from './Routes';
import RoutesLogin from './RoutesLogin';
import {Layout, Menu, message} from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
// import Layer from '../components/Layer'
import {connect} from "react-redux";
// import facebookLogin from 'facebook-login';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import config from "../config";
// const api = facebookLogin({ appId: '1025498560826970' });
// require("../../static/cssSchool/restaurant.less");

const reducer = ({ main }) => ({ main });

class index extends React.Component{
    constructor(props){
        super(props);
        // config.config({
        //     'fbApi': api,
        //     history: this.props.history,
        // });
        if(!props.main.user) {
            let aa = window.location.pathname.split('/').filter(function (el) {
                return (el != null && el !== '');
            });

            if(aa && aa.length > 0) {
                window.location.assign("/");
            }
        }
    }

    componentDidMount() {
        //EVENT EMITTERS
        this.system_success = config.get('emitter').addListener('success',function(text){
            if(text != undefined && text != ''){
                message.success(text)
            }
        });
        this.system_errors = config.get('emitter').addListener('error',function(text){
            if(text != undefined && text != ''){
                message.error(text)
            }
        });
        this.system_alert = config.get('emitter').addListener('warning',function(text){
            if(text != undefined && text != ''){
                message.warning(text);
            }
        });
        this.auth_error = config.get('emitter').addListener('auth-error',function(){
            window.location.assign("/");
        });
        this.not_found = config.get('emitter').addListener('not-found',function(){
            window.location.assign("/not-found");
        });
        //EVENT EMITTERS END
    }
    componentWillUnmount() {
        this.auth_error.remove();
        this.not_found.remove();
        this.system_errors.remove();
        this.system_success.remove();
        this.system_alert.remove();
    }
    render(){
        const { main: {user} } = this.props;
        return(
            <BrowserRouter>
                {/*<Layer>*/}
                    {renderRoutes((user !== {} && user !== '' && user != null) ? Routes : RoutesLogin)}
                {/*</Layer>*/}
            </BrowserRouter>
        )
    }
}
export default  connect(reducer)(index);