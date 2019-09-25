import PhoneAPI from './../../PhoneAPI'

const state = {
  bankAmont: '1234567890 '
}

const getters = {
  bankAmont: ({ bankAmont }) => bankAmont
}

const actions = {
  sendpara ({ commit }, {id, paratutar}) {
    PhoneAPI.sendpara(id, paratutar)
  }
}

const mutations = {
  SET_BANK_AMONT (state, bankAmont) {
    state.bankAmont = bankAmont
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

