const dic = {
  state: {
    dicMap: {},

  },
  getters: {
    getDic: state => keyword => state.dicMap[keyword],
    getDic1: state => state.dicMap
  },
  mutations: {
    setDicItem: (state, { key, value }) => {
      state.dicMap[key] = value
    }
  }
}

export default dic