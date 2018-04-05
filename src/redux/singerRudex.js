import axios from 'axios';


const GET_HOTSINGER = 'GET_HOTSINGER';
const GET_SINGERS = 'GET_SINGERS';
const CLEAN_DATA = 'CLEAN_DATA';

const initState = {
    hotsingers:[],
    singers:[]
}

export function singersRedux(state=initState,action){
    switch (action.type) {
        case GET_HOTSINGER:
            return { ...state, hotsingers:action.payload}
        case GET_SINGERS:
            return { ...state, singers:action.payload}
        case CLEAN_DATA:
            return {...initState}
        default:
           return state
    }
}

export const gethotsingers = ()=>{
    return dispath =>{
        axios.get('/top/artists?offset=0&limit=10').then((res)=>{
            if(res.status===200){
                return dispath({ type: GET_HOTSINGER, payload: res.data.artists})
            }
        })
    }
}
export const getsingers = ()=>{
    return dispath =>{
        axios.get('/toplist/artist').then((res)=>{
            if(res.status===200){
                return dispath({ type: GET_SINGERS, payload: res.data.list.artists})
            }
        })
    }
}
export const cleandata = ()=>{
    return { type: CLEAN_DATA}
}