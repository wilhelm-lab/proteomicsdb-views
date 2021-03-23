<template>
  <v-card>
    <v-card-title>Sample details: {{ data.NAME }}</v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="6">
          <v-row dense>
            <v-col cols="6"  class="font-weight-medium">Sample Description:</v-col>
            <v-col cols="6">{{ data.DESCRIPTION }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6"  class="font-weight-medium">Experiment:</v-col>
            <v-col cols="6">{{ data.EXPERIMENT }}</v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium">Description:</v-col>
            <v-col cols="6">{{ data.EXPERIMENT_DESCRIPTION }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Project:</v-col>
            <v-col cols="6">{{ data.PROJECT }}</v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium" >Description:</v-col>
            <v-col cols="6">{{ data.PROJECT_DESCRIPTION }}</v-col>
          </v-row>
          <v-row dense v-if="omics === 'Proteomics'">
            <v-col class="pl-5 font-weight-medium">Status:</v-col>
            <v-col cols="6">{{ data.STATUS }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Species:</v-col>
            <v-col cols="6">{{ data.SPECIES_LONG }} ({{ data.SPECIES }})</v-col>
          </v-row>
          <v-row dense v-if="omics === 'Proteomics'">
            <v-col cols="6" class="font-weight-medium">User defined tissue:</v-col>
            <v-col cols="6">{{ data.USER_TISSUE }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Tissue:</v-col>
            <v-col cols="6">{{ data.TISSUE }}</v-col>
          </v-row>
          <div dense v-if="omics === 'Proteomics'" class="ma-0 pa-0">
            <v-row dense>
              <v-col cols="6" class="font-weight-medium">Treatment:</v-col>
              <v-col cols="6">{{ data.TREATMENT }}</v-col>
            </v-row>
            <v-row dense>
              <v-col class="pl-5 font-weight-medium">Details:</v-col>
              <v-col cols="6">{{ data.TREATMENT_DETAILS }}</v-col>
            </v-row>
            <v-row dense>
              <v-col class="pl-5 font-weight-medium">Agent:</v-col>
              <v-col cols="6">{{ data.TREATMENT_AGENT }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6" class="font-weight-medium">Disease:</v-col>
              <v-col cols="6">{{ data.USER_DISEASE }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6" class="font-weight-medium">Cell extract:</v-col>
              <v-col cols="6">{{ data.CELL_EXTRACT }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6" class="font-weight-medium">Electrophoresis:</v-col>
              <v-col cols="6">{{ data.ELECTROPHORESIS }}</v-col>
            </v-row>
          </div>
          <div v-if="omics === 'Transcriptomics'">
            <v-row dense>
              <v-col cols="6" class="font-weight-medium">Quantification Method:</v-col>
              <v-col cols="6">{{ data.QUANTIFICATION_METHOD }}</v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="6" v-if= "omics === 'Proteomics'">
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Chromatography:</v-col>
            <v-col cols="6"></v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium">1st</v-col>
            <v-col cols="6">{{ data.CHROMATOGRAPHY_1 }}</v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium">2nd</v-col>
            <v-col cols="6">{{ data.CHROMATOGRAPHY_2 }}</v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium">3rd</v-col>
            <v-col cols="6">{{ data.CHROMATOGRAPHY_3 }}</v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium">4th</v-col>
            <v-col cols="6">{{ data.CHROMATOGRAPHY_4 }}</v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium">5th</v-col>
            <v-col cols="6">{{ data.CHROMATOGRAPHY_5 }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Covalent Purification:</v-col>
            <v-col cols="6">{{ data.COVALENT_PURIFICATION }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Affinity Purification:</v-col>
            <v-col cols="6">{{ data.AFFINITY_PURIFICATION }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Quantification Method:</v-col>
            <v-col cols="6">{{ data.QUANTIFICATION_METHOD }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Quantification Channel:</v-col>
            <v-col cols="6">{{ data.QUANTIFICATION_CHANNEL }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Protein Digestion Method:</v-col>
            <v-col cols="6">{{ data.PROTEIN_DIGESTION_METHOD }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Protease</v-col>
            <v-col cols="6">{{ data.PROTEASE }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Online LC System</v-col>
            <v-col cols="6">{{ data.ONLINE_LIQUID_CHROMATOGRAPHY_SYSTEM }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Mass Spectrometer</v-col>
            <v-col cols="6">{{ data.MASS_SPECTROMETER }}</v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium">MS Resolution</v-col>
            <v-col cols="6">{{ data.MS_RESOLUTION }}</v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium">MSMS Resolution</v-col>
            <v-col cols="6">{{ data.MSMS_RESOLUTION }}</v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium">Fragmentation Method</v-col>
            <v-col cols="6">{{ data.FRAGMENTATION_METHOD }}</v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium">MS Detector</v-col>
            <v-col cols="6">{{ data.MS_DETECTOR }}</v-col>
          </v-row>
          <v-row dense>
            <v-col class="pl-5 font-weight-medium">MSMS Detector</v-col>
            <v-col cols="6">{{ data.MSMS_DETECTOR }}</v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" class="font-weight-medium">Acquisition Mode</v-col>
            <v-col cols="6">{{ data.ACQUISITION_MODE }}</v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  name: "sampleInfoMenu",
  props: {
    sampleId: String,
    omics: String
  },
  watch: {
  },
  data: function() {
    return {
      data: [],
      name: ''
    };
  },
  computed: {
  },
  methods: {
    getData: function() {
      axios.get(this.$store.state.host+'/logic/getSampleInfo.xsjs', { params: {
          sampleId: this.sampleId,
          omics: this.omics
      }}).then((response) => {
        this.data = response.data;
      });
    }
  },
  mounted() {
    if (this.sampleId && this.omics) {
      this.getData();
    }
  }
};
</script>

