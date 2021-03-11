import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import Routes from './Routes';
import Layer from '../components/Layer'
import {connect} from "react-redux";
import config from "../config";
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
// import facebookLogin from 'facebook-login';
// const api = facebookLogin({ appId: '1025498560826970' });
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'
import 'react-photoswipe/lib/photoswipe.css';
import "react-datepicker/dist/react-datepicker.css";
import 'swiper/swiper.less'
import io from "socket.io-client";
import * as actions from "../actions/card_actions";
import * as homeActions from "../actions/home_actions";
import SmartBanner from 'react-smartbanner';
import '../../node_modules/react-smartbanner/dist/main.css';
require("../../static/css/front.less");
const socket = io(`${config.get('host')}:8021`, {path:'/api/socket',transports:['websocket']});

const reducer = ({ main }) => ({ main });

class index extends React.Component{
    constructor(props){
        super(props);
        // config.config({
        //     'fbApi': api
        // });
        this.socket = socket;
    }

    componentDidMount() {
        const optios = {
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true,
                showIcon: true,
                pauseOnHover: true
            },
            touchSlidingExit: {
                swipe: {
                    duration: 400,
                    timingFunction: 'ease-out',
                    delay: 0,
                },
                fade: {
                    duration: 400,
                    timingFunction: 'ease-out',
                    delay: 0
                }
            },
            slidingExit: {
                duration: 400,
                timingFunction: 'ease-out',
                delay: 0
            },
            slidingEnter: {
                duration: 400,
                timingFunction: 'ease-out',
                delay: 0
            }
        };
        this.success = config.get('emitter').addListener('success',function(text){
            if(text != null && text !== ''){
                store.addNotification({
                    ...optios,
                    message: text,
                    type: "default",
                });
            }
        });
        this.error = config.get('emitter').addListener('error',function(text){
            if(text != undefined && text != ''){
                store.addNotification({
                    ...optios,
                    message: text,
                    type: "warning",
                });
            }
        });
        this.warning = config.get('emitter').addListener('warning',function(text){
            if(text != undefined && text != ''){
                store.addNotification({
                    ...optios,
                    message: text,
                    type: "info",
                });
            }
        });
        this.auth_error = config.get('emitter').addListener('auth-error',function(){
            window.location.assign("/login");
        });
        this.not_found = config.get('emitter').addListener('not-found',function(){
            window.location.assign("/not-found");
        });
        if(((this.props.main || {}).user || {})._id){
            this.socket.on('odosuryphk', (data) => {
                if(data.payment_id && (data.user === ((this.props.main || {}).user || {})._id)){
                    this.props.dispatch(actions.checkQpay({c: data.payment_id}))
                }
            });
            this.socket.on('odosuryphkPremium', (data) => {
                if(data.payment_id && (data.user === ((this.props.main || {}).user || {})._id)){
                    this.props.dispatch(homeActions.checkQpay({c: data.payment_id}))
                }
            });
        }
    }

    render(){
        return(
            <BrowserRouter>
                <ReactNotification />
                <Layer>
                    {renderRoutes(Routes)}
                    <SmartBanner title={'Odosury'} daysHidden={1} daysReminder={1} appStoreLanguage={'mn'} author={'Том Амжилт ХХК'} button={'Харах'} price={{ ios: 'Үнэгүй', android: 'Үнэгүй' }} position={'top'}/>
                </Layer>
            </BrowserRouter>
        )
    }
}
export default  connect(reducer)(index);
