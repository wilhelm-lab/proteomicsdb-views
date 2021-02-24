<template>
  <v-container fluid>
    <v-row dense no-gutters>
      <v-col cols="9">
        <h1>{{title}}</h1>
      </v-col>
      <v-spacer></v-spacer>
      <downloader top
        :disabled="disabled"
        right
        direction='left'
        svg
        png
        sif
        @svg="getSVG"
        @png="getPNG"
        @sif="getSIF"
      />
    </v-row>
    <interactionnetwork ref="mynetwork" :proteinId="proteinId" :proteinAccession="proteinAccession" @dataLoaded="disabled=false"/>
    <canvas id="canvasId" style=display:none></canvas>
    <v-btn :color="$store.state.selectedOrganismShown.primaryColor"
           style="right:80px;bottom:130px;"
           fixed dark bottom right
           fab small
           >
           <v-icon>fas fa-question</v-icon>
    </v-btn>
    <v-btn
           color="red"
           style="right:80px;bottom:80px;"
           fixed dark bottom right
           fab small
           >
           <v-icon>fas fa-bug</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import downloader from '@/components/DownloadSpeedDial'
import interactionnetwork from '@/vue-d3-component-wrappers/InteractionWrapper'
export default {
  components: {
    interactionnetwork,
    downloader
  },
  props: {
    proteinName: String,
    proteinId: String,
    title: String,
    proteinAccession: String
  },
  data: function () {
    return {
      disabled: true
    }
  },
  methods: {
    getSIF: function () {
      this.$refs.mynetwork.onSifClick();
    },
    getPNG: function () {
      this.$refs.mynetwork.onPngClick();
    },
    getSVG: function () {
      this.$refs.mynetwork.onSvgClick();
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  }
}
</script>
<style lang="scss">
</style>
