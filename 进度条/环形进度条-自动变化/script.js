window.onload=()=>{

    new Vue({
        el:"#app",
        data(){
            return{
                value:0
            }
        },
        mounted(){

        },
        components:{
            "progress-bar":{
                template:"#progress-bar",
                props:{
                    value:{
                        type:Number,
                        default:0
                    }
                }
            }
        }
    })
}