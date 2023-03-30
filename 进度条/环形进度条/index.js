


let circle=document.getElementById("circle"),
input=document.getElementById("percent"),
number=document.querySelector(".card__number"),
tooltip=document.querySelector(".tooltip");

/**
 * 设置圆进度条的百分比
 */
function circlePercent(){
    let change=565.2 - 565.2*input.value/100; 
    circle.style.strokeDashoffset=change;
}

function isNumberic(event){
    if (event.keyCode<48||event.keyCode>57) {
        console.log("非数字");
        return false;
    }
}

function changePercent(){
    if (input.value>100) {
        tooltip.style.opacity=1;
        tooltip.classList.add("fade-in");
    }else{
        tooltip.style.opacity=0;
        tooltip.classList.remove("fade-in");
        number.innerHTML=Number(input.value)+"%";
        circlePercent()
        input.value="";
    }

}