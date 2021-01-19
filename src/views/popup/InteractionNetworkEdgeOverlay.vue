<template>
  <v-dialog v-model="dialogModel" @click:outside="close">
    <v-card>
      <v-card-title class="headline">Edge information between {{source}} and {{destination}}</v-card-title>
      <v-data-table
                    :headers="headersUp"
                    :items="itemsUp"
                    class="elevation-1"
                    >
      </v-data-table>
      <v-data-table
                    :headers="headersDown"
                    :items="itemsDown"
                    class="elevation-1"
                    >
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {
  },
  props: {
    openDialog: {
      type: Boolean,
      default: false
    },
    inputData: {
      type: Array,
      default: function() {return [{
        Source: '',
        Destination: '',
        Relations: []
    }];}
    }
  },
  computed: {
    source: function() {
      return this.inputData[0].Source;
    },
    destination: function() {
      return this.inputData[0].Destination;
    },
    headersUp: function() {
      return [
        {
          text: this.inputData[0].Source,
          align: 'start',
          sortable: false,
          value: 'SrcAccessionNumber'
        },
        {text:'Relation', value: 'RelationName'},
        {text:'Weight', value: 'Weight'},
        {text: this.inputData[0].Destination, value: 'DestAccessionNumber'}
      ]
    },
    headersDown: function() {
      return [
        {
          text: this.inputData[1].Source,
          align: 'start',
          sortable: false,
          value: 'SrcAccessionNumber'
        },
        {text:'Relation', value: 'RelationName'},
        {text:'Weight', value: 'Weight'},
        {text: this.inputData[1].Destination, value: 'DestAccessionNumber'}
      ]
    },
    itemsUp: function() {
      return this.inputData[0].Relations;
      
    },
    itemsDown: function() {
      return this.inputData[1].Relations;
    }
  },
  data: () => ({
    dialogModel: false
  }),
  methods: {
    close: function(){
      this.dialogModel = false;
      this.$emit('closePopUp', null);
    },
  },
  watch: {
    openDialog: function() {
      this.dialogModel = this.openDialog
    }
  },
  mounted() {
    this.dialogModel = this.openDialog
  }
}
</script>
<style lang="scss">
</style>
