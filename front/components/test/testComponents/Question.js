import React, { Component } from "react";
import { connect } from 'react-redux';
// import * as actions from '../../actions/testLaunch_actions';
const reducer = ({ main, testLaunch }) => ({ main, testLaunch });

class Question extends Component {
    constructor(props) {
        super(props);
        this.state= {
            
        }
    }
    render() {
        const {testLaunch:{openTest, loading}, question} = this.props;
        let questionLength= openTest.questions?.length-1;
        return(
            <React.Fragment>
                <div className="questionContainer" style={{
                    background: 'url("/images/questionBg.png")',
                    backgroundSize:'120% 475px'
                }}>
                    <div className="question">
                        <h4 style={{fontWeight: 600, fontSize: 21}}>{this.props.pageNum+1}. {question?.selectOne_question?.text}</h4>
                        <ul style={{marginTop: 15, marginLeft: 20}}>
                        {
                            question?.selectOne_answer.map((item, index) => (
                                <li key={index} onClick={()=> this.props.answerSelect(index, question._id, (question.selectOne_answer || [])[index]?._id )}>
                                    <div className="listItem">
                                        <div className="answerTick">
                                            
                                            {   
                                                (question.answer === (question.selectOne_answer || {})[index]._id)  ?
                                                <ion-icon name="checkmark-circle" style={{
                                                    fontSize: 32,
                                                    position: 'absolute',
                                                    color: '#62C757',
                                                    marginLeft: '-3px',
                                                    marginTop: '-3px'
                                                }}></ion-icon>
                                                : 
                                                null
                                            }
                                            
                                        </div>
                                        <div style={{
                                            paddingLeft: '45px'
                                        }}>{item?.text}</div>
                                    </div>
                                    </li>
                            ))
                        }
                        </ul>
                    </div>
                    <div className="buttons">
                        <button className="prevButton"
                            onClick={() => this.props.pageNum !== 0 ? this.props.changeNum(this.props.pageNum-1, question._id, question.answer) : null}>
                            <ion-icon style={{
                            fontSize: 23,
                            position: 'absolute',
                            left: 140,
                            top: 16 }} name="chevron-back-outline"></ion-icon> ӨМНӨХ АСУУЛТ</button>
                        <button className="nextButton"
                            onClick={() => this.props.pageNum !== questionLength ? this.props.changeNum(this.props.pageNum+1, question._id, question.answer) : null}> ДАРААГИЙН АСУУЛТ 
                            <ion-icon style={{
                                fontSize: 23,
                                position: 'absolute',
                                right: 140,
                                top: 16
                            }} name="chevron-forward-outline"></ion-icon></button>
                    </div>
                </div>
                
            </React.Fragment>
            
            
        );
    }
}
export default connect(reducer)(Question);