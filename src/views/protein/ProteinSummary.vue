<template>
  <v-container fluid>
    <v-row dense no-gutters>
      <v-col cols="9">
        <h1>{{title}}</h1>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row class="mt-2">
      <v-col cols ="3">
        <v-card class="mb-1">
          <v-toolbar :color="$store.state.selectedOrganismShown.secondaryColor" dark elevation="2" dense>
            <v-card-title>Protein Summary</v-card-title>
            <v-spacer/>
            <v-btn
                                                                                     icon
                                                                                     @click="expandPanel('summary')"
                                                                                     >
                                                                                     <v-icon>{{ showSummary ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-toolbar>
          <v-expand-transition>
            <div v-show="showSummary">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Localization</v-list-item-title>
                  <v-list-item-subtitle>{{summaryIn.LOCALIZATION}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider/>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Gene Name</v-list-item-title>
                    <v-list-item-subtitle>{{summaryIn.GENE_NAME}} ({{summaryIn.ALTERNATIVE_GENE_NAMES}})</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-btn small :color="$store.state.selectedOrganismShown.secondaryColor">Gene Relatives</v-btn>
                </v-list-item>
                <v-divider/>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>UniProt AC/ID</v-list-item-title>
                      <v-list-item-subtitle>{{summaryIn.UNIPROT_ID}}/{{summaryIn.UNIPROT_AC}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-btn small :color="$store.state.selectedOrganismShown.secondaryColor">Isoforms</v-btn>
                  </v-list-item>
                  <v-divider/>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Organism</v-list-item-title>
                        <v-list-item-subtitle>{{summaryIn.ORGANISM}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider/>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title>Evidence</v-list-item-title>
                          <v-list-item-subtitle>{{summaryIn.PROTEIN_EVIDENCE}}
                            <img :src="summaryIn.PROTEIN_EVIDENCE === 'protein' ? green : (summaryIn.PROTEIN_EVIDENCE === 'isoform' ? yellow : red)">
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
            </div>
                    </v-expand-transition>
                  </v-card>
                  <v-card class="mb-1">
                    <v-toolbar :color="$store.state.selectedOrganismShown.secondaryColor" dark elevation="2" dense>
                      <v-card-title>Protein Statistics</v-card-title>
            <v-spacer/>
                      <v-btn
                                                                                               icon
                                                                                               @click="expandPanel('stats')"
                                                                                               >
                                                                                               <v-icon>{{ showStats ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-expand-transition>
                      <div v-show="showStats">
                        <v-simple-table>
                          <tbody>
                            <tr
                           v-for="item in statistics"
                           :key="item.name"
                           >
                           <td>{{ item.name }}</td>
                           <td>{{ item.value }}</td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </div>
                    </v-expand-transition>
                  </v-card>
                  <v-card class="mb-1">
                    <v-toolbar :color="$store.state.selectedOrganismShown.secondaryColor" dark elevation="2" dense>
                      <v-card-title>GO Annotation</v-card-title>
            <v-spacer/>
                      <v-btn
                                                                                               icon
                                                                                               @click="expandPanel('go')"
                                                                                               >
                                                                                               <v-icon>{{ showGO ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-expand-transition>
                      <div v-show="showGO">
                        <v-expansion-panels class="pa-1">
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              Subcellular Localization
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-chip
                                            v-for="(item, i) in subcellLoc"
                                            :key="i"
                                            :color="$store.state.selectedOrganismShown.secondaryColor"
                                            class="ma-1"
                                            >
                                            {{item}}
                              </v-chip>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              Molecular Function
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-chip
                                            v-for="(item, i) in molFunc"
                                            :key="i"
                                            color="secondary"
                                            class="ma-1"
                                            >
                                            {{item}}
                              </v-chip>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              Biological Process
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-chip
                                            v-for="(item, i) in bioProc"
                                            :key="i"
                                            color="accent"
                                            class="ma-1"
                                            >
                                            {{item}}
                              </v-chip>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </v-expand-transition>
                  </v-card>
                  <v-card class="mb-1">
                    <v-toolbar :color="$store.state.selectedOrganismShown.secondaryColor" dark elevation="2" dense>
                      <v-card-title>External links</v-card-title>
            <v-spacer/>
                      <v-btn
                                                                                               icon
                                                                                               @click="expandPanel('links')"
                                                                                               >
                                                                                               <v-icon>{{ showLinks ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-expand-transition>
                      <div v-show="showLinks">
                        <v-card-text v-for="(item, i) in summaryIn.LINKS"
                                     :key="i">
                          <a :href="item.LINK">{{item.LINK}}</a>
                        </v-card-text>
                      </div>
                    </v-expand-transition>
                  </v-card>
                </v-col>
                <v-col cols="4">
                  <bodymap  
                       ref="bodymap"
                       showToolbar
                       :color="$store.state.selectedOrganismShown.secondaryColor"
                       :proteinId="proteinId"
                       omicsType="Proteomics"
                       quantification="MS1"
                       calculation="iBAQ"
                       tissue_category="tissue;cell+line;fluid"
                       scope="1"
                       group_by_tissue="1"
                       :selectedOrganism="{ taxcode: $store.state.selectedOrganismShown.taxcode}"
                       drawOnMount
                       max-height="800px"
                       height="800px"
                       >
                  </bodymap >
                </v-col>
                  <v-col cols="4">
                    <seqcov :proteinId="proteinId"></seqcov>
                  </v-col>
              </v-row>
          </v-container>
</template>

<script>
import axios from 'axios';
import seqcov from '@/components/SequenceCoverage'
import bodymap from '@/vue-d3-component-wrappers/ProteinExpressionBodymapWrapper';
export default {
  props: {
    proteinName: String,
    proteinId: String,
    title: String,
    summary: Object
  },
  components: {
    bodymap,
    seqcov
  },
  data: () => ({
    showSummary: true,
    showStats: false,
    showGO: false,
    showLinks: false,
    summaryIn: {},
    subcellLoc: [],
    molFunc: [],
    bioProc: [],
    statistics: [],
    green: require('@/assets/commons/green.png'),
    yellow: require('@/assets/commons/yellow.png'),
    red: require('@/assets/commons/red.png'),
  }),
  methods: {
    expandPanel: function(panel) {
      this.showSummary = panel === 'summary' ? !this.showSummary : false;
      this.showGO = panel === 'go' ? !this.showGO : false;
      this.showLinks = panel === 'links' ? !this.showLinks : false;
      this.showStats = panel === 'stats' ? !this.showStats : false;

    },
    getSummary: function(){
      let that = this

      if(this.proteinId != null) {
        axios.get(this.$store.state.host+'/proteomicsdb/logic/getProteinSummary.xsjs', {params: {protein_id: that.proteinId }}).then(function (response) {
          that.summaryIn = response.data

          that.subcellLoc = response.data.SUBC_LOC.split("\n ").map((x) => {return(x.replace("\n", ""))}).filter((y) => {return y !== ''})
          that.molFunc = response.data.MOL_FUNC.split("\n ").map((x) => {return(x.replace("\n", ""))}).filter((y) => {return y !== ''})
          that.bioProc = response.data.BIO_PROC.split("\n ").map((x) => {return(x.replace("\n", ""))}).filter((y) => {return y !== ''})

          that.statistics = []
          that.statistics.push({name: "Coverage", value: response.data.SEQUENCE_COVERAGE+"%"})
          that.statistics.push({name: "Unique Peptides", value: response.data.UNIQUE_PEPTIDES})
          that.statistics.push({name: "Unique Peptide Spectra", value: response.data.UNIQUE_PEPTIDES_SPECTRA})
          that.statistics.push({name: "Unique Peptides on Protein Level", value: response.data.UNIQUE_PEPTIDES_PROTEIN})
        })
      }
    }
  },
  computed: {
  },
  watch: {
    summary: function(newData) {
      if (newData !== null) {
        this.summaryIn = newData;
      }
    }
  },
  mounted() {
    if(this.summary === null) {
      this.getSummary()
    } else {
      this.summaryIn = this.summary;
    }
  },
  created() {
  }
}
</script>
<style lang="scss">
</style>
