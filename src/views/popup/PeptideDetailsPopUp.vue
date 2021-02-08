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
      <peptideDetails :proteinId="proteinId" :peptideId="peptideId" ref="peptideDetails"/>
    </v-card>
  </v-dialog>
</template>

<script>
import peptideDetails from '@/views/protein/PeptideDetails'
export default {
  components: {
    peptideDetails
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
      this.$refs.peptideDetails.resetAll();
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
