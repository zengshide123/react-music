import React,{Component} from 'react';
import {connect} from 'react-redux';
import {changetime,changeshow,changeindex,getlrc,getsongsrc}  from '../redux/playRudex';
import {withRouter} from 'react-router-dom';
@withRouter
@connect(
    state=>state.playRudex,
    { changetime, changeshow, changeindex, getlrc, getsongsrc}
)
export default class Audio extends Component{
    constructor(props){
        super(props);
        this.state={};
        this.timer = null;
        this.handleControl = this.handleControl.bind(this);
        this._aboutTime = this._aboutTime.bind(this);
        this.timer1 = null;
    }
    componentDidMount(){
        this.timer = setInterval(this.handleControl,100)
    }
    handleControl(){
        if(!this.audio||!this.props.songsrc) return;
        if(this.props.play){
            if(this.audio.ended){
            let index = this.props.index ;
            index = index>=this.props.listid.length-1?0:++index;
            this.props.changeindex(index);
            this.props.getlrc(this.props.listid[index]);
            this.props.getsongsrc(this.props.listid[index]);
        }
            if (this.audio.paused){
                this.audio.play();
                this.props.changeshow(true);
                if(this.props.listid.length){
                    localStorage.setItem('searchVal', JSON.stringify({ songname: this.props.listsongname[this.props.index], authorname: this.props.listauthorname[this.props.index]}))   

                }    
            }
        }else{
            if(!this.audio.paused){
                this.audio.pause();
                this.props.changeshow(false);
            }
               
        }
        this.audio.addEventListener('timeupdate',this._aboutTime)
    }
    _aboutTime(){
        this.props.changetime({currentTime:this.audio.currentTime,durationTime:this.audio.duration})
    }
    componentWillUnmount(){
        clearInterval(this.timer);
        this.timer = null;
    }
    render(){
        return <div>
                <audio 
                    ref={(audio)=>{this.audio = audio}}
                    src={`${this.props.songsrc}`}>                        
                </audio>
        </div>
    }
}
