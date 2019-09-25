import PhoneAPI from './../../PhoneAPI'

const state = {
  messages: []
}

const getters = {
  messages: ({ messages }) => messages,
  nbMessagesUnread: ({ messages }) => {
    return messages.filter(e => e.isRead !== 1).length
  }
}

const actions = {
  setMessages ({ commit }, messages) {
    commit('SET_MESSAGES', messages)
  },
  sendMessage ({ commit }, {phoneNumber, message}) {
    PhoneAPI.sendMessage(phoneNumber, message)
  },
  deleteMessage ({ commit }, { id }) {
    PhoneAPI.deleteMessage(id)
  },
  deleteMessagesNumber ({ commit, state }, { num }) {
    PhoneAPI.deleteMessagesNumber(num)
    commit('SET_MESSAGES', state.messages.filter(mess => {
      return mess.transmitter !== num
    }))
  },
  deleteAllMessages ({ commit }) {
    PhoneAPI.deleteAllMessages()
    commit('SET_MESSAGES', [])
  },
  setMessageRead ({ commit }, num) {
    PhoneAPI.setMessageRead(num)
    commit('SET_MESSAGES_READ', { num })
  },
  resetMessage ({ commit }) {
    commit('SET_MESSAGES', [])
  }
}

const mutations = {
  SET_MESSAGES (state, messages) {
    state.messages = messages
  },
  ADD_MESSAGE (state, message) {
    state.messages.push(message)
  },
  SET_MESSAGES_READ (state, { num }) {
    for (let i = 0; i < state.messages.length; i += 1) {
      if (state.messages[i].transmitter === num && state.messages[i].isRead !== 1) {
        state.messages[i].isRead = 1
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

if (process.env.NODE_ENV !== 'production') {
  const time = new Date().getTime()
  state.messages = [
    {id: 0, transmitter: 'Steff', receiver: '06', time: time - 160, message: '#666-123', isRead: 1, owner: 0},
    {id: 1, transmitter: '073-097 71 27', receiver: '06', time: time - 160, message: 'Vad gör du?', isRead: 1, owner: 0},
    {id: 2, transmitter: '072-328 31 12', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 0},
    {id: 3, transmitter: '072-328 31 12', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 1},
    {id: 4, transmitter: '072-328 31 12', time, message: 'GPS: 244.21, -123.15', isRead: 1, owner: 0},
    {id: 2, transmitter: '072-328 31 12', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 0},
    {id: 3, transmitter: '072-328 31 12', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 1},
    {id: 4, transmitter: '072-328 31 12', time, message: 'GPS: 244.21, -123.15', isRead: 1, owner: 0},
    {id: 2, transmitter: '072-328 31 12', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 0},
    {id: 3, transmitter: '073-097 71 27', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 1},
    {id: 4, transmitter: '073-097 71 27', time, message: 'GPS: 244.21, -123.15', isRead: 1, owner: 0},
    {id: 2, transmitter: '073-097 71 27', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 0},
    {id: 3, transmitter: '073-097 71 27', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 1},
    {id: 4, transmitter: '073-097 71 27', time, message: 'GPS: 244.21, -123.15', isRead: 1, owner: 0},
    {id: 2, transmitter: '073-097 71 27', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 0},
    {id: 3, transmitter: '073-097 71 27', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 1},
    {id: 4, transmitter: '073-097 71 27', time, message: 'GPS: 244.21, -123.15', isRead: 1, owner: 0},
    {id: 2, transmitter: '073-097 71 27', time, message: 'Vad gör du ? 🥧', isRead: 1, owner: 0},
    {id: 3, transmitter: '073-097 71 27', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 1},
    {id: 4, transmitter: '073-097 71 27', time, message: 'GPS: 244.21, -123.15', isRead: 1, owner: 0},
    {id: 2, transmitter: '073-097 71 27', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 0},
    {id: 3, transmitter: '073-097 71 27', time, message: 'Vad gör du? 🥧', isRead: 1, owner: 1},
    {id: 4, transmitter: '073-097 71 27', time, message: 'GPS: 244.21, -123.15', isRead: 1, owner: 0},
    {id: 5, transmitter: 'Polismynigheten', time, message: 'Vad gör du? 🍻', isRead: 1, owner: 1},
    {id: 6, transmitter: 'Sjukvården', time, message: 'Vad gör du? 🍻', isRead: 1, owner: 1},
    {id: 7, transmitter: '01', time, message: 'Vad gör du? 🍻', isRead: 1, owner: 0},
    {id: 8, transmitter: '01', time, message: '😀🥵🍻🍻🥛', isRead: 0, owner: 1},
    {id: 9, transmitter: '01', time, message: 'GPS: -1034.5810546875, -2734.1027832031', isRead: 1, owner: 0},
    {id: 44, transmitter: '01', time, message: 'https://i.imgur.com/gthahbs.png', isRead: 1, owner: 0},
    {id: 10, transmitter: '02', time, message: 'Vad gör du? 🍻', isRead: 1, owner: 0},
    {id: 11, transmitter: '04', time, message: 'Vad gör du? 🍻', isRead: 1, owner: 0},
    {id: 12, transmitter: '04', time, message: 'Vad gör du? 🍻', isRead: 1, owner: 0},
    {id: 13, transmitter: '09', time, message: 'Vad gör du? 🍻', isRead: 1, owner: 0}
  ]
}
