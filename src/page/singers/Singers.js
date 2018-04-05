import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import {connect} from 'react-redux';
import {gethotsingers,getsingers} from '../../redux/singerRudex';


@connect(
    state => state.singersRedux,
    { gethotsingers, getsingers}
)
export default class Singer extends Component {
    constructor(props){
        super(props);
        this.state={};
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        this.props.gethotsingers();
        this.props.getsingers();
    }
    handleClick(id){
       this.props.history.push(`/singer/${id}`)
    }
    render(){
        if (!this.props.singers.length) {
            return null
        }
        return (
                <div className="singerwrap">
                        <List
                            itemLayout="horizontal"
                            dataSource={this.props.hotsingers}
                            header={<h3>热门歌手</h3>}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.img1v1Url} />}
                                        title={<a href="javascript:;">{item.name}</a>}
                                        onClick = {()=>this.handleClick(item.id)}
                                    />
                                </List.Item>
                            )}
                        />   
                        <List
                            itemLayout="horizontal"
                            dataSource={this.props.singers}
                            style={{marginTop:'10px'}}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.img1v1Url} />}
                                        title={<a href="javascript:;">{item.name}</a>}
                                        onClick={() => this.handleClick(item.id)}
                                    />
                                </List.Item>
                            )}
                        />   
                </div>
        );
    }
}