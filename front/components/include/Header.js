import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '../../config';
import { Button, Container, Col, Row, Modal, Spinner, Badge } from 'react-bootstrap';
import * as actions from '../../actions/home_actions';
import QRCode from "react-qr-code";
import {
    isMobile
} from "react-device-detect";

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
        let self = this;
        window.addEventListener('scroll', this.handleScroll);
        this.premiumReq = config.get('emitter').addListener('premiumReq', function () {
            self.buyPre()
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({cate: false})
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        this.premiumReq && this.premiumReq.remove();
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
        const {user = {}, dispatch} = this.props;
        //pr === 'premium'
        //pq === 'premiumRequest
        if((user || {}).premium === 'pr'){
            return false;
        // } else if(user.premium === 'pq'){
        //     config.get('emitter').emit('warning', 'Premium хүсэлт илгээгдсэн байна.');
        } else {
            if((user || {})._id){
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
            user = {},
            categories,
            premiumModal: {visible, step, type, gettingTransaction, transaction, checkingQpay},
            dispatch
        } = this.props;
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
                        {(user || {}).username || (user || {}).email}
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
                            <Col md={6} sm={9} xs={9} className="section-1">
                                <div className="logo" style={{display: 'inline-block'}}>
                                    <Link to={'/'}><img src="/images/logo.png" alt=""/></Link>
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
                            <Col md={6} sm={3} xs={3} className="section-2">
                                {
                                    isMobile ? null : (
                                        <div className="section-1-1">
                                            <form onSubmit={(e) => this.search(e)}>
                                                <input onChange={(e) => this.setState({search: e.target.value})} style={{width: '100%'}} placeholder="Хичээл хайх ..."/>
                                                <ion-icon onClick={(e) => this.search(e)} name="search-outline" style={{cursor: 'pointer'}}/>
                                            </form>
                                        </div>
                                    )
                                }
                                {
                                    (user || {})._id ? (
                                        <div className="user-menu">
                                            {/*<Link to="/card" style={{marginRight: 15, position: 'relative'}}>*/}
                                            {/*    <span>{(user.bundles || []).length + (user.lessons || []).length}</span>*/}
                                            {/*    <ion-icon name="basket"/>*/}
                                            {/*</Link>*/}
                                            <Link to="/profile/info">{isMobile ? null : 'Профайл'}<ion-icon name="person"/></Link>
                                        </div>
                                    ) : (
                                        <div className="user-menu">
                                            {/*<Link to="/card" style={{marginRight: 15, position: 'relative'}}>*/}
                                            {/*    <span>{(card.bundles || []).length + (card.lessons || []).length}</span>*/}
                                            {/*    <ion-icon name="basket"/>*/}
                                            {/*</Link>*/}
                                            <Link to="/login">
                                                {
                                                    isMobile ? <ion-icon name="person"/> : (
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
                                                    )
                                                }
                                            </Link>
                                        </div>
                                    )
                                }
                            </Col>
                        </Row>
                    </Container>
                    <div className="header-bottom">
                        <Container>
                            <div className="section-1">
                                <div className="header-menu">
                                    <ul>
                                        <li>
                                        <span className={((user || {}).premium === 'pr' || (user || {}).premium === 'pq' ? 'ds' : '')} onClick={this.buyPre.bind(this)}>
                                            <img style={{
                                                position: 'relative',
                                                top: -2,
                                                left: -7,
                                            }} src="/images/crown.png" alt="" height={13}/>
                                            {
                                                (user || {}).premium === 'pr' ?
                                                    'Premium хэрэглэгч'
                                                    : (user || {}).premium === 'pq' ?
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
                                        <li>
                                            <Link to={`/audios/all`}>
                                                Сонсдог ном
                                                <Badge variant="danger" style={{
                                                    position: 'relative',
                                                    top: -1,
                                                    marginLeft: 6,
                                                }}>New</Badge>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
                <div style={{marginTop: 83, display: 'inline-block'}}/>
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
                                                Odosury PREMIUM багцын хэрэглэгчид бүх түвшний курс хичээлүүдийг үзэх боломжтой
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
                                            : gettingTransaction ?
                                                <div style={{textAlign: 'center'}}>
                                                    <Spinner
                                                        variant={'secondary'}
                                                        animation={'border'}
                                                    />
                                                </div>
                                            : type === 'qpay' && (transaction.qpay || {}).payment_id ?
                                                <div style={{marginTop: 30, marginBottom: 30}}>
                                                    <div style={{textAlign: 'center'}}>
                                                        <QRCode size={180} value={(transaction.qpay || {}).qPay_QRcode} />
                                                    </div>
                                                    <div className={'paymentMethodDet bankdetail'}>
                                                        <p>
                                                            <span>
                                                                {'Шилжүүлэх дүн'.toUpperCase()}:
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
                                                                {(user || {}).username || (user || {}).email}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Хаан банкны болон бусад банкны
                                                            аппликейшнээр qr кодыг уншуулан
                                                            төлбөрийг төлнө үү.
                                                            Төлбөр <strong>төлөгдсөний</strong> дараа
                                                            таны худалдан авалт баталгаажиж, үзэх боломжтой болно.
                                                        </p>
                                                    </div>
                                                </div>
                                            :
                                                <div style={{marginTop: 30, marginBottom: 30}}>
                                                    <div className={'paymentMethod'}>
                                                        <div className={'bank method'} onClick={() => dispatch(actions.setPremiumModal({type: 'bank'}))}>
                                                            <span>₮</span>
                                                            Дансны шилжүүлэг
                                                        </div>
                                                        <div className={'qpay method'} onClick={() => dispatch(actions.setQpay())}>
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
                                                                Та "АМЖИЛТ ДОТКОМ ХХК" - ийн 5028 961615 тоот дансруу шилжүүлгэ хийснээс 5 - 10 минутын дараа таны худалдан авалт хийгдэх болно.
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
                            step === 1 && !transaction._id && !transaction.hadTrans ?
                                <span className={'get-pre'} onClick={() => dispatch(actions.setPremiumModal({step: 2}))}>
                                    Төлбөрийн нөхцөл сонгох
                                    <span style={{fontSize: 12, color: '#fbfbfb'}}> / 99k /</span>
                                </span>
                            : step === 2 ?
                                type === 'bank' && !transaction._id && !transaction.hadTrans ?
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
                                : type === 'qpay' && (transaction.qpay || {}).payment_id ?
                                    <span className={'get-pre'} onClick={() => dispatch(actions.checkQpay({c: (transaction.qpay || {}).payment_id}))}>
                                        {
                                            checkingQpay ?
                                                <Spinner
                                                    variant={'light'}
                                                    size={'sm'}
                                                    animation={'border'}
                                                />
                                                : null
                                        }
                                        <span style={{marginLeft: (checkingQpay ? 10 : 0)}}>
                                            Гүйлгээ шалгах
                                            <span style={{fontSize: 12, color: '#fbfbfb', marginLeft: 5}}> / 99k /</span>
                                        </span>
                                    </span>
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
        user: state.main.user,
        categories: state.main.categories,
        premiumModal: state.home.premiumModal
    }
}
export default  connect(mapStateToProps)(Header);
