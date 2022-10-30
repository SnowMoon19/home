import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import FirstRecord from '@/views/function/record/firstRecord/FirstRecord.vue';
import LoginPage from '@/views/login/LoginPage.vue';
import AlbumList from "@/views/function/record/photos/AlbumList";
import AlbumShow from "@/views/function/record/photos/AlbumShow";
//import { getToken } from '@/myConfig/auth.js'
//import store from "@/store"; // 验权

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/firstRecord',
    name: 'FirstRecord',
    component: FirstRecord,
  },
  {
    path: '/albumList',
    name: 'AlbumList',
    component: AlbumList,
    children: [
      {
        path: '/albumShow', // 子路径在父路径基础上叠加 todo 没生效
        name: 'AlbumShow',
        component: AlbumShow,
      },
    ]
  },
  {
    path: '/albumList/albumShow',
    name: 'AlbumShow',
    component: AlbumShow,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
