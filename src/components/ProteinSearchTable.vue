<template>
  <v-main>
    <v-container xs12 sm12 md12 offset4>
      <DxDataGrid
      :data-source="dataSource"
      :show-borders="true"
      :repaint-changes-only="false"
      :column-auto-width="false"
      :selection="{ mode: 'single' }"
      @selection-changed="onSelectionChanged"
      >
      <DxFilterRow :visible="true" :apply-filter="currentFilter"/>
      <DxColumn :width="30" caption="" :allow-filtering="false" :allow-sorting="false" data-field="EVIDENCE" cell-template="cellTemplate"/>
      <DxColumn caption="Protein" data-field='PROTEIN'/>
      <!--      <DxColumn data-field='EVIDENCE'/> -->
      <DxColumn caption="Uniprot Accession" data-field='UNIPROT_AC'/>
      <DxColumn caption="Uniprot Identifier" data-field='UNIPROT_ID'/>
      <DxColumn caption="Database Source" data-field='DATABASE_NAME'/>
      <DxColumn caption="Description" data-field='DESCRIPTION'/>
      <DxColumn caption="Length" data-field='SEQUENCE_LENGTH'/>
      <DxColumn caption="Unique Peptides" data-field='DISTINCT_UNIQUE_PEPTIDES_PROTEIN'/>
      <DxColumn caption="Unique Peptides (Protein)" data-field='DISTINCT_UNIQUE_PEPTIDES'/>
      <DxColumn caption="Unique PSMS" data-field='UNIQUE_PSMS'/>
      <DxColumn caption="Shared PSMS" data-field='SHARED_PSMS'/>
      <DxColumn caption="Sequence Coverage" data-field='COVERAGE_ALL'/>
      <DxColumn caption="Projects" data-field='NUMBER_OF_PROJECTS'/>
      <DxColumn caption="Experiments" data-field='NUMBER_OF_EXPERIMENTS'/>
      <template #cellTemplate="{ data }"><img :src="data.value === 2 ? green : (data.value === 1 ? yellow : red)"></template>
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
import 'devextreme/data/odata/store';
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxFilterRow } from 'devextreme-vue/data-grid';
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxFilterRow
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
    },
    currentFilter: null,
    green: require('@/assets/commons/green.png'),
    yellow: require('@/assets/commons/yellow.png'),
    red: require('@/assets/commons/red.png'),
    evidence: [
      {}
    ]
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
    },
    isCloneIconVisible(e) {
      console.log(e)
    },
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
