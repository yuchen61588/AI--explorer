<template>
    <div class="profile-container">
        <div class="profile-header">
            <div class="avatar-container">
                <img
                    :src="user.avatarUrl"
                    alt="User avatar"
                    class="avatar"
                    v-if="user.avatarUrl"
                />
                <div class="avatar-placeholder" v-else>
                    {{ getInitials(user.username) }}
                </div>
            </div>
            <h1 class="username">{{ user.username }}</h1>
        </div>

        <div class="profile-details">
            <div class="detail-item">
                <div class="detail-label">Email</div>
                <div class="detail-value">{{ user.email }}</div>
            </div>

            <div class="detail-item">
                <div class="detail-label">Birthday</div>
                <div class="detail-value">{{ formatDate(user.birthday) }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// You would typically fetch this data from an API
const user = ref({
    username: 'SamHan',
    email: 'samhantx2020@gmail.com',
    balance: 1250.75,
    birthday: '2004-10-12',
    // avatarUrl: null // Set to null to show the initials placeholder
    avatarUrl: require('../icons/avatar.png') // Set to null to show the initials placeholder
})

// Function to get initials from username
const getInitials = username => {
    if (!username) return ''
    return username
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
}

// Format currency with locale
const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

// Format date in a readable format
const formatDate = dateString => {
    if (!dateString) return 'Not provided'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date)
}

// You would typically fetch user data here
onMounted(async () => {
    try {
        // Simulating API call
        // const response = await fetch('/api/user/profile');
        // user.value = await response.json();
        // For demonstration, we're using static data
        // In a real app, you'd load this from your API
    } catch (error) {
        console.error('Failed to load user profile:', error)
    }
})
</script>

<style scoped>
:root {
    /* Navigation 配色 */
    --nav-bg: #ffffff;
    --nav-text: #606266;
    --nav-hover: #f5f5f5;
    --nav-active: #f0f0f0;
    --nav-border: #e6e6e6;
    --nav-top-bg: #ffffff;
    --nav-icon-color: #808080;

    /* 时间/路径显示 */
    --time-display-color: #fb7299;
    --path-display-color: #fb7299; /* 新增路径颜色 */

    /* 日间模式配色 */
    --home-bg: #ffffff;
    --card-bg: #ffffff;
    --text-primary: #333333;
    --text-secondary: #666666;
    --text-tertiary: #999999;
    --border-color: #e0e0e0;

    /* 日历组件 */
    --calendar-today-bg: #e6f7ff;
    --calendar-today-color: #1890ff;
    --calendar-selected-bg: #1890ff;
    --calendar-hover: #f9f9f9;

    /* 交互元素 */
    --button-hover: #f0f0f0;

    /* 视觉效果 */
    --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    /* 区块标题 */
    --section-title-color: #333333;
    --section-title-border: #1890ff;
}

.profile-container {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 60px;
    height: 100vh;
    padding: 2rem;
    background-color: var(--home-bg);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    color: #333333;
}

.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e0e0e0;
}

.avatar-container {
    margin-right: 1.5rem;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #e0e0e0;
}

.avatar-placeholder {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: var(--calendar-selected-bg);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
}

.username {
    font-size: 2rem;
    margin: 0;
    color: #333333;
}

.profile-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.detail-item {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: var(--card-bg);
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    transition: all 0.2s ease;
}

.detail-item:hover {
    background-color: var(--button-hover);
}

.detail-label {
    font-size: 0.9rem;
    color: #999999;
    margin-bottom: 0.25rem;
}

.detail-value {
    font-size: 1.2rem;
    color: #666666;
    font-weight: 500;
}

/* Balance value color special styling */
.detail-item:nth-child(2) .detail-value {
    color: #fb7299;
}

@media (max-width: 600px) {
    .profile-header {
        flex-direction: column;
        text-align: center;
    }

    .avatar-container {
        margin-right: 0;
        margin-bottom: 1rem;
    }
}
</style>
