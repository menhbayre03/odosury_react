import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '../../config';
import { Button, Container, Col, Row, Modal, Spinner } from 'react-bootstrap';
import * as actions from '../../actions/home_actions';
import Cookies from "js-cookie";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotf: false,
            cate: false,
            trans: false,
            search: ''
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({cate: false})
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if(window.scrollY > 100 && !this.state.trans) {
            this.setState({trans: true})
        } else if(window.scrollY < 100 && this.state.trans) {
            this.setState({trans: false})
        }
    }

    search(e) {
        e.preventDefault();
        config.get('history').push(`/lessons/all`, {search: this.state.search})
    }
    buyPre(){
        const {main, dispatch} = this.props;
        let user = main.user || {};
        //pr === 'premium'
        //pq === 'premiumRequest
        if(user.premium === 'pr'){
            return false;
        } else if(user.premium === 'pq'){
            config.get('emitter').emit('warning', 'Premium хүсэлт илгээгдсэн байна.');
        } else {
            if(user._id){
                dispatch(actions.setPremiumModal({visible: true}));
            } else {
                config.get('emitter').emit('warning', 'Нэвтрэх шаардлагатай');
            }
        }
    }
    backTo(){
        const {
            premiumModal: {step, type, transaction},
            dispatch
        } = this.props;
        if(step === 1 || transaction._id || transaction.hadTrans){
            dispatch(actions.setPremiumModal({visible: false}))
        } else if(step === 2) {
            if(type !== ''){
                dispatch(actions.setPremiumModal({type: ''}))
            } else {
                dispatch(actions.setPremiumModal({step: 1}))
            }
        }
    }
    render() {
        const {
            main,
            premiumModal: {visible, step, type, gettingTransaction, transaction},
            dispatch
        } = this.props;
        let categories = main.categories || [];
        let user = main.user || {};
        let card = (Cookies.get('odosuryCard') ? JSON.parse(Cookies.get('odosuryCard')) : {});
        const renderBankDetails = () => (
            <div className={'paymentMethodDet bankdetail'}>
                <p>
                    <span>
                        {'банк'.toUpperCase()}:
                    </span>
                    <span>
                        Хаан банк
                    </span>
                </p>
                <p>
                    <span>
                        {'Дансны дугаар'.toUpperCase()}:
                    </span>
                    <span>
                        5028961615
                    </span>
                </p>
                <p>
                    <span>
                        {'Данс эзэмшигч'.toUpperCase()}:
                    </span>
                    <span>
                        Амжилт дотком
                    </span>
                </p>
                <p>
                    <span>
                        {'Мөнгөн дүн'.toUpperCase()}:
                    </span>
                    <span>
                        99,000₮
                    </span>
                </p>
                <p>
                    <span>
                        {'Гүйлгээний утга'.toUpperCase()}:
                    </span>
                    <span>
                        {user.username || user.email}
                    </span>
                </p>
                <p>
                    <span>
                        {'Холбогдох утас'.toUpperCase()}:
                    </span>
                    <span>
                        8844-5020
                    </span>
                </p>
            </div>
        );
        return (
            <div>
                <div className={`header ${this.state.trans ? 'trans' : ''}`}>
                    <Container>
                        <Row className="header-top">
                            <Col md={6} className="section-1">
                                <div className="logo" style={{display: 'inline-block'}}>
                                    <Link to={'/'}><img src="/images/logo.svg" alt=""/></Link>
                                    {/*<Link to={'/'}><img src="/images/logo-small.png" alt=""/></Link>*/}
                                </div>
                                <div className="category-menu" style={{display: 'inline-block', position: 'relative'}}>
                                    <Button onClick={() => this.setState({cate: !this.state.cate})}>
                                        <span>Ангилал</span>
                                        <ion-icon name="caret-down-outline"/>
                                    </Button>
                                    <ul style={{visibility: this.state.cate ? 'visible': 'hidden', opacity: this.state.cate ? 1 : 0}}>
                                        {
                                            categories.map(item => (
                                                <li>
                                                    <Link to={`/lessons/${item.slug}`}>
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </Col>
                            <Col md={6} className="section-2">
                                <div className="section-1-1">
                                    <form onSubmit={(e) => this.search(e)}>
                                        <input onChange={(e) => this.setState({search: e.target.value})} style={{width: '100%'}} placeholder="Хичээл хайх ..."/>
                                        <ion-icon onClick={(e) => this.search(e)} name="search-outline" style={{cursor: 'pointer'}}/>
                                    </form>
                                </div>
                                {
                                    user._id ? (
                                        <div className="user-menu">
                                            <Link to="/card" style={{marginRight: 15, position: 'relative'}}>
                                                <span>{(user.bundles || []).length + (user.lessons || []).length}</span>
                                                <ion-icon name="basket"/>
                                            </Link>
                                            <Link to="/profile/info">Профайл<ion-icon name="person"/></Link>
                                        </div>
                                    ) : (
                                        <div className="user-menu">
                                            <Link to="/card" style={{marginRight: 15, position: 'relative'}}>
                                                <span>{(card.bundles || []).length + (card.lessons || []).length}</span>
                                                <ion-icon name="basket"/>
                                            </Link>
                                            <Link to="/login">
                                                <span style={{
                                                    width: 158,
                                                    display: 'block',
                                                    fontSize: 12,
                                                    color: '#fff',
                                                    padding: '6px 0px 6px 15px',
                                                    marginRight: -25,
                                                    cursor: 'pointer',
                                                    background: 'unset',
                                                    position: 'unset',
                                                    top: 'unset',
                                                    right: 'unset',
                                                    minWidth: 'unset',
                                                    textAlign: 'unset',
                                                    lineHeight: 'unset',
                                                }}>
                                                    Нэвтрэх / Бүртгүүлэх
                                                </span>
                                            </Link>
                                        </div>
                                    )
                                }
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="header-bottom">
                    <Container>
                        <div className="section-1">
                            <div className="header-menu">
                                <ul>
                                    <li>
                                        <span className={(user.premium === 'pr' || user.premium === 'pq' ? 'ds' : '')} onClick={this.buyPre.bind(this)}>
                                            {
                                                user.premium === 'pr' ?
                                                    'Premium хэрэглэгч'
                                                : user.premium === 'pq' ?
                                                    'Premium хүсэлт илгээсэн'
                                                :   'Premium эрх авах'
                                            }
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="section-2">
                            <div className="header-menu">
                                <ul>
                                    <li>
                                        <Link to={`/lessons/all`}>
                                            Хичээлүүд
                                        </Link>
                                    </li>
                                    {/*<li>*/}
                                    {/*    <Link to={'#'}>*/}
                                    {/*        Заавар*/}
                                    {/*    </Link>*/}
                                    {/*</li>*/}
                                    <li>
                                        <Link to={'#'}>
                                            Холбоо барих
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Container>
                </div>
                <div onClick={() => this.setState({cate: false})} style={{visibility: this.state.cate ? 'visible': 'hidden', opacity: this.state.cate ? 0.5 : 0}} className="cate-back"/>
                <Modal
                    show={visible}
                    className={'premiumModal'}
                    size={'lg'}
                    onHide={() => dispatch(actions.setPremiumModal({visible: false}))}
                >
                    <Modal.Body>
                        <div>
                            <h2>
                                Premium - 365
                            </h2>
                            {
                                step === 1 ?
                                    <Row>
                                        <Col className={'pre'}>
                                            <span>
                                                Хичээл зүтгэл дуусаагүй цагт хүний амжилт дундрахгүй.
                                                Амжилт PREMIUM багцын хэрэглэгчид бүх түвшний курс хичээлүүдийг үзэх боломжтой
                                            </span>
                                        </Col>
                                        <Col className={'dawuu-taluud'}>
                                            <p>
                                                <ion-icon name="heart-outline" />
                                                <span>
                                                Үргэлж нэмэгдэх хичээлүүд
                                            </span>
                                            </p>
                                            <p>
                                                <ion-icon name="heart-outline" />
                                                <span>
                                                100% практикт суурилсан
                                            </span>
                                            </p>
                                            <p>
                                                <ion-icon name="heart-outline" />
                                                <span>
                                                Багштайгаа холбогдох боломж
                                            </span>
                                            </p>
                                            <p>
                                                <ion-icon name="heart-outline" />
                                                <span>
                                                Эх хэл дээрх тусламж
                                            </span>
                                            </p>
                                            <p>
                                                <ion-icon name="heart-outline" />
                                                <span>
                                                Супер хямд <span className={'sl'}><span className={'sale'}>365k</span> - 99,000₮</span>
                                            </span>
                                            </p>
                                        </Col>
                                    </Row>
                                : step === 2 ?
                                    <div>
                                        {
                                            type === 'bank' ?
                                                transaction._id || transaction.hadTrans ?
                                                    <div style={{marginTop: 30, marginBottom: 30}}>
                                                        <div className={'paymentMethodDet'} style={{textAlign: 'center'}}>
                                                            <p>
                                                                Таны хүсэлтийг хүлээн авлаа.
                                                            </p>
                                                            <p>
                                                                Та доорхи "Банкны мэдээллийн дагуу" гүйлгээ хийсний дараа таны худалдан авалт "Баталгаажих" болно.
                                                            </p>
                                                        </div>
                                                        {
                                                            renderBankDetails()
                                                        }
                                                    </div>
                                                :
                                                    <div style={{marginTop: 30, marginBottom: 30}}>
                                                        <div className={'paymentMethodDet'}>
                                                            <p>
                                                                Та "Худалдан авах хүсэлт илгээх" товч дарснаар таны хүсэлтийг бид хүлээн авах болно.
                                                            </p>
                                                            <p style={{color: '#ce5e5e'}}>
                                                                Суралцагч худалдан авсан контент хичээлээ буцаах эрхгүй учир сонголт хийхээсээ өмнө жишээ контентоо сайтар үзэж үйлчилгээний нөхцөлтэй уншиж танилцаарай.
                                                            </p>
                                                        </div>
                                                        {
                                                            renderBankDetails()
                                                        }
                                                    </div>
                                            : type === 'qpay' ?
                                                'qpay'
                                            :
                                                <div style={{marginTop: 30, marginBottom: 30}}>
                                                    <div className={'paymentMethod'}>
                                                        <div className={'bank method'} onClick={() => dispatch(actions.setPremiumModal({type: 'bank'}))}>
                                                            <span>₮</span>
                                                            Дансны шилжүүлэг
                                                        </div>
                                                        <div className={'qpay method'} onClick={() => dispatch(actions.setPremiumModal({type: 'qpay'}))}>
                                                            <img src="/images/qpay1.png" alt="qpay_logo"/>
                                                            QPAY үйлчилгээ ашиглан шилжүүлэх.
                                                        </div>
                                                    </div>
                                                    <div className={'paymentMethodDet'}>
                                                        <p>
                                                            QPAY - ээр шилжүүлэх:
                                                            <span>
                                                                QPAY үйлчилгээ ашиглан шилжүүлэх.
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Дансаар шилжүүлэх:
                                                            <span>
                                                                Та "АМЖИЛТ ДОТКОМ ХХК" - ийн тоот дансруу шилжүүлгэ хийснээс 5 - 10 минутын дараа таны худалдан авалт хийгдэх болно.
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                : null
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <span
                            className={'get-pre-cancel'}
                            onClick={this.backTo.bind(this)}
                        >
                            {
                                transaction._id || transaction.hadTrans ?
                                    'Хаах'
                                : step === 1 ?
                                    'Цуцлах'
                                : step === 2 ?
                                    type !== '' ?
                                        'Төлбөрийн нөхцөл сонгох'
                                    :
                                        'Буцах'
                                : null
                            }
                        </span>
                        {
                            !transaction._id && !transaction.hadTrans ?
                                step === 1 ?
                                    <span className={'get-pre'} onClick={() => dispatch(actions.setPremiumModal({step: 2}))}>
                                        Төлбөрийн нөхцөл сонгох
                                        <span style={{fontSize: 12, color: '#fbfbfb'}}> / 99k /</span>
                                    </span>
                                : step === 2 ?
                                    type === 'bank' ?
                                        <span className={'get-pre'} onClick={() => dispatch(actions.setBank())}>
                                            {
                                                gettingTransaction ?
                                                    <Spinner
                                                        variant={'light'}
                                                        size={'sm'}
                                                        animation={'border'}
                                                    />
                                                : null
                                            }
                                            <span style={{marginLeft: (gettingTransaction ? 10 : 0)}}>
                                                Худалдан авах хүсэлт илгээх
                                                <span style={{fontSize: 12, color: '#fbfbfb', marginLeft: 5}}> / 99k /</span>
                                            </span>
                                        </span>
                                    : type === 'qpay' ?
                                        <span className={'get-pre'}>
                                            Гүйлгээ шалгах
                                            <span style={{fontSize: 12, color: '#fbfbfb'}}> / 99k /</span>
                                        </span>
                                    : null
                                : null
                            : null
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        main: state.main,
        premiumModal: state.home.premiumModal
    }
}
export default  connect(mapStateToProps)(Header);