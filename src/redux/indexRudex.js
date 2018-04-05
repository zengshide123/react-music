import axios from 'axios';

const GET_BANNER = 'GET_BANNER';
const GET_HOTSONGLIST = 'GET_HOTSONGLIST';
const CLEAN_DATA = 'CLEAN_DATA';

const initState = {
    bannerlist:[],
    hotsonglist:[]
}
export function indexRedux(state=initState,action) {
    switch (action.type) {
        case GET_BANNER:
            return { ...state, bannerlist:action.payload}   
        case GET_HOTSONGLIST:
            return { ...state, hotsonglist:action.payload}    
        case CLEAN_DATA:
            return {...initState}    
        default:
             return  state
    }
}

export const getbannerlist = ()=>{
    return dispatch=>{
        axios.get('/banner').then((res)=>{
            if(res.status===200){
                return dispatch({ type: GET_BANNER, payload: res.data.banners})
            }
        })
    }
}
export const gethotsonglist = ()=>{
    return dispatch => {
        axios.get('/top/playlist/highquality?limit=30').then((res) => {
            if (res.status === 200) {
                return dispatch({ type: GET_HOTSONGLIST, payload: res.data.playlists })
            }
        })
    }
}
export const cleandata = ()=>{
    return { type: CLEAN_DATA}
}