import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$message = ElMessage

createApp(App).use(ElementPlus).use(router).mount('#app')
