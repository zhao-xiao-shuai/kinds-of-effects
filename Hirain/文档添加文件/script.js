/**
 * 模拟请求得到的文档信息
 */
let DocumentInformation=new Object();

/**
 * DOM节点
 */
//中间
let middle;

//左侧
let left;
let DocumentName;
let AlreadyHaveFile;

//右侧
let right;
let AddFile;
let InputFile;

//底部
let footer;
let ConfirmButton;
let CancelButton;

//样式中用到的变量
const root={

};

//最终点选的文件
let SelectedFiles=new Array();

//图片路径
const UploadPath="Pictures/upload.png";
const DocumentPath="Pictures/document.png";
const DeletePath="Pictures/delete.png";

/**
 * 获取文档信息
 */
fetch("DocumentInformation.json")
.then(response=>{
    return response.json();
})
.then(value=>{
    DocumentInformation=value;
    console.log("文档信息:",DocumentInformation);
})
/**
 * 获取DOM节点
 */
.then(_=>{

    Middle=document.querySelector(".middle");

    //中间
    middle=document.querySelector(".middle");

    //左侧
    left=middle.querySelector(".left");
    DocumentNameSpan=left.querySelector(".DocumentName").
        getElementsByTagName("span")[0];
    AlreadyHaveFile=left.querySelector(".already-area");

    //右侧
    right=middle.querySelector(".right");
    AddFile=right.querySelector(".AddFile");
    InputFile=AddFile.getElementsByTagName("input")[0];
    UploadedFile=right.querySelector(".uploaded-area");

    //底部
    footer=document.querySelector(".footer");
    ConfirmButton=footer.getElementsByTagName("input")[0];
    CancelButton=footer.getElementsByTagName("input")[0];
})
/**
 * 左侧
 */
.then(_=>{

    /**
     * 设置文档名称
     */
    DocumentNameSpan.innerText=DocumentInformation.DocumentName;

    /**
     * 设置文档下的已有文件
     */
    DocumentInformation.DocumentFiles.forEach(File=>{

        let {FileName,FileSize}=File;
        FileSize=returnFileSize(FileSize);

        LeftAppend(AlreadyHaveFile,{FileName,FileSize,DocumentPath});
    })

   
})
/**
 * 右侧
 */
.then(_=>{

    /**
     * 点击AddFile区域
     * 触发文件选择器
     */
    AddFile.addEventListener("click",()=>{
        InputFile.click();
    })

    /**
     * 获取点选的文件
     */
    let SelectedFiles=new Array();
    InputFile.addEventListener("change",function(){

        let RepeatFiles=new Array();

        /**
         * 获取目前已经点选的文件
         */
        console.log("本次点选的文件:",this.files);
        Array.from(this.files).forEach(file => {

            /**
             * 判断本地点选的文件
             * 是否和已经点选的文件发生重复
             */
            let if_repeat=SelectedFiles.find(item=>{
                return item.name===file.name;
            })
            if(if_repeat==undefined){
                SelectedFiles.push(file);
            }else{
                RepeatFiles.push(file);
            }
            
        });
        console.log("已经点选的文件:",SelectedFiles);

        if(RepeatFiles.length>0){

            let message="下述文件已经点选过,请不要重复点选!\n";
            RepeatFiles.forEach((File,index)=>{
                message+="("+(index+1)+")"+File.name+"\n";
            })
            alert(message);
            
        }

        /**
         * 将已经点选的文件显示出来
         */
        RightAppend(UploadedFile,SelectedFiles,{DocumentPath,DeletePath})

    })

    

    /**
     * 确认按钮的点击事件
     */
    ConfirmButton.addEventListener("click",()=>{
        console.log("点选的文件:",SelectedFiles);
    })










})

