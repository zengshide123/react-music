import axios from 'axios';
import  handledata  from '../utis/handledetaildata';


const GET_DETAILS = 'GET_DETAILS';
const CLEAR_DATA = 'CLEAR_DATA';

const initState = {
    data:[],
    bg:'',
    name:'',   
}

export function detailRudex(state=initState,action){
    switch (action.type) {
        case GET_DETAILS:
            return { ...state, ...action.payload}
        case CLEAR_DATA:
            return {...initState}
        default:
          return state
    }
}

export const getdetailslist = (val)=>{
    return dispatch=>{
        axios.get(`/playlist/detail?id=${val}`).then((res)=>{
            if(res.status===200){
                return dispatch({
                    type: GET_DETAILS, payload: {
                        data: handledata(res.data.result.tracks), bg: res.data.result.coverImgUrl,
                    name: res.data.result.name
                }})
            }
        })
    }
}
export const cleardata = ()=>{
    return { type: CLEAR_DATA}
}