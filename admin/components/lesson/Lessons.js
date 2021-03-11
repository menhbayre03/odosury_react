import React, {Component} from "react";
import { connect } from 'react-redux';
import config from "../../config";
import moment from "moment";
import * as actions from "../../actions/lesson_actions";
import LessonEdit from "./LessonEdit";
import { Link } from 'react-router-dom';

const reducer = ({ main, lesson }) => ({ main, lesson });
import { Card, Button, Table, Popconfirm } from 'antd';
import { DeleteFilled, PlusOutlined, UnorderedListOutlined, EditFilled, CloseOutlined } from '@ant-design/icons'

class Lessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize:50,
        };
    }
    componentDidMount() {
        this.props.dispatch(actions.getLesson({pageNum: this.state.pageNum, pageSize: this.state.pageSize}));

    }
    openModal(data) {
        const { lesson:{categories, teacherCount} } = this.props;
        if(!categories || categories.length < 1){
            return config.get('emitter').emit('warning', ("Эхлээд ангилал үүсгэнэ үү!"));
        }
        if(teacherCount < 1){
            return config.get('emitter').emit('warning', ("Эхлээд багш үүсгэнэ үү!"));
        }
        // this.setState({ search_user: '', selectedMember: data.teacher, foodRequirementsArray: data.requirements, requirement: '', learn_check_listArray: data.learn_check_list, learn_check_list: '' });
        this.props.dispatch(actions.openLessonModal(data));
    }
    closeModal() {
        this.props.dispatch(actions.closeLessonModal());
    }
    tableOnChange(data){
        this.setState({pageNum : data.current - 1});
        let cc = {
            pageNum:data.current - 1,
            pageSize:this.state.pageSize,
            // search: this.state.search
        };
        this.props.dispatch(actions.getLesson(cc));
    }
    delete(id){
        this.props.dispatch(actions.deleteLesson({_id:id, pageSize: this.state.pageSize, pageNum: this.state.pageNum}));
    }
    changeState(e, value){
        if (typeof e === 'string' || e instanceof String) {
            this.setState({ [e]: value});
        } else {
            this.setState({ [e.target.name]: e.target.value});
        }
    }
    render() {
        let {  lesson:{status, openModal, lesson, lessons, all, openLevelSingle} } = this.props;
        let pagination = {
            total : all,
            current: this.state.pageNum + 1,
            pageSize : this.state.pageSize,
            position: 'bottom',
            showSizeChanger: false,
            key: 'pagin'
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
                key: 'name',
                title: 'Нэр',
                render: (text, record) => (
                    record.title ? record.title : '-'
                ),
            },
            {
                key: 'eish',
                title: 'EISH',
                render: (text, record) => (
                    record.eish ? 'ЕЭШ' : ''
                ),
            },
            {
                key: 'created',
                title: 'Огноо',
                render: (text, record) => (
                    record.created ? moment(record.created).format('YYYY-MM-DD') : '-'
                ),
            },
            {
                key: 'action',
                title: 'Үйлдэл',
                render: (text, record) => (
                    <div style={{width: 258}} key='action-div'>
                        <Link to={`/admin/lessons/levels/${record._id}`}>
                            <Button size={"small"} style={{marginRight: 10}} key={record._id+'levels'} loading={!!record.loading}
                                    // onClick={this.openLevelSingle.bind(this, record)}
                            >
                                <UnorderedListOutlined /> Levels
                            </Button>
                        </Link>
                        <Button size={"small"} style={{marginRight: 10}} key={record._id+'edit'} loading={!!record.loading}
                                onClick = {this.openModal.bind(this, record )}
                        >
                            <EditFilled /> Засах
                        </Button>
                        <Popconfirm
                            title={`Та устгах гэж байна!`}
                            onConfirm={this.delete.bind(this, record._id)}
                            okText="Усгах"
                            placement="left"
                            cancelText="Болих"
                        >
                            <Button type={"primary"} key={record._id} danger size={"small"} loading={!!record.loading}>
                                <DeleteFilled/> Устгах
                            </Button>
                        </Popconfirm>
                    </div>
                ),
                width: 258
            },
        ];
        return (
            <Card
                title={`${openLevelSingle? lesson.title : 'Хичээл'}`}
                bordered={true}
                loading={status}
                extra={
                    openModal?
                        <Button type="default" key='backButton' icon={<CloseOutlined />} onClick={this.closeModal.bind(this)} >
                            Болих
                        </Button>
                        :
                            <Button type="primary" key='forwardButton' icon={<PlusOutlined />} onClick={this.openModal.bind(this, {})} >
                                Хичээл
                            </Button>
                }
            >
                {openModal?
                    <LessonEdit />
                    :
                        <React.Fragment>
                            <Table size="small" dataSource={lessons} columns={columns} onChange={this.tableOnChange.bind(this)} pagination={pagination} />
                        </React.Fragment>
                }
            </Card>
        );
    }
}

export default  connect(reducer)(Lessons);