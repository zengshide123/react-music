import React ,{Component} from 'react';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
import Index from './page/index/Index';
import Rank from './page/rank/Rank';
import Singers from './page/singers/Singers';
import Details from './page/details/details';
import Singer from './page/singer/singer';
import Play from './page/play/paly';
import Search from './page/search/search';
import { Menu} from 'antd';
import {connect} from 'react-redux';
import Audio from './component/audio';

@withRouter
@connect(
    state=>state.playRudex,
    {}
)
export default class App extends Component{    
    constructor(props){
        super(props);
        this.state={
        };
        this.handleClick = this.handleClick.bind(this);
        this._miniplayhandle = this._miniplayhandle.bind(this);
    }
    componentDidMount(){
   
    }
    handleClick({key}){
        this.props.history.push(`/${key}`)
    }
    _miniplayhandle(){
        if(this.props.listid.length){
            this.props.history.push(`/play/${this.props.listid[this.props.index]}`)
        }
    }
    render(){
        return(
            <div>
                <div className="menuwrap">
                    <Menu mode='horizontal'
                        defaultSelectedKeys={[`${this.props.location.pathname.split('/')[1]}`]}
                        style={{
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'space-around',
                            background: '#1E90FF',
                            height: '50px',
                            fontSize: '16px',
                            alignItems: 'center'
                        }}
                        theme="dark"
                        onClick={(val)=>this.handleClick(val)}
                    >
                        <Menu.Item key='index' onClick={()=>{this.handleClick()}}>推荐</Menu.Item>
                        <Menu.Item key="singers">歌手</Menu.Item>
                        <Menu.Item key="rank">排行</Menu.Item>
                        <Menu.Item key="search">搜索</Menu.Item>
                    </Menu>
                </div>
                <Switch>
                    <Route path="/" exact render={()=>{
                        return <Redirect to="/index"/>
                    }}/>
                    <Route path="/index" component={Index}/>
                    <Route path="/singers" component={Singers}/>
                    <Route path="/rank" component={Rank}/>
                    <Route path="/details/:id" component={Details}/>
                    <Route path="/singer/:id" component={Singer}/>
                    <Route path="/play/:id" component={Play}/> 
                    <Route path="/search" component={Search}/> 
                    <Route component={Index}/>
                </Switch>
                <div>
                    <Audio/>
                </div>
                {this.props.show&&(this.props.location.pathname.indexOf('play')===-1) ? <div className="miniplay">
                    <img src={this.props.listbg[this.props.index] || "http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"} onClick={() => { this._miniplayhandle() }} alt="minipic" />
                </div>:null}
            </div>
        )
    }
}