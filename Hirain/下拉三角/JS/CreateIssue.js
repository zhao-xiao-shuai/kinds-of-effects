const CreatedIssueModule={

    //开启命名空间
    namespaced:true,

    state:{
        selected_files:[]
    },

    mutations:{
        push_selected_files(state,ev){
            //无需再点上子共享模块的名称
            state.selected_files.push(ev.file);
        }
    },

    actions:{

    }
}
export default CreatedIssueModule;