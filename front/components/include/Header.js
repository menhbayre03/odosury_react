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
                            <Col md={6} sm={isMobile ? 8 : 9} xs={isMobile ? 8 : 9} className="section-1">
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
                            <Col md={6} sm={isMobile ? 4 : 3} xs={isMobile ? 4 : 3} className="section-2">
                                {
                                    isMobile ? null : (
                                        <div className="section-1-1">
                                            <p style={{
                                                color: '#fff',
                                                marginBottom: 0,
                                                position: 'relative',
                                                top: -7,
                                                height: 20,
                                            }}><ion-icon style={{
                                                position: 'relative',
                                                background: 'transparent',
                                                color: '#fff',
                                                top: 8,
                                            }} name="call"/><span style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                            }}>8844-5020</span> | <span style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                            }}>8526-6060</span></p>
                                            {/*<form onSubmit={(e) => this.search(e)}>*/}
                                            {/*    <input onChange={(e) => this.setState({search: e.target.value})} style={{width: '100%'}} placeholder="Хичээл хайх ..."/>*/}
                                            {/*    <ion-icon onClick={(e) => this.search(e)} name="search-outline" style={{cursor: 'pointer'}}/>*/}
                                            {/*</form>*/}
                                        </div>
                                    )
                                }
                                <Link to="/premium" style={{textDecoration: 'none'}}>
                                    <span className={'section-3 neon'}>
                                        <span>
                                            P<span id="offset">re</span>mium
                                        </span>
                                    </span>
                                </Link>
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
                                                Курс Сургалт
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
                                        <li>
                                           <Link to={`/test`}>
                                               Тест
                                           </Link>
                                        </li>
                                        <li>
                                            <Link to={`/content`}>
                                                Танин мэдэхүй
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
                                                        <Link to="#" onClick={() => config.get('emitter').emit('openLogin')}>
                                                            <span>
                                                                Нэвтрэх
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
