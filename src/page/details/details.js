import React ,{Component} from 'react';
import { Icon, List} from 'antd';
import {connect} from 'react-redux';
import   {getdetailslist}  from '../../redux/detailRudex';
import { changeplay, getdetaillist,getsongsrc,changeindex} from '../../redux/playRudex';

@connect(
    state => ({ ...state.playRudex, ...state.detailRudex}),
    { getdetailslist, changeplay, getdetaillist, getsongsrc,changeindex}
)
export default class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            bgshow:false,
            btnshow:true
        }        
    this.handleScroll = this.handleScroll.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handsonglist = this.handsonglist.bind(this);
    this.handleplay = this.handleplay.bind(this);
    }
    componentDidMount() {
         window.addEventListener('scroll', this.handleScroll);
        this.props.getdetailslist(this.props.match.params.id)
        }
    componentWillUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
        }
    handleScroll(e) {
        if (document.documentElement.scrollTop > (this.bg.clientHeight-40)){
            this.setState({
                bgshow:true
            })
        }else{
            this.setState({
                bgshow: false
            })
        }        
    }
    handleBack(){
        this.props.history.goBack();
    }
    handsonglist() {
        const listid = this.props.data.map(val => {
            return val.id
        })
        const listsongname = this.props.data.map(val => {
            return val.name
        })
        const listauthorname = this.props.data.map(val => {
            return val.artists[0].name
        })
        const listbg = this.props.data.map(val => {
            return val.album.picUrl
        })
        this.props.getdetaillist({ listid, listsongname, listauthorname, listbg})
        this.props.getsongsrc(this.props.data[0].id)
    }
    handleplay(val){
        this.props.history.push(`/play/${val.id}`)
        this.props.getdetaillist({
            listbg: [val.album.picUrl],
            listsongname: [val.name],
            listauthorname: [val.artists[0].name],
            listid: [val.id]
        })
        this.props.getsongsrc(val.id)
        this.props.changeindex(this.props.listid.length >= 49 ? 49 : this.props.listid.length)
    }
    render(){
        return(
            <div className="detailwrap">
                <div className="navwrap">
                    {this.state.bgshow ? <span className="listtitle" style={{ background: `url(${this.props.bg|| "http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"}) 0 ${this.bg.clientHeight - 40}px`, color: '#fff' }}>{this.props.name}</span> : <span className="listtitle">{this.props.name}</span>}
                    <button onClick={this.handleBack}><Icon type="left" style={{ lineHeight: '36px', color: '#1E90FF', fontSize: '24px' }} /></button>
                </div>    
                <div className="songlistbg" ref={(bg) => this.bg = bg}>
                    <img src={this.props.bg}  alt="pic"/>
                    {this.state.btnshow ? <button onClick={() => {
                        this.handsonglist()
                        this.setState({
                            btnshow: false
                        }, () => {
                            if (!this.state.btnshow && !this.props.play) {
                                this.props.changeplay(true)
                            }
                        }
                        )
                    }}><Icon type="play-circle" style={{ marginRight: '10px' }} />播放全部</button>
                        : <button onClick={() => {
                            this.props.changeplay(false);
                            this.setState({
                                btnshow: true
                            })
                        }}><Icon type="play-circle" style={{ marginRight: '10px' }} />暂停全部</button>} 
                </div>
                <div className="songlistwrap">
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<a href="javascript:;">{item.name}</a>}
                                    description={item.artists[0].name}
                                    onClick={() => this.handleplay(item)}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}