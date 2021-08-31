<template>
  <v-container fluid>
    <v-row>
      <v-col cols="11">
        <DxDataGrid
             ref="peptideDetailsGrid"
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
             @exporting="onExporting"
             >
             <DxExport :enabled="true"/>
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
        <spectrumWrapper :spectrumEntry="selectedIdentification" :peptideId="peptideId" :peptideSequence="peptideSequence" @plottingFinished="stopLoading" ref="spectrumWrapper"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'devextreme/data/odata/store';
import { DxExport, DxDataGrid, DxColumn, DxPaging, DxPager, DxFilterRow, DxColumnChooser } from 'devextreme-vue/data-grid';
import spectrumWrapper from '@/vue-d3-component-wrappers/SpectrumWrapper'
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxColumnChooser,
    DxExport,
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
    onExporting(e) {
      var that = this;
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('PSMs');
      exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        customizeCell: function(options) {
          const excelCell = options;
          excelCell.font = { name: 'Arial', size: 12 };
          excelCell.alignment = { horizontal: 'left' };
        } 
      }).then(function() {
        workbook.csv.writeBuffer()
        .then(function(buffer) {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), that.peptideSequence+'_psms.csv');
        });
      });
      e.cancel = true;
    },
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
          key: 'IDENTIFICATION_ID',
          url: this.$store.state.host+'/proteomicsdb/logic/peptideDetails.xsodata/InputParams(PROTEINFILTER=' + this.proteinId + ',PEPTIDEFILTER=' + this.peptideId + ')/Results',
          onLoaded: function(oData) {
            if(oData.length > 0 && that.peptideSequence === '') {
              that.peptideSequence = oData[0].PEPTIDE_SEQUENCE;
            }
          }
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
