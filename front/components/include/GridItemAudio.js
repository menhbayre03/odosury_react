import React, { Component } from "react";
import { connect } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import config from '../../config';
const reducer = ({ main }) => ({ main });

class GridItemAudio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotf: false
        }
    }

    render() {
        const {main: {user}, item, watching} = this.props;
        let lectures = (item.programs || []).length;
        let hours = (item.programs || []).reduce(function (subTotal, program) {
            return subTotal + ((program || {}).timeline || {}).minutes || 0
        }, 0) / 60;
        let hoursText = 'Цаг';
        let progress = 0;
        if(watching) {
            item.progress.map(function (item) {
                if(item.user.toString() === user._id.toString()) {
                    progress = item.progress || 0
                }
            })
        }
        if(hours < 1 && hours !== 0) {
            hours = hours * 60;
            hoursText = 'Минут';
        } else if(hours === 0) {
            hoursText = false;
        }
        return (
            <Link style={{textDecoration: 'none'}} to={`/audio/${item.slug}`}>
                <div className="bundle-item">
                    <img src={(item.thumbnail || {}).path ? `${(item.thumbnail || {}).url}${(item.thumbnail || {}).path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`} className="cover-img"/>
                    <div className="bundle-detail">
                        <h4>{item.title}</h4>
                        <p className="skill-card-subtitle">
                            <span>
                                <ion-icon name="library"/> {` ${lectures} Бүлэг`}
                            </span>
                            {
                                hoursText ? (
                                    <span>
                                        <ion-icon name="time"/>
                                        {Math.ceil(hours)} {hoursText}
                                    </span>
                                ) : null
                            }
                        </p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default  connect(reducer)(GridItemAudio);