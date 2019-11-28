<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Neoway quiz
          </h1>
          <!-- <h2 class="subtitle">
            Primary subtitle
          </h2> -->
        </div>
      </div>
    </section>
    <router-view/>
  </div>
  <!-- here goes the score + quiz -->
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="sass" src="./app.scss">
</style>
