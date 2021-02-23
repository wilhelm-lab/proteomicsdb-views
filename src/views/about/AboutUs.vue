<template>
  <v-main>
    <v-container fluid ml-5>
      <v-row id="citation" justify="center" class="ma-2">
        <v-col cols="6">
          <citation></citation>
        </v-col>
      </v-row>
      <v-row id="team" justify="center" class="ma-2">
        <v-col cols="6">
          <team></team>
        </v-col>
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
