<template>
  <v-container fluid>
    <v-row>
        <v-row>
          <h1>{{title}}</h1>
        </v-row>
        <v-row>
          <v-col cols = "10">
            <ProtvistaProteomicsdbContainer :accession = "proteinAccession"/>
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
import axios from 'axios'
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
  data: () => ({
    showSummary: true,
    showStats: false,
    showGO: false,
    showLinks: false,
    summary: {},
    subcellLoc: [],
    molFunc: [],
    bioProc: [],
    statistics: [],
    green: require('@/assets/commons/green.png'),
    yellow: require('@/assets/commons/yellow.png'),
    red: require('@/assets/commons/red.png')
  }),
  methods: {
    expandPanel: function(panel) {
      this.showSummary = panel === 'summary' ? !this.showSummary : false;
      this.showGO = panel === 'go' ? !this.showGO : false;
      this.showLinks = panel === 'links' ? !this.showLinks : false;
      this.showStats = panel === 'stats' ? !this.showStats : false;

    },
    getSummary: function(){
      let that = this

      if(this.proteinId != null) {
        axios.get('https://www.proteomicsdb.org/proteomicsdb/logic/getProteinSummary.xsjs', {params: {protein_id: that.proteinId }}).then(function (response) {
          that.summary = response.data

          that.subcellLoc = response.data.SUBC_LOC.split("\n ").map((x) => {return(x.replace("\n", ""))}).filter((y) => {return y !== ''})
          that.molFunc = response.data.MOL_FUNC.split("\n ").map((x) => {return(x.replace("\n", ""))}).filter((y) => {return y !== ''})
          that.bioProc = response.data.BIO_PROC.split("\n ").map((x) => {return(x.replace("\n", ""))}).filter((y) => {return y !== ''})

          that.statistics = []
          that.statistics.push({name: "Coverage", value: response.data.SEQUENCE_COVERAGE+"%"})
          that.statistics.push({name: "Unique Peptides", value: response.data.UNIQUE_PEPTIDES})
          that.statistics.push({name: "Unique Peptide Spectra", value: response.data.UNIQUE_PEPTIDES_SPECTRA})
          that.statistics.push({name: "Unique Peptides on Protein Level", value: response.data.UNIQUE_PEPTIDES_PROTEIN})
        })
      }
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.getSummary()
  },
  created() {
    this.getSummary()
  }
}
</script>
<style lang="scss">
</style>
