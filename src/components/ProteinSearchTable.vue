<template>
  <v-main>
    <v-container xs12 sm12 md12 offset4>
      <DxDataGrid
      :data-source="dataSource"
      :show-borders="true"
      :repaint-changes-only="false"
      :column-auto-width="true"
      :selection="{ mode: 'single' }"
      @selection-changed="onSelectionChanged"
      >
        <DxPaging :page-size="25"/>
        <DxPager
        :show-page-size-selector="true"
        :allowed-page-sizes="[20, 25, 50]"
        />
      </DxDataGrid>
    </v-container>
  </v-main>
</template>

<script>
import 'devextreme/data/odata/store';
import { DxDataGrid, DxPaging, DxPager } from 'devextreme-vue/data-grid';
export default {
  components: {
    DxDataGrid,
    DxPaging,
    DxPager
  },
  props: {
    searchString: {
      type: String,
      default: 'egfr'
    },
    taxcode: {
      type: [String, Number],
      default: 9606
    }
  },
  data: () => ({
    dataSource: {
    }
  }),
  methods: {
    onSelectionChanged: function(row) {
      console.log(row.selectedRowsData[0].PROTEIN_ID);
      window.open("protein/summary/"+row.selectedRowsData[0].PROTEIN_ID, "_blank");
    },
    setData: function () {
      this.dataSource = {
        store: {
          type: 'odata',
          url: 'https://www.proteomicsdb.org/proteomicsdb/logic/proteins.xsodata/InputParams(PROTEIN_NAME=\'' + this.searchString + '\'' + ',TAXCODE_IN=' + this.taxcode + ')/Results',
        },
        reshapeOnPush: true,
        select: [
        'PROTEIN_ID',
        'PROTEIN',
        'EVIDENCE',
        'UNIPROT_AC',
        'UNIPROT_ID',
        'DATABASE_NAME',
        'DESCRIPTION',
        'SEQUENCE_LENGTH',
        'MASS',
        'DISTINCT_UNIQUE_PEPTIDES_PROTEIN',
        'DISTINCT_UNIQUE_PEPTIDES',
        //'ORGANISM_LONGTEXT',
        'ORGANISM',
        'UNIQUE_PSMS',
        'SHARED_PSMS',
        //'TOTAL_PSMS',
        'COVERAGE_ALL',
        'NUMBER_OF_PROJECTS',
        'NUMBER_OF_EXPERIMENTS'
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    searchString: function() {
      this.setData();
    },
    taxcode: function() {
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
