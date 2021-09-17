<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <!-- main container -->
        <v-col cols="12">
          <!-- header -->
          <v-row>
            <v-col cols="12">
              <v-card flat dense>
                <v-card-title>APIv2.0 for ProteomicsDB</v-card-title>
                <v-card-subtitle style="margin-bottom: -45px">
                  <p>
                    The usage of this API
                    <b>
                      does not require any
                      registration or specific privileges
                    </b>.
                  </p>
                  <p>
                    ProteomicsDB provides an API to download data
                    programmatically via simple GET-Requests. The overall API is based on the ODATAv2 protocol.
                    Please refer to https://www.odata.org/documentation/odata-version-2-0/uri-conventions/ for more information. JSON and XML are
                    supported return formats.
                  </p>
                  <p>
                    <b>
                      Please do not
                      hesitate to report bugs and provide us feedback and suggestions to enhance your overall experience.
                    </b>
                  </p>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card flat dense>
                <v-card-title>Structure of this API-Documentation</v-card-title>
                <v-card-subtitle style="margin-bottom: -45px">
                  <p>
                    In the section below, you can search for and browse through all available API Datasets, their respective Entities and their most important
                    metadata.
                  </p>
                  <p>
                    A Entity is a specific set of data with a narrow focus and is reflected by the highest Tree Nodes. For each Entity, we
                    provide an example for a GET Request in the "GET Request Example" Node, the Attributes (further referred to as "Columns")
                    for each Entity in the "Columns" Node and the Navigation Properties provided by the Entity in the "Navigation Properties"
                    Node.
                  </p>
                  <p>
                    Navigation Properties allow you to navigate through connected datasets. A entirely new feature that brings together
                    all previous API Endpoints you know from Version 1 into one "Single Point of Truth" making data joins and aggregation obsolete!
                    Depending on your navigation request, the data is automatically aggregated and joined in the backend accordingly. Try it out!
                    You can find all connected datasets for an Entity and one example for each navigation request inside the "Navigation Properties"
                    Node.
                  </p>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card flat dense>
                <v-card-title>Query Options: Filtering, Ranking, Sorting etc.</v-card-title>
                <v-card-subtitle style="margin-bottom: -25px">
                  <p>
                    To use Query Options in a request, you simply have to add some of the following Query Options at the end of your request with "?$". If you would like to use multiple query options at the same time, you can append a Query Option using "&". Examples will be provided below.
                  </p>
                  <p>
                    <b>$orderby ($orderby=nameOfColumnOfEntity asc/desc)</b>
                  </p>
                  <p>
                    With this option you can order your results according to your preferences in ascending or descending order. Standard order when no order option is provided: ascending.
                  </p>
                  <p> 
                    Examples:
                    <ul>
                    <li>https://d31.proteomicsdb.in.tum.de/proteomicsdb/logic/api_v2/api.xsodata/Experiment?$orderby=EXPERIMENT_ID</li>
                    <li>https://d31.proteomicsdb.in.tum.de/proteomicsdb/logic/api_v2/api.xsodata/Experiment?$orderby=EXPERIMENT_ID asc</li>
                    <li>https://d31.proteomicsdb.in.tum.de/proteomicsdb/logic/api_v2/api.xsodata/Experiment?$orderby=EXPERIMENT_ID desc</li>
                    </ul>
                  </p>
                  <p>
                    For further information, please refer to section 4.2 https://www.odata.org/documentation/odata-version-2-0/uri-conventions/
                  </p>
                  <p>
                    <b>$filter ($filter=nameOfColumnOfEntity operator number/'stringValue')</b>
                  </p>
                  <p>
                    "A URI with a $filter System Query Option identifies a subset of the Entries from the Collection of Entries identified by the Resource Path section of the URI. The subset is determined by selecting only the Entries that satisfy the predicate expression specified by the query option. Potential operators are Eq(Equal), Ne(NotEqual), Gt (GreaterThan), Lt (LessThan) and further. For a list of all available Operators, please refer to section 4.5 at: https://www.odata.org/documentation/odata-version-2-0/uri-conventions/. Here you can also find String Functions, Date Functions, Math Functions and TypeFunctions to filter for a substring or casting a string value to upper- or lower-case only. You can find a few examples below."
                  </p>
                  <p> 
                    Examples:
                    <ul>
                    <li>https://d31.proteomicsdb.in.tum.de/proteomicsdb/logic/api_v2/api.xsodata/Experiment?$filter=EXPERIMENT_ID lt 2356</li>
                    <li>https://d31.proteomicsdb.in.tum.de/proteomicsdb/logic/api_v2/api.xsodata/Experiment?$filter=substringof('prot',DESCRIPTION)</li>
                    <li>Combined query:
                      <ul>
                        <li>https://d31.proteomicsdb.in.tum.de/proteomicsdb/logic/api_v2/api.xsodata/Experiment?$filter=substringof('prot',DESCRIPTION)&$orderby=EXPERIMENT_ID desc</li>
                      </ul>
                      </li>
                    </ul>
                  </p>
                  <p>
                    For further information, please refer to section 4.5 https://www.odata.org/documentation/odata-version-2-0/uri-conventions/
                  </p>
                  <p>
                    <b>Further Query Operators work accordingly:</b>
                  </p>
                  <p>
                    <ul>
                      <li>$select</li>
                      <li>$skip</li>
                      <li>$expand</li>
                      <li>$format</li>
                      <li>$top</li>
                    </ul>
                  </p>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card flat dense>
                <v-card-title>Search Functionality</v-card-title>
                <v-card-subtitle style="margin-bottom: -25px">
                  <p>
                    By typing into the "Search API" field, you can search for every Entity, Example, Column and Navigation Property available
                    in the Tree-View. The Tree will be filtered automatically based on your entered characters and text.
                  </p>
                  <p>
                    <b>If you cannot see any entries below the search bar, please wait for a few seconds to finish loading all needed information from the server. Once done, you can use the search bar.</b>
                  </p>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
          <!-- /header -->
        </v-col>
      </v-row>
    </v-container>
    <v-card class="mx-auto" max-width="95%">
      <v-sheet class="pa-4 primary lighten-2">
        <v-text-field
          v-model="search"
          label="Search API"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
        <v-checkbox v-model="caseSensitive" dark hide-details label="Case sensitive search"></v-checkbox>
      </v-sheet>
      <v-card-text>
        <v-treeview :items="allEntities" :search="search" :filter="filter" :open.sync="open"></v-treeview>
      </v-card-text>
    </v-card>
    <v-card flat dense>
      <v-card-subtitle style="margin-bottom: 5px">
        <p>This documentation was created by: Marwin Shraideh, Ludwig Lautenbacher, Prof. Dr. Mathias Wilhelm.</p>
      </v-card-subtitle>
    </v-card>
  </v-main>
</template>

<script>
//icons to add to treeview if needed.
//<template v-slot:prepend="{ item }">
//            <v-icon v-if="item.children" v-text="`mdi-${item.id === 1 ? 'home-variant' : 'api'}`"></v-icon>
//          </template>
import { mapState } from "vuex";

export default {
  name: "DocuMain",
  props: {
    //allEntities: [],
    EntityDetailInformation: {}
  },
  data: () => ({
    items: [],
    open: [],
    search: null,
    caseSensitive: false
  }),
  computed: {
    ...mapState("apidocumentation", {
      allEntities: "allEntities"
    }),
    filter() {
      return this.caseSensitive
        ? (allEntities, search, textKey) =>
            allEntities[textKey].indexOf(search) > -1
        : undefined;
    }
  },
  mounted() {
    this.$store.dispatch("apidocumentation/loadEntities");
    //this.$store.dispatch('apidocumentation/loadEntitiesDetailsAll');
  }
};
</script>
