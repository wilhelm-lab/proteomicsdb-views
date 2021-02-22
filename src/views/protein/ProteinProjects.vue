<template>
  <v-container fluid>
    <v-row dense no-gutters>
      <v-col cols="9">
        <h1>{{this.proteinName}} - Projects</h1>
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
      <searchTable ref="searchTable" :proteinId="proteinId" :proteinAccession="proteinAccession"/>
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
import downloader from '@/components/DownloadSpeedDial'
import searchTable from '@/components/ProteinProjectTable'
export default {
  props: {
    proteinName: String,
    proteinId: String,
    proteinAccession: String
  },
  components: {
    searchTable,
    downloader
  },
  data: () => ({
    openPopUp: false
  }),
  methods: {
    closePopUp: function() {
      this.openPopUp = false;
    },
    getCSV: function () {
      this.$refs.searchTable.onExporting();
    }
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
