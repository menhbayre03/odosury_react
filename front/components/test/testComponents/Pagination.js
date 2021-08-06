import React, { Component } from "react";
import { connect } from 'react-redux';
import testLaunch from "../../../reducers/testLaunch";
// import * as actions from '../../actions/testLaunch_actions';
const reducer = ({ main, testLaunch }) => ({ main, testLaunch });

class Pagination extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {testLaunch:{openTest, loading}, question} = this.props;
        return(
            <React.Fragment>
                <div className="pagination">
                    <ul style={{width: '75%'}}>
                        {
                            (openTest.questions || []).map((item, index) => (
                                <li className="paginationItem" key={index} value={index} onClick={()=> this.props.changeNum(index, question._id, question.answer)}>
                                    <a style={this.props.pageNum === index ? {
                                    backgroundColor: '#d12e9d',
                                    color: '#fff',
                                    transition: '0.5s'} : {}}>
                                    
                                        {index+1}
                                    </a>
                                </li>
                            ))
                        }
                        
                    </ul>
                    <div style={{width: '25%'}}>
                        <button className="submitTest"> ДУУСГАХ</button>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}
export default connect(reducer)(Pagination);