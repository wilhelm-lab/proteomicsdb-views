<template>
  <IC50Bars
      ref="IC50Bars"
      :data="selectedDrug"
      :selected-protein="selectedProtein"
      :active-protein="activeProtein"
      :title="title"
      :min-height="minHeight"
      :min-width="minWidth"
      :plot-width="plotWidth"
      :plot-height="plotHeight"
      v-on:select-protein="onSelectActiveProtein">
  </IC50Bars>
</template>

<script>
import IC50Bars from "./IC50Bars";

export default {
  name: "SelectivityIC50BarsWrapper",
  components: {
    IC50Bars
  },
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
    barWidth: {
      type: Number,
      default: 10
    },
    selectedProtein: {
      type: Object,
    },
    selectedDrug: {
      type: Object
    },
    activeProtein: {
      type: Object
    }
  },
  methods: {
    onSelectActiveProtein: function (e) {
      this.$emit("select-protein", e)
    },
    getSVG: function() {
      return this.$refs.IC50Bars.getSVG();
    }
  },
  computed: {
    title: function () {
      return `pEC50 values of target proteins for ${this.selectedDrug.TREATMENT}`
    }
  }
}
</script>

<style scoped>

</style>
