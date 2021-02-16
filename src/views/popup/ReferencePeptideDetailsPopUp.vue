<template>
  <v-dialog v-model="dialogModel" @click:outside="close">
    <v-card>
      <v-btn 
            fixed top right
            style="right:50px;top:60px;"
            elevation="4"
            icon
            @click="close"
            >
            <v-icon>mdi-close</v-icon>
    </v-btn>
      <refPeptideDetails :proteinId="proteinId" :peptideId="peptideId" ref="refPeptideDetails"/>
    </v-card>
  </v-dialog>
</template>

<script>
import refPeptideDetails from '@/views/protein/ReferencePeptideDetails'
export default {
  components: {
    refPeptideDetails
  },
  props: {
    openDialog: {
      type: Boolean,
      default: false
    },
    proteinId: String,
    peptideId: String
  },
  computed: {
  },
  data: () => ({
    dialogModel: false
  }),
  methods: {
    close: function(){
      this.$refs.refPeptideDetails.resetAll();
      this.dialogModel = false;
      this.$emit('closePopUp', null);
      this.$router.go(-1);
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
