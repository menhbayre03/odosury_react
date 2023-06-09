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
import {
    isMobile
} from "react-device-detect";
import config from "../../config";
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
        config.get('ga').pageview(window.location.pathname + window.location.search);
        window.scroll(0, 0);
        const {dispatch, match} = this.props;
        dispatch(actions.getList(match.params.slug || 'all', {sort: this.state.sort.value, search: this.state.search}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {dispatch, match} = this.props;
        if(match.params.slug !== prevProps.match.params.slug) {
            dispatch(actions.getList(match.params.slug || 'all', {sort: this.state.sort.value, search: this.state.search}));
        }
        if(this.state.sort.value !== prevState.sort.value) {
            dispatch(actions.getList(match.params.slug || 'all', {sort: this.state.sort.value, search: this.state.search}));
        }
    }

    onSearch(e) {
        if(e) {
            e.preventDefault();
        }
        const {dispatch, match} = this.props;
        dispatch(actions.getList(match.params.slug || 'all', {sort: this.state.sort.value, search: this.state.search}));
    }

    onChange(e) {
        this.setState({search: e.target.value})
    }

    renderSidebar() {
        const {main: {categories}} = this.props;
        let slug = this.props.match.params.slug || 'all';
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
                                    <Link to={`/lessons/all`}>
                                        {'all' === slug ? <ion-icon name="checkmark"/> : null}
                                        {console.log(categories,'here')}
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
        )
    }

    render() {
        const {lesson: {list, loading}} = this.props;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="list-container" style={{minHeight: 'calc(100vh - 185px)'}}>
                
                    <Container>
                    <div className="eish-head" style={{
                                backgroundImage: 'url("/images/eish-bg.jpg")',
                                margin: '0 auto 30px auto',
                                // width: 860,
                                maxWidth: '100%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                                height: isMobile ? 220 : 360
                            }}>
                                <img src="/images/eish.png" alt="" style={{margin: 'unset', width: 620, maxWidth: '70%', height: 'auto'}}/>
                                <h4>ЭЕШ БАГЦ</h4>
                                <p>Амжилт кибер сургуулийн мэргэжлийн багш нараар бэлтгэгдсэн ЭЕШ-ийн хичээлүүд 99'000₮</p>
                                <Link to="/premium" style={{ textDecoration: "none" }}>
                                <button>PREMIUM БАГЦ АВАХ</button>
								</Link>
                            </div>
                    
                        <Row>
                            {
                                isMobile ? (
                                    this.renderSidebar()
                                ) : null
                            }
                            
                            <Col xl={9} lg={8} md={7} sm={12}>
                                <div className="list-content">
                                    <div className="list-header">
                                        <h3>Курс Сургалт</h3>
                                        <Select
                                            placeholder="Эрэмбэ"
                                            valueField="value"
                                            labelField="name"
                                            style={{
                                                width: isMobile ? 140 : 200
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
                                                    list.map((item, index) => (
                                                        <Col lg={4} md={6} sm={6} style={{marginBottom: 30}}>
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
                            {
                                isMobile ? null : (
                                    this.renderSidebar()
                                )
                            }
                        </Row>
                    </Container>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(List);