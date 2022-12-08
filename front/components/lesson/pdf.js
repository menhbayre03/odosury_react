/**
 * @class ReactPdfJs
 */
import PdfJsLib from "pdfjs-dist";
import React, { Component } from "react";
import { Spinner, Col, Row } from "react-bootstrap";
import Api from "../../actions/api";

export default class AmjiltPdf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdf: null,
            page: 1,
            numPages: 0,
            deg: 0,
            scale: 0.7,
            loading: true,
            loaded: false,
            expand: false,
        };
    }

    componentDidMount() {
        this.setState(
            {
                pdf: null,
                page: 1,
                numPages: 0,
                deg: 0,
                scale: 0.7,
                loading: true,
                loaded: false,
                expand: false,
            },
            () => this.setPdf()
        );
    }
    async setPdf() {
        const response = await Api.get(this.props.src);
        if (response.success === true) {
            PdfJsLib.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js";
            PdfJsLib.getDocument(response.url)
                .then((pdf) => {
                    console.log(pdf);
                    this.setState({
                        loaded: true,
                        loading: false,
                        pdf,
                        numPages: pdf.numPages,
                        page: this.state.page || 1,
                    });
                    if (this.props.onDocumentComplete) {
                        this.props.onDocumentComplete(pdf.numPages);
                    }
                    pdf.getPage(this.state.page || 1).then((page) => {
                        const { scale } = this.state;
                        const viewport = page.getViewport(scale);
                        const { canvas } = this;
                        const canvasContext = canvas.getContext("2d");
                        canvasContext.restore();
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        if (this.props.className) {
                            canvas.classList.add(this.props.className);
                        }
                        const renderContext = {
                            canvasContext,
                            viewport,
                        };
                        page.render(renderContext);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.src != this.props.src) {
            this.setState(
                {
                    pdf: null,
                    page: 1,
                    numPages: 0,
                    deg: 0,
                    scale: 0.7,
                    loading: true,
                    loaded: false,
                    expand: false,
                },
                () => {
                    this.setPdf();
                }
            );
        }
    }

    renderPdf() {
        this.state.pdf.getPage(this.state.page).then((page) => {
            const { scale, deg } = this.state;
            const viewport = page.getViewport(scale, deg);
            this.setState({ loading: false });
            const { canvas } = this;
            const canvasContext = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            if (this.props.className) {
                canvas.classList.add(this.props.className);
            }
            const renderContext = {
                canvasContext,
                viewport,
            };
            page.render(renderContext);
        });
    }
    navigatePage(num) {
        const { numPages, page, loading } = this.state;
        if (!loading) {
            let pg = page + num;
            if (pg > numPages) {
                pg = numPages;
            } else if (pg < 1) {
                pg = 1;
            }
            this.setState({ loading: true, page: pg }, () => {
                this.renderPdf();
            });
        }
    }
    scalePage(type) {
        const { loading, scale } = this.state;
        if (!loading) {
            let pg = scale;
            if (type === "inc") {
                pg += 0.3;
                if (pg > 5) {
                    pg = 5;
                }
            } else if (type === "dec") {
                pg -= 0.3;
                if (pg < 0.09) {
                    pg = 0.09;
                }
            }
            this.setState({ loading: true, scale: pg }, () => {
                this.renderPdf();
            });
        }
    }
    rotatePage(type) {
        const { loading, deg } = this.state;
        if (!loading) {
            let pg = deg;
            if (type === "inc") {
                pg += 90;
                if (pg > 180) {
                    pg = 180;
                }
            } else if (type === "dec") {
                pg -= 90;
                if (pg < -180) {
                    pg = -180;
                }
            }
            this.setState({ loading: true, deg: pg }, () => {
                this.renderPdf();
            });
        }
    }
    render() {
        const { loaded, numPages, page, loading, deg, scale } = this.state;
        const { hideFooter, hideHeader, hideNav } = this.props;
        const renderButtons = () => {
            return (
                <div className={"renderButtons"}>
                    <Row>
                        <Col>
                            <div>
                                <span
                                    className={loading ? "loading" : ""}
                                    aria-disabled={page <= 1}
                                    onClick={page <= 1 ? null : this.navigatePage.bind(this, -1)}
                                >
                                    <ion-icon name="chevron-back-outline"></ion-icon>
                                </span>
                                <span
                                    className={loading ? "loading" : ""}
                                    aria-disabled={page >= numPages}
                                    onClick={
                                        page >= numPages ? null : this.navigatePage.bind(this, 1)
                                    }
                                >
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </span>
                            </div>
                            <div className={"rotation"}>
                                <span
                                    className={loading ? "loading dec" : "dec"}
                                    aria-disabled={deg == -180}
                                    onClick={deg == -180 ? null : this.rotatePage.bind(this, "dec")}
                                >
                                    <ion-icon name="refresh-outline"></ion-icon>
                                </span>
                                <span
                                    className={loading ? "loading" : ""}
                                    aria-disabled={deg == 180}
                                    onClick={deg == 180 ? null : this.rotatePage.bind(this, "inc")}
                                >
                                    <ion-icon name="refresh-outline"></ion-icon>
                                </span>
                            </div>
                        </Col>
                        <Col className="num">
                            Хуудас: {page} / {numPages}
                        </Col>
                        <Col className="zoom">
                            <span
                                className={loading ? "loading" : ""}
                                aria-disabled={scale == 5}
                                onClick={scale == 5 ? null : this.scalePage.bind(this, "inc")}
                            >
                                <ion-icon name="add-outline"></ion-icon>
                            </span>
                            <span
                                className={loading ? "loading" : ""}
                                aria-disabled={scale == 0.09}
                                onClick={scale == 0.09 ? null : this.scalePage.bind(this, "dec")}
                            >
                                <ion-icon name="remove-outline"></ion-icon>
                            </span>
                            <span
                                className={loading ? "loading" : ""}
                                onClick={() => this.setState({ expand: !this.state.expand })}
                            >
                                {!this.state.expand ? (
                                    <ion-icon name="expand-outline"></ion-icon>
                                ) : (
                                    <ion-icon name="close-outline"></ion-icon>
                                )}
                            </span>
                        </Col>
                    </Row>
                </div>
            );
        };
        return (
            <div className={"amjilt-pdf " + (this.state.expand ? "expand" : "")}>
                {!loaded && (
                    <div className={"pdfLoader"}>
                        <Spinner animation="border" variant={"primary"} />
                    </div>
                )}

                {!hideHeader && !hideNav ? renderButtons() : null}
                <div className={"canvBody " + (!hideHeader && !hideNav ? "" : "no-head")}>
                    <canvas
                        ref={(canvas) => {
                            this.canvas = canvas;
                        }}
                    />
                </div>
                {!hideFooter && !hideNav ? renderButtons() : null}
            </div>
        );
    }
}
