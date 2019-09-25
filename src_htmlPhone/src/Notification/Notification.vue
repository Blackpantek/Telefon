<template>
  <div class="notifications">
    <div v-for='notif in list' :key="notif.id" class="notification" :style="style(notif)">
      <div class="title">
        <i v-if="notif.icon" class="fa" :class="'fa-' + notif.icon"/> {{notif.title}}
      </div>
      <div class='message' :style="style(notif)">
        <img v-if="isSMSImage(notif)" :src="notif.message" style="width: 100%; border-radius: 1vh;">
        <span v-else >{{notif.message}} </span>
      </div>
    </div>
  </div>
</template>

<script>
import events from './events'

export default {
  data () {
    return {
      currentId: 0,
      list: []
    }
  },
  mounted () {
    events.$on('add', this.addItem)
  },
  methods: {
    async addItem (event = {}) {
      const dataNotif = {
        ...event,
        id: this.currentId ++,
        duration: parseInt(event.duration) || 3000
      }
      this.list.push(dataNotif)
      window.setTimeout(() => {
        this.destroy(dataNotif.id)
      }, dataNotif.duration)
      if (event.sound !== null && event.sound !== undefined) {
        const audio = new Audio('/html/static/sound/' + event.sound)
        audio.addEventListener('ended', () => {
          audio.src = null
        })
        audio.play()
      }
    },
    style (notif) {
      return {
        backgroundColor: notif.backgroundColor
      }
    },
    destroy (id) {
      this.list = this.list.filter(n => n.id !== id)
    },
    isSMSImage (mess) {
      return /^https?:\/\/.*\.(png|jpg|jpeg|gif)/.test(mess.message)
    }
  }
}
</script>

<style scoped>
  .notification {
    width: 25.5vh;
    position: absolute;
    background-color: rgba(29, 161, 242, 0.6);
    color: white;
    padding: 8px 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    bottom: 5vh;
    right: 50vh;
  }
  .title {
    text-align: center;
    font-size: 18px;
  }
  .message {
    background: #6baed8;
    padding: 1.1vh;
    border-radius: 1vh;
    word-wrap: break-word;
    font-size: 16px;
  }
</style>
