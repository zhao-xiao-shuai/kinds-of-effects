let cha=document.createElement("style");
cha.title='cha_before';
cha.innerText=".cha::before{"+
    "content: \"\";"+
    "width: 0px;"+                
    "height: 0px;"+
    "border: 12px solid black;"+
    "border-bottom-color: transparent;"+
    "border-left-color: transparent;"+
    "border-right-color: transparent;"+
    "position: absolute;"+
    "top: 8px;"+
"}";
document.body.appendChild(cha);

//移除方式1
cha.remove();

//移除方式2
let cha=document.querySelector('style[title="cha"]');
if(cha!=null){
    cha.remove();
};

//移除body下的所有style标签
let all_style=document.body.querySelectorAll("style");
all_style.forEach(item=>{
    item.remove();
})

