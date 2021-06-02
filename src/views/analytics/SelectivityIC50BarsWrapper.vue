<template>
  <IC50Bars
      ref="IC50Bars"
      :data="selectedDrug"
      :selected-protein="selectedProtein"
      :active-protein="activeProtein"
      :title="title"
      :plot-height="plotHeight"
      :bar-width="barWidth"
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
