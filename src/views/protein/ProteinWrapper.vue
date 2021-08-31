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
            <v-list-item  @click="showPage(item.value)" :value="item.value">
              <v-list-item-action>
                <v-badge :color="$store.state.selectedOrganismShown.secondaryColor" :content="item.countData" :dot="!item.hover" right :value="item.countData !== 0" >
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
      <router-view :proteinName="proteinName" :proteinId= "proteinId" :title="title" :proteinAccession="proteinAccession" :summary="proteinSummary"/>
    </div>
  </v-container>
  </v-main>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import store from '@/store/store.js';
export default {
  props: {
    source: String,
  },
  data: () => ({
    leftMenu: true,
    selectedTab: 'summary',
    proteinId: null,
    proteinName: '',
    proteinAccession: '',
    proteinSummary: null,
    title: '',
    leftBarItems: [
    //TODO: Implement the countData badges by wrapping a row counter around the queries
    {text: 'Summary', icon: 'far fa-file-alt', func: 'showSummary', hover: false, countData: 0, value: 'summary'},
    {text: 'Feature viewer', icon: 'fas fa-align-left', func: 'showFeatures', hover: false, countData: 0, value: 'featureViewer'},
    {text: 'Peptides MS/MS', icon: 'far fa-chart-bar', func: 'showPeptidesMSMS', hover: false, countData: 0, value: 'peptides'},
    {text: 'Reference Peptides', icon: 'mdi-chart-bar-stacked', func: 'showReferencePeptides', hover: false, countData: 0, value:'referencePeptides'},
    {text: 'Proteotypicity', icon: 'fas fa-balance-scale-right', func: 'showProteotypicity', hover: false, countData: 0, value: 'proteotypicity'},
    {text: 'FDR estimation', icon: 'fas fa-chart-area', func: 'showFDR', hover: false, countData: 0, value:'fdr'},
    {text: 'Expression', icon: 'fas fa-street-view', func: 'showExpression', hover: false, countData: 0, value: 'expression'},
    {text: 'Interaction network', icon: 'mdi-apache-kafka', func: 'showNetwork', hover: false, countData: 0, value: 'Interactions'},
    {text: 'Inhibitors', icon: 'fas fa-capsules', func: 'showKinases', hover: false, countData: 0, value:'inhibitors'},
    {text: 'Meltome', icon: 'mdi-thermometer-lines', func: 'showMeltome', hover: false, countData: 0, value: 'meltome'},
    {text: 'Turnover', icon: 'mdi-backup-restore', func: 'showTurnover', hover: false, countData: 0, value: 'turnover'},
    {text: 'Projects', icon: 'far fa-folder', func: 'showProjects', hover: false, countData: 0, value: 'projects'}
    ]
  }),
  methods: {
    showPage: function(page){
      router.push('/vue/protein/'+this.proteinId + '/' + page).catch(()=>{});
    },
    getProteinInfo: function(){
      let that = this;
      axios.get(this.$store.state.host+'/proteomicsdb/logic/getProteinSummary.xsjs', {params: {protein_id: that.proteinId }}).then(function (response) {
        that.proteinSummary = response.data;
        that.proteinName = response.data.GENE_NAME;
        that.title = response.data.PROTEIN + " (" + response.data.UNIPROT_ID + ")";
        that.proteinAccession = response.data.UNIPROT_ID;
      })
    },
    getTabHeaderInformation: function () {
      let tempProteinId = this.proteinId;
      var that = this;
      axios.get(this.$store.state.host+'/proteomicsdb/logic/getTabHeaderInformation.xsjs', {params: { protein_id: tempProteinId }})
      .then(function(response2) {
        store.dispatch({
          type: 'setOrganism',
          value: response2.data.taxcode
        });
        that.$cookie.set('organism', response2.data.taxcode, { expires: 14, SameSite: 'Lax' });
      });
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.proteinId = this.$route.params.proteinId
    this.getTabHeaderInformation();
  },
  mounted() {
    this.proteinId = this.$route.params.proteinId
    this.getProteinInfo()
    let path = this.$route.path;
    let items = this.leftBarItems.filter((x) => {return path.indexOf(x.value) !== -1});
    if (items.length > 0) {
      this.selectedTab = items[0].value;
    } else {
      this.selectedTab = 'summary';
      router.push('/vue/protein/'+this.proteinId + '/summary').catch(()=>{});
    }
  }
}
</script>
<style lang="scss">
</style>
