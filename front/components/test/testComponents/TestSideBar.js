import React, { Component } from "react";
import { connect } from 'react-redux';
// import * as actions from '../../actions/testLaunch_actions';
const reducer = ({ main, testLaunch }) => ({ main, testLaunch });

class TestSideBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {testLaunch:{openTest, loading}, question} = this.props;
        return(
            <React.Fragment>
                <div className="sideBarContainer">
                    <h5>
                        Асуултууд
                    </h5>
                    <ul>
                        {
                            (openTest.questions || []).map((item, index) => (
                                <li key={index} value={index} onClick={()=> this.props.changeNum(index, question._id, question.answer)}>
                                    <div className="sidebarItem" style={
                                        this.props.pageNum === index ? {
                                            marginLeft: 15,
                                            backgroundColor: '#b3d7ff'
                                        }
                                        :
                                        {}
                                    }>
                                        <div className="listItem">
                                            <div className="answerTick">
                                                {
                                                    (openTest.questions || {})[index].answer ? 
                                                    <ion-icon name="checkmark-circle-outline" style={{
                                                        fontSize: 32,
                                                        position: 'absolute',
                                                        color: '#62C757',
                                                        marginLeft: '-3px',
                                                        marginTop: '-3px'
                                                    }}></ion-icon>
                                                    : null
                                                }
                                                
                                            </div> 
                                            <div className="sidebarText">
                                            {index+1}. {item.selectOne_question?.text}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}
export default connect(reducer)(TestSideBar);