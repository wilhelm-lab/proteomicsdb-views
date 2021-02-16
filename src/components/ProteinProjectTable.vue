<template>
  <v-container xs12 sm12 md12 offset4>
    <DxDataGrid
    :data-source="dataSource"
    :show-borders="true"
    :repaint-changes-only="false"
    :column-auto-width="true"
    @exporting="onExporting"
    >
    <DxExport :enabled="true"/>
    <DxColumnChooser :enabled="true" :allow-search="true" mode="select"/>
    <DxFilterRow :visible="true" :apply-filter="currentFilter"/>
    <DxColumn caption="Project Name" data-field='EXPERIMENT.PROJECT' cell-template="projectTemplate"/>
    <DxColumn caption="PubMed ID" data-field='EXPERIMENT.PUBMED_ID' cell-template="pubmedTemplate"/>
    <DxColumn caption="Experiment Name" data-field='EXPERIMENT.EXPERIMENT' cell-template="experimentTemplate"/>
    <DxColumn caption="Sample Name" data-field='EXPERIMENT.SAMPLE' cell-template="sampleTemplate"/>
    <DxColumn caption="Unique Peptides" data-field='EXPERIMENT.UNIQUE_PEPTIDES'/>
    <DxColumn caption="Unique PSMs" data-field='EXPERIMENT.UNIQUE_PSMS'/>
    <DxColumn caption="Shared PSMs" data-field='EXPERIMENT.SHARED_PSMS'/>
    <DxColumn caption="Evidence" data-field='EXPERIMENT.EVIDENCE'/>
    <template #pubmedTemplate="{ data }">
      <a v-bind:href="data.data.EXPERIMENT.PUBMED_LINK" target="_blank">{{data.data.EXPERIMENT.PUBMED_ID}}</a>
    </template>
    <template #projectTemplate="{ data }">
      <a v-bind:href="'/project/'+data.data.EXPERIMENT.PROJECT_ID" target="_blank">{{data.data.EXPERIMENT.PROJECT}}</a>
    </template>
    <template #experimentTemplate="{ data }">
      <a v-bind:href="'/project/'+data.data.EXPERIMENT.PROJECT_EXPERIMENT_ID" target="_blank">{{data.data.EXPERIMENT.EXPERIMENT}}</a>
    </template>
    <template #sampleTemplate="{ data }">
      <a v-bind:href="'/project/'+data.data.EXPERIMENT.PROJECT_EXPERIMENT_SAMPLE_ID" target="_blank">{{data.data.EXPERIMENT.SAMPLE}}</a>
    </template>
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
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxFilterRow, DxColumnChooser, DxExport } from 'devextreme-vue/data-grid';
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
    DxExport
  },
  props: {
    proteinId: {
      type: String,
      default: '51261'
    },
    proteinAccession: {
      type: String,
      default: 'P00533'
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
      const worksheet = workbook.addWorksheet('Projects');
      exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        customizeCell: function(options) {
          const excelCell = options;
          excelCell.font = { name: 'Arial', size: 12 };
          excelCell.alignment = { horizontal: 'left' };
        } 
      }).then(function() {
        workbook.xlsx.writeBuffer()
        .then(function(buffer) {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), that.proteinAccession+'_projects.xlsx');
        });
      });
      e.cancel = true;
    },
    setData: function () {
      var that = this;
      axios.get('https://www.proteomicsdb.org/proteomicsdb/logic/getProjectsByProtein.xsjs', {params: {protein_id: that.proteinId}}).then(function(response) {
        that.dataSource = response.data.EXPERIMENT_TABLE;
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
@import 'https://cdn3.devexpress.com/jslib/20.1.6/css/dx.common.css';
@import 'https://cdn3.devexpress.com/jslib/20.1.6/css/dx.greenmist.css';
</style>
