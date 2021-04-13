import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from "../include/Header";
import Footer from "../include/Footer";
import { Container, Row, Col, Button, Tabs, Tab, Accordion, Card, Spinner, Modal } from "react-bootstrap";
import * as actions from '../../actions/lesson_actions';
import Sticky from 'react-sticky-el';
import ReactStars from "react-rating-stars-component";
import config from "../../config";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
import Cookies from "js-cookie";
import ReactPlayer from "react-player";
const reducer = ({ main, lesson }) => ({ main, lesson });

class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            activeIndex: '0',
            vidModal: false,
        };
    }

    componentDidMount() {
        config.get('ga').pageview(window.location.pathname + window.location.search);
        window.scroll(0, 0);
        const {dispatch, match} = this.props;
        this.setState({active: 'overview'});
        dispatch(actions.getLesson(match.params.slug));
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(actions.clearLesson());
    }

    closeModalVid() {
        this.setState({vidModal: false});
    }

    openModalVid() {
        this.setState({vidModal: true});
    }
    addWish(id, add) {
        const {main: {user}, dispatch} = this.props;
        if(user) {
            dispatch(actions.addWish(id, {add}));
        } else {
            config.get('emitter').emit('warning', 'Нэвтрэх шаардлагатай !')
        }
    }
    render() {
        const {main: {user = {}}, lesson: {lesson, rating, lessonLoading}, dispatch} = this.props;
        let mediaUrl = '';
        if(lesson.video) {
            mediaUrl = (lesson.video || {}).url+"/api/video/show/"+lesson.video._id+'?lessonId='+lesson._id+'&intro='+'yes'+'&token='+Cookies.get('token');
        }
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="lesson-single">
                    <Loader status={lessonLoading}>
                        <div className="lesson-head" style={{backgroundImage: (lesson.thumbnail || {}).path ? `url('${(lesson.thumbnail || {}).url}${(lesson.thumbnail || {}).path}')` : 'none'}}>
                            <div className="head-inner">
                                {
                                    isMobile ? (
                                        lesson.video ? (
                                            <div className="vid-rom mobi" onClick={() => this.openModalVid()}>
                                                <img src={(lesson.thumbnailSmall || {}).path ? `${(lesson.thumbnailSmall || {}).url}${lesson.thumbnailSmall.path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}
                                                     style={{
                                                         height: 'auto',
                                                         margin: '0 40px',
                                                         width: 'calc(100% - 80px)',
                                                         marginBottom: 40,
                                                         borderRadius: 10,
                                                     }}
                                                />
                                                <ion-icon name="play"/>
                                            </div>
                                        ) : (
                                            <img src={(lesson.thumbnailSmall || {}).path ? `${(lesson.thumbnailSmall || {}).url}${lesson.thumbnailSmall.path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}
                                                 style={{
                                                     height: 'auto',
                                                     margin: '0 40px',
                                                     width: 'calc(100% - 80px)',
                                                     marginBottom: 40,
                                                     borderRadius: 10,
                                                 }}
                                            />
                                        )

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
                                                        }} name="people-outline"/> {(lesson.progress || []).length} Судалсан</span>
                                                    </div>
                                                </div>
                                                {
                                                    isMobile ? (
                                                        <div className="sticky-side" style={{
                                                            background: 'transparent',
                                                            marginTop: -20
                                                        }}>
                                                            {
                                                                lesson.paid ? (
                                                                    <div className="inner">
                                                                        <Link to={`/lesson/view/${lesson.slug}`}>
                                                                            <Button variant="secondary">
                                                                                <ion-icon name="play" /> Үзэх
                                                                            </Button>
                                                                        </Link>
                                                                    </div>
                                                                ) : (
                                                                    <div className="inner">
                                                                        {
                                                                            lesson.sale > 0 ? (
                                                                                <div style={{
                                                                                    textAlign: 'right',
                                                                                    height: 43,
                                                                                    alignItems: 'center',
                                                                                    display: 'flex',
                                                                                    flexDirection: 'row',
                                                                                    justifyContent: 'flex-end',
                                                                                }}>
                                                                                    <span style={{fontSize: 18, color: '#b1b1b1', display: 'block', fontWeight: 600 , textDecoration: 'line-through'}}>{config.formatMoney(lesson.price)}₮</span>
                                                                                    <span style={{marginLeft: 15,fontSize: 24, color: '#fff', display: 'block', fontWeight: 700}}>{config.formatMoney(lesson.sale)}₮</span>
                                                                                </div>
                                                                            ) : (
                                                                                <div style={{
                                                                                    textAlign: 'right',
                                                                                    height: 43,
                                                                                    alignItems: 'flex-end',
                                                                                    display: 'flex',
                                                                                    flexDirection: 'column',
                                                                                    justifyContent: 'flex-end'
                                                                                }}>
                                                                                    <span style={{fontSize: 24, color: '#fff', display: 'block', fontWeight: 700}}>{config.formatMoney(lesson.price)}₮</span>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        {
                                                                            lesson.eish ? (
                                                                                <Button onClick={() => config.get('emitter').emit('paymentModal', {type: 'eish'})} variant="secondary" style={{background: 'gold', display: 'flex', justifyContent: 'center',alignItems: 'center', fontSize: 16}}>
                                                                                    <img src="/images/crown.png" alt="" height={37} style={{width: 'auto', filter: 'grayscale(1) invert(1)'}}/> ЭЕШ эрх авах
                                                                                </Button>
                                                                            ) : (
                                                                                <Button
                                                                                    variant="primary"
                                                                                    onClick={() => config.get('emitter').emit('paymentModal', {type: 'lesson', lesson: lesson})}
                                                                                >
                                                                                    <ion-icon name={'card-outline'}/> Худалдаж авах
                                                                                </Button>
                                                                            )
                                                                        }
                                                                        {
                                                                            lesson.eish ? null : (
                                                                                ((user || {}).wish || []).some( aa => aa == lesson._id) ? (
                                                                                    <Button onClick={() => this.addWish(lesson._id, false)} variant="secondary">
                                                                                        <ion-icon name="heart" /> Хадгалсан
                                                                                    </Button>
                                                                                ) : (
                                                                                    <Button onClick={() => this.addWish(lesson._id, true)} variant="secondary">
                                                                                        <ion-icon name="heart" /> Хадгалах
                                                                                    </Button>
                                                                                )
                                                                            )
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    ) : null
                                                }
                                                <div className="tab-menu">
                                                    <span onClick={() => this.setState({active : 'timeline'})} className={`${this.state.active === 'timeline' ? 'active' : ''}`}>Хөтөлбөр</span>
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
                                                                {
                                                                    lesson.video ? (
                                                                        <div className="vid-rom" onClick={() => this.openModalVid()}>
                                                                            <img src={(lesson.thumbnailSmall || {}).path ? `${(lesson.thumbnailSmall || {}).url}${lesson.thumbnailSmall.path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}/>
                                                                            <ion-icon name="play"/>
                                                                        </div>
                                                                    ) : (
                                                                        <img src={(lesson.thumbnailSmall || {}).path ? `${(lesson.thumbnailSmall || {}).url}${lesson.thumbnailSmall.path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}/>
                                                                    )
                                                                }
                                                                {
                                                                    lesson.paid ? (
                                                                        <div className="inner">
                                                                            <Link to={`/lesson/view/${lesson.slug}`}>
                                                                                <Button variant="secondary">
                                                                                    <ion-icon name="play" /> Үзэх
                                                                                </Button>
                                                                            </Link>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="inner">
                                                                            {
                                                                                lesson.sale > 0 ? (
                                                                                    <div style={{
                                                                                        textAlign: 'right',
                                                                                        height: 43,
                                                                                        alignItems: 'center',
                                                                                        display: 'flex',
                                                                                        flexDirection: 'row',
                                                                                        justifyContent: 'flex-end',
                                                                                    }}>
                                                                                        <span style={{fontSize: 18, color: '#909090', display: 'block', fontWeight: 600 , textDecoration: 'line-through'}}>{config.formatMoney(lesson.price)}₮</span>
                                                                                        <span style={{marginLeft: 15,fontSize: 24, color: '#000000', display: 'block', fontWeight: 700}}>{config.formatMoney(lesson.sale)}₮</span>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div style={{
                                                                                        textAlign: 'right',
                                                                                        height: 43,
                                                                                        alignItems: 'flex-end',
                                                                                        display: 'flex',
                                                                                        flexDirection: 'column',
                                                                                        justifyContent: 'flex-end'
                                                                                    }}>
                                                                                        <span style={{fontSize: 24, color: '#000000', display: 'block', fontWeight: 700}}>{config.formatMoney(lesson.price)}₮</span>
                                                                                    </div>
                                                                                )
                                                                            }

                                                                            {
                                                                                lesson.eish ? (
                                                                                    <Button onClick={() => config.get('emitter').emit('paymentModal', {type: 'eish'})} variant="secondary" style={{background: 'gold', display: 'flex', justifyContent: 'center',alignItems: 'center', fontSize: 16}}>
                                                                                        <img src="/images/crown.png" alt="" height={37} style={{width: 'auto', filter: 'grayscale(1) invert(1)'}}/> ЭЕШ эрх авах
                                                                                    </Button>
                                                                                ) : (
                                                                                    <Button
                                                                                        variant="primary"
                                                                                        onClick={() => config.get('emitter').emit('paymentModal', {type: 'lesson', lesson: lesson})}
                                                                                    >
                                                                                        <ion-icon name={'card-outline'}/> Худалдаж авах
                                                                                    </Button>
                                                                                )
                                                                            }
                                                                            {
                                                                                lesson.eish ? null : (
                                                                                    ((user || {}).wish || []).some( aa => aa == lesson._id) ? (
                                                                                        <Button onClick={() => this.addWish(lesson._id, false)} variant="secondary">
                                                                                            <ion-icon name="heart" /> Хадгалсан
                                                                                        </Button>
                                                                                    ) : (
                                                                                        <Button onClick={() => this.addWish(lesson._id, true)} variant="secondary">
                                                                                            <ion-icon name="heart" /> Хадгалах
                                                                                        </Button>
                                                                                    )
                                                                                )
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
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
                                        <Tab eventKey="timeline" title={<span>Хөтөлбөр<ion-icon name="chevron-down"></ion-icon></span>}>
                                            <div className="timeline-cont">
                                                <Accordion activeKey={this.state.activeIndex}>
                                                    {
                                                        (lesson.levels || []).map((item, index) => (
                                                            <Card key={index}>
                                                                <Card.Header>
                                                                    <Accordion.Toggle onClick={() => this.setState({activeIndex: this.state.activeIndex === index.toString() ? '' : index.toString()})} as={Button} variant="link" eventKey={index.toString()}>
                                                                        {item.title}
                                                                        {
                                                                            this.state.activeIndex == index.toString() ? (
                                                                                <ion-icon style={{
                                                                                    float: 'right',
                                                                                    fontSize: 24,
                                                                                    position: 'relative',
                                                                                    top: 2,
                                                                                }} name="chevron-down"/>
                                                                            ) : (
                                                                                <ion-icon style={{
                                                                                    float: 'right',
                                                                                    fontSize: 24,
                                                                                    position: 'relative',
                                                                                    top: 2,
                                                                                }} name="chevron-up"/>
                                                                            )
                                                                        }
                                                                    </Accordion.Toggle>
                                                                </Card.Header>
                                                                <Accordion.Collapse eventKey={index.toString()}>
                                                                    <Card.Body>
                                                                        {
                                                                            (item.programs || []).map((program, ind) => (
                                                                                lesson.paid ? (
                                                                                    <Link style={{textDecoration: 'none'}} to={{pathname: `/lesson/view/${lesson.slug}`, state: {levelIndex: index, programIndex: ind}}}>
                                                                                        <div className={`program ${(program.passed_users || []).indexOf(((user || {})._id || 'WW@@#').toString()) > -1 ? 'passed' : ''}`} key={ind}>
                                                                                            {
                                                                                                (program.timeline || {}).type === 'video' ? (
                                                                                                    <ion-icon name="videocam"/>
                                                                                                ) : (
                                                                                                    (program.timeline || {}).type === 'audio' ? (
                                                                                                        <ion-icon name="videocam"/>
                                                                                                    ) : (
                                                                                                        <ion-icon name="document-text"/>
                                                                                                    )
                                                                                                )
                                                                                            }
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
                                                                                        {
                                                                                            (program.timeline || {}).type === 'video' ? (
                                                                                                <ion-icon name="videocam"/>
                                                                                            ) : (
                                                                                                (program.timeline || {}).type === 'audio' ? (
                                                                                                    <ion-icon name="videocam"/>
                                                                                                ) : (
                                                                                                    <ion-icon name="document-text"/>
                                                                                                )
                                                                                            )
                                                                                        }
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
                                                        ))
                                                    }
                                                </Accordion>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="overview" title={<span>Танилцуулга<ion-icon name="chevron-down"></ion-icon></span>}>
                                            <div className="inner-tab overview">
                                                <h4>Хичээлийн тухай</h4>
                                                <p dangerouslySetInnerHTML={{__html : lesson.intro_desc}}/>
                                                {
                                                    (lesson.learn_check_list || []).length > 0 ? (
                                                        <React.Fragment>
                                                            <h4>Юу сурах вэ ?</h4>
                                                            <ul className="list-2">
                                                                {
                                                                    lesson.learn_check_list.map((item, index) => (
                                                                        <li key={index}><ion-icon name="checkmark-outline"/>{item}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </React.Fragment>
                                                    ) : null
                                                }
                                                {
                                                    (lesson.requirements || []).length > 0 ? (
                                                        <React.Fragment>
                                                            <h4>Шаардлагатай зүйлс</h4>
                                                            <ul className="list-1">
                                                                {
                                                                    lesson.requirements.map((item, index) => (
                                                                        <li key={index}>{item}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </React.Fragment>
                                                    ) : null
                                                }
                                            </div>
                                        </Tab>
                                        {/*<Tab eventKey="review" title={<span>Үнэлгээ<ion-icon name="chevron-down"></ion-icon></span>}>*/}
                                        {/*    <p>Unelgee</p>*/}
                                        {/*</Tab>*/}
                                    </Tabs>
                                </Col>
                            </Row>
                        </Container>
                    </Loader>
                </div>
                <Footer/>
                {
                    lesson.video &&
                    <Modal
                        size={'lg'}
                        className={'paymentMethod'}
                        show={this.state.vidModal}
                        onHide={() => this.closeModalVid()}
                    >
                        <Modal.Body>
                            <div className={'p-m-title'}>
                                <h5>Танилцуулга бичлэг</h5>
                            </div>
                            <ReactPlayer
                                playing
                                onError={() => config.get('emitter').emit('warning', 'Хандах эрх хүрэхгүй байна.')}
                                controls
                                light={(lesson.thumbnailSmall || {}).path ? `${(lesson.thumbnailSmall || {}).url}${lesson.thumbnailSmall.path}` : '/images/default-lesson.jpg'}
                                autoPlay={false}
                                height={isMobile ? 260 : 460}
                                playIcon={<ion-icon style={{fontSize: 74, color: '#fff'}} name="play-circle"/>}
                                width={"100%"}
                                url={mediaUrl}
                                config={{
                                    file: {
                                        attributes: {
                                            controlsList : "nodownload"
                                        }
                                    }
                                }}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <div className={'p-m-buttons'}>
                                <div className={'p-m-btn transparent'} onClick={() => this.closeModalVid()}>
                                    <span>
                                        Хаах
                                    </span>
                                </div>
                            </div>
                        </Modal.Footer>
                    </Modal>
                }
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Lesson);