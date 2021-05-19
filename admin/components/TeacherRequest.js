import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import moment from "moment";
import {getTeacherRequests} from '../actions/teacher_actions';

import {Card, Table} from 'antd';

const reducer = ({teacherRequest}) => ({teacherRequest});


class TeacherRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        this.props.dispatch(getTeacherRequests())
    };
    
    render() {
        const {teacherRequest: {requests, gettingRequests}} = this.props;
        return (
            <Fragment>
            <Card>
                <Table columns={[
                    {
                        title: '№',
                        key: Math.random(),
                        render: (text, record, idx) => idx + 1
                    },
                    {
                        title: 'Нэр',
                        key: Math.random(),
                        render: record => record.name
                    },
                    {
                        title: 'Утас',
                        key: Math.random(),
                        render: record => record.phone
                    },
                    {
                        title: 'Цахим шуудан',
                        key: Math.random(),
                        render: record => record.email
                    },
                    {
                        title: 'Хичээл',
                        key: Math.random(),
                        render: record => record.lesson
                    },
                    {
                        title: 'Ажлын туршлага',
                        key: Math.random(),
                        render: record => record.experience
                    },
                    {
                        title: 'Илгээсэн он, сар',
                        key: Math.random(),
                        render: record => moment(record.created).format('YYYY-MM-DD h:mm:ss a')
                        // render: record => record.created
                    }
                ]}
                    dataSource={requests}
                    loading={gettingRequests}
                />        
            </Card>
            </Fragment>
        );
    }
}

export default  connect(reducer)(TeacherRequest);