<template>
    <div class="profile-container">
        <div class="common-layout">
            <el-container>
                <el-header class="header">
                    <h1 class="gradient-title">"AI探索者"大模型观测展示平台</h1>
                    <h2 class="subtitle">
                        "AI Explorer" LLM Examination Platform
                    </h2>
                </el-header>

                <el-main>
                    <h3 class="section-title">本页面所使用的大模型</h3>
                    <div class="model-table-container">
                        <div class="logo-container">
                            <img
                                src="/images/openai-icon.png"
                                alt="OpenAI Logo"
                                class="model-logo"
                            />
                            <img
                                src="/images/deep-seek-logo-whale-1ced.png"
                                alt="DeepSeek Logo"
                                class="model-logo"
                            />
                            <img
                                src="/images/R.png"
                                alt="Alibaba Logo"
                                class="model-logo"
                            />
                            <img
                                src="/images/pngimg.com - meta_PNG4.png"
                                alt="Meta Logo"
                                class="model-logo"
                            />
                        </div>

                        <div class="table-wrapper">
                            <el-table
                                :data="tableData"
                                stripe
                                style="width: 100%"
                                :header-cell-style="{
                                    backgroundColor: '#f5f7fa',
                                    color: '#606266',
                                    fontWeight: 'bold'
                                }"
                                border
                            >
                                <el-table-column
                                    prop="openAI"
                                    label="OpenAI系列"
                                    align="center"
                                />
                                <el-table-column
                                    prop="DeepSeek"
                                    label="DeepSeek系列"
                                    align="center"
                                />
                                <el-table-column
                                    prop="ANLI"
                                    label="阿里巴巴"
                                    align="center"
                                />
                                <el-table-column
                                    prop="meta"
                                    label="Meta"
                                    align="center"
                                />
                            </el-table>
                        </div>
                    </div>

                    <el-divider
                        content-position="center"
                        class="section-divider"
                    ></el-divider>

                    <div class="model-selection-container">
                        <el-col :span="4" class="sidebar">
                            <h3 class="sidebar-title">测评大模型选择表</h3>
                            <el-menu
                                default-active="/main/datacheck/o1-mini"
                                class="model-menu"
                                :collapse-transition="true"
                                router
                            >
                                <el-sub-menu index="1" class="menu-group">
                                    <template #title>
                                        <div class="menu-header">
                                            <img
                                                src="images/openai-icon.png"
                                                alt="OpenAI"
                                                class="menu-icon"
                                            />
                                            <span>OpenAI系列</span>
                                        </div>
                                    </template>
                                    <el-menu-item
                                        index="/main/datacheck/o1-mini"
                                        >o1-mini</el-menu-item
                                    >
                                    <el-menu-item
                                        index="/main/datacheck/o1-preview"
                                        >o1-preview</el-menu-item
                                    >
                                    <el-menu-item
                                        index="/main/datacheck/Chatgpt4o"
                                        >ChatGPT-4o</el-menu-item
                                    >
                                </el-sub-menu>

                                <el-sub-menu index="2" class="menu-group">
                                    <template #title>
                                        <div class="menu-header">
                                            <img
                                                src="images/deep-seek-logo-whale-1ced.png"
                                                alt="DeepSeek"
                                                class="menu-icon"
                                            />
                                            <span>DeepSeek系列</span>
                                        </div>
                                    </template>
                                    <el-menu-item
                                        index="/main/datacheck/deepseekV3"
                                        >DeepSeek-V3</el-menu-item
                                    >
                                    <el-menu-item
                                        index="/main/datacheck/deepseekR1"
                                        >DeepSeek-R1</el-menu-item
                                    >
                                </el-sub-menu>

                                <el-sub-menu index="3" class="menu-group">
                                    <template #title>
                                        <div class="menu-header">
                                            <img
                                                src="images/R.png"
                                                alt="Alibaba"
                                                class="menu-icon"
                                            />
                                            <span>阿里巴巴</span>
                                        </div>
                                    </template>
                                    <el-menu-item
                                        index="/main/datacheck/Qwen2_5Max"
                                        >Qwen2.5-Max</el-menu-item
                                    >
                                    <el-menu-item
                                        index="/main/datacheck/Qwq32bThinking"
                                        >QwQ-32b-Thinking</el-menu-item
                                    >
                                </el-sub-menu>

                                <el-sub-menu index="4" class="menu-group">
                                    <template #title>
                                        <div class="menu-header">
                                            <img
                                                src="images/pngimg.com - meta_PNG4.png"
                                                alt="Meta"
                                                class="menu-icon"
                                            />
                                            <span>Meta</span>
                                        </div>
                                    </template>
                                    <el-menu-item
                                        index="/main/datacheck/Llama3_1Nemotron"
                                        >Llama-3.1-Nemotron-70B</el-menu-item
                                    >
                                    <el-menu-item
                                        index="/main/datacheck/Llama405bInstruct"
                                        >Meta-Llama-3.1-405B</el-menu-item
                                    >
                                </el-sub-menu>
                            </el-menu>
                        </el-col>

                        <el-col :span="20" class="content-area">
                            <router-view></router-view>
                        </el-col>
                    </div>
                </el-main>

                <el-footer class="footer">
                    <h4 class="footer-text">
                        如有数据集共建、合作、评测需求，请联系：ai-explorer@example.com
                    </h4>
                </el-footer>
            </el-container>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
    {
        openAI: 'o1-mini',
        DeepSeek: 'DeepSeek-V3',
        ANLI: 'Qwen2.5-Max',
        meta: 'Llama-3.1-Nemotron-70B'
    },
    {
        openAI: 'o1-preview',
        DeepSeek: 'DeepSeek-R1',
        ANLI: 'QwQ-32b-Thinking',
        meta: 'Meta-Llama-3.1-405B'
    },
    {
        openAI: 'ChatGPT-4o',
        DeepSeek: '—',
        ANLI: '—',
        meta: '—'
    }
])
</script>

<style scoped>
/* Base Styles */
:root {
    --primary-color: #3498db;
    --primary-gradient: linear-gradient(135deg, #3498db, #2980b9);
    --accent-color: #2ecc71;
    --text-primary: #333;
    --text-secondary: #666;
    --text-light: #fff;
    --bg-light: #f9f9f9;
    --bg-white: #fff;
    --border-radius: 8px;
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
    --transition-default: all 0.3s ease;
}

/* Main Container */
.profile-container {
    max-width: 1800px;
    margin: 0 auto;
    margin-top: 60px;
    height: calc(100vh - 60px);
    background-color: var(--bg-light);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    color: var(--text-primary);
    overflow-x: auto;
    min-width: 1200px;
}

.common-layout {
    font-family: 'Lato', sans-serif;
    background-color: var(--bg-light);
    height: 100%;
    display: flex;
    flex-direction: column;
}

/* Header Styles */
.header {
    background: var(--primary-gradient);
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: var(--shadow-sm);
    margin-bottom: 20px;
    color: var(--text-light);
    background-color: #f4f6f9;
    height: 100px;
}

.gradient-title {
    font-family: 'Lato', sans-serif;
    margin: 0;
    font-size: 32px;
    line-height: 1.2;
    font-weight: bold;
    text-align: center;
    color: var(--text-light);
    margin-bottom: 8px;
}

.subtitle {
    margin: 4px 0;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);
    font-size: 16px;
    font-weight: normal;
    z-index: 100;
}

/* Main Content */
.el-main {
    padding: 20px 0;
}

.section-title {
    text-align: center;
    color: var(--text-primary);
    margin-bottom: 25px;
    font-size: 22px;
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--primary-color);
    border-radius: 3px;
}

/* Model Table Section */
.model-table-container {
    margin-bottom: 40px;
}

.logo-container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.model-logo {
    width: 60px;
    height: 60px;
    object-fit: contain;
    transition: var(--transition-default);
}

.model-logo:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
}

.table-wrapper {
    margin: 0 auto;
    width: 100%;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
}

/* Section Divider */
.section-divider {
    margin: 30px 0;
    background-color: #e0e0e0;
}

/* Model Selection Section */
.model-selection-container {
    display: flex;
}

.sidebar {
    padding-right: 20px;
}

.sidebar-title {
    text-align: center;
    color: var(--text-primary);
    margin-bottom: 15px;
    font-size: 18px;
}

.model-menu {
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    height: 650px;
}

.menu-group {
    margin-bottom: 5px;
}

.menu-header {
    display: flex;
    align-items: center;
    padding: 0 16px;
}

.menu-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
}

.content-area {
    padding-left: 20px;
    background-color: var(--bg-white);
    border-radius: var(--border-radius);
    min-height: 650px;
    box-shadow: var(--shadow-sm);
}

/* Footer Styles */
.footer {
    display: flex;
    background-color: #2a2a2a;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin-top: auto;
}

.footer-text {
    color: var(--text-light);
    text-align: center;
    margin: 0;
}

/* Element UI Component Styles */
.el-menu-item {
    padding-left: 35px !important;
}

.el-menu-item.is-active {
    background-color: rgba(52, 152, 219, 0.1);
    color: var(--primary-color);
}

.el-sub-menu__title:hover {
    background-color: rgba(52, 152, 219, 0.05);
}
</style>
