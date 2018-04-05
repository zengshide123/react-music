import React,{Component} from 'react';
import BannerSlide  from '../../component/bannerslide';
import { List, Avatar } from 'antd';
import  {gethotsonglist} from'../../redux/indexRudex';
import {connect} from 'react-redux';
import {gesonglistmsg} from '../../redux/playRudex';


@connect(
    state => state.indexRedux,
    { gethotsonglist, gesonglistmsg}
)
export default class Index extends Component{
    constructor(props){
        super(props);
        this.state={ 
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        this.props.gethotsonglist();
    }
    handleClick(val){
        this.props.history.push(`/details/${val.id}`);
        this.props.gesonglistmsg({ songlistbg: val.coverImgUrl, songlistname:val.name})
    }
    render(){
        if (!this.props.hotsonglist.length) {
            return null
        }
        return(
            <div>
                <BannerSlide/>
                <div className="indexlistwrap">
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.hotsonglist}
                        header={<p>热门歌单推荐</p>}
                        loading={false}
                        style={{}}
                        bordered={false}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.coverImgUrl} />}
                                    title={<a >{item.name}</a>}
                                    description={item.description}
                                    onClick={()=>this.handleClick(item)}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}