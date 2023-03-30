//当前登录公共账号
let CurrentAccount="BJ-CAE";
//匹配数据:配置文件中的数据
let MatchingData;

//点选的文件信息
const SelectedFiles=[
    {
        FileName:"点选文件1",
        FileSize:"8kB"
    },
    {
        FileName:"点选文件2",
        FileSize:"35MB"
    },
    {
        FileName:"点选文件3",
        FileSize:"1.7GB"
    }
];

//框体的大小
const dialogHeight=560;
const dialogWidth=700;

/**
 * 数据源:
 * 当前公共账号下的所有实际账号
 */
let AllActualAccount=new Array();

//容器
const container=document.querySelector(".container-UploadDocument");
//当前公共账号的span标签:两个tab
const PublicAccountSpans=container.querySelectorAll(".public-account span");
//点选文件的展示区域
const SelectedFilesArea=container.querySelectorAll(".selected-file");
//input输入框的叉号
const InputChas=container.querySelectorAll(".input .cha");
//实际所有者
const ActualOwners=container.querySelectorAll(".ActualOwner");

//确认按钮
const confirmBtn=container.querySelectorAll(".footer input")[0];
const cancelBtn=container.querySelectorAll(".footer input")[1];

//单选按钮
const radio1=container.querySelector(".radio1");
const radio2=container.querySelector(".radio2");

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

    PublicAccountSpans.forEach(span=>{
        span.innerText=PublicAccountInformation.PublicAccount
        +"("+PublicAccountInformation.Description+")";
    })

})
/**
 * 设置点选文件
 */
.then(_=>{
    SelectedFilesArea.forEach(area=>{

        SelectedFiles.forEach(file=>{

            let li=document.createElement("li");
            li.className="row";
            li.innerHTML=
                "<img src=\"Pictures/document.png\" alt=\"\">"+
                "<div class=\"details\">"+
                    "<span class=\"name\"></span>"+
                    "<span class=\"size\"></span>"+
                "</div>";
            let name=li.querySelector(".name"),
            size=li.querySelector(".size");
            name.innerText=file.FileName;
            size.innerText=file.FileSize;
            
            area.appendChild(li);
        })

    })
})
/**
 * 设置输入框叉的点击事件
 */
.then(_=>{
    InputChas.forEach(cha=>{
        cha.addEventListener("click",(e)=>{
            let input=e.target.offsetParent.querySelector("input");
            input.value="";
        })
    })
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

    ActualOwners.forEach(ActualOwner=>{

        /**
         * 获取下拉框的宽度
         * 下拉框的宽度也是下拉选项的宽度
         */
        const OptionWidth=ActualOwner.offsetWidth-2;

        //输入框
        let input=ActualOwner.querySelector("input");

        //倒三角
        let triangle=ActualOwner.querySelector(".triangle");

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
        triangle.addEventListener("click",()=>{

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
                let {top,left}=getPosition(ActualOwner);
                top=top+35-dialogHeight/2 + 5;
                left=left+5-dialogWidth/2 - 4;

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
                    "border-radius: 5px;"+
                    "box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);"+
                    "list-style: none;"+
                    "overflow: hidden;"+
                    "margin: 0;"+
                    "padding: 0;");
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
                    li.setAttribute("style","box-sizing:border-box;height:30px;width:"+OptionWidth+"px;"+
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
                        input.value=li.innerText;

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
        input.addEventListener("input",function(){

            let {top,left}=getPosition(ActualOwner);
            top=top+35-dialogHeight/2 + 5;
            left=left+5-dialogWidth/2 - 4;

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
                    "border-radius: 5px;"+
                    "box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);"+
                    "list-style: none;"+
                    "overflow: hidden;"+
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
            let InputCurrentValue=input.value;
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
                    li.setAttribute("style","box-sizing:border-box;height:30px;width:"+OptionWidth+"px;"+
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
                        input.value="";
                    })

                //搜索到,正常显示
                } else {

                    //循环创建li标签
                    SearchResult.forEach(item=>{

                        //创建li标签
                        let li=document.createElement("li");
                        li.innerHTML=item;
                        li.setAttribute("style","box-sizing:border-box;height:30px;width:"+OptionWidth+"px;"+
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
                            input.value=li.innerText;

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
        input.addEventListener("blur",function(){

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
            if(!e.target||!ActualOwner.contains(e.target)){
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

    })

    // /**
    //  * 整个文档添加鼠标点击事件
    //  */
    // document.addEventListener("mouseup",e=>{
    //     if(!e.target||!ActualOwner.contains(e.target)){
    //         select_ul=document.querySelector(".select-items");
    //         if(select_ul!=null){

    //             //清空所有的li标签
    //             let all_li=select_ul.children;
    //             Array.from(all_li).forEach(item=>{
    //                 select_ul.removeChild(item);
    //             })

    //             //清除select_ul
    //             document.body.removeChild(select_ul);

    //         }
    //     }
    // })


})
/**
 * 复用ERP号相关
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
     const ERP_input=container.querySelector(".content .ERP input");
     //叉号
     const ERP_input_cha=container.querySelector(".content .ERP .cha");
     //添加按钮
     const ERP_add_button=container.querySelector(".content .ERP button");
     //添加tag标签的框体
     const ERP_tags_content=container.querySelector(".content .addERPs .ERP-content");
     //已添加复用ERP号的计数器
     const ERP_added_count=container.querySelector(".content .addERPs .ERP-details span");
     //移除所有按钮
     const ERP_removeAll_button=container.querySelector(".content .addERPs .ERP-details button");
     
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
        //  console.log("输入框的值:",InputValue);
 
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
 * 按钮的点击事件
 */
.then(_=>{

    //确认按钮的点击事件
    confirmBtn.addEventListener("click",()=>{

        const tab1=container.querySelectorAll(".content .tab")[0];
        const tab2=container.querySelectorAll(".content .tab")[1];

        //tab1被激活
        if(radio1.checked){

            //文档名称
            let DocumentNameInput=tab1.querySelector(".right .DocumentName").
            getElementsByTagName("input")[0];
            let DocumentName=DocumentNameInput.value;
            console.log("文档名称:",DocumentName);

            //文档实际所有者
            let ActualOwnerInput=tab1.querySelector(".right .ActualOwner").
            getElementsByTagName("input")[0];
            let ActualAccount=ActualOwnerInput.value;
            console.log("实际账号:",ActualAccount);

            //文档版本
            let DocumentVersionInput=tab1.querySelector(".right .DocumentVersion").
            getElementsByTagName("input")[0];
            let DocumentVersion=DocumentVersionInput.value;
            console.log("文档版本:",DocumentVersion);

            /**
             * 复用ERP号
             */
            //添加tag标签的框体
            const ERP_tags_content=tab1.querySelector(".right .addERPs .ERP-content");
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

        }



        //tab2被激活
        if(radio2.checked){

            //文档实际所有者
            let ActualOwnerInput=tab2.querySelector(".right .ActualOwner").
            getElementsByTagName("input")[0];
            let ActualAccount=ActualOwnerInput.value;
            console.log("实际账号:",ActualAccount);

        }
        
    })

    //取消按钮的点击事件
    cancelBtn.addEventListener("click",()=>{
        container.remove();
    })



    // /**
    //  * 确认按钮的点击事件
    //  */
    // let ul_lis=document.querySelector(".content").children;
    // Array.from(ul_lis).forEach((li,li_index)=>{

    //     let buttons=li.querySelector(".footer").getElementsByTagName("input");
    //     let confirmBtn=buttons[0];
    //     let cancelBtn=buttons[1];

    //     /**
    //      * 第一个tab页
    //      */
    //     if(li_index==0){

    //         /**
    //          * 第一个tab页
    //          * 确认按钮的点击事件
    //          */
    //         confirmBtn.addEventListener("click",()=>{

    //             console.log("************************************************");

    //             //文档名称input标签
    //             let type_input=li.querySelector(".type-input").
    //             getElementsByTagName("input")[0];

    //             let DocumentName=type_input.value;
    //             console.log("文档名称:",DocumentName);

    //             //实际所有人
    //             let select_input=li.querySelector(".select-input").
    //             getElementsByTagName("input")[0];

    //             let ActualAccount=select_input.value;
    //             console.log("实际账号:",ActualAccount);

    //             /**
    //              * 检测
    //              * 1.文档名称必须填
    //              * 2.实际账号必须有,且必须是配置文件中规定的格式
    //              */
    //             if (DocumentName==""&&ActualAccount=="") {
    //                 let message="存在没有填写或选择的信息!\n";
    //                 message+="(1)文档名称\n";
    //                 message+="(2)文档实际所有者\n";
    //                 alert(message);
    //             }else if(DocumentName!=""&&ActualAccount==""){
    //                 let message="文档名称未填写!";
    //                 alert(message);
    //             }else if(DocumentName==""&&ActualAccount!=""){
    //                 let message="文档实际所有者未选择!";
    //                 alert(message);
    //             }else{

    //                 /**
    //                  * 判断填写的实际账号是否是指定值
    //                  * 即:是否点选了
    //                  */
    //                 let if_click_choose=AllActualAccount.find(item=>{
    //                     return item==ActualAccount;
    //                 })

    //                 /**
    //                  * 如果没有点选
    //                  * 弹出错误提示
    //                  */
    //                 if (!if_click_choose) {
    //                     let message="请输入文档实际所有者后进行点选!";
    //                     alert(message);
    //                 }else{
    //                     let message="文档名称:"+DocumentName+"\n";
    //                     message+="文档实际所有者:"+ActualAccount+"\n";
    //                     alert(message);
    //                 }

    //             }

    //         })


    //     /**
    //      * 第二个tab页
    //      */
    //     }else if(li_index==1){

    //         /**
    //          * 第二个tab页
    //          * 确认按钮的点击事件
    //          */
    //         confirmBtn.addEventListener("click",()=>{

    //             //实际所有人
    //             let select_input=li.querySelector(".select-input").
    //             getElementsByTagName("input")[0];

    //             let ActualAccount=select_input.value;
    //             console.log("实际账号:",ActualAccount);

    //             /**
    //              * 检测
    //              * 1.实际账号必须有,且必须是配置文件中规定的格式
    //              */
    //             if (ActualAccount=="") {
    //                 let message="文档实际所有者未选择!\n";
    //                 alert(message);
    //             }else{

    //                 /**
    //                  * 判断填写的实际账号是否是指定值
    //                  * 即:是否点选了
    //                  */
    //                 let if_click_choose=AllActualAccount.find(item=>{
    //                     return item==ActualAccount;
    //                 })

    //                 /**
    //                  * 如果没有点选
    //                  * 弹出错误提示
    //                  */
    //                 if (!if_click_choose) {
    //                     let message="请输入文档实际所有者后进行点选!";
    //                     alert(message);
    //                 }else{
    //                     let message="文档实际所有者:"+ActualAccount+"\n";
    //                     alert(message);
    //                 }

    //             }

    //         })

    //     }

    // })

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
