<template>
  <v-app width="97%">
    <v-main>
      <v-container fluid grid-list-lg>
       <v-layout xs12>
        <v-flex xs3>
          <v-flex>
            <h2 align="left">Dataset selection</h2>
            
            <v-combobox
              v-model="selectedDataset"
              :items="datasets"
              item-text="datasetName"
              item-value="datasetId"
              label="Dataset:"
              @change="onDatasetChange" 
              />
            
            <v-simple-table dense v-if="selectedDataset">
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Dose response measurements:</td>
                    <td>{{selectedDataset.NoOfDoseResponse}}</td>
                  </tr>
                  <tr>
                    <td>Fitted models:</td>
                    <td>{{selectedDataset.ConvergedModels}}</td>
                  </tr>
                  <tr>
                    <td>DOI:</td>
                    <td><a v-for="item in getDOIs" :key="item" :href="item.href">{{item.text}}</a></td>
                  </tr>
                  <tr>
                    <td>URI:</td>
                    <td><a v-if="selectedDataset.URI" :href="selectedDataset.URI">[0]</a></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
                        
            <h2 align="left">Cell line and treatment selection</h2>
            
            <combomultiselect
              :aOptions="celllines"
              sTextAttribute="celllineName"
              sValueAttribute="celllineId"
              sSelectAllValue="not"
              sLabel="Cell line:"
              @onChange="onCelllineChange"
              />
            
            <combomultiselect
              :aOptions="drugs"
              sTextAttribute="drugName"
              sValueAttribute="drugId"
              sSelectAllValue="-1"
              sLabel="Treatment:"
              @onChange="onDrugChange"
              />
            
            <v-simple-table dense v-if="selectedTissuesString && selectedDrugsString">
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Fitted models by cell line and drug combination:</td>
                    <td>{{fittedCurves}}</td>
                  </tr>
                  <tr>
                    <td>Fitted models by interactive filter:</td>
                    <td>{{selectedCurves}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            
          </v-flex>
        </v-flex>
        
        
        <v-flex xs9>
          <v-layout row>
            <downloadbox 
              :disableCSVButton="!violinModel" 
              @download-csv="downloadCSV"
              :disablePlotButton="!selectedKey" 
              @download-plot="downloadPlots" />
          </v-layout>
        
          <v-layout row>
            <sensitivityparallelplot
                v-if="selectedTissues.length>0 && selectedDrugs.length>0"  
               :minWidth="1000" 
               :minHeight="400"
               :selectedDataset="selectedDataset"
               :selectedTissues="selectedTissuesString"
               :selectedDrugs="selectedDrugsString"
               :violinModel="violinModel"
               @keyChange="onParCoordsChange"
               />
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider/>
      <v-layout xs12>
        <v-flex xs12>
          <v-layout row class="float-left">
            <sensitivitybarplot
              v-if="selectedTissues.length>0 && selectedDrugs.length>0"  
              :minHeight="450"
              :selectedKey="selectedKey"
              :selectedDataset="selectedDataset"
              :selectedTissues="selectedTissuesString"
              :selectedDrugs="selectedDrugsString"
              :selectedLinesForBarPlot="selectedLinesForBarPlot"
              :violinModel="violinModel"
              @send-message="onBarSelected"
              />
          </v-layout>
          <v-layout row class="float-left">
            <responsecurve
                v-if="selectedTissues.length>0 && selectedDrugs.length>0"  
                :minHeight="450"
                :minWidth="750"
                title="Dose response curve for selected drug/cell line combination"
                :sModelIds="sModelIds"
                :selectedDataset="selectedDataset"
                />
          </v-layout>
        </v-flex>
       </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import sensitivityparallelplot from '@/vue-d3-component-wrappers/SensitivityParallelPlot'
import sensitivitybarplot from '@/vue-d3-component-wrappers/SensitivityBarPlot'
import responsecurve from '@/vue-d3-component-wrappers/ResponseCurve'
import downloadbox from '@/components/DownloadBox'
import combomultiselect from '@/components/ComboMultiSelect'
import utils from '@/plugins/Utils'

export default {
  components: {
    sensitivityparallelplot: sensitivityparallelplot,
    sensitivitybarplot: sensitivitybarplot,
    responsecurve: responsecurve,
    combomultiselect: combomultiselect,
    downloadbox: downloadbox
  },
  name: 'cellsensitivity',
  data: function () {
    return {
      datasets: [],
      selectedDataset: null,
      celllines: [],
      selectedTissues: [],
      drugs: [],
      selectedDrugs: [],
      selectedKey: null,
      selectedLinesForBarPlot: "",
      violinModel: null,
      sModelIds: '',
      fittedCurves: 0,
      svgCss: [require('@/vue-d3-components/GenericBarPlot.css.prdb'), require('@/vue-d3-components/GenericLinePlot.css.prdb')]
    }
  },
  computed: {
    selectedCurves: function () {
      if (this.selectedLinesForBarPlot && this.selectedLinesForBarPlot != '-10' && this.selectedLinesForBarPlot.length > 0) {
        return this.selectedLinesForBarPlot.split(";").length
      }
      return '';
    },
    selectedTissuesString: function () {
      if (this.selectedTissues) {
        return this.selectedTissues.map(d => d.celllineId).join(";")
      }
      return null
    },
    selectedDrugsString: function () {
      if (this.selectedDrugs) {
        return this.selectedDrugs.map(d => d.drugId).join(";")
      }
      return null
    }
  },
  watch: {
    selectedDataset: function() {
      this.getDataForViolinPlots()
    },
    selectedDrugs: function() {
      this.getDataForViolinPlots()
    },
    selectedTissues: function() {
      this.getDataForViolinPlots()
    },
    selectedLinesForBarPlot: function() {
      this.getDataForViolinPlots()
    }
  },
  methods: {
    loadDatasets: function () {
      let that = this
      let urlDatasets = this.$store.state.host + '/proteomicsdb/logic/cellSelectivity/getAllDatasets.xsjs'

      axios.get(urlDatasets, {}).then(function (response) {
        that.datasets = response.data
        if (that.datasets.length > 0) {
          that.selectedDataset = that.datasets[0]
          that.loadCellLinesAndTreatments()
        }
      })
    },
    getDOIs: function() {
      if (this.selectedDataset) {
        var oDoi = this.selectedDataset.DOI.split('__').map(function(d, i) {
                return {
                    text: '[' + i + ']',
                    href: 'https://doi.org/' + d
                };
            });
        return oDoi
      } else {
        return []
      }
    },
    loadCellLinesAndTreatments: function () {
      let that = this
      let urlDatasets = this.$store.state.host + '/proteomicsdb/logic/cellSelectivity/getCellLinesAndDrugsByDatasetId.xsjs'

      axios.get(urlDatasets, {
        params: {
          dataset_id: that.selectedDataset.datasetId
        }})
        .then(function (response) {
          that.celllines = response.data.cellline
          that.drugs = response.data.drug
        })
    },
    getDataForViolinPlots: function() {
      if (this.selectedDataset && 
      this.selectedDrugs.length>0 && 
      this.selectedTissues.length>0 && 
      !(this.selectedDrugs[0] === '-1' && this.selectedTissues[0] === 'not')){
        
        let urlDatasets = this.$store.state.host+'/proteomicsdb/logic/cellSelectivity/getDataForVioPlots.xsjs'
        axios.get(urlDatasets, {
            params: {
              dataset_id: this.selectedDataset.datasetId,
              drug_id: this.selectedDrugsString,
              cell_line_id: this.selectedTissuesString,
              BIC: 100,
              R2: 0,
              Effect: 0,
              Switch: 1,
              model_ids: this.selectedLinesForBarPlot,
            }})
            .then(response => { 
            this.violinModel = response.data
            this.fittedCurves = 0;
            if (this.violinModel && this.violinModel.length>0) {
              this.fittedCurves = this.violinModel[0].data.reduce(function(acc, d) {
              return acc + d["ModelId"].split(";").length
              }, 0);
      }
            })
      }
    },
    onDatasetChange: function () {
      this.celllines = []
      this.drugs = []
      this.loadCellLinesAndTreatments()
    },
    onCelllineChange: function (selection) {
      this.selectedTissues = selection
    },
    onDrugChange: function (selection) {
      this.selectedDrugs = selection
    },
    onViolinUpdate: function (violinModel) {
      this.violinModel = violinModel

    },
    onParCoordsChange: function (selectedLinesForBarPlot, selectedKey) {
      this.selectedKey = selectedKey
      this.selectedLinesForBarPlot = selectedLinesForBarPlot
      this.sModelIds = ''
    },
    onBarSelected: function (barPlotObject) {
      if (barPlotObject) {
        this.sModelIds = barPlotObject.SelectedModelIds.data.length === 0 ? '' : barPlotObject.SelectedModelIds.data.reduce(function(next, prev) {
            return next + ';' + prev;
        });
      }
    },
    downloadPlots: function downloadPlots(sCanvasId, bDownloadAsSvg) {
        var aPlots = [];
        if (this.selectedKey) {
            aPlots.push(document.getElementById('ic50Bar').getElementsByTagName('svg')[0]);
        }
        if (this.sModelIds !== '') {
            aPlots.push(document.getElementById('ic50Plot').getElementsByTagName('svg')[0]);
        }

        if (aPlots) {
            var sDataSetName = this.selectedDataset.datasetName;
            utils.downloadSVGs(aPlots, 'Dataset: ' + sDataSetName, bDownloadAsSvg, sCanvasId, this.svgCss);
        }
    },
    downloadCSV: function downloadCSV() {
      var sDataSetName = this.selectedDataset.datasetName;
      
      // if no lines are selected -> load original violin data into csv
      var aData
      if (this.selectedLinesForBarPlot) {
          aData = this.selectedLinesForBarPlot;
      } else {
          aData = this.violinModel
      }
      var sSeparator = ';';

      var aColumnNames = aData.map(function(d) {
          return d.AttributeType;
      });

      var aDataValues = aData.map(function(d) {
          return d.data.map(function(e) {
              return e.VALUE;
          });
      });
      
      var aDataValuesTransposed = aDataValues.reduce(function(prev, next) {
          return next.map(function(item, i) {
              return (prev[i] || []).concat(next[i]);
          });
      }, []);
      
      var aCellLineDrugNames = aData.map(function(d) {
          return d.data.map(function(e) {
              return [e.CellLine, e.Drug];
          });
      });
      var sDataTable = aDataValuesTransposed.map(function(a, i) {
          return aCellLineDrugNames[0][i].concat(a).join(sSeparator);
      });

      var aCSVRows = ['CellLine', 'Drug'].concat(aColumnNames).join(sSeparator);

      sDataTable.unshift(aCSVRows); // row names at the beginning
      utils.downloadCSV(sDataTable, sDataSetName);
    }
  },
  mounted () {
    this.loadDatasets()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
