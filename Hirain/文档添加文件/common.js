/**
 * 将字节数转为常见的大小
 * 包括:B/kB/MB/GB
 */
 function returnFileSize(number) {
    if(number < 1024) {
        return number + 'B';
    } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576 && number < 1073741824) {
        return (number/1048576).toFixed(1) + 'GB';
    }
}

/**
 * 针对左侧
 * 创建一个文件列表项
 * 添加到AlreadyHaveFile这个DOM元素上
 */
function LeftAppend(AlreadyHaveFile,{FileName,FileSize,DocumentPath}){

    const root={
        file_padding_up_down:"10px",
        file_padding_left_right:"10px",
        box_background:"#E9F0FF",
        document_img_width:"30px",
        document_img_height:"30px"
    }

    let li=document.createElement("li");
    li.className="row";
    li.innerHTML=
        "<img alt=\"\">"+
        "<div class=\"details\">"+
            "<span class=\"name\"></span>"+
            "<span class=\"size\"></span>"+
        "</div>"
    li.setAttribute("style",
        "width:100%;"+
        "box-sizing:border-box;"+
        /* 间距 */
        "margin-bottom: 10px;"+
        "padding: "+root.file_padding_up_down+" "+root.file_padding_left_right+";"+
        /* 样式 */
        "background: "+root.box_background+";"+
        "list-style: none;"+
        "border-radius: 5px;"+
        /* 布局 */
        // "display: flex;"+
        // "align-items: center;"+
        "display: grid;"+
        "grid-template-columns: 30px calc(100% - 30px);"+
        /* 定位 */
        "position: relative;"
    )

    //图片的地址
    let img=li.getElementsByTagName("img")[0];
    img.src=DocumentPath;
    img.setAttribute("style",
        "width: "+root.document_img_width+";"+
        "height: "+root.document_img_height+";"
    )

    let details=li.querySelector(".details");
    details.setAttribute("style",
        /* 布局 */
        "display: flex;"+
        "flex-direction: column;"+
        /* 间距 */
        "margin-left: 5px;"
    )

    //文件名称
    let name=li.querySelector(".name");
    name.innerText=FileName;
    name.setAttribute("style",
        /* 样式 */
        "font-size: 14px;"+
        "font-weight: bolder;"+
        //文字过长点点点
        "white-space:nowrap;"+
        "overflow:hidden;"+
        "text-overflow:ellipsis;"
    )

    //文件大小
    let size=li.querySelector(".size");
    size.innerText=FileSize;
    size.setAttribute("style",
        "font-size: 12px;"
    )

    AlreadyHaveFile.appendChild(li);

}

/**
 * 针对右侧
 * 对于已点选的所有文件
 * 重新生成文件列表
 */
function RightAppend(UploadedFile,SelectedFiles,{DocumentPath,DeletePath}){

    const root={
        file_padding_up_down:"10px",
        file_padding_left_right:"10px",
        box_background:"#E9F0FF",
        document_img_width:"30px",
        document_img_height:"30px",
        delete_img_width:"25px",
        delete_img_height:"25px"
    }

    /**
     * 清空UploadedFile下面的已点选文件列表
     */
    let AllRows=UploadedFile.querySelectorAll(".row");
    AllRows.forEach(row=>{
        UploadedFile.removeChild(row);
    })

    /**
     * 将点选的文件名称显示出来
     */
    SelectedFiles.forEach(File=>{

        const FileName=File.name;
        const FileSize=returnFileSize(File.size);

        const row=document.createElement("li");
        row.className="row";
        row.innerHTML=
        "<div class=\"content\">"+
            "<img alt=\"\">"+
            "<div class=\"details\">"+
                "<span class=\"name\"></span>"+
                "<span class=\"size\"></span>"+
            "</div>"+
        "</div>"+
        "<img class=\"delete\" alt=\"\">";
        row.setAttribute("style",
            "width:100%;"+
            "box-sizing:border-box;"+
            /* 间距 */
            "margin-bottom: 10px;"+
            "padding: "+root.file_padding_up_down+" "+root.file_padding_left_right+";"+
            /* 样式 */
            "background: "+root.box_background+";"+
            "list-style: none;"+
            "border-radius: 5px;"+
            /* 布局 */
            "display: flex;"+
            "align-items: center;"+
            /* 定位 */
            "position: relative;"
        )
        UploadedFile.appendChild(row);

        /**
         * 文件信息显示区域
         * content
         */
        const content=row.querySelector(".content");
        content.setAttribute("style",
            //布局
            "display: grid;"+
            "grid-template-columns: 30px calc(100% - 30px);"+
            "width:calc(100% - 25px);"
        )

        /**
         * 文档图片
         * img
         */
        const DocumentImg=content.getElementsByTagName("img")[0];
        DocumentImg.src=DocumentPath;
        DocumentImg.setAttribute("style",
            "width: "+root.document_img_width+";"+
            "height: "+root.document_img_height+";"
        )

        /**
         * 信息细节
         * datails
         */
        const details=content.querySelector(".details");
        details.setAttribute("style",
            /* 布局 */
            "display: flex;"+
            "flex-direction: column;"+
            /* 间距 */
            "margin-left: 5px;"
        )

        /**
         * 文件名称
         * name
         */
        const name=details.querySelector(".name");
        name.innerText=FileName;
        name.setAttribute("style",
            /* 样式 */
            "font-size: 14px;"+
            "font-weight: bolder;"+
            //文字过长点点点
            "white-space:nowrap;"+
            "overflow:hidden;"+
            "text-overflow:ellipsis;"
        )

        /**
         * 文件大小
         * size
         */
        const size=details.querySelector(".size");
        size.innerText=FileSize;
        size.setAttribute("style",
            /* 样式 */
            "font-size: 12px;"
        )

        /**
         * 删除图片
         * img
         */
        const DeleteImg=row.querySelector(".delete");
        DeleteImg.src=DeletePath;
        DeleteImg.setAttribute("style",
            /* 大小 */
            "width: "+root.delete_img_width+";"+
            "height: "+root.delete_img_height+";"+
            /* 定位 */
            // "position: absolute;"+
            // "right: 10px;"+
            "float: right;"+
            "position: absolute;"+
            "right: 10px;"+
            /* 样式 */
            "cursor: pointer;"+
            /* 显示:默认不显示 */
            "opacity: 0;"+
            /* 过渡 */
            "transition: opacity 0.3s;"
        )

        /**
         * row的hover效果
         * 显示delete图片
         */
        row.addEventListener("mouseover",()=>{
            DeleteImg.style.opacity=1;
        })
        row.addEventListener("mouseout",()=>{
            DeleteImg.style.opacity=0;
        })

        /**
         * delete图片的点击事件
         */
        DeleteImg.addEventListener("click",(e)=>{

            //获取对应文件的名称
            const ParentElement=e.target.parentElement;
            const FileNameSpan=ParentElement.querySelector(".name");
            let FileName=FileNameSpan.innerText;
            console.log("文件名称:",FileName);

            /**
             * 从SelectedFiles中删除指定文件名称的文件对象
             */
            let index=SelectedFiles.findIndex(item=>{
                return item.name===FileName;
            })
            // console.log("在SelectedFiles中的索引:",index);
            SelectedFiles.splice(index,1);
            // console.log("删除之后的SelectedFiles:",SelectedFiles);

            //移除指定文件的dom元素
            let AllRows=UploadedFile.querySelectorAll(".row");
            AllRows.forEach((row,row_index)=>{
                if (row_index==index) {
                    UploadedFile.removeChild(row);
                }
            })
        })

    })




}