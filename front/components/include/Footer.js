import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    isMobile
} from "react-device-detect";
import { Container, Col, Row } from 'react-bootstrap';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {
            categories,
            audioCategories
        } = this.props;
        return (
            <div style={{backgroundColor: '#151314'}}>
                <div className="footer-top">
                    <Container>
                        <Row>
                            <Col md={3}>
                                <div className="logo" style={{display: 'inline-block'}}>
                                    <img src="/images/logo.png" alt="" width={200}/>
                                    <p>Odosury.com нь олон төрлийн хувь хүний хөгжлийн болон мэргэжлийн хичээлүүдийг багтаасан бүх насныханд зориулсан онлайн сургалтын платформ.</p>
                                </div>
                                <div className="social" style={{marginBottom: 20}}>
                                    <h6>Сошиал медиа</h6>
                                    <a href="https://www.facebook.com/OdoSury" target="_blank" style={{marginRight: 20}}>
                                        <ion-icon name="logo-instagram"/>
                                    </a>
                                    <a href="https://www.instagram.com/odosury/" target="_blank">
                                        <ion-icon name="logo-facebook"/>
                                    </a>
                                </div>
                                <ul>
                                    <li>
                                        <span style={{textDecoration: 'none', cursor: 'unset'}}>+976 8844-5020</span>
                                    </li>
                                    <li>
                                        <a href="mailto:info@odosury.com" style={{textDecoration: 'none'}}>info@odosury.com</a>
                                    </li>
                                </ul>
                            </Col>
                            <Col md={3}>
                                <h6>Шуурхай холбоос</h6>
                                <ul>
                                    <li>
                                        <Link to='/about'>Бидний тухай</Link>
                                    </li>
                                    <li>
                                        <span>Багш болох</span>
                                    </li>
                                    <li>
                                        <Link to='#'>Үйлчилгээний нөхцөл</Link>
                                    </li>
                                    <li>
                                        <Link to='#'>Түгээмэл асуултууд</Link>
                                    </li>
                                    <li>
                                        <Link to='#'>Ажлын байр</Link>
                                    </li>
                                    <li>
                                        <Link to='#'>Байгууллагаар хамтрах</Link>
                                    </li>
                                    <li>
                                        <Link to='/premium'>Premium эрх</Link>
                                    </li>
                                    <li>
                                        <Link to='#'>ЭЕШ багц</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col md={3}>
                                <h6>Хичээлийн ангилал</h6>
                                <ul>
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
                            </Col>
                            <Col md={3}>
                                <h6>Номны ангилал</h6>
                                <ul>
                                    {
                                        audioCategories.map(item => (
                                            <li key={item._id}>
                                                <Link to={`/audios/${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="footer-bottom">
                    <Container>
                        <p style={{display: 'block',
                            fontSize: 12,
                            color: '#fff',
                            padding: '30px 0',
                            fontWeight: 600,
                            width: '100%',
                            textAlign: 'center',
                            marginBottom: 0}}>
                            Powered by Amjilt Dotcom LLC, © 2021 All Rights Reserved
                        </p>
                    </Container>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        categories: state.main.categories,
        audioCategories: state.main.audioCategories
    }
}
export default  connect(mapStateToProps)(Footer);
