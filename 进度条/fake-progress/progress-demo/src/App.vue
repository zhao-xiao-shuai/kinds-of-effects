<template>
    <div>
        <el-progress
            :percentage="parseInt(progressObject.progress * 100)"
            type="circle"
        ></el-progress>
        <h1>{{ progressObject.progress }}</h1>
        <el-button @click="handleClick">结束</el-button>
        <h1>进度到{{ staticPercentage }}消耗的时间:{{ progressObject.timeWaste }}</h1>
    </div>
</template>
<script setup>
import { reactive } from "vue";
// import fakeProgress from "fake-progress";
import { myFakeProgress as fakeProgress } from "./myFakeProgress";
const staticPercentage = 0.8;
const progressObject = reactive(
    new fakeProgress({
        timeConstant: 1000,
        autoStart: true,
        staticPercentage
    })
);
const handleClick = () => {
    progressObject.end();
};
</script>
