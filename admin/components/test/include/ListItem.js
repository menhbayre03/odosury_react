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
            parent: this.props.parent,
            child: this.props.child,
            item: this.props.item,
            type: this.props.type,
            property: this.props.property,
            editing: '',
            editingContent: '',
            listItemHandler: this.props.listItemHandler
        };
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (!conf.objectsEqual(prevProps.item, this.props.item)) {
            return this.props.item;
        }
        return null;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {
            this.setState({
                item: snapshot
            })
        }
    }
    render() {
        return (
            <li
                key={`${this.state.parent}-${this.state.child}-child-${(this.state.item || {})._id}`}
                onDoubleClick={() => this.setState({editing: (this.state.item || {})._id, editingContent: (this.state.item || [])[this.state.property]})}
            >
                {
                    this.state.editing !== (this.state.item || {})._id ?
                        <Popover
                            key={`${this.state.parent}-${this.state.child}-popover-${(this.state.item || {})._id}`}
                            title={'Нэр'}
                            content={(this.state.item || [])[this.state.property]}
                        >
                            <div key={`${this.state.parent}-${this.state.child}-div-${(this.state.item || {})._id}`}
                                 style={{display: 'inline-flex', flexDirection: 'row', width: '98%'}}
                            >
                                <div
                                    style={{width: '90%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-all'}}
                                    key={`${this.state.parent}-${this.state.child}-content-${(this.state.item || {})._id}`}
                                >
                                    {this.state.item[this.state.property]}
                                </div>
                                <div style={{width: '10%'}} key={`${this.state.parent}-${this.state.child}-actions-${(this.state.item || {})._id}`}>
                                    <Button
                                        icon={<EditOutlined />}
                                        key={`${this.state.parent}-${this.state.child}-edit-${(this.state.item || {})._id}`}
                                        onClick={() => this.setState({editing: (this.state.item || {})._id, editingContent: (this.state.item || [])[this.state.property]})}
                                        style={{color: '#4e53a0', border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                                    />
                                    <Button
                                        key={`${this.state.parent}-${this.state.child}-delete-${(this.state.item || {})._id}`} icon={<DeleteOutlined />}
                                        danger style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
                                        // onClick={() => this.changeArray(this.state.parent, this.state.child, (this.state.item || {})._id, this.state.property, 'delete')}
                                        onClick={() => this.state.listItemHandler('delete', this.state.item?._id)}
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
                                    let _id = this.state.editing;
                                    let temp = {[this.state.property]: this.state.editingContent};
                                    this.setState({editing: '', editingContent: ''} , () => {
                                        this.state.handler?.('edit', _id, temp);
                                    })
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