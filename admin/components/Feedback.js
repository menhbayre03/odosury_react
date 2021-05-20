import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import moment from "moment";
import {getFeedback} from '../actions/teacher_actions';

import {Card, Table} from 'antd';

const reducer = ({feedBack}) => ({feedBack});


class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        this.props.dispatch(getFeedback())
    };
    
    render() {
        const {feedBack: {requests, gettingRequests}} = this.props;
        return (
            <Fragment>
            <Card>
                <Table columns={[
                    {
                        title: '№',
                        width: '50px',
                        key: Math.random(),
                        fixed: 'left',
                        render: (text, record, idx) => idx + 1
                    },
                    {
                        title: 'Хүсэлт',
                        key: Math.random(),
                        width: '80%',
                        render: record => record.feedback
                    },
                    {
                        title: 'Илгээсэн он, сар',
                        key: Math.random(),
                        fixed: 'right',
                        render: record => moment(record.created).format('YYYY-MM-DD h:mm:ss a')
                        // render: record => record.created
                    }
                ]}
                    dataSource={requests}
                    loading={gettingRequests}
                    scroll={{x:1300}}
                />        
            </Card>
            </Fragment>
        );
    }
}

export default  connect(reducer)(Feedback);