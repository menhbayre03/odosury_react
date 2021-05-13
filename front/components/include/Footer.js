import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    isMobile
} from "react-device-detect";
import { Container, Col, Row, Form, Modal, Button, Badge, CloseButton } from 'react-bootstrap';
import * as actions from '../../actions/payment_actions';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            lesson: '',
            experience: '',
            feedback: '',
            success: false,
            success2: false,
            submitting: false,
            submitting2: false,
            showModal: false,
            showModal2: false,
        }
    }

    handleSubmit(e, bly){
        e.preventDefault();
        if (bly==='teacher') {
            const {
                name,
                phone,
                email,
                lesson,
                experience
            } = this.state;
    
                this.setState({submitting: true}, () => {
                    fetch('/api/teacher/register', {
                        method: 'post',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: name,
                            phone: phone,
                            email: email,
                            lesson: lesson,
                            experience: experience,
                        })
                    })
                        .then((e) => e.json())
                        .then((e) => {
                            let state = {submitting: false};
                            if(!e.success && e.check){
                                state[e.check] = [e.check];
                            } else if(e.success){
                                state.success = true;
                            }
                            this.setState(state);
                        })
                        .catch((e) => console.log(e))
                });
        } else if (bly==='feedback') {
            const {
                feedback
            } = this.state;
    
                this.setState({submitting2: true}, () => {
                    fetch('/api/feedback', {
                        method: 'post',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            feedback: feedback
                        })
                    })
                        .then((e) => e.json())
                        .then((e) => {
                            let state = {submitting2: false};
                            if(!e.success && e.check){
                                state[e.check] = [e.check];
                            } else if(e.success){
                                state.success2 = true;
                            }
                            this.setState(state);
                        })
                        .catch((e) => console.log(e))
                });
        }
        
    }

    render() {
        const {
            categories,
            audioCategories
        } = this.props;
        return (
            <div style={{backgroundColor: '#151314'}}>
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
                                    <a href="https://www.facebook.com/OdoSury" target="_blank" style={{marginRight: 20}}>
                                        <ion-icon name="logo-instagram"/>
                                    </a>
                                    <a href="https://www.instagram.com/odosury/" target="_blank">
                                        <ion-icon name="logo-facebook"/>
                                    </a>
                                </div>
                                <ul>
                                    <li>
                                        <span style={{textDecoration: 'none', cursor: 'unset'}}>+976 8844-5020</span>
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
                                        <span onClick={() => this.setState({showModal2: true})}>Санал хүсэлт</span>                              
                                    </li>
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
                {/* Feedback Modal */}

				<Modal
					show={this.state.showModal2}
					onHide={() => this.setState({ showModal2: false })}
					centered
				>
					<CloseButton
						onClick={() => this.setState({ showModal2: false })}
						style={{
							position: "absolute",
							width: "20px",
							height: "20px",
							right: "5px",
							top: "0"
						}}
					/>
					{this.state.success2 ? (
						<div
							className="feedback-success"
							style={{
								margin: "30px"
							}}
						>
							<h3>
								Хүсэлт{" "}
								<Badge variant="success"> АМЖИЛТТАЙ </Badge>{" "}
								илгээгдлээ!
							</h3>
						</div>
					) : (
						<div
							className="feedback-request"
							style={{ margin: "30px", verticalAlign: "center" }}
						>
							<p>
								ODOSURY платформд хүргүүлэx санал хүсэлтээ та доор илгээнэ үү.
							</p>
							<Form
								onSubmit={(e) =>
									this.state.submitting2
										? false
										: this.handleSubmit(e, "feedback")
								}
							>
								<Form.Group>
									<Form.Label>Санал хүсэлт</Form.Label>
									<Form.Control
										placeholder="odosury"
										onChange={(e) =>
											this.setState({
												feedback: e.target.value
											})
										}
										value={this.state.feedback}
										required
									/>
								</Form.Group>
								<Button
									onClick={(e) =>
										this.handleSubmit(e, "feedback")
									}
									type="submit"
									style={{
										backgroundColor: "#313356",
										border: "none"
									}}
								>
									Хүсэлт илгээx
								</Button>
							</Form>
						</div>
					)}
				</Modal>

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
					{this.state.success ? (
						<div
							className="teacher-request-success"
							style={{
								margin: "30px"
							}}
						>
							<h3>
								Хүсэлт{" "}
								<Badge variant="success"> АМЖИЛТТАЙ </Badge>{" "}
								илгээгдлээ!
							</h3>
							<p>Бид тантай тун удахгүй холбогдох болно.</p>
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
								onSubmit={(e) =>
									this.state.submitting
										? false
										: this.handleSubmit(e, "teacher")
								}
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
									onClick={(e) =>
										this.handleSubmit(e, "teacher")
									}
									type="submit"
									style={{
										backgroundColor: "#313356",
										border: "none"
									}}
								>
									Бүртгүүлэх
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
        audioCategories: state.main.audioCategories
    }
}
export default  connect(mapStateToProps)(Footer);
