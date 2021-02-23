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
          <v-hover v-for="(item, i) in leftBarItems" :key="i" v-model="item.hover">
            <v-list-item  @click="handle_function_call(item.func)">
              <v-list-item-action>
                <v-badge :color="$store.state.selectedOrganismShown.secondaryColor" :content="item.countData" :dot="!item.hover" left :value="item.countData !== 0" >
                  <v-icon>{{item.icon}}</v-icon>
                </v-badge>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{item.text}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-hover>
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
    title: '',
    leftBarItems: [
    {text: 'Summary', icon: 'far fa-file-alt', func: 'showSummary', hover: false, countData: 0},
    {text: 'Feature viewer', icon: 'fas fa-align-left', func: 'showFeatures', hover: false, countData: 0},
    {text: 'Peptides MS/MS', icon: 'far fa-chart-bar', func: 'showPeptidesMSMS', hover: false, countData: 0},
    {text: 'Reference Peptides', icon: 'mdi-chart-bar-stacked', func: 'showReferencePeptides', hover: false, countData: 0},
    {text: 'Proteotypicity', icon: 'fas fa-balance-scale-right', func: 'showProteotypicity', hover: false, countData: 0},
    {text: 'FDR estimation', icon: 'fas fa-chart-area', func: 'showFDR', hover: false, countData: 0},
    {text: 'Expression', icon: 'fas fa-street-view', func: 'showExpression', hover: false, countData: 0},
    {text: 'Interaction network', icon: 'mdi-apache-kafka', func: 'showNetwork', hover: false, countData: 0},
    {text: 'Inhibitors', icon: 'fas fa-capsules', func: 'showKinases', hover: false, countData: 0},
    {text: 'Meltome', icon: 'mdi-thermometer-lines', func: 'showMeltome', hover: false, countData: 0},
    {text: 'Turnover', icon: 'mdi-backup-restore', func: 'showTurnover', hover: false, countData: 0},
    {text: 'Projects', icon: 'far fa-folder', func: 'showProjects', hover: false, countData: 0}
    ]
  }),
  methods: {
    handle_function_call: function(function_name) {
      this[function_name]();
    },
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
    showKinases: function(){
      router.push('/protein/inhibitors/'+this.proteinId).catch(()=>{});
    },
    showMeltome: function(){
      router.push('/protein/meltome/'+this.proteinId).catch(()=>{});
    },
    showTurnover: function(){
      router.push('/protein/turnover/'+this.proteinId).catch(()=>{});
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
