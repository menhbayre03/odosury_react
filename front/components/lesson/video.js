/**
 * @class ReactPdfJs
 */
import PdfJsLib from "pdfjs-dist";
import React, { Component } from "react";
import { Spinner, Col, Row } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import ReactPlayer from "react-player";
import Api from "../../actions/api";
import config from "../../config";

export default class AmjiltVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            videoUrl: "",
        };
    }
    async getUrl() {
        console.log(this.props);
        if (this.props.isAws) {
            const response = await Api.get(this.props.src);
            this.setState({ loading: false });
            if (response.success === true) {
                this.setState({ videoUrl: response.url });
            } else {
                this.setState({ videoUrl: "" });
            }
        } else {
            this.setState({ loading: false, videoUrl: this.props.src });
        }
    }

    componentDidMount() {
        this.getUrl();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.src != this.props.src) {
            this.setState({ loading: true, videoUrl: "" });
            this.getUrl();
        }
    }

    render() {
        console.log(this.state.videoUrl, this.state.loading);
        return this.state.loading ? null : this.props.isIntro ? (
            <ReactPlayer
                playing
                onError={() => config.get("emitter").emit("warning", "Хандах эрх хүрэхгүй байна.")}
                controls
                autoPlay={false}
                height={isMobile ? 260 : 460}
                playIcon={<ion-icon style={{ fontSize: 74, color: "#fff" }} name="play-circle" />}
                width={"100%"}
                url={this.state.videoUrl}
                config={{
                    file: {
                        attributes: {
                            controlsList: "nodownload",
                        },
                    },
                }}
            />
        ) : (
            <ReactPlayer
                playing
                onError={() => config.get("emitter").emit("warning", "Хандах эрх хүрэхгүй байна.")}
                controls
                autoPlay={false}
                height={560}
                playIcon={<ion-icon style={{ fontSize: 74, color: "#fff" }} name="play-circle" />}
                width={"100%"}
                url={this.state.videoUrl}
                onProgress={() => {
                    this.setState({ playCounter: this.state.playCounter + 1 });
                }}
                config={{
                    file: {
                        attributes: {
                            controlsList: "nodownload",
                        },
                    },
                }}
            />
        );
    }
}
