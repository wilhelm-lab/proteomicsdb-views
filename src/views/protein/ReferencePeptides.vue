<template>
  <v-container fluid>
    <v-row dense no-gutters>
      <v-col cols="9">
        <h1>{{this.proteinName}} - Reference Peptides</h1>
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
      <searchTable ref="searchTable" :proteinId="proteinId" :proteinAccession="proteinAccession" @selectedPeptideId="setPeptideId"/>
      <router-view />
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
import downloader from '@/components/DownloadSpeedDial'
import searchTable from '@/components/ReferencePeptideTable'
import router from '@/router';
export default {
  props: {
    proteinName: String,
    proteinId: String,
    peptideId: String,
    proteinAccession: String
  },
  components: {
    searchTable,
    downloader
  },
  data: () => ({
    openPopUp: false,
    peptideIdIn: null
  }),
  methods: {
    closePopUp: function() {
      this.openPopUp = false;
    },
    setPeptideId: function(o) {
      this.peptideIdIn = o.peptideId + ''; 
      router.push(this.proteinId + '/'  +this.peptideIdIn).catch(()=>{});
    },
    getCSV: function () {
      this.$refs.searchTable.onExporting();
    }
  },
  computed: {
  },
  watch: {
    peptideId: function (newId) {
      this.setPeptideId(newId);
    },
    peptideIdIn: function(newId) {
      if (!isNaN(newId) && newId !== null) {
        this.peptideIdIn = newId;
        this.openPopUp = true;
      }
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
</style>
