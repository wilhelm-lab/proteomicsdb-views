<template>
  <v-container fluid>
    <v-row dense no-gutters>
      <v-col cols="9">
        <h1>{{this.proteinName}} - Peptides MSMS</h1>
      </v-col>
      <v-spacer></v-spacer>
      <downloader top
        right
        direction='left'
        csv
        @csv="getCSV"
      />
    </v-row>
    <v-row justify="space-around" align="center">
      <searchTable ref="searchTable" :dataIn="dataIn" :proteinId="proteinId" :proteinAccession="proteinAccession" @selectedPeptideId="setPeptideId"/>
      <router-view />
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
import downloader from '@/components/DownloadSpeedDial'
import searchTable from '@/components/PeptideMSMSTable'
import router from '@/router';
export default {
  props: {
    proteinName: String,
    proteinId: String,
    peptideId: String,
    proteinAccession: String,
    dataIn: Object
  },
  components: {
    searchTable,
    downloader
  },
  methods: {
    setPeptideId: function(o) {
      router.push({name: 'PeptideDetails', params: {proteinId: this.proteinId, peptideId: o.peptideId.toString()}}).catch(()=>{});
    },
    getCSV: function () {
      this.$refs.searchTable.onExporting();
    }
  },
  computed: {
  },
  watch: {
    peptideId: function (newData) {
      if (newData && newData.peptideId) this.setPeptideId(newData);
    },
  },
  mounted() {
  }
}
</script>
<style lang="scss">
</style>
