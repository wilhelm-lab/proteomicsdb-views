<template>
  <v-container fluid>
    <v-row dense no-gutters>
      <v-col cols="9">
        <h1>{{title}}</h1>
      </v-col>
      <v-spacer></v-spacer>
      <downloader top
        right
        direction='left'
        csv
        svg
        png
        :loading="loading"
        @csv="getCSV"
        @svg="getSVG"
        @png="getPNG"
      />
    </v-row>
    <v-row>
      <v-card-title>Data Filters</v-card-title>
    </v-row>
    <v-row>
      <v-combobox
        dense
        outlined
        :items="omicstypesModel"
        :item-text="formatOmicsType"
        label="OmicsType"
        v-model="omicsSelected"
        class="mx-1"
        return-object
        @change="getQuantCalc"
        >
      </v-combobox>
        <v-combobox
        dense
        outlined
        :items="quantModel"
        :item-text="quantTextFormat"
        label="Quantification"
        v-model="quantSelected"
        class="mx-1"
        return-object
        @change="getAvailableBioSources"
        >
        </v-combobox>
          <v-combobox
        dense
        outlined
        multiple
        :items="bioSourceModel"
        label="Biological source"
        v-model="bioSourceSelected"
        class="mx-1"
        >
          </v-combobox>
    </v-row>
    <v-row>
      <v-col cols = "4">
        <proteinExpression v-if="filtersLoaded"
                           ref="bodymap"
                           :proteinId="proteinId"
                           :proteinAccession="proteinAccession"
                           :omicsType="omicsSelected.omicTypes"
                           :quantification="quantSelected.method"
                           :tissue_category="tissueCategoryString"
                           scope="1"
                           group_by_tissue= "1"
                           :calculation="quantSelected.unit"
                           :selectedOrganism="selectedOrganism"
                           @dataLoaded="retrieveData"
                           @organSelected="organSelected"
                           @resetSelections="resetBindings"
                           ></proteinExpression>
      </v-col>
      <v-col cols = "4" v-if="dataLoaded">
        <tissueBars ref="tissuebarsref" :data="expressionData" @barSelected="tissueBarSelected" ></tissueBars>
      </v-col>
      <v-col cols = "4">
        <sampleBars ref="samplebarsref" v-if="sTissueSelected !== ''"
                                        :proteinId="proteinId"
                                        :quantification="quantSelected.method"
                                        :tissue_category="tissueCategoryString"
                                        scope="1"
                                        :tissues_selected="sTissueSelected"
                                        group_by_tissue="0"
                                        :calculation="quantSelected.unit"
                                        :omicsType="omicsSelected.omicTypes"
                                        ></sampleBars>
      </v-col>
    </v-row>
    <canvas id="canvasId" style=display:none></canvas>
  </v-container>
</template>

<script>
import axios from 'axios'
import utils from '@/vue-d3-component-wrappers/common-lib/Utils.js'
import proteinExpression from '@/vue-d3-component-wrappers/ProteinExpressionBodymapWrapper'
import tissueBars from '@/vue-d3-component-wrappers/TissueExpressionBars'
import sampleBars from '@/vue-d3-component-wrappers/SampleExpressionBars'
import downloader from '@/components/DownloadSpeedDial'

import {mapGetters} from 'vuex';

export default {
  props: {
    proteinName: String,
    title: String,
    proteinId: String,
    proteinAccession: String
  },
  components: {
    downloader,
    proteinExpression,
    tissueBars,
    sampleBars
  },
  data: () => ({
    omicstypesModel: [],
    omicsSelected: { omicTypes: null},
    quantModel: [],
    quantSelected: null,
    bioSourceModel: [],
    bioSourceSelected: [],
    filtersLoaded: false,
    dataLoaded: false,
    expressionData: [],
    aTissueSelected: [],
    aTissueIdSelected: [],
    publicSampleSelected: false,
    selectedSampleId: null,
    loading: false,
    svgCss: [require('@/vue-d3-components/Bodymap.css.prdb'), require('@/vue-d3-components/ExpressionBars.css.prdb')]
  }),
  watch: {
  },
  methods: {
    getCSV: function () {
      this.loading = true;
      this.$refs.bodymap.getCSV();
      
      this.loading = false;
    },
    getSVG: function () {
      this.downloadPlots('svg');
    },
    getPNG: function () {
      this.downloadPlots('png');
    },
    downloadPlots: function (type ) {
      this.loading = true;
      var aPlots = [];
      aPlots.push(this.$refs.bodymap.getSVG());
      aPlots = aPlots.concat(this.$refs.tissuebarsref.getSVG());
      
      // is sample bar is visible --> tissue bars selected
      if (this.sTissueSelected !== '') {
        aPlots = aPlots.concat(this.$refs.samplebarsref.getSVG());
      }
      if(aPlots) {
        utils.downloadSVGs(aPlots, 'Protein Expression: ' + this.proteinAccession, type === 'svg', 'canvasId', this.svgCss);
      }
      this.loading = false;
    },
    resetBindings: function() {
      this.aTissueSelected = [];
      this.aTissueIdSelected = [];
      if (this.expressionData.length > 0) {
        this.$refs.tissuebarsref.resetBarSelection();
      }
    },
    organSelected: function (SAP_SYNONYM) {
      // selected TISSUES in Bodymap
      var that = this;
      var aSynonyms = this.aTissueSelected.map((x) => {return(x.SAP_SYNONYM)}).reduce((p,n) => {
        return p.indexOf(n) === -1 ? p.concat(n) : p ;
      }, []);
      //if not exists
      if ( aSynonyms.indexOf(SAP_SYNONYM) === -1 ) {
        this.$refs.tissuebarsref.toggleBar({ "SAP_SYNONYM": SAP_SYNONYM});
        //TODO get somehow all tissue IDs
        let aTissueIds = this.expressionData.filter((x) => {return x.SAP_SYNONYM === SAP_SYNONYM}).map((x) => {return x.TISSUE_ID});

        this.aTissueIdSelected = this.aTissueIdSelected.concat(aTissueIds);
        this.aTissueSelected = this.aTissueSelected.concat(this.expressionData.filter((x) => {return x.SAP_SYNONYM === SAP_SYNONYM}));
      } else {
        this.aTissueSelected
        .filter((x) => {return x.SAP_SYNONYM === SAP_SYNONYM})
        .map((x) => x.TISSUE_ID)
        .forEach((x) => {
          that.$refs.tissuebarsref.toggleBarTissueId({TISSUE_ID: x});
        });

        this.aTissueSelected = this.aTissueSelected.filter((x) => {return x.SAP_SYNONYM !== SAP_SYNONYM});
        this.aTissueIdSelected = this.aTissueSelected.map((x) => {return x.TISSUE_ID});
      }
    },
    tissueBarSelected: function(data) {
      // selected TISSUES in Bodymap
      var aSynonyms = this.aTissueSelected.map((x) => {return(x.SAP_SYNONYM)}).reduce((p,n) => {
        return p.indexOf(n) === -1 ? p.concat(n) : p ;
      }, []);

      // if SAP_SYNONYM not selected toggle and add
      if ( aSynonyms.indexOf(data.SAP_SYNONYM) === -1 ) {
        this.$refs.bodymap.toggleOrgan(data.SAP_SYNONYM);
        this.aTissueSelected.push(data);
        this.aTissueIdSelected.push(data.TISSUE_ID);
      } else {
        // if SAP_SYNONYM already selected
        // check TISSUE_ID
        // if exists remove and  check to toggle
        if (this.aTissueIdSelected.indexOf(data.TISSUE_ID) !== -1) {
          //remove from both
          this.aTissueIdSelected = this.aTissueIdSelected.filter( x => x !== data.TISSUE_ID);
          this.aTissueSelected = this.aTissueSelected.filter((x) => {return(x.TISSUE_ID !== data.TISSUE_ID)});

          aSynonyms = this.aTissueSelected.map((x) => {return(x.SAP_SYNONYM)}).reduce((p,n) => {
            return p.indexOf(n) === -1 ? p.concat(n) : p;
          }, []);
          if (aSynonyms.indexOf(data.SAP_SYNONYM) === -1) {
            this.$refs.bodymap.toggleOrgan(data.SAP_SYNONYM);
          }
        } else {
          this.aTissueIdSelected.push(data.TISSUE_ID);
          this.aTissueSelected.push(data);
        }
      }
      aSynonyms = this.aTissueSelected.map((x) => {return(x.SAP_SYNONYM)}).reduce((p,n) => {
        return p.indexOf(n) === -1 ? p.concat(n) : p;
      }, []);
    },
    retrieveData: function (data) {
      this.resetBindings();
      if (data) {
        this.expressionData = data;
        this.dataLoaded = true;
      }
    },
    formatOmicsType: function(obj) {
      //TODO fix the backend omicTypes --> omicsTypes
      return obj.omicTypes;
    },
    quantTextFormat: function(obj) {
      return obj.method + ' - ' + obj.unit;
    },
    getOmicsTypes: function(){
      var that = this;
      this.dataLoaded = false;
      axios.get(this.$store.state.host+'/proteomicsdb/logic/getOmicTypesForProteinId.xsjs', {params: {protein_id: that.proteinId}}).then(function (response) {
        that.omicstypesModel = response.data;
        if(response.data.length > 0) {
          that.omicsSelected = response.data[0];
          that.getQuantCalc();
        }
      })
    },
    getQuantCalc: function(){
      var that = this;
      this.dataLoaded = false;
      axios.get(this.$store.state.host+'/proteomicsdb/logic/getOmicTypesForProteinId.xsjs', {params: {protein_id: that.proteinId, omic: that.omicsSelected.omicTypes}}).then(function (response) {
        that.quantModel = response.data;
        if(response.data.length > 0) {
          that.quantSelected = response.data[0]; 
          that.getAvailableBioSources();
        }
      })
    },
    getAvailableBioSources: function () {
      var that = this;
      this.bioSourceSelected = [];
      axios.get(this.$store.state.host+'/proteomicsdb/logic/checkDataAvailability.xsjs', {params: {
          protein_id: that.proteinId,
          omic: that.omicsSelected.omicTypes,
          quant: that.quantSelected.method,
          calc: that.quantSelected.unit
        }
      })
      .then(function (response) {
        that.bioSourceModel = response.data.data.filter((x) => x.scope === 1 && x.tissueCategory !== '').map((x) => {return(x.tissueCategory)})
        .reduce((p,n) => { return p.indexOf(n) === -1 ? p.concat(n) : p ;}, []);
        that.bioSourceSelected.push(that.bioSourceModel[0]);
        that.filtersLoaded = true;
      });
    }
  },
  computed: {
    ...mapGetters(['selectedOrganism']),
    sTissueSelected: function() {
      return this.aTissueIdSelected.join(';');
    },
    tissueCategoryString: function () {
      return this.bioSourceSelected.join(';');
    }
  },
  mounted() {
    this.getOmicsTypes();
  }
}
</script>
<style lang="scss">
</style>
