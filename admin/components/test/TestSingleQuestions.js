import React from "react";
import { connect } from 'react-redux';
import config from '../../config';
import {getTest, createTest, deleteTest, createQuestion, deleteQuestion } from '../../actions/test_actions'
import {
    Card, Empty, Popover,
    Table, Row, Col,
    Button, Popconfirm, Collapse,
    Input, Drawer, Tag,
    Select, Form,
    Switch, InputNumber, Tooltip
} from 'antd';
import {
    PlusOutlined, EnterOutlined, EditOutlined, DeleteOutlined, CloseCircleOutlined, CheckOutlined, CloudUploadOutlined, CloudDownloadOutlined,
} from '@ant-design/icons';
import conf from "./include/conf";
const {Panel} = Collapse;

class TestSingleQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: (this.props || {}).questions,
            changeParentState: (this.props || {}).handler,
            activeKey: []
        };
    }
    render() {
        return (
            <Collapse
                className={'collapse-test-question'}
                ghost
                activeKey={this.state.activeKey}
                onChange={(e) => this.setState({activeKey: e})}
            >
                {
                    (this.props.questions || []).map(question =>
                        <Collapse.Panel
                            key={question._id}
                            style={{fontSize: 15}}
                            header={
                                <React.Fragment>
                                    {
                                        (this.state.activeKey || []).includes(question._id) ?
                                            <>
                                                <div className={`question-header`}>
                                                    {(question.selectOne_question || {}).text}
                                                </div>
                                                <hr style={{border: 'none', height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}} />
                                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <span className={'info'}>Түвшин: {conf.getDifficulty(question.difficulty)}</span>
                                                    <span className={'info'}>Төрөл: {conf.getType(question.type)}</span>
                                                    <span className={'info'}>Оноо: {question.point}</span>
                                                    {
                                                        conf.getStatus(question.status)
                                                    }
                                                </div>
                                                {
                                                    (question.timelines || []).map((timeline, ind) =>
                                                        <Tag key={`${question._id}-question-${timeline._id}-${ind}`}>
                                                            {timeline.title}
                                                        </Tag>
                                                    )
                                                }
                                            </>
                                            :
                                            <>
                                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <div style={{width: '100%'}}>
                                                        <div className={`question-header ellipsis`}>
                                                            {(question.selectOne_question || {}).text}
                                                        </div>
                                                        <hr style={{border: 'none', height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}} />
                                                    </div>
                                                    {
                                                        conf.getStatus(question.status)
                                                    }
                                                </div>
                                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <span className={'info'}>Түвшин: {conf.getDifficulty(question.difficulty)}</span>
                                                    <span className={'info'}>Төрөл: {conf.getType(question.type)}</span>
                                                    <span className={'info'}>Оноо: {question.point}</span>
                                                </div>
                                                {
                                                    (question.timelines || []).map((timeline, ind) =>
                                                        <Tag key={`${question._id}-question-${timeline._id}-${ind}`}>
                                                            {timeline.title}
                                                        </Tag>
                                                    )
                                                }
                                            </>
                                    }
                                </React.Fragment>
                            }
                            extra={
                                <React.Fragment>
                                    {
                                        question.status !== 'active' ?
                                            <Tooltip
                                                title={'Нийтлэх'}
                                            >
                                                <Button
                                                    icon={<CloudUploadOutlined />}
                                                    style={{border: 'none', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                                                    key={`${question._id}-publish`} size={'small'}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        this.state.changeParentState?.({
                                                            _id: question._id,
                                                        }, {loader: question._id, difficulty: question.difficulty, type: question.type}, 'publish')
                                                    }}
                                                />
                                            </Tooltip>
                                            :
                                            null
                                    }
                                    {
                                        question.status === 'active' ?
                                            <Tooltip
                                                title={'Идэвхгүй болгох'}
                                            >
                                                <Button
                                                    icon={<CloudDownloadOutlined />}
                                                    style={{border: 'none', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                                                    key={`${question._id}-unpublish`} size={'small'}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        this.state.changeParentState?.({
                                                            _id: question._id,
                                                        }, {loader: question._id, difficulty: question.difficulty, type: question.type}, 'unpublish')
                                                    }}
                                                />
                                            </Tooltip>
                                            :
                                            null
                                    }
                                    <Tooltip
                                        title={'Засах'}
                                    >
                                        <Button
                                            style={{border: 'none', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                                            key={`${question._id}-edit`} size={'small'}
                                            icon={<EditOutlined />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if(question.type === 'selectOne'){
                                                    let correct = '';
                                                    let answers = (question.selectOne_answer || []).map((answer, ind) => {
                                                        if(answer.isCorrect) correct = String.fromCharCode(ind+65);
                                                        return {
                                                            _id: (answer._id || []).toString(),
                                                            content: answer.text,
                                                        };
                                                    });
                                                    this.state.changeParentState?.({
                                                        visible: true,
                                                        question_id: question._id,
                                                        questionType: question.type,
                                                        questionDifficulty: question.difficulty,
                                                        questionTitle: (question.selectOne_question || {}).text,
                                                        questionPoint: question.point,
                                                        questionAnswers: answers,
                                                        questionCorrectAnswer: correct,
                                                        questionTemp: '',
                                                        timelines: question.timelines
                                                    }, false, 'edit');
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                    <Popconfirm
                                        title={'Энэ асуултыг устгах уу?'}
                                        okText={'Тийм'} cancelText={'Үгүй'}
                                        onConfirm={() => this.state.changeParentState?.({
                                            _id: question._id,
                                        }, {loader: question._id, difficulty: question.difficulty, type: question.type}, 'delete')}
                                    >
                                        <Button
                                            loading={this.props.deleteLoading === question._id}
                                            style={{border: 'none', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                                            danger key={`${question._id}-delete`} size={'small'}
                                            icon={<DeleteOutlined />}
                                        />
                                    </Popconfirm>
                                </React.Fragment>
                            }
                        >
                            {
                                question.type === 'selectOne' ?
                                    <ol type={"A"} style={{margin: 0}}>
                                        {(question.selectOne_answer || []).map(answers =>
                                            <li
                                                key={answers._id}
                                                style={answers.isCorrect ?
                                                    {backgroundColor: 'green', listStylePosition: 'inside', color: 'white', padding: 5}
                                                    :
                                                    { listStylePosition: 'inside', padding: 5 }}
                                            >
                                                {answers.text}
                                            </li>
                                        )}
                                    </ol>
                                    :
                                    null
                            }
                        </Collapse.Panel>
                    )
                }
            </Collapse>
        );
    }
}

export default (TestSingleQuestions);