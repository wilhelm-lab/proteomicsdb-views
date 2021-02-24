<template>
  <v-card>
    <v-toolbar :color="$store.state.selectedOrganismShown.primaryColor" class="white--text">
      <v-card-title>
        How to cite ProteomicsDB
      </v-card-title>
    </v-toolbar>
    <v-card-text>
      <v-list dense>
        <v-subheader>Please acknowledge ProteomicsDB in your publications by citing</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="item in citation" :key="item.text" @click="openLink(item.link)">
            <v-list-item-icon>
              <v-icon small>fas fa-external-link-alt</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{item.text}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-subheader>and/or the reference below while referring to our initial analysis of data in ProteomicsDB:</v-subheader>
          <v-list-item v-for="item in initialPaper" :key="item.text">
            <v-list-item-icon>
              <v-icon small>fas fa-external-link-alt</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{item.text}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
  },
  components: {
  },
  data: () => ({
    citation: [
    {text:"Samaras et al., ProteomicsDB: a multi-omics and multi-organism resource for life science research. Nucleic Acids Res. 2019 Oct 30", link:'https://doi.org/10.1093/nar/gkz974'},
    {text:"Schmidt, Samaras et al., ProteomicsDB. Nucleic Acids Res. 2017 Nov 2", link:'https://doi.org/10.1093/nar/gkx1029'}
    ],
    initialPaper: [
    {text:"Wilhelm et al., Mass-spectrometry-based draft of the human proteome. Nature. 2014 May 29;509(7502):582-7", link:'http://www.ncbi.nlm.nih.gov/pubmed/24870543'},
    ]
  }),
  methods: {
    openLink: function(url) {
      window.open(url,'_blank');
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
