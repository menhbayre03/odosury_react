import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import config from "../../config";
import moment from "moment";
import * as actions from "../../actions/lessonLevel_actions";
import arrayMove from 'array-move';
import { Link } from 'react-router-dom';


import {SortableContainer, SortableElement} from 'react-sortable-hoc';
const reducer = ({ main, lessonLevel }) => ({ main, lessonLevel });
import { Card, Button, List, Avatar, Table, Modal, Form, Popconfirm, Input, Select, Spin, Row, Col, TreeSelect, InputNumber, Steps, Upload, message } from 'antd';
import { EditOutlined, DeleteFilled, PlusOutlined, UserOutlined, EditFilled, DragOutlined, SearchOutlined, CheckOutlined, UploadOutlined, CloseCircleFilled, SolutionOutlined, LoadingOutlined, SmileOutlined, CheckCircleFilled, CaretRightFilled, CaretLeftFilled } from '@ant-design/icons'
import LessonEdit from "./LessonEdit";
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;
const { Step } = Steps;

// const SortableItem = SortableElement(({value, index, removeProgram}) => (
//     <List.Item style={{cursor: 'move'}}>
//         <List.Item.Meta
//             title={
//                 <p style={{marginBottom: -4}}>
//                     {/*<Icon type="drag" style={{marginRight: 10, fontSize: 18, position: 'relative', top: 3}}/>*/}
//                     <span style={{marginRight: 10, fontSize: 18, position: 'relative', top: 3}}>
//                                 <DragOutlined />
//                             </span>
//                     {`${value.title}`}
//                     {/*removeProgram.bind(this,{inx:needRemove.levelIndex, index:value})*/}
//                     <Button key={'delete-level'} size="small" style={{float: 'right'}} onClick={removeProgram.bind(this, value, index)}>Хасах</Button>
//                     {/*<button onClick={this.removeItem.bind(this, value, index)}>Хасах</button>*/}
//                 </p>
//             }
//         />
//     </List.Item>
// ));
// const SortableList = SortableContainer(({items, loading, removeProgram}) => {
//     return (
//         <List
//             header={'levels'}
//             itemLayout="horizontal"
//             // dataSource={lesson.levels && lesson.levels.length>0 ? lesson.levels : [] }
//             dataSource={items}
//             // loading={loading}
//             renderItem={(item, index) => (
//                 <SortableItem key={`item-${item.title}-key-${index}`} index={index} value={item} removeProgram={removeProgram} />
//             )}
//         />
//     );
// });

// const SortableItem = SortableElement(( {value,removeProgram,index,needRemove}) => {
//     return (
//         <div>
//             <span>{value.title}</span>
//             <button style={{margin: 0, padding: 0, outline: 'none', border: 'none', background: 'transparent'}}>
//                 <span style={{cursor: 'pointer', marginRight: 10, color: 'red'}} onClick={removeProgram.bind(this,value, index)}>
//                     <DeleteFilled />
//                 </span>
//                 {/*<ion-icon style={{cursor: 'pointer', marginRight: 10, color: 'red'}} name="trash" onClick={removeProgram.bind(this,{inx:needRemove.levelIndex, index:value})}/>*/}
//             </button>
//             <DragOutlined />
//         </div>
//     )
// });
//
// const SortableContainera = SortableContainer(({children}) => {
//     return <div>{children}</div>;
// });

class LessonLevels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            //upload
            loading: false,
        };
        this.onSortEnd = this.onSortEnd.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(actions.getLessonSingle({id:this.props.match.params.id}));
    }

    // componentWillUnmount() {
    //     this.props.closeLevelSingle();
    // }
    // openModalLevel(type, idx, data = {}) {
    //     this.props.dispatch(actions.openLessonModalLevel({type:type, idx:idx, level:data}));
    // }
    openModalLevel(type, idx, data = {}) {
        this.props.dispatch(actions.openLessonModalLevel({type:type, idx:idx, level:data}));
    }
    openModalLevelTimline(type, level_id, timeline) {
        this.props.dispatch(actions.openModalLevelTimline({type:type, level_id:level_id, timeline}));
    }
    closeModalLevelTimline(type, idx, data = {}) {
        this.props.dispatch(actions.closeModalLevelTimline());
    }
    closeLessonModalLevel() {
        this.props.dispatch(actions.closeLessonModalLevel());
    }
    onChangeHandlerLevel(e) {
        this.props.dispatch(actions.lessonChangeHandlerLevel({name:e.target.name, value: e.target.value}));
    }
    onChangeHandlerLevelTimeline(e) {
        this.props.dispatch(actions.onChangeHandlerLevelTimeline({name:e.target.name, value: e.target.value}));
    }
    addLevel(){
        const {lessonLevel:{level, levelType, lesson, levelIdx}} = this.props;
        if(!level.title || (level.title && level.title.trim() === '' )){
            return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
        }
        this.props.dispatch(actions.lessonAddLevel({_id: lesson._id, level_id:level._id, level: level, levelType: levelType, lesson: lesson, levelIdx:levelIdx}));
    }
    submitTimeline(){
        const {lessonLevel:{timeline, timelineType, lesson, levelIndex, level_id}} = this.props;
        if(!timeline.title || (timeline.title && timeline.title.trim() === '' )){
            return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
        }
        if(!timeline.description || (timeline.description && timeline.description.trim() === '' )){
            return config.get('emitter').emit('warning', ("Тайлбар оруулна уу!"));
        }
        if(!timeline.type || (timeline.type && timeline.type.trim() === '' )){
            return config.get('emitter').emit('warning', ("Төрөл оруулна уу!"));
        }
        if(!timeline.minutes || (timeline.minutes && timeline.minutes === 0 )){
            return config.get('emitter').emit('warning', ("Минут оруулна уу!"));
        }
        let cc = {
            ...timeline,
            lesson: lesson._id,
            timelineType: timelineType,
            level_id: level_id,
            levelIndex:levelIndex
        };
        this.props.dispatch(actions.submitTimeline(cc));
    }
    onSortEnd(e) {
        const {dispatch, lessonLevel:{lesson}} = this.props;
        let aa = arrayMove((lesson.levels || []), e.oldIndex, e.newIndex);
        dispatch(actions.orderLevels(aa));
    };
    removeItem(item, index){
        const {dispatch, lessonLevel:{lesson}} = this.props;
        // let aa = (lesson.levels || []).filter(function (lvl, idx) {
        //     return idx !== index;
        // });
        // dispatch(actions.orderLevels(aa));
    };
    onChangeHandlerLevelTimelineSelect(value){
        this.props.dispatch(actions.onChangeHandlerLevelTimeline({name:'type', value: value}));
    };
    onChangeHandle2(name, value) {
        this.props.dispatch(actions.onChangeHandlerLevelTimeline({name:name, value: value}));
    }
    complete() {
        const {dispatch, lessonLevel:{lesson}} = this.props;
    }
    deleteLevel(id) {
        const {dispatch, lessonLevel:{lesson}} = this.props;
        this.props.dispatch(actions.deleteLevel({_id:lesson._id, level_id: id}));
    }
    removeTimeline(level_id, timeline_id) {
        const {dispatch, lessonLevel:{lesson}} = this.props;
        this.props.dispatch(actions.removeTimeline({_id:lesson._id, level_id: level_id, timeline_id:timeline_id}));
    }
    render() {
        let { main:{user}, lessonLevel:{status, lesson, openModalLevel, level, openModalLevelTimline, timeline, timelineSubmitLoader} } = this.props;


        // const SortableItem = SortableElement(({value}) => (
        //     <List.Item style={{cursor: 'move'}}>
        //         <List.Item.Meta
        //             title={
        //                 <p style={{marginBottom: -4}}>
        //                     <span>{value.title}</span>
        //                     {/*<Icon type="drag" style={{marginRight: 10, fontSize: 18, position: 'relative', top: 3}}/>*/}
        //                     {/*{`${value.last_name} ${value.name}: ${value.registration_num}`}*/}
        //                     <Button icon="delete" size="small" style={{float: 'right'}} onClick={() => this.removeItem(value)}>Хасах</Button>
        //                 </p>
        //             }
        //         />
        //     </List.Item>
        // ));
        //
        // const SortableList = SortableContainer(({items, loading}) => {
        //     return (
        //         <List
        //             header={<h3>Levels: </h3>}
        //             itemLayout="horizontal"
        //             dataSource={items}
        //             // loading={loading}
        //             renderItem={(item, index) => (
        //                 <SortableItem key={`item-${item.name}`} index={index} value={item} />
        //             )}
        //         />
        //     );
        // });
        return (
            <Card
                title={lesson && lesson.title? lesson.title : 'LEVEL'}
                bordered={true}
                loading={status}
                extra={
                    <React.Fragment>
                        <Link to='/admin/lessons'>
                            <Button style={{marginRight: 10}} type="default" key='newLevel' icon={<CaretLeftFilled />} >
                                Буцах
                            </Button>
                        </Link>
                        <Button style={{marginRight: 10}} type="primary" key='newLevel' icon={<PlusOutlined />} onClick={this.openModalLevel.bind(this, 'new', null, {})} >
                            Түвшин
                        </Button>
                        {/*<Button loading={timelineSubmitLoader} type="primary" key='hadhad' icon={<CheckOutlined />} onClick={this.complete.bind(this)}>*/}
                        {/*    Хадгалах*/}
                        {/*</Button>*/}
                        {/*<Button type="default" key='forwardButton' icon={<PlusOutlined />} onClick={this.openModal.bind(this, {})} >*/}
                        {/*    Болих*/}
                        {/*</Button>*/}
                        {/*<Button type="primary" key='forwardButton' icon={<PlusOutlined />} onClick={this.openModal.bind(this, {})} >*/}
                        {/*    Болих*/}
                        {/*</Button>*/}
                    </React.Fragment>
                }
            >
                <div className='lesson-levels'>

                    <div className='levels'>
                        {/*<div style={{textAlign: "right"}}>*/}
                        {/*    <Button type="primary" key='newLevel' icon={<PlusOutlined />} onClick={this.openModalLevel.bind(this, 'new', null, {})} >*/}
                        {/*        Level*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                        {/*{*/}
                        {/*    lesson.levels && lesson.levels.length>0?*/}
                        {/*        lesson.levels.map((lvl, idx) =>*/}
                        {/*            <div className='level'>*/}
                        {/*                {lvl.title}*/}
                        {/*                <Button type="primary" key='updateLevel' icon={<EditFilled />} onClick={this.openModalLevel.bind(this, 'update', idx, lvl)} >*/}
                        {/*                    Засах*/}
                        {/*                </Button>*/}
                        {/*            </div>*/}
                        {/*        )*/}
                        {/*        :*/}
                        {/*        null*/}
                        {/*}*/}
                        {/*sortable start*/}
                        {lesson.levels && lesson.levels.length>0?
                            lesson.levels.map((run, idx) =>
                                <div key={run._id+'lvls'}>
                                    <Card
                                        style={{marginBottom: 20}}
                                        size='small'
                                        title={run.title ? run.title : ''}
                                        extra={
                                            <React.Fragment>
                                                <Button loading={run.loading} style={{marginRight: 10}} size='small' type="default" key='updateLevel' icon={<EditFilled />} onClick={this.openModalLevel.bind(this, 'update', idx, run)} >
                                                    Засах
                                                </Button>
                                                <Popconfirm
                                                    title={`Та устгах гэж байна!`}
                                                    onConfirm={this.deleteLevel.bind(this, run._id)}
                                                    okText="Усгах"
                                                    placement="left"
                                                    cancelText="Болих"
                                                >
                                                    <Button loading={run.loading} type={"primary"} style={{marginRight: 10}} key='deleteLevel' danger size={"small"}>
                                                        <DeleteFilled/> Устгах
                                                    </Button>
                                                </Popconfirm>
                                                <Button loading={run.loading} size='small' type="primary" key='newTimeline' icon={<PlusOutlined />} onClick={this.openModalLevelTimline.bind(this, 'new', run._id, {})} >
                                                    Хөтөлбөр
                                                </Button>
                                            </React.Fragment>
                                        }
                                    >
                                        <table border={'1'} >
                                            <tr>
                                                <td>№</td>
                                                <td>Нэр</td>
                                                <td>Минут</td>
                                                <td>Үйлдэл</td>
                                            </tr>
                                            {run.programs && run.programs.length>0?
                                                run.programs.map((prog, inn) =>
                                                    <tr>
                                                        <td>{inn+1}</td>
                                                        <td>{prog.timeline.title}</td>
                                                        <td>{prog.timeline.minutes}</td>
                                                        <td>
                                                            <Button loading={prog.timeline.loading} style={{marginRight: 10}} size='small' type="default" key='updateTimeline' icon={<EditFilled />}
                                                                    onClick={this.openModalLevelTimline.bind(this, 'update', run._id, prog.timeline)}
                                                            >
                                                                Засах
                                                            </Button>
                                                            <Popconfirm
                                                                title={`Та устгах гэж байна!`}
                                                                onConfirm={this.removeTimeline.bind(this, run._id, prog.timeline._id)}
                                                                okText="Усгах"
                                                                placement="left"
                                                                cancelText="Болих"
                                                            >
                                                                <Button loading={prog.timeline.loading} type={"primary"} style={{marginRight: 10}} key='deleteLevel' danger size={"small"} >
                                                                    <DeleteFilled/> Устгах
                                                                </Button>
                                                            </Popconfirm>
                                                        </td>
                                                    </tr>
                                                )
                                                :
                                                <tr>
                                                    <td colSpan={4}>Хоосон түвшин</td>
                                                </tr>
                                            }
                                        </table>
                                    </Card>
                                </div>
                            )
                            :
                            null
                        }
                        {/*sortable end*/}
                        {/*<SortableContainera onSortEnd={this.onSortEnd.bind(this)}>*/}
                        {/*    {lesson.levels && lesson.levels.length>0?*/}
                        {/*        lesson.levels.map((run, index) =>*/}
                        {/*            <SortableItem*/}
                        {/*                key={run._id}*/}
                        {/*                value={run}*/}
                        {/*                index={index}*/}
                        {/*                removeProgram={this.removeProgram}*/}
                        {/*                needRemove={{levelIndex:0, program:index}}*/}
                        {/*            />*/}
                        {/*        )*/}
                        {/*        :*/}
                        {/*        null*/}
                        {/*    }*/}
                        {/*</SortableContainera>*/}


                        {/*<SortableList*/}
                        {/*    items={lesson.levels? lesson.levels : []}*/}
                        {/*    // loading={customTopStudentsLoading}*/}
                        {/*    onSortEnd={this.onSortEnd}*/}
                        {/*/>*/}
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
                    {openModalLevelTimline?
                        <Modal
                            title="Хөтөлбөр"
                            visible={openModalLevelTimline}
                            confirmLoading={timelineSubmitLoader}
                            onOk={this.submitTimeline.bind(this)}
                            onCancel={this.closeModalLevelTimline.bind(this)}
                            okText="Хадгалах"
                            cancelText="Болих"
                            maskClosable={false}
                        >
                            <Form>
                                <Form.Item
                                    label='Нэр'
                                    labelCol={{span: 4}}
                                    fieldKey='name'
                                >
                                    <Input autoFocus={true} size="middle" maxLength={60} value={timeline.title? timeline.title : ''} name='title'
                                           onChange={this.onChangeHandlerLevelTimeline.bind(this)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Тайлбар'
                                    labelCol={{span: 4}}
                                    fieldKey='desc'
                                >
                                    <TextArea size="middle" rows={4}
                                              value={timeline.description ? timeline.description : ''}
                                              name='description'
                                              onChange={this.onChangeHandlerLevelTimeline.bind(this)}/>
                                    {/*<Input autoFocus={true} size="middle" maxLength={60} value={timeline.description? timeline.description : ''} name='description'*/}
                                    {/*       onChange={this.onChangeHandlerLevelTimeline.bind(this)}*/}
                                    {/*/>*/}
                                </Form.Item>
                                <Form.Item
                                    label='Төрөл'
                                    name='type'
                                    fieldKey='type'
                                    labelCol={{span: 4}}
                                >
                                    <span style={{display: "none"}}>{timeline.type? timeline.type : ''}</span>
                                    <Select
                                        value={timeline.type ? timeline.type : ''}
                                        onChange={this.onChangeHandlerLevelTimelineSelect.bind(this)}
                                    >
                                        {/*<Option value="">Төрөл сонгоно уу</Option>*/}
                                        <Option value="content">Контент</Option>
                                        <Option value="video">Бичлэг</Option>
                                        <Option value="audio">Аудио</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    fieldKey='min'
                                    label='Минут'
                                    labelCol={{span: 4}}
                                >
                                    <InputNumber
                                        size="middle"
                                        style={{width: '100%'}}
                                        name='minutes'
                                        min={0}
                                        max={600}
                                        maxLength={9}
                                        value={timeline.minutes ? timeline.minutes.toString().replace(/\$\s?|(,*)/g, '') : '0'.replace(/\$\s?|(,*)/g, '')}
                                        // formatter={value => `${value}мин`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        formatter={value => `${value} минут`}
                                        onChange={this.onChangeHandle2.bind(this, 'minutes')}
                                    />
                                </Form.Item>
                            </Form>
                        </Modal>
                        :
                        null
                    }
                </div>
            </Card>


        );
    }
}
export default  connect(reducer)(LessonLevels);