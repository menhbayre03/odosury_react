import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import GridItemAudio from "../include/GridItemAudio";
import { Container, Row, Col } from "react-bootstrap";
import * as actions from '../../actions/audio_actions';
import {Link} from "react-router-dom";
import Select from "react-dropdown-select";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
import config from "../../config";
const reducer = ({ main, audio }) => ({ main, audio });

class ListAudio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {value: 'newest', name: 'Шинэ'},
            search: ''
        };
    }

    componentDidMount() {
        config.get('ga').pageview(window.location.pathname + window.location.search);
        window.scroll(0, 0);
        const {dispatch, match} = this.props;
        dispatch(actions.getListAudio(match.params.slug, {sort: this.state.sort.value, search: this.state.search}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {dispatch, match} = this.props;
        if(match.params.slug !== prevProps.match.params.slug) {
            dispatch(actions.getListAudio(match.params.slug, {sort: this.state.sort.value, search: this.state.search}));
        }
        if(this.state.sort.value !== prevState.sort.value) {
            dispatch(actions.getListAudio(match.params.slug, {sort: this.state.sort.value, search: this.state.search}));
        }
    }

    onSearch(e) {
        if(e) {
            e.preventDefault();
        }
        const {dispatch, match} = this.props;
        dispatch(actions.getListAudio(match.params.slug, {sort: this.state.sort.value, search: this.state.search}));
    }

    onChange(e) {
        this.setState({search: e.target.value})
    }

    renderSidebar() {
        const {main: {audioCategories}} = this.props;
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
                                        placeholder="Ном хайх ..."
                                        value={this.state.search}
                                    />
                                    <ion-icon  onClick={() => this.onSearch()} name="search-outline"/>
                                </form>
                            </div>
                        </div>
                        <div className="side-item">
                            <p>Ангилал</p>
                            <ul className="cate">
                                <li className={'all' === slug ? 'cate-item active' : 'cate-item'}>
                                    <Link to={`/audios/all`}>
                                        {'all' === slug ? <ion-icon name="checkmark"/> : null}
                                        <span>Бүгд ({(audioCategories || []).reduce((total, item) => total + (item || {}).count, 0)})</span>
                                    </Link>
                                </li>
                                {
                                    audioCategories.map((item, ida) => (
                                        item.slug === slug ? (
                                            <li key={ida} className={item.slug === slug ? 'cate-item active' : 'cate-item'}>
                                                <Link to={`/audios/${item.slug}`}>
                                                    {item.slug === slug ? <ion-icon name="checkmark"/> : null}
                                                    <span>{item.title} ({item.count})</span>
                                                </Link>
                                            </li>
                                        ) : (
                                            <li key={ida} className={'cate-item'}>
                                                <Link to={`/audios/${item.slug}`}>
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
        )
    }

    render() {
        const {audio: {list, loading}} = this.props;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="list-container" style={{minHeight: 'calc(100vh - 185px)'}}>
                    <Container>
                        <Row>
                            {
                                isMobile ? (
                                    this.renderSidebar()
                                ) : null
                            }
                            <Col xl={9} lg={8} md={7} sm={12}>
                                <div className="list-content">
                                    <div className="list-header">
                                        <h3>Сонсдог номны хураангуй</h3>
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
                                    <div className="list-items" style={{marginBottom: 60, marginTop: -20}}>
                                        <Loader status={loading}>
                                            <Row>
                                                {
                                                    list.map((item, index) => (
                                                        <Col lg={4} md={6} sm={6}>
                                                            <div key={index}>
                                                                <GridItemAudio item={item}/>
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

export default  connect(reducer)(ListAudio);
