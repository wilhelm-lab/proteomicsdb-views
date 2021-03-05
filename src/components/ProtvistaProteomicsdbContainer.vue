<template>
  <protvista-proteomicsdb :accession="accession" :nostructure="nostructure"></protvista-proteomicsdb>
</template>

<script>
import ProtvistaProteomicsdb from "protvista-proteomicsdb";

if (!window.customElements.get("protvista-proteomicsdb")) {
  window.customElements.define("protvista-proteomicsdb", ProtvistaProteomicsdb);
}

export default {
  name: "ProtvistaContainer",
  props: {
    accession: {
      type: String,
      default: "P12004"
    },
    nostructure: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
    };
  },
  mounted() {
    if (!this.nostructure) {
      require("@/../node_modules/litemol/dist/css/LiteMol-plugin.min.css")
    }
  }
};
</script>
<style lang="scss">

protvista-uniprot-structure > div {
  display: flex;
  flex-direction: row;
}

protvista-uniprot-structure  protvista-datatable {
  flex: 5;
  order: 1;
}

protvista-uniprot-structure  protvista-structure {
  flex: 7;
  order: 2;
}

</style>
