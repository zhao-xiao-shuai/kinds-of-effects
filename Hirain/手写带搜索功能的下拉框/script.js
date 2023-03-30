//所有人员
let persons=new Array();
//角色信息
let roles=new Array();
//公共账号和实际账号的匹配数据
let matching=new Object();
//公共账号
let PublicAccount={
    account:"BJ-CAE",
    id:"xxxxxxxxx",
    name:"AE北京机械结构部"
};
//公共账号匹配到的所有实际账号
let AllActualAccount=new Array();

window.onload=function(){

    Promise.resolve()
    .then(_=>{
        fetch("persons.json")
        .then(response=>{
            return response.json();
        })
        .then(value=>{
            // console.log("所有的人员:");
            // console.dir(value);
            persons=value;
        })
    })
    .then(_=>{
        return fetch("roles.json")
        .then(response=>{
            return response.json();
        })
        .then(value=>{
            // console.log("所有的角色信息:");
            // console.dir(value);
            roles=value;
        })
    })
    .then(_=>{
        return fetch("matching.json")
        .then(response=>{
            return response.json();
        })
        .then(value=>{
            console.log("公共账号和实际账号的匹配信息:");
            console.dir(value);
            matching=value;
        })
    })
    /**
     * 设置public-account输入框(公共账号)的显示值
     */
    .then(_=>{
        let public_account=document.querySelector(".public-account");
        public_account.value=PublicAccount.account+"("+
        PublicAccount.name+")";
    })
    /**
     * 获取当前公共账号对应的所有实际账号的信息
     */
    .then(_=>{
        for (const key in matching.UserMapping) {
            if (matching.UserMapping[key].PublicAccount==
                PublicAccount.account) {
                AllActualAccount.push({
                    account:key,
                    name:"张三",
                    id:"xxxxxx"
                });
            }
        }
        console.log("当前公共账号对应的所有实际账号的信息:");
        console.log(AllActualAccount);
    })
    .then(_=>{

        //第一部分
        let part1=document.querySelector(".part1");

        //流程发起人
        let select=part1.querySelector(".select");
        let select_input=select.querySelector(".select-input");
        let select_input_input=select_input.querySelector("input");
        let select_input_cha=select_input.querySelector(".cha");
        create_search_select(select,select_input_input,select_input_cha,AllActualAccount);

        //第二部分
        let part2=document.querySelector(".part2");
        
        //第二部分的所有line
        let all_lines=part2.querySelectorAll(".line");
        all_lines.forEach((line,lineIndex)=>{

            /**
             * 设置label下面的span标签的值
             */
            let label=line.querySelector(".label");
            let span_temp=label.querySelector("span");
            let label_temp=roles.filter(item=>{
                return item.index==lineIndex;
            });
            span_temp.innerText=label_temp[0].label;
            
            /**
             * 创建可搜索下拉框
             */
            let select=line.querySelector(".select");
            let select_input=select.querySelector(".input");
            let select_input_input=select_input.querySelector("input");
            let select_input_cha=select_input.querySelector(".cha");
            create_search_select(select,select_input_input,select_input_cha,persons);

        })

    })
    .then(_=>{

        let confirmBtn=document.getElementById("confirm");
        let resetBtn=document.getElementById("reset");
        let cancelBtn=document.getElementById("cancel");

        /**
         * 确认按钮的点击事件
         */
        confirmBtn.addEventListener("click",()=>{

            /**
             * 流程实际发起人
             */
            let part1=document.querySelector(".part1");
            let temp=part1.querySelector(".select-input")
                .getElementsByTagName("input")[0].value;
            console.log("流程实际发起人:",temp);
            if(temp==""){
                alert("请选择流程实际发起人!");
            }else{
                let ActualInitiator=AllActualAccount.find(item=>{
                    let str=item.account+"("+item.name+")";
                    return str==temp;
                })
                if(ActualInitiator==undefined){
                    alert("流程实际发起人不是标准的人员信息,请重新填写!");
                }else{

                    let part2=document.querySelector(".part2");

                    let AllApproverInformation=new Array();
                    let all_lines=part2.querySelectorAll(".line");
                    all_lines.forEach(line=>{
        
                        //获取label的值
                        let label_value=line.querySelector(".label").querySelector("span").innerText;
                        // console.log("label的值:",label_value);
        
                        //获取input的值
                        let input_value=line.getElementsByTagName("input")[0].value;
                        // console.log("input的值:",input_value);
        
                        let single_information={
                            "role":label_value,
                            "person":input_value
                        };
        
                        AllApproverInformation.push(single_information);
                    })
        
                    //所有的信息
                    console.log("所有的信息:");
                    console.dir(AllApproverInformation);
        
                    /**
                     * 汇总所有的漏填数据
                     */
                    let miss_array=new Array();
                    AllApproverInformation.forEach(item=>{
                        if(item.person==""){
                            miss_array.push(item);
                        }
                    })
                    // console.log("miss_array:",miss_array);
        
                    if(miss_array.length>0){
        
                        /**
                         * 汇总漏填的报错信息
                         */
                        let message="存在漏选的审批人!\n\n";
                        miss_array.forEach((miss,miss_index)=>{
                            message=message+"("+(miss_index+1)+")"+miss.role+"\n";
                        })
                        alert(message);
        
                    }else{
        
                        /**
                         * 汇总所有的非人员数据
                        */
                        let not_person_array=new Array();
                        AllApproverInformation.forEach(item=>{
                            let if_in=persons.some(element=>{
                                let temp=element.account+"("+element.name+")"
                                return item.person==temp;
                            })
                            // console.log("if_in:",if_in);
                            if(!if_in){
                                not_person_array.push(item);
                            }
                        })
        
                        // console.log("not_person_array:",not_person_array);
        
                        /**
                         * 汇总非人员数据的报错信息
                         */
                        let message="所填的值不是标准的人员信息,请重新填写!\n\n";
                        if(not_person_array.length>0){
                            not_person_array.forEach((not_person,not_person_index)=>{
                                message=message+"("+(not_person_index+1)+")"+not_person.role+"\n";
                            })
                            alert(message);
                        }
        
                    }

                }
            }
        })
    })
}

/**
 * 创建可搜索下拉框
 * select----类名为select的dom元素
 * OriginData----下拉框的源数据
 */
function create_search_select(select,select_input_input,select_input_cha,OriginData){

    //下拉框选项的显示
    let z_index=1000;

    //下拉选项的宽度
    let li_width=250;

    let select_ul;

    /**
     * 可搜索输入框的输入事件
     */
    select_input_input.addEventListener("input",()=>{

        /**
         * 获取select在body中的位置
         */
        let {top,left}=getPositionInBody(select);
        top=top+35;
        left=left+4;

        /**
         * 如果select下没有ul,创建
         */
        select_ul=document.querySelector(".select-items");
        if (select_ul==null) {
            
            select_ul=document.createElement("ul");
            select_ul.className="select-items";
            select_ul.setAttribute("style","display:flex;"+
                "flex-direction:column;"+
                "box-sizing:border-box;"+
                "z-index:"+z_index+";"+
                "position:absolute;"+
                "left:"+left+"px;"+
                "top:"+top+"px;"+
                "border:1px solid black;"+
                "box-shadow:0 10px 40px rgba(0,0,0,0.2);"+
                "list-style:none;"+
                "margin:0;"+
                "padding:0;");
            document.body.appendChild(select_ul);
        
        }

        /**
         * 1.清除所有的li标签
         */
        let all_li=select_ul.children;
        Array.from(all_li).forEach(item=>{
            select_ul.removeChild(item);
        })

        /**
         * 2.设置叉号的触发事件
         * (1)清除input标签的value属性值
         * (2)清除所有的li标签
         * (3)清除ul标签
         */
        select_input_cha.addEventListener("click",()=>{

            //清除input标签的value属性值
            select_input_input.value="";

            select_ul=document.querySelector(".select-item");
            if(select_ul!=null){

                //清除所有的li标签
                let all_li=select_ul.children;
                Array.from(all_li).forEach(item=>{
                    select_ul.removeChild(item);
                })
                
                //清除ul
                document.body.removeChild(select_ul);
            }

        })

        /**
         * 3.根据输入框的输入值动态创建li标签
         * 只有输入框当前值不为空
         * 才进行搜索
         */
        let InputCurrentValue=select_input_input.value;
        if(InputCurrentValue!=""){

            /**
             * 可搜索下拉框的数据源
             */
            // console.log("数据源:",OriginData);

            let SearchResult=OriginData.filter(item=>{
                return item.account.substr(0,InputCurrentValue.length)==InputCurrentValue;
            })

            // console.log("搜索结果:",SearchResult);
        
            /**
             * 如果没有搜索到
             * 显示"没有搜索到..."的选项
             */
            if(SearchResult.length==0){
        
                //创建li标签
                let li=document.createElement("li");
                li.innerText="没有搜索到...";
                li.setAttribute("style","box-sizing:border-box;"+
                    "height:30px;"+
                    "width:"+li_width+"px;"+
                    "line-height:30px;"+
                    "padding-left:5px;"+
                    "list-style:none;"+
                    "background:white;"+
                    "color:black;"+
                    "font-size:14px;"+
                    "font-weight:bold;"+
                    "cursor:pointer;"+
                    "white-spacing:norwap;"+
                    "overflow:hidden;"+
                    "text-overflow:ellipsis;");
                select_ul.appendChild(li);
        
                //给li标签添加hover效果
                li.addEventListener("mouseover",()=>{
                    li.style.background="#d7e4e7";
                })
                li.addEventListener("mouseout",()=>{
                    li.style.background="white";
                })

                /**
                 * 当点击了"没有搜索到..."时
                 * 除了触发blur事件
                 * 还应该清空input标签
                 */
                li.addEventListener("mousedown",()=>{
                    select_input_input.value="";
                })
        
            /**
             * 如果搜索到了
             * 正常显示选项
             */    
            }else{
                
                /**
                 * 循环创建li标签
                 */
                SearchResult.forEach((item,li_index)=>{
        
                    //创建li标签
                    let li=document.createElement("li");
                    li.innerHTML=item.account+"("+item.name+")";
                    li.setAttribute("style","box-sizing:border-box;"+
                        "height:30px;"+
                        "width:"+li_width+"px;"+
                        "line-height:30px;"+
                        "padding-left:5px;"+
                        "list-style:none;"+
                        "background:white;"+
                        "color:black;"+
                        "font-size:14px;"+
                        "font-weight:bold;"+
                        "cursor:pointer;"+
                        "white-spacing:norwap;"+
                        "overflow:hidden;"+
                        "text-overflow:ellipsis;");
                    select_ul.appendChild(li);

                    //给li标签添加hover效果
                    li.addEventListener("mouseover",()=>{
                        li.style.background="#d7e4e7";
                    })
                    li.addEventListener("mouseout",()=>{
                        li.style.background="white";
                    })
        
                    //给创建出来的li标签添加点击事件
                    li.addEventListener("mousedown",(event)=>{

                        /**
                         * 阻止浏览器的默认行为
                         * 目的:
                         * 防止mousedown事件触发input标签的blur事件
                         */
                        event.preventDefault();

                        //效果1:将li标签的值设置为input的value值
                        select_input_input.value=li.innerText;

                        //效果2:移除所有的li
                        let all_li=select_ul.children;
                        Array.from(all_li).forEach(item=>{
                            select_ul.removeChild(item);
                        })

                        //效果3:移除ul
                        let ul_temp=document.querySelector(".select-items");
                        if(ul_temp!=null){
                            document.body.removeChild(ul_temp);
                        }

                    });

                })

            }

        }else{
            /**
             * 输入框为空的时候
             * 移除select_ul
             */
            let ul_temp=document.querySelector(".select-item");
            if(ul_temp!=null){
                document.body.removeChild(ul_temp);
            }
        }

    })

    /**
     * 可搜索输入框的焦点移出事件
     */
    select_input_input.addEventListener("blur",()=>{

        let ul_temp=document.querySelector(".select-items");
        if(ul_temp!=null){

            //清除所有的li标签
            let all_li=select_ul.children;
            Array.from(all_li).forEach(item=>{
                select_ul.removeChild(item);
            })

            //移除select_ul
            document.body.removeChild(ul_temp);

        }

    })

}

/**
 * 获取指定DOM元素在body上的位置
 */
function getPositionInBody(el){
    let top=0;
    let left=0;
    while(el&&el.tagName!="BODY"){
        top+=el.offsetTop;
        left+=el.offsetLeft;
        el=el.offsetParent;
    }
    return {top,left};
}

