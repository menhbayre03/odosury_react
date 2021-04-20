import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as actions from '../../actions/lessonEish_actions';
import Select from "react-dropdown-select";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
import config from "../../config";
const reducer = ({ main, lessonEish }) => ({ main, lessonEish });

class ListEish extends Component {
    constructor(props) {
        super(props);
        let search = ((props.location || {}).state || {}).search || '';
        this.state = {
            sort: {value: 'newest', name: 'Шинэ'},
            search: search
        };
    }

    componentDidMount() {
        config.get('ga').pageview(window.location.pathname + window.location.search);
        window.scroll(0, 0);
        const {dispatch} = this.props;
        dispatch(actions.getList({sort: this.state.sort.value, search: this.state.search}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {dispatch} = this.props;
        if(this.state.sort.value !== prevState.sort.value) {
            dispatch(actions.getList({sort: this.state.sort.value, search: this.state.search}));
        }
    }

    onChange(e) {
        this.setState({search: e.target.value})
    }


    render() {
        const {lessonEish: {list, loading}, main: {premium, eish}} = this.props;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="list-container" style={{minHeight: 'calc(100vh - 185px)'}}>
                    <Container>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <div className="eish-head" style={{backgroundImage: 'url("/images/eish-bg.jpg")'}}>
                                    <img src="/images/eish.png" alt=""/>
                                    <h4>ЭЕШ БАГЦ</h4>
                                    <p>2021 оны шинэ хөтөлбөр дагуу Амжилт кибер сургуулийн мэргэжлийн багш нараар бэлтгэгдсэн ЭЕШ-ийн хичээлүүд 49'000₮</p>
                                    <Button onClick={() => premium || eish ? console.log('gz') : config.get('emitter').emit('paymentModal', {type: 'eish'})}>
                                        {
                                            premium ?
                                                'Premium хэрэглэгч'
                                                :  eish ?
                                                    'ЭЕШ хэрэглэгч'
                                                    : 'Худалдаж авах'
                                        }

                                    </Button>
                                </div>
                                <div className="list-content">
                                    <div className="list-header">
                                        <h3>ЭЕШ Хичээлүүд</h3>
                                        <Select
                                            placeholder="Эрэмбэ"
                                            valueField="value"
                                            labelField="name"
                                            style={{
                                                width: isMobile ? 100 : 200
                                            }}
                                            values={[this.state.sort]}
                                            options={[{value: 'newest', name: 'Шинэ'}, {value: 'oldest', name: 'Хуучин'}]}
                                            multi={false}
                                            dropdownGap={10}
                                            searchable={false}
                                            color="#1890ff"
                                            className="bad-select"
                                            onChange={(values) => this.setState({sort: values[0]})}
                                        />
                                    </div>
                                    <div className="list-items maraa">
                                        <Loader status={loading}>
                                            <Row>
                                                {
                                                    list && list.length > 0 ? (
                                                        list.map((item, index) => (
                                                            <Col lg={3} md={4} sm={6} style={{marginBottom: 30}}>
                                                                <div key={index}>
                                                                    <GridItem item={item}/>
                                                                </div>
                                                            </Col>
                                                        ))
                                                    ) : (
                                                        <div className="empty-data">
                                                            <div className="emtry-picture">
                                                                <img src="/images/empty.svg"/>
                                                            </div>
                                                            <div className="emtry-text">Тун удахгүй</div>
                                                        </div>
                                                    )
                                                }
                                            </Row>
                                        </Loader>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(ListEish);
