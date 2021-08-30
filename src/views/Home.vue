<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <!-- left side statistics section -->
        <v-col cols="3">
          <v-row dense justify="start">
            <v-col cols="9">
              <v-card>
                <v-card-title>Status</v-card-title>
                <v-simple-table dense>
                  <tbody v-if="selectedOrganism.taxcode">
                    <h4>
                      {{ statistics[selectedOrganism.taxcode].shortName }}
                      Proteome
                    </h4>
                    <tr>
                      <td>Coverage:</td>
                      <td>
                        {{ proteomeCoverage }} %
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon small v-bind="attrs" v-on="on">info</v-icon>
                          </template>
                          <span>SwissProt Only</span>
                        </v-tooltip>
                      </td>
                    </tr>

                    <tr>
                      <td>Proteins:</td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .IDENTIFIED_PROTEIN_COUNT.VALUE
                        }}
                        of
                        {{
                          statistics[selectedOrganism.taxcode]
                            .TOTAL_PROTEIN_COUNT.VALUE
                        }}
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon small v-bind="attrs" v-on="on">info</v-icon>
                          </template>
                          <span>SwissProt Only</span>
                        </v-tooltip>
                      </td>
                    </tr>

                    <tr>
                      <td>Isoforms:</td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .IDENTIFIED_ISOFORM_COUNT.VALUE
                        }}
                        of
                        {{
                          statistics[selectedOrganism.taxcode]
                            .TOTAL_ISOFORM_COUNT.VALUE
                        }}
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon small v-bind="attrs" v-on="on">info</v-icon>
                          </template>
                          <span>SwissProt and TrEMBL</span>
                        </v-tooltip>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .ISOFORM_UNIQUE_PEPTIDE_COUNT.DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .ISOFORM_UNIQUE_PEPTIDE_COUNT.VALUE
                        }}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .PROTEIN_UNIQUE_PEPTIDE_COUNT.DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .PROTEIN_UNIQUE_PEPTIDE_COUNT.VALUE
                        }}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode].PEPTIDE_COUNT
                            .DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode].PEPTIDE_COUNT
                            .VALUE
                        }}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode].SPECTRA_COUNT
                            .DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode].SPECTRA_COUNT
                            .VALUE
                        }}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .SYNTHETIC_REFERENCE_SPECTRA_COUNT.DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .SYNTHETIC_REFERENCE_SPECTRA_COUNT.VALUE
                        }}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .PREDICTED_REFERENCE_SPECTRA_COUNT.DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .PREDICTED_REFERENCE_SPECTRA_COUNT.VALUE
                        }}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .TISSUE_COUNT_PROTEIN.DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .TISSUE_COUNT_PROTEIN.VALUE
                        }}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .QUANTITATIVE_PROTEOMICS_DATA_POINTS.DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .QUANTITATIVE_PROTEOMICS_DATA_POINTS.VALUE
                        }}
                      </td>
                    </tr>

                    <h4>
                      {{ statistics[selectedOrganism.taxcode].shortName }}
                      Transcriptome
                    </h4>

                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .TISSUE_COUNT_TRANSCRIPTS.DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .TISSUE_COUNT_TRANSCRIPTS.VALUE
                        }}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .QUANTITATIVE_TRANSCRIPTOMICS_DATA_POINTS
                            .DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode]
                            .QUANTITATIVE_TRANSCRIPTOMICS_DATA_POINTS.VALUE
                        }}
                      </td>
                    </tr>

                    <h4>Other Statistics</h4>
                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode].VIA_ASSAY_COUNT
                            .DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode].VIA_ASSAY_COUNT
                            .VALUE
                        }}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode].BIO_ASSAY_COUNT
                            .DISPLAY_NAME
                        }}:
                      </td>
                      <td>
                        {{
                          statistics[selectedOrganism.taxcode].BIO_ASSAY_COUNT
                            .VALUE
                        }}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card>
            </v-col>
            <v-col cols="9">
              <v-card>
                <v-card-title>Repository</v-card-title>
                <v-simple-table dense>
                  <tbody>
                    <tr>
                      <td>Projects:</td>
                      <td>
                        {{ statistics.PROJECT_COUNT }}
                      </td>
                    </tr>
                    <tr>
                      <td>Experiments:</td>
                      <td>
                        {{ statistics.EXPERIMENT_COUNT }}
                      </td>
                    </tr>
                    <h4>Recently Uploaded Projects</h4>
                    <template v-for="project in statistics.RECENT_PROJECTS">
                      <a
                        class="projectlink"
                        :key="project.PROJECT_ID"
                        :href="project.PROJECT_ID"
                        target="_blank"
                      >
                        {{ project.NAME }}
                      </a>
                      <br :key="`${project.PROJECT_ID}-br`" />
                    </template>
                  </tbody>
                </v-simple-table>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <!-- main container -->
        <v-col cols="6">
          <!-- header -->
          <v-row>
            <v-col cols="12">
              <v-card flat dense>
                <v-card-title>Welcome to ProteomicsDB!</v-card-title>
                <v-card-subtitle
                  >ProteomicsDB is an effort of the Technische Universität
                  München (TUM). It is dedicated to expedite the identification
                  of the human proteome and its use across the scientific
                  community.</v-card-subtitle
                >
              </v-card>
            </v-col>
          </v-row>
          <!-- /header -->
          <v-row>
            <v-col cols="12">
              <v-layout class="container-layout" row ma-2>
                <v-flex v-for="(t, index) in tiles" :key="index" xs6 md6 style="margin-bottom:10px;margin-right:10px;max-width:450px">
                  <v-hover>
                    <v-card
                      slot-scope="{ hover }"
                      :class="`elevation-${hover ? 8 : 2}`"
                      class="ma-2"
                    >
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <v-avatar class="ma-3" size="150" tile :key="t.id">
                          <v-img :src="icons[t.icon]" :key="t.icon"></v-img>
                        </v-avatar>
                        <div>
                          <v-card-title class="headline">{{
                            t.title
                          }}</v-card-title>
                          <v-card-subtitle>{{ t.description }}</v-card-subtitle>
                        </div>
                      </div>
                    </v-card>
                  </v-hover>
                </v-flex>
              </v-layout>
            </v-col>
            <!-- <v-divider vertical inset></v-divider>
            <v-col cols="4">
              <v-layout class="container-layout" row my-2>
                <v-flex xs6 md6>
                  <v-hover>
                    <v-card class="ma-2">
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <v-avatar class="ma-3" size="125" tile>
                          <v-img :src="icons['searchIcon']"></v-img>
                        </v-avatar>
                        <div>
                          <v-card-title class="headline">test</v-card-title>
                          <v-card-subtitle>test</v-card-subtitle>
                        </div>
                      </div>
                    </v-card>
                  </v-hover>
                </v-flex>
              </v-layout>
            </v-col> -->
          </v-row>
        </v-col>
        <!-- right side news section -->
        <v-col cols="3">
          <v-row dense justify="end">
            <v-col cols="9">
              <v-card>
                <v-list two-line>
                  <v-card-title>News</v-card-title>
                  <template v-for="item in news">
                    <v-divider :key="item.SHORT_TITLE"></v-divider>
                    <v-list-item
                      :key="item.NEWS_ID"
                      @click="openNews"
                      three-line
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="item.SHORT_TITLE"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-html="item.SHORT_TEXT"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-btn x-small fab icon
                        ><v-icon>fas fa-ellipsis-h</v-icon></v-btn
                      >
                    </v-list-item>
                  </template>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  props: {
    source: String,
  },
  data: () => ({
    statistics: {
      REPO: {
        PROJECT_COUNT: {
          DISPLAY_NAME: "Projects",
          VALUE: "42",
        },
        EXPERIMENT_COUNT: {
          DISPLAY_NAME: "Experiments",
          VALUE: "42",
        },
      },
      9606: {
        shortName: "Human",
        SPECTRA_COUNT: {
          DISPLAY_NAME: "Experimental spectra",
          VALUE: "42",
        },
        SYNTHETIC_REFERENCE_SPECTRA_COUNT: {
          DISPLAY_NAME: "Synthetic reference spectra",
          VALUE: "42",
        },
        PREDICTED_REFERENCE_SPECTRA_COUNT: {
          DISPLAY_NAME: "Predicted reference spectra",
          VALUE: "42",
        },
        TISSUE_COUNT_PROTEIN: {
          DISPLAY_NAME: "Tissues",
          VALUE: "42",
        },
        QUANTITATIVE_PROTEOMICS_DATA_POINTS: {
          DISPLAY_NAME: "Quantitative data points",
          VALUE: "42",
        },
        QUANTITATIVE_TRANSCRIPTOMICS_DATA_POINTS: {
          DISPLAY_NAME: "Quantitative data points",
          VALUE: "42",
        },
        TISSUE_COUNT_TRANSCRIPTS: {
          DISPLAY_NAME: "Tissues",
          VALUE: "42",
        },
        VIA_ASSAY_COUNT: {
          DISPLAY_NAME: "Viability assays",
          VALUE: "42",
        },
        BIO_ASSAY_COUNT: {
          DISPLAY_NAME: "Biochemical assays",
          VALUE: "42",
        },
        TOTAL_PROTEIN_COUNT: {
          DISPLAY_NAME: "Total Proteins",
          VALUE: "42",
        },
        IDENTIFIED_PROTEIN_COUNT: {
          DISPLAY_NAME: "Identified Proteins",
          VALUE: "42",
        },
        TOTAL_ISOFORM_COUNT: {
          DISPLAY_NAME: "Total Isoforms",
          VALUE: "42",
        },
        IDENTIFIED_ISOFORM_COUNT: {
          DISPLAY_NAME: "Identified Isoforms",
          VALUE: "42",
        },
        PROTEIN_UNIQUE_PEPTIDE_COUNT: {
          DISPLAY_NAME: "Unique Peptides (Gene)",
          VALUE: "42",
        },
        ISOFORM_UNIQUE_PEPTIDE_COUNT: {
          DISPLAY_NAME: "Unique Peptides (Isoform)",
          VALUE: "42",
        },
        PEPTIDE_COUNT: {
          DISPLAY_NAME: "Peptides",
          VALUE: "42",
        },
      },
      RECENT_PROJECTS: [
        {
          PROJECT_ID: 4339,
          NAME: "Lechner_NatChemBio_2021",
          PUBMEDID: "0",
          DESCRIPTION: "HDACi target landscape",
        },
        {
          PROJECT_ID: 4282,
          NAME: "Sharma_NatNeurosci_2015",
          PUBMEDID: "26523646",
          DESCRIPTION:
            "Cell type- and brain region-resolved mouse brain proteome",
        },
        {
          PROJECT_ID: 4284,
          NAME: "Branca_NatMethods_2014",
          PUBMEDID: "24240322",
          DESCRIPTION:
            "HiRIEF LC-MS enables deep proteome coverage and unbiased proteogenomics",
        },
      ],
    },
    news: [
      { SHORT_TITLE: "News #1", SHORT_TEXT: "Short Desc1", NEWS_ID: 0 },
      { SHORT_TITLE: "News #2", SHORT_TEXT: "Short Desc2", NEWS_ID: 1 },
      { SHORT_TITLE: "News #3", SHORT_TEXT: "Short Desc3", NEWS_ID: 2 },
    ],
    icons: {
      analyticsIcon: require("@/assets/home/protein_adopt_small.jpg"),
      searchIcon: require("@/assets/home/protein_small.jpg"),
      uploadIcon: require("@/assets/home/repository_small.jpg"),
      prositIcon: require("@/assets/home/prosit.png"),
    },
    tiles: [
      {
        title: "Protein search",
        description: "Explore the proteome of your selected organism.",
        icon: "searchIcon",
        id: 0,
      },
      {
        title: "Analytics Toolbox",
        description:
          "Use our analytics tools to explore co-expression patterns, etc.",
        icon: "analyticsIcon",
        id: 1,
      },
      {
        title: "Upload your data",
        description: "Use our analytics and visualization tools on your data.",
        icon: "uploadIcon",
        id: 2,
      },
      {
        title: "Prosit",
        description: "Predict peptide properties using our online service.",
        icon: "prositIcon",
        id: 3,
      },
    ],
  }),
  methods: {
    openNews: function () {},
    getNews: function () {
      let that = this;

      axios
        .get(this.$store.state.host + "/proteomicsdb/logic/getNews.xsjs", {
          params: { top: 3 },
        })
        .then(function (response) {
          that.news = response.data.allNews;
        });
    },
    getStatistics: function () {
      let that = this;
      axios
        .get(this.$store.state.host + "/proteomicsdb/logic/getStatistics.xsjs")
        .then(function (response) {
          that.statistics = response.data;
        });
    },
  },
  computed: {
    ...mapGetters(["selectedOrganism"]),
    proteomeCoverage: function () {
      return (
        (100 *
          this.statistics[this.selectedOrganism.taxcode]
            .IDENTIFIED_PROTEIN_COUNT.VALUE) /
        this.statistics[this.selectedOrganism.taxcode].TOTAL_PROTEIN_COUNT.VALUE
      ).toFixed(1);
    },
  },
  watch: {},
  mounted() {
    this.getNews();
    this.getStatistics();
  },
};
</script>
<style scoped lang="scss">
h4 {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 10pt;
}

td,
.projectlink {
  margin-left: 15px;
  font-size: 9pt !important;
}

.container {
  min-width: 100%;
}

.container.fluid {
  max-width: 90%;
  min-width: 90%;
}

.container-layout {
  width: inherit;
  min-width: inherit;
}
</style>
