import axios from 'axios';


const GET_STAR = 'GET_STAR';

const initState = {
    songmsglist:{}
}

export function starsRudex(state=initState,action) {
      switch (action.type) {
          case GET_STAR:
              return { ...state, songmsglist:action.payload}   
          default:
              return state
      }  
}


export const getstarsong = (val)=>{
    return dispatch=>{
        axios.get(`/artists?id=${val}`).then(res=>{
            if(res.status===200){
                return dispatch({ type: GET_STAR,payload:res.data})
            }
        })
    }
}