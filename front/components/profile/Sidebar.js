import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
const reducer = ({ main, bundle }) => ({ main, bundle });

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
        };
    }

    render() {
        let url = (location.pathname || '').split("/").filter(v => v);
        return (
            <React.Fragment>
                <div className="profile-sidebar">
                    <h5>Хэрэглэгчийн хэсэг</h5>
                    <Link to="/profile/info">
                        <li className={`${url.indexOf('info') >= 0 ? 'active' : ''}`}>
                            <span>Ерөнхий мэдээлэл</span>
                        </li>
                    </Link>
                    <Link to="/profile/history">
                        <li className={`${url.indexOf('history') >= 0 ? 'active' : ''}`}>
                            <span>Худалдан авалтийн түүх</span>
                        </li>
                    </Link>
                    <Link to="/profile/lessons">
                        <li className={`${url.indexOf('lessons') >= 0 ? 'active' : ''}`}>
                            <span>Худалдаж авсан хичээлүүд</span>
                        </li>
                    </Link>
                    <Link to="/profile/wishlist">
                        <li className={`${url.indexOf('wishlist') >= 0 ? 'active' : ''}`}>
                            <span>Хадгалсан хичээлүүд</span>
                        </li>
                    </Link>
                    <a href="/logout" style={{
                        textAlign: 'center',
                        display: 'block'
                    }}>
                        <Button className="logout_button">Гарах</Button>
                    </a>
                </div>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Bundle);