<template>
  <v-container fluid>
    <v-row>
      <h1>{{this.proteinName}} - Peptides MSMS</h1>
    </v-row>
    <v-row align="center" no-gutters>
      <searchTable :proteinId="proteinId" :proteinAccession="proteinAccession" @selectedPeptideId="setPeptideId"/>
      <router-view />
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
import searchTable from '@/components/PeptideMSMSTable'
import router from '@/router';
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
    peptideIdIn: null
  }),
  methods: {
    closePopUp: function() {
      this.openPopUp = false;
    },
    setPeptideId: function(o) {
      this.peptideIdIn = o.peptideId + ''; 
      router.push(this.proteinId + '/'  +this.peptideIdIn).catch(()=>{});
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
