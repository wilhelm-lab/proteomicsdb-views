<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <!-- main container -->
        <v-col cols="10">
          <!-- header -->
          <v-row>
            <v-col cols="12">
              <v-card flat dense>
                <v-card-title
                  >Frequently asked questions about Proteomics DB</v-card-title
                >
                <v-card-subtitle style="margin-bottom: -25px">
                </v-card-subtitle>
                <v-list>
                  <template v-for="item in faqs">
                    <v-list-item :key="`${item.category}-item`"></v-list-item>
                    <h3 :key="`${item.category}-category`">
                      {{ item.category }}
                    </h3>
                    <v-expansion-panels
                      :key="`${item.category}-expansion-panels`"
                    >
                      <v-expansion-panel
                        :key="`${item.category}-expansion-panel-${index}`"
                        v-for="(qanda, index) in item.qandas"
                      >
                        <v-expansion-panel-header>{{
                          qanda.question
                        }}</v-expansion-panel-header>
                        <v-expansion-panel-content class="text-left">
                          <span v-html="qanda.answer"> </span
                        ></v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </template>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
          <!-- /header -->
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "FAQ.vue",
  components: {},
  data: () => ({
    faqs: [
      {
        category: "First category",
        qandas: [
          {
            question: "Which browsers are supported?",
            answer: '<p style="align: justify">Blah blah</p>',
          },
          {
            question: "How do I register/login?",
            answer: '<p style="align: justify"> Blah blah blah</p>',
          },
        ],
      },
      {
        category: "Another category",
        qandas: [
          {
            question:
              "What is the meaning of no evidence/protein/isoform“evidence”?",
            answer: '<p style="align: justify">Dunno.</p>',
          },
        ],
      },
    ],
  }),
  methods: {
    getFaqs: function () {
      let that = this;

      axios
        .get(this.$store.state.host + "/proteomicsdb/logic/getFaqs.xsjs")
        .then((response) => {
          that.faqs = response.data;
        });
    },
  },
  mounted() {
    this.getFaqs();
  },
};
</script>

<style scoped lang="scss">
h3 {
  font-size: 12pt;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>