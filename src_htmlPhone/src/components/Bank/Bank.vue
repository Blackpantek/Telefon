<template>
  <div class="screen">
    <div class='elements'>
      <img class="logo_maze" src="/html/static/img/app_bank/logo_swish.png">
      <div class="hr"></div>
      <div class='element'>
        <div class="element-content">
          <span>Saldo:</span>
          <span>{{ bankAmontFormat }}</span>
        </div> 
        <div class="element-content" ref="form"> 
          <input v-bind:class="{ select: 0 === currentSelect}" v-autofocus oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');" ref="form0" v-model="id" class="paragonder" placeholder="Mottagare">
        </div> 
        <div class="element-content">           
          <input v-bind:class="{ select: 1 === currentSelect}" oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');" ref="form1" v-model="paratutar" class="paragonder" placeholder="Belopp">
          <button v-bind:class="{ select: 2 === currentSelect}" ref="form2" id="gonder" @click.stop="paragonder" class="buton">Swisha</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      id: '',
      paratutar: '',
      currentSelect: 0
    }
  },
  methods: {
    ...mapActions(['sendpara']),
    scrollIntoViewIfNeeded: function () {
      this.$nextTick(() => {
        document.querySelector('focus').scrollIntoViewIfNeeded()
      })
    },
    onBackspace () {
      this.$router.go(-1)
    },
    iptal () {
      // this.$router.push({path: '/messages'})
      this.$router.go(-1)
    },
    paragonder () {
      const paratutar = this.paratutar.trim()
      if (paratutar === '') return
      this.paratutar = ''
      this.sendpara({
        id: this.id,
        paratutar
      })
    },
    onUp: function () {
      if ((this.currentSelect - 1) >= 0) {
        this.currentSelect = this.currentSelect - 1
      }
      this.$refs['form' + this.currentSelect].focus()
      console.log(this.currentSelect)
    },
    onDown () {
      if ((this.currentSelect + 1) <= 3) {
        this.currentSelect = this.currentSelect + 1
      }
      this.$refs['form' + this.currentSelect].focus()
      console.log(this.currentSelect)
    },
    onEnter () {
      if (this.ignoreControls === true) return
      if (this.currentSelect === 2) {
        this.paragonder()
      } else if (this.currentSelect === 0) {
        this.$phoneAPI.getReponseText().then(data => {
          let message = data.text.trim()
          this.id = message
        })
      } else if (this.currentSelect === 1) {
        this.$phoneAPI.getReponseText().then(data => {
          let message = data.text.trim()
          this.paratutar = message
        })
      } else if (this.currentSelect === 3) {
        this.iptal()
      }
    }
  },
  computed: {
    ...mapGetters(['bankAmont']),
    bankAmontFormat () {
      return Intl.NumberFormat().format(this.bankAmont)
    }
  },
  created () {
    this.display = this.$route.params.display
    if (!this.useMouse) {
      this.$bus.$on('keyUpArrowDown', this.onDown)
      this.$bus.$on('keyUpArrowUp', this.onUp)
      this.$bus.$on('keyUpEnter', this.onEnter)
    }
    this.$bus.$on('keyUpBackspace', this.onBackspace)
  },
  beforeDestroy () {
    this.$bus.$off('keyUpArrowDown', this.onDown)
    this.$bus.$off('keyUpArrowUp', this.onUp)
    this.$bus.$off('keyUpEnter', this.onEnter)
    this.$bus.$off('keyUpBackspace', this.onBackspace)
  }
}
</script>

<style scoped>
  .screen{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 18px;
  background-color: white;
  }
  .title{
  padding-left: 16px;
  height: 34px;
  line-height: 34px;
  font-weight: 700;
  color: white;
  background-color: rgb(76, 175, 80);
  }
  .elements{
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  }
  .hr{
  width: 100;
  height: 4px;
  margin-top: 4px;
  background-image: linear-gradient(45deg, #17479e, #00bfdf, #00a651);
  }
  .logo_maze {
  width: 100%;
  height: auto;
  flex-shrink: 0;
  }
  .element-content{
  margin-top: 24px;
  display: block;
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  color: black;
  }
  .paragonder{
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  .buton{
  border: none;
  color: #fff;
  background-color: #1dafec;
  padding: .5rem 1rem;
  font-size: 2.50rem;
  line-height: 1.5;
  margin-top: 1.25rem;
  margin-bottom: .25rem;
  cursor: pointer;
  border-radius: .3rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  text-transform: none;
  box-shadow: inset 2px 2px 2px #ccc;
  }
  .select{
  border: 2px double #1dafec;
  }
</style>
