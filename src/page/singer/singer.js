import React ,{Component} from 'react';
import { Icon, List } from 'antd';
import {connect} from 'react-redux';
import { getstarsong} from '../../redux/starsRudex';
import {getdetaillist,changeindex,getsongsrc,changeplay} from '../../redux/playRudex';


@connect(
    state => ({...state.starsRudex,...state.playRudex}),
    { getstarsong, getdetaillist, changeindex, getsongsrc, changeplay}
)
export default class Singer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bgshow: false,
            btnshow:true
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handsonglist = this.handsonglist.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.props.getstarsong(this.props.match.params.id);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll(e) {
        if (document.documentElement.scrollTop > (this.bg.clientHeight - 40)) {
            this.setState({
                bgshow: true
            })
        } else {
            this.setState({
                bgshow: false
            })
        }
    }
    handleBack(){
        this.props.history.goBack();
    }
    handleClick(item){
        this.props.history.push(`/play/${item.privilege.id}`)
        this.props.getdetaillist({
            listbg:[item.al.picUrl],
            listsongname:[ item.name],
            listauthorname: [item.ar[0].name],
            listid: [item.privilege.id]     
        })
        this.props.changeindex(this.props.listid.length >= 49 ? 49 : this.props.listid.length)
        this.props.getsongsrc(item.privilege.id);
    }
    handsonglist(){
        const listid = this.props.songmsglist.hotSongs.map(val=>{
            return val.privilege.id
        })
        const listsongname = this.props.songmsglist.hotSongs.map(val=>{
            return val.name
        })
        const listauthorname = this.props.songmsglist.hotSongs.map(val=>{
            return val.ar[0].name
        })
        const listbg = this.props.songmsglist.hotSongs.map(val=>{
            return val.al.picUrl
        })
        this.props.getdetaillist({listid,listbg,listauthorname,listsongname})
        this.props.getsongsrc(this.props.songmsglist.hotSongs[0].privilege.id)
        this.props.changeindex(0)
    }
    render() {        
        if (JSON.stringify(this.props.songmsglist)==='{}'){
            return null
        }
        let data = this.props.songmsglist;
        return (
            <div className="detailwrap">
                <div className="navwrap">
                    {this.state.bgshow ? <span className="listtitle" style={{ background: `url(${data.artist.picUrl}) 0 ${this.bg.clientHeight - 40}px`, color: '#fff' }}>{data.artist.name}</span> : <span className="listtitle" style={{color:'#fff'}}>{data.artist.name}</span>}
                    <button onClick={this.handleBack}><Icon type="left" style={{ lineHeight: '36px', color: '#1E90FF', fontSize: '24px' }} /></button>
                </div>
                <div className="songlistbg" ref={(bg) => this.bg = bg}>
                    <img src={data.artist.picUrl} alt="pic" />
                   {this.state.btnshow?<button onClick={()=>{
                        this.handsonglist();
                        this.setState({
                            btnshow:false
                        }, () => {
                            if(!this.state.btnshow&&!this.props.play){
                                this.props.changeplay(true)
                            }
                        }
                    )                    
                    }}><Icon type="play-circle" style={{ marginRight: '10px' }} />播放全部</button>
                        : <button onClick={()=>{
                            this.props.changeplay(false);
                            this.setState({
                                btnshow:true
                            })
                        }}><Icon type="play-circle" style={{ marginRight: '10px' }} />暂停全部</button>} 
                        <p className="desc">{data.artist.briefDesc}</p>
                </div>
                <div className="songlistwrap">
                    <List
                        itemLayout="horizontal"
                        dataSource={data.hotSongs}
                        renderItem={(item,i)=> (
                            <List.Item>
                                <List.Item.Meta
                                    title={<a href="javascript:void(0)">{item.name}</a>}
                                    description={item.ar[0].name}
                                    onClick={() => { this.handleClick(item,i)}}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }        
}









   