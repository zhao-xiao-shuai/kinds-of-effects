document.body.setAttribute("style","display: flex;"+
"justify-content: center;align-items: center;"+
"height: 100vh;");

const container=document.createElement("div");
container.className="container";
container.setAttribute("style","width: 600px;"+
"height: 300px;box-sizing: border-box;"+
"box-shadow: 0 5px 40px rgba(0, 0, 0, 0.8);"+
"border-radius: 10px;display: flex;"+
"justify-content: center;align-items: center;"+
"position: relative;z-index: 1;");
document.body.appendChild(container);

const input=document.createElement("input");
input.type="button";
input.value="确认";
input.setAttribute("style","width: 60px;"+
"height: 30px;font-size: 18px;font-weight: bolder;"+
"border: 1px solid black;border-radius: 5px;"+
"cursor: pointer;z-index: 2;");
container.appendChild(input);

input.addEventListener("click",()=>{

    //创建动效DOM对象
    createDOM(container);

    //3s后删除DOM对象
    setTimeout(() => {
        destroyDOM(container);
    }, 3000);

})

function createDOM(container){

    //遮罩层
    let loading=document.createElement("div");
    loading.className="loading";
    loading.setAttribute("style","width: 600px;height: 300px;"+
    "display: flex;justify-content: center;"+
    "align-items: center;flex-direction: column;"+
    "background: rgba(0, 0, 0, 0.8);border-radius: 10px;"+
    "position: absolute;top: 0;left: 0;z-index: 3;");
    container.appendChild(loading);

    //伸缩块
    let wrapper=document.createElement("div");
    wrapper.className="wrapper";
    wrapper.setAttribute("style","display: flex;"+
    "justify-content: center;align-items: center;"+
    "height: 120px;");
    loading.appendChild(wrapper);

    //5个伸缩条
    for (let index = 0; index < 5; index++) {

        let item=document.createElement("div");
        item.className="item";

        //伸缩条本身
        item.setAttribute("style","width: 15px;"+
        "margin: 0 5px;position: relative;");
        wrapper.appendChild(item);

    }

    //伸缩条上半段
    let up=document.createElement("style");
    up.innerHTML=".item::before{"+
        "content: \"\";"+
        "height: 50px;"+
        "width: 15px;"+
        "position: absolute;"+
        "bottom: 0;"+
        "left: 0;"+
        "background: rgb(64,158,255);"+
        "border-top-left-radius: 8px;"+
        "border-top-right-radius: 8px;"+
    "}";
    document.body.appendChild(up);

    //伸缩条下半段
    let down=document.createElement("style");
    down.innerHTML=".item::after{"+
        "content: \"\";"+
        "height: 50px;"+
        "width: 15px;"+
        "position: absolute;"+
        "top: 0;"+
        "left: 0;"+
        "background: rgb(64,158,255);"+
        "border-bottom-left-radius: 8px;"+
        "border-bottom-right-radius: 8px;"+
    "}";
    document.body.appendChild(down);

    //文字
    let span=document.createElement("span");
    span.innerText="正在创建流程...";
    span.setAttribute("style","display: block;"+
    "color: rgb(64,158,255);"+
    "font-size: 18px;"+
    "font-family: sans-serif;"+
    "letter-spacing: 3px;"+
    "font-weight: 600;");
    loading.appendChild(span);

    //定义动画
    let keyframes=document.createElement("style");
    keyframes.innerHTML="@keyframes loading {"+
        "0%{"+
            "height: 50px;"+
        "}"+
        "50%{"+
            "height: 10px;"+
        "}"+
        "100%{"+
            "height: 50px;"+
        "}"+
    "}";
    document.body.appendChild(keyframes);

    //动画
    for (let index = 0; index < 5; index++) {

        //延迟时间
        let delayTime=index*0.2+"s";

        let up=document.createElement("style");
        up.innerHTML=".item:nth-child("+(index+1)+
        ")::before{animation: loading 2s infinite "+delayTime;
        document.body.appendChild(up);

        let down=document.createElement("style");
        down.innerHTML=".item:nth-child("+(index+1)+
        ")::after{animation: loading 2s infinite "+delayTime;
        document.body.appendChild(down);
    }

}

function destroyDOM(container){
    let loading=container.querySelector(".loading");
    container.removeChild(loading);
}