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
        };
        this.swiper = React.createRef();
        this.swiperAudio = React.createRef();
        this.swiperWatching = React.createRef();
    }
    componentDidMount() {
        window.scroll(0, 0);
        const {dispatch} = this.props;
        dispatch(actions.getHome());
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

    goNextAudio() {
        if (this.swiperAudio.current && this.swiperAudio.current.swiper) {
            this.swiperAudio.current.swiper.slideNext();
        }
    };

    goPrevAudio() {
        if (this.swiper.current != null && this.swiper.current.swiper != null) {
            this.swiper.current.swiper.slidePrev();
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
        const {home : {loading, watching, newLessons, featuredLessons, newAudios, bundles}} = this.props;
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
        const gridSliderAudio = {
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
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                },
                640: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                }
            }
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
                <div className="home-hero" style={{backgroundImage: "url('/images/cover.png')", position: 'relative'}}>
                    <Container>
                        <div className="hero-inner">
                            <h1>БҮХ ТӨРЛИЙН МЭДЛЭГИЙН <br/> САН <span style={{color: '#E26A98'}}>ODOSURY</span></h1>
                            <h4 className="my-lg-4" style={{
                                marginTop: '0 !important',
                                textTransform: 'uppercase'
                            }}>Өөрийн бүтээлч сэтгэлгээг нэмэгдүүлж, <br/>
                            оюундаа хөрөнгө оруулж, ирээдүйнхээ <br/> төлөө одооноос сурцгаая.
                            </h4>
                            {/*<a href="#" className="btn btn-default">Free trailer </a>*/}
                        </div>
                    </Container>
                    <img style={{
                        position: 'absolute',
                        bottom: 0,
                        right: '20%',
                        maxHeight: '80%',
                    }} src="/images/cover-woman.png" alt=""/>
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