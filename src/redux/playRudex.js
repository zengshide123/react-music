import axios from 'axios';
import handleLrc  from '../utis/handleLrc';

const GET_SRC = 'GET_SRC';
const AUDIO_CONTROLS = 'AUDIO_CONTROLS';
const SONG_LIST = 'SONG_LIST';
const SONG_SRC = 'SONG_SRC';
const CHANGE_TIME = 'CHANGE_TIME';
const GET_SONG_DETAIL = 'GET_SONG_DETAIL';
const CHANGE_PLAY = 'CHANGE_PLAY';
const SONGLIST = 'SONGLIST';
const CHANGE_INDEX = 'CHANGE_INDEX';
const CHANGE_SHOW = 'CHANGE_SHOW';

const initState = {
    songsrc:'',
    lrcSrc:['1'],
    author:'zhou',
    name:'歌单详情页',
    currentTime:'00:00',
    durationTime:'00:00',
    bg:'',
    playlist:[],
    index:0,
    play:true,
    show:false,
    listid:[],
    listsongname:[],
    listauthorname:[],
    listbg:[],
    mode:'',
    songlistbg:'',
    songlistname:''
}


export function playRudex(state=initState,action){
    switch (action.type) {
        case GET_SRC:
            return {...state,...action.payload}  
        case AUDIO_CONTROLS:
            return {...state,...action.payload}  
        case SONG_LIST:
            return { ...state, playlist:action.payload}  
        case SONG_SRC:
            return { ...state, playlist:action.payload}  
        case CHANGE_TIME:
            return { ...state, ...action.payload}  
        case GET_SONG_DETAIL:
            return { ...state, ...handleDetilList(state,action.payload)}  
        case CHANGE_PLAY:
            return { ...state,play:action.play}  
        case SONGLIST:
            return { ...state,...action.payload}  
        case CHANGE_INDEX:
            return { ...state,index:action.index}  
        case CHANGE_SHOW:
            return { ...state,show:action.show}  
        default:
           return state
    }
}

export const getsongsrc = (id)=>{
    return dispatch=>{
        axios.get(`/music/url?id=${id}`).then(res=>{
            if(res.status===200){
                return dispatch({ type: GET_SRC,payload:{songsrc:res.data.data[0].url}})
            }
        })
    }
}
export const getlrc = (id)=>{
    return dispatch=>{
        axios.get(`/lyric?id=${id}`).then(res=>{
            if(res.status===200){
                if (!res.data.lrc){
                    return dispatch({type:11})
                }
                return dispatch({ type: GET_SRC, payload: { lrcSrc: handleLrc(res.data.lrc.lyric)}})
            }
        })
    }
}

export const changetime = (time)=>{
    return ({ type: CHANGE_TIME,payload:{...time}})
}


function handleDetilList(state,newData){
    if (newData.listid){
        let listid = state.listid.concat(newData.listid)
        let listsongname = state.listsongname.concat(newData.listsongname)
        let listauthorname = state.listauthorname.concat(newData.listauthorname)
        let listbg = state.listbg.concat(newData.listbg)
        if(listid.length>=50){
            listid.splice(0,listid.length-50)
            listsongname.splice(0, listsongname.length-50)
            listauthorname.splice(0, listauthorname.length-50)
            listbg.splice(0, listbg.length-50)           
        }
        return { listid: listid, listsongname: listsongname, listauthorname: listauthorname, listbg: listbg }
    }else{
        return {}
    }
}
export const getdetaillist = (objdata)=>{
    return ({ type: GET_SONG_DETAIL,payload:objdata})
}

export const changeplay = (bol)=>{
    return ({ type: CHANGE_PLAY,play:bol})
}

export const gesonglistmsg = (objdata)=>{
    return { type: SONGLIST,payload:objdata}
} 
export const changeindex = (index)=>{
    return { type: CHANGE_INDEX,index:index}
}
export const changeshow = (bol)=>{
    return { type: CHANGE_SHOW,show:bol}
}
