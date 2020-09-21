import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "./include/Header";
import GridItem from "./include/GridItem";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
const reducer = ({ main }) => ({ main });

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.swiper = React.createRef();
    }
    componentDidMount() {

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

    render() {
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
        return (
            <React.Fragment>
                <Header/>
                <div className="home-hero" data-src="../assets/images/home-hero.png"
                     style={{backgroundImage: "url('http://demo.foxthemes.net/courseplusv3.3/assets/images/home-hero.png')"}}>
                    <Container>
                        <div className="hero-inner">
                            <h1>Learn HTML , CSS , iphone <br/> Apps More</h1>
                            <h4 className="my-lg-4"> Learn how to build websites apps <br/> write a code or start a
                                business
                            </h4>
                            <a href="#" className="btn btn-default">Free trailer </a>
                        </div>
                    </Container>
                </div>
                <div className="section-watching">
                    <Container style={{position: 'relative'}}>
                        <div>
                            <Swiper ref={this.swiper} {...gridSlider}>
                                {
                                    [1,2,3,4,5,6,7,8].map((item, index) => (
                                        <div key={index}>
                                            <GridItem watching={true} item={item}/>
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
                <div className="section-bundle">
                    <Container>
                        <h3>Багц хичээлүүд</h3>
                        <h5> With our growing catalog of over 30 Nanodegree programs from beginner to advanced</h5>
                        <Row>
                            {
                                [1,2,3,4,5,6,7,8].map(item => (
                                    <Col md={3}>
                                        <div className="bundle-item">
                                            <img src="http://demo.foxthemes.net/courseplusv3.3/assets/images/book/vue-2-basics-.jpg" alt="" className="cover-img"/>
                                            <div className="bundle-detail">
                                                <h4>Web Development</h4>
                                                <p className="skill-card-subtitle"> 15 courses 3 bundles</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                </div>
                <div className="section-new">
                    <Container style={{position: 'relative'}}>
                        <h3>Шинээр нэмэгдсэн хичээлүүд</h3>
                        <div>
                            <Swiper ref={this.swiper} {...gridSlider}>
                                {
                                    [1,2,3,4,5,6,7,8].map((item, index) => (
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
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Home);