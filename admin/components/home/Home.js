import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import config from "../../config";
import moment from "moment";


import {  } from '@ant-design/icons';

import { Card } from 'antd';
const reducer = ({ main }) => ({ main });


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render() {
        let { main:{user}, location, route: {routes} } = this.props;
        return (
            <Card
                title="Нүүр"
                bordered={true}
                loading={false}
                // extra={
                //     <a href="#">More</a>
                // }
            >

            </Card>
        );
    }
}

export default  connect(reducer)(Home);