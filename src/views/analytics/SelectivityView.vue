<template>
  <v-row class="ml-10 mt-2">
    <v-col>
      <v-row>
        <v-col cols="9">
          <h1>INHIBITOR POTENCY/ SELECTIVITY ANALYSIS</h1>
        </v-col>
        <v-spacer></v-spacer>
        <downloader top
                    right
                    direction='bottom'
                    csv
                    svg
                    png
                    @csv="getCSV"
                    @svg="getSVG"
                    @png="getPNG"
        />
      </v-row>
      <v-card rounded class="mt-4 px-2">
        <v-row>
          <v-col>
            <v-subheader>EC50 Range</v-subheader>
            <v-range-slider
                v-model="rangeEC50"
                thumb-label="always"
                step="1"
                :max="maxEC50"
                :min="minEC50"
                hide-details
                class="align-center"
            >
            </v-range-slider>
          </v-col>
          <v-col>
            <v-subheader>Minimum R2</v-subheader>
            <v-slider
                v-model="selectedR2Min"
                thumb-label="always"
                :color="$store.state.selectedOrganismShown.secondaryColor"
                :thumb-color="$store.state.selectedOrganismShown.primaryColor"
                :track-color="$store.state.selectedOrganismShown.primaryColor"
                step="0.00001"
                thumb-size="40"
                :max="1.0"
                :min="0.0"
                hide-details
                class="align-center"
            >
            </v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :loading="isFetchingProteins"
                          v-model="proteinSearchText"
                          label="Enter protein name"
                          append-icon="mdi-magnify"
                          outlined
                          @click:append="searchTargetProteins"
                          @keyup.enter="searchTargetProteins"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
                v-if="availableTargetProteins && availableTargetProteins.length > 0"
                :items="availableTargetProteins"
                v-model="selectedProtein"
                outlined
                :item-text="protein => `${protein.gene_name} (${protein.unique_identifier})`"
                label="Please Select"
                auto-select-first
                return-object
            ></v-select>
          </v-col>
        </v-row>
      </v-card>
      <v-row>
        <v-col>
          <v-card
              v-if="selectedProtein"
              ref="card0"
              class="my-3 py-5"
              style="overflow: scroll">
            <SelectivityViolinPlot
                ref="violinPlot"
                :violin-width="200"
                :height="300"
                :ed50-min="rangeEC50[0]"
                :ed50-max="rangeEC50[1]"
                :r2-min="selectedR2Min"
                :selected-target-protein="selectedProtein"
                :drug-id-selection="drugIdSelection"
                v-on:select-drug="onSelectDrug"
            ></SelectivityViolinPlot>
          </v-card>
          <div v-if="selectedDrug" class="d-flex flex-row flex-wrap b50-container">
            <v-card class="pa-3 d-flex">
              <SelectivityIC50BarsWrapper
                  ref="IC50Bars"
                  :selected-drug="selectedDrug"
                  :selected-protein="selectedProteinDrugDetails"
                  :active-protein="activeProtein"
                  v-on:select-protein="onSelectActiveProtein"
                  :height="400"
                  :bar-width="10"
              >
              </SelectivityIC50BarsWrapper>
            </v-card>
            <v-card class="pa-3 d-flex" :loading="$refs.IC50Plot && $refs.IC50Plot.loading">
              <SelectivityIC50PlotWrapper
                  v-if="activeProtein && selectedDrug"
                  ref="IC50Plot"
                  :drug="selectedDrug"
                  :selected-protein="activeProtein"
                  :height="400"
                  :width="500"
              >
              </SelectivityIC50PlotWrapper>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <canvas id="canvasId" style=display:none></canvas>
      <v-row justify="center" align="center">
        <v-col class="shrink">
          <v-btn
              color="primary"
              style="right:80px;bottom:130px;"
              fixed dark bottom right
              fab x-small
          >
            <v-icon>fas fa-question</v-icon>
          </v-btn>
          <v-btn
              color="red"
              style="right:80px;bottom:80px;"
              fixed dark bottom right
              fab x-small
          >
            <v-icon>fas fa-bug</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-snackbar v-model="showSnackbar">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-row>
</template>

<script>
import axios from 'axios';
import downloader from '@/components/DownloadSpeedDial'
import utils from '@/vue-d3-component-wrappers/common-lib/Utils.js'
import SelectivityViolinPlot from "./SelectivityViolinPlot";
import SelectivityIC50PlotWrapper from "./SelectivityIC50PlotWrapper";
import SelectivityIC50BarsWrapper from "./SelectivityIC50BarsWrapper";

export default {
  name: "SelectivityView",
  data() {
    return {
      minEC50: 0,
      maxEC50: 10000,
      rangeEC50: [0, 3000],
      selectedR2Min: 0.8,
      isFetchingProteins: false,
      proteinSearchText: "",
      availableTargetProteins: [],
      selectedProtein: null,
      activeProtein: null,
      selectedDrug: null,
      svgCSS: [
        require('./D3ViolinPlot.css.prdb'),
        require('./IC50Plot.css.prdb'),
        require('./IC50Bars.css.prdb')
      ],
      snackbarMessage: null,
      showSnackbar: false
    }
  },
  components: {
    SelectivityViolinPlot,
    SelectivityIC50PlotWrapper,
    SelectivityIC50BarsWrapper,
    downloader
  },
  watch: {
    selectedR2Min() {
      this.searchTargetProteins()
    },
    rangeEC50() {
      this.searchTargetProteins()
    }
  },
  methods: {
    onSelectActiveProtein: function (e) {
      this.activeProtein = e;
    },
    onSelectDrug: function (e) {
      this.selectedDrug = e;
      this.activeProtein = this.selectedProteinDrugDetails;
    },
    searchTargetProteins() {
      const query = this.proteinSearchText;
      if (!query || query.trim().length === 0) return;

      // query must not contain quotation marks
      if (/["]/.test(query)) {
        this.showUserWarning('No quotation marks allowed!');
        return;
      }

      // query must have at least 3 letters and digits
      if (query.length - query.split(/[a-z]|[\d]/i).join('').length < 3) {
        this.showUserWarning('Please provide three or more alphanumeric characters!');
        return;
      }

      this.isFetchingProteins = true

      axios.get(`${this.$store.state.host}/logic/getAvailableProteinTargets.xsjs`, {
        params: {
          ed50_min: this.rangeEC50[0],
          ed50_max: this.rangeEC50[1],
          r2_min: this.selectedR2Min,
          search_string: query,
          taxcode: this.$store.state.selectedOrganismShown.taxcode
        }
      })
          .then(response => {
            this.availableTargetProteins = response.data

            // Automatically select first protein
            if (this.availableTargetProteins && this.availableTargetProteins.length > 0) {
              this.selectedProtein = this.availableTargetProteins[0]
            } else {
              this.selectedProtein = null
            }
          })
          .catch(({response}) => {
            let msg = "Error searching proteins..."
            if (response && response.data && response.data.message) {
              msg = response.data.message
            }
            this.showUserWarning(msg)
          })
          .finally(() => {
            this.isFetchingProteins = false
            this.selectedDrug = null
            this.activeProtein = null
            this.b50PlotData = null
          })
    },
    downloadPlots: function (type) {
      const plots = [];
      const fileName = `${this.selectedProtein.protein_name} (${this.selectedProtein.unique_identifier})`;
      plots.push(this.$refs.violinPlot.getSVG());

      if (this.$refs.IC50Bars && this.$refs.IC50Plot) {
        plots.push(this.$refs.IC50Bars.getSVG());
        plots.push(this.$refs.IC50Plot.getSVG());
      }

      if (plots) {
        utils.downloadSVGs(plots, fileName, type === 'svg', 'canvasId', this.svgCSS);
      }
    },
    getSVG: function () {
      this.downloadPlots('svg');
    },
    getPNG: function () {
      this.downloadPlots('png');
    },
    showUserWarning: function (msg) {
      this.showSnackbar = true;
      this.snackbarMessage = msg;
    },
    getCSV: function () {
      this.$refs.violinPlot.getCSV();
    }
  },
  computed: {
    selectedProteinDrugDetails: function () {
      if (!this.selectedDrug || !this.selectedProtein) {
        return null
      }
      return this.selectedDrug.data.filter(prot => prot.PROTEIN_ID === this.selectedProtein.protein_id).pop()
    },
    drugIdSelection() {
      return this.selectedProtein ? this.selectedProtein.inhibitors.map(inhibitor => inhibitor.inhibitor_id) : []
    }
  }
}
</script>

<style>
.b50-container {
  gap: 10px;
}
</style>
