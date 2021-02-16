<template>
  <v-dialog v-model="dialogModel" @keydown.esc="close" @click:outside="close" max-width="800">
    <v-card>
      <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
      <sampleInfoPanel :sampleId="sampleId" :omics="omics" ></sampleInfoPanel>
    </v-card>
  </v-dialog>
</template>

<script>
import sampleInfoPanel from '@/components/SampleInformation'
export default {
  components: {
    sampleInfoPanel
  },
  props: {
    openDialog: {
      type: Boolean,
      default: false
    },
    sampleId: String,
    omics: String
  },
  computed: {
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
