<template>
  <v-container fluid>
    <v-row>
      <h1>{{title}}</h1>
    </v-row>
    <v-row>
      <v-row>
        <v-col cols="5">
          <v-card class="ma-2 text-xs-center">
            <v-toolbar dark dense :color="$store.state.selectedOrganismShown.secondaryColor">
              <v-card-title>Gene FDR Estimate</v-card-title>
            </v-toolbar>
            <v-card-text>
              <geneFdrWrapper :proteinId="proteinId" :targetName="proteinName"/>
              <v-divider/>
              <specificGeneFdrWrapper :proteinId="proteinId" :targetName="proteinName"/>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-card class="ma-2 text-xs-center">
            <v-toolbar dark dense :color="$store.state.selectedOrganismShown.secondaryColor">
              <v-card-title>Protein FDR Estimate</v-card-title>
            </v-toolbar>
            <v-card-text>
              <proteinFdrWrapper :proteinId="proteinId" :targetName="proteinAccession" />
              <v-divider/>
              <specificProteinFdrWrapper :proteinId="proteinId" :targetName="proteinName" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
        <v-btn
                       color="primary"
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
    </v-row>
  </v-container>
</template>

<script>
import geneFdrWrapper from '@/vue-d3-component-wrappers/GeneFDRGraph'
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
    geneFdrWrapper: geneFdrWrapper,
    specificGeneFdrWrapper: specificGeneFdrWrapper,
    proteinFdrWrapper: proteinFdrWrapper,
    specificProteinFdrWrapper: specificProteinFdrWrapper
  },
  data: () => ({
  }),
  methods: {
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
