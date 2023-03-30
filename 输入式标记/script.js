const ul=document.querySelector("ul"),
input=document.querySelector("input"),
tagNumber=document.querySelector(".details span"),
removeBtn=document.querySelector(".details button");

//最大的tag数
let maxTags=10;
//已经添加的tag
let tags=["默认的tag"];

createTag();

input.addEventListener("keyup",addTag);

removeBtn.addEventListener("click",()=>{
    //清空tags数组
    tags.length=0;
    //移除ul下面所有的tag
    ul.querySelectorAll("li").forEach(li=>li.remove());
    //重新计算tag的数量
    countTags();
})

/**
 * 删除tag
 */
function removeTag(element,tag){
    //要删除的tag在tags中的索引
    let index=tags.indexOf(tag);
    //重组删除之后的tags数组
    tags=[...tags.slice(0,index),...tags.slice(index+1)];
    //移除img的父级元素li
    element.parentElement.remove();
    //重新计算剩余可添加的tag数量
    countTags();
}

/**
 * 计算当前tag的数量
 */
function countTags(){
    /**
     * 聚焦在input标签上
     */
    input.focus();
    /**
     * 修改数量
     */
    tagNumber.innerText=maxTags-tags.length;
}

/**
 * 添加tag
 * 只有按回车的时候才进行添加
 */
function addTag(e){

    if(e.key=="Enter"){

        /**
         * input标签的值
         * 特点:
         * 将多个空格替换为一个空格
         */
        let tag=e.target.value.replace(/\s+/g, ' ');

        /**
         * 如果input标签的值不为空
         * 并且已经添加的tag不包含这个值
         */
        if(tag.length>1){
            if(tags.includes(tag)){
                alert(`标签${tag}已存在,请不要重复添加!`)
            }else{
                if (tags.length<maxTags) {
                    tags.push(tag);
                    createTag();
                }else{
                    alert(`已达最大标签数上限,无法进行添加!`)
                }
            }
        }

        /**
         * 按下回车之后
         * input标签的值清空
         */
        e.target.value="";
    }

}

/**
 * 特点:
 * 借助tags的值来创建
 * 而不是借助一个tag的值来创建
 */
function createTag(){
    /**
     * 创建之前先清空所有的tag
     */
    ul.querySelectorAll("li").forEach(li=>li.remove());
    /**
     * tags值的特点:
     * 先添加的在前,后添加的在后
     * 显示的时候
     * 需要将后添加的显示在第一位
     * 因此需要反转数组
     * 
     * 注意:
     * 插入的li在input标签之前
     */
    tags.slice().reverse().forEach(tag=>{
        let liTag=`<li>
            <span>${tag}</span>
            <img src="Pictures/错误.png" alt="" onclick="removeTag(this,'${tag}')">
        </li>`;
        ul.insertAdjacentHTML("afterbegin",liTag);
    })

    /**
     * 创建tag之后重新计算tag的数量
     */
    countTags();
}