import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import * as actions from '../../actions/lesson_actions';
import {Link} from "react-router-dom";
import Select from "react-dropdown-select";
const reducer = ({ main, lesson }) => ({ main, lesson });

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {value: 'newest', name: 'Шинэ'}
        };
    }

    componentDidMount() {
        window.scroll(0, 0);
        const {dispatch, match} = this.props;
        dispatch(actions.getList(match.params.slug, {sort: this.state.sort.value}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {dispatch, match} = this.props;
        if(match.params.slug !== prevProps.match.params.slug) {
            dispatch(actions.getList(match.params.slug, {sort: this.state.sort.value}));
        }
        if(this.state.sort.value !== prevState.sort.value) {
            dispatch(actions.getList(match.params.slug, {sort: this.state.sort.value}));
        }
    }

    render() {
        const {main: {categories}, lesson: {list}} = this.props;
        let slug = this.props.match.params.slug;
        return (
            <React.Fragment>
                <Header/>
                <div className="list-container" style={{minHeight: 'calc(100vh - 185px)'}}>
                    <Container>
                        <Row>
                            <Col md={9}>
                                <div className="list-content">
                                    <div className="list-header">
                                        <h3>Хичээлүүд</h3>
                                        <Select
                                            placeholder="Эрэмбэ"
                                            valueField="value"
                                            labelField="name"
                                            style={{
                                                width: 200
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
                                    <div className="list-items">
                                        <Row>
                                            {
                                                list.map((item, index) => (
                                                    <Col md={4} style={{marginBottom: 30}}>
                                                        <div key={index}>
                                                            <GridItem item={item}/>
                                                        </div>
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="list-sidebar">
                                    <div className="list-sidebar-items">
                                        <div className="side-item">
                                            <p>Ангилал</p>
                                            <ul className="cate">
                                                {
                                                    categories.map((item, ida) => (
                                                        item.slug === slug || (item.child || []).some(chd => chd.slug === slug) ? (
                                                            <li key={ida} className={item.slug === slug ? 'cate-item active' : 'cate-item'}>
                                                                <Link to={`/lessons/${item.slug}`}>
                                                                    {item.slug === slug ? <ion-icon name="checkmark"/> : null}
                                                                    <span>{item.title} ({item.count})</span>
                                                                </Link>
                                                                {
                                                                    item.child && item.child.length > 0 ? (
                                                                        <ul className="cate-child">
                                                                            {
                                                                                item.child.map((child, ind) => (
                                                                                    <li key={ind} className={child.slug === slug ? 'cate-item active' : 'cate-item'}>
                                                                                        <Link to={`/lessons/${child.slug}`}>
                                                                                            {child.slug === slug ? <ion-icon name="checkmark"/> : null}
                                                                                            <span>{child.title} ({item.count})</span>
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
                                                                <Link to={`/lessons/${item.slug}`}>
                                                                    {item.slug === slug ? <ion-icon name="checkmark"/> : null}
                                                                    <span>{item.title} ({item.count})</span>
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
                        </Row>
                    </Container>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(List);