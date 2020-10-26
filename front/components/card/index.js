import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from "../include/Header";
import Loader from "../include/Loader";
import Footer from "../include/Footer";
import { removeFromCard, getLessonAll, removeFromCookie } from '../../actions/lesson_actions';
import * as actions from '../../actions/card_actions';
import * as bundleActions from '../../actions/bundle_actions';
import { Row, Col, Container } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import QRCode from "react-qr-code";
import Cookies from 'js-cookie';
import config from "../../config";
const reducer = ({ main, card }) => ({ main, card });

class CardPage extends React.Component {
    constructor(props){
        let searchParams = new URLSearchParams(location.search);
        super(props);
        if(parseInt(searchParams.get('s')) || searchParams.get('t') === 'b' || searchParams.get('t') === 'q'){
            props.dispatch(actions.setCardTypes({
                type: searchParams.get('t'),
                step: parseInt(searchParams.get('s')) || 1,
            }));
        }
    }
    componentDidMount() {
        const {
            main: { user = {} },
            dispatch
        } = this.props;
        dispatch(bundleActions.getBundleAll());
        dispatch(getLessonAll());
    }
    removeLesson(lesson){
        const {main: { user }, dispatch} = this.props;
        let card = (Cookies.get('odosuryCard') ? JSON.parse(Cookies.get('odosuryCard')) : {});
        let hadInCard = (user || {})._id ? ((user || {}).lessons || []).indexOf(lesson._id) > -1 : ((card || {}).lessons || []).indexOf(lesson._id) > -1;
        if(user){
            if(hadInCard){
                dispatch(removeFromCard({_id: lesson._id}));
            }
        } else {
            let lessons = card.lessons || [];
            if(hadInCard){
                card.lessons = lessons.filter((c) => c !== lesson._id);
            }
            dispatch(removeFromCookie(lesson._id));
            Cookies.set('odosuryCard', JSON.stringify(card));
        }
    }
    removeBundle(bundle){
        const {main: { user }, dispatch} = this.props;
        let card = (Cookies.get('odosuryCard') ? JSON.parse(Cookies.get('odosuryCard')) : {});
        let hadInCard = (user || {})._id ? ((user || {}).bundles || []).indexOf(bundle._id) > -1 : ((card || {}).bundles || []).indexOf(bundle._id) > -1;
        if(user){
            if(hadInCard){
                dispatch(bundleActions.removeFromCard({_id: bundle._id}));
            }
        } else {
            let bundles = card.bundles || [];
            if(hadInCard){
                card.bundles = bundles.filter((c) => c !== bundle._id);
            }
            dispatch(bundleActions.removeFromCookie(bundle._id));
            Cookies.set('odosuryCard', JSON.stringify(card));
        }
    }
    render() {
        const {
            main: { user = {} },
            card: { step, type, qpay = {}, qloading, qpayPur, bundles, lessons },
            dispatch
        } = this.props;
        let lessonsPrice = lessons.reduce((total, c) => total + (c.sale ? c.sale : c.price), 0) || 0;
        let bundlesPrice = bundles.reduce((total, c) => total + (c.sale ? c.sale : c.price), 0) || 0;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <Container>
                    <div className="cart">
                        <Loader status={0}>
                            {
                                step === 1 ? (
                                    <Row>
                                        <Col md={8}>
                                            {
                                                lessons.length > 0 || bundles.length > 0 ? (
                                                    <React.Fragment>
                                                        {
                                                            lessons.length > 0 ? (
                                                                <div className="section lesson">
                                                                    <p>Хичээлүүд</p>
                                                                    {
                                                                        lessons.map( (lesson) =>
                                                                            <div className="item">
                                                                                <img src={(lesson.thumbnail || {}).path ? `${config.get('hostMedia')}${(lesson.thumbnail || {}).path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}/>
                                                                                <span><Link to={`/lesson/${lesson.slug}`}>{lesson.title}</Link></span>
                                                                                <div className="rii">
                                                                                    <NumberFormat value={lesson.sale && lesson.sale > 0 ? lesson.sale : lesson.price} displayType={'text'} renderText={(value) => <span>{value}₮</span>} thousandSeparator={true}/>
                                                                                    <button disabled={lesson.deleting} onClick={this.removeLesson.bind(this, lesson)}>
                                                                                        {lesson.deleting ? "устгаж байна" : "устгах"}
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            ) : null
                                                        }
                                                        {
                                                            bundles.length > 0 ? (
                                                                <div className="section bundle">
                                                                    <p>Багцууд</p>
                                                                    {
                                                                        bundles.map( (bundle) =>
                                                                            <div className="item">
                                                                                <img src={(bundle.thumbnail || {}).path ? `${config.get('hostMedia')}${(bundle.thumbnail || {}).path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}/>
                                                                                <span><Link to={`/bundle/${bundle.slug}`}>{bundle.title}</Link></span>
                                                                                <div className="rii">
                                                                                    <NumberFormat value={bundle.sale && bundle.sale > 0 ? bundle.sale : bundle.price} displayType={'text'} renderText={(value) => <span>{value}₮</span>} thousandSeparator={true}/>
                                                                                    <button disabled={bundle.deleting} onClick={this.removeBundle.bind(this, bundle)}>
                                                                                        {bundle.deleting ? "устгаж байна" : "устгах"}
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            ) : null
                                                        }
                                                        {/*<div>*/}
                                                        {/*    <button onClick={() => dispatch(removeFromCard({_id: 'a'}))}>Сагс хоослох</button>*/}
                                                        {/*</div>*/}
                                                    </React.Fragment>
                                                ) : (
                                                    <div className='empty-data'>
                                                        <div className='emtry-picture'>
                                                            <img src="/images/empty.svg" />
                                                        </div>
                                                        <div className='emtry-text'>
                                                           Сагс хоосон байна
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </Col>
                                        <Col md={4}>
                                            <p style={{
                                                fontSize: 18,
                                                fontWeight: 700,
                                                color: '#272840',
                                                marginBottom: 5}}>Сагс</p>
                                            <div className="cart-side">
                                                {
                                                    lessons.length > 0 ? (
                                                        <NumberFormat value={lessonsPrice} displayType={'text'} renderText={(value) => <p>Хичээлүүд: <span>{value}₮</span></p>} thousandSeparator={true}/>
                                                    ) : null
                                                }
                                                {
                                                    bundles.length > 0 ? (
                                                        <NumberFormat value={bundlesPrice} displayType={'text'} renderText={(value) => <p>Багцууд: <span>{value}₮</span></p>} thousandSeparator={true}/>
                                                    ) : null
                                                }
                                                <NumberFormat value={bundlesPrice + lessonsPrice} displayType={'text'} renderText={(value) => <p className="total">Нийт: <span>{value}₮</span></p>} thousandSeparator={true}/>
                                                <button onClick={() =>
                                                    (user || {})._id ?
                                                        (lessons.length > 0 || bundles.length) ? dispatch(actions.setCardTypes({step: 2, type: type})) : config.get('emitter').emit('warning', 'Сагс хоосон байна')
                                                    : config.get('emitter').emit('warning', 'Нэвтрээгүй байна!')
                                                }>
                                                    Худалдан авалт хийх
                                                </button>
                                            </div>
                                        </Col>
                                    </Row>
                                ) : (user || {})._id && step === 2 ? (
                                    <Row>
                                        <Col md={8}>
                                            <div className="section pay-option">
                                                <p style={{
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: '#272840',
                                                    marginBottom: 5}}>Төлбөрийн сонголт</p>
                                                <div>
                                                    <img onClick={() => dispatch(actions.getQpay({amount: (bundlesPrice + lessonsPrice)}))} src="/images/qpay.png" alt=""/>
                                                    <button onClick={() => dispatch(actions.setBank({amount: (bundlesPrice + lessonsPrice)}))}>Дансны шилжүүлэг</button>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <p style={{
                                                fontSize: 18,
                                                fontWeight: 700,
                                                color: '#272840',
                                                marginBottom: 5}}>Сагс</p>
                                            <div className="cart-side pay">
                                                {
                                                    lessons.length > 0 ? (
                                                        <NumberFormat value={lessonsPrice} displayType={'text'} renderText={(value) => <p>Хичээлүүд: <span>{value}₮</span></p>} thousandSeparator={true}/>
                                                    ) : null
                                                }
                                                {
                                                    bundles.length > 0 ? (
                                                        <NumberFormat value={bundlesPrice} displayType={'text'} renderText={(value) => <p>Багцууд: <span>{value}₮</span></p>} thousandSeparator={true}/>
                                                    ) : null
                                                }
                                                <NumberFormat value={bundlesPrice + lessonsPrice} displayType={'text'} renderText={(value) => <p className="total">Нийт: <span>{value}₮</span></p>} thousandSeparator={true}/>
                                                <button onClick={() => dispatch(actions.setCardTypes({step: 1, type: type}))}>Буцах</button>
                                            </div>
                                        </Col>
                                    </Row>
                                ) : (user || {})._id && step === 3 && (type === 'q' || type === 'b') ? (
                                    <Row>
                                        <Col md={8}>
                                            <div className="section pay-option">
                                                <p style={{
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: '#272840',
                                                    marginBottom: 5}}>Төлбөр баталгаажуулах</p>
                                                <div>
                                                    {
                                                        type === 'b' ? (
                                                            <button onClick={() => dispatch(actions.payByBank({step: 2, type: type, amount: (bundlesPrice + lessonsPrice)}))}>Bankaar tulhiig batlah</button>
                                                        ) : (
                                                            type === 'q' ? (
                                                                <Loader status={qloading}>
                                                                    <div className="qr-c">
                                                                        <div className="qr-q">
                                                                            <QRCode size={180} value={qpay.qPay_QRcode} />
                                                                        </div>
                                                                        <div className="qr-r">
                                                                            <ul className="list-unstyled">
                                                                                <li>
                                                                                    <span>Шилжүүлэх дүн: </span><NumberFormat value={qpayPur.amount} displayType={'text'} renderText={(value) => <strong>{value}₮</strong>} thousandSeparator={true}/>
                                                                                </li>
                                                                                <li>
                                                                                    <span>Гүйлгээний утга: </span><strong>{qpayPur.description}</strong>
                                                                                </li>
                                                                                <li><p>Хаан банкны болон бусад банкны
                                                                                    аппликейшнээр qr кодыг уншуулан
                                                                                    төлбөрийг төлнө үү.
                                                                                    Төлбөр <strong>төлөгдсөний</strong> дараа
                                                                                    таны худалдан авалт баталгаажиж, үзэх боломжтой болно.</p>
                                                                                </li>

                                                                            </ul>
                                                                            <button onClick={() => dispatch(actions.checkQpay({c: qpay.payment_id}))}>qpay gvilgee shalgah</button>
                                                                        </div>
                                                                    </div>
                                                                </Loader>
                                                            ) : null
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <p style={{
                                                fontSize: 18,
                                                fontWeight: 700,
                                                color: '#272840',
                                                marginBottom: 5}}>Сагс</p>
                                            <div className="cart-side pay">
                                                {
                                                    lessons.length > 0 ? (
                                                        <NumberFormat value={lessonsPrice} displayType={'text'} renderText={(value) => <p>Хичээлүүд: <span>{value}₮</span></p>} thousandSeparator={true}/>
                                                    ) : null
                                                }
                                                {
                                                    bundles.length > 0 ? (
                                                        <NumberFormat value={bundlesPrice} displayType={'text'} renderText={(value) => <p>Багцууд: <span>{value}₮</span></p>} thousandSeparator={true}/>
                                                    ) : null
                                                }
                                                <NumberFormat value={bundlesPrice + lessonsPrice} displayType={'text'} renderText={(value) => <p className="total">Нийт: <span>{value}₮</span></p>} thousandSeparator={true}/>
                                                <button onClick={() => dispatch(actions.setCardTypes({step: 2, type: type}))}>Буцах</button>
                                            </div>
                                        </Col>
                                    </Row>
                                ) : null
                            }
                        </Loader>
                    </div>
                </Container>
                <Footer />
            </React.Fragment>
        )
    }
}


export default connect(reducer)(CardPage);