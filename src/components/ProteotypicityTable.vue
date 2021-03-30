<template>
    <v-container xs12 sm12 md12 offset4>
      <DxDataGrid
      ref="peptideGrid"
      @initialized="saveGridInstance"
      :data-source="dataSource"
      :show-borders="true"
      :repaint-changes-only="false"
      :column-auto-width="true"
      :selection="{ mode: 'single' }"
      @rowClick="onSelectionChanged"
      >
      <DxFilterRow :visible="true" :apply-filter="currentFilter"/>
      <DxColumn caption="Sequence" data-field="SEQUENCE"/>
      <DxColumn caption="Rank Order" data-field="RANK_ORDER" columnHidingEnabled="true"/>
      <DxColumn caption="# PSMs" data-field='PSMS'/>
      <DxColumn caption="# Occurrences" data-field='OCCURRENCE'/>
      <DxColumn caption="Proteotypicity" data-field='PROTEOTYPICITY'/>
      <DxColumn caption="Cumulative Proteotypicity" data-field='CUM_PROTEOTYPICITY'/>
      <DxColumn caption="Uniqueness" data-field='UNIQUENESS'/>
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
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxFilterRow } from 'devextreme-vue/data-grid';

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
    labelTypes: {
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
      this.$emit('dataLoaded', null);
    },
    onExporting() {
      var that = this;
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Proteotypicity');
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
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), that.proteinAccession+'_proteotypicity.csv');
        });
      });
    },
    onSelectionChanged: function(row) {
      var peptideId = row.data.PEPTIDE_ID;
      this.$emit('selectedPeptideId', { peptideId: peptideId });
    },
    setData: function () {
      var that = this;
      this.dataGridInstance.beginCustomLoading();
      this.dataSource = {
        store: {
          type: 'odata',
          url: this.$store.state.host+'/proteomicsdb/logic/proteotypicity.xsodata/InputParams(LABEL_TYPES_IN=\''+this.labelTypes+'\',METHOD_IN=2,PROTEIN_ID_IN='+ this.proteinId +')/Results',
          onLoaded: function(){
            that.stopLoading();
          },
        },
        reshapeOnPush: true,
        sort: [{selector:'RANK_ORDER', desc:false}]
      }
    }
  },
  computed: {
  },
  watch: {
    proteinId: function() {
      this.setData();
    },
    labelTypes: function() {
      this.setData();
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
</style>
