import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: null,
      isAuthenticated: false,
      userData: null,
      uid: "",
      users: [],
      requests: {},
      adminPosts: {},
      headPosts: {},
      posts: {},
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    setUid(state, uid) {
      state.uid = uid;
    },
    setUsers(state, usersData) {
      state.users = usersData;
    },
    setRequests(state, requests) {
      state.requests = requests;
    },
    setAdminPosts(state, adminPosts) {
      state.adminPosts = adminPosts;
    },
    setHeadPosts(state, headPosts) {
      state.headPosts = headPosts;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
});
export default store;
