import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from "./include/Header";
import Footer from "./include/Footer";
import Loader from "./include/Loader";
import GridItem from "./include/GridItem";
import GridItemAudio from "./include/GridItemAudio";
import { Container, Row, Col } from "react-bootstrap";
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
        this.swiper = React.createRef();
        this.swiperMain = React.createRef();
        this.swiperWatching = React.createRef();
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

    goNext() {
        if (this.swiper.current && this.swiper.current.swiper) {
            this.swiper.current.swiper.slideNext();
        }
    };

    goPrev() {
        if (this.swiper.current != null && this.swiper.current.swiper != null) {
            this.swiper.current.swiper.slidePrev();
        }
    };

    goNextMain() {
        if (this.swiperMain.current && this.swiperMain.current.swiper) {
            this.swiperMain.current.swiper.slideNext();
        }
    };

    goPrevMain() {
        if (this.swiperMain.current != null && this.swiperMain.current.swiper != null) {
            this.swiperMain.current.swiper.slidePrev();
        }
    };

    goNextWatching() {
        if (this.swiperWatching.current && this.swiperWatching.current.swiper) {
            this.swiperWatching.current.swiper.slideNext();
        }
    };

    goPrevWatching() {
        if (this.swiperWatching.current != null && this.swiperWatching.current.swiper != null) {
            this.swiperWatching.current.swiper.slidePrev();
        }
    };

    render() {
        const {home : {loading, watching, newLessons, featuredLessons, newAudios}, main: {categories}} = this.props;
        const gridSlider = {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 30,
            containerClass: 'swiper-container gridSlider',
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
            effect: 'fade',
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
              },
            spaceBetween: 0,
            containerClass: 'swiper-container mainSlider',
        };
        const gridWatching = {
            slidesPerView: 1,
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
                        <Swiper ref={this.swiperMain} {...mainSlider}>
                            <div className="mainSlider-inner" style={{backgroundImage: 'url("/images/bg-hero-1.jpg")'}}>
                                <Container>
                                    <div className="mainSlider-cont">
                                        <h5
                                            style={{
                                                color: '#fff',
                                                fontSize: 36,
                                                fontWeight: 800,
                                                textAlign: 'center',
                                                marginTop: 40,
                                            }}
                                        >PREMIUM ЭРХ</h5>
                                    </div>
                                </Container>
                            </div>
                            <div className="mainSlider-inner" style={{backgroundImage: 'url("/images/bg-hero-1.jpg")'}}>
                                <Container>
                                    <div className="mainSlider-cont">
                                        <h5
                                            style={{
                                                color: '#fff',
                                                fontSize: 36,
                                                fontWeight: 800,
                                                textAlign: 'center',
                                                marginTop: 40,
                                            }}
                                        >ЭЕШ</h5>
                                    </div>
                                </Container>
                            </div>
                        </Swiper>
                        <div style={{position: 'absolute', top: 0, width: '100%'}}>
                            <Container>
                                <div className="mainSlider-cont">
                                    <div onClick={this.goNextMain.bind(this)} className="grid-next">
                                        <ion-icon name="chevron-forward"/>
                                    </div>
                                    <div onClick={this.goPrevMain.bind(this)} className="grid-prev">
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
                                                (categories).map((item, index) => (
                                                    <Link to={`list/${item.slug}`}>
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
                                                (categories).map((item, index) => (
                                                    <Link to={`list/${item.slug}`}>
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
                                        <Swiper ref={this.swiperWatching} {...gridWatching}>
                                            {
                                                watching.map((item, index) => (
                                                    <div key={index}>
                                                        <GridItem watching={true} item={item}/>
                                                    </div>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                    <div onClick={this.goNextWatching.bind(this)} className="grid-next">
                                        <ion-icon name="chevron-forward"/>
                                    </div>
                                    <div onClick={this.goPrevWatching.bind(this)} className="grid-prev">
                                        <ion-icon name="chevron-back"/>
                                    </div>
                                </Container>
                            </div>
                        ) : null
                    }
                    {/*<div className="section-bundle">*/}
                    {/*    <Container>*/}
                    {/*        <h3>Багц хичээлүүд</h3>*/}
                    {/*        <h5> With our growing catalog of over 30 Nanodegree programs from beginner to advanced</h5>*/}
                    {/*        <Row>*/}
                    {/*            {*/}
                    {/*                bundles.map(item => (*/}
                    {/*                    <Col md={3}>*/}
                    {/*                        <Link style={{textDecoration: 'none'}} to={`/bundle/${item.slug}`}>*/}
                    {/*                            <div className="bundle-item">*/}
                    {/*                                <img src={(item.thumbnail || {}).path ? `${config.get('hostMedia')}${(item.thumbnail || {}).path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`} className="cover-img"/>*/}
                    {/*                                <div className="bundle-detail">*/}
                    {/*                                    <h4>{item.title}</h4>*/}
                    {/*                                    <p className="skill-card-subtitle">{` ${(item.levels || []).length} түвшин  ${(item.levels || []).reduce((total, aa) => total + (aa.lessons || []).length, 0)} хичээл`}</p>*/}
                    {/*                                </div>*/}
                    {/*                            </div>*/}
                    {/*                        </Link>*/}
                    {/*                    </Col>*/}
                    {/*                ))*/}
                    {/*            }*/}
                    {/*        </Row>*/}
                    {/*    </Container>*/}
                    {/*</div>*/}
                    {
                        newLessons && newLessons.length > 0 ? (
                            <div className="section-new">
                                <Container style={{position: 'relative'}}>
                                    <h3>Шинээр нэмэгдсэн хичээлүүд</h3>
                                    <div>
                                        <Swiper ref={this.swiper} {...gridSlider}>
                                            {
                                                newLessons.map((item, index) => (
                                                    <div key={index}>
                                                        <GridItem item={item}/>
                                                    </div>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                    <div onClick={this.goNext.bind(this)} className="grid-next">
                                        <ion-icon name="chevron-forward"/>
                                    </div>
                                    <div onClick={this.goPrev.bind(this)} className="grid-prev">
                                        <ion-icon name="chevron-back"/>
                                    </div>
                                </Container>
                            </div>
                        ) : null
                    }
                    <div className="section-bundle">
                        <Container>
                            <h3>Сонсдог ном</h3>
                            <Row style={{marginTop: -20}}>
                                {
                                    newAudios.map(item => (
                                        <Col md={3}>
                                            <GridItemAudio item={item}/>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Container>
                    </div>
                    {/*{*/}
                    {/*    newAudios && newAudios.length > 0 ? (*/}
                    {/*        <div className="section-new">*/}
                    {/*            <Container style={{position: 'relative'}}>*/}
                    {/*                <h3>Сонсдог ном</h3>*/}
                    {/*                <div>*/}
                    {/*                    <Swiper ref={this.swiperAudio} {...gridSliderAudio}>*/}
                    {/*                        {*/}
                    {/*                            newAudios.map((item, index) => (*/}
                    {/*                                <div key={index}>*/}
                    {/*                                    <GridItemAudio item={item}/>*/}
                    {/*                                </div>*/}
                    {/*                            ))*/}
                    {/*                        }*/}
                    {/*                    </Swiper>*/}
                    {/*                </div>*/}
                    {/*                <div onClick={this.goNextAudio.bind(this)} className="grid-next">*/}
                    {/*                    <ion-icon name="chevron-forward"/>*/}
                    {/*                </div>*/}
                    {/*                <div onClick={this.goPrevAudio.bind(this)} className="grid-prev">*/}
                    {/*                    <ion-icon name="chevron-back"/>*/}
                    {/*                </div>*/}
                    {/*            </Container>*/}
                    {/*        </div>*/}
                    {/*    ) : null*/}
                    {/*}*/}
                    {
                        featuredLessons && featuredLessons.length > 0 ? (
                            <div className="section-featured">
                                <Container style={{position: 'relative'}}>
                                    <h3>Онцлох хичээлүүд</h3>
                                    <Row>
                                        {
                                            featuredLessons.map((item, index) => (
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
