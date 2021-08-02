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
import conf from "./conf";
const {Panel} = Collapse;

class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: '',
            editingContent: '',
        };
    }
    
    render() {
        return (
            <li
                key={`${(this.props || {}).parent}-${(this.props || {}).child}-child-${((this.props || {}).item || {})._id}`}
                onDoubleClick={() => this.setState({editing: ((this.props || {}).item || {})._id, editingContent: ((this.props || {}).item || [])[(this.props || {}).property]})}
            >
                {
                    this.state.editing !== ((this.props || {}).item || {})._id ?
                        <Popover
                            key={`${(this.props || {}).parent}-${(this.props || {}).child}-popover-${((this.props || {}).item || {})._id}`}
                            title={'Нэр'}
                            content={((this.props || {}).item || [])[(this.props || {}).property]}
                        >
                            <div key={`${(this.props || {}).parent}-${(this.props || {}).child}-div-${((this.props || {}).item || {})._id}`}
                                 style={{display: 'inline-flex', flexDirection: 'row', width: '95%'}}
                            >
                                <div
                                    style={{width: '90%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-all'}}
                                    key={`${(this.props || {}).parent}-${(this.props || {}).child}-content-${((this.props || {}).item || {})._id}`}
                                >
                                    {(this.props || {}).item[(this.props || {}).property]}
                                </div>
                                <div style={{width: '10%'}} key={`${(this.props || {}).parent}-${(this.props || {}).child}-actions-${((this.props || {}).item || {})._id}`}>
                                    <Button
                                        icon={<EditOutlined />}
                                        key={`${(this.props || {}).parent}-${(this.props || {}).child}-edit-${((this.props || {}).item || {})._id}`}
                                        onClick={() => this.setState({editing: ((this.props || {}).item || {})._id, editingContent: ((this.props || {}).item || [])[(this.props || {}).property]})}
                                        style={{color: '#4e53a0', border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                                    />
                                    <Button
                                        key={`${(this.props || {}).parent}-${(this.props || {}).child}-delete-${((this.props || {}).item || {})._id}`} icon={<DeleteOutlined />}
                                        danger style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                                        onClick={() => this.props.handler?.('selectOne', 'question', 'Answers', 'delete', ((this.props || {}).item || {})._id, '')}
                                    />
                                </div>
                            </div>
                        </Popover>
                        :
                        <Input.Group>
                            <Input.TextArea value={this.state.editingContent} onChange={(e) => this.setState({editingContent: e.target.value})} />
                            <Button
                                style={{color: '#4e53a0', border: 'none', boxShadow: 'none', width: 50, backgroundColor: 'transparent'}}
                                icon={<CheckOutlined/>}
                                onClick={() => {
                                    if(this.state.editingContent !== ''){
                                        let _id = this.state.editing;
                                        let temp = {[(this.props || {}).property]: this.state.editingContent};
                                        this.setState({editing: '', editingContent: ''} , () => {
                                            this.props.handler?.('selectOne', 'question', 'Answers', 'edit', _id, temp);
                                        })
                                    }
                                }}
                            />
                            <Button
                                icon={<CloseCircleOutlined />}
                                onClick={() => this.setState({editing: '', editingContent: ''})}
                                danger style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                            />
                        </Input.Group>
                }
            </li>
        );
    }
}

export default (ListItem);