<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header">
                <h4 class="gradient-title">"AI探索者"数据审核平台</h4>

                <div class="h2">
                    <h5>"AI Explorer" data review platform</h5>
                </div>
            </el-header>
            <el-main>
                <h4>本页面所使用的大模型表格</h4>
                <div class="container">
                    <img src="/images/openai-icon.png" alt="" />
                    <img src="/images/deep-seek-logo-whale-1ced.png" alt="" />
                    <div class="table">
                        <el-table :data="tableData" stripe style="width: 100%">
                            <el-table-column
                                prop="openAI"
                                label="openAI系列"
                                width="280"
                                align="center"
                            />
                            <el-table-column
                                prop="DeepSeek"
                                label="DeepSeek系列"
                                width="280"
                                align="center"
                            />
                            <el-table-column
                                prop="ANLI"
                                label="阿里巴巴"
                                width="280"
                                align="center"
                            />
                            <el-table-column
                                prop="meta"
                                label="meta"
                                width="300"
                                align="center"
                            />
                        </el-table>
                    </div>
                    <img src="/images/R.png" alt="" />
                    <img src="/images/pngimg.com - meta_PNG4.png" alt="" />
                </div>
                <el-divider
                    content-position="center"
                    style="background-color: #f9f9f9"
                ></el-divider>
                <div class="col">
                    <el-col :span="6">
                        <h5 class="mb-2">测评大模型选择表</h5>
                        <el-menu
                            default-active="/main/datacheck/o1-mini"
                            class="el-menu-vertical-demo"
                            style="height: 650px; text-align: center"
                            collapse-transition:true
                            router
                        >
                            <el-sub-menu index="1">
                                <template #title>
                                    <img src="images/openai-icon.png" alt="" />
                                    <div>openAI系列</div>
                                </template>
                                <el-menu-item index="/main/datacheck/o1-mini"
                                    >o1-mini</el-menu-item
                                >
                                <el-menu-item index="/main/datacheck/o1-preview"
                                    >o1-preview</el-menu-item
                                >
                                <el-menu-item index="/main/datacheck/Chatgpt4o"
                                    >chatgpt-4o</el-menu-item
                                >
                            </el-sub-menu>
                            <el-sub-menu index="2">
                                <template #title>
                                    <img
                                        src="images/deep-seek-logo-whale-1ced.png"
                                        alt=""
                                    />
                                    <div>DeepSeek系列</div>
                                </template>
                                <el-menu-item index="/main/datacheck/deepseekV3"
                                    >deepseek-V3</el-menu-item
                                >
                                <el-menu-item index="/main/datacheck/deepseekR1"
                                    >deepseek-R1</el-menu-item
                                >
                            </el-sub-menu>
                            <el-sub-menu index="3">
                                <template #title>
                                    <img src="images/R.png" alt="" />
                                    <div>阿里巴巴</div>
                                </template>
                                <el-menu-item index="/main/datacheck/Qwen2_5Max"
                                    >qwen2.5max</el-menu-item
                                >
                                <el-menu-item
                                    index="/main/datacheck/Qwq32bThinking"
                                    >QwQ-32b-thinking</el-menu-item
                                >
                            </el-sub-menu>
                            <el-sub-menu index="4">
                                <template #title>
                                    <img
                                        src="images/pngimg.com - meta_PNG4.png"
                                        alt=""
                                    />
                                    <div>meta</div>
                                </template>
                                <el-menu-item
                                    index="/main/datacheck/Llama3_1Nemotron"
                                    >Llama-3.1-Nemotron-70B-Instruct</el-menu-item
                                >
                                <el-menu-item
                                    index="/main/datacheck/Llama405bInstruct"
                                    >Meta-llama-3.1-405b-instruct-bf16</el-menu-item
                                >
                            </el-sub-menu>
                        </el-menu>
                    </el-col>
                    <el-col :span="18" style="padding: 15px 10px">
                        <router-view></router-view>
                    </el-col>
                </div>
            </el-main>

            <el-footer>
                <h4>如有数据集共建、合作、评测需求，请联系：</h4>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const tableData = ref([
    {
        openAI: 'o1-mini',
        DeepSeek: 'deepseek-V3',
        ANLI: 'qwen2.5max',
        meta: 'Llama-3.1-Nemotron-70B-Instruct'
    },
    {
        openAI: 'o1-preview',
        DeepSeek: 'deepseek-R1',
        ANLI: 'QwQ-32b-thinking',
        meta: 'Meta-llama-3.1-405b-instruct-bf16'
    },
    {
        openAI: 'chatgpt-4o',
        DeepSeek: '',
        ANLI: '',
        meta: ''
    }
])
</script>
<style scope>
.common-layout {
    font-family: 'Lato', sans-serif;
    background-color: #f9f9f9; /* 浅色背景 */
    max-height: 100vh; /* 撑满视口高度 */
}
.header {
    /* 渐变背景，可根据需要换成自己喜欢的颜色 */
    padding: 30px 40px; /* 较大内边距，让头部更显“横幅” */
    display: flex;
    flex-direction: column;
    align-items: center; /* 水平居中 */
    justify-content: center; /* 垂直居中（若有固定高度） */
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px; /* 与主体内容保持间距 */
    color: #1f1d1d; /* 字体颜色改为白色，以便在深色背景上清晰显示 */
    margin-top: 60px;
}
.gradient-title {
    font-family: 'Lato', sans-serif; /* 也可使用在线字体 */
    margin: 0;
    font-size: 25px;
    line-height: 30px;
    font-weight: bold;
    text-align: center;
    color: #2a2a2a;
    /* 让文字使用背景来着色 */
}
.subtitle {
    margin: 4px 0;
    text-align: center;
    color: #555;
}
.h2 {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.container {
    display: flex;
    flex-direction: row;
    gap: 10px; /* 元素间间距 */
}
.table {
    width: 65%;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
img {
    width: 150px;
    height: 150px;
    object-fit: cover;
}
img:hover {
    transform: scale(1.05);
}
h4 {
    text-align: center;
    color: rgb(56, 65, 72);
    margin-bottom: 20px;
}
.el-main h2 {
    text-align: center;
    color: rgb(56, 65, 72);
    padding: 0 15px;
}

.el-footer {
    display: flex;
    background-color: #2a2a2a;
    justify-content: center;
    align-items: center;
    height: 50px;
}
.el-footer h4 {
    color: rgb(231, 235, 237);
    text-align: center;
}
.col {
    display: flex;
    flex-direction: row;
}
.el-col h5 {
    text-align: center;
    padding-bottom: 5px;
}
.el-sub-menu img {
    width: 20px;
    height: 20px;
}
.el-sub-menu div {
    padding-left: 20px;
}
</style>
