import { createStore } from 'vuex'

export default createStore({
  state: {
    // 公司号
    gsh: '',
    // 加工单元号
    jgdyh: '',
    userid: '',
    username: '',
    // 任务单号
    rwdh: '',
    jgdymc: '',
    // 开班的班次编码
    BCBM: ''
  },
  mutations: {
    SET_GSH: (state, data) => {
      state.gsh = data;
      localStorage.setItem('gsh', data)
    },
    SET_JGDYH: (state, data) => {
      state.jgdyh = data;
      localStorage.setItem('jgdyh', data)
    },
    SET_JGDYMC: (state, data) => {
      state.jgdymc = data;
      localStorage.setItem('jgdymc', data)
    },
    SET_USERID: (state, data) => {
      state.userid = data;
      localStorage.setItem('userid', data)
    },
    SET_USERNAME: (state, data) => {
      state.username = data;
      localStorage.setItem('username', data)
    },
    SET_RWDH: (state, data) => {
      state.rwdh = data;
      localStorage.setItem('rwdh', data)
    },
    SET_BCBM: (state, data) => {
      state.BCBM = data;
      localStorage.setItem('BCBM', data)
    },
  },
  actions: {
  },
  modules: {
  }
})
