import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: {
            username: '',
            email: '',
            userId: ''
        },
        threads: [],
        posts: [],
        threadId: '',
        filteredThread: [],
        allMembers: [],
        msg: '',
        threadName: '',
        loggedStatus: false,
        myThreads: [],
        myPosts: [],
        threadPosts: [],
        filteredData: [],
        searchText: '',
        searchType: 'threads'
    },
    getters: {
        getuser(state) {
            return state.user;
        },
        getToken(state) {
            return sessionStorage.getItem('accessToken');
        },
        getUserId(state) {
            return state.user.userId;
        },
        getThreadId(state) {
            return state.threadId;
        },
        getUsername(state) {
            return state.user.username;
        },
        getThreads(state) {
            return state.threads;
        },
        getFilteredData(state) {
            return state.filteredData;
        },
        getPosts(state) {
            return state.posts;
        },
        getThreadHeader(state) {
            return state.threadHeader;
        },
        getMyThreads(state) {
            return state.myThreads
        },
        getMyPosts(state) {
            return state.myPosts
        },
        getAllMembers(state) {
            return state.allMembers.filter(function(member) {
                return member.username != state.user.username;
            });
            //return state.allMembers;
        },
        getThreadName(state) {
            return state.threadName;
        },
        getMsg(state) {
            return state.msg;
        },
        getLoggedStatus(state) {
            return state.loggedStatus;
        },
        getThreadPosts(state) {
            return state.threadPosts;
        },
        getSearchText(state) {
            return state.searchText;
        },
        getSearchType(state) {
            return state.searchType;
        }
    },
    mutations: {
        setUser(state, payload, token) {
            state.user.username = payload.username;
            state.user.email = payload.email;
            state.user.userId = payload.userId;
            sessionStorage.setItem('accessToken', token);
            state.loggedStatus = true;
            //store.commit('SET_MEMBER_ACTIVE', payload.username);
        },
        setUserNone(state) {
            //store.commit('SOCKET_SET_MEMBER_NOT_ACTIVE', store.getters.getUsername);
            state.user.username = '';
            state.user.email = '';
            state.user.userId = '';
            sessionStorage.removeItem("accessToken");
            state.loggedStatus = false;
        },
        setPosts(state, payload) {
            state.posts = payload;
        },
        setThreads(state, payload) {
            state.threads = payload;
        },
        setThreadId(state, payload) {
            state.threadId = payload;
        },
        setMsg(state, payload) {
            state.msg = payload
        },
        setAllMembers(state, payload) {
            state.allMembers = payload;
        },
        setThreadName(state, payload) {
            state.threadName = payload;
        },
        setMyThreads(state, payload) {
            state.myThreads = payload;
        },
        setMyPosts(state, payload) {
            state.myPosts = payload;
        },
        setThreadPosts(state, payload) {
            state.threadPosts = payload;
        },
        setSearchText(state, payload) {
            if (payload) state.searchText = payload;
        },
        setSearchType(state, payload) {
            state.searchType = payload;
        },
        setFilteredData(state, payload) {
            if (!payload.text) {
                return;
            } else {
                if (payload.type === 'threads') {
                    // Filter by search thread title
                    state.filteredData = store.getters.getThreads.filter(thread => { return thread.title.match(payload.text) });
                }
                if (payload.type === 'posts') {
                    // Filter thread by selected post
                    state.filteredData = store.getters.getPosts.filter(post => { return post.title.match(payload.text) })
                }
                if (payload.type === 'member') {
                    // Find all posts belonging to selected member
                    state.filteredData = store.getters.getPosts.filter(post => { return post.postedBy.match(payload.text) })
                }
            }
            return state.filteredData;
        },
        setLoggedStatus(state, payload) {
            state.loggedStatus = payload;
        },
        SOCKET_SET_MEMBER_ACTIVE(state, payload) {
            let members = state.allMembers.map(m =>
                m.username === payload ? {...m, active: true } : m
            )
            store.dispatch('setAllMembers', members);
        },
        SOCKET_SET_MEMBER_NOT_ACTIVE(state, payload) {
            let members = state.allMembers.map(m =>
                m.username === payload ? {...m, active: false } : m
            )
            store.dispatch('setAllMembers', members);
        }
    },
    actions: {
        setThreads(context, threads) {
            context.commit('setThreads', threads);
        },
        setPosts(context, posts) {
            context.commit('setPosts', posts);
        },
        addMember(context, payload) {
            context.commit('addMember', payload)
        },
        setAllMembers(context, payload) {
            context.commit('setAllMembers', payload);
        },
        setMyThreads(context, payload) {
            context.commit('setMyThreads', payload);
        },
        setMyPosts(context, payload) {
            context.commit('setMyPosts', payload);
        },
        setThreadPosts(context, payload) {
            context.commit('setThreadPosts', payload);
        }
    }

});