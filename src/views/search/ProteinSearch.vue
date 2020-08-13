<template>
  <v-main>
    <v-container>
      <v-row justify="space-around" align="center">
        <v-col align="center">
          <v-chip-group mandatory align>
            <v-chip>Protein</v-chip>
            <v-chip>Peptide</v-chip>
            <v-chip>Project</v-chip>
            <v-chip>Drug</v-chip>
            <v-chip>Cell line</v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-row justify="space-around" align="center">
      <searchTable :searchString="searchString" :taxcode="taxcode"/>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import store from '@/store/store.js'
import searchTable from  '@/components/ProteinSearchTable'
export default {
  components: {
    searchTable
  },
  props: {
    searchString: {
      type: String,
      default: ''
    },
    searchType: {
      type: String,
      default: 'Protein'
    }
  },
  data: () => ({
    searchStr: '',
    taxcode: 9606,
  }),
  methods: {
    setStoreSearchString: function() {
      store.dispatch({
        type: 'setSearchString',
        value: this.searchString
      });
    }
  },
  computed: {
  },
  watch: {
    '$store.state.cookie': function(str) {
      this.taxcode = str;
    }
  },
  mounted() {
    console.log(this.searchStr);
    this.setStoreSearchString();
    this.taxcode = this.$cookie.get('organism');
  }
}
</script>
<style lang="scss">
</style>
