import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '../../config';
import { Button, Container, Col, Row, Badge } from 'react-bootstrap';
import {
    isMobile
} from "react-device-detect";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotf: false,
            cate: false,
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
    render() {
        const {
            user = {},
            premium,
            categories,
        } = this.props;

        return (
            <div>
                <div className={`header ${this.state.trans ? 'trans' : ''}`}>
                    <Container>
                        <Row className="header-top">
                            <Col md={6} sm={9} xs={9} className="section-1">
                                <div className="logo" style={{display: 'inline-block'}}>
                                    <Link to={'/'}><img src="/images/odosuryo.png" alt=""/></Link>
                                </div>
                                <div className="category-menu" style={{display: 'inline-block', position: 'relative'}}>
                                    <Button onClick={() => this.setState({cate: !this.state.cate})}>
                                        <span>Ангилал</span>
                                        <ion-icon name="caret-down-outline"/>
                                    </Button>
                                    <ul style={{visibility: this.state.cate ? 'visible': 'hidden', opacity: this.state.cate ? 1 : 0}}>
                                        {
                                            categories.map(item => (
                                                <li key={item._id}>
                                                    <Link to={`/lessons/${item.slug}`}>
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </Col>
                            <Col md={6} sm={isMobile ? 6 : 3} xs={isMobile ? 6 : 3} className="section-2">
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
                                    <span className={'section-3'} onClick={() => premium ? console.log('gz') : config.get('emitter').emit('paymentModal', {type: 'premium'})}>
                                        <img src="/images/crown.png" alt="" height={13}/>
                                        <div>
                                            <span>
                                                {
                                                    premium ?
                                                        (isMobile ? 'Premium' : 'Premium хэрэглэгч')
                                                        : (isMobile ? 'Premium' : 'Premium эрх авах')
                                                }
                                            </span>
                                        </div>
                                    </span>
                            </Col>
                        </Row>
                    </Container>
                    <div className="header-bottom">
                        <Container>
                            <div className="section-1">
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
                                            </Link>
                                        </li>
                                         <li>
                                             <Link to={`/eish`}>
                                                 ЭЕШ
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
                            <div className="section-2">
                                <div className="header-menu">
                                    <ul>
                                        <li>
                                            {
                                                (user || {})._id ? (
                                                    <div className="user-menu">
                                                        <Link to="/profile/info"><span style={{top: 4}} className="userrOn"><ion-icon style={{top: 4, fontSize: 18, marginRight: 10}} name="person"/>{isMobile ? ' ' : 'Профайл'}<span style={{textTransform: 'lowercase', display: 'unset', position: 'unset', border: 'none'}}>({user.username})</span></span></Link>
                                                    </div>
                                                ) : (
                                                    <div className="user-menu">
                                                        <Link to="/login">
                                                            <span>
                                                                <ion-icon name="log-in-outline"/> {isMobile ? 'Нэвтрэх' : 'Нэвтрэх / Бүртгүүлэх'}
                                                            </span>
                                                        </Link>
                                                    </div>
                                                )
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
                <div style={{height: 79, display: 'block', background: '#000'}}/>
                <div onClick={() => this.setState({cate: false})} style={{visibility: this.state.cate ? 'visible': 'hidden', opacity: this.state.cate ? 0.5 : 0}} className="cate-back"/>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        user: state.main.user,
        premium: state.main.premium,
        eish: state.main.eish,
        categories: state.main.categories
    }
}
export default  connect(mapStateToProps)(Header);
