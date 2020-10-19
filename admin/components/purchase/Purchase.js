import React from "react";
import { connect } from 'react-redux';
import config from "../../config";
import {
    Card, Table, Select, Button
} from 'antd';
import { getPayments, setPaymentStatus } from '../../actions/purchase_actions';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import moment from 'moment';

const { Option } = Select;

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
                key: '_id',
                title: '№',
                render: (text, record, idx) => (
                    (this.state.pageNum * this.state.pageNum) + idx + 1
                ),
            },
            {
                key: 'user',
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
                key: 'buy',
                title: 'Худалдан авалт',
                render: (text, record) => (
                    <React.Fragment>
                        <span>Багц: {(record.bundles || {}).length || 0}, </span>
                        <span>Хичээл: {(record.lessons || {}).length || 0}</span>
                    </React.Fragment>
                )
            },
            {
                key: 'amount',
                title: 'Мөнгөн дүн',
                render: (text, record) => <NumberFormat value={record.amount || 0} displayType={'text'} thousandSeparator={true} renderText={value => <span>{value}₮</span>}/>
            },
            {
                key: 'date',
                title: 'Огноо',
                render: (text, record) => moment(record.created).format('YYYY/MM/DD hh:mm')
            },
            {
                key: 'actions',
                title: 'Төлөв',
                align: 'right',
                render: (text, record) => (
                    record.qpay.payment_id ?
                        <Select bordered={false} defaultValue={'qpay'} value={'qpay'} disabled>
                            <Option value={'qpay'}>qpay</Option>
                        </Select>
                    :
                        <Select defaultValue={record.status || null} bordered={false} placeholder={'Төлөв сонгоно уу.'} loading={record.statusChanging} onChange={(e) => dispatch(setPaymentStatus(record._id, e))}>
                            <Option value={'success'}>Зөвшөөрөх</Option>
                            <Option value={'cancel'}>Цуцлах</Option>
                            <Option value={'pending'}>Хүлээгдэж буй</Option>
                        </Select>
                )
            },
            {
                key: 'deletion',
                title: '',
                width: 70,
                render: (text, record) => (
                    <React.Fragment>
                        <Button type="link" icon={<DeleteFilled />} loading={record.deleting} onClick={() => dispatch(setPaymentStatus(record._id, 'delete'))} danger size={'small'}/>
                    </React.Fragment>
                )
            },
        ];
        return (
            <Card
                title="Худалдан авалт"
                bordered={true}
                loading={status}
            >
                <Table
                    size="small"
                    dataSource={transactions}
                    columns={columns}
                    pagination={false}
                    expandable={{
                        expandedRowRender: record => <p>{record.amount}</p>
                    }}/>
            </Card>
        );
    }
}

export default  connect(reducer)(Purchase);