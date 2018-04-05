import React,{Component} from 'react';
import {Icon} from 'antd';
import {connect} from 'react-redux';
import {getsongsrc,getlrc,changeshow,changeindex,changeplay} from '../../redux/playRudex';
import {withRouter} from 'react-router-dom';
import { handleaudioTime, splitTime} from '../../utis/handleaudiotime';

@withRouter
@connect(
    state=>state.playRudex,
        { getsongsrc, getlrc, changeshow, changeindex, changeplay}
)
export default class Play extends Component{
    constructor(props){
        super(props);
        this.state={
            currentTime:'',
            wid:0
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handlechangetime = this.handlechangetime.bind(this);
        this.handleControl = this.handleControl.bind(this);
        this.timer = null;
    }
    componentDidMount() {
        this.wrap.addEventListener('scroll', this.handleScroll);
        this.props.getlrc(this.props.match.params.id)
        !this.props.songsrc && this.props.getsongsrc(this.props.match.params.id)
        this.props.changeshow(true);
        this.timer = setInterval(() => {
            this.setState({
                currentTime: splitTime(handleaudioTime(this.props.currentTime)),
                durationTime: splitTime(handleaudioTime(this.props.durationTime))
            }, () => { this.pro.style.width = `${handleaudioTime(this.props.currentTime) * 100 / handleaudioTime(this.props.durationTime)}%`})
            this.handlechangetime();
        }, 500);
    }
    componentWillUnmount() {
        this.wrap.removeEventListener('scroll', this.handleScroll);
        clearInterval(this.timer);
        this.timer = null;
    }
    handleScroll(val) {
        if(val>6&&this.wrap){
            this.wrap.scrollTop = 30*(val-6)
        }
    }
    handleBack(){
        clearInterval(this.timer);
        this.timer = null;
        this.props.history.goBack();
    }
    handlechangetime(){
        let index = this.props.lrcSrc.findIndex(val=>{
            return val[0]>this.props.currentTime
        })
        index = !index?0:--index;
        this.handleScroll(index);
        this.lrcwrap&&Array.from(this.lrcwrap.children).forEach((val,i)=>{
            val.style.color='#000';
            if(i===index){
                val.style.color ='#1E90FF'
            }
        })
    }
    handleControl(val){
        const len = this.props.listid.length;
        let index = this.props.index;
        switch(val){
            case 'prev':
                index = index <= 1 ? 0 : --index;
                this.props.changeindex(index);
                this.props.getsongsrc(this.props.listid[index])
                this.props.getlrc(this.props.listid[index])
              break;
            case 'next':
                index = index >= len - 1 ? len - 1 : ++index;
                this.props.changeindex(index);
                this.props.getsongsrc(this.props.listid[index])
                this.props.getlrc(this.props.listid[index])
              break;
            default:
              this.props.changeplay(!this.props.play);
              this.props.changeshow(!this.props.play);
        }
    }
    render(){
        return (
            <div className="playwrap" style={{ backgroundImage: `url(${this.props.listbg[this.props.index] || "http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"})`,backgroundSize:'100% 100%'}}>
                <div className="navwrap">
                    <span className="songName">{this.props.listsongname[this.props.index] || JSON.parse(localStorage.getItem('searchVal')).songname}</span>
                    <button onClick={this.handleBack}><Icon type="left" style={{ lineHeight: '36px', color: '#1E90FF', fontSize: '24px' }} /></button>
                    <span className="author">{this.props.listauthorname[this.props.index] || JSON.parse(localStorage.getItem('searchVal')).authorname}</span>
                </div>
                <div className="lrcwrap" ref={(wrap)=>{this.wrap=wrap}}>
                    <ul ref={(wrap)=>this.lrcwrap=wrap}>
                        {this.props.lrcSrc.map((val,i)=>{
                            return <li key={val[0]} ref={(i)=>this._i=i}>{val[1]}</li>
                        })}
                    </ul>
                </div> 
                <div className="process">
                    <div className="container">
                        <div className="startTime">{this.state.currentTime}</div>
                        <div className="stopTime">{this.state.durationTime}</div>
                        <div className="currentTime" ref={(pro)=>this.pro=pro}>
                            <span className="dot"></span>
                        </div>
                    </div>
                </div>
                <div className="playAudio">
                    <div className="btnGrounp">
                        <span className="mode">
                            <Icon type="retweet" />
                        </span>
                        <span className="prev"
                         onClick={()=>{this.handleControl('prev')}}
                        >
                            <Icon type="backward" />
                        </span>
                        <span className="play"
                            onClick={()=>{this.handleControl('play')}}
                        >
                            <Icon type="play-circle-o" />
                        </span>
                        <span className="next"
                         onClick={()=>{this.handleControl('next')}}
                        >
                            <Icon type="forward" />
                        </span>
                        <span className="list">
                            <Icon type="menu-unfold" />
                        </span>
                        </div>                 
                </div>   
            </div>
        )
    }
}