import Vue from 'vue'
import Router from 'vue-router'
import latestThreads from '@/components/latestThreads'
import latestPosts from '@/components/latestPosts'
import myThreads from '@/components/myThreads'
import myPosts from '@/components/myPosts'
import thread from '@/components/thread'
import filtered from '@/components/filtered'

Vue.use(Router)

export default new Router({
    mode: 'history',
    saveScrollPosition: true,
    routes: [{
            path: '/',
            name: 'home',
            component: latestThreads
        },
        {
            path: '/latestThreads',
            name: 'latestThreads',
            component: latestThreads
        },
        {
            path: '/latestposts',
            name: 'latestPosts',
            component: latestPosts
        },
        {
            path: '/mythreads',
            name: 'myThreads',
            component: myThreads
        },
        {
            path: '/myposts',
            name: 'myPosts',
            component: myPosts
        },
        {
            path: '/thread/:id',
            name: 'thread',
            component: thread
        },
        {
            path: '/filtered',
            name: 'filtered',
            component: filtered
        }
    ]
})