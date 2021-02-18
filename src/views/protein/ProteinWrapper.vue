<template>
  <v-main>
  <v-container fluid>
    <v-row>
    <v-navigation-drawer
      v-model="leftMenu"
      expand-on-hover
      app
      clipped
      >
      <v-list shaped>
        <v-list-item-group v-model="selectedTab" :color="$store.state.selectedOrganismShown.secondaryColor" mandatory>
          <v-list-item @click="showSummary">
            <v-list-item-action>
              <v-icon>far fa-file-alt</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Summary</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showFeatures">
            <v-list-item-action>
              <v-icon>fas fa-align-left</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Feature viewer</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showPeptidesMSMS">
            <v-list-item-action>
              <v-icon>far fa-chart-bar</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Peptides MS/MS</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showReferencePeptides">
            <v-list-item-action>
              <v-icon>mdi-chart-bar-stacked</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Reference Peptides</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showFDR">
            <v-list-item-action>
              <v-icon>fas fa-chart-area</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>FDR estimation</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showExpression">
            <v-list-item-action>
              <v-icon>fas fa-street-view</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Expression</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showNetwork">
            <v-list-item-action>
              <v-icon>mdi-apache-kafka</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Interaction network</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showProteotypicity">
            <v-list-item-action>
              <v-icon>fas fa-balance-scale-right</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Proteotypicity</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showProjects">
            <v-list-item-action>
              <v-icon>far fa-folder</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Projects</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </v-row>
    <div class="ml-10">
        <router-view :proteinName="proteinName" :proteinId= "proteinId" :title="title" :proteinAccession="proteinAccession"/>
    </div>
  </v-container>
  </v-main>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default {
  props: {
    source: String,
  },
  data: () => ({
    leftMenu: true,
    selectedTab: 0,
    proteinId: null,
    proteinName: '',
    proteinAccession: '',
    title: ''
  }),
  methods: {
    showSummary: function(){
      router.push('/protein/summary/'+this.proteinId).catch(()=>{});
    },
    showFeatures: function(){
      router.push('/protein/featureViewer/'+this.proteinId).catch(()=>{});
    },
    showPeptidesMSMS: function(){
      router.push('/protein/peptides/'+this.proteinId).catch(()=>{});
    },
    showReferencePeptides: function(){
      router.push('/protein/referencePeptides/'+this.proteinId).catch(()=>{});
    },
    showFDR: function(){
      router.push('/protein/fdr/'+this.proteinId).catch(()=>{});
    },
    showExpression: function(){
      router.push('/protein/expression/'+this.proteinId).catch(()=>{});
    },
    showNetwork: function(){
      router.push('/protein/interactions/'+this.proteinId).catch(()=>{});
    },
    showProteotypicity: function(){
      router.push('/protein/proteotypicity/'+this.proteinId).catch(()=>{});
    },
    showProjects: function(){
      router.push('/protein/projects/'+this.proteinId).catch(()=>{});
    },
    getProteinInfo: function(){
      let that = this;
      axios.get('https://www.proteomicsdb.org/proteomicsdb/logic/getProteinSummary.xsjs', {params: {protein_id: that.proteinId }}).then(function (response) {
        that.proteinName = response.data.GENE_NAME;
        that.title = response.data.PROTEIN + " (" + response.data.UNIPROT_ID + ")";
        that.proteinAccession = response.data.UNIPROT_ID;
      })
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.proteinId = this.$route.params.proteinId
  },
  mounted() {
    this.proteinId = this.$route.params.proteinId
    this.getProteinInfo()
  }
}
</script>
<style lang="scss">
</style>
