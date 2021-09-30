import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '../../config'
import {
    isMobile
} from "react-device-detect";

import { Container, Col, Row, Form, Modal, Button, Badge, CloseButton, Spinner } from 'react-bootstrap';
import { submitTeacherRequest, submitFeedback } from "../../actions/request_actions"

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            feedback: '',
            feedbackPhone: '',
            name: '',
            phone: '',
            email: '',
            lesson: '',
            experience: '',
            showModal: false,
            submittingFeedback: false,
        }
    }

    submitTeacherRequest(e){
        e.preventDefault();
        this.props.dispatch(submitTeacherRequest({...this.state}));
    };
    async submitFeedback(e){
        e.preventDefault();
        let data = {
            feedback: this.state.feedback,
            feedbackPhone: this.state.feedbackPhone
        }
        this.setState({submittingFeedback: true});
        if (this.state.feedbackPhone == null || this.state.feedbackPhone === "") {
            config.get('emitter').emit('warning', "Утасны дугаар оруулна уу");
            this.setState({submittingFeedback: false})
        } else if (this.state.feedback == null || this.state.feedback === "") {
            config.get('emitter').emit('warning', "Та хүсэлтээ оруулна уу");
            this.setState({submittingFeedback: false})
        } else {
            const response = await this.props.dispatch(submitFeedback(data));
            if (response.success === true) {
                this.setState({submittingFeedback: false});
            } else {
                this.setState({submittingFeedback: false});
                config.get('emitter').emit('warning', response.msg)
            }
        }
        
    };

    render() {
        const {
            categories,
            audioCategories,
            submittingFeedback,
            submittingTeacherRequest,
            successFeedback,
            successTeacherRequest,
        } = this.props;
        return (
            <div style={{backgroundColor: '#151314'}}>
            <div className="footer-request">
                    <Container style={{overflow: 'auto'}}>
                        {/* Feedback */}
                        {successFeedback ? (
                            <div className="feedback-success-container">
                                <div
                                    className="feedback-success"
                                    style={{
                                        margin: "30px 0",
                                        color: 'white',
                                        fontSize: '1.5rem',
                                        fontWeight: '300'
                                    }}
                                >
                                    Таны хүсэлтийг амжилттай хүлээн авлаа
                                </div>
                            </div>
                        ) : (
                            <div
                                className="feedback-request"
                                style={{ verticalAlign: "center" }}
                            >
                                
                                <Form onSubmit={this.submitFeedback.bind(this)}>
                                    <Row>
                                        <Col sm={12} md={12} lg={12}>
                                            <Container>
                                                <h3 style={{color: 'white', fontWeight: '200'}}>
                                                    ODOSURY платформд нэмүүлэx хичээлийн санал хүсэлтээ та энд илгээнэ үү.
                                                </h3>
                                            </Container>
                                        </Col>
                                        {/* <Col sm={12} md={8} lg={8}>
                                            <Form.Label column style={{color: 'white'}}>ODOSURY платформд нэмүүлэx хичээлийн санал хүсэлтээ та энд илгээнэ үү.</Form.Label>
                                        </Col> */}
                                    </Row>
                                    <Row >
                                        <Col sm={12} md={5} lg={5}>
                                            <Form.Control
                                                column
                                                placeholder="Хүсэлтээ энд бичнэ үү"
                                                onChange={(e) =>
                                                    this.setState({
                                                        feedback: e.target.value
                                                    })
                                                }
                                                value={this.state.feedback}
                                                required
                                            />
                                        </Col>
                                        <Col sm={12} md={5} lg={5} >
                                            <Form.Control
                                                column
                                                placeholder="Таны утасны дугаар"
                                                onChange={(e) =>
                                                    this.setState({
                                                        feedbackPhone: e.target.value
                                                    })
                                                }
                                                value={this.state.feedbackPhone}
                                                required
                                            />
                                        </Col>
                                        <Col sm={12} md={2} lg={2}>
                                            <Button
                                                type="submit"
                                                style={{
                                                    backgroundColor: "#313356",
                                                    border: "none",
                                                    display: "inline",
                                                }}
                                            >
                                                {submittingFeedback ? <Spinner animation="border" role="status"></Spinner> : "ИЛГЭЭX"}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        )}
                    </Container>
                </div>
                <div className="footer-top">
                    <Container>
                        <Row>
                            <Col lg={3} md={4} sm={6} style={{marginBottom: 30}}>
                                <div className="logo" style={{display: 'inline-block'}}>
                                    <img src="/images/logo.png" alt="" width={200}/>
                                    <p>Odosury.com нь олон төрлийн хувь хүний хөгжлийн болон мэргэжлийн хичээлүүдийг багтаасан бүх насныханд зориулсан онлайн сургалтын платформ.</p>
                                </div>
                                <div className="social" style={{marginBottom: 20}}>
                                    <h6>Сошиал медиа</h6>
                                    <a href="https://www.instagram.com/odosury/" target="_blank" style={{marginRight: 20}}>
                                        <ion-icon name="logo-instagram"/>
                                    </a>
                                    <a href="https://www.facebook.com/OdoSury" target="_blank">
                                        <ion-icon name="logo-facebook"/>
                                    </a>
                                </div>
                                <ul>
                                    <li>
                                        <span style={{textDecoration: 'none', cursor: 'unset'}}>+976 8844-5020</span>
                                    </li>
                                    <li>
                                        <span style={{textDecoration: 'none', cursor: 'unset'}}>+976 8526-6060</span>
                                    </li>
                                    <li>
                                        <a href="mailto:info@odosury.com" style={{textDecoration: 'none'}}>info@odosury.com</a>
                                    </li>
                                </ul>
                            </Col>
                            <Col lg={3} md={4} sm={6} style={{marginBottom: 30}}>
                                <h6>Шуурхай холбоос</h6>
                                <ul>
                                    <li>
                                        <Link to='/about'>Бидний тухай</Link>
                                    </li>
                                    <li>
                                        <span onClick={() => this.setState({showModal: true})}>Багш болох</span>                              
                                    </li>
                                    {/* <li>
                                        <Link to='#'>Үйлчилгээний нөхцөл</Link>
                                    </li> */}
                                    <li>
                                        <Link to='/faq'>Түгээмэл асуултууд</Link>
                                    </li>
                                    <li>
                                        <Link to='/careers'>Ажлын байр</Link>
                                    </li>
                                    <li>
                                        <Link to='/partner'>Байгууллагаар хамтрах</Link>
                                    </li>
                                    <li>
                                        <Link to='/premium'>Premium эрх</Link>
                                    </li>
                                    <li>
                                        <Link to='/eishPage'>ЭЕШ багц</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col lg={3} md={4} sm={6} style={{marginBottom: 30}}>
                                <h6>Хичээлийн ангилал</h6>
                                <ul>
                                    {
                                        categories.map(item => (
                                            <li key={item._id}>
                                                <Link to={`/lessons/${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Col>
                            <Col lg={3} md={4} sm={6} style={{marginBottom: 30}}>
                                <h6>Номны ангилал</h6>
                                <ul>
                                    {
                                        audioCategories.map(item => (
                                            <li key={item._id}>
                                                <Link to={`/audios/${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="footer-bottom">
                    <Container>
                        <p style={{display: 'block',
                            fontSize: 12,
                            color: '#fff',
                            padding: '30px 0',
                            fontWeight: 600,
                            width: '100%',
                            textAlign: 'center',
                            marginBottom: 0}}>
                            Powered by Amjilt Dotcom LLC, © 2021 All Rights Reserved
                        </p>
                    </Container>
                </div>

				{/* Teacher Request Modal */}

				<Modal
					show={this.state.showModal}
					onHide={() => this.setState({ showModal: false })}
					centered
				>
					<CloseButton
						onClick={() => this.setState({ showModal: false })}
						style={{
							position: "absolute",
							width: "20px",
							height: "20px",
							right: "5px",
							top: "0"
						}}
					/>
					{   
                        successTeacherRequest ? (
						<div
							className="teacher-request-success"
							style={{
								padding: "30px"
							}}
						>
                            <div className="teacher-request-checkmark">
                                <div class="success-checkmark">
                                    <div class="check-icon">
                                        <span class="icon-line line-tip"></span>
                                        <span class="icon-line line-long"></span>
                                        <div class="icon-circle"></div>
                                        <div class="icon-fix"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="teacher-request-text">
                                <h4>Таны хүсэлт амжилттай илгээгдлээ!</h4>
                                <p>Бид тантай тун удахгүй холбогдох болно.</p>
                            </div>
						</div>
					) : (
						<div
							className="teacher-request"
							style={{ margin: "30px", verticalAlign: "center" }}
						>
							<p>
								ODOSURY платформ мэргэжлийн багш нартай хамтран
								ажиллахад нээлттэй бөгөөд та дараах
								шаардлагуудыг хангаж байгаа бол бид тантай
								хамтран ажиллахад үргэлж таатай байх болно :
								<br /> 1. Тухайн чиглэлээр багшилж байсан
								<br /> 2. Тухайн чиглэлээр ажиллаж байсан
								туршлагатай байх
							</p>
							<Form
								onSubmit={this.submitTeacherRequest.bind(this)}
							>
								<Form.Group>
									<Form.Label>Нэр</Form.Label>
									<Form.Control
										placeholder="odosury"
										onChange={(e) =>
											this.setState({
												name: e.target.value
											})
										}
										value={this.state.name}
										required
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Утас</Form.Label>
									<Form.Control
										placeholder="99119911"
										onChange={(e) =>
											this.setState({
												phone: e.target.value
											})
										}
										value={this.state.phone}
										required
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Цахим шуудан</Form.Label>
									<Form.Control
										placeholder="example@test.com"
										onChange={(e) =>
											this.setState({
												email: e.target.value
											})
										}
										value={this.state.email}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Хичээл</Form.Label>
									<Form.Control
										placeholder="Геометр, Иог, г.м."
										onChange={(e) =>
											this.setState({
												lesson: e.target.value
											})
										}
										value={this.state.lesson}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Ажлын туршлага</Form.Label>
									<Form.Control
										placeholder="2020-"
										onChange={(e) =>
											this.setState({
												experience: e.target.value
											})
										}
										value={this.state.experience}
									/>
								</Form.Group>
								<Button
									type="submit"
									style={{
										backgroundColor: "#313356",
										border: "none"
									}}
								>
                                    {submittingTeacherRequest ? <Spinner animation="border" role="status"></Spinner> : "Бүртгүүлэх"}
								</Button>
							</Form>
						</div>
					)}
				</Modal>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        categories: state.main.categories,
        audioCategories: state.main.audioCategories,
        submittingFeedback: state.requests.submittingFeedback,
        submittingTeacherRequest: state.requests.submittingTeacherRequest,
        successFeedback: state.requests.successFeedback,
        successTeacherRequest: state.requests.successTeacherRequest,
    }
}
export default  connect(mapStateToProps)(Footer);
