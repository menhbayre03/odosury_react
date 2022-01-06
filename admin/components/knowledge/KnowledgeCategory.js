import React from "react";
import { connect } from 'react-redux';
import config from "../../config";
import moment from "moment";
import * as actions from "../../actions/knowledgeCategory_actions";


const reducer = ({ main, knowledgeCategory }) => ({ main, knowledgeCategory });
import { Card, Button, Table, Modal, Form, Input, Select, Popconfirm } from 'antd';
import { DeleteFilled, PlusOutlined, EditFilled, SearchOutlined } from '@ant-design/icons'
const { Option } = Select;

class KnowledgeCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize: 50,
            search: '',
        };
    }
    componentDidMount() {
        this.props.dispatch(actions.getKnowledgeCategory({pageNum: this.state.pageNum, pageSize: this.state.pageSize}));
    }
    componentWillUnmount() {
        this.props.dispatch(actions.closeKnowledgeCategoryModal());
    }
    openModal(data) {
        this.props.dispatch(actions.openKnowledgeCategoryModal(data));
    }
    closeModal() {
        this.props.dispatch(actions.closeKnowledgeCategoryModal());
    }
    onChangeHandler(e) {
        this.props.dispatch(actions.knowledgeCategoryChangeHandler({name:e.target.name, value: e.target.value}));
    }
    onChangeHandlerSelect(name, value) {
        this.props.dispatch(actions.knowledgeCategoryChangeHandler({name:name, value: value}));
    }
    submitCategory() {
        const {knowledgeCategory:{category}} = this.props;
        if(!category.title || (category.title && category.title.trim() === '' )){
            return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
        }
        this.props.dispatch(actions.submitKnowledgeCategory(category));
    }
    tableOnChange(data){
        const {dispatch } = this.props;
        this.setState({pageNum : data.current - 1});
        let cc = {
            pageNum:data.current - 1,
            pageSize:this.state.pageSize,
            search: this.state.search
        };
        this.props.dispatch(actions.getKnowledgeCategory(cc));
    }
    searchCategory(){
        const {dispatch } = this.props;
        this.setState({pageNum: 0});
        let cc = {
            pageNum:0,
            pageSize:this.state.pageSize,
            search: this.state.search
        };
        this.props.dispatch(actions.getKnowledgeCategory(cc));
    }
    delete(id){
        this.props.dispatch(actions.deleteKnowledgeCategory({_id:id, pageSize: this.state.pageSize, pageNum: this.state.pageNum}));
    }
    render() {
        let { knowledgeCategory:{ openModal, category, categories, submitCategoryLoader, all, allCategories} } = this.props;
        let pagination = {
            total : all,
            current: this.state.pageNum + 1,
            pageSize : this.state.pageSize,
            position: 'bottom',
            showSizeChanger: false
        };
        const columns = [
            {
                key: 'num',
                title: '№',
                render: (text, record, idx) => (
                    (this.state.pageNum * this.state.pageSize) + idx + 1
                ),
            },
            {
                key: 'title',
                title: 'Нэр',
                render: (text, record, idx) => (
                    record.title ? record.title : '-'
                ),
            },
            {
                key: 'created',
                title: 'Огноо',
                render: (text, record, idx) => (
                    record.created ? moment(record.created).format('YYYY-MM-DD') : '-'
                ),
            },
            {
                title: 'Үйлдэл',
                key: 'action',
                render: (text, record) => (
                    <div style={{width: 240}}>

                        <Button size={"small"} style={{marginRight: 10}} key={record._id+'edit'} loading={!!record.loading}
                                onClick = {this.openModal.bind(this, record )}
                        >
                            <EditFilled /> Засах
                        </Button>
                        <Popconfirm
                            title={`Та устгах гэж байна!`}
                            onConfirm={this.delete.bind(this, record._id)}
                            okText="Устгах"
                            placement="left"
                            cancelText="Болих"
                        >
                            <Button type={"primary"} key={record._id} danger size={"small"} loading={!!record.loading}>
                                <DeleteFilled/> Устгах
                            </Button>
                        </Popconfirm>
                    </div>
                ),
                width: 240
            },
        ];
        return (
            <Card
                title="Танин мэдэхүй ангилал"
                bordered={true}
                loading={false}
                extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={this.openModal.bind(this, {})} >
                        Танин мэдэхүй ангилал
                    </Button>
                }
            >
                <div style={{marginBottom: 20}}>
                    <Input maxLength={60} size='small' placeholder='Нэр' style={{width: 200, marginRight: 20}} value={this.state.search} name='search' onChange={(e) => this.setState({search: e.target.value})} />
                    <Button type="primary" size='small' icon={<SearchOutlined />} onClick={this.searchCategory.bind(this)} >Хайх</Button>
                </div>

                <Table size="small" dataSource={categories} columns={columns} onChange={this.tableOnChange.bind(this)} pagination={pagination} />
                <Modal
                    title="Танин мэдэхүй ангилал"
                    visible={openModal}
                    onOk={this.submitCategory.bind(this)}
                    onCancel={this.closeModal.bind(this)}
                    okText="Хадгалах"
                    cancelText="Болих"
                    confirmLoading={submitCategoryLoader}
                    maskClosable={false}
                >
                    <Form.Item
                        label='Нэр'
                        labelCol={{span: 3}}
                    >
                        <Input maxLength={60} value={category.title? category.title : ''} name='title' onChange={this.onChangeHandler.bind(this)} />
                    </Form.Item>
                    {allCategories && allCategories.length>0?
                        <Form.Item
                            label='Эцэг'
                            labelCol={{span: 3}}
                            help="Заавал шаардлагагүй"
                        >
                            <Select value={category.parent? category.parent: ''} name='parent' onChange={this.onChangeHandlerSelect.bind(this, 'parent')}>
                                <Option value=''>Эцэг ангилал сонгох</Option>
                                {allCategories.map( run =>
                                    run._id === category._id || run.parent?
                                        null
                                        :
                                        <Option value={run._id}>{run.title}</Option>
                                )}
                            </Select>
                        </Form.Item>
                        :
                        null
                    }
                </Modal>

            </Card>
        );
    }
}

export default  connect(reducer)(KnowledgeCategory);