<template>
    <div class="corona">
        <div class="toggle" @click.stop="MenuExpandFolder"
        :style="{width:!!CoronaData.ToggleSize?`${CoronaData.ToggleSize}px`:'',
        height:!!CoronaData.ToggleSize?`${CoronaData.ToggleSize}px`:''}">
            <svg class="icon" aria-hidden="true"
            :style="{width:!!CoronaData.MiddleToggleIconSize?`${CoronaData.MiddleToggleIconSize}px`:'',
            height:!!CoronaData.MiddleToggleIconSize?`${CoronaData.MiddleToggleIconSize}px`:''}">
                <use :xlink:href="`#${CoronaData.ToggleIcon}`"></use>
            </svg>
        </div>
        <div class="menu">
            <div class="menu-item"
            v-for="(item,index) in CoronaData.MenuData"
            :key="index"
            :style="{width:!!CoronaData.ItemToggleIconSize?`${CoronaData.ItemToggleIconSize}px`:'',
            height:!!CoronaData.ItemToggleIconSize?`${CoronaData.ItemToggleIconSize}px`:'',
            left:`${location[index].left}px`,
            top:`${location[index].top}px`}"
            @click="handleClick(item)">
                <el-tooltip :content="item.tooltipText" :placement="item.tooltipLocation">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="`#${item.icon}`"></use>
                    </svg>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    name:"",

    data(){
        return {
                
        };
    },
    props:{
        CoronaData:{
            type:Object,
            default:()=>{}
        }
    },
    computed:{
        /**
         * 计算所有轮盘图标的位置
         */
        location(){
            let arr=[];
            let top,left;

            //轮盘图标的数量
            let number=this.CoronaData.MenuData.length;

            //ZoomRatio
            let ZoomRatio=!!this.CoronaData.ZoomRatio?
            this.CoronaData.ZoomRatio:3;
            //ToggleSize
            let ToggleSize=!!this.CoronaData.ToggleSize?
            this.CoronaData.ToggleSize:100;
            //ItemToggleIconSize
            let ItemToggleIconSize=!!this.CoronaData.ItemToggleIconSize?
            this.CoronaData.ItemToggleIconSize:25;

            //比例:轮盘图标中心到圆心的距离
            let rate = (ZoomRatio+1)/(2*ZoomRatio);
            // console.log("rate:",rate);

            /**
             * 注意:
             * 轮盘图标编号从0点位置顺时针排列
             */
            for (let index = 0; index < number; index++) {
                
                //圆心角
                let angle=2*Math.PI/number*index;

                top=ToggleSize/2-rate*ToggleSize/2*Math.cos(angle)
                -ItemToggleIconSize/2;

                left=ToggleSize/2+rate*ToggleSize/2*Math.sin(angle)
                -ItemToggleIconSize/2;

                arr.push({top,left})
            }
            // console.log("位置数组:",arr);
            return arr;
        }
    },
    created(){
        
    },
    methods:{
        MenuExpandFolder(){
            console.log("点击");
            const toggle=document.querySelector(".corona .toggle");
            const menu=document.querySelector(".corona .menu");
            toggle.classList.toggle("active");
            menu.classList.toggle("active");
        },
        handleClick(item){
            console.log("============================");
            console.log(item.tooltipText);
            item.handle();
        }
    }


}
</script>

<style lang="less">
    @import "./Corona.less";
</style>
