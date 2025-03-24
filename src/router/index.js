import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import('@/views/main.vue'),
        children: [
            {
                // 默认子路由
                path: '',
                redirect: '/main/home'
            },
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/home.vue')
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/views/Profile.vue')
            },
            // 其他子路由可以继续在这里添加
            {
                path: 'datacheck',
                name: 'datacheck',
                component: () => import('@/views/DataCheck.vue'),
                children: [
                    {
                        //默认子路由
                        path: '',
                        redirect: '/main/datacheck/o1-mini'
                    },
                    {
                        path: 'o1-mini',
                        name: 'o1-mini',
                        component: () =>
                            import('@/views/openAI/OpenaiO1Mini.vue')
                    },
                    {
                        path: 'Chatgpt4o',
                        name: 'Chatgpt4o',
                        component: () =>
                            import('@/views/openAI/OpenaiChatgpt4o.vue')
                    },
                    {
                        path: 'o1-preview',
                        name: 'o1-preview',
                        component: () =>
                            import('@/views/openAI/OpenaiO1Preview.vue')
                    },
                    {
                        path: 'deepseekV3',
                        name: 'deepseekV3',
                        component: () =>
                            import('@/views/DeepSeek/DeepseekV3.vue')
                    },
                    {
                        path: 'deepseekR1',
                        name: 'deepseekR1',
                        component: () =>
                            import('@/views/DeepSeek/DeepSeekR1.vue')
                    },
                    {
                        path: 'Qwen2_5Max',
                        name: 'Qwen2_5Max',
                        component: () =>
                            import('@/views/Alibaba/AlibabaQwen2_5Max.vue')
                    },
                    {
                        path: 'Qwq32bThinking',
                        name: 'Qwq32bThinking',
                        component: () =>
                            import('@/views/Alibaba/AlibabaQwq32bThinking.vue')
                    },
                    {
                        path: 'Llama3_1Nemotron',
                        name: 'Llama3_1Nemotron',
                        component: () =>
                            import('@/views/Meta/MetaLlama3_1Nemotron.vue')
                    },
                    {
                        path: 'Llama405bInstruct',
                        name: 'Llama405bInstruct',
                        component: () =>
                            import('@/views/Meta/MetaLlama405bInstruct.vue')
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
