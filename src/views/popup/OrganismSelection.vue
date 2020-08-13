<template>
  <v-dialog v-model="dialogModel" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">Select your species of preference</v-card-title>
      <v-card-subtitle>* Your selection does not affect applications where multiple species comparison is performed</v-card-subtitle>
        <v-card>
          <v-list-item>
            <v-text-field v-model="searchOrganismInput"
                          append-icon="mdi-magnify"
                          placeholder="Search"
                          single-line
                          hide-details
                          @input="searchOrganism"
                          @change="searchOrganism"
                          @keyup.enter="checkForClose"
                          clearable
                          @click:clear="resetOrganism"
                          ></v-text-field>
          </v-list-item>
          <v-list >
            <v-list-item-group v-model="selectedOrg" color="accent" mandatory>
              <v-list-item v-for="item in organismsFiltered"
                           :key="item.id"
                           :value="item.taxcode"
                           @keyup.enter="checkForClose"
                           >
                           <v-list-item-action>
                             <v-icon v-text="item.icon"></v-icon>
                           </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title><i>{{item.text}}</i></v-list-item-title>
            </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="emitAndClose">Select</v-btn>
      </v-card-actions>
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
    organisms: {
      type: Array,
      default: undefined
    }
  },
  data: () => ({
    dialogModel: false,
    organismsFiltered: null,
    searchOrganismInput: '',
    selectedOrg: 9606
  }),
  methods: {
    searchOrganism: function() {
      if (this.searchOrganismInput !== '') {
        this.organismsFiltered = Object.assign(this.organisms.filter((x) => { return(x.text.toLowerCase().includes(this.searchOrganismInput.toLowerCase()))}));
      } else {
        this.resetOrganism();
      }

      if (this.organismsFiltered.length === 0) {
        this.resetOrganism();
      }
    },
    resetOrganism: function() {
      this.organismsFiltered = Object.assign(this.organisms);
    },
    emitAndClose: function(){
      this.$emit('selectedOrganism', this.selectedOrg);
      this.dialogModel = false;
    },
    checkForClose: function(){
      if(this.organismsFiltered.length === 1){
        this.emitAndClose();
      }
    }
  },
  computed: {
  },
  watch: {
    openDialog: function() {
      this.dialogModel = this.openDialog
    },
    organisms: function() {
      this.organismsFiltered= Object.assign(this.organisms)
    }
  },
  mounted() {
    this.dialogModel = this.openDialog
    this.organismsFiltered= Object.assign(this.organisms)
  }
}
</script>
<style lang="scss">
</style>
