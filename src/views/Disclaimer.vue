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
                <v-card-title>ProteomicsDB Terms of Use</v-card-title>
                <v-card-subtitle style="margin-bottom: -25px">
                  <v-spacer style="height:1cm"/>
                  <span v-html="disclaimerXML"> </span>
                </v-card-subtitle>
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
  name: "Disclaimer.vue",
  components: {},
  data: () => ({
    disclaimerXML:
      '<html:div><html:strong>DISCLAIMER</html:strong><html:div>'.replaceAll("html:", ""),
  }),
  methods: {
    getDisclaimer: function () {
      let that = this;
      axios
        .get(
          this.$store.state.host + "/proteomicsdb/logic/tmp/tumDisclaimer.fragment.xml"
        )
        .then((response) => {
          //The tags in the response XML contain "html:" prefixes 
          //- if we remove them the document can directly be rendered as html
          that.disclaimerXML = response.data.replaceAll("html:", "");
        });
    },
  },
  mounted() {
    this.getDisclaimer();
  }
};
</script>

<style scoped lang="scss">
</style>