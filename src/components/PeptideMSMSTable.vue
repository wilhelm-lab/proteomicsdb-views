<template>
  <v-container xs12 sm12 md12 offset4>
    <DxDataGrid
    ref="peptideDetailsGrid"
    @initialized="saveGridInstance"
    :data-source="dataSource"
    :show-borders="true"
    :repaint-changes-only="false"
    :column-auto-width="true"
    :selection="{ mode: 'single' }"
    @rowClick="onSelectionChanged"
    >
    <DxColumnChooser :enabled="true" :allow-search="true" mode="select"/>
    <DxFilterRow :visible="true" :apply-filter="currentFilter"/>
    <DxColumn caption="Sequence" data-field="PEPTIDE.SEQUENCE"/>
    <DxColumn caption="Plain Sequence" data-field="PEPTIDE.PLAIN_SEQUENCE" columnHidingEnabled="true"/>
    <DxColumn caption="ProteomicsDB Score" data-field='PEPTIDE.MAX_PRDB_SCORE'/>
    <DxColumn caption="-log q-value" data-field='PEPTIDE.MAX_LOG_Q_VALUE'/>
    <DxColumn caption="Uniqueness" data-field='PEPTIDE.UNIQUENESS'/>
    <DxColumn caption="Start" data-field='PEPTIDE.START_POSITION'/>
    <DxColumn caption="Stop" data-field='PEPTIDE.END_POSITION'/>
    <DxColumn caption="Protease" data-field='PEPTIDE.PROTEASE_NAME'/>
    <DxColumn caption="Length" data-field='PEPTIDE.LENGTH'/>
    <DxColumn caption="Missed cleavages" data-field='PEPTIDE.MISSED_CLEAVAGES'/>
    <DxColumn caption="Mass [Da]" data-field='PEPTIDE.MASS'/>
    <DxColumn caption="PSMs" data-field='PEPTIDE.PSMS'/>
    <DxColumn caption="Experiments" data-field='PEPTIDE.EXPERIMENTS'/>
    <DxColumn caption="Projects" data-field='PEPTIDE.PROJECTS'/>
    <DxColumn caption="Proteotypicity" data-field='PEPTIDE.PROTEOTYPICITY'/>
    <DxColumn caption="Reference Spectra" data-field='PEPTIDE.REFERENCE_SPECTRA'/>
    <DxPaging :page-size="10"/>
    <DxPager
              :show-page-size-selector="true"
              :allowed-page-sizes="[10, 25, 50]"
              />
    </DxDataGrid>
  </v-container>
</template>

<script>
import axios from 'axios';
import 'devextreme/data/odata/store';
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxFilterRow, DxColumnChooser } from 'devextreme-vue/data-grid';

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
  },
  props: {
    proteinId: {
      type: String,
      default: '51261'
    },
    proteinAccession: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    dataGridInstance: null,
    dataSource: {
    },
    currentFilter: null
  }),
  methods: {
    saveGridInstance: function(e) {
      this.dataGridInstance = e.component;
    },
    stopLoading: function () {
      this.dataGridInstance.endCustomLoading();
    },
    onExporting: function() {
      var that = this;
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Peptides MSMS');
      exportDataGrid({
        component: this.dataGridInstance,
        worksheet: worksheet,
        customizeCell: function(options) {
          const excelCell = options;
          excelCell.font = { name: 'Arial', size: 12 };
          excelCell.alignment = { horizontal: 'left' };
        } 
      }).then(function() {
        workbook.csv.writeBuffer()
        .then(function(buffer) {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), that.proteinAccession+'_peptidesMSMS.csv');
        });
      });
    },
    onSelectionChanged: function(row) {
      var peptideId = row.data.PEPTIDE.PEPTIDE_ID;
      this.$emit('selectedPeptideId', { peptideId: peptideId });
    },
    setData: function () {
      this.dataGridInstance.beginCustomLoading();
      var that = this;
      axios.get(this.$store.state.host+'/proteomicsdb/logic/getPeptidesByProtein.xsjs', {params: {protein_id: that.proteinId}}).then(function(response) {
        that.dataSource = response.data.PEPTIDES;
        that.stopLoading();
      })
    },
  },
  computed: {
  },
  watch: {
    proteinId: function() {
      this.setData();
    }
  },
  mounted() {
    this.setData();
  }
}
</script>
<style lang="scss">
</style>
