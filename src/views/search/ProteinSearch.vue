<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
          <v-chip-group mandatory active-class="primary--text" v-model="selectedChip">
            <v-chip v-for="item in chips" :key="item" >{{item}}</v-chip>
          </v-chip-group>
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
    chips: [ "Protein", "Peptide", "Project", "Drug", "Cell line" ],
    selectedChip: null
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
    this.setStoreSearchString();
    this.taxcode = this.$cookie.get('organism');
    this.selectedChip = this.searchType;
  }
}
</script>
<style lang="scss">
</style>
