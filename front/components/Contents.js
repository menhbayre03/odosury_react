import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from "./include/Header";
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
              title: "Fat Bunny - short film with Fat Rabbit - Big Bug Bunny",
              description: "This is just a video. And if you want to know more about it etc...",
              embed:"<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/axdOKdaepyE\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
              created:"2022-01-04T04:28:08.220Z",
              discoveryCategory:{
                _id: "61d3ccd8c3f17d0cc42e8e29",
                title: "fat bunny",
              },
            },
            {
              title: "Fat Bunny - short film with Fat Rabbit - Big Bug Bunny",
              description: "2 This is just a video. And if you want to know more about it etc...",
              embed:"<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/axdOKdaepyE\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
              created:"2022-01-04T04:28:08.220Z",
              discoveryCategory:{
                _id: "61d3ccd8c3f17d0cc42e8e29",
                title: "2 videos",
              },
            }
        ]
        return (
            <>
            <Header location={this.props.location}/>
            <Loader>
                <Container>
                    <div className="">
                        {discoveries.demo}
                    </div>
                    
                    
                </Container>
            </Loader>
            <Footer/>
            </>
        );
    }
}
export default  connect(reducer)(Contents);