import React from "react";
import { connect } from 'react-redux';
import {
    DatePicker, Card, Table, Select, Button, List, Row, Col, Typography, Form, Input, Tag, Drawer, Spin, Switch
} from 'antd';
import { getPayments, setPaymentStatus, onSaveTrans, onCancelTrans, searchUser, changeHandler, openModal } from '../../actions/purchase_actions';
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
            type: '',
            id: '',
            startDate: null,
            endDate: null,
            custom: '',
        };
    }
    componentDidMount() {
        this.props.dispatch(getPayments());
    }
    onSave() {
        const { purchase:{ item }} = this.props;
        this.props.dispatch(onSaveTrans(item));
    }
    onCancel() {
        this.props.dispatch(onCancelTrans());
    }
    openModal() {
        this.props.dispatch(openModal());
    }
    searchUser(e){
        e.preventDefault();
        const {dispatch } = this.props;
        let cc = {
            skip: 0,
            search: this.state.search,
            status: this.state.status,
            type: this.state.type,
            id: this.state.id,
            startDate: this.state.startDate,
            custom: this.state.custom,
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
            type: this.state.type,
            id: this.state.id,
            startDate: this.state.startDate,
            custom: this.state.custom,
            endDate: this.state.endDate
        };
        dispatch(getPayments(cc))
    }
    searchTeacher(event){
        let self = this;
        function submitSearch(event){
            self.props.dispatch(searchUser({search_user:event}))
        }
        if (event !== '') {
            self.setState({ search_user: event });
            clearTimeout(self.state.timeOut);
            let text = event;
            let timeOut = setTimeout(function(){
                submitSearch(text)
            }, 300);
            self.setState({
                timeOut:timeOut
            });
        }
    }

    chooseMember(item) {
        this.props.dispatch(changeHandler({ name: 'user', value: item}))
    };
    changeHandler(e, value) {
        if (typeof e === 'string' || e instanceof String) {
            this.props.dispatch(changeHandler({ name: e, value: value}))
        } else {
            this.props.dispatch(changeHandler({ name: e.target.name, value: e.target.value}))
        }
    }
    onDateChange(dates, dateString) {
        this.setState({startDate: dateString[0] || null, endDate: dateString[1] || null})
    }
    render() {
        let {
            dispatch,
            purchase:{ status, transactions, all = 0, pageNum = 1, submitTransLoader, openModal, searchLoader, searchResult, item }
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
                        <Tag color={record.custom ? 'gray' : '#108ee9'}>Premium</Tag>
                    ) : text === 'eish' ? (
                        <Tag color={record.custom ? 'gray' : '#2db7f5'}>ЭЕШ</Tag>
                    ) : (
                        <Tag color={record.custom ? 'gray' : '#87d068'}>Хичээл</Tag>
                    )
                )
            },
            {
                key: 'method',
                title: 'Төлөлт',
                dataIndex: 'method',
                render: (text, record) => (
                    record.custom ? (
                        'Үнэгүй'
                    ) : text === 'bank' ? (
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
                key: "promo code",
                title: "Хямдрал",
                render: (record) => {
                    return (record.promocode ? <p>промо код ашигласан</p> : null)
                }
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
                extra={[
                    <Button onClick={() => this.openModal()}>ҮҮСГЭХ</Button>
                ]}
            >
                <Form onFinish={this.searchUser.bind(this)}>
                    <div style={{marginBottom: 15}}>
                        <Input addonAfter={<CloseCircleFilled style={{color:'white'}} onClick={() => this.setState({search:''})} />} maxLength={60} size='small' placeholder='Нэр, Имэйл, Утас' style={{width: 200, marginRight: 20}} value={this.state.search} name='search' onChange={(e) => this.setState({search: e.target.value})} />
                        <RangePicker size="small" onChange={this.onDateChange.bind(this)} allowEmpty={[true, true]} value={[this.state.startDate ? moment(this.state.startDate) : null, this.state.endDate ? moment(this.state.endDate) : null]} format="YYYY-MM-DD" />
                        <Input addonAfter={<CloseCircleFilled style={{color:'white'}} onClick={() => this.setState({id:''})} />} maxLength={60} size='small' placeholder='ID' style={{width: 200, marginLeft: 20}} value={this.state.id} name='search' onChange={(e) => this.setState({id: e.target.value})} />
                    </div>
                    <div>
                        <Select style={{width: 142, marginRight: 20}} size='small' name='role' value={this.state.status} onChange={(e) => this.setState({status: e})}
                        >
                            <Option value=''>Бүх төлөв</Option>
                            <Option value={'success'}>Идэвхитэй</Option>
                            <Option value={'finished'}>Дууссан</Option>
                            <Option value={'pending'}>Хүлээгдэж буй</Option>
                        </Select>
                        <Select style={{width: 142, marginRight: 20}} size='small' name='type' value={this.state.type} onChange={(e) => this.setState({type: e})}
                        >
                            <Option value=''>Бүх төрөл</Option>
                            <Option value={'premium'}>Premium</Option>
                            <Option value={'eish'}>ЭЕШ</Option>
                            <Option value={'lesson'}>Хичээл</Option>
                        </Select>
                        <Select style={{width: 142, marginRight: 20}} size='small' name='custom' value={this.state.custom} onChange={(e) => this.setState({custom: e})}
                        >
                            <Option value=''>Бүгд</Option>
                            <Option value={'yes'}>Үнэгүй</Option>
                            <Option value={'no'}>Энгийн</Option>
                        </Select>
                        <Button style={{marginLeft: 20}} loading={status} type="primary" htmlType="submit" size='small' icon={<SearchOutlined />} onClick={this.searchUser.bind(this)} >Хайх</Button>
                    </div>
                </Form>
                <Table
                    size="small"
                    dataSource={transactions}
                    rowClassName={(record, index) => record.custom  ? 'barter' : record.status === 'success' ? 'success' : record.status === 'pending' ? 'pending' : record.status === 'finished' ? 'finished' : ''}
                    columns={columns}
                    pagination={pagination}
                    expandable={{
                        rowExpandable: record => !!record.lesson || record.custom,
                        expandedRowRender: record =>
                            <Row gutter={[8, 8]}>
                                {
                                    record.custom ?
                                        <Col span={24}>
                                            <Card
                                                title={'Тайлбар: '}
                                                size={'small'}
                                            >
                                                <List.Item>
                                                    <Text
                                                        ellipsis
                                                    >
                                                        {record.description}
                                                    </Text>
                                                </List.Item>
                                            </Card>
                                        </Col>
                                    : record.lesson ?
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
                <Drawer
                    title="Эрх олгох"
                    visible={openModal}
                    closable={false}
                    maskClosable={false}
                    width={'70%'}
                >
                    <div>
                        <Form.Item
                            label='Хэрэглэгч'
                            labelCol={{span: 5}}
                        >
                            <Select
                                size="middle"
                                showSearch
                                style={{width: '100%'}}
                                value={item.user}
                                defaultActiveFirstOption={false}
                                placeholder="Овог нэр, имэйл"
                                showArrow={false}
                                filterOption={false}
                                onSearch={(e) => this.searchTeacher(e)}
                                onChange={this.chooseMember.bind(this)}
                                notFoundContent={searchLoader ?
                                    <Spin size="middle"/> : 'Хэрэглэгч олдсонгүй'}
                            >
                                {
                                    searchResult && searchResult.length > 0 ? (
                                        searchResult.map(item => (
                                            <Select.Option
                                                key={item._id}
                                                value={item._id}> {`${item.username} ${item.phone || ''}`} </Select.Option>
                                        ))
                                    ) : null
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Төрөл'
                            labelCol={{span: 5}}
                        >
                            <Select
                                value={item.type}
                                onChange={this.changeHandler.bind(this, 'type')}
                            >
                                <Option value="">Эрх сонгоно уу</Option>
                                <Option value="eish">ЭЕШ</Option>
                                <Option value="premium">Premium</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Тайлбар'
                            labelCol={{span: 5}}
                        >
                            <Input.TextArea rows={4} value={item.description} name='description' onChange={this.changeHandler.bind(this)} />
                        </Form.Item>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e8e8e8',
                                padding: '10px 16px',
                                textAlign: 'right',
                                left: 0,
                                background: '#fff',
                                borderRadius: '0 0 4px 4px',
                            }}
                        >
                            <Button
                                style={{
                                    marginRight: 8,
                                }}
                                onClick={() => this.onCancel()} disabled={submitTransLoader}
                            >
                                Болих
                            </Button>
                            <Button onClick={() => this.onSave()} loading={submitTransLoader} type="primary">
                                Хадгалах
                            </Button>
                        </div>
                    </div>
                </Drawer>
            </Card>
        );
    }
}

export default  connect(reducer)(Purchase);
