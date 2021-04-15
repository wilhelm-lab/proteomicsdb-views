<template>
  <v-row class="ml-10 mt-2">
    <v-col>
      <v-row>
        <h1>INHIBITOR POTENCY/ SELECTIVITY ANALYSIS</h1>
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
                v-model="selectedR2"
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
        <h1>
          {{ selectedR2 }}
        </h1>
        <v-row>
          <v-col cols="9" class="d-flex flex-row" style="align-items: center">
            <label>Search for Protein</label>
            <v-text-field :loading="isFetchingProteins"
                          placeholder="Enter protein name"
                          append-icon="mdi-magnify"
                          v-model="proteinSearchText"
                          @click:append="searchTargetProteins"
                          @keyup.enter="searchTargetProteins"
            ></v-text-field>
            <!-- Add search glasses icon to text field-->

            <div v-if="availableTargetProteins && availableTargetProteins.length > 0">
              <label>Select a target protein</label>
              <v-select
                  :items="availableTargetProteins"
                  v-model="selectedProtein"
                  item-text="gene_name"
                  label="Please Select"
                  auto-select-first
                  return-object
              ></v-select>
            </div>
          </v-col>
          {{ selectedProtein }}
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: "SelectivityView",
  data() {
    return {
      minEC50: 0,
      maxEC50: 10000,
      rangeEC50: [0, 3000],
      selectedR2: 0.8,
      isFetchingProteins: false,
      proteinSearchText: "",
      availableTargetProteins: [],
      selectedProtein: null
    }
  },
  watch: {
    selectedR2() {
      this.searchTargetProteins()
    },
    rangeEC50() {
      this.searchTargetProteins()
    }
  },
  methods: {
    searchTargetProteins() {
      if (!this.proteinSearchText) return;
      console.log("Searching for " + this.proteinSearchText)

      this.isFetchingProteins = true


      axios.get(`https://www.proteomicsdb.org/logic/getAvailableProteinTargets.xsjs?` +
          `&ED50_MIN=${this.rangeEC50[0]}&ED50_MAX=${this.rangeEC50[1]}&R2_MIN=${this.selectedR2}&SEARCH_STRING=${this.proteinSearchText}` +
          `&TAXCODE=${this.$store.state.selectedOrganismShown.taxcode}`)
          .then(response => {
            this.availableTargetProteins = response.data
            this.isFetchingProteins = false

            // Automatically select first protein
            if (this.availableTargetProteins && this.availableTargetProteins.length > 0) {
              this.selectedProtein = this.availableTargetProteins[0]
            }
          })
          .catch(err => {
            console.error(err)
            this.isFetchingProteins = false
          })
    }
  }
}
</script>

<style scoped>

</style>
