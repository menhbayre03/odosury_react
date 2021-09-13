import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import {Container, Row, Col, Button, Modal} from "react-bootstrap";
import * as actions from '../../actions/results_actions';
import {Link} from "react-router-dom";
import Select from "react-dropdown-select";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
import moment from "moment";
import config, {resultToLetter} from "../../config";
import {getResults} from "../../actionTypes";
const reducer = ({ main, results }) => ({ main, results });

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize: 5,
        }
    }
    componentDidMount() {
        const {match, dispatch, main: {user}, history} = this.props;
        if(user && user._id) {
            null
        } else {
            history.replace('/test', null);
            config.get('emitter').emit('warning', 'Та нэвтэрч орно уу');
        }
        let cc = {
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
        };
        dispatch(actions.getResults(cc));
    }
    pageHandler(current){
        const {dispatch, match} = this.props;
        let page = current - 1;
        let cc  = {
            search: this.state.search,
            pageNum: page,
            pageSize: this.state.pageSize,
        };
        this.setState({pageNum: page});
        dispatch(actions.getResults(cc));
    }
    render() {
        const {results:{results, loading, all}, main:{user}} = this.props;

        let items = [];
        if(Math.ceil((all || 0)/this.state.pageSize)<=10){
            for (let i = 1; i <= Math.ceil((all || 0)/this.state.pageSize); i++) {
                items.push(
                    <a style={{cursor:'pointer'}} onClick={this.pageHandler.bind(this, i)} className={`page-numbers ${i === (this.state.pageNum+1) ? 'current' : null}`}><span>{i}</span></a>
                    // <Pagination.Item onClick={this.nextWeek.bind(this, 'static',i)} active={i === (this.state.pageNum+1)}>{i}</Pagination.Item>
                );
            }
        }else{
            if((this.state.pageNum+1)===1 || (this.state.pageNum+1)===2 || (this.state.pageNum+1)===3 || (this.state.pageNum+1)===4){
                for (let i = 1; i <= 5; i++) {
                    items.push(
                        <a style={{cursor:'pointer'}} onClick={this.pageHandler.bind(this, i)} className={`page-numbers ${i === (this.state.pageNum+1) ? 'current' : null}`}><span>{i}</span></a>
                        // <Pagination.Item onClick={this.nextWeek.bind(this, 'static',i)} active={i === (this.state.pageNum+1)}>{i}</Pagination.Item>
                    );
                }
                items.push(
                    <a style={{cursor:'pointer'}} className="page-numbers"><span>...</span></a>
                    // <Pagination.Ellipsis />
                );
                items.push(
                    <a style={{cursor:'pointer'}} onClick={this.pageHandler.bind(this, Math.ceil((all || 0)/this.state.pageSize))} className={`page-numbers ${(this.state.pageNum+1) === Math.ceil((all || 0)/this.state.pageSize) ? 'current' : null}`}><span>{Math.ceil((all || 0)/this.state.pageSize)}</span></a>
                    // <Pagination.Item onClick={this.nextWeek.bind(this, 'static',Math.ceil((all || 0)/this.state.pageSize))} active={(this.state.pageNum+1) === Math.ceil((all || 0)/this.state.pageSize)}>{Math.ceil((all || 0)/this.state.pageSize)}</Pagination.Item>
                );
            }else if( (this.state.pageNum+1)=== Math.ceil((all || 0)/this.state.pageSize) || (this.state.pageNum+1)=== Math.ceil((all || 0)/this.state.pageSize)-1 || (this.state.pageNum+1)=== Math.ceil((all || 0)/this.state.pageSize)-2 || (this.state.pageNum+1)=== Math.ceil((all || 0)/this.state.pageSize)-3){

                items.push(
                    <a style={{cursor:'pointer'}} onClick={this.pageHandler.bind(this, 1)} className={`page-numbers ${(this.state.pageNum+1) === 1 ? 'current' : null}`}><span>1</span></a>
                    // <Pagination.Item onClick={this.nextWeek.bind(this, 'static',1)} active={(this.state.pageNum+1) === 1}>1</Pagination.Item>
                );
                items.push(
                    <a style={{cursor:'pointer'}} className="page-numbers"><span>...</span></a>
                    // <Pagination.Ellipsis />
                );
                for (let i = Math.ceil((all || 0)/this.state.pageSize)-4; i <= Math.ceil((all || 0)/this.state.pageSize); i++) {
                    items.push(
                        <a style={{cursor:'pointer'}} onClick={this.pageHandler.bind(this, i)} className={`page-numbers ${i === (this.state.pageNum+1) ? 'current' : null}`}><span>{i}</span></a>
                        // <Pagination.Item onClick={this.nextWeek.bind(this, 'static',i)} active={i === (this.state.pageNum+1)}>{i}</Pagination.Item>
                    );
                }
            }else {
                items.push(
                    <a style={{cursor:'pointer'}} onClick={this.pageHandler.bind(this, 1)} className={`page-numbers ${(this.state.pageNum+1) === 1 ? 'current' : null}`}><span>1</span></a>
                    // <Pagination.Item onClick={this.nextWeek.bind(this, 'static',1)} active={(this.state.pageNum+1) === 1}>1</Pagination.Item>
                );
                items.push(
                    <a style={{cursor:'pointer'}} className="page-numbers"><span>...</span></a>
                    // <Pagination.Ellipsis />
                );
                for (let i = (this.state.pageNum+1)-2; i <= (this.state.pageNum+1)+2; i++) {
                    items.push(
                        <a style={{cursor:'pointer'}} onClick={this.pageHandler.bind(this, i)} className={`page-numbers ${i === (this.state.pageNum+1) ? 'current' : null}`}><span>{i}</span></a>
                        // <Pagination.Item onClick={this.nextWeek.bind(this, 'static',i)} active={i === (this.state.pageNum+1)}>{i}</Pagination.Item>
                    );
                }
                items.push(
                    <a style={{cursor:'pointer'}} className="page-numbers"><span>...</span></a>
                    // <Pagination.Ellipsis />
                );
                items.push(
                    <a style={{cursor:'pointer'}} onClick={this.pageHandler.bind(this, Math.ceil((all || 0)/this.state.pageSize))} className={`page-numbers ${(this.state.pageNum+1) === Math.ceil((all || 0)/this.state.pageSize) ? 'current' : null}`}><span>{Math.ceil((all || 0)/this.state.pageSize)}</span></a>
                    // <Pagination.Item onClick={this.nextWeek.bind(this, 'static',Math.ceil((all || 0)/this.state.pageSize))} active={(this.state.pageNum+1) === Math.ceil((all || 0)/this.state.pageSize)}>{Math.ceil((all || 0)/this.state.pageSize)}</Pagination.Item>
                );
            }
        }
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
                                        {results?.map( (r) =>
                                            
                                                <div className="resultItem">
                                                    <Link to={`/test/result/${r._id}`}>
                                                    <h6 style={{fontWeight: 600, fontSize: 18}}>
                                                        {r.test && r.test.title? r.test.title : 'Тест'}
                                                    </h6>
                                                    <div className="body">
                                                        <b>ШАЛГАЛТ ӨГСӨН ОГНОО:</b> {moment(r.created).format('DD/MM/YYYY H:mm')}
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
                                                        {/*{typeof r.result === 'number'?*/}
                                                        {/*    <React.Fragment>*/}
                                                        {/*        {r.result || 0}% {resultToLetter(r.result || 0)}*/}
                                                        {/*    </React.Fragment>*/}
                                                        {/*    :*/}
                                                        {/*    null*/}
                                                        {/*}*/}
                                                        {r.result || 0}% {resultToLetter(r.result || 0)}
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
                            {
                                items.length > 1 ? (
                                    <div className="row mb60">
                                        <div className="col-lg-12">
                                            <nav className="navigation">
                                                {items}
                                            </nav>
                                        </div>
                                    </div>
                                ) : null
                            }
                
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