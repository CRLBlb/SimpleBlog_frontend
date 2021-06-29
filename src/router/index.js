import Vue from 'vue'
import VueRouter from 'vue-router'
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/user/Login'
import Home from '@/components/Home'
import InformationIndex from "@/components/information/InformationIndex";
import CommentTable from "@/components/information/CommentTable"
import FollowTable from "@/components/information/FollowTable";
import BroadcastTable from "@/components/information/BroadcastTable";
import LikeTable from "@/components/information/LikeTable";
import BlogIndex from "@/components/blog/BlogIndex";
import InformationSet from "@/components/information/InformationSet";
import UserRegister from "@/components/user/UserRegister";
import Comments from "@/components/blog/Comments";
import UserHome from '../views/UserHome'
import PostPage from "@/views/PostPage";
import EditBlog from "../views/EditBlog";
import OtherHome from "../views/OtherHome";
import MessageIndex from "@/components/information/MessageIndex";
import UserIndex from "@/components/blog/UserIndex";
//管理员Vue文件引入
import AdminHome from "@/components/admin/AdminHome";
import AdminAppIndex from "@/components/home/AdminAppIndex";
import AdminLogin from '@/components/admin/Login'
import Broadcast from '@/components/admin/Broadcast'
import Check from '@/components/admin/Check'
import BroadcastList from '@/components/admin/broadcast/BroadcastList'
import BroadcastPush from '@/components/admin/broadcast/BroadcastPush'
import CheckBlog from '@/components/admin/check/CheckBlog'
import CheckComment from '@/components/admin/check/CheckComment'
import BroadcastDetail from '@/components/admin/broadcast/BroadcastDetail'
import BlogDetail from '@/components/admin/check/BlogDetail'
import UserPage from '@/components/admin/user/UserList'
import PyLike from "@/components/ypy/PyLike";
import PyCollection from "@/components/ypy/PyCollection";
import UserHomeLike from "@/views/UserHomeLike";
import UserHomeCollection from "@/views/UserHomeCollection";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Default',
    redirect: '/home',
    component: Home
  },
  {
    path: '/comments',
    name: 'Comments',
    component: Comments
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // home页面并不需要被访问
    redirect: '/index',
    children: [
      {
        //网站首页
        path: '/index',
        name: 'AppIndex',
        component: AppIndex,
        meta: {
          //页面需要被拦截
          requireAuth: true
        }
      },
      {
        path: '/blog',
        name: 'BlogIndex',
        component: BlogIndex,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/user',
        name: 'UserIndex',
        component: UserIndex,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/blog/article',
        name: 'ArticleDetails',
        component: () => import('../components/blog/ArticleDetails'),
        meta: {
          //页面需要被拦截
          requireAuth: true
        }
      },

        //消息模块
      {
        path: '/information',
        name: 'Information',
        component: InformationIndex,
        meta: {
          requireAuth: true
        },
        children: [
          {
            path: '/information/comment',
            name: 'comment',
            component: CommentTable,
            meta: {
              //页面需要被拦截
              requireAuth: true
            }
          },
          {
            path: '/information/like',
            name: 'like',
            component: LikeTable,
            meta: {
              //页面需要被拦截
              requireAuth: true
            }
          },
          {
            path: '/information/follow',
            name: 'follow',
            component: FollowTable,
            meta: {
              //页面需要被拦截
              requireAuth: true
            }
          },
          {
            path: '/information/broadcast',
            name: 'broadcast',
            component: BroadcastTable,
            meta: {
              //页面需要被拦截
              requireAuth: true
            }
          },
          {
            path: '/information/set',
            name: 'infoSet',
            component: InformationSet,
            meta: {
              //页面需要被拦截
              requireAuth: true
            }
          }
        ]
      },
      //ypy个人主页
      {
        path: '/userhome',
        name: 'UserHome',
        component: UserHome,
        meta: {
          //页面需要被拦截
          requireAuth: true
        }
      },
      {
        path: '/otherhome',
        name: 'OtherHome',
        component: OtherHome,
        meta: {
          //页面需要被拦截
          requireAuth: true
        }
      },
      {
        path: '/postpage',
        name:'PostPage',
        component: PostPage,
        meta: {
          //页面需要被拦截
          requireAuth: true
        }
      },
      {
        path: '/editblog',
        name: 'EditBlog',
        component: EditBlog,
        meta: {
          //页面需要被拦截
          requireAuth: true
        }
      },
      {
        path: '/mylike',
        name: 'MyLike',
        component: UserHomeLike,
        meta: {
          //页面需要被拦截
          requireAuth: true
        }
      },
      {
        path: '/mycollection',
        name: 'MyCollection',
        component: UserHomeCollection,
        meta: {
          //页面需要被拦截
          requireAuth: true
        }
      },

      // 私信模块————张士育
      {
        path: '/message',
        name: 'Message',
        component: MessageIndex
      }

    ]
  },

  // //后台管理员路由设置
  {
    path: '/admin/home',
    name: 'AdminHome',
    component: AdminHome,
    // home页面并不需要被访问
    redirect: '/admin/index',
    children: [
      {
        path: '/admin/index',
        name: 'AdminAppIndex',
        component: AdminAppIndex,
        // meta: {
        //   requireAuth: true
        // }
      },
      {
        path: '/admin/user',
        name: 'UserPage',
        component: UserPage,
      },
      {
        path: '/admin/broadcast',
        name: 'Broadcast',
        component: Broadcast,
        redirect: '/admin/broadcast/list',
        children: [
          {
            path: '/admin/broadcast/list',
            name: 'BroadcastList',
            component: BroadcastList,
          },
          {
            path: '/admin/broadcast/push',
            name: 'BroadcastPush',
            component: BroadcastPush,
          },
          {
            path: '/admin/broadcast/detail',
            name: 'BroadcastDetail',
            component: BroadcastDetail
          }
        ]
      },
      {
        path: '/admin/check',
        name: 'Check',
        component: Check,
        redirect: '/admin/check/blog',
        children: [
          {
            path: '/admin/check/blog',
            name: 'CheckBlog',
            component: CheckBlog,
          },
          {
            path: '/admin/check/comment',
            name: 'CheckComment',
            component: CheckComment,
          },
          {
            path: '/admin/check/blog/detail',
            name: 'BlogDetail',
            component: BlogDetail
          }
        ]
      },
    ]
  },
  //管理员登录
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  //博主登录
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  //博主注册
  {
    path: '/userregister',
    name: 'UserRegister',
    component: UserRegister
  }
]
const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router

