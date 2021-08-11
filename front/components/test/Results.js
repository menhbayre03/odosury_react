import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import {Container, Row, Col, Button, Modal} from "react-bootstrap";
import * as actions from '../../actions/test_actions';
import {Link} from "react-router-dom";
import Select from "react-dropdown-select";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
import config from "../../config";
import moment from "moment";
const reducer = ({ main, test }) => ({ main, test });

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const {test:{tests, loading, all, openTest}} = this.props;
        let fakeData = [{_id:'aa'},{_id:'aa'}];
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="list-container" style={{minHeight: 'calc(100vh - 185px)'}}>
                    <Container>
                        <Row>
                            <Col xl={9} lg={8} md={7} sm={12}>
                                <div className="list-content">
                                    <div className="list-header">
                                        <div>
                                            <h3>Тестийн хариу</h3>
                                        </div>
                                    </div>
                                </div>
                            <Loader>
                            <Row>
                                <Col lg={10} md={10} sm={10} style={{marginBottom: 30}}>
                                    
                                    <div className="resultList">
                                        {fakeData?.map( (r) =>
                                            
                                                <div className="resultItem">
                                                    <Link to={`/test/result/${r._id}`}>
                                                    <h6 style={{fontWeight: 600, fontSize: 18}}>
                                                        ExampleJS-ийн шалгалт
                                                    </h6>
                                                    <div className="body">
                                                        <b>ШАЛГАЛТ ӨГСӨН ОГНОО:</b> 08/09/2021 18:21
                                                        <div>
                                                            <b>СЕРТИФИКАТ: </b> 
                                                            <span style={{color: '#28a745'}}>  ОЛГОСОН</span>
                                                        </div>
                                                    </div>
                                                    <div style={{position: 'absolute',
                                                                color: '#fff',
                                                                marginTop: '-60px',
                                                                marginLeft: '520px',
                                                                fontWeight: 700,
                                                                }}
                                                        className="textRotate"
                                                    >
                                                        94% A
                                                    </div>
                                                    </Link>
                                                </div>
                                            
                                        )}

                                                

                                        {/* <div className="resultItem" style={{
                                            background: 'linear-gradient(to top right,transparent 50%, #f171e0 0) top right/110px 110px no-repeat, #fff'
                                        }}>
                                            <h6 style={{fontWeight: 600, fontSize: 18}}>
                                            Жишээ шалгалт
                                            </h6>
                                            <div className="body">
                                                <b>ШАЛГАЛТ ӨГСӨН ОГНОО:</b> 08/10/2021 14:26
                                                <div>
                                                    <b>СЕРТИФИКАТ: </b> 

                                                    <span style={{color: '#28a745'}}>  ОЛГООГҮЙ</span>
                                                </div>
                                            </div>
                                            <div style={{position: 'absolute',
                                                        color: '#fff',
                                                        marginTop: '-60px',
                                                        marginLeft: '520px',
                                                        fontWeight: 700,
                                                        }}
                                                        className="textRotate">74% C</div>
                                        </div> */}
                                    </div>
                                </Col>
                            </Row>
                
                            </Loader>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default  connect(reducer)(Results);