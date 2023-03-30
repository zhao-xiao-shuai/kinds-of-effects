let all_a=document.querySelectorAll("a");
console.log("all_a:",all_a);
let animation=document.querySelector(".animation");

all_a.forEach((a,index)=>{
    a.addEventListener("click",()=>{

        console.log("================================");
        console.log("index:",index);
        console.log("鼠标移动到的a标签:",a.innerText);

        /**
         * 设置a标签被激活后的样式
         */
        all_a.forEach(item=>{
            item.classList.remove("active");
        })
        a.classList.add("active");

        let current_a_width=a.offsetWidth;
        console.log("当前a标签的宽度:",current_a_width);

        //给.animation添加width属性
        animation.style.width=current_a_width+"px"; 

        //计算前面a的宽度总和
        let sum_width=0;
        if(index!=0){
            for (let i = 0; i < index; i++) {
                console.log("a标签的宽度:",all_a[i].offsetWidth);
                sum_width+=all_a[i].offsetWidth;
            }
        }

        //设置animation的left位置
        let left_position=sum_width+"px";
        console.log("left_position:",left_position);

        //给.animation添加left属性
        animation.style.left=left_position;

    })
})