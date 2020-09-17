import React, { Component } from "react";
import { connect } from 'react-redux';
import config from "../../config";
import {} from "antd";
import {} from '@ant-design/icons';
import moment from "moment";
const reducer = ({ }) => ({ });
class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                Students
            </div>
        );
    }
}
export default  connect(reducer)(Students);