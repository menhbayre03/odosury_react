import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import { Container, Row, Col } from "react-bootstrap";
import * as actions from '../../actions/lesson_actions';
import {Link} from "react-router-dom";
import Select from "react-dropdown-select";
import Loader from "../include/Loader";
const reducer = ({ main, lesson }) => ({ main, lesson });

class List extends Component {
    constructor(props) {
        super(props);
        let search = ((props.location || {}).state || {}).search || '';
        this.state = {
            sort: {value: 'newest', name: 'Шинэ'},
            search: search
        };
    }

    componentDidMount() {
        window.scroll(0, 0);
        const {dispatch, match} = this.props;
        dispatch(actions.getList(match.params.slug, {sort: this.state.sort.value, search: this.state.search}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {dispatch, match} = this.props;
        if(match.params.slug !== prevProps.match.params.slug) {
            dispatch(actions.getList(match.params.slug, {sort: this.state.sort.value, search: this.state.search}));
        }
        if(this.state.sort.value !== prevState.sort.value) {
            dispatch(actions.getList(match.params.slug, {sort: this.state.sort.value, search: this.state.search}));
        }
    }

    onSearch(e) {
        if(e) {
            e.preventDefault();
        }
        const {dispatch, match} = this.props;
        dispatch(actions.getList(match.params.slug, {sort: this.state.sort.value, search: this.state.search}));
    }

    onChange(e) {
        this.setState({search: e.target.value})
    }

    render() {
        const {main: {categories}, lesson: {list, loading}} = this.props;
        let slug = this.props.match.params.slug;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
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
                                        <Loader status={loading}>
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
                                        </Loader>
                                    </div>
                                </div>
                            </Col>
                            <Col md={3}>
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
                                                    <Link to={`/lessons/all`}>
                                                        {'all' === slug ? <ion-icon name="checkmark"/> : null}
                                                        <span>Бүгд ({(categories || []).reduce((total, item) => total + ((item || {}).child || []).reduce((total, aa) => total + (aa || {}).count, (item || {}).count), 0)})</span>
                                                    </Link>
                                                </li>
                                                {
                                                    categories.map((item, ida) => (
                                                        item.slug === slug || (item.child || []).some(chd => chd.slug === slug) ? (
                                                            <li key={ida} className={item.slug === slug ? 'cate-item active' : 'cate-item'}>
                                                                <Link to={`/lessons/${item.slug}`}>
                                                                    {item.slug === slug ? <ion-icon name="checkmark"/> : null}
                                                                    <span>{item.title} ({(item.child || []).reduce((total, aa) => total + (aa || {}).count, item.count)})</span>
                                                                </Link>
                                                                {
                                                                    item.child && item.child.length > 0 ? (
                                                                        <ul className="cate-child">
                                                                            {
                                                                                item.child.map((child, ind) => (
                                                                                    <li key={ind} className={child.slug === slug ? 'cate-item active' : 'cate-item'}>
                                                                                        <Link to={`/lessons/${child.slug}`}>
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
                                                                <Link to={`/lessons/${item.slug}`}>
                                                                    {item.slug === slug ? <ion-icon name="checkmark"/> : null}
                                                                    <span>{item.title} ({(item.child || []).reduce((total, aa) => total + aa.count, item.count)})</span>
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