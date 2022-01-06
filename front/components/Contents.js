import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from "./include/Header";
import ReactPlayer from "react-player";
import Footer from "./include/Footer";
import { Container, Row, Col, Button, Tabs, Tab, Accordion, Card, Spinner, Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import config from "../config";
import Loader from "./include/Loader";
const reducer = ({ main, home }) => ({ main, home });

class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }
    componentDidMount() {
        config.get('ga').pageview(window.location.pathname + window.location.search);
        window.scroll(0, 0);
        const {dispatch, match} = this.props;
        
    }
    render() {
        let discoveries = [
            {
                title: "Numb - Linkin Park",
                description: "This is just a video. And if you want to know more about it etc...",
                url:'https://www.youtube.com/watch?v=kXYiU_JCYtU&ab_channel=LinkinPark',
                created:"2022-01-04T04:28:08.220Z",
                discoveryCategory:{
                _id: "61d3ccd8c3f17d0cc42e8e29",
                title: "numb",
                },
            },
                {
                title: "Three Days Grace - I Hate Everything About You",
                description: "2 This is just a video. And if you want to know more about it etc...",
                url:'https://www.youtube.com/watch?v=d8ekz_CSBVg&ab_channel=ThreeDaysGraceVEVO',
                created:"2022-01-04T04:28:08.220Z",
                discoveryCategory:{
                _id: "61d3ccd8c3f17d0cc42e8e29",
                title: "2nd video",
                },
            },
            {
                title: "Video 3",
                description: "3 This is just a video. And if you want to know more about it etc...",
                url:'https://www.youtube.com/watch?v=kXYiU_JCYtU&ab_channel=LinkinPark',
                created:"2022-01-04T04:28:08.220Z",
                discoveryCategory:{
                    _id: "61d3ccd8c3f17d0cc42e8e29",
                    title: "3rd video",
                },
            },
            {
                title: "Numb - Linkin Park",
                description: "This is just a video. And if you want to know more about it etc...",
                url:'https://www.youtube.com/watch?v=kXYiU_JCYtU&ab_channel=LinkinPark',
                created:"2022-01-04T04:28:08.220Z",
                discoveryCategory:{
                    _id: "61d3ccd8c3f17d0cc42e8e29",
                    title: "numb",
                },
            },
            {
                title: "Three Days Grace - I Hate Everything About You",
                description: "2 This is just a video. And if you want to know more about it etc...",
                url:'https://www.youtube.com/watch?v=d8ekz_CSBVg&ab_channel=ThreeDaysGraceVEVO',
                created:"2022-01-04T04:28:08.220Z",
                discoveryCategory:{
                    _id: "61d3ccd8c3f17d0cc42e8e29",
                    title: "2nd video",
                },
            },
            {
                title: "Video 3",
                description: "3 This is just a video. And if you want to know more about it etc...",
                url:'https://www.youtube.com/watch?v=kXYiU_JCYtU&ab_channel=LinkinPark',
                created:"2022-01-04T04:28:08.220Z",
                discoveryCategory:{
                _id: "61d3ccd8c3f17d0cc42e8e29",
                title: "3rd video",
                },
            },
            {
                title: "Numb - Linkin Park",
                description: "This is just a video. And if you want to know more about it etc...",
                url:'https://www.youtube.com/watch?v=kXYiU_JCYtU&ab_channel=LinkinPark',
                created:"2022-01-04T04:28:08.220Z",
                discoveryCategory:{
                    _id: "61d3ccd8c3f17d0cc42e8e29",
                    title: "numb",
                },
            },
            {
                title: "Three Days Grace - I Hate Everything About You",
                description: "2 This is just a video. And if you want to know more about it etc...",
                url:'https://www.youtube.com/watch?v=d8ekz_CSBVg&ab_channel=ThreeDaysGraceVEVO',
                created:"2022-01-04T04:28:08.220Z",
                discoveryCategory:{
                    _id: "61d3ccd8c3f17d0cc42e8e29",
                    title: "2nd video",
                },
            },
            {
                    title: "Video 3",
                    description: "3 This is just a video. And if you want to know more about it etc...",
                    url:'https://www.youtube.com/watch?v=kXYiU_JCYtU&ab_channel=LinkinPark',
                    created:"2022-01-04T04:28:08.220Z",
                    discoveryCategory:{
                    _id: "61d3ccd8c3f17d0cc42e8e29",
                    title: "3rd video",
                    },
            }
        ];
       
        // const parser = new DOMParser();
        // const video = parser.parseFromString((discoveries || [])[0]?.embed,  "text/html");
        // console.log(video);

        return (
            <>
            <Header location={this.props.location}/>
            <Loader>
                <Container>
                    <div className="taninMedehui">
                        <div className="contentHeader">
                        </div>
                        <div className="tanin">
                            <img src="/images/logo2.png" />
                            <div className="text">
                                <h3> Танин мэдэхүй </h3>
                                <p>
                                    Энэхүү контентууд нь Odosury платформын өмч болно.
                                </p>
                            </div>
                        </div>
                        <div className="videoContent">
                            <ReactPlayer
                                playing
                                controls
                                className="react-player"
                                width={'100%'}
                                height={'100%'}
                                url={(discoveries || [])[this.state.index].url} />
                        </div>
                        <div className="videoDesc">
                            <h5 className="title">
                                {(discoveries || [])[this.state.index].title} 
                            </h5>
                            <p className="desc">
                                {(discoveries || [])[this.state.index].description} 
                            </p>
                        </div>

                        <div className="contents">
                            {
                                (discoveries || []).map((item, idx) => (
                                    <div className="cardCont">
                                        <div key={idx} className="card">
                                            
                                        </div>
                                        <div className="title">
                                            {item?.title}
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                </Container>
            </Loader>
            <Footer/>
            </>
        );
    }
}
export default  connect(reducer)(Contents);