<template>
    <div>
        <el-progress
            :percentage="parseInt(progressObject.progress * 100)"
            type="circle"
        ></el-progress>
        <h1>{{ progressObject.progress }}</h1>
        <el-button @click="handleClick">结束</el-button>
    </div>
</template>
<script setup>
import { reactive } from "vue";
import fakeProgress from "fake-progress";
const progressObject = reactive(
    new fakeProgress({
        timeConstant: 3000,
        autoStart: true,
    })
);
const handleClick = () => {
    progressObject.end();
};
</script>
