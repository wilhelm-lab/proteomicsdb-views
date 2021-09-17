<template>
    <v-container xs12 sm12 md12 offset4>
      <DxDataGrid
      ref="peptideDetailsGrid"
      @initialized="saveGridInstance"
      :data-source="dataSource"
      :show-borders="true"
      :repaint-changes-only="true"
      :column-auto-width="true"
      :allow-column-resizing="true"
      column-resizing-mode="widget"
      :allowColumnReordering="false"
      :selection="{ mode: 'single' }"
      @rowClick="onSelectionChanged"
      >
      <DxFilterRow :visible="true" :apply-filter="currentFilter"/>
      <DxColumn caption="Sequence" data-field="PEPTIDE.SEQUENCE"/>
      <DxColumn caption="Plain Sequence" data-field="PEPTIDE.PLAIN_SEQUENCE" columnHidingEnabled="true"/>
      <DxColumn caption="Mascot Score" data-field='PEPTIDE.MAX_MASCOT_SCORE'/>
      <DxColumn caption="Andromeda Score" data-field='PEPTIDE.MAX_ANDROMEDA_SCORE'/>
      <DxColumn caption="Start" data-field='PEPTIDE.START_POSITION'/>
      <DxColumn caption="Stop" data-field='PEPTIDE.END_POSITION'/>
      <DxColumn caption="Length" data-field='PEPTIDE.LENGTH'/>
      <DxColumn caption="Missed cleavages" data-field='PEPTIDE.MISSED_CLEAVAGES'/>
      <DxColumn caption="Mass [Da]" data-field='PEPTIDE.MASS'/>
      <DxPaging :page-size="10"/>
      <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[10, 25, 50]"
                />
      </DxDataGrid>
    </v-container>
</template>

<script>
import 'devextreme/data/odata/store';
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxFilterRow} from 'devextreme-vue/data-grid';

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
  },
  props: {
    proteinId: {
      type: String,
      default: '51261'
    },
    proteinAccession: {
      type: String,
      default: ''
    },
    dataIn: Object
  },
  data: () => ({
    dataSource: null,
    dataGridInstance: null,
    currentFilter: null
  }),
  methods: {
    saveGridInstance: function(e) {
      this.dataGridInstance = e.component;
    },
    onExporting: function() {
      var that = this;
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Reference peptides');
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
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), that.proteinAccession+'_referencePeptides.csv');
        });
      });
    },
    onSelectionChanged: function(row) {
      var peptideId = row.data.PEPTIDE.PEPTIDE_ID;
      this.$emit('selectedPeptideId', { peptideId: peptideId });
    },
  },
  watch: {
    proteinId: function() {
      this.setData();
    }
  },
  mounted() {
    if(this.dataIn){
      this.dataSource = this.dataIn.PEPTIDES;
    }
  }
}
</script>
<style lang="scss">
</style>
