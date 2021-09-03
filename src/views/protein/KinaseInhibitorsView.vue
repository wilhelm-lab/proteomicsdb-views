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
        pdf
        @pdf="exportGrid"
      />
    </v-row>
    <v-container xs12 sm12 md12 offset4 mt-3>
      <DxDataGrid
             ref="assayGrid"
             @initialized="saveGridInstance"
             :data-source="dataIn"
             :show-borders="true"
             :repaint-changes-only="false"
             :column-auto-width="true"
             :allow-column-resizing="true"
            column-resizing-mode="widget"
             :selection="{ mode: 'single' }"
             >
             <DxFilterRow :visible="true"/>
             <DxColumn caption="Inhibitor" data-field="properties.TREATMENT"/>
             <DxColumn caption="System" data-field="properties.SYSTEM"/>
             <DxColumn caption="R2" data-field='properties.cod' :filterValue="rSqFilterValue" selectedFilterOperation='>=' sortOrder='desc' format="0.##" />
      <DxColumn caption="EC50" data-field='properties.IC50' :filterValue="ecFilterValue" selectedFilterOperation='<=' format="0.##"/>
      <DxColumn caption="Repository" :calculate-cell-value="searchableRepo" :allow-filtering="true" :filterOperations="['contains', 'notcontains','startswith','endswith']" selectedFilterOperation='contains' cell-template="repoTemplate"/>
      <DxColumn caption="Plot" :width="750"  cell-template="plotTemplate"/>
      <template #plotTemplate="{ data }">
        <plot :minHeight="230"
                                            :minWidth="750"
                                            :curveParameters="[data.data.parameter]"
                                            :dataPoints="[data.data.data]"
                                            :properties="[data.data.properties]"
                                            xAxisLabel="concentration in nM"
                                            yAxisLabel="relative intensity"
                                            kinobeads
                                            hideLegend
                                            ratioY
                                            >
        </plot> 
      </template>
      <template #repoTemplate="{ data }">
        <v-row v-if="data.data.properties.sanProjectName !== 'private'">
          <v-col>
            <a v-bind:href="data.data.properties.sanProjectName === 'private' ? 'javascript:void(0)' : '/projects/'+ data.data.properties.sanProjectId" target="_blank">{{data.data.properties.sanProjectName === 'private' ? 'nondisclosure' : data.data.properties.sanProjectName }}</a><br/>
            <a v-if="data.data.properties.sanProjectName !== 'private'" v-bind:visible="data.data.properties.sanProjectName !== 'private'" v-bind:href=" data.data.properties.sanProjectId === -1 ? '' : '/projects/'+ data.data.properties.sanProjectId + '/' + data.data.properties.sanExperimentId" target="_blank">{{data.data.properties.sanExperimentName === 'private' ? '' : data.data.properties.sanExperimentName }}</a><br/>
            <a v-bind:visible="data.data.properties.sanProjectName !== 'private'" v-bind:href=" data.data.properties.sanProjectId === -1 ? '' : '/projects/'+ data.data.properties.sanProjectId + '/' + data.data.properties.sanExperimentId + '/' + data.data.properties.sanExpDesignId" target="_blank">{{data.data.properties.sanExpDesignName === 'private' ? '' : data.data.properties.sanExpDesignName }}</a><br/>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <u>nondisclosure</u>
          </v-col>
        </v-row>
      </template>
      <DxPaging :page-size="5"/>
      <DxPager
                                                                                                                                                                                                                                                                                          :show-page-size-selector="true"
                                                                                                                                                                                                                                                                                          :allowed-page-sizes="[5, 10, 25]"
                                                                                                                                                                                                                                                                                          />
      </DxDataGrid>
    </v-container>
    <canvas id="canvasId" style=display:none></canvas>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxFilterRow } from 'devextreme-vue/data-grid';
import plot from '@/vue-d3-components/GenericLinePlot';

import downloader from '@/components/DownloadSpeedDial'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

export default {
  props: {
    proteinName: String,
    title: String,
    proteinId: String,
    proteinAccession: String,
    dataIn: Array
  },
  components: {
    downloader,
    plot,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxFilterRow
  },
  data: () => ({
    rSqFilterValue: 0.8,
    ecFilterValue: 2000,
    loading: false,
    svgCss: [],
    dataGridInstance: null
  }),
  watch: {
  },
  methods: {
    saveGridInstance: function(e) {
      this.dataGridInstance = e.component;
    },
    exportGrid: function () {
      var that = this;
      const doc = new jsPDF();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: this.dataGridInstance
      }).then(() => {
        doc.save(that.proteinAccession+'_kinobeads.pdf');
      });
    },
    searchableRepo: function(data) {
      return data.properties.sanProjectName !== 'private' ? data.properties.sanProjectName + ' ' + data.properties.sanExperimentName + ' ' + data.properties.sanExpDesignName : 'nondisclosure';
    },
  },
}
</script>
<style lang="scss">
</style>
