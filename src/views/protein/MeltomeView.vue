<template>
  <v-container fluid>
    <v-row dense no-gutters>
      <v-col cols="9">
        <h1>{{ title }}</h1>
      </v-col>
      <v-spacer></v-spacer>
      <downloader top right direction="left" pdf @pdf="exportGrid" />
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-card class="mt-6">
          <v-toolbar
            :color="$store.state.selectedOrganismShown.secondaryColor"
            elevation="2"
            dark
            dense
          >
            <v-card-title>Dataset selection</v-card-title></v-toolbar
          >
          <v-card-text>
            <v-select
              v-model="selectedCategory"
              :items="category"
              outlined
              label="Category"
            >
            </v-select>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-container xs12 sm12 md12 offset4 mt-3>
          <DxDataGrid
            ref="assayGrid"
            @initialized="saveGridInstance"
            :data-source="dataSource[selectedCategory]"
            :show-borders="true"
            :repaint-changes-only="false"
            :column-auto-width="true"
            :allow-column-resizing="true"
            column-resizing-mode="widget"
            :selection="{ mode: 'single' }"
          >
            <DxFilterRow :visible="true" />
            <DxColumn caption="Inhibitor" data-field="properties.TREATMENT" />
            <DxColumn caption="System" data-field="properties.SYSTEM" />
            <DxColumn
              v-if="this.selectedCategory === 2"
              caption="Tm"
              data-field="properties.Tm"
              format="#0.##"
            />
            <DxColumn
              v-if="this.selectedCategory === -1"
              caption="Delta Tm"
              data-field="properties.DeltaTm"
              format="#0.##"
            />
            <DxColumn
              v-if="this.selectedCategory === -1"
              caption="R2 treated"
              data-field="properties.r2Untreated"
              format="#0.##"
              selectedFilterOperation=">="
              :filterValue="rSqFilterValue"
              sortOrder="desc"
            />
            <DxColumn
              v-if="this.selectedCategory === -1"
              caption="R2 untreated"
              data-field="properties.r2Treated"
              format="#0.##"
            />
            <DxColumn
              v-if="this.selectedCategory === 2"
              caption="R2"
              data-field="properties.cod"
              :filterValue="rSqFilterValue"
              selectedFilterOperation=">="
              sortOrder="desc"
              format="0.##"
            />
            <DxColumn
              caption="Repository"
              :calculate-cell-value="searchableRepo"
              :allow-filtering="true"
              :filterOperations="[
                'contains',
                'notcontains',
                'startswith',
                'endswith',
              ]"
              selectedFilterOperation="contains"
              cell-template="repoTemplate"
            />
            <DxColumn
              caption="Plot"
              :width="750"
              cell-template="plotTemplate"
            />
            <template #plotTemplate="{ data }">
              <plot
                :minHeight="230"
                :minWidth="750"
                :curveParameters="data.data.parameter"
                :dataPoints="data.data.data"
                :properties="[data.data.properties]"
                xAxisLabel="temperature in °C"
                yAxisLabel="relative intensity"
                :logX="false"
                ratioY
              >
              </plot>
            </template>
            <template #repoTemplate="{ data }">
              <v-row v-if="data.data.properties.sanProjectName !== 'private'">
                <v-col>
                  <a
                    v-bind:href="
                      data.data.properties.sanProjectName === 'private'
                        ? 'javascript:void(0)'
                        : '/projects/' + data.data.properties.sanProjectId
                    "
                    target="_blank"
                    >{{
                      data.data.properties.sanProjectName === "private"
                        ? "nondisclosure"
                        : data.data.properties.sanProjectName
                    }}</a
                  ><br />
                  <a
                    v-if="data.data.properties.sanProjectName !== 'private'"
                    v-bind:visible="
                      data.data.properties.sanProjectName !== 'private'
                    "
                    v-bind:href="
                      data.data.properties.sanProjectId === -1
                        ? ''
                        : '/projects/' +
                          data.data.properties.sanProjectId +
                          '/' +
                          data.data.properties.sanExperimentId
                    "
                    target="_blank"
                    >{{
                      data.data.properties.sanExperimentName === "private"
                        ? ""
                        : data.data.properties.sanExperimentName
                    }}</a
                  ><br />
                  <a
                    v-bind:visible="
                      data.data.properties.sanProjectName !== 'private'
                    "
                    v-bind:href="
                      data.data.properties.sanProjectId === -1
                        ? ''
                        : '/projects/' +
                          data.data.properties.sanProjectId +
                          '/' +
                          data.data.properties.sanExperimentId +
                          '/' +
                          data.data.properties.sanExpDesignId
                    "
                    target="_blank"
                    >{{
                      data.data.properties.sanExpDesignName === "private"
                        ? ""
                        : data.data.properties.sanExpDesignName
                    }}</a
                  ><br />
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col>
                  <u>nondisclosure</u>
                </v-col>
              </v-row>
            </template>
            <DxPaging :page-size="5" />
            <DxPager
              :show-page-size-selector="true"
              :allowed-page-sizes="[5, 10, 25]"
            />
          </DxDataGrid>
        </v-container>
      </v-col>
    </v-row>
    <canvas id="canvasId" style="display: none"></canvas>
  </v-container>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxPager,
  DxFilterRow,
} from "devextreme-vue/data-grid";
import plot from "@/vue-d3-components/GenericLinePlot";

import downloader from "@/components/DownloadSpeedDial";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";

export default {
  props: {
    proteinName: String,
    title: String,
    proteinId: String,
    proteinAccession: String,
    dataIn: Object,
  },
  components: {
    downloader,
    plot,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxFilterRow,
  },
  data: () => ({
    rSqFilterValue: 0.8,
    ecFilterValue: 2000,
    loading: false,
    svgCss: [],
    dataGridInstance: null,
    dataSource: {"-1": [], "2": []},
    selectedCategory: 2,
    category: [
      { text: "Melting protein", value: 2 },
      { text: "CETSA", value: -1 },
    ],
  }),
  methods: {
    saveGridInstance: function (e) {
      this.dataGridInstance = e.component;
    },
    exportGrid: function () {
      var that = this;
      const doc = new jsPDF();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: this.dataGridInstance,
      }).then(() => {
        doc.save(that.proteinAccession + "_meltome.pdf");
      });
    },
    searchableRepo: function (data) {
      return data.properties.sanProjectName !== "private"
        ? data.properties.sanProjectName +
            " " +
            data.properties.sanExperimentName +
            " " +
            data.properties.sanExpDesignName
        : "nondisclosure";
    },
    replaceObjectKey: function (obj, oldKey, newKey) {
      if (oldKey !== newKey) {
        Object.defineProperty(
          obj,
          newKey,
          Object.getOwnPropertyDescriptor(obj, oldKey)
        );
        delete obj[oldKey];
      }
    },
    transformParameters: function (oData) {
      if (oData) {
        this.replaceObjectKey(oData, "bottom", "Lower Limit");
        this.replaceObjectKey(oData, "slope", "Slope");
        this.replaceObjectKey(oData, "inflection", "ED50, inflection");
      }
      return oData;
    },
  },
  mounted() {
            if (this.dataIn && (this.dataIn["2"].length>0  || this.dataIn["-1"].length>0)) {
              ["2", "-1"].forEach((categoryNumber) => {
                this.dataIn[categoryNumber].map((obj) => {
                  obj.parameter.map((p) => {
              if (!p.formula) {
                p.formula =
                  "return Lower Limit + (Upper Limit - Lower Limit) / (1 + Math.exp(Slope * (x - ED50, inflection)));";
                this.transformParameters(p);
                p["Upper Limit"] = {
                  name: "Upper Limit",
                  std_error: 0,
                  value: 1,
                };
              } else {
                p.Slope = p.slope;
              }
            });
          });
        });
      }
      this.dataSource = this.dataIn;
    },
};
</script>
<style lang="scss">
</style>
