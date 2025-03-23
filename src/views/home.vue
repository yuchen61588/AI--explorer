<template>
    <div class="responsive-layout" :class="{ 'mobile-layout': isMobileView }">
        <div class="content-container">
            <header class="page-header">
                <h1 class="main-title">大模型性能综合观测测试集</h1>
                <p class="subtitle">
                    Comprehensive Performance Testing Suite for Large Language
                    Models
                </p>

                <div class="download-container">
                    <button @click="downloadFile" class="download-button">
                        <span class="download-icon">↓</span>
                        下载测试集文件
                    </button>
                </div>
            </header>

            <div class="chart-container">
                <h2 class="chart-title">
                    《生成式人工智能服务安全基本要求》题库覆盖情况
                </h2>
                <div ref="chartContainer" class="chart"></div>
                <div class="chart-legend" v-if="!isMobileView">
                    <div
                        v-for="(category, index) in chartData"
                        :key="index"
                        class="legend-item"
                    >
                        <span
                            class="legend-color"
                            :style="{ backgroundColor: getColor(index) }"
                        ></span>
                        <span class="legend-text">{{ category.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'

export default {
    setup() {
        const chartContainer = ref(null)
        let chart = null
        const isMobileView = ref(false)

        // Check if mobile view on mount and window resize
        const checkMobileView = () => {
            isMobileView.value = window.innerWidth <= 800
        }

        const chartData = [
            {
                name: '违反社会主义核心\n价值观的内容',
                value: 800, // 假设总值为800，根据需求调整
                children: [
                    { name: '煽动颠覆国家政权、推翻社会主义制度', value: 100 },
                    { name: '危害国家安全和利益、损害国家形象', value: 100 },
                    {
                        name: '煽动分裂国家、破坏国家统一和社会稳定',
                        value: 100
                    },
                    { name: '宣扬恐怖主义、极端主义', value: 100 },
                    { name: '宣扬民族仇恨', value: 100 },
                    { name: '宣扬暴力、淫秽色情', value: 100 },
                    { name: '传播虚假有害信息', value: 100 },
                    { name: '其他法律、行政法规禁止的内容', value: 100 }
                ]
            },
            {
                name: '歧视性内容',
                value: 900, // 假设总值为900，根据需求调整
                children: [
                    { name: '民族歧视内容', value: 100 },
                    { name: '信仰歧视内容', value: 100 },
                    { name: '国别歧视内容', value: 100 },
                    { name: '地域歧视内容', value: 100 },
                    { name: '性别歧视内容', value: 100 },
                    { name: '年龄歧视内容', value: 100 },
                    { name: '职业歧视内容', value: 100 },
                    { name: '健康歧视内容', value: 100 },
                    { name: '其他方面歧视内容', value: 100 }
                ]
            },
            {
                name: '商业违法违规',
                value: 500, // 假设总值为500，根据需求调整
                children: [
                    { name: '侵犯他人知识产权', value: 100 },
                    { name: '违反商业道德', value: 100 },
                    { name: '泄露他人商业秘密', value: 100 },
                    {
                        name: '利用算法、数据、平台等优势，实施垄断和不正当竞争行为',
                        value: 100
                    },
                    { name: '其他商业违法违规行为', value: 100 }
                ]
            },
            {
                name: '侵犯他人合法权益',
                value: 700, // 假设总值为700，根据需求调整
                children: [
                    { name: '危害他人身心健康', value: 100 },
                    { name: '侵害他人肖像权', value: 100 },
                    { name: '侵害他人名誉权', value: 100 },
                    { name: '侵害他人荣誉权', value: 100 },
                    { name: '侵害他人隐私权', value: 100 },
                    { name: '侵害他人个人信息权益', value: 100 },
                    { name: '侵犯他人其他合法权益', value: 100 }
                ]
            },
            {
                name: '不可靠\n不准确',
                value: 200, // 假设总值为200，根据需求调整
                children: [
                    {
                        name: '内容不准确，严重不符合科学常识或主流认知',
                        value: 100
                    },
                    {
                        name: '内容不可靠，虽然不包含严重错误的内容，但无法对使用者形成帮助',
                        value: 100
                    }
                ]
            }
        ]

        // Color palette for chart
        const colorPalette = [
            '#5470c6',
            '#91cc75',
            '#fac858',
            '#ee6666',
            '#73c0de',
            '#3ba272',
            '#fc8452',
            '#9a60b4',
            '#ea7ccc'
        ]

        const getColor = index => {
            return colorPalette[index % colorPalette.length]
        }

        // Process data for multi-level pie chart
        const processData = data => {
            const level1Data = data.map((item, index) => ({
                name: item.name,
                value: item.value,
                itemStyle: {
                    color: colorPalette[index % colorPalette.length],
                    borderWidth: 2,
                    borderColor: '#fff',
                    shadowBlur: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
            }))

            const level2Data = []
            data.forEach((item, parentIndex) => {
                if (item.children) {
                    const baseColor =
                        colorPalette[parentIndex % colorPalette.length]
                    item.children.forEach((child, childIndex) => {
                        // Create a slightly different shade of the parent color
                        const childColor = echarts.color.modifyAlpha(
                            baseColor,
                            0.7 + childIndex * 0.06
                        )

                        level2Data.push({
                            name: child.name,
                            value: child.value,
                            itemStyle: {
                                color: childColor,
                                borderWidth: 1,
                                borderColor: '#fff'
                            }
                        })
                    })
                }
            })

            return [level1Data, level2Data]
        }

        const initChart = () => {
            if (chartContainer.value) {
                chart = echarts.init(chartContainer.value)

                const [level1Data, level2Data] = processData(chartData)

                const option = {
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderColor: '#ccc',
                        borderWidth: 1,
                        padding: 10,
                        textStyle: {
                            color: '#333'
                        }
                    },
                    legend: {
                        show: isMobileView.value,
                        type: 'scroll',
                        orient: isMobileView.value ? 'horizontal' : 'vertical',
                        right: isMobileView.value ? 'center' : 10,
                        bottom: isMobileView.value ? 0 : 'auto',
                        top: isMobileView.value ? 'auto' : 80,
                        left: isMobileView.value ? 'center' : 'auto',
                        data: level1Data.map(i => i.name),
                        textStyle: {
                            fontSize: isMobileView.value ? 10 : 12
                        }
                    },
                    series: [
                        {
                            name: '主要类别',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '41%'],
                            center: ['50%', '50%'],
                            label: {
                                position: 'inner',
                                fontSize: isMobileView.value ? 9 : 12,
                                fontWeight: 'bold',
                                formatter: '{b}\n{d}%',
                                show: true
                            },
                            labelLine: {
                                show: false
                            },
                            data: level1Data,
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200
                            }
                        },
                        {
                            name: '子类别',
                            type: 'pie',
                            radius: ['55%', '70%'],
                            center: ['50%', '50%'],
                            labelLine: {
                                length: isMobileView.value ? 15 : 30,
                                length2: isMobileView.value ? 5 : 15,
                                smooth: true
                            },
                            label: {
                                show: true,
                                formatter: '{b}\n{d}%',
                                fontSize: isMobileView.value ? 8 : 10
                            },
                            data: level2Data,
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200 + 100
                            }
                        }
                    ]
                }

                chart.setOption(option)
            }
        }

        const downloadFile = () => {
            // Create a placeholder file for download
            const element = document.createElement('a')
            element.setAttribute(
                'href',
                'data:text/plain;charset=utf-8,' +
                    encodeURIComponent('大模型性能综合观测测试集数据')
            )
            element.setAttribute('download', '大模型性能综合观测测试集.txt')
            element.style.display = 'none'
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
        }

        onMounted(() => {
            checkMobileView()
            window.addEventListener('resize', () => {
                checkMobileView()
                if (chart) {
                    chart.resize()
                    // Update chart options for mobile/desktop
                    initChart()
                }
            })
            initChart()
        })

        onUnmounted(() => {
            if (chart) {
                chart.dispose()
                chart = null
            }
            window.removeEventListener('resize', checkMobileView)
        })

        return {
            chartContainer,
            downloadFile,
            isMobileView,
            chartData,
            getColor
        }
    }
}
</script>

<style scoped>
.responsive-layout {
    display: flex;
    width: 100%;
    margin: 0 auto;
    margin-top: 60px;
    max-width: 1200px;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
    min-height: 100vh;
}

.mobile-layout {
    flex-direction: column;
    align-items: center;
    padding: 10px;
}

.content-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.page-header {
    width: 100%;
    text-align: center;
    margin-bottom: 40px;
    padding: 20px;
}

.main-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #2c3e50;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.subtitle {
    font-size: 16px;
    color: #5a6b7b;
    margin-bottom: 24px;
}

.download-container {
    margin: 20px 0;
}

.download-button {
    background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: all 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 8px;
}

.download-button:hover {
    background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.download-icon {
    font-size: 18px;
    font-weight: bold;
}

.chart-container {
    position: relative;
    width: 100%;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 30px;
    margin-bottom: 30px;
    overflow: hidden;
}

.chart-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #1976d2, #2196f3, #42a5f5);
}

.chart-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 50px;
    color: #2c3e50;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
}

.chart {
    width: 100%;
    height: 700px;
    margin-top: 20px;
}

.chart-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
}

.legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
}

.legend-text {
    font-size: 12px;
    color: #555;
}

@media (max-width: 800px) {
    .responsive-layout {
        padding: 10px;
    }

    .chart {
        height: 450px;
    }

    .chart-title {
        font-size: 18px;
        margin-bottom: 30px;
    }

    .main-title {
        font-size: 22px;
    }

    .subtitle {
        font-size: 14px;
    }

    .download-button {
        padding: 10px 16px;
        font-size: 14px;
    }

    .chart-container {
        padding: 20px 10px;
    }
}
</style>
