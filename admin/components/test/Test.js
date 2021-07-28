import React from "react";
import { connect } from 'react-redux';

import {getTest, createTest, deleteTest} from '../../actions/test_actions'
const reducer = ({ main, test }) => ({ main, test });
import {
    Card,
    Table,
    Button,
} from 'antd';
import {
    Link
} from 'react-router-dom';


class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize: 20,
        };
    }
    componentDidMount() {
        this.props.dispatch(getTest({ pageNum: this.state.pageNum, pageSize: this.state.pageSize }));
    }
    componentWillUnmount() {
    }
    render() {
        const { test: { tests, gettingTest } } = this.props;
        return (
            <Card
                title="Шалгалтууд"
                bordered={true}
                loading={gettingTest}
                extra={
                    <Link
                        to={'/admin/test/single/new'}
                    >
                        Шалгалт үүсгэх
                    </Link>
                }
            >
                <Table
                    rowKey={(record) => { return record._id }}
                    dataSource={tests}
                    columns={[
                        { title: '№', key: '№', render: (record) => (tests || []).indexOf(record)+(this.state.pageNum*this.state.pageSize)+1, width: 100 },
                        { title: 'Нэр', key: 'title', dataIndex: 'title' },
                    ]}
                    locale={{emptyText: 'Хоосон байна'}}
                />
            </Card>
        );
    }
}

export default  connect(reducer)(Test);