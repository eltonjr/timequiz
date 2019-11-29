<template>
  <section class="section">
    <page-header :showButton="false" :showTexts="false" :user="user"></page-header>

  </section>

  <!-- <div>
   </div>-->
</template>

<script>
import PageHeader from '@/components/header/Header'
import serviceForm from '@/components/form'

export default {
  name: 'Result',
  props: {
  },
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    this.user = serviceForm.currentUser
  },
  computed: {
  },
  watch: {
  },
  components: {
    PageHeader
  }
}
</script>

<style lang="sass">
</style>
