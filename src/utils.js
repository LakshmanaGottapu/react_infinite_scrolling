export function debounce(fn, delay=1000){
    let timer;
    return function(...args){
        if(timer)
            clearTimeout(timer);
        timer = setTimeout(()=>fn(...args), delay);
    }
}

export function throttle(fn, delay){
    let lastRun;
    let lastFunc;
    return function(...args){
        if(!lastRun){
            fn(...args);
            lastRun = Date.now();
        }
        else{
            clearTimeout(lastFunc);
            lastFunc = setTimeout(()=>{
                fn(...args)
                lastRun = Date.now();
            }, lastRun+delay-Date.now())
        }
    }
}