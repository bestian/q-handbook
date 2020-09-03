<template lang="pug">
  q-page.box.box-center
    q-breadcrumbs
      q-breadcrumbs-el(icon='home' to='/')
      q-breadcrumbs-el(label='問答集' icon='widgets' to='/faq')
      q-breadcrumbs-el(:label="f.faqs[$route.params.id].q" icon='build')
    q-separator
    q-list
      q-item
        h4 {{ f.faqs[$route.params.id].q }}
      q-item(v-for="a in f.faqs[$route.params.id].as", :key = "a") {{ a }}
      q-item(v-if = "f.faqs[$route.params.id].es && f.faqs[$route.params.id].es[0]") 參考：
      q-item(clickable, v-ripple, v-for="e in f.faqs[$route.params.id].es", :key = "e.h", :href="e.h", target="_blank")
        img.favicon(:src = "'https://s2.googleusercontent.com/s2/favicons?domain=' + e.t")
        | {{ e.t }}
</template>

<script>
export default {
  name: 'And',
  data () {
    return {
      f: { faqs: [] }
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
