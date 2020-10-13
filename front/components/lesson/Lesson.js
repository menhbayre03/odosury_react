import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import { Container, Row, Col, Button, Tabs, Tab, Accordion, Card, Spinner } from "react-bootstrap";
import * as actions from '../../actions/lesson_actions';
import Sticky from 'react-sticky-el';
import ReactStars from "react-rating-stars-component";
import config from "../../config";
import Loader from "../include/Loader";
const reducer = ({ main, lesson }) => ({ main, lesson });

class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            activeIndex: '0'
        };
    }

    componentDidMount() {
        window.scroll(0, 0);
        const {dispatch, match} = this.props;
        this.setState({active: 'overview'});
        dispatch(actions.getLesson(match.params.slug));
    }
    render() {
        const {main: {user}, lesson: {lesson, rating, lessonLoading, addingToCard, removingFromCard}, dispatch} = this.props;
        let hadInCard = (user.lessons || []).some(ls => ls._id === lesson._id);
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="lesson-single">
                    <Loader status={lessonLoading}>
                        <div className="lesson-head" style={{backgroundImage: (lesson.thumbnail || {}).path ? `url('${config.get('hostMedia')}${(lesson.thumbnail || {}).path}')` : 'none'}}>
                            <div className="head-inner">
                                <Container>
                                    <Row style={{position: 'relative'}}>
                                        <Col md={8}>
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
                                                        }} name="people-outline"/> 32 Судалсан</span>
                                                    </div>
                                                </div>
                                                <div className="tab-menu">
                                                    <span onClick={() => this.setState({active : 'timeline'})} className={`${this.state.active === 'timeline' ? 'active' : ''}`}>Хөтөлбөр</span>
                                                    <span onClick={() => this.setState({active : 'overview'})} className={`${this.state.active === 'overview' ? 'active' : ''}`}>Танилцуулга</span>
                                                    {/*<span onClick={() => this.setState({active : 'review'})} className={`${this.state.active === 'review' ? 'active' : ''}`}>Үнэлгээ</span>*/}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={4} className={`fixeee ${this.state.fixed ? 'fixeed' : 'not-fixeed'}`}>
                                            <div>
                                                <Sticky className={'stacka'} onFixedToggle={(e) => this.setState({fixed: e})} topOffset={-90} stickyStyle={{top: 90}}>
                                                    <div className="sticky-side">
                                                        <img src={(lesson.video || {}).thumbnail ? `${config.get('hostMedia')}${lesson.video.thumbnail}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}/>
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
                                                            <Button
                                                                disabled={addingToCard || removingFromCard}
                                                                variant="primary"
                                                                onClick={() =>
                                                                    hadInCard ?
                                                                        (removingFromCard ? false : dispatch(actions.removeFromCard({_id: lesson._id})))
                                                                    :
                                                                        (addingToCard ? false : dispatch(actions.addToCard({_id: lesson._id})))
                                                                }
                                                            >
                                                                {
                                                                    addingToCard || removingFromCard ?
                                                                        <Spinner variant={'light'} animation={'border'} size={'sm'}/>
                                                                    :
                                                                        <ion-icon name={hadInCard ? "trash-outline" : "cart-outline"}/>
                                                                } {hadInCard ? "Сагснаас хасах" : "Сагслах"}
                                                            </Button>
                                                            <Button variant="secondary">
                                                                <ion-icon name="heart" /> Хадгалах
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Sticky>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                        <Container className="inner-cont">
                            <Row>
                                <Col md={8}>
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
                                                                                <div className={`program ${program.passed_users.indexOf(((user || {})._id || 'WW@@#').toString()) > -1 ? 'passed' : ''}`} key={ind}>
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
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Lesson);