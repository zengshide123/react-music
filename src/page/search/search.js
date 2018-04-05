import React, { Component } from 'react';
import { Input, List } from 'antd';
import  {getsearchlist} from '../../redux/searchRudex';
import {connect} from 'react-redux';
import {getdetaillist,changeindex,getsongsrc} from '../../redux/playRudex';
const SearchInput = Input.Search;


@connect(
    state => ({ ...state.searchRudex, ...state.playRudex}),
    { getsearchlist, getdetaillist, changeindex, getsongsrc}
)
export default class Search extends Component {
    constructor(props){
        super(props);
        this.state={};
        this.handleClick = this.handleClick.bind(this);
        this.handleplay = this.handleplay.bind(this);
    }
    handleClick(val){
        this.props.getsearchlist(val);
    }
    handleplay(val){
        this.props.history.push(`/play/${val.id}`)
        this.props.getdetaillist({
            listbg: [val.artists[0].img1v1Url],
            listsongname:[ val.name],
            listauthorname: [val.artists[0].name],
            listid:[val.id]
        })
        this.props.changeindex(this.props.listid.length >= 49 ? 49 : this.props.listid.length)
        this.props.getsongsrc(val.id);
        localStorage.setItem('searchVal', JSON.stringify( { songname: val.name, authorname: val.artists[0].name}))
    }
    render() {
        return (
            <div className="searchwrap">
                <div>
                    <span style={{display:'block',fontSize:'20px',textAlign:'center',margin:'20px 10px'}}>搜索您喜爱的音乐</span>
                    <SearchInput
                        placeholder="请输入查询歌曲名"
                        onSearch={value => this.handleClick(value)}
                        enterButton
                    />
                </div>
            <span style={{ display: 'block', fontSize: '16px', textAlign: 'center', margin: '10px 10px' }}>搜索结果</span>
                {this.props.result.length === 0 ? <span style={{ display: 'block', fontSize: '16px', textAlign: 'center', margin: '10px 10px' }}>无</span> : <div className="result">
                    <div className="listwrap">
                        <List
                            itemLayout="horizontal"
                            dataSource={this.props.result}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a href="javascript:;">{item.name}</a>}
                                        description={item.artists[0].name}
                                        onClick={()=>this.handleplay(item)}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>}
            </div>
        )
    }
}