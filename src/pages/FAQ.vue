<template lang="pug">
  q-page.box.box-center
    q-list
      q-item(v-for = "q in f.faqs", :key = "q.q") {{ q.q }}
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      f: {}
    }
  },
  mounted () {
    // GET /someUrl
    this.$axios.get('http://map.alearn.org.tw/static/api/handbook-data.json').then(response => {
      // console.log(response.data)
      this.f = response.data
      // success callback
    }, response => {
      // console.log('error')
      // error callback
    })
  }
}
</script>
