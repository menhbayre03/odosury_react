import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import config from "../../config";
import moment from "moment";
import * as actions from "../../actions/lesson_actions";
import arrayMove from 'array-move';


import {SortableContainer, SortableElement} from 'react-sortable-hoc';
const reducer = ({ main, lesson }) => ({ main, lesson });
import { Card, Button, List, Avatar, Table, Modal, Form, Input, Select, Popconfirm, Spin, Row, Col, TreeSelect, InputNumber, Steps, Upload, message } from 'antd';
import { EditOutlined, DeleteFilled, PlusOutlined, UserOutlined, EditFilled, DragOutlined, SearchOutlined, UploadOutlined, CloseCircleFilled, SolutionOutlined, LoadingOutlined, SmileOutlined, CheckCircleFilled, CaretRightFilled, CaretLeftFilled } from '@ant-design/icons'
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;
const { Step } = Steps;

class LessonLevels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            //upload
            loading: false,
        };
    }
    componentWillUnmount() {
        this.props.closeLessonModalLevel();
    }
    openModalLevel(type, idx, data = {}) {
        this.props.dispatch(actions.openLessonModalLevel({type:type, idx:idx, level:data}));
    }
    closeModal() {
        this.props.dispatch(actions.closeLessonModal());
    }
    onChangeHandlerLevel(e) {
        this.props.dispatch(actions.lessonChangeHandlerLevel({name:e.target.name, value: e.target.value}));
    }
    addLevel(){
        const {lesson:{level}} = this.props;
        if(!level.title || (level.title && level.title.trim() === '' )){
            return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
        }
        this.props.dispatch(actions.lessonAddLevel());
    }
    onSortEnd(e) {
        const {dispatch, lesson:{lesson}} = this.props;
        let aa = arrayMove((lesson.levels || []), e.oldIndex, e.newIndex);
        dispatch(actions.orderLevels(aa));
    };
    removeItem(item, index){
        const {dispatch, lesson:{lesson}} = this.props;
        let aa = (lesson.levels || []).filter(function (lvl, idx) {
            return idx !== index;
        });
        dispatch(actions.orderLevels(aa));
    };
    render() {
        let { main:{user}, lesson:{imageUploadLoading, lessonImage, videoUploadLoading, lessonVideo, status, openModal, lesson, lessons, submitLessonLoader, all, searchTeachersResult, searchTeacherLoader, categories, level, openModalLevel} } = this.props;
        let avatar = '/images/default-avatar.png';
        if (this.state.selectedMember && this.state.selectedMember.avatar && this.state.selectedMember.avatar !== '') {
            avatar = this.state.selectedMember.avatar.indexOf('http') > -1 ? this.state.selectedMember.avatar : `https://amjilt.com${ this.state.selectedMember.avatar}`;
        }
        const { current } = this.state;

        const SortableItem = SortableElement(({value, index}) => (
            <List.Item style={{cursor: 'move'}}>
                <List.Item.Meta
                    title={
                        <p style={{marginBottom: -4}}>
                            {/*<Icon type="drag" style={{marginRight: 10, fontSize: 18, position: 'relative', top: 3}}/>*/}
                            <span style={{marginRight: 10, fontSize: 18, position: 'relative', top: 3}}>
                                <DragOutlined />
                            </span>
                            {`${value.title}`}
                            <Button key={'delete-level'} size="small" style={{float: 'right'}} onClick={this.removeItem.bind(this, value, index)}>Хасах</Button>
                            {/*<button onClick={this.removeItem.bind(this, value, index)}>Хасах</button>*/}
                        </p>
                    }
                />
            </List.Item>
        ));
        const SortableList = SortableContainer(({items, loading}) => {
            return (
                <List
                    header={'levels'}
                    itemLayout="horizontal"
                    dataSource={lesson.levels && lesson.levels.length>0 ? lesson.levels : [] }
                    // dataSource={items}
                    // loading={loading}
                    renderItem={(item, index) => (
                        <SortableItem key={`item-${item.title}-key-${index}`} index={index} value={item} />
                    )}
                />
            );
        });
        return (
            <div className='lesson-levels'>
                <div className='levels'>
                    <div style={{textAlign: "right"}}>
                        <Button type="primary" key='newLevel' icon={<PlusOutlined />} onClick={this.openModalLevel.bind(this, 'new', null, {})} >
                            Level
                        </Button>
                    </div>
                    {
                        lesson.levels && lesson.levels.length>0?
                            lesson.levels.map((lvl, idx) =>
                                <div className='level'>
                                    {lvl.title}
                                    <Button type="primary" key='updateLevel' icon={<EditFilled />} onClick={this.openModalLevel.bind(this, 'update', idx, lvl)} >
                                        Засах
                                    </Button>
                                </div>
                            )
                            :
                            null
                    }
                    {/*sortable start*/}
                    {lesson.levels && lesson.levels.length>0?
                        <SortableList
                            // items={lesson.levels && lesson.levels.length>0? lesson.levels : []}
                            // loading={customTopStudentsLoading}
                            onSortEnd={this.onSortEnd.bind(this)}
                        />
                        :
                        null
                    }
                    {/*sortable end*/}
                </div>

                {openModalLevel?
                    <Modal
                        title="Level"
                        visible={openModalLevel}
                        onOk={this.addLevel.bind(this)}
                        onCancel={this.closeLessonModalLevel.bind(this)}
                        okText="Хадгалах"
                        cancelText="Болих"
                        maskClosable={false}
                    >
                        <Form.Item
                            label='Нэр'
                        >
                            <Input autoFocus={true} size="middle" maxLength={60} value={level.title? level.title : ''} name='title' onChange={this.onChangeHandlerLevel.bind(this)} />
                        </Form.Item>
                    </Modal>
                    :
                    null
                }
            </div>

        );
    }
}
export default  connect(reducer)(LessonLevels);