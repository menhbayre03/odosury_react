import React, { Component } from "react";
import { connect } from 'react-redux';
import {renderRoutes} from 'react-router-config';
import config from "../config";
import {
    isMobile,
    isIOS
} from "react-device-detect";

const reducer = ({ main}) => ({ main});

class Home extends Component {
    constructor(props) {
        super(props);
        config.config({history: this.props.history});
    }
    componentDidMount() {
        const { main: {userReset}, history} = this.props;
        if(userReset) {
            history.push('/login', {showResetForm: true})
        }
    }

    render() {
        const { route: {routes}} = this.props;
        return (
            <React.Fragment>
                <div className="main-main">
                    {/* { */}
                    {/*     isMobile ? ( */}
                    {/*         <div style={{position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 99999}}> */}
                    {/*             <img style={{width: 100, heigth: 100}} src="/images/logo-store.png" /> */}   
                    {/*         </div> */}
                    {/*     ) : null */}
                    {/* } */}
                    {renderRoutes(routes)}
                </div>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Home);
