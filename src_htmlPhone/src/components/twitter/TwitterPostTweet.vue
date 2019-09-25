<template>
  <div class="phone_content">
    <div class='tweet_write'>
      <textarea class="textarea-input"
                v-model.trim="message"
                v-autofocus
                :placeholder="IntlString('APP_TWITTER_PLACEHOLDER_MESSAGE')"></textarea>
    </div>
    <div style="display: flex; justify-content: center;">
      <button v-bind:class="{ select: 0 === currentSelect}" ref="form0" @click="tweeter" class="buton">{{ IntlString('APP_TWITTER_BUTTON_ACTION_TWEETER') }}</button>
    </div>
    <div style="display: flex; justify-content: center;">
      <button v-bind:class="{ select: 1 === currentSelect}" ref="form1" @click="tweetphoto" class="buton">{{ IntlString('APP_TWITTER_BUTTON_ACTION_TWEETPHOTO') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {},
  data () {
    return {
      message: '',
      currentSelect: 0
    }
  },
  computed: {
    ...mapGetters(['IntlString', 'useMouse'])
  },
  watch: {
  },
  methods: {
    ...mapActions(['twitterPostTweet', 'tweetphoto']),
    async onEnter () {
      if (this.ignoreControls === true) return
      if (this.currentSelect === 1) {
        this.tweetphoto()
      } else if (this.currentSelect === 0) {
        const rep = await this.$phoneAPI.getReponseText()
        if (rep !== undefined && rep.text !== undefined) {
          const message = rep.text.trim()
          if (message.length !== 0) {
            this.twitterPostTweet({ message })
          }
        }
      }
    },
    onUp: function () {
      if ((this.currentSelect - 1) >= 0) {
        this.currentSelect = this.currentSelect - 1
      }
      this.$refs['form' + this.currentSelect].focus()
      console.log(this.currentSelect)
    },
    onDown () {
      if ((this.currentSelect + 1) <= 1) {
        this.currentSelect = this.currentSelect + 1
      }
      this.$refs['form' + this.currentSelect].focus()
      console.log(this.currentSelect)
    },
    async tweetphoto () {
      const { url } = await this.$phoneAPI.takePhoto()
      if (url !== null && url !== undefined) {
        await this.twitterPostTweet({ message: url })
        this.message = ''
      }
    },
    async tweeter () {
      if (this.message === '') return
      await this.twitterPostTweet({ message: this.message })
      this.message = ''
    },
    onBack () {
      if (this.useMouse === true && document.activeElement.tagName !== 'BODY') return
      this.$bus.$emit('twitterHome')
    }
  },
  created () {
    if (!this.useMouse) {
      this.$bus.$on('keyUpEnter', this.onEnter)
    }
    this.$bus.$on('keyUpBackspace', this.onBack)
    this.$bus.$on('keyUpArrowDown', this.onDown)
    this.$bus.$on('keyUpArrowUp', this.onUp)
  },
  async mounted () {
  },
  beforeDestroy () {
    this.$bus.$off('keyUpBackspace', this.onBack)
    this.$bus.$on('keyUpArrowDown', this.onDown)
    this.$bus.$on('keyUpArrowUp', this.onUp)
    this.$bus.$off('keyUpEnter', this.onEnter)
  }
}
</script>

<style scoped>
.phone_content {
  background: rgb(21, 32, 43);
}

.tweet_write{
    widows: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
}
.tweet_write .textarea-input{
  align-self: center;
  width: 90%;
  margin-top: 20px;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 13px 16px;
  height: 336px;
  background-color: #ffffff;
  color: white;
  border-radius: 16px;
  resize: none;
  color: #222;
  font-size: 18px;
}

.tweethaci{
  background-color: #1da1f2;
    padding: 1vh;
    border-radius: 1vh;
    right: 10px;
}

.tweet_send{
  align-self: flex-end;
  width: 120px;
  height: 32px;
  float: right;
  border-radius: 16px;
  background-color: rgb(29, 161, 242);
  margin-right: 12px;
  margin-bottom: 2px;
  color: white;
  line-height: 32px;
  text-align: center;
  margin: 26px 20px;
  font-size: 16px;
}
.tweet_send:hover {
  cursor: pointer;
  background-color: #0084b4;
}
.buton{
    border: none;
    color: #fff;
    background-color: #1da1f2;
    padding: .5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    margin-top: 1.25rem;
    margin-bottom: .25rem;
    cursor: pointer;
    border-radius: .3rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    text-transform: none;
    margin-right: 15px;
    margin-left: 15px;
}

  .select {
    position: relative;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, .5);
    border: solid 1px #AAB8C2;
  }
</style>
