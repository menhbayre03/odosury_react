import React from "react";
import { connect } from 'react-redux';
import {
    DatePicker, Card, Table, Select, Button, List, Row, Col, Typography, Form, Input, Tag
} from 'antd';
import { getPayments, setPaymentStatus } from '../../actions/purchase_actions';
import { DeleteFilled , CloseCircleFilled , SearchOutlined} from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import moment from 'moment';
const { RangePicker } = DatePicker;

const { Option } = Select;
const { Text } = Typography;

const reducer = ({ main, purchase }) => ({ main, purchase });

class Purchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            status: '',
            id: '',
            startDate: null,
            endDate: null,
        };
    }
    componentDidMount() {
        this.props.dispatch(getPayments());
    }
    searchUser(e){
        e.preventDefault();
        const {dispatch } = this.props;
        let cc = {
            skip: 0,
            search: this.state.search,
            status: this.state.status,
            id: this.state.id,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };
        dispatch(getPayments(cc));
    }
    onPaginate(current){
        const {dispatch } = this.props;
        let cc = {
            skip: (current - 1) * 50,
            search: this.state.search,
            status: this.state.status,
            id: this.state.id,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };
        dispatch(getPayments(cc))
    }
    onDateChange(dates, dateString) {
        this.setState({startDate: dateString[0] || null, endDate: dateString[1] || null})
    }
    render() {
        let {
            dispatch,
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
                    <span>{(record.user || {}).username || ''}{(record.user || {}).phone ? ` (${(record.user || {}).phone})` : ''}</span>
                )
            },
            {
                key: 'date',
                title: 'Огноо',
                render: (text, record) => moment(record.created).format('YYYY/MM/DD hh:mm')
            },
            {
                key: 'type',
                title: 'Төрөл',
                dataIndex: 'type',
                render: (text, record) => (
                    text === 'premium' ? (
                        <Tag color="#108ee9">Premium</Tag>
                    ) : text === 'eish' ? (
                        <Tag color="#2db7f5">ЭЕШ</Tag>
                    ) : (
                        <Tag color="#87d068">Хичээл</Tag>
                    )
                )
            },
            {
                key: 'method',
                title: 'Төлөлт',
                dataIndex: 'method',
                render: (text, record) => (
                    text === 'bank' ? (
                        'Банкаар'
                    ) : text === 'qpay' ? (
                        'QPay'
                    ) : ''
                )
            },
            {
                key: 'amount',
                title: 'Мөнгөн дүн',
                render: (text, record) => <NumberFormat value={record.amount || 0} displayType={'text'} thousandSeparator={true} renderText={value => <span>{value}₮</span>}/>
            },
            {
                key: 'actions',
                title: 'Төлөв',
                align: 'right',
                render: (text, record) => (
                    record.qpay.payment_id && (record.qpay.payment_info || {}).payment_status === 'PAID' ?
                        <Select bordered={false} defaultValue={'qpay'} value={'qpay'} disabled>
                            <Option value={'qpay'}>Qpay төлөгдсөн</Option>
                        </Select>
                    :
                        <Select defaultValue={record.status || null} bordered={false} placeholder={'Төлөв сонгоно уу.'} loading={record.statusChanging} onChange={(e) => dispatch(setPaymentStatus(record._id, e))}>
                            <Option value={'success'}>Идэвхитэй</Option>
                            <Option value={'finished'}>Дууссан</Option>
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
                <Form onFinish={this.searchUser.bind(this)}>
                    <Input addonAfter={<CloseCircleFilled style={{color:'white'}} onClick={() => this.setState({search:''})} />} maxLength={60} size='small' placeholder='Нэр, Имэйл, Утас' style={{width: 200, marginRight: 20}} value={this.state.search} name='search' onChange={(e) => this.setState({search: e.target.value})} />
                    <Select style={{width: 142, marginRight: 20}} size='small' name='role' value={this.state.status} onChange={(e) => this.setState({status: e})}
                    >
                        <Option value=''>Бүгд</Option>
                        <Option value={'success'}>Идэвхитэй</Option>
                        <Option value={'finished'}>Дууссан</Option>
                        <Option value={'pending'}>Хүлээгдэж буй</Option>
                    </Select>
                    <RangePicker size="small" onChange={this.onDateChange.bind(this)} allowEmpty={[true, true]} value={[this.state.startDate ? moment(this.state.startDate) : null, this.state.endDate ? moment(this.state.endDate) : null]} format="YYYY-MM-DD" />

                    <Input addonAfter={<CloseCircleFilled style={{color:'white'}} onClick={() => this.setState({id:''})} />} maxLength={60} size='small' placeholder='ID' style={{width: 200, marginLeft: 20}} value={this.state.id} name='search' onChange={(e) => this.setState({id: e.target.value})} />
                    <Button style={{marginLeft: 20}} loading={status} type="primary" htmlType="submit" size='small' icon={<SearchOutlined />} onClick={this.searchUser.bind(this)} >Хайх</Button>
                </Form>
                <Table
                    size="small"
                    dataSource={transactions}
                    rowClassName={(record, index) => record.status === 'success' ? 'success' : record.status === 'pending' ? 'pending' : record.status === 'finished' ? 'finished' : ''}
                    columns={columns}
                    pagination={pagination}
                    expandable={{
                        rowExpandable: record => !!record.lesson,
                        expandedRowRender: record =>
                            <Row gutter={[8, 8]}>
                                {
                                    record.lesson ?
                                        <Col span={24}>
                                            <Card
                                                title={'Хичээл: '}
                                                size={'small'}
                                            >
                                                <List.Item
                                                    actions={[
                                                        <NumberFormat value={record.amount || 0} displayType={'text'} thousandSeparator={true} renderText={value => <Text>{value}₮</Text>}/>
                                                    ]}
                                                >
                                                    <Text
                                                        copyable
                                                        ellipsis
                                                    >
                                                        <a target="_blank" href={`/lesson/${(record.lesson || {}).slug}`}>{(record.lesson || {}).title || ''}</a>
                                                    </Text>
                                                </List.Item>
                                            </Card>
                                        </Col>
                                    : null
                                }
                            </Row>
                    }}
                    onChange={(e) => this.onPaginate(e.current)}
                />
            </Card>
        );
    }
}

export default  connect(reducer)(Purchase);
