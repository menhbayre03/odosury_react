import React from "react";
import { connect } from 'react-redux';
import config from "../../config";
import {
    Card, Table, Select, Button, List, Row, Col, Typography
} from 'antd';
import { getPayments, setPaymentStatus } from '../../actions/purchase_actions';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import moment from 'moment';

const { Option } = Select;
const { Text } = Typography;

const reducer = ({ main, purchase }) => ({ main, purchase });

class Purchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            purchase:{ status, transactions, all = 0, pageNum = 1 }
        } = this.props;
        let pagination = {
            total : all,
            current: pageNum,
            pageSize : 50,
            position: ['bottomRight', 'topRight'],
            showSizeChanger: false,
            key: 'pagin'
        };
        const columns = [
            {
                key: '_id',
                title: '№',
                render: (text, record, idx) => (
                    ((pageNum - 1) * 50) + (idx + 1)
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
                    pagination={pagination}
                    expandable={{
                        rowExpandable: record => (record.bundles || []).length > 0 || (record.lessons || []).length > 0,
                        expandedRowRender: record =>
                            <Row gutter={[8, 8]}>
                                {
                                    (record.bundles || []).length > 0 ?
                                        <Col span={(record.lessons || []).length > 0 ? 12 : 24}>
                                            <Card
                                                title={'Багцууд: '}
                                                size={'small'}
                                                extra={<Text type="secondary" strong>( {(record.bundles || []).length} )</Text>}
                                            >
                                                {
                                                    (record.bundles || []).map((item) =>
                                                        <List.Item
                                                            actions={[
                                                                <NumberFormat value={item.cost || 0} displayType={'text'} thousandSeparator={true} renderText={value => <Text>{value}₮</Text>}/>
                                                            ]}
                                                        >
                                                            <Text
                                                                copyable
                                                                ellipsis
                                                            >
                                                                {(item.bundle || {}).title || ''}
                                                            </Text>
                                                        </List.Item>
                                                    )
                                                }
                                            </Card>
                                        </Col>
                                    : null
                                }
                                {
                                    (record.lessons || []).length > 0 ?
                                        <Col span={(record.bundles || []).length > 0 ? 12 : 24}>
                                            <Card
                                                title={'Хичээлүүд: '}
                                                size={'small'}
                                                extra={<Text type="secondary" strong>( {(record.lessons || []).length} )</Text>}
                                            >
                                                {
                                                    (record.lessons || []).map((item) =>
                                                        <List.Item
                                                            actions={[
                                                                <NumberFormat value={item.cost || 0} displayType={'text'} thousandSeparator={true} renderText={value => <Text>{value}₮</Text>}/>
                                                            ]}
                                                        >
                                                            <Text
                                                                copyable
                                                                ellipsis
                                                            >
                                                                {(item.lesson || {}).title || ''}
                                                            </Text>
                                                        </List.Item>
                                                    )
                                                }
                                            </Card>
                                        </Col>
                                    : null
                                }
                            </Row>
                    }}
                    onChange={(e) => dispatch(getPayments({skip: (e.current - 1) * 50}))}
                />
            </Card>
        );
    }
}

export default  connect(reducer)(Purchase);