<template>
  <v-container xs12 sm12 md12 offset4>
    <DxDataGrid
      :data-source="dataSource"
      :show-borders="true"
      :repaint-changes-only="false"
      :allow-column-resizing="true"
      column-resizing-mode="widget"
      :column-auto-width="false"
      :selection="{ mode: 'single' }"
      :hoverStateEnabled="true"
      :noDataText="noDataText"
      @rowClick="onSelectionChanged"
      @exporting="onExporting"
    >
      <DxExport :enabled="true" />
      <DxFilterRow :visible="true" :apply-filter="currentFilter" />
      <DxColumn
        :width="30"
        caption=""
        :allow-filtering="false"
        :allow-sorting="false"
        data-field="EVIDENCE"
        cell-template="cellTemplate"
      />
      <DxColumn caption="Protein" data-field="PROTEIN" />
      <!--      <DxColumn data-field='EVIDENCE'/> -->
      <DxColumn caption="Uniprot Accession" data-field="UNIPROT_AC" />
      <DxColumn caption="Uniprot Identifier" data-field="UNIPROT_ID" />
      <DxColumn caption="Database Source" data-field="DATABASE_NAME" />
      <DxColumn caption="Description" data-field="DESCRIPTION" />
      <DxColumn caption="Length" data-field="SEQUENCE_LENGTH" />
      <DxColumn
        caption="Unique Peptides"
        data-field="DISTINCT_UNIQUE_PEPTIDES_PROTEIN"
      />
      <DxColumn
        caption="Unique Peptides (Protein)"
        data-field="DISTINCT_UNIQUE_PEPTIDES"
      />
      <DxColumn caption="Unique PSMS" data-field="UNIQUE_PSMS" />
      <DxColumn caption="Shared PSMS" data-field="SHARED_PSMS" />
      <DxColumn caption="Sequence Coverage" data-field="COVERAGE_ALL" />
      <DxColumn caption="Projects" data-field="NUMBER_OF_PROJECTS" />
      <DxColumn caption="Experiments" data-field="NUMBER_OF_EXPERIMENTS" />
      <DxColumn caption="Reference Spectra" data-field="REFERENCE_SPECTRA" />
      <template #cellTemplate="{ data }"
        ><img :src="data.value === 2 ? green : data.value === 1 ? yellow : red"
      /></template>
      <DxPaging :page-size="10" />
      <DxPager
        :show-page-size-selector="true"
        :allowed-page-sizes="[10, 25, 50]"
      />
    </DxDataGrid>
  </v-container>
</template>

<script>
import "devextreme/data/odata/store";
import {
  DxExport,
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxPager,
  DxFilterRow,
} from "devextreme-vue/data-grid";
import { exportDataGrid } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxExport,
  },
  props: {
    searchString: {
      type: String,
      default: "egfr",
    },
    taxcode: {
      type: [String, Number],
      default: 9606,
    },
  },
  data: () => ({
    dataSource: {},
    currentFilter: null,
    green: require("@/assets/commons/green.png"),
    yellow: require("@/assets/commons/yellow.png"),
    red: require("@/assets/commons/red.png"),
    evidence: [{}],
  }),
  methods: {
    onExporting(e) {
      var that = this;
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("ProteinSearch");
      exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        customizeCell: function (options) {
          const excelCell = options;
          excelCell.font = { name: "Arial", size: 12 };
          excelCell.alignment = { horizontal: "left" };
        },
      }).then(function () {
        workbook.csv.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            that.searchString + ".csv"
          );
        });
      });
      e.cancel = true;
    },
    onSelectionChanged: function (row) {
      window.open("/vue/protein/" + row.data.PROTEIN_ID + "/summary", "_blank");
    },
    setData: function () {
      var that = this;
      this.dataSource = {
        store: {
          type: "odata",
          url:
            that.$store.state.host +
            "/proteomicsdb/logic/proteinSearchEndpoint.xsodata/InputParams(PROTEIN_NAME='" +
            this.searchString +
            "'" +
            ",TAXCODE_IN=" +
            this.taxcode +
            ")/Results",
        },
        reshapeOnPush: true,
        select: [
          "PROTEIN_ID",
          "PROTEIN",
          "EVIDENCE",
          "UNIPROT_AC",
          "UNIPROT_ID",
          "DATABASE_NAME",
          "DESCRIPTION",
          "SEQUENCE_LENGTH",
          "MASS",
          "DISTINCT_UNIQUE_PEPTIDES_PROTEIN",
          "DISTINCT_UNIQUE_PEPTIDES",
          //'ORGANISM_LONGTEXT',
          "ORGANISM",
          "UNIQUE_PSMS",
          "SHARED_PSMS",
          //'TOTAL_PSMS',
          "COVERAGE_ALL",
          "NUMBER_OF_PROJECTS",
          "NUMBER_OF_EXPERIMENTS",
          "REFERENCE_SPECTRA",
        ],
        sort: [{ selector: "SEQUENCE_LENGTH", desc: true }],
      };
    },
  },
  computed: {
    noDataText: function () {
      return this.searchString && this.searchString !== "null"
        ? "No proteins found"
        : "Enter a Protein name, Gene name, or Uniprot ID above and hit 'Enter' to start your search.";
    },
  },
  watch: {
    searchString: function () {
      this.setData();
    },
    taxcode: function () {
      this.setData();
    },
  },
  mounted() {
    this.setData();
  },
};
</script>
<style lang="scss">
.dx-data-row.dx-state-hover {
  cursor: pointer;
}
</style>
