import React from "react";
import { connect } from 'react-redux';
import config from '../../config';
import {getTest, createTest, deleteTest, createQuestion, deleteQuestion } from '../../actions/test_actions'
import {
    Card, Empty, Popover,
    Table, Row, Col,
    Button, Popconfirm, Collapse,
    Input, Drawer,
    Select, Form,
    Switch, InputNumber, Tooltip
} from 'antd';
import {
    PlusOutlined, EnterOutlined, EditOutlined, DeleteOutlined, CloseCircleOutlined, CheckOutlined
} from '@ant-design/icons';
const {Panel} = Collapse;

class TestSingleQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            _id: this.props._id,
            selectOne_question: this.props.selectOne_question,
            selectOne_answer: this.props.selectOne_answer,
            difficulty: this.props.difficulty,
            point: this.props.points,
        };
    }
    render() {
        return (
            <Collapse.Panel
                key={this.state._id}
                // style={{marginTop: 20, fontSize: 16}}
                header={
                    <Tooltip
                        placement={'top'}
                        title={(this.state.selectOne_question || {}).text}
                    >
                        {(this.state.selectOne_question || {}).text}
                    </Tooltip>
                }
                extra={
                    <React.Fragment>
                        <Button
                            style={{border: 'none', outline: 'none', boxShadow: 'none'}}
                            key={`${this.state._id}-edit`}
                            icon={<EditOutlined />}
                            onClick={() => {
                                if(this.state.type === 'selectOne'){
                                    let correct = '';
                                    let answers = (this.state.selectOne_answer || []).map((answer, ind) => {
                                        if(answer.isCorrect) correct = String.fromCharCode(ind+65);
                                        return {
                                            _id: (answer._id || []).toString(),
                                            content: answer.text,
                                        };
                                    });
                                    this.setState({
                                        visible: true,
                                        question_id: this.state._id,
                                        questionType: this.state.type,
                                        questionDifficulty: this.state.difficulty,
                                        questionTitle: (this.state.selectOne_question || {}).text,
                                        questionPoint: this.state.point,
                                        questionAnswers: answers,
                                        questionCorrectAnswer: correct,
                                        questionTemp: '',
                                    })
                                }
                            }}
                        />
                        <Popconfirm
                            title={'Энэ асуултыг устгах уу?'}
                            okText={'Тийм'} cancelText={'Үгүй'}
                        >
                            <Button
                                style={{border: 'none', outline: 'none', boxShadow: 'none'}}
                                anger key={`${this.state._id}-delete`}
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </React.Fragment>
                }
            >
                {
                    this.state.type === 'selectOne' ?
                        <ol type={"A"} style={{margin: 0}}>
                            {(this.state.selectOne_answer || []).map(answers =>
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
        );
    }
}

export default (TestSingleQuestion);