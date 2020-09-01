<template lang="pug">
  q-page(class="box box-center")
    br
    br
    .ui.comments.container(style="width: 100%; max-width: 600px; margin: 0 auto;")
      q-chat-message.comment#talk(v-for = "t in talks", :class="t[0].user ? 'user' : 'bot'", :sent = "t[0].user", :key="t[0].text")
        q-markdown(v-if="t[0].text") {{ t[0].text }}
        br
        q-btns
          q-btn(v-for = "b in t[0].buttons" @click="say(b.payload)", :key="b.payload") {{ b.title }}
          q-btn(v-if="!t[0].user", href="https://forms.gle/BK1HUgBzkM6MYVKT9", target="_blank") 錯誤回報
    hr
    .ui.form.container(style="width: 100%; max-width: 600px; margin: 0 auto;")
      .ui.field
        i.user.icon
        input#say(v-model="userSay" list="intents" placeholder="您的問題..." @keyup.enter="say(userSay)")
        q-btn(@click="say(userSay)") 送出
    datalist#intents
      option(v-for = "i in intents") {{ i }}
</template>

<script>

export default {
  name: 'PageIndex',
  data () {
    return {
      userSay: '',
      talks: [],
      domain: {},
      intents: [],
      responses: [],
      actions: []
    }
  },
  methods: {
    say: function (str) {
      console.log(str)
      this.talks.push([{
        user: true,
        text: str
      }])
      setTimeout(() => { window.scrollTo(0, document.body.scrollHeight) }, 100)
      this.listen(str)
    },
    listen: function (str) {
      console.log(str)
      if (this.intents.indexOf(str) > -1) {
        this.talks.push(this.responses['utter_' + str])
      } else {
        this.talks.push(this.responses.utter_default)
      }
      this.userSay = ''
      this.$forceUpdate()
    }
  },
  mounted () {
    // GET /someUrl
    this.$axios.get('http://map.alearn.org.tw/static/api/domain.json').then(response => {
      console.log(response.data)
      this.domain = response.data
      this.intents = this.domain.intents
      this.actions = this.domain.actions
      this.responses = this.domain.responses

      this.listen('')
      // success callback
    }, response => {
      console.log('error')
      // error callback
    })
  }
}
</script>

<style type="text/css">

.ui.comments {
  font-size: 18px !important;
}

</style>
