<template>
    <div class="big-box">
        <a href="#/main" class="folder" @click.prevent="toggleCollapse">
            <el-icon v-if="isCollapsed"><Expand /></el-icon>
            <el-icon v-else><Fold /></el-icon>
        </a>

        <!-- 新增遮罩层 -->
        <div class="mask" v-show="showMask" @click="handleMaskClick"></div>
        <!-- <div class="logo">samhan</div> -->
        <img
            src="@/icons/logo.png"
            alt=""
            :class="['logo', { 'logo-collapsed': isCollapsed }]"
        />
        <div class="nav-left" :style="{ left: navLeftOffset }">
            <ul class="nav-list">
                <div
                    class="nav-block"
                    v-for="(item, index) in navItems"
                    :key="index"
                >
                    <!-- 子菜单移动到父项前 -->
                    <div
                        class="submenu-list"
                        v-show="item.expanded && item.children"
                    >
                        <li
                            v-for="(child, childIndex) in item.children"
                            :key="childIndex"
                            class="nav-item sub-item"
                            @click.stop="handleChildClick(index, childIndex)"
                            :class="{
                                'sub-active':
                                    activationState.activeChild.parentIndex ===
                                        index &&
                                    activationState.activeChild.childIndex ===
                                        childIndex
                            }"
                        >
                            <span>{{ child.text }}</span>
                        </li>
                    </div>
                    <!-- 父项 -->
                    <li
                        class="nav-item parent-item"
                        @click="toggleExpand(item, index)"
                        :class="{
                            active:
                                activationState.activeParent === index &&
                                activationState.activeChild.parentIndex === null
                        }"
                    >
                        <el-icon><component :is="item.icon" /></el-icon>
                        <span>{{ item.text }}</span>
                        <el-icon class="arrow-icon" v-if="item.children">
                            <component
                                :is="item.expanded ? ArrowUp : ArrowDown"
                            />
                        </el-icon>
                    </li>
                    <div class="blank"></div>
                </div>
            </ul>
        </div>
        <div class="main-area" :class="{ 'blur-effect': showMask }">
            <div class="nav-top">
                <div class="time-display">{{ currentTime }}</div>
                <img src="@/icons/avatar.png" alt="" class="avatar" />
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import {
    Fold,
    Expand,
    User,
    Setting,
    Document,
    Grid,
    ArrowUp,
    ArrowDown,
    Sunny,
    Moon // 新增箭头图标
} from '@element-plus/icons-vue'

const router = useRouter()
const currentTime = ref('')

// 监听路由变化
watch(
    () => router.currentRoute.value.path,
    newPath => {
        // 找到匹配的导航项索引
        const matchedIndex = navItems.value.findIndex(
            item => item.path && newPath.startsWith(item.path)
        )

        if (matchedIndex !== -1) {
            activationState.activeParent = matchedIndex
            activationState.activeChild = {
                parentIndex: null,
                childIndex: null
            }
        }
    }
)

const updateTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    })
}

// 新增响应式状态
const isMobile = ref(false)
const showMask = ref(false)

let timer = null

onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    // 设置首页为激活状态
    activationState.activeParent = 0
    activationState.activeChild = { parentIndex: null, childIndex: null }

    // 折叠所有其他父级菜单（与点击逻辑保持一致）
    navItems.value.forEach((navItem, idx) => {
        if (idx !== 0) navItem.expanded = false
    })

    updateTime()
    timer = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize)
    if (timer) clearInterval(timer)
})

// 在script setup部分添加
const isManualToggle = ref(false) // 新增手动操作标识

// 修改checkScreenSize函数
const checkScreenSize = () => {
    const prevIsMobile = isMobile.value
    isMobile.value = window.innerWidth <= 800

    // 当切换到桌面端时强制关闭遮罩
    if (!isMobile.value) {
        showMask.value = false
    }

    // 仅在首次进入移动端时自动收起导航
    if (isMobile.value && !prevIsMobile) {
        navLeftOffset.value = '-220px'
        isCollapsed.value = true
        // 重置手动操作状态避免干扰
        isManualToggle.value = false
    }
    // 当从移动端回到桌面时强制显示导航
    else if (!isMobile.value && prevIsMobile) {
        navLeftOffset.value = '0px'
        isCollapsed.value = false
        isManualToggle.value = false
    }

    // 强制同步遮罩状态
    if (isMobile.value) {
        showMask.value = !isCollapsed.value && navLeftOffset.value === '0px'
    }
}

const isCollapsed = ref(false)
const navLeftOffset = ref('0px')

// 修改toggleCollapse函数
const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
    navLeftOffset.value = isCollapsed.value ? '-220px' : '0px'
    showMask.value = !isCollapsed.value && isMobile.value

    isManualToggle.value = isMobile.value && !isCollapsed.value
}

// 修改遮罩点击处理
const handleMaskClick = () => {
    if (isMobile.value) {
        isCollapsed.value = true
        navLeftOffset.value = '-220px'
        showMask.value = false
        // 保持手动操作标记为true
    }
}

const activeIndex = ref(0)
const handleNavClick = index => {
    activeIndex.value = index
    // 这里可以添加路由跳转逻辑
}

const navItems = ref([
    {
        text: '首页',
        icon: Document,
        path: '/main/home' // 新增路径属性
    },
    {
        text: '数据审核',
        icon: Setting,
        expanded: false,
        activeChild: null,
        path: '/main/datacheck'
    },
    {
        text: '个人中心',
        icon: User,
        path: '/main/profile' // 新增路径属性
    },
    {
        text: '应用中心',
        icon: Grid,
        expanded: false,
        children: [{ text: '应用管理' }, { text: '应用市场' }],
        activeChild: null
    },
    {
        text: '系统设置',
        icon: Setting,
        expanded: false,
        children: [{ text: '系统参数' }, { text: '权限管理' }],
        activeChild: null
    }
])

// 修改后统一管理激活状态
const activationState = reactive({
    activeParent: null,
    activeChild: { parentIndex: null, childIndex: null }
})

// 更新后的切换方法
const toggleExpand = (item, index) => {
    if (item.path) {
        // 有路径的直接跳转
        router.push(item.path)
        activationState.activeParent = index
        activationState.activeChild = { parentIndex: null, childIndex: null }
    } else if (item.children) {
        // 有子菜单的处理逻辑
        item.expanded = !item.expanded
        activationState.activeParent = index
        activationState.activeChild = { parentIndex: null, childIndex: null }
    }

    // 折叠其他父级菜单
    navItems.value.forEach((navItem, idx) => {
        if (idx !== index && !navItem.path) {
            // 只折叠有子菜单的项
            navItem.expanded = false
        }
    })
}

// 更新后的子项点击处理
const handleChildClick = (parentIdx, childIdx) => {
    activationState.activeParent = parentIdx
    activationState.activeChild = {
        parentIndex: parentIdx,
        childIndex: childIdx
    }
    event.stopPropagation()
}

const resetActivation = currentParent => {
    navItems.value.forEach((item, index) => {
        if (index !== currentParent) {
            item.expanded = false
            item.activeChild = null
        }
    })
}
</script>

<script>
export default {}
</script>

<style scoped>
.big-box {
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
}

a.folder {
    position: absolute;
    position: fixed;
    left: 20px;
    top: 10px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    color: #808080;
    text-align: center;
    font-size: 25px;
    z-index: 1010;
}

a.folder:hover {
    background-color: #f5f5f5;
    will-change: background-color;
    transition-delay: 0.1s;
}

a.folder .el-icon {
    position: absolute;
    top: calc(50% - 12.5px);
    left: calc(50% - 12.5px);
}

.logo {
    position: fixed;
    left: 70px;
    top: 13px;
    height: 35px;
    font-size: 30px;
    color: #7ecafe;
    font-family: '江西拙楷';
    z-index: 4;
}

/* 折叠状态样式 */
.logo-collapsed {
    position: absolute !important;
    left: 70px !important;
    top: 13px !important;
}

.big-box .nav-left {
    position: fixed;
    width: 220px;
    height: 100vh;
    overflow-y: auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    padding: 60px 0 20px 0; /* 给顶部按钮留空间 */
    background: #ffffff;
}

.nav-left {
    transition: left 0.3s ease;
    background: #fff; /* 给个背景色确保覆盖内容 */
    z-index: 2;
}

.nav-left .blank {
    height: 40px;
    width: 100%;
}

.nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-item {
    position: relative; /* 给箭头定位提供基准 */
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #606266;
    font-size: 16px;
    font-weight: 500;
}

.arrow-icon {
    position: absolute;
    right: 20px;
    transition: transform 0.3s ease;
    color: #999;
}

.is-expanded .arrow-icon {
    transform: rotate(180deg);
}

.nav-item.active .arrow-icon {
    color: var(--el-color-primary);
}

.nav-item .el-icon {
    margin-left: 20px;
    margin-right: 10px;
}

.nav-item span {
    /* font-size: 18px; */
    white-space: nowrap;
}

.nav-item:hover {
    background: #f5f5f5;
}

.nav-item.active {
    background: #f5f5f5;
}

.main-area {
    margin-left: 220px; /* 与导航栏宽度一致 */
    transition: margin 0.3s ease;
    flex: 1;
}

/* 折叠时主内容区域的调整 */
.is-collapsed .main-area {
    margin-left: 0;
}

/* 如果要实现更平滑的图标切换 */
.el-icon {
    transition: transform 0.3s ease;
}

/* 添加子项激活状态 */
.nav-item.sub-item.active,
.nav-item.sub-item.sub-active {
    background: #f0f0f0 !important;
}

/* 同时保持父级激活状态 */
.nav-item.active {
    background: #f5f5f5;
}

/* 子菜单缩进样式 */
.submenu-list .nav-item {
    padding-left: 50px !important;
}

/* 调整父项样式 */
.parent-item {
    order: 2; /* 始终在子项下方 */
}

.submenu-list {
    order: 1; /* 始终在父项上方 */
    width: 100%;
    background: #fff;
    border-radius: 4px;
    margin: 4px 0;
    transition: all 0.3s ease;
}

/* 子项独立样式 */
.submenu-list .sub-item {
    height: 40px;
    padding-left: 65px !important;
    color: #666;
    font-size: 16px;
}

.submenu-list .sub-item:hover {
    background: #f0f0f0;
}

.submenu-list .sub-item:first-child {
    margin-top: 4px;
}

.submenu-list .sub-item:last-child {
    margin-bottom: 4px;
}

.arrow-icon {
    transition: transform 0.3s ease, color 0.3s ease;
}

.parent-item.active .arrow-icon {
    color: var(--el-color-primary);
}

.main-area {
    position: absolute;
    margin-left: 220px; /* 导航展开时的边距 */
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease; /* 同步过渡效果 */
    flex: 1;
    min-width: calc(100% - 220px); /* 防止内容溢出 */
    width: auto;
}

.nav-left[style*='-220px'] + .main-area {
    /* 当导航折叠时 */
    margin-left: 0;
    min-width: 100%;
}

.main-area .nav-top {
    position: absolute;
    width: 100%;
    height: 60px;
    background-color: #fff;
}

.nav-top .avatar {
    position: absolute;
    right: 10%;
    top: 8px;
    height: 44px;
    width: 44px;
    border-radius: 50%;
}

.nav-top .time-display {
    position: absolute;
    right: 20%; /* 根据头像位置调整 */
    top: calc(50% + 5px);
    transform: translateY(-50%);
    font-size: 25px;
    color: #fb7299;
    font-weight: 500;
    /* background: rgba(245, 245, 245, 0.8); */
    padding: 5px 12px;
    /* border-radius: 15px; */
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

/* 新增响应式样式 */
@media screen and (max-width: 800px) {
    .nav-left {
        width: 220px;
        left: -220px; /* 初始隐藏 */
        transition: left 0.3s ease;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
        z-index: 1000;
    }

    .nav-left.mobile-nav {
        left: 0;
    }

    .main-area {
        margin-left: 0 !important; /* 强制覆盖桌面样式 */
        min-width: 100vw; /* 全屏显示 */
        transition: filter 0.3s ease; /* 只保留模糊过渡 */
    }

    .mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        border: none;
        z-index: 998;
        transition: opacity 0.3s;
    }

    /* 增加导航栏的z-index */
    .nav-left {
        z-index: 999; /* 原2改为999 */
    }

    .logo {
        z-index: 1000; /* 原4改为1000 */
    }

    a.folder {
        z-index: 1001;
    }

    .folder {
        display: block; /* 移动端始终显示折叠按钮 */
    }

    .nav-top .time-display {
        right: 25%;
        font-size: 20px;
    }
}
</style>
