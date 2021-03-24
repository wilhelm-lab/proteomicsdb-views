<template>
  <v-container fluid>
    <v-row>
        <v-row>
          <h1>{{title}}</h1>
        </v-row>
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
    <v-row>
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
      return "https://d23.proteomicsdb.in.tum.de/proteomicsdb/" +
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
