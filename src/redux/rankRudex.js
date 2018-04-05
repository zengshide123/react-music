import axios from 'axios';


const GET_RANK = 'GET_RANK';
const CLEAN_DATA = 'CLEAN_DATA';

const initState = {
    list:[]
}

export function rankRudex(state=initState,action){
    switch (action.type) {
        case GET_RANK:
            return {...state,list:action.payload}   
        case CLEAN_DATA:
            return {...initState}   
        default:
          return state
    }
}

    let axiosArr = [];
    for(let i=0;i<20;i++){
        axiosArr.push(rankaxios(i))
    }

function rankaxios(url){
    return axios.get(`/top/list?idx=${url}`)
}



export const getrank = ()=>{
    return (dispatch,getState)=>{
        let result = [];
        axios.all(axiosArr).then(axios.spread(function () {
            result = Array.from(arguments).map(val=>{
                return val.data
            })
            return dispatch({ type: GET_RANK, payload:result})
        }));
    }
}
export const cleandata=()=>{
    return { type: CLEAN_DATA}
}

