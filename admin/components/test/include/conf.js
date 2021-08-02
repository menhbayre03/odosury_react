import {Button, Input, Popover} from "antd";
import React from "react";

let conf = {};

conf.getType = function(e){
    switch (e) {
        case 'selectOne': return 'Сонгох асуулт';
        case 'selectMulti': return 'Олон сонголттой асуулт';
        case 'connectOne': return 'Холбох асуулт';
        case 'connectMulti': return 'Олон холболттой асуулт';
        case 'inputOne': return 'Бөглөх асуулт';
        case 'inputMulti': return 'Олон бөглөх хэсэгтэй асуулт';
        default: return '';
    }
}
conf.getDifficulty = function(e){
    switch (e) {
        case 'easy': return 'Хялбар';
        case 'medium': return 'Энгийн';
        case 'hard': return 'Хүндэвтэр';
        case 'pro': return 'Хүнд';
        default: return '';
    }
}
conf.getKey = function(e){
    return `${e}-${Math.random()}`;
}
conf.objectsEqual = (prev, updated) =>
    typeof prev === 'object' && Object.keys(prev).length > 0
        ? Object.keys(prev)?.length === Object.keys(updated)?.length
        && Object.keys(prev)?.every(p => conf.objectsEqual((prev || [])[p], (updated || [])[p]))
        : prev === updated;

// changeArray(parent, child, key, property, action){
//     let string = `${parent}${child}`;
//     let initial = (this.state || [])[string];
//     if(action === 'edit'){
//         initial = (initial || []).map(ini => {
//             if((ini._id || 'as').toString() !== (key || '').toString()){
//                 return ini;
//             }
//             return {
//                 ...ini,
//                 [property]: this.state.editingContent
//             }
//         });
//         this.setState({[string]: initial, editingContent: '', editing: ''});
//     }else if(action === 'delete'){
//         initial = (initial || []).filter(ini => (ini._id || 'as').toString() !== (key || '').toString());
//         this.setState({[string]: initial});
//     }
// }
// getListItem(parent, child, item, type, property){
//     return (
//         <li
//             key={`${parent}-${child}-child-${item._id}`}
//             onDoubleClick={() => type !== 'difficulty' ? this.setState({editing: item._id, editingContent: (item || [])[property]}) : null}
//         >
//             {
//                 this.state.editing !== item._id ?
//                     <Popover
//                         key={`${parent}-${child}-popover-${item._id}`}
//                         title={'Нэр'}
//                         content={item[property]}
//                     >
//                         <div key={`${parent}-${child}-div-${item._id}`} style={{display: 'inline-flex', flexDirection: 'row', width: '98%'}}>
//                             <div
//                                 style={{width: '90%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-all'}}
//                                 key={`${parent}-${child}-content-${item._id}`}
//                             >
//                                 {
//                                     type === 'difficulty' ?
//                                         <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', height: '100%', alignItems: 'center'}}>
//                                             <span>{conf.getType(item[property])}</span>
//                                             <span>{item.quantity}</span>
//                                         </div>
//                                         :
//                                         item[property]
//                                 }
//
//                             </div>
//                             <div style={{width: '10%'}} key={`${parent}-${child}-actions-${item._id}`}>
//                                 {
//                                     type !== 'difficulty' ?
//                                         <Button
//                                             icon={<EditOutlined />}
//                                             key={`${parent}-${child}-edit-${item._id}`}
//                                             onClick={() => this.setState({editing: item._id, editingContent: (item || [])[property]})}
//                                             style={{color: '#4e53a0', border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
//                                         />
//                                         :
//                                         null
//                                 }
//                                 <Button
//                                     key={`${parent}-${child}-delete-${item._id}`} icon={<DeleteOutlined />}
//                                     danger style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
//                                     onClick={() => this.changeArray(parent, child, item._id, property, 'delete')}
//                                 />
//                             </div>
//                         </div>
//                     </Popover>
//                     :
//                     <Input.Group>
//                         <Input.TextArea value={this.state.editingContent} onChange={(e) => this.setState({editingContent: e.target.value})} />
//                         <Button
//                             style={{color: '#4e53a0', border: 'none', boxShadow: 'none', width: 50, backgroundColor: 'transparent'}}
//                             icon={<CheckOutlined/>}
//                             onClick={() => this.changeArray(parent, child, item._id, property, 'edit')}
//                         />
//                         <Button
//                             icon={<CloseCircleOutlined />}
//                             onClick={() => this.setState({editing: '', editingContent: '', width: 50, backgroundColor: 'transparent'})}
//                             danger style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}
//                         />
//                     </Input.Group>
//             }
//         </li>
//     )
// }

// getSnapshotBeforeUpdate(prevProps, prevState) {
//     if (!conf.objectsEqual(prevProps.item, this.props.item)) {
//         return this.props.item;
//     }
//     return null;
// }
// componentDidUpdate(prevProps, prevState, snapshot) {
//     if (snapshot !== null) {
//         this.setState({
//             item: snapshot
//         })
//     }
// }

export default conf