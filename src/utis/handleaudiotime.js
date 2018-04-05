
export function handleaudioTime(t){
    if(!t){
        t=0
    }
    const time = Math.round(t);
    return time
}


export function splitTime(t){
    const sec = t%60;
    const mit = Math.round((t-sec)/60);
    const time = add0(mit)+':'+add0(sec);
    return time
}


function add0(time){
    return time<10?'0'+time:time
}

