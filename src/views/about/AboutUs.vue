<template>
  <v-main>
    <v-container fluid ml-5>
      <v-row justify="center" class="ma-2">
        <citation></citation>
      </v-row>
      <v-row justify="center">
        <team></team>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import citation from "@/views/about/Citation"
import team from "@/views/about/Team"
export default {
  props: {
  },
  components: {
    citation,
    team
  },
  data: () => ({
  }),
  methods: {
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  }
}
</script>
<style lang="scss">
</style>
