import { login, logout, getInfo } from '@/api/user'
//import { getToken, setToken, removeToken } from '@/utils/auth'
import { getToken, setToken, removeToken, setUser, removeUser } from "@/utils/auth";
import { resetRouter } from '@/router'
import store from './../index'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    //init: false
  };
};

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  //SET_INIT: (state, data) => {
  //  state.init = data;
  //}
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const menulist = []
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })//改过
        .then(response => {
        const { data } = response
        // 权限
        commit('SET_TOKEN', data.token);
        setToken(data.token);
        resolve()
        }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const {  name,roles,avatar } = data
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_NAME', name)
        commit('SET_ROLES', roles)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
  //logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        //localStorage.removeItem('roles')//+
        //commit('SET_INIT', false)
        //commit('SET_TOKEN', '');
        //commit("SET_ROLES", '');//+
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        commit('SET_ROLES',[])
        //removeUser();//+
        //commit('SET_MENULIST', '');
        //dispatch('tagsView/delAllViews', null, { root: true });//+
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      //removeUser();
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

