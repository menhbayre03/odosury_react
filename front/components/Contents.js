import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./include/Header";
import ReactPlayer from "react-player";
import * as actions from "../actions/knowledge_actions";
import Footer from "./include/Footer";
import {
    Container,
    Row,
    Col,
    Button,
    Tabs,
    Tab,
    Accordion,
    Card,
    Spinner,
    Modal,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import config from "../config";
import Loader from "./include/Loader";

const reducer = ({ main, knowledge }) => ({ main, knowledge });

class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            slug: "all",
            id: "all",
        };
    }
    componentDidMount() {
        config.get("ga").pageview(window.location.pathname + window.location.search);
        window.scroll(0, 0);
        const { dispatch, match } = this.props;
        dispatch(actions.getKnowledge(this.state.slug, this.state.id));
    }

    changeVideo(idx) {
        if (idx !== this.state.index) {
            window.scroll(0, 0);
            this.setState({ index: idx });
        }
    }

    render() {
        const {
            knowledge: { knowledges, loading },
        } = this.props;
        console.log(knowledges);

        // const parser = new DOMParser();
        // const video = parser.parseFromString((discoveries || [])[0]?.embed,  "text/html");
        // console.log(video);

        return (
            <>
                <Header location={this.props.location} />
                <Loader status={loading}>
                    <Container>
                        <div className="taninMedehui">
                            <div
                                className="contentHeader"
                                style={{
                                    backgroundImage: "url(/images/backContent.jpg)",
                                }}
                            ></div>
                            <div className="tanin">
                                <img src="/images/logo2.png" />
                                <div className="text">
                                    <h3> Танин мэдэхүй </h3>
                                    <p>Энэхүү контентууд нь Odosury платформын өмч болно.</p>
                                </div>
                            </div>
                            <div className="videoContent">
                                <ReactPlayer
                                    playing
                                    controls
                                    className="react-player"
                                    width={"100%"}
                                    height={"100%"}
                                    url={((knowledges || [])[this.state.index] || []).embed}
                                />
                            </div>
                            <div className="videoDesc">
                                <h5 className="title">
                                    {((knowledges || [])[this.state.index] || []).title}
                                </h5>
                                <p className="desc">
                                    {((knowledges || [])[this.state.index] || []).description}
                                </p>
                            </div>

                            <div className="contents">
                                {(knowledges || []).map((item, idx) => (
                                    <div
                                        onClick={() => this.changeVideo(idx)}
                                        className={
                                            idx === this.state.index
                                                ? "active cardCont"
                                                : "cardCont"
                                        }
                                    >
                                        <div key={idx} className="card">
                                            <img
                                                src={
                                                    (item.knowledgeImage || {}).path
                                                        ? `${(item.knowledgeImage || {}).url}${
                                                              (item.knowledgeImage || {}).path
                                                          }`
                                                        : "/images/knowledgeCard.jpg"
                                                }
                                                onError={(e) =>
                                                    (e.target.src = `/images/knowledgeCard.jpg`)
                                                }
                                            />
                                        </div>
                                        <div className="title">{item?.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </Loader>
                <Footer />
            </>
        );
    }
}
export default connect(reducer)(Contents);
