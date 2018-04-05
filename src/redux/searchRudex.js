import axios from 'axios';


const GET_SEARCH_RESULT = 'GET_SEARCH_RESULT';

const initState = {
    result:[]
}


export function searchRudex(state=initState,action){
    switch (action.type) {
        case GET_SEARCH_RESULT:
            return {...state,result:action.payload}
        default:
           return{...state}
    }
}

export const getsearchlist = (val)=>{
    return dispatch=>{
        axios(`/search?keywords=${val}`).then(res => {
            if (res.status === 200) {
                const arr = res.data.result.songs;
                return dispatch({ type: GET_SEARCH_RESULT,payload:arr })
            }
        })
    } 
}