import React, { Component } from "react";
import moment from "moment";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from "../include/Header";
import Footer from "../include/Footer";
import {Container, Row, Col } from "react-bootstrap";
import * as actions from '../../actions/profile_actions';
import config from "../../config";
import Loader from "../include/Loader";
import Sidebar from "./Sidebar";
const reducer = ({ main, profile }) => ({ main, profile });

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        const {dispatch, history, main: {user}} = this.props;
        config.get('ga').pageview(window.location.pathname + window.location.search);
        if(user) {
            window.scroll(0, 0);
            dispatch(actions.getLessonsProf(user._id));
        } else {
            history.push('/');
        }
    }

    render() {
        const {main: {user}, profile: {bundles, lessons, loadingLessons}} = this.props;
        console.log('what is love', bundles, "what is what", lessons);
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <Container>
                    <div className="profile-container">
                        <Row>
                            <Col md={3}>
                                <Sidebar location={this.props.location}/>
                            </Col>
                            <Col md={9}>
                                <div className="profile history">
                                    <Loader status={loadingLessons}>
                                        <h4>Худалдан авсан хичээлүүд</h4>
                                        {
                                            bundles.length > 0 || lessons.length > 0 ? (
                                                <div>
                                                    {/*{*/}
                                                    {/*    bundles.length > 0 ? (*/}
                                                    {/*        <div style={{marginBottom: 20}}>*/}
                                                    {/*            <h5 style={{fontSize:16, fontWeight: 600}}>Багцууд:</h5>*/}
                                                    {/*            {*/}
                                                    {/*                bundles.map((item , index) => (*/}
                                                    {/*                    <Link to={`/bundle/${item.slug}`} key={index} className={`history-item`}>*/}
                                                    {/*                        <div style={{display: 'inline-block'}}>*/}
                                                    {/*                            <span className="ind">{index+1}</span>*/}
                                                    {/*                            <span className="date">{item.title}</span>*/}
                                                    {/*                        </div>*/}
                                                    {/*                        <div style={{display: 'inline-block', float: 'right'}}>*/}
                                                    {/*                            <span className={`date`}>{moment(item.trans_date).format('YYYY/MM/DD')}</span>*/}
                                                    {/*                        </div>*/}
                                                    {/*                    </Link>*/}
                                                    {/*                ))*/}
                                                    {/*            }*/}
                                                    {/*        </div>*/}
                                                    {/*    ) : null*/}
                                                    {/*}*/}
                                                    {lessons.map((item, index) => (
                                                        <Link
                                                            to={item.type === "premium" ? `/premium` : item.type === "eish" ? `/eish` : `/lesson/${item.slug}`}
                                                            key={index}
                                                            className={`history-item`}
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "inline-block"
                                                                }}
                                                            >
                                                                <span className="ind">
                                                                    {index + 1}
                                                                </span>
                                                                <span className="date">
                                                                    {item.title
                                                                        ? item.title
                                                                        : item.type ===
                                                                        "premium"
                                                                        ? "Premium эрх"
                                                                        : item.type ===
                                                                        "eish"
                                                                        ? "ЭЕШ Багц"
                                                                        : null}
                                                                </span>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "inline-block",
                                                                    float: "right"
                                                                }}
                                                            >
                                                                <span
                                                                    className={`date`}
                                                                >
                                                                    {moment(
                                                                        item.trans_date
                                                                    ).format(
                                                                        "YYYY/MM/DD"
                                                                    )}
                                                                </span>
                                                                <span
                                                                    className={`date`}
                                                                >
                                                                    -
                                                                </span>
                                                                <span
                                                                    className={`date`}
                                                                >
                                                                    {moment(
                                                                        item.expires
                                                                    ).format(
                                                                        "YYYY/MM/DD"
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className='empty-data'>
                                                    <div className='emtry-picture'>
                                                        <img src="/images/empty.svg" />
                                                    </div>
                                                    <div className='emtry-text'>
                                                        Худалдан авсан хичээл алга байна
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Loader>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Bundle);