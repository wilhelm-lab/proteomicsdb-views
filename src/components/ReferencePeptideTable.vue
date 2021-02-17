<template>
  <v-main>
    <v-container xs12 sm12 md12 offset4>
      <DxDataGrid
      :data-source="dataSource"
      :show-borders="true"
      :repaint-changes-only="true"
      :column-auto-width="true"
      :allowColumnReordering="false"
      :selection="{ mode: 'single' }"
      @rowClick="onSelectionChanged"
      @exporting="onExporting"
      >
      <DxExport :enabled="true"/>
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
  </v-main>
</template>

<script>
import axios from 'axios';
import 'devextreme/data/odata/store';
import { DxExport, DxDataGrid, DxColumn, DxPaging, DxPager, DxFilterRow} from 'devextreme-vue/data-grid';

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
    DxExport
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
    dataSource: {
    },
    currentFilter: null
  }),
  methods: {
    onExporting(e) {
      var that = this;
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Reference peptides');
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
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), that.proteinAccession+'_referencePeptides.csv');
        });
      });
      e.cancel = true;
    },
    onSelectionChanged: function(row) {
      var peptideId = row.data.PEPTIDE.PEPTIDE_ID;
      this.$emit('selectedPeptideId', { peptideId: peptideId });
    },
    setData: function () {
      var that = this;
      axios.get('https://www.proteomicsdb.org/proteomicsdb/logic/getReferencePeptidesByProtein.xsjs', {params: {protein_id: that.proteinId}}).then(function(response) {
        that.dataSource = response.data.PEPTIDES;
      })
    }
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
