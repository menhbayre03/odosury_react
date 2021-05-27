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
    FacebookShareButton,
    TwitterIcon,
    FacebookIcon,
    FacebookShareCount,
    TwitterShareButton,
    LinkedinShareButton,
} from "react-share";
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
        const {main: {user = {}, premiumPrice, eishPrice}, lesson: {lesson, rating, lessonLoading}, dispatch} = this.props;
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
                                                                            lesson.free ? (
                                                                                <React.Fragment>
                                                                                    <p style={{color: '#000'}}>
                                                                                        Манай сайт-д бүртгэлтэй хэрэглэгчид үнэгүй үзэх боломжтой
                                                                                    </p>
                                                                                </React.Fragment>
                                                                            ) : (
                                                                                lesson.sale > 0 && !lesson.eish ? (
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
                                                                                    lesson.eish ? (
                                                                                        <React.Fragment>
                                                                                            <p style={{color: '#fff'}}>
                                                                                                2021 оны шинэ хөтөлбөр дагуу Амжилт кибер сургуулийн мэргэжлийн багш нараар бэлтгэгдсэн ЭЕШ-ийн хичээлүүд <strong>49'000₮</strong>
                                                                                            </p>
                                                                                        </React.Fragment>
                                                                                    ) : (
                                                                                        <div style={{
                                                                                            textAlign: 'right',
                                                                                            height: 43,
                                                                                            alignItems: 'flex-end',
                                                                                            display: 'flex',
                                                                                            flexDirection: 'column',
                                                                                            justifyContent: 'flex-end'
                                                                                        }}>
                                                                                            <span style={{fontSize: 24, color: '#000000', display: 'block', fontWeight: 700}}>{lesson.eish ? 'ЭЕШ БАГЦ' : config.formatMoney(lesson.price)+'₮'}</span>
                                                                                        </div>
                                                                                    )
                                                                                )
                                                                            )
                                                                        }
                                                                        {
                                                                            lesson.free ? (
                                                                                    <Button
                                                                                        variant="primary"
                                                                                        onClick={() => config.get('history').push('/login')}
                                                                                    >
                                                                                        <ion-icon name={'card-outline'}/> Нэвтрэх
                                                                                    </Button>
                                                                            ) : (
                                                                                lesson.eish ? (
                                                                                    <Link to="/eishPage" style={{textDecoration: 'none'}}>
                                                                                        <Button
                                                                                            variant="primary"
                                                                                        >
                                                                                            <ion-icon name={'card-outline'}/> ЭЕШ багц авах
                                                                                        </Button>
                                                                                    </Link>
                                                                                ) : (
                                                                                    <Button
                                                                                        variant="primary"
                                                                                        onClick={() => config.get('emitter').emit('paymentModal', {type: 'lesson', lesson: lesson})}
                                                                                    >
                                                                                        <ion-icon name={'card-outline'}/> Худалдаж авах
                                                                                    </Button>
                                                                                )
                                                                            )
                                                                        }
                                                                        {
                                                                            lesson.eish || lesson.free ? null : (
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
                                                                        {
                                                                            lesson.paid || lesson.free ? null : (
                                                                                <React.Fragment>
                                                                                        <span style={{
                                                                                            textAlign: 'center',
                                                                                            display: 'block',
                                                                                            fontSize: 12,
                                                                                            margin: '10px 0',
                                                                                            color: '#636363',
                                                                                        }}>Эсвэл</span>
                                                                                    <div className="get-permium" style={{
                                                                                        background: 'rgb(245, 245, 245)',
                                                                                        textAlign: 'center',
                                                                                        display: 'block',
                                                                                        borderRadius: 10,
                                                                                        padding: 10,
                                                                                    }}>
                                                                                        <p style={{color: '#1d1d1d',fontWeight: 600, lineHeight: '28px',}}>Ердөө <span style={{
                                                                                            color: 'rgb(249 215 2)',
                                                                                            fontWeight: 700,
                                                                                            background: '#313356',
                                                                                            padding: '0 10px',
                                                                                            borderRadius: 5,
                                                                                        }}>{config.formatMoney( premiumPrice - (lesson.sale > 0 ? lesson.sale : lesson.price))+'₮'}</span> нэмж төлөөд бүх хичээлийг үзэх боломжтой</p>
                                                                                        <Link to="/premium" style={{textDecoration: 'none'}}>
                                                                                            <Button
                                                                                                variant="primary"
                                                                                                style={{color: '#313356', background: '#f9d702', position: 'relative'}}
                                                                                            >
                                                                                                <img src="/images/crown.png" alt="" height={13} style={{
                                                                                                    position: 'absolute',
                                                                                                    top: 12,
                                                                                                    filter: 'grayscale(1) invert(1)',
                                                                                                    left: 19,
                                                                                                    width: 22,
                                                                                                    padding: 0,
                                                                                                    borderRadius: 0,
                                                                                                    height: 16,
                                                                                                }}/>Premium эрх авах
                                                                                            </Button>
                                                                                        </Link>
                                                                                    </div>
                                                                                </React.Fragment>
                                                                            )
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                            <div style={{textAlign: 'center', marginTop: 20}}>
                                                                <FacebookShareButton
                                                                    style={{
                                                                        marginRight: 15,
                                                                        background: '#3b5998',
                                                                        color: '#fff',
                                                                        borderRadius: 5,
                                                                        padding: '0px 20px 0px 5px',
                                                                        fontWeight: 700,
                                                                    }}
                                                                    url={`https://odosury.com/lesson/${lesson.slug}`}
                                                                >
                                                                    <FacebookIcon size={32} round={true}/> <span>Facebook</span>
                                                                </FacebookShareButton>
                                                                <TwitterShareButton
                                                                    style={{
                                                                        background: '#00aced',
                                                                        color: '#fff',
                                                                        borderRadius: 5,
                                                                        padding: '0px 20px 0px 5px',
                                                                        fontWeight: 700,
                                                                    }}
                                                                    url={`https://odosury.com/lesson/${lesson.slug}`}
                                                                    title={lesson.title}
                                                                >
                                                                    <TwitterIcon size={32} round={true} /> <span>Twitter</span>
                                                                </TwitterShareButton>
                                                            </div>
                                                        </div>
                                                    ) : null
                                                }
                                                {/*<div className="tab-menu">*/}
                                                {/*    <span onClick={() => this.setState({active : 'timeline'})} className={`${this.state.active === 'timeline' ? 'active' : ''}`}>Хөтөлбөр</span>*/}
                                                {/*    <span onClick={() => this.setState({active : 'overview'})} className={`${this.state.active === 'overview' ? 'active' : ''}`}>Танилцуулга</span>*/}
                                                {/*    /!*<span onClick={() => this.setState({active : 'review'})} className={`${this.state.active === 'review' ? 'active' : ''}`}>Үнэлгээ</span>*!/*/}
                                                {/*</div>*/}
                                            </div>
                                        </Col>
                                        {
                                            isMobile ? null : (
                                                <Col lg={4} md={5} className={`fixeee ${this.state.fixed ? 'fixeed' : 'not-fixeed'}`}>
                                                    <div>
                                                        <Sticky className={'stacka'} onFixedToggle={(e) => this.setState({fixed: e})} topOffset={-130} stickyStyle={{top: 130, zIndex: 1}}>
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
                                                                                lesson.free ? (
                                                                                    <React.Fragment>
                                                                                        <p style={{color: '#000'}}>
                                                                                            Манай сайт-д бүртгэлтэй хэрэглэгчид үнэгүй үзэх боломжтой
                                                                                        </p>
                                                                                    </React.Fragment>
                                                                                ) : (
                                                                                    lesson.sale > 0 && !lesson.eish ? (
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
                                                                                        lesson.eish ? (
                                                                                            <React.Fragment>
                                                                                                <p style={{color: '#2f2f2f'}}>
                                                                                                    2021 оны шинэ хөтөлбөр дагуу Амжилт кибер сургуулийн мэргэжлийн багш нараар бэлтгэгдсэн ЭЕШ-ийн хичээлүүд <strong>49'000₮</strong>
                                                                                                </p>
                                                                                            </React.Fragment>
                                                                                        ) : (
                                                                                            <div style={{
                                                                                                textAlign: 'right',
                                                                                                height: 43,
                                                                                                alignItems: 'flex-end',
                                                                                                display: 'flex',
                                                                                                flexDirection: 'column',
                                                                                                justifyContent: 'flex-end'
                                                                                            }}>
                                                                                                <span style={{fontSize: 24, color: '#000000', display: 'block', fontWeight: 700}}>{lesson.eish ? 'ЭЕШ БАГЦ' : config.formatMoney(lesson.price)+'₮'}</span>
                                                                                            </div>
                                                                                        )
                                                                                    )
                                                                                )
                                                                            }

                                                                            {
                                                                                lesson.free ? (
                                                                                    <Button
                                                                                        variant="primary"
                                                                                        onClick={() => config.get('history').push('/login')}
                                                                                    >
                                                                                        <ion-icon name={'card-outline'}/> Нэвтрэх
                                                                                    </Button>
                                                                                ) : (
                                                                                    lesson.eish ? (
                                                                                        <Link to="/eishPage" style={{textDecoration: 'none'}}>
                                                                                            <Button
                                                                                                variant="primary"
                                                                                            >
                                                                                                <ion-icon name={'card-outline'}/> ЭЕШ багц авах
                                                                                            </Button>
                                                                                        </Link>
                                                                                    ) : (
                                                                                        <Button
                                                                                            variant="primary"
                                                                                            onClick={() => config.get('emitter').emit('paymentModal', {type: 'lesson', lesson: lesson})}
                                                                                        >
                                                                                            <ion-icon name={'card-outline'}/> Худалдаж авах
                                                                                        </Button>
                                                                                    )
                                                                                )
                                                                            }
                                                                            {
                                                                                lesson.eish || lesson.free ? null : (
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

                                                                            {
                                                                                lesson.paid || lesson.free ? null : (
                                                                                    <React.Fragment>
                                                                                        <span style={{
                                                                                            textAlign: 'center',
                                                                                            display: 'block',
                                                                                            fontSize: 12,
                                                                                            margin: '10px 0',
                                                                                            color: '#636363',
                                                                                        }}>Эсвэл</span>
                                                                                        <div className="get-permium" style={{
                                                                                            background: 'rgb(245, 245, 245)',
                                                                                            textAlign: 'center',
                                                                                            display: 'block',
                                                                                            borderRadius: 10,
                                                                                            padding: 10,
                                                                                        }}>
                                                                                            <p style={{color: '#1d1d1d',fontWeight: 600, lineHeight: '28px',}}>Ердөө <span style={{
                                                                                                color: 'rgb(249 215 2)',
                                                                                                fontWeight: 700,
                                                                                                background: '#313356',
                                                                                                padding: '0 10px',
                                                                                                borderRadius: 5,
                                                                                            }}>{config.formatMoney( premiumPrice - (lesson.eish ? eishPrice : (lesson.sale > 0 ? lesson.sale : lesson.price)))+'₮'}</span> нэмж төлөөд манай аппликейшнд байгаа бүх хичээлийг үзэх боломжтой</p>

                                                                                            <Link to="/premium" style={{textDecoration: 'none'}}>
                                                                                                <Button
                                                                                                    variant="primary"
                                                                                                    style={{color: '#313356', background: '#f9d702', position: 'relative'}}
                                                                                                >
                                                                                                    <img src="/images/crown.png" alt="" height={13} style={{
                                                                                                        position: 'absolute',
                                                                                                        top: 12,
                                                                                                        filter: 'grayscale(1) invert(1)',
                                                                                                        left: 19,
                                                                                                        width: 22,
                                                                                                        padding: 0,
                                                                                                        borderRadius: 0,
                                                                                                        height: 16,
                                                                                                    }}/>Premium эрх авах
                                                                                                </Button>
                                                                                            </Link>
                                                                                        </div>
                                                                                    </React.Fragment>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                                <div style={{textAlign: 'center', marginTop: 20}}>
                                                                    <FacebookShareButton
                                                                        style={{
                                                                            marginRight: 15,
                                                                            background: '#3b5998',
                                                                            color: '#fff',
                                                                            borderRadius: 5,
                                                                            padding: '0px 20px 0px 5px',
                                                                            fontWeight: 700,
                                                                        }}
                                                                        url={`https://odosury.com/lesson/${lesson.slug}`}
                                                                    >
                                                                        <FacebookIcon size={32} round={true}/> <span>Facebook</span>
                                                                    </FacebookShareButton>
                                                                    <TwitterShareButton
                                                                        style={{
                                                                            background: '#00aced',
                                                                            color: '#fff',
                                                                            borderRadius: 5,
                                                                            padding: '0px 20px 0px 5px',
                                                                            fontWeight: 700,
                                                                        }}
                                                                        url={`https://odosury.com/lesson/${lesson.slug}`}
                                                                        title={lesson.title}
                                                                    >
                                                                        <TwitterIcon size={32} round={true} /> <span>Twitter</span>
                                                                    </TwitterShareButton>
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
                                        <Tab eventKey="overview" title={<span>Танилцуулга<ion-icon name="chevron-down"></ion-icon></span>}>
                                            <div className="inner-tab overview">
                                                <h4>Хичээлийн тухай</h4>
                                                <p dangerouslySetInnerHTML={{__html : lesson.intro_desc}}/>
                                                {
                                                    lesson.teacher && lesson.teacher.avatar && lesson.teacher.bio ? (
                                                        <React.Fragment>
                                                            <h4>Багш</h4>
                                                            <div className="teacher-side">
                                                                <img src={(lesson.teacher || {}).avatar ? `https://odosury.com${lesson.teacher.avatar}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}/>
                                                                <div>
                                                                    <h5>Багш: <span>{lesson.teacher.last_name.charAt(0)+ '. ' + lesson.teacher.first_name}</span></h5>
                                                                    <p>{lesson.teacher.bio}</p>
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    ) : null
                                                }
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
                                                <div className="timeline-cont">
                                                    <h4>Хөтөлбөр</h4>
                                                    <Accordion activeKey={this.state.activeIndex}>
                                                        {
                                                            (lesson.levels || []).map((item, index) => (
                                                                <Card key={index}>
                                                                    <Card.Header>
                                                                        <Accordion.Toggle onClick={() => this.setState({activeIndex: '0'})} as={Button} variant="link" eventKey={'0'}>
                                                                            {item.title}
                                                                            {/*{*/}
                                                                            {/*    this.state.activeIndex == '0' ? (*/}
                                                                            {/*        <ion-icon style={{*/}
                                                                            {/*            float: 'right',*/}
                                                                            {/*            fontSize: 24,*/}
                                                                            {/*            position: 'relative',*/}
                                                                            {/*            top: 2,*/}
                                                                            {/*        }} name="chevron-down"/>*/}
                                                                            {/*    ) : (*/}
                                                                            {/*        <ion-icon style={{*/}
                                                                            {/*            float: 'right',*/}
                                                                            {/*            fontSize: 24,*/}
                                                                            {/*            position: 'relative',*/}
                                                                            {/*            top: 2,*/}
                                                                            {/*        }} name="chevron-up"/>*/}
                                                                            {/*    )*/}
                                                                            {/*}*/}
                                                                        </Accordion.Toggle>
                                                                    </Card.Header>
                                                                    <Accordion.Collapse eventKey={'0'}>
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
                                                                                                <p>{(program.timeline || {}).title}
                                                                                                    <span>{(program.timeline || {}).description}</span></p>
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
                                                                                            <p>{(program.timeline || {}).title}
                                                                                                <span>{(program.timeline || {}).description}</span></p>
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