import React from "react";
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

class selectOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <React.Fragment>
                <div style={{marginBottom: 10}} key={`div-question-type`}>
                    <span>Асуулт: </span>
                    <Input.TextArea
                        value={this.state.questionTitle}
                        onChange={(e) => this.setState({questionTitle: e.target.value})}
                    />
                </div>
                <div style={{marginBottom: 10}} key={`div-question-answers`}>
                    <span>Хариултууд:</span>
                    <div style={{marginLeft: 30}}  key={`div-question-type-div`}>
                        {
                            (this.state.questionAnswers || []).length > 0 ?
                                <ol type={'A'}>
                                    {
                                        (this.state.questionAnswers || []).map((ans, ind) =>
                                            <div
                                                style={
                                                    ind === ((this.state.questionCorrectAnswer || 'x').charCodeAt(0)-65) ?
                                                        {backgroundColor: 'green', padding: 5, color: '#fff', fontSize: 16, listStylePosition: 'inside'}
                                                        :
                                                        {padding: 5, fontSize: 16}
                                                }
                                                key={ans.key}
                                            >
                                                {this.getListItem('question', 'Answers', ans, 'answer', 'content')}
                                            </div>)
                                    }
                                </ol>
                                :
                                <div style={{
                                    fontSize: 20, fontWeight: 700, color: '#dedede', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100
                                }}>
                                    Хоосон байна
                                </div>
                        }
                    </div>
                </div>
                <div style={{marginBottom: 10}}>
                    <Row>
                        <Col span={3} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 600}}>
                            {String.fromCharCode((this.state.questionAnswers || []).length+65)}
                        </Col>
                        <Col span={18}>
                            <Input.TextArea
                                value={this.state.questionTemp}
                                onChange={(e) => this.setState({questionTemp: e.target.value})}
                                onPressEnter={(e) =>{
                                    e.preventDefault();
                                    this.state.questionTemp !== '' ?
                                        this.setState({
                                            questionAnswers: [...(this.state.questionAnswers || []), {
                                                _id: this.getKey('selectOne'),
                                                content: this.state.questionTemp,
                                            }],
                                            questionTemp: ''
                                        })
                                        :
                                        null
                                }}
                            />
                        </Col>
                        <Col span={3} style={{display: 'flex', justifyContent: 'center'}}>
                            <Button
                                onClick={() =>
                                    this.state.questionTemp !== '' ?
                                        this.setState({
                                            questionAnswers: [...(this.state.questionAnswers || []), {
                                                _id: this.getKey('selectOne'),
                                                content: this.state.questionTemp,
                                            }],
                                            questionTemp: ''
                                        })
                                        :
                                        null
                                }
                                icon={<EnterOutlined />} style={{color: '#4e53a0', backgroundColor: 'white', border: 'none', boxShadow: 'none'}}
                            />
                        </Col>
                    </Row>
                </div>
                <span>Зөв хариулт:</span>
                <Select
                    style={{width: 200, marginLeft: 10}}
                    value={this.state.questionCorrectAnswer}
                    onSelect={(e) => this.setState({questionCorrectAnswer: e})}
                    notFoundContent={<Empty description={<span style={{color: '#495057', userSelect: 'none'}}>Хариулт байхгүй байна.</span>} />}
                >
                    {
                        (this.state.questionAnswers || []).map((ans, ind) =>
                            <Select.Option value={String.fromCharCode(ind+65)} key={`${ind}-answer-correct`}>
                                {String.fromCharCode(ind+65)}
                            </Select.Option>
                        )
                    }
                </Select>
            </React.Fragment>
        );
    }
}

export default (selectOne);