window.onload=()=>{
    const app=new Vue({
        el:"#app",
        data:{
            value:15
        },
        mounted(){
            // setTimeout(()=>{
                setInterval(()=>{
                    this.value+=20;
                },800)
            // },1000)
        },
        components:{
            "xc-progress":{
                //模板的位置
                template:"#xcprogress",
                props:{
                    value:{
                        type:Number,
                        default:0
                    }
                },
                watch:{
                    value(newValue){
                        if (newValue>100) {
                            this.$emit("update:value",100);
                        } else if(newValue<0) {
                            this.$emit("update:value",0);
                        } else{
                            this.$emit("update:value",newValue);
                        }
                    }
                }
            }
        }
    })
}