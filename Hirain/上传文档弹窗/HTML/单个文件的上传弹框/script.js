//当前登录公共账号
let CurrentAccount="BJ-CAE";
//匹配数据:配置文件中的数据
let MatchingData;
//已点选文件的名称
let SelectedFileName="这是文件名称xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

/**
 * 对话框的大小
 * 作用:下拉选择框会用到这个值
 */
const dialogWidth=600;
const dialogHeight=540;

//点选的文件信息
const SelectedFile={
    FileName:"点选文件1.txt",
    FileSize:"8kB"
};

/**
 * 数据源:
 * 当前公共账号下的所有实际账号
 */
let AllActualAccount=new Array();


fetch("data.json")
.then(response=>{
    return response.json();
})
.then(value=>{

    MatchingData=value;
    console.log("匹配数据:",MatchingData);

    /**
     * 获取公共账号信息
     */
    let PublicAccountInformation=new Object();
    for (const key in MatchingData.UserMapping) {
        if (MatchingData.UserMapping[key].PublicAccount==CurrentAccount){
            PublicAccountInformation=MatchingData.UserMapping[key]
            break;
        }
    }
    console.log("公共账号:",PublicAccountInformation);

    /**
     * 设置已点选文件名
     */
    const SelectedFileDetails=document.querySelector(".container-UploadDocument .selected-file .details");
    if (SelectedFileDetails!=null) {

        const NameDOM=SelectedFileDetails.querySelector(".name");
        const SizeDOM=SelectedFileDetails.querySelector(".size");

        NameDOM.innerText=SelectedFile.FileName;
        SizeDOM.innerText=SelectedFile.FileSize;
    }

    /**
     * 设置公共账号输入框
     */
    const PublicAccountSpan=document.querySelector(".container-UploadDocument .public-account span");
    if(PublicAccountSpan!=null){
        PublicAccountSpan.innerText=PublicAccountInformation.PublicAccount
        +"("+PublicAccountInformation.Description+")";
    }

})
/**
 * 可搜索下拉框相关
 * 文档实际所有人
 */
.then(_=>{

    for (const key in MatchingData.UserMapping) {
        if (MatchingData.UserMapping[key].PublicAccount==CurrentAccount){
            AllActualAccount.push(key);
        }
    }
    console.log("当前公共账号下的所有实际账号:");
    console.log(AllActualAccount);

    /**
     * 实际账号需要添加上所有的中文
     */

    //select类
    let select=document.querySelector(".my-select");
    //select-input类
    let select_input=select.querySelector(".select-input");
    //select-input类下面的input标签
    let select_input_input=select_input.getElementsByTagName("input")[0];
    //select-input类下面的倒三角
    let select_input_triangle=select_input.querySelector(".triangle");

    //select下面的ul
    let select_ul;

    /**
     * 可搜索输入框的下拉事件
     * 
     * 逻辑:
     * (1)如果已有select_ul
     * 清空下拉选择框并删除select_ul
     * (2)如果没有select_ul
     * 添加当前公共账号所有的实际账号到下拉选择框
     * 并为每个li绑定点击事件
     */
    select_input_triangle.addEventListener("click",()=>{

        select_ul=document.querySelector(".select-items");

        //已有select_ul
        if(select_ul!=null){

            //清空所有的li标签
            let all_li=select_ul.children;
            Array.from(all_li).forEach(item=>{
                select_ul.removeChild(item);
            })

            //清除select_ul
            document.body.removeChild(select_ul);

        //没有select_ul    
        }else{

            //获取ul的添加位置
            let {top,left}=getPosition(select);
            top=top+35-dialogHeight/2;
            left=left+5-dialogWidth/2;

            /**
             * 创建select_ul
             */
            select_ul=document.createElement("ul");
            select_ul.className="select-items";
            select_ul.setAttribute("style","display: flex;"+
                "flex-direction: column;"+
                "box-sizing: border-box;"+
                "z-index: 200;"+
                "position: absolute;"+
                "left: "+left+"px;"+
                "top: "+top+"px;"+
                "border: 1px solid black;"+
                "box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);"+
                "list-style: none;"+
                "margin: 0;"+
                "padding: 0;\"");
            document.body.appendChild(select_ul);

            /**
             * 添加当前公共账号所有的实际账号到下拉选择框
             * 并为每个li绑定点击事件
             */
            AllActualAccount.forEach(item=>{
              
                /**
                 * 创建li标签
                 */
                let li=document.createElement("li");
                li.innerText=item;
                li.setAttribute("style","box-sizing:border-box;height:30px;width:248px;"+
                "line-height:30px;padding-left:5px;list-style:none;background:white;"+
                "color:black;font-size:14px;font-weight:bold;cursor:pointer;"+
                "white-space:norwap;overflow:hidden;text-overflow:ellipsis;")
                select_ul.appendChild(li);

                li.addEventListener("mouseover",()=>{
                    li.style.background="#d7e4e7";
                })
                li.addEventListener("mouseout",()=>{
                    li.style.background="white";
                })

                /**
                 * 给创建出来的li标签添加点击事件
                 */
                li.addEventListener("mousedown",(event)=>{

                    /**
                     * 阻止浏览器的默认行为
                     * 目的:
                     * 防止mousedown事件触发input标签的blur事件
                     */
                    event.preventDefault();

                    /**
                     * 效果1:
                     * 设置input标签的value属性
                     */
                    select_input_input.value=li.innerText;

                    /**
                     * 效果2:
                     * 移除select_ul下面所有的li
                     */
                    let all_li=select_ul.children;
                    Array.from(all_li).forEach(item=>{
                        select_ul.removeChild(item);
                    })

                    /**
                     * 效果3:
                     * 移除select_ul
                     */
                    let ul_temp=document.querySelector(".select-items");
                    if(ul_temp!=null){
                        document.body.removeChild(ul_temp);
                    }

                })

            })

        }
    })

    /**
     * 可搜索输入框的输入事件
     */
    select_input_input.addEventListener("input",function(){

        let {top,left}=getPosition(select);
        top=top+35-dialogHeight/2;
        left=left+5-dialogWidth/2;

        /**
         * 如果select下没有ul,创建
         */
        select_ul=document.querySelector(".select-items");
        if(select_ul==null){
            select_ul=document.createElement("ul");
            select_ul.className="select-items";
            select_ul.setAttribute("style","display: flex;"+
                "flex-direction: column;"+
                "box-sizing: border-box;"+
                "z-index: 200;"+
                "position: absolute;"+
                "left: "+left+"px;"+
                "top: "+top+"px;"+
                "border: 1px solid black;"+
                "box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);"+
                "list-style: none;"+
                "margin: 0;"+
                "padding: 0;\"");
            document.body.appendChild(select_ul)
        }

        /**
         * 1.清除所有的li标签
         */
        let all_li=select_ul.children;
        Array.from(all_li).forEach(item=>{
            select_ul.removeChild(item);
        })

        /**
         * 3.根据输入框的输入值动态创建li标签
         */
        let InputCurrentValue=select_input_input.value;
        // console.log("当前输入框的值:",InputCurrentValue);
        if(InputCurrentValue!=""){

            //搜索结果
            let SearchResult=AllActualAccount.filter(item=>{
                return item.substr(0,InputCurrentValue.length)==InputCurrentValue;
            })
            // console.log("搜索结果:",SearchResult);

            //没有搜索到,显示"没有搜索到..."
            if (SearchResult.length==0) {
            
                /**
                 * 创建li标签
                 */
                let li=document.createElement("li");
                li.innerHTML="没有搜索到...";
                li.setAttribute("style","box-sizing:border-box;height:30px;width:248px;"+
                "line-height:30px;padding-left:5px;list-style:none;background:white;"+
                "color:black;font-size:14px;font-weight:bold;cursor:pointer;"+
                "white-space:norwap;overflow:hidden;text-overflow:ellipsis;")
                select_ul.appendChild(li);

                li.addEventListener("mouseover",()=>{
                    li.style.background="#d7e4e7";
                })
                li.addEventListener("mouseout",()=>{
                    li.style.background="white";
                })

                /**
                 * 当点击"没有搜索到..."li时
                 * 除了触发blur事件
                 * 还应该清空input标签
                 */
                li.addEventListener("mousedown",()=>{
                    select_input_input.value="";
                })

            //搜索到,正常显示
            } else {

                //循环创建li标签
                SearchResult.forEach(item=>{

                    //创建li标签
                    let li=document.createElement("li");
                    li.innerHTML=item;
                    li.setAttribute("style","box-sizing:border-box;height:30px;width:248px;"+
                    "line-height:30px;padding-left:5px;list-style:none;background:white;"+
                    "color:black;font-size:14px;font-weight:bold;cursor:pointer;"+
                    "white-space:norwap;overflow:hidden;text-overflow:ellipsis;")
                    select_ul.appendChild(li);

                    li.addEventListener("mouseover",()=>{
                        li.style.background="#d7e4e7";
                    })
                    li.addEventListener("mouseout",()=>{
                        li.style.background="white";
                    })

                    /**
                     * 给创建出来的li标签添加点击事件
                     */
                    li.addEventListener("mousedown",()=>{

                        /**
                         * 效果1:
                         * 设置input标签的value属性
                         */
                        select_input_input.value=li.innerText;

                            /**
                             * 效果2:
                             * 移除select_ul下面所有的li
                             */
                        let all_li=select_ul.children;
                        Array.from(all_li).forEach(item=>{
                            select_ul.removeChild(item);
                        })
                        /**
                         * 效果3:
                         * 移除select_ul
                         */
                        let ul_temp=document.querySelector(".select-items");
                        if(ul_temp!=null){
                            document.body.removeChild(ul_temp);
                        }

                    })

                })
                
            }
        }else{
            /**
             * 输入框为空的时候
             * 移除select_ul
             */
            let ul_temp=document.querySelector(".select-items");
            if(ul_temp!=null){
                document.body.removeChild(ul_temp);
            }
        }

    })

    /**
     * 可搜索输入框的焦点移除事件
     */
    select_input_input.addEventListener("blur",function(){

        select_ul=document.querySelector(".select-items");

        if (select_ul!=null) {

            //清除所有的li
            let all_li=select_ul.children;
            Array.from(all_li).forEach(item=>{
                select_ul.removeChild(item);
            })

            /**
             * 移除select_ul
             */
            document.body.removeChild(select_ul);

        }

    })

    /**
     * 整个文档添加鼠标点击事件
     */
    document.addEventListener("mouseup",e=>{
        if(!e.target||!select.contains(e.target)){
            select_ul=document.querySelector(".select-items");
            if(select_ul!=null){

                //清空所有的li标签
                let all_li=select_ul.children;
                Array.from(all_li).forEach(item=>{
                    select_ul.removeChild(item);
                })

                //清除select_ul
                document.body.removeChild(select_ul);

            }
        }
    })

    /**
     * 文档版本叉的点击事件
     */
    let version_input=document.querySelector(".version-input");
    let version_input_version=version_input.getElementsByTagName("input")[0];
    let version_input_cha=version_input.querySelector(".cha");
    version_input_cha.addEventListener("click",()=>{
        version_input_version.value="";
    })

})
/**
 * 复用ERP号
 */
.then(_=>{

    /**
     * 已添加的tags数组
     */
    let AddedTags=new Array();

    /**
     * 复用ERP号相关的重要DOM
     */
    //输入框
    const ERP_input=document.querySelector(".container-UploadDocument .content .reuse-ERP .reuse-ERP-input input");
    //叉号
    const ERP_input_cha=document.querySelector(".container-UploadDocument .content .reuse-ERP .reuse-ERP-input .cha");
    //添加按钮
    const ERP_add_button=document.querySelector(".container-UploadDocument .content .reuse-ERP button");
    //添加tag标签的框体
    const ERP_tags_content=document.querySelector(".container-UploadDocument .content .addERPs .ERP-content");
    //已添加复用ERP号的计数器
    const ERP_added_count=document.querySelector(".container-UploadDocument .content .addERPs .ERP-details span");
    //移除所有按钮
    const ERP_removeAll_button=document.querySelector(".container-UploadDocument .content .addERPs .ERP-details button");
    
    /**
     * 叉号的点击事件
     */
    ERP_input_cha.addEventListener("click",()=>{
    ERP_input.value="";
    })

    /**
     * 添加按钮的点击事件
     */
    ERP_add_button.addEventListener("click",()=>{

        /**
         * 输入框的值
         * 特点:
         * 将多个空格替换为一个空格
         */
        let InputValue=ERP_input.value.replace(/\s+/g, ' ');
        console.log("输入框的值:",InputValue);

        /**
         * 如果输入框的值不为空
         * 并且已经添加的tag不包含这个值
         */
        if(InputValue.length>0){
            if(AddedTags.includes(InputValue)){
                let message="复用ERP号\""+InputValue+"\"已添加\n请不要重复添加!";
                alert(message)
            }else{
                AddedTags.push(InputValue);

                /**
                 * 根据AddedTags创建tags
                 * 而不是借助一个输入框的值来创建
                 */

                /**
                 * 创建之前先清空所有的tag
                 */
                ERP_tags_content.querySelectorAll(".tag").forEach(tag=>tag.remove());

                /**
                 *AddedTags值的特点:
                * 先添加的在前,后添加的在后
                * 显示的时候
                * 需要将后添加的显示在第一位
                * 因此需要反转数组
                */
                AddedTags.slice().reverse().forEach(tag=>{
            
                    let span=document.createElement("span");
                    span.className="tag";
                    span.innerHTML=`${tag}
                        <img src="Pictures/error.png" alt="">`;
                    
                    //tag的点击事件
                    span.addEventListener("click",e=>{
            
                        //要删除的tag在AddedTags中的索引
                        let index=AddedTags.indexOf(tag);
                        //重组删除之后的tags数组
                        AddedTags=[...AddedTags.slice(0,index),...AddedTags.slice(index+1)];
                        //移除img的父级元素
                        e.target.parentElement.remove();
                        //聚焦在输入框上
                        ERP_input.focus();
                        //修改数量
                        ERP_added_count.innerText=AddedTags.length;
            
                    })
            
                    ERP_tags_content.appendChild(span);
                })
            
                //聚焦在输入框上
                ERP_input.focus();
                //修改数量
                ERP_added_count.innerText=AddedTags.length;
            }
        }

        /**
         * 点击之后将输入框的值清空
         */
        ERP_input.value="";
    })

    /**
     * 移除所有的点击事件
     */
    ERP_removeAll_button.addEventListener("click",()=>{
        //清空AddedTags数组
        AddedTags.length=0;
        //移除ERP_tags_content下面所有的tag
        ERP_tags_content.querySelectorAll(".tag").forEach(tag=>tag.remove());
        //聚焦在输入框上
        ERP_input.focus();
        //修改数量
        ERP_added_count.innerText=AddedTags.length;
    })

})
/**
 * 底部的确认和取消按钮
 */
.then(_=>{

    let buttons=document.querySelector(".footer").getElementsByTagName("input");
    let confirmBtn=buttons[0];
    let cancelBtn=buttons[1];

    /**
     * 确认按钮的点击事件
     */
    confirmBtn.addEventListener("click",()=>{

        //实际所有人
        let select_input=document.querySelector(".select-input").
        getElementsByTagName("input")[0];

        //文档版本
        let version_input=document.querySelector(".version-input").
        getElementsByTagName("input")[0];

        let ActualAccount=select_input.value;
        console.log("实际账号:",ActualAccount);

        let DocumentVersion=version_input.value;
        console.log("文档版本:",DocumentVersion);
        
        //添加tag标签的框体
        const ERP_tags_content=document.querySelector(".container-UploadDocument .content .addERPs .ERP-content");
        //所有的tag(DOM)
        let AllTagsDom=ERP_tags_content.querySelectorAll(".tag");
        //复用ERP号
        let ReuseERPNumbers="";
        if (AllTagsDom!=null) {
            AllTagsDom.forEach((TagDom,index)=>{
                
                //去掉末尾的一个空格
                let TagValue=TagDom.innerText;
                if (TagValue.charAt(TagValue.length - 1) == " ") {
                    TagValue = TagValue.substr(0, TagValue.length - 1);
                }

                ReuseERPNumbers+=TagValue;
                if (index<AllTagsDom.length-1) {
                    ReuseERPNumbers+=",";
                }
            })
        }
        console.log("复用ERP号:",ReuseERPNumbers);

        /**
         * 检测
         * 实际账号必须有
         * 且必须是配置文件中规定的格式
         */
        if (ActualAccount=="") {

            let message="文档实际所有者未选择!";
            alert(message);

        }else{

            /**
             * 判断填写的实际账号是否是指定值
             * 即:是否点选了
             */
            let if_click_choose=AllActualAccount.find(item=>{
                return item==ActualAccount;
            })

            /**
             * 如果没有点选
             * 弹出错误提示
             */
            if (!if_click_choose) {
                message="请输入文档实际所有者后进行点选!";
                alert(message);
            }else{
                message="文档实际所有者:"+ActualAccount+"\n";
                message+="文档版本:"+DocumentVersion+"\n";
                message+="复用ERP号:"+ReuseERPNumbers;
                alert(message);
            }

        }

    })

    /**
     * 取消按钮的点击事件
     */
    cancelBtn.addEventListener("click",()=>{
        let container=document.querySelector(".container-UploadDocument");
        document.body.removeChild(container);
    })

})

function getPosition(el){
    let top = 0;
    let left = 0;
    while (el && el.tagName !== 'BODY') {
        top += el.offsetTop;
        left += el.offsetLeft;
        el = el.offsetParent;
    };
    return {top,left};

}

// /**
//  * 计算当前tag的数量
//  */
// function countTags(ERP_input,AddedTags,ERP_added_count){
//     //聚焦在输入框上
//     ERP_input.focus();
//     //修改数量
//     ERP_added_count.innerText=AddedTags.length;
// }

