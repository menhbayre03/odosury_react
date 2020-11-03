import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import {Container, Row, Col, Button} from "react-bootstrap";
import * as actions from '../../actions/profile_actions';
import {addWish} from '../../actions/lesson_actions';
import Loader from "../include/Loader";
import Sidebar from "./Sidebar";
import GridItem from "../include/GridItem";
const reducer = ({ main, profile }) => ({ main, profile });

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            show: false
        };
    }

    componentDidMount() {
        const {dispatch, history, main: {user}} = this.props;
        if(user) {
            window.scroll(0, 0);
            dispatch(actions.getWishlist(user._id));
        } else {
            history.push('/');
        }
    }

    removeWish(id) {
        const {dispatch} = this.props;
        dispatch(addWish(id, {add: false}));
    }

    render() {
        const {profile: {wishlist, loadingWishlist, wishRemoveLoading}} = this.props;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <Container>
                    <div className="profile-container">
                        <Row>
                            <Col md={3}>
                                <Sidebar location={this.props.location}/>
                            </Col>
                            <Col md={9}>
                                <div className="profile history">
                                    <Loader status={loadingWishlist}>
                                        <h4>Хүслийн жагсаалт</h4>
                                        {
                                            wishlist.length > 0 ? (
                                                <Row>
                                                    {
                                                        wishlist.map((item, index) => (
                                                            <Col md={4} style={{marginBottom: 30}}>
                                                                <div key={index} style={{position: 'relative'}}>
                                                                    <GridItem item={item}/>
                                                                    <ion-icon onClick={() => wishRemoveLoading ? console.log('w') : this.removeWish(item._id)} name="close" style={{
                                                                        background: 'red',
                                                                        color: '#fff',
                                                                        borderRadius: 40,
                                                                        position: 'absolute',
                                                                        top: -6,
                                                                        right: -6,
                                                                        fontSize: 18,
                                                                        cursor: 'pointer',
                                                                    }}/>
                                                                </div>
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            ) : (
                                                <div className='empty-data'>
                                                    <div className='emtry-picture'>
                                                        <img src="/images/empty.svg" />
                                                    </div>
                                                    <div className='emtry-text'>
                                                        Хүслийн жагсаалт хоосон байна.
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Loader>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Wishlist);