import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import {connect} from 'react-redux';
import {getrank} from '../../redux/rankRudex';

@connect(
    state => state.rankRudex,
    { getrank}
)
export default class Rank extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        this.props.getrank()
    }
    render() {
        if(this.props.list.length===0){
            return null
        }
        return (
            <div className="rankwrap">
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    header={<h3>音乐排行榜</h3>}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.playlist.coverImgUrl} />}
                                title={<a href="javascript:;">{item.playlist.name}</a>}
                            />
                        </List.Item>
                    )}
                />   
            </div>
        )
    }
}