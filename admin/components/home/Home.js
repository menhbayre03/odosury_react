import React from "react";
import { connect } from 'react-redux';


const reducer = ({ main }) => ({ main });
import { Card } from 'antd';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <Card
                title="Нүүр"
                bordered={true}
                loading={false}
            >

            </Card>
        );
    }
}

export default  connect(reducer)(Home);