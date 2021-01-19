<template>
  <v-container fluid>
    <v-row>
      <h1>{{title}}</h1>
    </v-row>
    <interactionnetwork :proteinId="proteinId" :proteinAccession="proteinAccession"/>
    <v-btn :color="$store.state.selectedOrganismShown.primaryColor"
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
  </v-container>
</template>

<script>
import interactionnetwork from '@/vue-d3-component-wrappers/InteractionWrapper'
export default {
  components: {
    interactionnetwork: interactionnetwork
  },
  props: {
    proteinName: String,
    proteinId: String,
    title: String,
    proteinAccession: String
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
