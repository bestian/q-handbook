<template lang="pug">
  q-page.box.box-center
    q-breadcrumbs
      q-breadcrumbs-el(icon='home' to='/')
      q-breadcrumbs-el(label='問答集' icon='widgets')
    q-separator
    q-list(bordered, separator)
      q-item
        h4 問答集
      q-item(clickable,  v-ripple,  v-for = "(q, index) in f.faqs", :key = "q.q", :to = "'/ans/' + index")
        | {{ q.q }}
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      f: {},
      myQ: undefined
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

<style type="text/css" scoped="">

.favicon {
    width: 16px;
    height: 16px;
}
</style>
