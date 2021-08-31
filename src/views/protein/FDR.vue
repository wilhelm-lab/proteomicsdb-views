<template>
  <v-container fluid>
    <v-row dense no-gutters>
      <v-col cols="9">
        <h1>{{title}}</h1>
      </v-col>
      <v-spacer></v-spacer>
      <downloader top
        right
        direction='bottom'
        svg
        png
        @svg="getSVG"
        @png="getPNG"
      />
    </v-row>
    <v-row>
      <v-row>
        <v-col cols="5">
          <v-card class="ma-2 text-xs-center">
            <v-toolbar dark dense :color="$store.state.selectedOrganismShown.secondaryColor">
              <v-card-title>Gene FDR Estimate</v-card-title>
            </v-toolbar>
            <v-card-text>
              <geneFdrWrapper :proteinId="proteinId" :targetName="proteinName" ref="geneFdr"/>
              <v-divider/>
                <specificGeneFdrWrapper :proteinId="proteinId" :targetName="proteinName" ref="geneSpecFdr"/>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="5">
            <v-card class="ma-2 text-xs-center">
              <v-toolbar dark dense :color="$store.state.selectedOrganismShown.secondaryColor">
                <v-card-title>Protein FDR Estimate</v-card-title>
              </v-toolbar>
              <v-card-text>
                <proteinFdrWrapper :proteinId="proteinId" :targetName="proteinAccession" ref="proteinFdr"/>
                <v-divider/>
                  <specificProteinFdrWrapper :proteinId="proteinId" :targetName="proteinAccession" ref="proteinSpecFdr"/>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <canvas id="canvasId" style=display:none></canvas>
        </v-row>
      </v-container>
</template>

<script>
import downloader from '@/components/DownloadSpeedDial'
import geneFdrWrapper from '@/vue-d3-component-wrappers/GeneFDRGraph'
import utils from '@/vue-d3-component-wrappers/common-lib/Utils.js'
import specificGeneFdrWrapper from '@/vue-d3-component-wrappers/SpecificGeneFDRGraph'
import proteinFdrWrapper from '@/vue-d3-component-wrappers/ProteinFDRGraph'
import specificProteinFdrWrapper from '@/vue-d3-component-wrappers/SpecificProteinFDRGraph'
export default {
  props: {
    proteinName: String,
    title: String,
    proteinId: String,
    proteinAccession: String
  },
  components: {
    downloader: downloader,
    geneFdrWrapper: geneFdrWrapper,
    specificGeneFdrWrapper: specificGeneFdrWrapper,
    proteinFdrWrapper: proteinFdrWrapper,
    specificProteinFdrWrapper: specificProteinFdrWrapper
  },
  data: () => ({
    fab: false,
    svgCss: [require('@/vue-d3-components/FDRGraph.css.prdb')]
  }),
  methods: {
    downloadPlots: function (type) {
      var aPlots = [];
      aPlots.push(this.$refs.geneFdr.getSVG());
      aPlots.push(this.$refs.geneSpecFdr.getSVG());
      aPlots.push(this.$refs.proteinFdr.getSVG());
      aPlots.push(this.$refs.proteinSpecFdr.getSVG());

      if(aPlots) {
        utils.downloadSVGs(aPlots, 'FDR Distributions: ', type === 'svg', 'canvasId', this.svgCss);
      }
    },
    getSVG: function() {
      this.downloadPlots('svg');
    },
    getPNG: function() {
      this.downloadPlots('png');
    },
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
.v-speed-dial--direction-left .v-speed-dial__list, .v-speed-dial--direction-right .v-speed-dial__list{
  height: inherit;
}


</style>
