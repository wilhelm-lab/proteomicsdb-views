<template>
  <v-card max-height="maxHeight" style="overflow-y:auto;">
    <v-toolbar :color="$store.state.selectedOrganismShown.secondaryColor" dark elevation="2" dense>
      <v-card-title>Sequence Coverage</v-card-title>
    </v-toolbar>
    <v-card-text>
      <v-row dense>
        <v-col cols="2">
          Length: 
        </v-col>
        <v-col cols="10">
          {{data.LENGTH}}
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="2">
          Mass:
        </v-col>
        <v-col cols="10">
          {{ data.MASS }}
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="2">
          Sequence Coverage:
        </v-col>
        <v-col cols="10">
          {{ data.SEQUENCE_COVERAGE }}
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="2">
          Sequence:
        </v-col>
        <v-col cols="10">
          <div v-html="oSequenceHtml" style=" max-height:500px;overflow-y:auto;"></div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  name: "sequenceCoverage",
  props: {
    maxHeight: {
      type: String,
      default: '200px'
    },
    proteinId: String,
    charsPerRow: {
      type: Number,
      default: 40
    }
  },
  watch: {
  },
  data: function() {
    return {
      data: [],
      oSequenceHtml: ''
    };
  },
  computed: {
  },
  methods: {
    getData: function() {
      var that= this;
      axios.get(this.$store.state.host+'/proteomicsdb/logic/getProteinSequenceCoverageByProtein.xsjs', { params: {
          protein_id: this.proteinId
      }}).then((response) => {
        that.data = response.data;
        that.loadCompleted();
      });
    },
    loadCompleted: function () {
      // set content for oSequenceHtml color letters in red or black according to capital letters
      var oSequenceString = this.data.SEQUENCE;

      var i = 0;
      var character = '';
      var prevCharacter = '';
      var oContent = '<FONT FACE = "Courier">';
      var characterNum = 0;
      var newLine = true;
      var j = 0;
      var tenChar;
      var convertedCharacter;

      if (oSequenceString === undefined || oSequenceString === null || oSequenceString === '') {
        return;
      }
      while (i <= oSequenceString.length) {
        j = i + 1;
        tenChar = (i + 1) / 10;
        characterNum = (i + 1) / this.charsPerRow;
        prevCharacter = character;
        character = oSequenceString.charAt(i);

        // Upper case
        if (character === character.toUpperCase()) {
          // Previous char was upper case so concatenate only
          if (prevCharacter === prevCharacter.toUpperCase()) {
            if (newLine) {
              oContent = oContent + '<span style=color:red>' + character;
            } else {
              oContent = oContent + character;
            }
          } else { // Previous char was lower case so close span
            if (newLine) {
              oContent = oContent + '<span style=color:red>' + character;
            } else {
              oContent = oContent + '</span>' + '<span style=color:red>' + character;
            }
          }
        } else { // Lower case
          convertedCharacter = character.toUpperCase();
          // Previous char was lower case so concatenate only
          if (prevCharacter === prevCharacter.toLowerCase()) {
            if (newLine) {
              oContent = oContent + '<span style=color:black>' + convertedCharacter;
            } else {
              oContent = oContent + convertedCharacter;
            }
          } else { // Previous char was upper case so close span
            if (newLine) {
              oContent = oContent + '<span style=color:black>' + convertedCharacter;
            } else {
              oContent = oContent + '</span>' + '<span style=color:black>' + convertedCharacter;
            }
          }
        } // end Lower case

        // new line every 60 characters + add number of total characters
        if (characterNum % 1 === 0 && j !== 1) {
          oContent = oContent + '</span>';
          oContent = oContent + '<span style=color:black>' + ' ' + j + '</span>' + '<br/>';
          newLine = true;
        } else {
          newLine = false;
        }
        // space every 10 characters
        if (tenChar % 1 === 0 && newLine === false && j !== 1) {
          oContent = oContent + ' ';
        }
        i++;
      } // end while
      // mark last line if it is cut in the middle of 60 letters
      var tempNum = i / 60;
      if (tempNum % 1 !== 0) {
        oContent = oContent + '</span>';
      }

      this.oSequenceHtml = oContent;
    }

  },
  mounted() {
    if (this.proteinId) {
      this.getData();
    }
  }
};
</script>

