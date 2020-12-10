<template>
  <v-container fluid>
    <v-row>
      <h1>{{title}}</h1>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card class="ma-1">
          <v-tabs
                v-model="tab"
                grow
                dense
                dark
                :background-color="$store.state.selectedOrganismShown.secondaryColor"
                >
                <v-tabs-slider :color="$store.state.selectedOrganismShown.primaryColor"></v-tabs-slider>
            <v-tab href="#tab-1">
              Relations
            </v-tab>
            <v-tab href="#tab-2" :disabled="!isNodeSelected">
              Node information
            </v-tab>
            <v-tab href="#tab-3" :disabled="!isGraphShown">
              Options
            </v-tab>
            <v-tabs-items v-model="tab">
              <v-tab-item :value="'tab-1'">
              </v-tab-item>
              <v-treeview
                          :items="RelationTypesModel" 
                          item-children="Children"
                          item-text="Label"
                          return-object
                          dense style="overflow-y: auto; max-height:500px"
                                >
                                <template v-slot:prepend="{ item }">
                                  <v-row>
                                    <div v-html="item.svg"></div>
                                    <v-checkbox v-if="item.Description" v-model="item.selected" :value="item.selected" :label="item.Name" dense class="mt-0 pt-0"></v-checkbox>
                                  </v-row>
                                </template>
              </v-treeview>
            </v-tabs-items>
          </v-tabs>
        </v-card>
        <v-col align="middle">
          <v-btn :color="$store.state.selectedOrganismShown.primaryColor" :loading="loading" :disabled="loading" class="ma-2 white--text" @click="runAnalysis">
            Run analysis
            <v-icon right>fas fa-running</v-icon>
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
    <v-btn color="primary"
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
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    proteinName: String,
    proteinId: String,
    title: String
  },
  data: () => ({
    RelationTypesModel: [],
    isNodeSelected: false,
    isGraphShown: false,
    loader: null,
    loading: false,
    tab: 0
  }),
  methods: {
    getRelations: function() {
      var that = this
      axios.get('https://www.proteomicsdb.org/proteomicsdb/logic/pathways/getAllRelationTypes.xsjs', {}).then(function (response) {
        var aRelationTypes = response.data;
        aRelationTypes = aRelationTypes.map(function(dataset) {
          dataset.Children = dataset.Children.map(function(elements) {
            elements.value = elements.Name;
            elements.selected = elements.Selected > 0;
            elements.cheatCss = 'sapInteractionCheckbox' + elements.Level;
            var xDistance = elements.Level * 30 + 10;
            var svgConstructStart = '<svg height="21" width="' + xDistance + '">';
            var svgConstructStop = '</svg>';
            // CHEAT is necessary  for unique ids in the document
            var marker_base = '<marker id="CHEAT__ArrowTypeId__" viewBox="-10 -10 20 20" refX="0" refY="0" markerWidth="6" markerHeight="6" orient="auto"><path transform="scale(1)" fill="__ArrowColour__" d="__Marker__"></path></marker>';

            var marker = elements.EndArrowTypeId ? marker_base.replace('__ArrowTypeId__', elements.EndArrowTypeId).replace('__ArrowColour__', elements.EndArrowColour).replace('__Marker__', elements.EndMarker) : '';

            marker += elements.StartArrowTypeId ? marker_base.replace('__ArrowTypeId__', elements.StartArrowTypeId).replace('__ArrowColour__', elements.StartArrowColour).replace('__Marker__', elements.StartMarker) : '';
            marker += elements.MidArrowTypeId ? marker_base.replace('__ArrowTypeId__', elements.MidArrowTypeId).replace('__ArrowColour__', elements.MidArrowColour).replace('__Marker__', elements.MidMarker) : '';

            var defs = '<defs>' + marker + '</defs>';
            var marker_mid = elements.MidArrowTypeId ? ' marker-mid="url(#CHEAT__MidArrowTypeId__)" '.replace('__MidArrowTypeId__', elements.MidArrowTypeId) : '';
            var marker_end = elements.EndArrowTypeId ? ' marker-end="url(#CHEAT__EndArrowTypeId__)" '.replace('__EndArrowTypeId__', elements.EndArrowTypeId) : '';
            var marker_start = elements.StartArrowTypeId ? ' marker-mid="url(#CHEAT__StartArrowTypeId__)" '.replace('__StartArrowTypeId__', elements.StartArrowTypeId) : '';
            var path_base = '<path ' + marker_mid + marker_end + marker_start + ' class="linkRef" refY="-50" stroke="black" stroke-width="3px" d="M10,10L20,10L30,10"></path>';
            var path = path_base.replace('__ArrowTypeId__', elements.ArrowTypeId);

            // elements.svg = svgConstructStart + defs + '<path transform="translate(10,10)" fill="green" d="M0,-5L10,0L0,5"></path>' + svgConstructStop;
            elements.svg = svgConstructStart + defs + path + svgConstructStop;
            return elements;
          });
          return dataset;
        });

        that.RelationTypesModel = aRelationTypes;
        console.log(aRelationTypes)

      })
    },
    runAnalysis: function(){
      this.loader = 'loading';
      console.log(this.selectedRelations);
    }
  },
  computed: {
    selectedRelations: function() {
      var aRelationTypes = this.RelationTypesModel;
      aRelationTypes = aRelationTypes.map(function(dataset) {
        var selectedElements = dataset.Children.filter(function(element) {
          return element.selected;
        });
        return selectedElements.map(function(element) {
          return element.RelationTypeId;
        });
      });
      return aRelationTypes.reduce(function(a, b) {
        return a.concat(b);
      }, []).join(',');

    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
  mounted() {
    this.getRelations()
  }
}
</script>
<style lang="scss">
</style>
