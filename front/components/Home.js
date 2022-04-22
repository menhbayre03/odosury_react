import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from "./include/Header";
import Footer from "./include/Footer";
import Loader from "./include/Loader";
import GridItem from "./include/GridItem";
import GridItemAudio from "./include/GridItemAudio";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import Swiper from "react-id-swiper";
import * as actions from '../actions/home_actions';
import config from "../config";
const reducer = ({ main, home }) => ({ main, home });

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 6,
            up: false,
            showLanding: true
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
               delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            spaceBetween: 0,
            containerClass: 'swiper-container mainSlider',
            speed: 1000,
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
            disable: true,
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
                                    <div className="mainSlider-cont"style={{
                                        background: 'url(/images/backpage_2.png)',
                                        backgroundSize: 'auto 100%',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <div className="landingCont" style={{
                                            
                                        }}> 
                                            <img className="header2" src="/images/logo.png" alt=""/>
                                            <p className="header2">
                                                БҮХ НАСНЫХАНД ЗОРИУЛАГДСАН ODOSURY ОНЛАЙН СУРГАЛТЫН ПЛАТФОРМЫН КУРС СУРГАЛТУУДЫГ ТА НЭГ ТӨЛӨЛТӨӨР БҮГДИЙГ НЬ ХҮЛЭЭН АВЧ ҮЗЭХ БОЛОМЖТОЙ.                                           </p>
                                            
                                            <div className="contactHome contact2">
                                                <div className="item">
                                                    <ion-icon name="globe"></ion-icon> &nbsp;
                                                    <span >www.odosury.com</span>
                                                    
                                                </div>
                                                <div className="item">
                                                    <ion-icon name="mail"></ion-icon>&nbsp;
                                                    <span>info@odosury.com</span>
                                                    
                                                </div>
                                                <div className="item">
                                                    <ion-icon name="call"></ion-icon>&nbsp;
                                                    <span>8844-5020</span>
                                                    
                                                </div>
                                            </div>
                                            <Link to="/premium" style={{textDecoration: 'none'
                                                }}>
                                                <Button className="banner-button button2">
                                                    PREMIUM ЭРХ
                                                </Button>
                                            </Link>

                                        </div>  
                                       
                                    </div>
                            </div>

                            <div className="mainSlider-inner">
                                    <div className="mainSlider-cont" style={{
                                        background: 'url(/images/backpage_1.png)',
                                       objectFit: 'cover',
                                       backgroundSize: 'auto 100%'
                                    }}>
                                        <div className="landingCont">
                                            <img className="landingHeader" src="/images/odosuryo.png" alt=""/>
                                            <p>
                                                ОЛОН ТӨРЛИЙН ХУВЬ ХҮНИЙ ХӨГЖЛИЙН БОЛОН МЭРГЭЖЛИЙН ХИЧЭЭЛҮҮДИЙГ БАГТААСАН БҮХ НАСНЫХАНД ЗОРИУЛСАН ОНЛАЙН СУРГАЛТЫН ПЛАТФОРМ.
                                            </p>
                                            <div className="contactHome">
                                                <div className="item">
                                                    <ion-icon name="globe"></ion-icon> &nbsp;
                                                    <span>www.odosury.com</span>
                                                    
                                                </div>
                                                <div className="item">
                                                    <ion-icon name="mail"></ion-icon>&nbsp;
                                                    <span>info@odosury.com</span>
                                                    
                                                </div> 
                                                <div className="item">
                                                    <ion-icon name="call"></ion-icon>&nbsp;
                                                    <span>8844-5020</span>
                                                    
                                                </div>
                                            </div>
                                            <Link to="/premium" style={{textDecoration: 'none'
                                                }}>
                                                <Button className="banner-button" style={{
                                                    margin: '50px auto'
                                                }}>
                                                    
                                                    PREMIUM ЭРХ
                                                </Button>
                                            </Link>
                                        </div>   
                                    </div>
                            </div>
                            
                            <div className="mainSlider-inner">
                                    <div className="mainSlider-cont"style={{
                                        background: 'url(/images/backpage_3.png)',
                                        backgroundSize: 'auto 100%',
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <div className="landingCont" style={{
                                            
                                        }}> 
                                            <div style={{ display: 'flex',
                                                            justifyContent: 'center'}}>
                                                <img className="header3" src="/images/odosuryo.png" alt="" />
                                            </div>
                                           
                                        
                                            <p>
                                                ОЛОН ТӨРЛИЙН ХУВЬ ХҮНИЙ ХӨГЖЛИЙН БОЛОН МЭРГЭЖЛИЙН КУРС СУРГАЛТУУДЫГ БАГТААСАН БҮХ НАСНЫХАНД ЗОРИУЛСАН ОНЛАЙН СУРГАЛТЫН ПЛАТФОРМ.
                                            </p>
                                            <div className="contactHome contact3">
                                                <div className="item">
                                                    <ion-icon name="globe"></ion-icon> &nbsp;
                                                    <span>www.odosury.com</span>
                                                    
                                                </div>
                                                <div className="item">
                                                    <ion-icon name="mail"></ion-icon>&nbsp;
                                                    <span>info@odosury.com</span>
                                                    
                                                </div>
                                                <div className="item">
                                                    <ion-icon name="call"></ion-icon>&nbsp;
                                                    <span>8844-5020</span>
                                                    
                                                </div>
                                            </div>
                                            <Link to="/premium" style={{textDecoration: 'none'
                                                }}>
                                                <Button className="banner-button button3" style={{
                                                    margin: '50px auto'
                                                }}>
                                                    PREMIUM ЭРХ
                                                </Button>
                                            </Link>

                                        </div>  
                                       
                                    </div>
                            </div>
                           
                            
                             {/*<div className="mainSlider-inner" >*/}
                             {/*    <Container>*/}
                             {/*        <div className="mainSlider-cont">*/}
                             {/*            <h5><span style={{color: 'gold'}}>ЭЕШ</span> БАГЦ</h5>*/}
                             {/*            <p>2021 оны шинэ хөтөлбөр дагуу Амжилт кибер сургуулийн мэргэжлийн багш нараар бэлтгэгдсэн ЭЕШ-ийн хичээлүүд 49'000₮</p>*/}
                             {/*            <Link to="/eishPage" style={{textDecoration: 'none'}}>*/}
                             {/*                <Button className="banner-button">*/}
                             {/*                    ЭЕШ багц авах*/}
                             {/*                </Button>*/}
                             {/*            </Link>*/}
                             {/*        </div>*/}
                             {/*    </Container>*/}
                             {/*</div>*/}
                        </Swiper>
                        
                        {/* <div style={{position: 'absolute', top: 0, width: '100%'}}>
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
                        </div> */}
                        {/* <div className="hero-pos">
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
                        </div> */}
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
                                    <h3>Онцлох курс сургалтууд</h3>
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
                <Modal size="lg" dialogClassName="landingModal" show={this.state.showLanding} onHide={() => this.setState({showLanding: false})}>
                    <Modal.Body>
                        <div className="modalCont">
                            <img src="/images/odosuryModal.jpg" />
                            
                        </div>
                        
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Home);
