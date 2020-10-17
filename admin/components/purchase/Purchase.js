import React from "react";
import { connect } from 'react-redux';
import config from "../../config";
import {
    Card, Table,
} from 'antd';
import { getPayments } from '../../actions/purchase_actions';
import { EditOutlined, LoadingOutlined, DeleteFilled, PlusOutlined, CloseCircleFilled, UploadOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';

const reducer = ({ main, purchase }) => ({ main, purchase });

class Purchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize: 50,
            search: '',
            mediaType: '',
        };
    }
    componentDidMount() {
        this.props.dispatch(getPayments());
    }
    render() {
        let {
            dispatch,
            main:{ user },
            purchase:{ status, transactions }
        } = this.props;
        // let pagination = {
        //     total : all,
        //     current: this.state.pageNum + 1,
        //     pageSize : this.state.pageSize,
        //     position: 'bottom',
        //     showSizeChanger: false,
        //     key: 'pagin'
        // };
        const columns = [
            {
                key: 'num',
                title: '№',
                render: (text, record, idx) => (
                    (this.state.pageNum * this.state.pageNum) + idx + 1
                ),
            },
            {
                key: 'description',
                title: 'Худалдан авагч',
                render: (text, record) => (
                    <span>{(record.user || {}).username || ''}</span>
                )
            },
            {
                key: 'description',
                title: 'Утга',
                dataIndex: 'description'
            },
            {
                key: 'amount',
                title: 'Мөнгөн дүн',
                render: (text, record) => <NumberFormat value={record.amount || 0} displayType={'text'} thousandSeparator={true} renderText={value => <span>{value}₮</span>}/>
            },
        ];
        return (
            <Card
                title="Худалдан авалт"
                bordered={true}
                loading={status}
            >
                <Table size="small" dataSource={transactions} columns={columns} pagination={false} />
            </Card>
        );
    }
}

export default  connect(reducer)(Purchase);