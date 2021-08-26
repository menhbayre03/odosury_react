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
        let search = ((props.location || {}).state || {}).search || '';
        this.state = {
            confirmModalShow:false,
            confirmModalData:{},
            trans:null,
            sort: {value: 'newest', name: 'Шинэ'},
            search: search
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
    onSearch(e) {
        if(e) {
            e.preventDefault();
        }
        const {dispatch, match} = this.props;
        dispatch(actions.getTests(match.params.slug, {sort: this.state.sort.value, search: this.state.search}));
    }
    onChange(e) {
        this.setState({search: e.target.value})
    }
    closeConfirmModal(){
        this.setState({confirmModalShow:false, confirmModalData:{}, trans:null});
    }
    checkTransaction(item){
        const {main:{user}, dispatch, test:{test, checkTransactionLoader, trans}} = this.props;
        if(user && user._id){
            if(!checkTransactionLoader){
                if(!item.price || item.price === 0){
                    this.setState({confirmModalShow:true, confirmModalData: item, trans:{}});
                } else {
                    let cc = {
                        item:item,
                        _id:item._id
                    };
                    dispatch(actions.checkTransaction(cc)).then((action) =>{
                        if(action && action.json){
                            if(action.json.success){
                                this.setState({confirmModalShow:true, confirmModalData: item, trans:(action.json.trans || null)});
                            }
                        }
                    });
                }
            }
        } else {
            config.get('emitter').emit('warning', 'Та нэвтэрч орно уу');
        }
    }
    declineOpenTest(){
        const {match, dispatch, test:{openTest}} = this.props;
        let cc = {
            _id:openTest._id
        };
        dispatch(actions.declineOpenTest(cc));
    }
    renderSidebar() {
        const {main: {categories}} = this.props;
        let slug = this.props.match.params.slug;
        return (
            <Col xl={3} lg={4} md={5} sm={12} style={{marginBottom: 30}}>
                <div className="list-sidebar">
                    <div className="list-sidebar-items">
                        <div className="side-item" style={{marginBottom: 10}}>
                            <div className="side-search">
                                <form style={{position: 'relative'}} onSubmit={(e) => this.onSearch(e)}>
                                    <input
                                        onChange={this.onChange.bind(this)}
                                        placeholder="Хичээл хайх ..."
                                        value={this.state.search}
                                    />
                                    <ion-icon  onClick={() => this.onSearch()} name="search-outline"/>
                                </form>
                            </div>
                        </div>
                        <div className="side-item">
                            <p>Ангилал</p>
                            <ul className="cate">
                                <li className={'cate-item'}>
                                    <Link to={`#`}>
                                        {'all' === slug ? <ion-icon name="checkmark"/> : null}
                                        <span>Бүгд </span>
                                    </Link>
                                </li>
                                {
                                    categories.map((item, ida) => (
                                        item.slug === slug || item.child?.some(chd => chd.slug === slug) ? (
                                            <li key={ida} className={item.slug === slug ? 'cate-item active' : 'cate-item'}>
                                                <Link to={`#`}>
                                                    {item.slug === slug ? <ion-icon name="checkmark"/> : null}
                                                    <span>{item.title} </span>
                                                </Link>
                                                {
                                                    item.child && item.child.length > 0 ? (
                                                        <ul className="cate-child">
                                                            {
                                                                item.child.map((child, ind) => (
                                                                    <li key={ind} className={child.slug === slug ? 'cate-item active' : 'cate-item'}>
                                                                        <Link to={`#`}>
                                                                            {child.slug === slug ? <ion-icon name="checkmark"/> : null}
                                                                            <span>{child.title} ({child.count})</span>
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    ) : null
                                                }
                                            </li>
                                        ) : (
                                            <li key={ida} className={'cate-item'}>
                                                <Link to={`#`}>
                                                    {item.slug === slug ? <ion-icon name="checkmark"/> : null}
                                                    <span>{item.title} </span>
                                                </Link>
                                            </li>
                                        )
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Col>
        )
    }
    render() {
        const {test:{tests, loading, all, openTest}} = this.props;
        const demoTest = [];
        // for (let i = 0; i < 10; i++) {
        //     demoTest.push({
        //         _id:i,
        //         slug:`test_${i+1}`,
        //         title: `test ${i+1}`,
        //         title: `Хичээлийн тест ${i+1}`,
        //         isTimeLimit: true,
        //         price: 20000,
        //         secret: true,
        //         oneTime: true,
        //         hasCertificate: false,
        //         backgroundImg: null,
        //         // *** ed nariig avchrahgu, orond n questionQuantity avchirna ***
        //         // easyQuestion:[
        //         //     {quantity:1, type:'selectOne'},
        //         //     {quantity:1, type:'selectMany'},
        //         // ],
        //         // mediumQuestion:[
        //         //     {quantity:1, type:'selectOne'},
        //         //     {quantity:1, type:'selectMany'},
        //         // ],
        //         questionQuantity: 20,
        //         duration: 60,
        //     });
        // }
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="list-container" style={{minHeight: 'calc(100vh - 185px)'}}>
                    <Container>
                        <Row>
                            <Col xl={9} lg={8} md={7} sm={12}>
                                <div className="list-content">
                                    <div className="list-header">
                                        <div>
                                            <h3>Тестүүд</h3>
                                        </div>
                                        <div className="testResults">
                                            <Link to={'/test/results'}>
                                                <button >ӨГСӨН ТЕСТҮҮД</button>
                                            </Link>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className="list-items">
                                    <Loader status={loading}>
                                        <Row>
                                        {   
                                            (tests || []).map((item, index) => (
                                                <Col lg={4} md={6} sm={6} style={{marginBottom: 30}}>
                                                    <div key={index} className="testCard"
                                                    // onClick={this.openConfirmModal.bind(this, item)}
                                                    onClick={() => this.checkTransaction(item)}
                                                    style={this.state.confirmModalData.backgroundImg ? {} : {background: 'url("/images/defaultTestCard1.png")', backgroundSize:'200px 110px'}}>
                                                        <div className="cardContent">
                                                         {item.title}
                                                         <br/>
                                                         Хугацаа: {item.duration} мин
                                                         <br/>
                                                        <span style={{color: '#ffc107', fontSize: 14}}>{item.price && item.price>0 ? `Үнэ: ${item.price}₮` : 'Үнэгүй'}</span>
                                                        <div className="certifyTagTest" style={item.hasCertificate? {} : {backgroundColor: '#dc3545', border: 'none', color: '#fff'}}> 
                                                        {item.hasCertificate ? 'СЕРТИФИКАТТАЙ' : 'СЕРТИФИКАТГҮЙ'} </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))
                                        }
                                        </Row>
                                    </Loader>
                                    </div>
                                </div>
                            </Col>
                            
                            {(this.renderSidebar())}
                            
                        </Row>
                        
                    </Container>
                    
                    <Modal show={this.state.confirmModalShow}
                        dialogClassName="modalContent"
                        onHide={() => this.closeConfirmModal()}
                        >
                        <div className="testModal">
                        <Modal.Body>
                            <div style={ this.state.confirmModalData.backgroundImg ? {} : {background: 'url("/images/defaultTest2.jpg")', height: '320px',backgroundSize:'600px 320px',}}  className="modalMain">
                                {/*<h4>Та <span>{this.state.confirmModalData.title}</span> тест өгөх гэж байна.</h4>*/}
                                <h4><span>{this.state.confirmModalData.title}</span> </h4>
                                <div style={{marginLeft: 25, position: 'absolute', top: '105px'}}>
                                    <div className="certifyTagTest" style={this.state.confirmModalData.hasCertificate? {} : {backgroundColor: '#dc3545', border: 'none'}}>
                                        {this.state.confirmModalData.hasCertificate? 'СЕРТИФИКАТТАЙ' : 'СЕРТИФИКАТГҮЙ'}
                                    </div>
                                    <div>
                                        Нийт: {(this.state.confirmModalData.questionQuantity || 0)} асуулттай
                                    </div>
                                    <div>
                                        Үргэлжлэх хугацаа: {this.state.confirmModalData.isTimeLimit && this.state.confirmModalData.duration ? this.state.confirmModalData.duration  : 'хугацаагүй'}
                                    </div>
                                    <div>Давтамж: {this.state.confirmModalData.oneTime? 'Нэг удаа өгнө' : 'Хэд өгсөн ч болно'}</div>
                                    <div>Үнэ: {this.state.confirmModalData.price}₮ </div>
                                </div>
                            <div style={{position: 'absolute',
                                        bottom: 20,
                                        marginLeft: '200px'}}>
                                <button className="testSecondary" onClick={this.closeConfirmModal.bind(this)}>
                                    ХААХ
                                </button>
                                {!this.state.confirmModalData.price || this.state.confirmModalData.price === 0 || (this.state.trans && this.state.trans._id)?
                                    <Link to={`/test/launch/${this.state.confirmModalData.slug}`}>
                                        <button className="testPrimary" style={{marginLeft: '30px'}}
                                        >
                                            ТЕСТ ӨГӨХ
                                        </button>
                                    </Link>
                                    :
                                    <button className="testPrimary" style={{marginLeft: '30px'}}
                                    >
                                        Худалдаж авах
                                    </button>
                                }
                            </div>
                            </div>
                        </Modal.Body>
                        </div>
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
                                    <Button variant="primary">
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