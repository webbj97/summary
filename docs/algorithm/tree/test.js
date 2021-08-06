show = false;
aa = false;
let count = 0;

let timer = setInterval(() => {
    if(count == 5) aa = true;
    if (aa) {
        show = true; // 安装插件再打开
    }else{
        count++
    }
    console.log('i', count);
    if(count == 10 || show){
        clearInterval(timer);
    }
}, 1000);
