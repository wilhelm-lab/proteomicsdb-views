<template>
  <v-main>
  <v-container fluid>
    <v-row>
      <h1>EGFR - Protein Summary</h1>
      <v-col>
        <v-btn
             color="primary"
             style="right:80px;top:80px;"
             fixed dark top right
             fab small
             >
             <v-icon>fas fa-question</v-icon>
        </v-btn>
        <v-btn
             color="red"
             style="right:80px;top:130px;"
             fixed dark top right
             fab small
             >
             <v-icon>fas fa-bug</v-icon>
        </v-btn>
        <v-btn
             color="primary"
             style="right:80px;bottom:130px;"
             fixed dark bottom right
             fab small
             >
             <v-icon>fas fa-question</v-icon>
        </v-btn>
        <v-btn
             color="red"
             style="right:80px;bottom:80px;"
             fixed dark bottom right
             fab small
             >
             <v-icon>fas fa-bug</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  </v-main>
</template>

<script>
export default {
  props: {
  },
  data: () => ({
  }),
  methods: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  }
}
</script>
<style lang="scss">
</style>
