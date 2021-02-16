<template>
    <v-container xs12 sm12 md12 offset4>
      <DxDataGrid
      :data-source="dataSource"
      :show-borders="true"
      :repaint-changes-only="false"
      :column-auto-width="true"
      :selection="{ mode: 'single' }"
      @rowClick="onSelectionChanged"
      >
      <DxColumnChooser :enabled="true" :allow-search="true" mode="select"/>
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
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxFilterRow, DxColumnChooser } from 'devextreme-vue/data-grid';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxColumnChooser
  },
  props: {
    proteinId: {
      type: String,
      default: '51261'
    },
    labelTypes: {
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
    onSelectionChanged: function(row) {
      var peptideId = row.data.PEPTIDE_ID;
      this.$emit('selectedPeptideId', { peptideId: peptideId });
    },
    setData: function () {
      this.dataSource = {
        store: {
          type: 'odata',
          url: 'https://www.proteomicsdb.org/proteomicsdb/logic/proteotypicity.xsodata/InputParams(LABEL_TYPES_IN=\''+this.labelTypes+'\',METHOD_IN=2,PROTEIN_ID_IN='+ this.proteinId +')/Results'
        },
        reshapeOnPush: true,
        sort: [{selector:'RANK_ORDER', desc:false}]
      }
    },
    isCloneIconVisible(e) {
      console.log(e)
    },
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
@import 'https://cdn3.devexpress.com/jslib/20.1.6/css/dx.common.css';
@import 'https://cdn3.devexpress.com/jslib/20.1.6/css/dx.greenmist.css';
</style>
