import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from "./include/Header";
import Footer from "./include/Footer";
import Loader from "./include/Loader";
import GridItem from "./include/GridItem";
import GridItemAudio from "./include/GridItemAudio";
import { Button, Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import * as actions from '../actions/home_actions';
import config from "../config";
const reducer = ({ main, home }) => ({ main, home });

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 6,
            up: false
        };
    }
    componentDidMount() {
        window.scroll(0, 0);
        config.get('ga').pageview(window.location.pathname + window.location.search);
        const {dispatch} = this.props;
        dispatch(actions.getHome());
        this.interval = setInterval(() => this.setState({ 
            up: (this.state.top > 248) ? true : this.state.top < 5 ? false : this.state.up,
            top:  this.state.up ? this.state.top - 6 : this.state.top + 6
        }), 50);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {home : {loading, watching, newLessons, featuredLessons, newAudios}, main: {premium, eish, categories, audioCategories}} = this.props;
        const gridSlider = {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 30,
            containerClass: 'swiper-container gridSlider',
            navigation: {
                nextEl: "#nextGrid",
                prevEl: "#prevGrid"
            },
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                640: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                }
            }
        };
        const mainSlider = {
            // effect: 'fade',
            autoplay: {
               delay: 3000,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            spaceBetween: 0,
            containerClass: 'swiper-container mainSlider',
            navigation: {
                nextEl: "#nextMain",
                prevEl: "#prevMain"
            },
            speed: 600,
            parallax: true,
            parallaxEl: {
                el: '.parallax-bg',
                value: '-23%'
            },
        };
        const gridWatching = {
            slidesPerView: 1,
            navigation: {
                nextEl: "#nextWatching",
                prevEl: "#prevWatching"
            },
            slidesPerGroup: 1,
            spaceBetween: 30,
            containerClass: 'swiper-container gridSlider',
            breakpoints: {
                1024: {
                    slidesPerView: 6,
                    slidesPerGroup: 6,
                },
                768: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
                640: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                }
            }
        };
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="hero-new">
                    <div style={{position: 'relative'}}>
                        <Swiper {...mainSlider}>
                            <div className="mainSlider-inner">
                                <Container>
                                    <div className="mainSlider-cont">
                                        <h5>АНХДАГЧ 1000 <span style={{color: 'gold'}}>PREMIUM</span> ХЭРЭГЛЭГЧ</h5>
                                        <p>99'000₮ төлөөд насан туршдаа сурч хөгжих боломжийг тултал ашигла та бусдаас түрүүлж алх хэзээ ч юунаас ч хоцрохгүй тогтвортой хөгжиж мэдлэгээ хязгааргүй тэл.</p>
                                        <Button  onClick={() => premium ? console.log('gz') : config.get('emitter').emit('paymentModal', {type: 'premium'})} className="banner-button">
                                            {
                                                premium ?
                                                    'Premium хэрэглэгч'
                                                    :   'Premium эрх авах'
                                            }
                                        </Button>
                                        {/*<Link to="/premium">*/}
                                        {/*    <Button className="banner-button">*/}
                                        {/*        Premium эрх*/}
                                        {/*    </Button>*/}
                                        {/*</Link>*/}
                                    </div>
                                </Container>
                            </div>
                             <div className="mainSlider-inner" >
                                 <Container>
                                     <div className="mainSlider-cont">
                                         <h5><span style={{color: 'gold'}}>ЭЕШ</span> БАГЦ</h5>
                                         <p>2021 оны шинэ хөтөлбөр дагуу Амжилт кибер сургуулийн мэргэжлийн багш нараар бэлтгэгдсэн ЭЕШ-ийн хичээлүүд 49'000₮</p>
                                         <Button className="banner-button" onClick={() => premium || eish ? console.log('gz') : config.get('emitter').emit('paymentModal', {type: 'eish'})}>
                                             {
                                                 premium ?
                                                     'Premium хэрэглэгч'
                                                     :  eish ?
                                                     'ЭЕШ хэрэглэгч'
                                                     : 'ЭЕШ багц авах'
                                             }
                                         </Button>
                                     </div>
                                 </Container>
                             </div>
                        </Swiper>
                        <div style={{position: 'absolute', top: 0, width: '100%'}}>
                            <Container>
                                <div className="mainSlider-cont">
                                    <div className="grid-next" id="nextMain">
                                        <ion-icon name="chevron-forward"/>
                                    </div>
                                    <div className="grid-prev" id="prevMain">
                                        <ion-icon name="chevron-back"/>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <div className="hero-pos">
                            <Container>
                                <div className="hero-div">
                                    <div className="cates">
                                        <h4 style={{textAlign: 'left'}}>Хичээлийн ангилал</h4>
                                        <ul className="left">
                                            <div className="beforeU"/>
                                            <div className="afterU" style={{top: this.state.top}}/>
                                            {
                                                (categories.slice(0, 8)).map((item, index) => (
                                                    <Link to={`lessons/${item.slug}`} key={index+'cate'}>
                                                        <li>
                                                            {item.title}
                                                        </li>
                                                    </Link>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="cates">
                                        <h4 style={{textAlign: 'right'}}>Номны ангилал</h4>
                                        <ul className="right">
                                            <div className="beforeU"/>
                                            <div className="afterU" style={{top: (this.state.top - 251)*-1}}/>
                                            {
                                                (audioCategories.slice(0, 8)).map((item, index) => (
                                                    <Link to={`audios/${item.slug}`} key={index+'cateww'}>
                                                        <li>
                                                            {item.title}
                                                        </li>
                                                    </Link>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
                <Loader status={loading}>
                    {
                        watching && watching.length > 0 ? (
                            <div className="section-watching">
                                <Container style={{position: 'relative'}}>
                                    <div>
                                        <Swiper {...gridWatching}>
                                            {
                                                watching.map((item, index) => (
                                                    <div key={index}>
                                                        <GridItem watching={true} item={item}/>
                                                    </div>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                    <div id="nextWatching" className="grid-next">
                                        <ion-icon name="chevron-forward"/>
                                    </div>
                                    <div id="prevWatching" className="grid-prev">
                                        <ion-icon name="chevron-back"/>
                                    </div>
                                </Container>
                            </div>
                        ) : null
                    }
                    {
                        featuredLessons && featuredLessons.length > 0 ? (
                            <div className="section-new">
                                <Container style={{position: 'relative'}}>
                                    <h3>Онцлох хичээлүүд</h3>
                                    <div>
                                        <Swiper {...gridSlider}>
                                            {
                                                featuredLessons.map((item, index) => (
                                                    <div key={index}>
                                                        <GridItem item={item}/>
                                                    </div>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                    <div id="nextGrid"className="grid-next">
                                        <ion-icon name="chevron-forward"/>
                                    </div>
                                    <div id="prevGrid" className="grid-prev">
                                        <ion-icon name="chevron-back"/>
                                    </div>
                                </Container>
                            </div>
                        ) : null
                    }
                    <div className="section-app" style={{backgroundImage: `url('/images/bg-app.png')`}}>
                        <div className="cont">
                            <Container>
                                <img className="glass" src="/images/glass.png" alt=""/>
                                <div className="inner-img">
                                    <div>
                                        <a href="https://apps.apple.com/us/app/id1553006256" target="_blank">
                                            <img src="/images/apple_qr.png" alt=""/>
                                        </a>
                                    </div>
                                    <img className="app-ss" src="/images/phone.png" alt=""/>
                                    <div>
                                        <a href="https://play.google.com/store/apps/details?id=com.odosury.dot.com&hl=en&gl=US" target="_blank">
                                            <img src="/images/android_qr.png" alt=""/>
                                        </a>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                    <div className="section-bundle">
                        <Container>
                            <h3>Сонсдог номны хураангуй</h3>
                            <Row style={{marginTop: -20}}>
                                {
                                    newAudios.map(item => (
                                        <Col md={6} xl={3} xs={12} key={item._id+'audio'}>
                                            <GridItemAudio item={item}/>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Container>
                    </div>
                    {
                        newLessons && newLessons.length > 0 ? (
                            <div className="section-featured">
                                <Container style={{position: 'relative'}}>
                                    <h3>Шинээр нэмэгдсэн хичээлүүд</h3>
                                    <Row>
                                        {
                                            newLessons.map((item, index) => (
                                                <Col key={index} md={3} style={{marginBottom: 30}}>
                                                    <div>
                                                        <GridItem item={item}/>
                                                    </div>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </Container>
                            </div>
                        ) : null
                    }
                </Loader>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Home);
