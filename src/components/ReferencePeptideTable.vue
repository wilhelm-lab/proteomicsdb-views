<template>
  <v-main>
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
    }
  },
  data: () => ({
    dataSource: {
    },
    currentFilter: null
  }),
  methods: {
    onSelectionChanged: function(row) {
      var peptideId = row.data.PEPTIDE.PEPTIDE_ID;
      this.$emit('selectedPeptideId', { peptideId: peptideId });
    },
    setData: function () {
      var that = this;
      axios.get('https://www.proteomicsdb.org/proteomicsdb/logic/getReferencePeptidesByProtein.xsjs', {params: {protein_id: that.proteinId}}).then(function(response) {
        that.dataSource = response.data.PEPTIDES;
      })
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
