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
            <v-list-item  @click="showPage(item.value, item.data)" :value="item.value">
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
    {text: 'Summary', icon: 'far fa-file-alt', func: 'showSummary', hover: false, countData: 0, value: 'proteinSummary', data: undefined},
    {text: 'Feature viewer', icon: 'fas fa-align-left', func: 'showFeatures', hover: false, countData: 0, value: 'featureViewer', data: undefined},
    {text: 'Peptides MS/MS', icon: 'far fa-chart-bar', func: 'showPeptidesMSMS', hover: false, countData: 0, value: 'PeptidesMSMS', data: undefined},
    {text: 'Reference Peptides', icon: 'mdi-chart-bar-stacked', func: 'showReferencePeptides', hover: false, countData: 0, value:'ReferencePeptides', data: undefined},
    {text: 'Proteotypicity', icon: 'fas fa-balance-scale-right', func: 'showProteotypicity', hover: false, countData: 0, value: 'Proteotypicity', data: undefined},
    {text: 'FDR estimation', icon: 'fas fa-chart-area', func: 'showFDR', hover: false, countData: 0, value:'FDR', data: undefined},
    {text: 'Expression', icon: 'fas fa-street-view', func: 'showExpression', hover: false, countData: 0, value: 'Expression', data: undefined},
    {text: 'Interaction network', icon: 'mdi-apache-kafka', func: 'showNetwork', hover: false, countData: 0, value: 'InteractionNetwork', data: undefined},
    {text: 'Inhibitors', icon: 'fas fa-capsules', func: 'showKinases', hover: false, countData: 0, value:'KinaseInhibitors', data: undefined},
    {text: 'Meltome', icon: 'mdi-thermometer-lines', func: 'showMeltome', hover: false, countData: 0, value: 'Meltome', data: undefined},
    {text: 'Turnover', icon: 'mdi-backup-restore', func: 'showTurnover', hover: false, countData: 0, value: 'Turnover', data: undefined},
    {text: 'Projects', icon: 'far fa-folder', func: 'showProjects', hover: false, countData: 0, value: 'ProteinProjects', data: undefined}
    ],
  }),
  methods: {
    showPage: function(page, data){
      router.push({name: page, params: {proteinId: this.proteinId, dataIn: data}}).catch(()=>{});
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

    //Get the data for some of the left bar pages (those for which it makes sense to provide counts)
    //Feature Viewer is handled in the component itself, so skipping that one and continuing with Peptide MS/MS
    axios.get(this.$store.state.host+'/proteomicsdb/logic/getPeptidesByProtein.xsjs', {params: {protein_id: this.proteinId}})
    .then(response => {
    this.leftBarItems[2]['data'] = response.data
    this.leftBarItems[2]['countData'] = response.data.PEPTIDES.length
    })
    axios.get(this.$store.state.host+'/proteomicsdb/logic/getReferencePeptidesByProtein.xsjs', {params: {protein_id: this.proteinId}})
    .then(response => {
      this.leftBarItems[3]['data'] = response.data
      this.leftBarItems[3]['countData'] = response.data.PEPTIDES.length
    })

    axios.get(this.$store.state.host+'/proteomicsdb/logic/getCurveInformationByProteinID.xsjs', {params: {
          protein_id: this.proteinId,
          drug_id: -1,
          assay_type: 'PDB:101007',
          assay_variable: 'dose'
        }
      })
      .then(response => {
        response.data.map(obj => {
          
          function replaceObjectKey(obj, oldKey, newKey) {
            if (oldKey !== newKey) {
              Object.defineProperty(
                obj,
                newKey,
                Object.getOwnPropertyDescriptor(obj, oldKey)
              );
              delete obj[oldKey];
            }
          }

          replaceObjectKey(obj.parameter, "bottom", "Lower Limit");
          replaceObjectKey(obj.parameter, "top", "Upper Limit");
          replaceObjectKey(obj.parameter, "slope", "Slope");
          replaceObjectKey(obj.parameter, "inflection", "ED50, inflection");
        });

        this.leftBarItems[8]['data'] = response.data
        this.leftBarItems[8]['countData'] = response.data.length
      })

      //For the Meltome we send two requests ('Melting Protein' and 'CETSA') and combine them
    axios.get(this.$store.state.host+'/proteomicsdb/logic/getCurveInformationByProteinID.xsjs', {params: {
      protein_id: this.proteinId,
      drug_id: 2,
      assay_type: 'PDB:101015',
      assay_variable: 'temperature'
    }
    })
    .then(melting_response => {
      axios.get(this.$store.state.host+'/proteomicsdb/logic/getCurveInformationByProteinID.xsjs', {params: {
      protein_id: this.proteinId,
      drug_id: -1,
      assay_type: 'PDB:101015',
      assay_variable: 'temperature'
    }
    })
    .then(cetsa_response => {
      this.leftBarItems[9]['data'] = {'2': melting_response.data, '-1': cetsa_response.data}
      this.leftBarItems[9]['countData'] = melting_response.data.length + cetsa_response.data.length
    })
  })

    axios.get(this.$store.state.host+'/proteomicsdb/logic/getCurveInformationByProteinID.xsjs', {params: {
          protein_id: this.proteinId,
          drug_id: -1,
          assay_type: 'PDB:101019',
          assay_variable: 'time'
        }})
        .then(response => {
          this.leftBarItems[10]['data'] = response.data
          this.leftBarItems[10]['countData'] = response.data.length

        })

    axios.get(this.$store.state.host+'/proteomicsdb/logic/getProjectsByProtein.xsjs', {params: {
      protein_id: this.proteinId}})
    .then(response => {
        this.leftBarItems[11]['data'] = response.data.EXPERIMENT_TABLE;
        this.leftBarItems[11]['countData'] = response.data.EXPERIMENT_TABLE.length;
      })
}
}
</script>
<style lang="scss">
</style>
