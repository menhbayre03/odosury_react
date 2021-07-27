import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import {Container, Row, Col, Button, Modal} from "react-bootstrap";
import * as actions from '../../actions/test_actions';
import {Link} from "react-router-dom";
import Select from "react-dropdown-select";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
import config from "../../config";
import moment from "moment";
const reducer = ({ main, test }) => ({ main, test });

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmModalShow:false,
            confirmModalData:{}
        };
    }

    componentDidMount() {
        const {match, dispatch} = this.props;
        const dis = this;
        let cc = {
        };
        dispatch(actions.getTests(cc));
    }
    componentWillUnmount() {
        this.closeConfirmModal();
        this.props.dispatch(actions.componentWillUnmount());
    }
    openConfirmModal(item){
        const {main:{user}} = this.props;
        if(user && user._id){
            this.setState({confirmModalShow:true, confirmModalData:item});
        } else {
            config.get('emitter').emit('warning', 'Та нэвтэрч орно уу');
        }
    }
    closeConfirmModal(){
        this.setState({confirmModalShow:false, confirmModalData:{}});
    }
    declineOpenTest(){
        const {match, dispatch, test:{openTest}} = this.props;
        let cc = {
            _id:openTest._id
        };
        dispatch(actions.declineOpenTest(cc));
    }
    render() {
        const {test:{tests, loading, all, openTest}} = this.props;
        const demoTest = [];
        for (let i = 0; i < 10; i++) {
            demoTest.push({
                _id:i,
                slug:`test_${i+1}`,
                title: `test ${i+1}`,
                isTimeLimit: true,
                price: 20000,
                secret: true,
                oneTime: true,
                hasCertificate: true,
                // *** ed nariig avchrahgu, orond n questionQuantity avchirna ***
                // easyQuestion:[
                //     {quantity:1, type:'selectOne'},
                //     {quantity:1, type:'selectMany'},
                // ],
                // mediumQuestion:[
                //     {quantity:1, type:'selectOne'},
                //     {quantity:1, type:'selectMany'},
                // ],
                questionQuantity: 4,
                duration: 20,
            });
        }
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="list-container" style={{minHeight: 'calc(100vh - 185px)'}}>
                    <Container>
                        <Loader status={loading}>
                            {
                                (tests || []).map((item, index) => (
                                    <div key={index}>
                                        {index+1}. {item.title}
                                        {openTest ? null :
                                            <Button variant="primary" onClick={this.openConfirmModal.bind(this, item)} >
                                                <ion-icon name="play" /> Тест өгөх
                                            </Button>
                                        }
                                    </div>
                                ))
                            }
                        </Loader>
                    </Container>

                    <Modal show={this.state.confirmModalShow} onHide={() => this.closeConfirmModal()}>
                        {/*<Modal.Header closeButton>*/}
                        {/*    <Modal.Title style={{fontSize: 18, fontWeight: 600}}>Тест</Modal.Title>*/}
                        {/*</Modal.Header>*/}
                        <Modal.Body>
                            <div>
                                <div>Та <span>{this.state.confirmModalData.title}</span> тест өгөх гэж байна.</div>
                                <div>Үнэ: {(this.state.confirmModalData.price || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}₮</div>
                                <div>Нийт: {(this.state.confirmModalData.questionQuantity || 0)} асуулттай</div>
                                <div>Үргэлжлэх хугацаа: {this.state.confirmModalData.isTimeLimit && this.state.confirmModalData.duration ? this.state.confirmModalData.duration : 'хугацаагүй'}</div>
                                <div>Давтамж: {this.state.confirmModalData.oneTime? 'нэг удаа өгнө' : 'хэд өгсөн ч болно'}</div>
                                <div>Сертификат: {this.state.confirmModalData.hasCertificate? 'өгнө' : 'өгөхгүй'}</div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="default" onClick={this.closeConfirmModal.bind(this)}>
                                Болих
                            </Button>
                            <Link to={`/test/launch/${this.state.confirmModalData.slug}`}>
                                <Button variant="primary"
                                        // onClick={this.openTestCheck.bind(this)}
                                >
                                    Өгөх
                                </Button>
                            </Link>
                        </Modal.Footer>
                    </Modal>
                    {openTest && openTest.test?

                        <Modal show={!!openTest}>
                            {/*<Modal.Header closeButton>*/}
                            {/*    <Modal.Title style={{fontSize: 18, fontWeight: 600}}>Тест</Modal.Title>*/}
                            {/*</Modal.Header>*/}
                            <Modal.Body>
                                <div>
                                    <div>Та <span>{(openTest.test || {}).title}</span> тестийг хийж байна.</div>
                                    <div>Үргэлжлүүлэх үү?</div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="default" onClick={this.declineOpenTest.bind(this)}>
                                    Болих
                                </Button>
                                <Link to={`/test/launch/${(openTest.test || {}).slug}`}>
                                    <Button variant="primary"
                                        // onClick={this.openTestCheck.bind(this)}
                                    >
                                        Үргэлжлүүлэх
                                    </Button>
                                </Link>
                            </Modal.Footer>
                        </Modal>
                        :
                        null
                    }
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Test);