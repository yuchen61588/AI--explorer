<template>
    <div class="ranking-container">
        <div class="ranking-card">
            <div class="card-content">
                <h1 class="page-title">
                    <img
                        src="https://unpkg.com/lucide-static@latest/icons/chevron-right.svg"
                        class="title-icon"
                        alt="Chart icon"
                    />
                    AI模型性能排名
                </h1>

                <div class="table-container">
                    <table class="ranking-table">
                        <thead class="table-header">
                            <tr>
                                <th
                                    scope="col"
                                    class="header-cell header-cell-left"
                                >
                                    排名
                                </th>
                                <th scope="col" class="header-cell">
                                    模型名称
                                </th>
                                <th scope="col" class="header-cell">
                                    模型类型
                                </th>
                                <th scope="col" class="header-cell">
                                    模型参数
                                </th>
                                <th scope="col" class="header-cell">
                                    &nbsp;&nbsp;&nbsp;&nbsp;综合
                                </th>
                                <th scope="col" class="header-cell">
                                    &nbsp;&nbsp;安全性
                                </th>
                                <th scope="col" class="header-cell">
                                    推理速度
                                </th>
                                <th scope="col" class="header-cell">
                                    推理精度
                                </th>
                                <th scope="col" class="header-cell">
                                    计算资源消耗
                                </th>
                                <th
                                    scope="col"
                                    class="header-cell header-cell-right"
                                >
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(model, index) in models"
                                :key="model.name"
                                class="table-row"
                            >
                                <td class="table-cell">
                                    <div
                                        :class="[
                                            'rank-badge',
                                            getRankBadgeClass(index + 1)
                                        ]"
                                    >
                                        {{ index + 1 }}
                                    </div>
                                </td>
                                <td class="table-cell model-name-cell">
                                    <div class="model-name">
                                        <span>{{ model.name }}</span>
                                    </div>
                                </td>
                                <td class="table-cell">
                                    <span
                                        :class="[
                                            'type-badge',
                                            getTypeClass(model.type)
                                        ]"
                                    >
                                        {{ model.type }}
                                    </span>
                                </td>
                                <td class="table-cell">
                                    <div>{{ model.params }}</div>
                                </td>
                                <td class="table-cell">
                                    <div class="score-container">
                                        <div class="progress-bar-bg">
                                            <div
                                                class="progress-bar"
                                                :style="{
                                                    width: `${model.scores.comprehensive}%`,
                                                    backgroundColor:
                                                        getScoreColor(
                                                            model.scores
                                                                .comprehensive
                                                        )
                                                }"
                                            ></div>
                                        </div>
                                        <span>{{
                                            model.scores.comprehensive.toFixed(
                                                2
                                            )
                                        }}</span>
                                    </div>
                                </td>
                                <td class="table-cell">
                                    <div class="score-container">
                                        <div class="progress-bar-bg">
                                            <div
                                                class="progress-bar"
                                                :style="{
                                                    width: `${model.scores.knowledgeSelect}%`,
                                                    backgroundColor:
                                                        getScoreColor(
                                                            model.scores
                                                                .knowledgeSelect
                                                        )
                                                }"
                                            ></div>
                                        </div>
                                        <span>{{
                                            model.scores.knowledgeSelect.toFixed(
                                                2
                                            )
                                        }}</span>
                                    </div>
                                </td>
                                <td class="table-cell">
                                    <div class="score-container">
                                        <div class="progress-bar-bg">
                                            <div
                                                class="progress-bar"
                                                :style="{
                                                    width: `${model.scores.knowledgeQA}%`,
                                                    backgroundColor:
                                                        getScoreColor(
                                                            model.scores
                                                                .knowledgeQA
                                                        )
                                                }"
                                            ></div>
                                        </div>
                                        <span>{{
                                            model.scores.knowledgeQA.toFixed(2)
                                        }}</span>
                                    </div>
                                </td>
                                <td class="table-cell">
                                    <div class="score-container">
                                        <div class="progress-bar-bg">
                                            <div
                                                class="progress-bar"
                                                :style="{
                                                    width: `${model.scores.logicSelect}%`,
                                                    backgroundColor:
                                                        getScoreColor(
                                                            model.scores
                                                                .logicSelect
                                                        )
                                                }"
                                            ></div>
                                        </div>
                                        <span>{{
                                            model.scores.logicSelect.toFixed(2)
                                        }}</span>
                                    </div>
                                </td>
                                <td class="table-cell">
                                    <div class="score-container">
                                        <div class="progress-bar-bg">
                                            <div
                                                class="progress-bar"
                                                :style="{
                                                    width: `${model.scores.logicQA}%`,
                                                    backgroundColor:
                                                        getScoreColor(
                                                            model.scores.logicQA
                                                        )
                                                }"
                                            ></div>
                                        </div>
                                        <span>{{
                                            model.scores.logicQA.toFixed(2)
                                        }}</span>
                                    </div>
                                </td>
                                <td class="table-cell">
                                    <a
                                        :href="model.source"
                                        :download="model.source"
                                    >
                                        <button class="download-button">
                                            <img
                                                src="https://unpkg.com/lucide-static@latest/icons/download.svg"
                                                class="button-icon"
                                                alt="Download"
                                            />
                                            下载
                                        </button></a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="stats-grid">
                    <div class="stats-card">
                        <h2 class="stats-title">
                            <img
                                src="https://unpkg.com/lucide-static@latest/icons/clipboard-list.svg"
                                class="stats-icon"
                                alt="Chart"
                            />
                            综合评分对比
                        </h2>
                        <div class="top-models-list">
                            <div
                                v-for="(model, index) in topModels"
                                :key="model.name"
                                class="top-model-item"
                            >
                                <div
                                    :class="[
                                        'rank-badge',
                                        getRankBadgeClass(index + 1)
                                    ]"
                                >
                                    {{ index + 1 }}
                                </div>
                                <div class="top-model-score">
                                    <div class="model-score-header">
                                        <span class="model-name-text">{{
                                            model.name
                                        }}</span>
                                        <span class="model-score-text">{{
                                            model.scores.comprehensive.toFixed(
                                                2
                                            )
                                        }}</span>
                                    </div>
                                    <div class="top-progress-bar-bg">
                                        <div
                                            class="top-progress-bar"
                                            :style="{
                                                width: `${model.scores.comprehensive}%`,
                                                backgroundColor: getScoreColor(
                                                    model.scores.comprehensive
                                                )
                                            }"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="stats-card">
                        <h2 class="stats-title">
                            <img
                                src="https://unpkg.com/lucide-static@latest/icons/brain.svg"
                                class="stats-icon"
                                alt="Brain"
                            />
                            模型类型分布
                        </h2>
                        <div class="type-distribution-grid">
                            <div class="type-distribution-card">
                                <div class="type-distribution-header">
                                    <span class="type-name">对话模型</span>
                                    <span class="type-count type-count-blue">{{
                                        getModelCountByType('对话模型')
                                    }}</span>
                                </div>
                                <div class="type-progress-bar-bg">
                                    <div
                                        class="type-progress-bar type-progress-blue"
                                        :style="{
                                            width: `${
                                                (getModelCountByType(
                                                    '对话模型'
                                                ) /
                                                    models.length) *
                                                100
                                            }%`
                                        }"
                                    ></div>
                                </div>
                            </div>

                            <div class="type-distribution-card">
                                <div class="type-distribution-header">
                                    <span class="type-name">多模态</span>
                                    <span
                                        class="type-count type-count-purple"
                                        >{{
                                            getModelCountByType('多模态')
                                        }}</span
                                    >
                                </div>
                                <div class="type-progress-bar-bg">
                                    <div
                                        class="type-progress-bar type-progress-purple"
                                        :style="{
                                            width: `${
                                                (getModelCountByType('多模态') /
                                                    models.length) *
                                                100
                                            }%`
                                        }"
                                    ></div>
                                </div>
                            </div>

                            <div class="type-distribution-card">
                                <div class="type-distribution-header">
                                    <span class="type-name">代码模型</span>
                                    <span class="type-count type-count-green">{{
                                        getModelCountByType('代码模型')
                                    }}</span>
                                </div>
                                <div class="type-progress-bar-bg">
                                    <div
                                        class="type-progress-bar type-progress-green"
                                        :style="{
                                            width: `${
                                                (getModelCountByType(
                                                    '代码模型'
                                                ) /
                                                    models.length) *
                                                100
                                            }%`
                                        }"
                                    ></div>
                                </div>
                            </div>

                            <div class="type-distribution-card">
                                <div class="type-distribution-header">
                                    <span class="type-name">其他</span>
                                    <span class="type-count type-count-pink">{{
                                        getModelCountByType('其他')
                                    }}</span>
                                </div>
                                <div class="type-progress-bar-bg">
                                    <div
                                        class="type-progress-bar type-progress-pink"
                                        :style="{
                                            width: `${
                                                (getModelCountByType('其他') /
                                                    models.length) *
                                                100
                                            }%`
                                        }"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 添加模型详情卡片部分 -->
                <div class="model-details-section">
                    <h2 class="section-title">
                        <img
                            src="https://unpkg.com/lucide-static@latest/icons/layers.svg"
                            class="section-icon"
                            alt="Layers"
                        />
                        模型详情
                    </h2>
                    <div class="model-cards-grid">
                        <div
                            v-for="model in topModels"
                            :key="model.name"
                            class="model-card"
                        >
                            <div class="model-card-header">
                                <div class="model-info">
                                    <h3 class="model-title">
                                        {{ model.name }}
                                    </h3>
                                    <p class="model-company">
                                        {{ model.company }}
                                    </p>
                                </div>
                                <span
                                    :class="[
                                        'model-type-badge',
                                        getTypeClass(model.type)
                                    ]"
                                >
                                    {{ model.type }}
                                </span>
                            </div>

                            <div class="model-scores">
                                <div class="comprehensive-score">
                                    <div class="score-label-container">
                                        <span class="score-label"
                                            >综合评分</span
                                        >
                                        <span class="score-value">{{
                                            model.scores.comprehensive.toFixed(
                                                2
                                            )
                                        }}</span>
                                    </div>
                                    <div class="comprehensive-progress-bar-bg">
                                        <div
                                            class="comprehensive-progress-bar"
                                            :style="{
                                                width: `${model.scores.comprehensive}%`,
                                                backgroundColor: getScoreColor(
                                                    model.scores.comprehensive
                                                )
                                            }"
                                        ></div>
                                    </div>
                                </div>

                                <div class="detail-scores-grid">
                                    <div class="detail-score">
                                        <div class="score-label-container">
                                            <span class="score-label"
                                                >知识-选择</span
                                            >
                                            <span class="score-value">{{
                                                model.scores.knowledgeSelect.toFixed(
                                                    2
                                                )
                                            }}</span>
                                        </div>
                                        <div class="detail-progress-bar-bg">
                                            <div
                                                class="detail-progress-bar"
                                                :style="{
                                                    width: `${model.scores.knowledgeSelect}%`,
                                                    backgroundColor:
                                                        getScoreColor(
                                                            model.scores
                                                                .knowledgeSelect
                                                        )
                                                }"
                                            ></div>
                                        </div>
                                    </div>

                                    <div class="detail-score">
                                        <div class="score-label-container">
                                            <span class="score-label"
                                                >知识-问答</span
                                            >
                                            <span class="score-value">{{
                                                model.scores.knowledgeQA.toFixed(
                                                    2
                                                )
                                            }}</span>
                                        </div>
                                        <div class="detail-progress-bar-bg">
                                            <div
                                                class="detail-progress-bar"
                                                :style="{
                                                    width: `${model.scores.knowledgeQA}%`,
                                                    backgroundColor:
                                                        getScoreColor(
                                                            model.scores
                                                                .knowledgeQA
                                                        )
                                                }"
                                            ></div>
                                        </div>
                                    </div>

                                    <div class="detail-score">
                                        <div class="score-label-container">
                                            <span class="score-label"
                                                >逻辑-选择</span
                                            >
                                            <span class="score-value">{{
                                                model.scores.logicSelect.toFixed(
                                                    2
                                                )
                                            }}</span>
                                        </div>
                                        <div class="detail-progress-bar-bg">
                                            <div
                                                class="detail-progress-bar"
                                                :style="{
                                                    width: `${model.scores.logicSelect}%`,
                                                    backgroundColor:
                                                        getScoreColor(
                                                            model.scores
                                                                .logicSelect
                                                        )
                                                }"
                                            ></div>
                                        </div>
                                    </div>

                                    <div class="detail-score">
                                        <div class="score-label-container">
                                            <span class="score-label"
                                                >逻辑-问答</span
                                            >
                                            <span class="score-value">{{
                                                model.scores.logicQA.toFixed(2)
                                            }}</span>
                                        </div>
                                        <div class="detail-progress-bar-bg">
                                            <div
                                                class="detail-progress-bar"
                                                :style="{
                                                    width: `${model.scores.logicQA}%`,
                                                    backgroundColor:
                                                        getScoreColor(
                                                            model.scores.logicQA
                                                        )
                                                }"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="model-card-footer">
                                <div class="model-params">
                                    <span class="params-text">
                                        <img
                                            src="https://unpkg.com/lucide-static@latest/icons/cpu.svg"
                                            class="params-icon"
                                            alt="CPU"
                                        />
                                        参数: {{ model.params }}
                                    </span>
                                </div>
                                <button class="model-download-button">
                                    <img
                                        src="https://unpkg.com/lucide-static@latest/icons/download.svg"
                                        class="model-button-icon"
                                        alt="Download"
                                    />
                                    下载
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 添加趋势分析部分 -->
                <div class="trends-section">
                    <h2 class="section-title">
                        <img
                            src="https://unpkg.com/lucide-static@latest/icons/trending-up.svg"
                            class="section-icon"
                            alt="Trend"
                        />
                        性能趋势分析
                    </h2>
                    <div class="trends-grid">
                        <div class="trend-comparison">
                            <h3 class="trend-subtitle">模型性能对比</h3>
                            <div class="trend-metrics">
                                <div class="trend-metric">
                                    <div class="trend-metric-label">
                                        <span>知识记忆能力</span>
                                    </div>
                                    <div class="trend-line-container">
                                        <div class="trend-line"></div>
                                        <div class="trend-points">
                                            <div
                                                v-for="model in topModels.slice(
                                                    0,
                                                    3
                                                )"
                                                :key="model.name"
                                                class="trend-point-container"
                                            >
                                                <div
                                                    class="trend-point"
                                                    :style="{
                                                        backgroundColor:
                                                            getScoreColor(
                                                                (model.scores
                                                                    .knowledgeSelect +
                                                                    model.scores
                                                                        .knowledgeQA) /
                                                                    2
                                                            )
                                                    }"
                                                ></div>
                                                <span
                                                    class="trend-point-label"
                                                    >{{ model.name }}</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="trend-metric">
                                    <div class="trend-metric-label">
                                        <span>逻辑推理能力</span>
                                    </div>
                                    <div class="trend-line-container">
                                        <div class="trend-line"></div>
                                        <div class="trend-points">
                                            <div
                                                v-for="model in topModels.slice(
                                                    0,
                                                    3
                                                )"
                                                :key="model.name"
                                                class="trend-point-container"
                                            >
                                                <div
                                                    class="trend-point"
                                                    :style="{
                                                        backgroundColor:
                                                            getScoreColor(
                                                                (model.scores
                                                                    .logicSelect +
                                                                    model.scores
                                                                        .logicQA) /
                                                                    2
                                                            )
                                                    }"
                                                ></div>
                                                <span
                                                    class="trend-point-label"
                                                    >{{ model.name }}</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="trend-analysis">
                            <h3 class="trend-subtitle">模型发展趋势</h3>
                            <div class="trend-insights">
                                <p class="trend-insight">
                                    • 大型模型参数量持续增长，但推理效率也在提升
                                </p>
                                <p class="trend-insight">
                                    • 知识记忆能力与逻辑推理能力同步提升
                                </p>
                                <p class="trend-insight">
                                    • 多模态模型正成为主流发展方向
                                </p>
                                <p class="trend-insight">
                                    • 专用领域模型与通用模型差距缩小
                                </p>
                                <p class="trend-insight">
                                    • 安全性与隐私保护成为关键评估指标
                                </p>
                            </div>
                            <div class="report-button-container">
                                <button class="report-button">
                                    <img
                                        src="https://unpkg.com/lucide-static@latest/icons/file-text.svg"
                                        class="report-button-icon"
                                        alt="Report"
                                    />
                                    查看完整趋势报告
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            © 2025 AI探索者评测中心 | 数据更新时间: 2025-03-30
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const models = ref([
    {
        name: '.o3 mini',
        company: 'OpenAI',
        type: '对话模型',
        params: 'N/A',
        scores: {
            comprehensive: 88.49,
            knowledgeSelect: 89.92,
            knowledgeQA: 88.47,
            logicSelect: 85.86,
            logicQA: 89.69
        },
        source: '/o3_mini.pdf'
    },
    {
        name: 'o1 preview',
        company: 'OpenAI',
        type: '对话模型',
        params: 'N/A',
        scores: {
            comprehensive: 87.89,
            knowledgeSelect: 90.92,
            knowledgeQA: 85.99,
            logicSelect: 86.28,
            logicQA: 88.37
        },
        source: '/o1-preview.pdf'
    },
    {
        name: 'deepseek r1',
        company: 'deepseek',
        type: '对话模型',
        params: '671b',
        scores: {
            comprehensive: 87.67,
            knowledgeSelect: 94.41,
            knowledgeQA: 79.64,
            logicSelect: 93.06,
            logicQA: 83.56
        },
        source: '/DeepSeek-R1.pdf'
    },
    {
        name: 'QwQ-32b-thinking',
        company: '阿里云',
        type: '对话模型',
        params: '32B',
        scores: {
            comprehensive: 87.25,
            knowledgeSelect: 93.18,
            knowledgeQA: 82.47,
            logicSelect: 88.92,
            logicQA: 84.43
        },
        source: '/QWQ-32B-thinking.pdf'
    },
    {
        name: 'qwen2.5 max',
        company: '阿里云',
        type: '对话模型',
        params: '32b',
        scores: {
            comprehensive: 86.15,
            knowledgeSelect: 91.82,
            knowledgeQA: 84.37,
            logicSelect: 82.75,
            logicQA: 85.63
        },
        source: '/qwen25max.pdf'
    },
    {
        name: 'deepseek V3',
        company: 'deepseek',
        type: '对话模型',
        params: '72B',
        scores: {
            comprehensive: 85.96,
            knowledgeSelect: 92.71,
            knowledgeQA: 75.93,
            logicSelect: 89.5,
            logicQA: 85.7
        },
        source: '/DeepSeek-V3.pdf'
    },
    {
        name: 'Llama-3.3-Nemotron-70B-Instruct',
        company: 'Meta',
        type: '对话模型',
        params: '70b',
        scores: {
            comprehensive: 83.14,
            knowledgeSelect: 89.86,
            knowledgeQA: 81.17,
            logicSelect: 78.27,
            logicQA: 83.25
        },
        source: '/Llama-3.3-Nemotron-70B-Instruct.pdf'
    },
    {
        name: 'chatgpt-4o',
        company: 'OpenAI',
        type: '对话模型',
        params: 'N/A',
        scores: {
            comprehensive: 80.56,
            knowledgeSelect: 90.04,
            knowledgeQA: 67.82,
            logicSelect: 85.19,
            logicQA: 79.18
        },
        source: '/chatgpt-4o.pdf'
    },
    {
        name: 'Mixtral-8x7B',
        company: 'Mistral AI',
        type: '对话模型',
        params: '8x7B',
        scores: {
            comprehensive: 78.64,
            knowledgeSelect: 86.78,
            knowledgeQA: 72.42,
            logicSelect: 79.19,
            logicQA: 76.15
        },
        source: '/Mixtral-8x7B.pdf'
    },
    {
        name: 'Hunyuan-trubo-20250226',
        company: '腾讯',
        type: '对话模型',
        params: 'N/A',
        scores: {
            comprehensive: 78.64,
            knowledgeSelect: 87.26,
            knowledgeQA: 75.54,
            logicSelect: 77.43,
            logicQA: 74.34
        },
        source: '/Hunyuan-turbo-20250226.pdf'
    },
    {
        name: 'GLM-4-Plus-0111',
        company: '智谱 AI',
        type: '对话模型',
        params: 'N/A',
        scores: {
            comprehensive: 78.64,
            knowledgeSelect: 86.78,
            knowledgeQA: 72.42,
            logicSelect: 79.19,
            logicQA: 76.15
        },
        source: '/GLM-4-Plus-0111.pdf'
    },
    {
        name: 'llama-3.1-405b-instruct-bf16',
        company: 'Meta',
        type: '对话模型',
        params: '405b',
        scores: {
            comprehensive: 78.64,
            knowledgeSelect: 86.78,
            knowledgeQA: 72.42,
            logicSelect: 79.19,
            logicQA: 76.15
        },
        source: '/Llama-3.1-405b-instruct-bf16.pdf'
    },
    {
        name: 'GLM-4-9b-chat',
        company: '智谱 AI',
        type: '对话模型',
        params: '9b',
        scores: {
            comprehensive: 78.64,
            knowledgeSelect: 86.78,
            knowledgeQA: 72.42,
            logicSelect: 79.19,
            logicQA: 76.15
        },
        source: '/GLM-4-9b-chat.pdf'
    },
    {
        name: 'doubao',
        company: '字节跳动',
        type: '对话模型',
        params: 'N/A',
        scores: {
            comprehensive: 78.64,
            knowledgeSelect: 86.78,
            knowledgeQA: 72.42,
            logicSelect: 79.19,
            logicQA: 76.15
        },
        source: '/doubao.pdf'
    }
])

// 计算前5名模型用于展示
const topModels = computed(() => {
    return [...models.value]
        .sort((a, b) => b.scores.comprehensive - a.scores.comprehensive)
        .slice(0, 5)
})

// 获取排名徽章样式
function getRankBadgeClass(rank) {
    if (rank === 1) return 'rank-badge-gold'
    if (rank === 2) return 'rank-badge-silver'
    if (rank === 3) return 'rank-badge-bronze'
    return 'rank-badge-normal'
}

// 获取模型类型样式
function getTypeClass(type) {
    switch (type) {
        case '对话模型':
            return 'type-badge-blue'
        case '多模态':
            return 'type-badge-purple'
        case '代码模型':
            return 'type-badge-green'
        default:
            return 'type-badge-pink'
    }
}

// 获取分数颜色
function getScoreColor(score) {
    if (score >= 90) return '#10b981' // 绿色
    if (score >= 80) return '#3b82f6' // 蓝色
    if (score >= 70) return '#8b5cf6' // 紫色
    return '#ec4899' // 粉色
}

// 获取特定类型的模型数量
function getModelCountByType(type) {
    return models.value.filter(model => model.type === type).length
}
</script>

<style scope>
/* 基础样式 */
.ranking-container {
    min-height: 100vh;
    background: linear-gradient(to bottom right, #312e81, #4c1d95, #831843);
    /* background-color: #000; */
    padding: 2rem;
    font-family: sans-serif;
}

.ranking-card {
    max-width: 1280px;
    margin: 0 auto;
    backdrop-filter: blur(16px);
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-content {
    padding: 1.5rem;
}

@media (min-width: 640px) {
    .card-content {
        padding: 2.5rem;
    }
}

.page-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
}

@media (min-width: 640px) {
    .page-title {
        font-size: 2.25rem;
    }
}

.title-icon {
    width: 2rem;
    height: 2rem;
    margin-right: 0.75rem;
}

/* 表格样式 */
.table-container {
    overflow-x: auto;
}

.ranking-table {
    width: 100%;
    font-size: 0.875rem;
    text-align: left;
    color: #e5e7eb;
}

.table-header {
    font-size: 0.75rem;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.3);
    color: #f3f4f6;
}

.header-cell {
    padding: 0.75rem 1rem;
}

.header-cell-left {
    border-top-left-radius: 0.5rem;
}

.header-cell-right {
    border-top-right-radius: 0.5rem;
}

.table-row {
    border-bottom: 1px solid rgba(107, 114, 128, 0.3);
    backdrop-filter: blur(4px);
    transition: all 0.2s;
}

.table-row:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.table-cell {
    padding: 1rem;
    font-weight: 500;
    white-space: nowrap;
}

.model-name-cell {
    padding: 1rem;
    font-weight: 500;
    white-space: nowrap;
}

.model-name {
    display: flex;
    align-items: center;
}

.rank-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
}

.rank-badge-gold {
    background-color: rgba(234, 179, 8, 0.7);
    color: #fef9c3;
}

.rank-badge-silver {
    background-color: rgba(156, 163, 175, 0.7);
    color: #f3f4f6;
}

.rank-badge-bronze {
    background-color: rgba(180, 83, 9, 0.7);
    color: #fef3c7;
}

.rank-badge-normal {
    background-color: rgba(79, 70, 229, 0.5);
    color: #e0e7ff;
}

.type-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
}

.type-badge-blue {
    background-color: rgba(59, 130, 246, 0.2);
    color: #93c5fd;
}

.type-badge-purple {
    background-color: rgba(139, 92, 246, 0.2);
    color: #c4b5fd;
}

.type-badge-green {
    background-color: rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
}

.type-badge-pink {
    background-color: rgba(236, 72, 153, 0.2);
    color: #f9a8d4;
}

.score-container {
    display: flex;
    align-items: center;
}

.progress-bar-bg {
    width: 100%;
    background-color: rgba(107, 114, 128, 0.5);
    border-radius: 9999px;
    height: 0.625rem;
    margin-right: 0.5rem;
}

.progress-bar {
    height: 0.625rem;
    border-radius: 9999px;
}

.download-button {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    background-color: rgba(79, 70, 229, 0.7);
    color: white;
    border-radius: 0.5rem;
    transition: all 0.2s;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(79, 70, 229, 0.3);
}

.download-button:hover {
    background-color: rgba(79, 70, 229, 0.9);
}

.button-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
}

/* 统计卡片样式 */
.stats-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
}

@media (min-width: 768px) {
    .stats-grid {
        grid-template-columns: 1fr 1fr;
    }
}

.stats-card {
    backdrop-filter: blur(16px);
    background-color: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.stats-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}

.stats-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
}

.top-models-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.top-model-item {
    display: flex;
    align-items: center;
}

.top-model-score {
    flex: 1;
    margin-left: 0.75rem;
}

.model-score-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
}

.model-name-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: white;
}

.model-score-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: white;
}

.top-progress-bar-bg {
    width: 100%;
    background-color: rgba(107, 114, 128, 0.5);
    border-radius: 9999px;
    height: 0.75rem;
}

.top-progress-bar {
    height: 0.75rem;
    border-radius: 9999px;
}

/* 类型分布样式 */
.type-distribution-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.type-distribution-card {
    backdrop-filter: blur(4px);
    background-color: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.type-distribution-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.type-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: white;
}

.type-count {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
}

.type-count-blue {
    background-color: rgba(59, 130, 246, 0.2);
    color: #93c5fd;
}

.type-count-purple {
    background-color: rgba(139, 92, 246, 0.2);
    color: #c4b5fd;
}

.type-count-green {
    background-color: rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
}

.type-count-pink {
    background-color: rgba(236, 72, 153, 0.2);
    color: #f9a8d4;
}

.type-progress-bar-bg {
    width: 100%;
    background-color: rgba(107, 114, 128, 0.5);
    border-radius: 9999px;
    height: 0.5rem;
}

.type-progress-bar {
    height: 0.5rem;
    border-radius: 9999px;
}

.type-progress-blue {
    background-color: #3b82f6;
}

.type-progress-purple {
    background-color: #8b5cf6;
}

.type-progress-green {
    background-color: #10b981;
}

.type-progress-pink {
    background-color: #ec4899;
}

/* 模型详情部分 */
.model-details-section {
    margin-top: 2rem;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}

.section-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
}

.model-cards-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 640px) {
    .model-cards-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .model-cards-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

.model-card {
    backdrop-filter: blur(16px);
    background-color: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
}

.model-card:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.model-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.model-info {
    flex: 1;
}

.model-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: white;
}

.model-company {
    font-size: 0.875rem;
    color: #d1d5db;
}

.model-type-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
}

.model-scores {
    margin-bottom: 1rem;
}

.comprehensive-score {
    margin-bottom: 1rem;
}

.score-label-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
}

.score-label {
    font-size: 0.75rem;
    color: #9ca3af;
}

.score-value {
    font-size: 0.75rem;
    color: #9ca3af;
}

.comprehensive-progress-bar-bg {
    width: 100%;
    background-color: rgba(107, 114, 128, 0.5);
    border-radius: 9999px;
    height: 0.5rem;
}

.comprehensive-progress-bar {
    height: 0.5rem;
    border-radius: 9999px;
}

.detail-scores-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
}

.detail-score {
    flex: 1;
}

.detail-progress-bar-bg {
    width: 100%;
    background-color: rgba(107, 114, 128, 0.5);
    border-radius: 9999px;
    height: 0.375rem;
}

.detail-progress-bar {
    height: 0.375rem;
    border-radius: 9999px;
}

.model-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.model-params {
    flex: 1;
}

.params-text {
    display: inline-flex;
    align-items: center;
    font-size: 0.75rem;
    color: #9ca3af;
}

.params-icon {
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 0.25rem;
}

.model-download-button {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    background-color: rgba(79, 70, 229, 0.7);
    color: white;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    transition: all 0.2s;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(79, 70, 229, 0.3);
}

.model-download-button:hover {
    background-color: rgba(79, 70, 229, 0.9);
}

.model-button-icon {
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 0.25rem;
}

/* 趋势分析部分 */
.trends-section {
    margin-top: 2rem;
    backdrop-filter: blur(16px);
    background-color: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.trends-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 768px) {
    .trends-grid {
        grid-template-columns: 1fr 1fr;
    }
}

.trend-comparison,
.trend-analysis {
    flex: 1;
}

.trend-subtitle {
    font-size: 0.875rem;
    font-weight: 500;
    color: #d1d5db;
    margin-bottom: 0.75rem;
}

.trend-metrics {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.trend-metric {
    flex: 1;
}

.trend-metric-label {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-bottom: 0.25rem;
}

.trend-line-container {
    position: relative;
    height: 2rem;
}

.trend-line {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
}

.trend-line::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.125rem;
    background-color: rgba(107, 114, 128, 0.5);
}

.trend-points {
    position: relative;
    display: flex;
    justify-content: space-between;
}

.trend-point-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.trend-point {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 9999px;
}

.trend-point-label {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #9ca3af;
}

.trend-insights {
    font-size: 0.75rem;
    color: #d1d5db;
    line-height: 1.5;
}

.trend-insight {
    margin-bottom: 0.5rem;
}

.report-button-container {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
}

.report-button {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    background-color: rgba(79, 70, 229, 0.7);
    color: white;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    transition: all 0.2s;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(79, 70, 229, 0.3);
}

.report-button:hover {
    background-color: rgba(79, 70, 229, 0.9);
}

.report-button-icon {
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 0.25rem;
}

/* 页脚样式 */
.footer {
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.75rem;
    margin-top: 2rem;
}
</style>
