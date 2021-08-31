<template>
  <v-container fluid>
    <v-row>
      <v-col cols="11">
        <DxDataGrid
             ref="referencePeptideDetailsGrid"
             :disabled="isLoading"
             @initialized="saveGridInstance"
             :data-source="dataSource"
             :show-borders="true"
             :cache-enabled="false"
             :repaint-changes-only="true"
             :column-auto-width="true"
             :selection="{ mode: 'single' }"
             :selectedRowKeys="selectedRows"
             @rowClick="onSelectionChanged"
             >
             <DxColumnChooser :enabled="true" :allow-search="true" mode="select"/>
             <DxFilterRow :visible="true" :apply-filter="currentFilter"/>
             <DxColumn caption="Plain Sequence" data-field='SEQUENCE'/>
             <DxColumn caption="Sequence" data-field='FULL_SEQUENCE'/>
             <DxColumn caption="Search Engine" data-field='SEARCH_ENGINE_TEXT'/>
             <DxColumn caption="Score" data-field='SCORE'/>
             <DxColumn caption="Fragmentation Method" data-field='FRAGMENTATION_TECHNIQUE'/>
             <DxColumn caption="Collision energy" data-field='ENERGY'/>
             <DxColumn caption="Mass Analyzer" data-field='MASS_ANALYZER'/>
             <DxColumn caption="Charge" data-field='PRECURSOR_CHARGE'/>
             <DxColumn caption="Fixed Modifications" data-field='FIXED_MODIFICATION_STRING'/>
             <DxColumn caption="Variable Modifications" data-field='VARIABLE_MODIFICATION_STRING'/>
             <DxColumn caption="Theoretical Mr [Da]" data-field='THEO_MOD_PEPTIDE_MASS'/>
             <DxColumn caption="Measured Mr [Da]" data-field='OBS_MOD_PEPTIDE_MASS'/>
             <DxColumn caption="Mass Error [Da]" data-field='MASS_ERROR_DA'/>
             <DxColumn caption="Mass Error [ppm]" data-field='MASS_ERROR_PPM'/>
             <DxColumn caption="Project" data-field='PROJECT_NAME'/>
             <DxColumn caption="Experiment" data-field='EXPERIMENT_NAME'/>
             <DxColumn caption="Scan number" data-field='SCAN_NUMBER'/>
             <DxColumn caption="MS File Name" data-field='MSFILE_NAME'/>
             <DxPaging :page-size="5"/>
             <DxPager
                       :show-page-size-selector="false"
                       :allowed-page-sizes="[5]"
                       />
        </DxDataGrid>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols = "11">
        <spectrumWrapper :spectrumEntry="selectedIdentification" :peptideId="peptideId" :peptideSequence="peptideSequence" @plottingFinished="stopLoading" isReferenceSpectrum ref="spectrumWrapper" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'devextreme/data/odata/store';
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxFilterRow, DxColumnChooser } from 'devextreme-vue/data-grid';
import spectrumWrapper from '@/vue-d3-component-wrappers/SpectrumWrapper'
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxColumnChooser,
    spectrumWrapper
  },
  props: {
    proteinName: String,
    proteinId: String,
    title: String,
    proteinAccession: String,
    peptideId: String
  },
  data: () => ({
    dataGridInstance: null,
    isLoading: false,
    dataSource: {
    },
    currentFilter: null,
    selectedIdentification: null,
    selectedRows: [],
    peptideSequence: ''
  }),
  methods: {
    saveGridInstance: function(e) {
      this.dataGridInstance = e.component;
    },
    stopLoading: function () {
      this.dataGridInstance.endCustomLoading();
      this.isLoading=false;
    },
    onSelectionChanged: function(row) {
      this.isLoading=true;
      this.dataGridInstance.beginCustomLoading('Fetching Spectrum');
      this.selectedIdentification = row.data;
      // spawn SpectrumViewer
    },
    resetAll: function () {
      this.$refs.spectrumWrapper.resetAll();
    },
    setData: function () {
      var that = this;
      this.dataSource = {
        store: {
          type: 'odata',
          key: 'REFERENCE_IDENTIFICATION_ID',
          url: this.$store.state.host+'/proteomicsdb/logic/referencePeptideDetails.xsodata/REFERENCE_PEPTIDES_VIEW/',
          onLoaded: function(oData) {
            if(oData.length > 0 && that.peptideSequence === '') {
              that.peptideSequence = oData[0].SEQUENCE;
            }
          }
        },
        reshapeOnPush: true,
        filter: [
          [ 'PROTEIN_ID', '=', parseInt(that.proteinId) ],
          'and',
          [ 'PEPTIDE_ID', '=', parseInt(that.peptideId)]
          
          ]
      }
    },
  },
  computed: {
  },
  watch: {
    peptideId: function() {
      this.setData();
    },
    dataSource: function() {
      this.selectedRows = [];
    }
  },
  mounted() {
    this.setData();
  }
}
</script>
<style lang="scss">
</style>
