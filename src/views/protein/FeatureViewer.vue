<template>
  <v-container fluid>
    <v-row>
        <v-col>
          <h1>{{title}}</h1>
        </v-col>
        <v-row>
          <v-col cols = "11">
            <v-card >
            <ProtvistaProteomicsdbContainer v-if="loaded"
                                            :accession="proteinAccession"
                                            :config-url="configUrl"/>
            </v-card>
          </v-col>
        </v-row>
    </v-row>
  </v-container>
</template>

<script>
import ProtvistaProteomicsdbContainer from "@/components/ProtvistaProteomicsdbContainer.vue"
export default {
  props: {
    proteinName: String,
    proteinId: String,
    title: String,
    proteinAccession: String
  },
  components: {
    ProtvistaProteomicsdbContainer: ProtvistaProteomicsdbContainer
  },
  watch: {},
  data: function() {
    return {}
  },
  methods: {
  },
  computed: {
    loaded: function() {
      return Boolean(this.proteinAccession)
    },
    configUrl: function() {
      return `${this.$store.state.host}/proteomicsdb/` +
          `logic/featureViewer/getConfig.xsjs?accession=${this.proteinAccession}`;
    }
  },
  mounted() {
  },
  created() {
  }
}
</script>
<style lang="scss">
</style>
