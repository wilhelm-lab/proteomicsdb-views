<template>
  <v-container fluid>
    <v-row>
      <h1>{{this.proteinName}} - Peptides MSMS</h1>
    </v-row>
    <v-row justify="center">
      <v-card>
        <v-card-title>Quantification methods</v-card-title>
        <v-card-text>
          <v-row class="mx-4">
            <v-checkbox v-for="item in aQuantificationMethods" :key="item.text" :label="item.text" v-model="item.value" class="mr-6"/>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn :color="$store.state.selectedOrganismShown.primaryColor" class="white--text" @click="setLabelTypes">Calculate</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row align="center">
      <searchTable :proteinId="proteinId" :proteinAccession="proteinAccession" :labelTypes="selectedLabelTypes" @selectedPeptideId="setPeptideId"/>
      <router-view />
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
import searchTable from '@/components/ProteotypicityTable'
import axios from 'axios'
export default {
  props: {
    proteinName: String,
    proteinId: String,
    peptideId: String,
    proteinAccession: String
  },
  components: {
    searchTable
  },
  data: () => ({
    openPopUp: false,
    peptideIdIn: null,
    aQuantificationMethods: [],
    selectedLabelTypes: ''
  }),
  methods: {
    setLabelTypes: function () {
      this.selectedLabelTypes = this.aQuantificationMethods.filter((x) => { return (x.value === true)})
      .map((x) => {return x.text}).join(";");
    },
    closePopUp: function() {
      this.openPopUp = false;
    },
    setPeptideId: function(o) {
      this.peptideIdIn = o.peptideId + ''; 
      window.open('/protein/peptides/' + this.proteinId + '/' + this.peptideIdIn, '_blank');
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
