<template>
  <!--
  <v-container style="position: relative;display: inline-block;">
  -->
    <IC50Plot
        v-if="b50PlotData"
        ref="plot"
        :curveParameters="b50PlotData.parameter"
        :data-points="b50PlotData.data"
        :properties="b50PlotData.properties"
        :min-height="minHeight"
        :min-width="minWidth"
        :plot-height="plotHeight"
        :plot-width="plotWidth"
        :title="title"
    >
    </IC50Plot>
  <!--
    <v-overlay
        :absolute="true"
        :value="loading"
        :opacity="0.3"
    >
      <v-progress-circular
          indeterminate
          size="32"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
  -->
</template>

<script>
import axios from "axios";
import IC50Plot from "./IC50Plot";

export default {
  name: "SelectivityIC50Plot",
  props: {
    minWidth: {
      type: Number,
      default: 200
    },
    minHeight: {
      type: Number,
      default: 400
    },
    plotWidth: {
      type: Number,
      default: 200
    },
    plotHeight: {
      type: Number,
      default: 200
    },
    drug: {
      type: Object
    },
    selectedProtein: {
      type: Object
    }
  },
  components: {
    IC50Plot
  },
  data: function () {
    return {
      b50PlotData: null,
      loading: false
    }
  },
  watch: {
    drug: function () {
      this.loadData()
    },
    selectedProtein: function () {
      this.loadData()
    }
  },
  mounted: function () {
    this.loadData()
  },
  methods: {
    loadData: function () {
      this.loading = true;
      axios.get(`${this.$store.state.host}/logic/getCurveInformationByProteinID.xsjs`, {
        params: {
          PROTEIN_ID: this.selectedProtein.PROTEIN_ID,
          DRUG_ID: this.drug.DRUG_ID,
          assay_type: "PDB:101007",
          assay_variable: "dose"
        }
      })
          .then(response => {
            this.b50PlotData = response.data[0]
          })
          .finally(() => {
            this.loading = false;
          })
    },
    getSVG: function() {
      return this.$refs.plot.getSVG();
    }
  },
  computed: {
    title: function() {
      return `Dose response curve for ${this.selectedProtein.GENE_NAME} using ${this.drug.TREATMENT}`
    }
  }
}
</script>

<style scoped>

</style>
