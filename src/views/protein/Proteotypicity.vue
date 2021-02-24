<template>
  <v-container fluid>
    <v-row dense no-gutters>
      <v-col cols="9">
        <h1>{{this.proteinName}} - Proteotypicity</h1>
      </v-col>
      <v-spacer></v-spacer>
      <downloader top
             :disabled="show"
             right
             direction='left'
             csv
             @csv="getCSV"
             />
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card class="mt-2">
          <v-toolbar :color="$store.state.selectedOrganismShown.secondaryColor" elevation="2" dark dense>
            <v-card-title>Quantification methods</v-card-title>
          </v-toolbar>
          <v-card-text>
            <v-combobox
                chips
                multiple
                deletable-chips
                v-model="aSelectedQuantificationMethods"
                label="Select methods" 
                :items="aQuantificationMethods"
                item-text="text"
                return-object
                item-value="text"/>
            </v-card-text>
            <v-card-actions>
              <v-btn :color="$store.state.selectedOrganismShown.primaryColor" class="white--text" @click="setLabelTypes2">Calculate</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="9">
          <searchTable ref="proteotypicityTable" :proteinId="proteinId" :proteinAccession="proteinAccession" :labelTypes="selectedLabelTypes" @selectedPeptideId="setPeptideId" @dataLoaded="show=false" />
        </v-col>
        <router-view />
      </v-row>
      <v-row>
      </v-row>
    </v-container>
</template>

<script>
import downloader from '@/components/DownloadSpeedDial';
import searchTable from '@/components/ProteotypicityTable';
import axios from 'axios';
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
    peptideIdIn: null,
    aQuantificationMethods: [],
    aSelectedQuantificationMethods: [],
    selectedLabelTypes: '',
    show: true
  }),
  methods: {
    getCSV: function () {
      this.$refs.proteotypicityTable.onExporting();
    },
    setLabelTypes2: function () {
      this.selectedLabelTypes = this.aSelectedQuantificationMethods.map((x) => x.text).join(";");
    },
    setLabelTypes: function () {
      this.selectedLabelTypes = this.aQuantificationMethods.filter((x) => { return (x.value === true)})
      .map((x) => {return x.text}).join(";");
      this.show=false;
    },
    closePopUp: function() {
      this.openPopUp = false;
    },
    setPeptideId: function(o) {
      this.peptideIdIn = o.peptideId + ''; 
      window.open('/protein/' + this.proteinId + '/peptides/' + this.peptideIdIn, '_blank');
    },
    getQuantificationMethods: function () {
      var that = this;
      axios.get('https://www.proteomicsdb.org/logic/getQuantificationTypes.xsjs', {params: {protein_id: this.proteinId}})
      .then(function(response) {
        that.aQuantificationMethods = response.data.map((x) => {return {text: x, value: false}});
      });
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
    this.getQuantificationMethods();
  }
}
</script>
<style lang="scss">
</style>
