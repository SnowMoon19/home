import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vant/es/dialog/style'; // 对话框样式
import 'vant/es/notify/style'; // 通知框
import 'vant/es/toast/style'; // 轻提示
import { Dialog } from 'vant';

const app = createApp(App);
app.use(store).use(router).use(ElementPlus).mount('#app')
app.use(Dialog)
