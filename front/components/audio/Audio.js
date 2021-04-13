import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from "../include/Header";
import Footer from "../include/Footer";
import { Container, Row, Col, Button, Tabs, Tab, Accordion, Card } from "react-bootstrap";
import * as actions from '../../actions/audio_actions';
import Sticky from 'react-sticky-el';
import ReactStars from "react-rating-stars-component";
import config from "../../config";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
const reducer = ({ main, audio }) => ({ main, audio });

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            activeIndex: '0',
        };
    }

    componentDidMount() {
        config.get('ga').pageview(window.location.pathname + window.location.search);
        window.scroll(0, 0);
        const {dispatch, match} = this.props;
        this.setState({active: 'overview'});
        dispatch(actions.getAudio(match.params.slug));
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(actions.clearAudio());
    }

    render() {
        const {main: {user = {}}, audio: {lesson, rating, lessonLoading}} = this.props;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="lesson-single">
                    <Loader status={lessonLoading}>
                        <div className="lesson-head" style={{backgroundImage: (`url('/images/cover.png')`)}}>
                            <div className="head-inner">
                                {
                                    isMobile ? (
                                        <img src={(lesson.thumbnail || {}).path ? `${(lesson.thumbnail || {}).url}${lesson.thumbnail.path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}
                                             style={{
                                                 height: 'auto',
                                                 margin: '0 40px',
                                                 // width: 'calc(100% - 160px)',
                                                 marginBottom: 40,
                                                 borderRadius: 10,
                                                 width: '50%',
                                                 marginLeft: 'auto',
                                                 marginRight: 'auto',
                                                 display: 'block',
                                             }}
                                        />
                                    ) : null
                                }
                                <Container>
                                    <Row style={{position: 'relative'}}>
                                        <Col lg={8} md={7}>
                                            <h2>{lesson.title}</h2>
                                            <p>{lesson.description}</p>
                                            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                                                <div style={{marginBottom: 40}}>
                                                    <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                                                    <span style={{
                                                        fontSize: 12,
                                                        color: '#fff',
                                                        marginLeft: 5,
                                                        background: '#febe42',
                                                        padding: '0px 5px',
                                                        borderRadius: 5,
                                                        marginRight: 10,
                                                        fontWeight: 700,
                                                    }}>{rating.toFixed(1)}</span>
                                                        <ReactStars
                                                            count={5}
                                                            value={rating}
                                                            edit={false}
                                                            size={16}
                                                        />
                                                        <span style={{fontSize: 16, color: '#bdbdbd', marginLeft: 25}}><ion-icon style={{
                                                            position: 'relative',
                                                            top: 4,
                                                            fontSize: 19,
                                                            marginRight: 5,
                                                        }} name="people-outline"/> {(lesson.progress || []).length} Сонссон</span>
                                                    </div>
                                                </div>
                                                {
                                                    isMobile ? (
                                                        <div className="sticky-side" style={{
                                                            background: 'transparent',
                                                            marginTop: -20
                                                        }}>
                                                            <div className="inner">
                                                                {
                                                                    lesson.paid ? (
                                                                        <Link to={`/audio/view/${lesson.slug}`}>
                                                                            <Button variant="secondary">
                                                                                <ion-icon name="play" /> Сонсох
                                                                            </Button>
                                                                        </Link>
                                                                    ) : (
                                                                        <Button onClick={() => config.get('emitter').emit('paymentModal', {type: 'premium'})} variant="secondary" style={{background: 'gold', display: 'flex', justifyContent: 'center',alignItems: 'center', fontSize: 16}}>
                                                                            <img src="/images/crown.png" alt="" height={37} style={{width: 'auto', filter: 'grayscale(1) invert(1)'}}/> Premium эрх авах
                                                                        </Button>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    ) : null
                                                }
                                                <div className="tab-menu">
                                                    <span onClick={() => this.setState({active : 'timeline'})} className={`${this.state.active === 'timeline' ? 'active' : ''}`}>Бүлэг</span>
                                                    <span onClick={() => this.setState({active : 'overview'})} className={`${this.state.active === 'overview' ? 'active' : ''}`}>Танилцуулга</span>
                                                    {/*<span onClick={() => this.setState({active : 'review'})} className={`${this.state.active === 'review' ? 'active' : ''}`}>Үнэлгээ</span>*/}
                                                </div>
                                            </div>
                                        </Col>
                                        {
                                            isMobile ? null : (
                                                <Col lg={4} md={5} className={`fixeee ${this.state.fixed ? 'fixeed' : 'not-fixeed'}`}>
                                                    <div>
                                                        <Sticky className={'stacka'} onFixedToggle={(e) => this.setState({fixed: e})} topOffset={-130} stickyStyle={{top: 130}}>
                                                            <div className="sticky-side">
                                                                <img
                                                                    style={{
                                                                        width: '50%',
                                                                        padding: 10,
                                                                        borderRadius: 17,
                                                                        marginLeft: 'auto',
                                                                        marginRight: 'auto',
                                                                        display: 'block',
                                                                    }}
                                                                    src={(lesson.thumbnail || {}).path ? `${(lesson.thumbnail || {}).url}${lesson.thumbnail.path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}/>
                                                                <div className="inner">
                                                                    {
                                                                        lesson.paid ? (
                                                                            <Link to={`/audio/view/${lesson.slug}`}>
                                                                                <Button variant="secondary">
                                                                                    <ion-icon name="play" /> Сонсох
                                                                                </Button>
                                                                            </Link>
                                                                        ) : (
                                                                            <Button onClick={() => config.get('emitter').emit('paymentModal', {type: 'premium'})} variant="secondary" style={{background: 'gold', display: 'flex', justifyContent: 'center',alignItems: 'center', fontSize: 16}}>
                                                                                <img src="/images/crown.png" alt="" height={37} style={{width: 'auto', filter: 'grayscale(1) invert(1)'}}/> Premium эрх авах
                                                                            </Button>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Sticky>
                                                    </div>
                                                </Col>
                                            )
                                        }
                                    </Row>
                                </Container>
                            </div>
                        </div>
                        <Container className="inner-cont">
                            <Row>
                                <Col lg={8} md={12}>
                                    <Tabs activeKey={this.state.active}>
                                        <Tab eventKey="timeline" title={<span>Бүлэг<ion-icon name="chevron-down"/></span>}>
                                            <div className="timeline-cont">
                                                <Accordion activeKey={this.state.activeIndex}>
                                                    <Card>
                                                        <Accordion.Collapse eventKey={'0'}>
                                                            <Card.Body>
                                                                {
                                                                    (lesson.programs || []).map((program, ind) => (
                                                                        lesson.paid ? (
                                                                            <Link style={{textDecoration: 'none'}} to={{pathname: `/audio/view/${lesson.slug}`, state: {levelIndex: 0, programIndex: ind}}}>
                                                                                <div className={`program ${(program.passed_users || []).indexOf(((user || {})._id || 'WW@@#').toString()) > -1 ? 'passed' : ''}`} key={ind}>
                                                                                    <ion-icon name="musical-notes"/>
                                                                                    <p>{(program.timeline || {}).title}</p>
                                                                                    {
                                                                                        program.timeline.minutes > 0 ? (
                                                                                            <span>{(program.timeline || {}).minutes} мин</span>
                                                                                        ) : null
                                                                                    }
                                                                                </div>
                                                                            </Link>
                                                                        ) : (
                                                                            <div className={`program ${(program.passed_users || []).indexOf(((user || {})._id || 'WW@@#').toString()) > -1 ? 'passed' : ''}`} key={ind}>
                                                                                <ion-icon name="musical-notes"/>
                                                                                <p>{(program.timeline || {}).title}</p>
                                                                                {
                                                                                    program.timeline.minutes > 0 ? (
                                                                                        <span>{(program.timeline || {}).minutes} мин</span>
                                                                                    ) : null
                                                                                }
                                                                            </div>
                                                                        )
                                                                    ))
                                                                }
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="overview" title={<span>Танилцуулга<ion-icon name="chevron-down"/></span>}>
                                            <div className="inner-tab overview">
                                                <h4>Номны тухай</h4>
                                                <p dangerouslySetInnerHTML={{__html : lesson.intro_desc}}/>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>
                        </Container>
                    </Loader>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Audio);