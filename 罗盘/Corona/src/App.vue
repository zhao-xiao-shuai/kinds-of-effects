<template>
    <div id="app">
        <Conora :CoronaData="CoronaData"></Conora>
    </div>
</template>

<script>
import Conora from "./components/Corona.vue"
export default {
    name: 'App',
    components: {
        Conora
    },
    data(){
        return {
            CoronaData:{
                //基础大小(可不给)
                // ToggleSize:100,
                //放大比例(可不给)
                // ZoomRatio:3,
                //菜单图标大小(可不给)
                ItemToggleIconSize:25,
                //中心图标
                ToggleIcon:"icon-shuaxinliebiao1",
                //中心图标大小(可不给)
                // MiddleToggleIconSize:30,
                MenuData:[
                    {
                        icon:"icon-gaojisousuo4",
                        disabled:false,
                        tooltipText:"图标1",
                        tooltipLocation:"top",
                        handle:this.handle1
                    },
                    {
                        icon:"icon-gaojisousuo4",
                        disabled:false,
                        tooltipText:"图标2",
                        tooltipLocation:"right",
                        handle:this.handle2
                    },
                    {
                        icon:"icon-gaojisousuo4",
                        disabled:false,
                        tooltipText:"图标3",
                        tooltipLocation:"right",
                        handle:this.handle3
                    },
                    {
                        icon:"icon-gaojisousuo4",
                        disabled:false,
                        tooltipText:"图标4",
                        tooltipLocation:"bottom",
                        handle:this.handle4
                    },
                    {
                        icon:"icon-gaojisousuo4",
                        disabled:false,
                        tooltipText:"图标5",
                        tooltipLocation:"left",
                        handle:this.handle5
                    },
                    {
                        icon:"icon-gaojisousuo4",
                        disabled:false,
                        tooltipText:"图标6",
                        tooltipLocation:"left",
                        handle:this.handle6
                    },
                ]
            }
        }
    },
    methods:{
        handle1(){
            console.log("图标1");
        },
        handle2(){
            console.log("图标2");
        },
        handle3(){
            console.log("图标3");
        },
        handle4(){
            console.log("图标4");
        },
        handle5(){
            console.log("图标5");
        },
        handle6(){
            console.log("图标6");
        }
    }
}
</script>

<style lang="less">

</style>
