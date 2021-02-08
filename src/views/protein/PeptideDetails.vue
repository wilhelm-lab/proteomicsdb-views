<template>
  <v-container fluid>
    <v-row>
      <v-col cols="11">
        <DxDataGrid
             ref="peptideDetailsGrid"
             :data-source="dataSource"
             :show-borders="true"
             :repaint-changes-only="false"
             :column-auto-width="true"
             :selection="{ mode: 'single' }"
             :selectedRowKeys="selectedRows"
             @rowClick="onSelectionChanged"
             @selectionChanged="onSelectionChanged"
             >
             <DxColumnChooser :enabled="true" :allow-search="true" mode="select"/>
             <DxFilterRow :visible="true" :apply-filter="currentFilter"/>
             <DxColumn caption="Plain Sequence" data-field='PEPTIDE_SEQUENCE'/>
             <DxColumn caption="-log q-value" data-field='LOG_Q_VALUE'/>
             <DxColumn caption="-log PEP" data-field='LOG_PEP'/>
             <DxColumn caption="Search Engine" data-field='SEARCH_ENGINE_TEXT'/>
             <DxColumn caption="Score" data-field='SCORE'/>
             <DxColumn caption="Delta Score" data-field='DELTA_SCORE'/>
             <DxColumn caption="Threshold Score" data-field='THRESHOLD_SCORE'/>
             <DxColumn caption="Rank" data-field='RANK'/>
             <DxColumn caption="m/z" data-field='RECALIBRATED_PRECURSOR_MZ'/>
             <DxColumn caption="z" data-field='PRECURSOR_CHARGE'/>
             <DxColumn caption="Theoretical Mr [Da]" data-field='THEO_MOD_PEPTIDE_MASS'/>
             <DxColumn caption="Measured Mr [Da]" data-field='OBS_MOD_PEPTIDE_MASS'/>
             <DxColumn caption="Mass Error [Da]" data-field='MASS_ERROR_DA'/>
             <DxColumn caption="Mass Error [ppm]" data-field='MASS_ERROR_PPM'/>
             <DxColumn caption="Fixed Modifications" data-field='FIXED_MODIFICATION_STRING'/>
             <DxColumn caption="Variable Modifications" data-field='VARIABLE_MODIFICATION_STRING'/>
             <DxColumn caption="Uniqueness" data-field='UNIQUENESS'/>
             <DxColumn caption="Start" data-field='START_POSITION'/>
             <DxColumn caption="Stop" data-field='END_POSITION'/>
             <DxColumn caption="Protease" data-field='PROTEASE_NAME'/>
             <DxColumn caption="Project" data-field='PROJECT_NAME'/>
             <DxColumn caption="Experiment" data-field='EXPERIMENT_NAME'/>
             <DxColumn caption="Retention Time" data-field='RETENTION_TIME'/>
             <DxColumn caption="Scan" data-field='SPECTRUM_ID'/>
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
        <spectrumWrapper :spectrumEntry="selectedIdentification" ref="spectrumWrapper"/>
      </v-col>
    </v-row>
    <v-btn :color="$store.state.selectedOrganismShown.primaryColor"
                       style="right:80px;bottom:130px;"
                       fixed dark bottom right
                       fab small
                       >
                       <v-icon>fas fa-question</v-icon>
    </v-btn>
    <v-btn
                       color="red"
                       style="right:80px;bottom:80px;"
                       fixed dark bottom right
                       fab small
                       >
                       <v-icon>fas fa-bug</v-icon>
    </v-btn>
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
    dataSource: {
    },
    currentFilter: null,
    selectedIdentification: null,
    selectedRows: []
  }),
  methods: {
    onSelectionChanged: function(row) {
      var oData = row.data;
      this.selectedIdentification = oData;
      // spawn SpectrumViewer
    },
    resetAll: function () {
      this.$refs.spectrumWrapper.resetAll();
    },
    setData: function () {
      this.dataSource = {
        store: {
          type: 'odata',
          key: 'IDENTIFICATION_ID',
          url: 'https://www.proteomicsdb.org/proteomicsdb/logic/peptideDetails.xsodata/InputParams(PROTEINFILTER=' + this.proteinId + ',PEPTIDEFILTER=' + this.peptideId + ')/Results'
          //onLoaded: function(oData) {
          //  if(oData.length > 0) {
          //    that.selectedRows = [oData[0].IDENTIFICATION_ID];
          //    that.selectedIdentification = oData[0];
          //  }
          //}
        },
        reshapeOnPush: true,
        select: [
        'IDENTIFICATION_ID',
        'PEPTIDE_SEQUENCE',
        'FULL_SEQUENCE',
        'LOG_Q_VALUE',
        'LOG_PEP',
        'SEARCH_ENGINE_TEXT',
        'SCORE',
        'DELTA_SCORE',
        'THRESHOLD_SCORE',
        'RANK',
        'RECALIBRATED_PRECURSOR_MZ',
        'PRECURSOR_CHARGE',
        'THEO_MOD_PEPTIDE_MASS',
        'OBS_MOD_PEPTIDE_MASS',
        'MASS_ERROR_DA',
        'MASS_ERROR_PPM',
        'FIXED_MODIFICATION_STRING',
        'VARIABLE_MODIFICATION_STRING',
        'UNIQUENESS',
        'START_POSITION',
        'END_POSITION',
        'PROTEASE_NAME',
        'PROJECT_NAME',
        'EXPERIMENT_NAME',
        'RETENTION_TIME',
        'SPECTRUM_ID',
        'MSFILE_NAME',
        'PEPTIDE_ID'
        ]
      }
    },
    isCloneIconVisible(e) {
      console.log(e)
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