<template>
  <v-container fluid>
    <v-row>
      <h1>{{title}}</h1>
    </v-row>
    <v-row>
          <v-card-title>Data Filters</v-card-title>
    </v-row>
    <v-row>
            <v-combobox
                dense
                outlined
                :items="omicstypesModel"
                :item-text="formatOmicsType"
                label="OmicsType"
                v-model="omicsSelected"
                class="mx-1"
                return-object
                @change="getQuantCalc"
                >
            </v-combobox>
              <v-combobox
                dense
                outlined
                :items="quantModel"
                :item-text="quantTextFormat"
                label="Quantification"
                v-model="quantSelected"
                class="mx-1"
                return-object
                @change="getAvailableBioSources"
                >
              </v-combobox>
                <v-combobox
                dense
                outlined
                multiple
                :items="bioSourceModel"
                label="Biological source"
                v-model="bioSourceSelected"
                class="mx-1"
                >
                </v-combobox>
                  <v-select
                v-if="sexVisible"
                dense
                :items="bodyModel"
                label="Body visualization"
                v-model="bodySelected"
                outlined
                class="mx-1"
                >
                  </v-select>
    </v-row>
    <v-row>
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
import axios from 'axios'
export default {
  props: {
    proteinName: String,
    title: String,
    proteinId: String,
    proteinAccession: String
  },
  components: {
  },
  data: () => ({
    omicstypesModel: [],
    omicsSelected: null,
    quantModel: [],
    quantSelected: null,
    bioSourceModel: [],
    bioSourceSelected: [],
    bodySelected: 'female',
    sexVisible: true,
    bodyModel: ['male', 'female']
  }),
  methods: {
    formatOmicsType: function(obj) {
      //TODO fix the backend omicTypes --> omicsTypes
      return obj.omicTypes;
    },
    quantTextFormat: function(obj) {
      return obj.method + ' - ' + obj.unit;
    },
    getOmicsTypes: function(){
      var that = this;
      axios.get('https://www.proteomicsdb.org/proteomicsdb/logic/getOmicTypesForProteinId.xsjs', {params: {protein_id: that.proteinId}}).then(function (response) {
        that.omicstypesModel = response.data;
        if(response.data.length > 0) {
          that.omicsSelected = response.data[0];
          that.getQuantCalc();
        }
      })
    },
    getQuantCalc: function(){
      var that = this;
      axios.get('https://www.proteomicsdb.org/proteomicsdb/logic/getOmicTypesForProteinId.xsjs', {params: {protein_id: that.proteinId, omic: that.omicsSelected.omicTypes}}).then(function (response) {
        that.quantModel = response.data;
        if(response.data.length > 0) {
          that.quantSelected = response.data[0]; 
          that.getAvailableBioSources();
        }
      })
    },
    getAvailableBioSources: function () {
      var that = this;
      this.bioSourceSelected = [];
      axios.get('https://www.proteomicsdb.org/proteomicsdb/logic/checkDataAvailability.xsjs', {params: {
          protein_id: that.proteinId,
          omic: that.omicsSelected.omicTypes,
          quant: that.quantSelected.method,
          calc: that.quantSelected.unit
        }
      })
      .then(function (response) {
        console.log(response.data);
        that.bioSourceModel = response.data.data.filter((x) => x.scope === 1 && x.tissueCategory !== '').map((x) => {return(x.tissueCategory)})
        .reduce((p,n) => { return p.indexOf(n) === -1 ? p.concat(n) : p ;}, []);
        that.bioSourceSelected.push(that.bioSourceModel[0]);
      });
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.getOmicsTypes();
  }
}
</script>
<style lang="scss">
</style>
