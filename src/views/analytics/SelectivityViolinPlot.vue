<template>
  <d3-violin-plot
      id="violinPlot"
      ref="violinPlot"
      :chartData="violinData"
      :selectedKey="selectedKey"
      :selectedElement="selectedTargetProteinIdString"
      :simple-label="false"
      :title="violinPlotTitle"
      :clipped-selection-line="false"
      v-on:select-drug="onSelectDrug"
  ></d3-violin-plot>
</template>

<script>
import axios from "axios";
import D3ViolinPlot from "./D3ViolinPlot";
import utils from '@/vue-d3-component-wrappers/common-lib/Utils.js'

export default {
  name: "SelectivityViolinPlot",
  components: {
    D3ViolinPlot
  },
  props: {
    minWidth: {
      type: Number,
      default: 400
    },
    minHeight: {
      type: Number,
      default: 400
    },
    ed50Min: {
      type: Number,
      default: null
    },
    ed50Max: {
      type: Number,
      default: null
    },
    r2Min: {
      type: Number,
      default: null
    },
    drugIdSelection: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectedKey: {
      type: Object,
      default: null
    },
    selectedTargetProtein: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      violinData: undefined,
      selectedElement: undefined,
    }
  },
  watch: {
    ed50Min() {
      this.getData()
    },
    ed50Max() {
      this.getData()
    },
    r2Min() {
      this.getData()
    },
    chartData() {
      this.getData()
    },
    drugIdSelection() {
      this.getData()
    }
  },
  methods: {
    getData() {
      const url = `${this.$store.state.host + "/logic/getViolinData.xsjs"}`
      axios.get(url, {
        params: {
          ed50_min: this.ed50Min,
          ed50_max: this.ed50Max,
          r2_min: this.r2Min,
          drug_id_selection: this.drugIdSelection.join(";")
        }
      })
          .then(response => {
            this.violinData = response.data
          })
          .catch(err => {
            this.violinData = null
            console.error(err)
          })
    },
    onSelectDrug: function (e) {
      this.$emit("select-drug", e)
    },
    getSVG: function() {
      return this.$refs.violinPlot.getSVG();
    },
    getCSV: function () {
      var aData = this.violinData;
      var oProtein = this.selectedTargetProtein;
      var sFileName = oProtein.protein_name + ' (' + oProtein.unique_identifier + ')';

      var aColumnMapping = [{
        jsonProperty: 'PROTEIN_ID',
        columnName: 'Protein ID'
      }, {
        jsonProperty: 'GENE_NAME',
        columnName: 'Gene Name'
      }, {
        jsonProperty: 'VALUE',
        columnName: 'EC50 [nM]',
        formatter: function valueColumnFormatter(nValue) {
          return Math.pow(10, nValue);
        }
      }, {
        jsonProperty: 'BIC',
        columnName: 'BIC'
      }, {
        jsonProperty: 'COD',
        columnName: 'R2'
      }];

      var sSeparator = ';';
      var aCSVRows = [];

      aCSVRows.push(this.createCSVHeader(aColumnMapping, sSeparator));

      for (var i = 0; i < aData.length; i++) {
        var oData = aData[i].data;
        for (var j = 0; j < oData.length; j++) {
          var aRow = [];
          aRow.push(aData[i].TREATMENT);
          for (var k = 0; k < aColumnMapping.length; k++) {
            if (aColumnMapping[k].formatter) {
              aRow.push(aColumnMapping[k].formatter(oData[j][aColumnMapping[k].jsonProperty]));
            } else {
              aRow.push(oData[j][aColumnMapping[k].jsonProperty]);
            }
          }
          aCSVRows.push(aRow.join(sSeparator));
        }
      }

      utils.downloadCSV(aCSVRows, sFileName);
    },
    createCSVHeader: function createCSVHeader(aColumnMapping, sSeparator) {
      var aColumnHeaders = ['Drug'];

      return aColumnHeaders.concat(aColumnMapping.map(function getColumnName(oColumn) {
        return oColumn.columnName;
      })).join(sSeparator);
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    violinPlotTitle: function () {
      return `pEC50 distribution of drugs targeting
      ${this.selectedTargetProtein.protein_name} (${this.selectedTargetProtein.unique_identifier})`;
    },
    selectedTargetProteinIdString: function() {
      return this.selectedTargetProtein.protein_id.toString()
    }
  }
}
</script>

<style scoped>

</style>
