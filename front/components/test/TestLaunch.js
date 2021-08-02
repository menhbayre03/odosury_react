import React, { Component } from "react";
import { connect } from 'react-redux';
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import {Container, Row, Col, Button, Modal} from "react-bootstrap";
import * as actions from '../../actions/testLaunch_actions';
import {Link} from "react-router-dom";
import Select from "react-dropdown-select";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
import config from "../../config";
import moment from "moment";
const reducer = ({ main, test }) => ({ main, test });

class TestLaunch extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        const {match, dispatch} = this.props;
        let cc = {
        };
        dispatch(actions.getTest(cc, match.params.slug));
    }
    componentWillUnmount() {
    }

    render() {
        
        const {test:{test}} = this.props;
        const demoTest = [];
<<<<<<< Updated upstream
        console.log(test)
=======
        console.log(this.props.test)
>>>>>>> Stashed changes
        // for (let i = 0; i < 10; i++) {
        //     demoTest.push({
        //         _id:i,
        //         title: `test ${i+1}`,
        //         price: 20000,
        //         secret: true,
        //         oneTime: true,
        //         hasCertificate: false,
        //         // *** ed nariig avchrahgu, orond n questionQuantity, questionDuration avchirna ***
        //         // easyQuestion:[
        //         //     {quantity:1, type:'selectOne'},
        //         //     {quantity:1, type:'selectMany'},
        //         // ],
        //         // mediumQuestion:[
        //         //     {quantity:1, type:'selectOne'},
        //         //     {quantity:1, type:'selectMany'},
        //         // ],
        //         questionQuantity: 20,
        //         questionDuration: 60,
        //     });
        // }
        return (
            <React.Fragment>
                <div className="testHeader1">
                        <div className="logo" style={{display: 'inline-block'}}>
                            <img src="/images/odosuryo.png" alt="" style={{width: 175}} />
                        </div>
                </div>
                <div className="list-container" style={{minHeight: 'calc(100vh - 185px)'}}>
                        
                    <Container>
                        
                        <Loader status={false}>
                        
                            ok
                        </Loader>
                    </Container>
                </div>
                {/*<Footer/>*/}
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(TestLaunch);