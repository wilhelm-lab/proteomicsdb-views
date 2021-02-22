<template>
  <v-col>
    <v-row>
      <v-speed-dial
        v-model="fabModel"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="openOnHover"
        :transition="transition"
        >
        <template v-slot:activator>
          <v-btn 
        :disabled="disabled"
        v-model="fabModel"
        color="blue darken-2"
        class="white--text"
        fab
        :loading="loading"
        >
        <v-icon v-if="fabModel">
          mdi-close
        </v-icon>
            <v-icon v-else>
              fas fa-download
            </v-icon>
          </v-btn>
        </template>
        <v-btn v-if="svg"
               :disabled="disabled"
              class="white--text"
               fab
               small
               :color="$store.state.selectedOrganismShown.secondaryColor"
               @click="raiseEvent('svg')"
               >
               SVG
        </v-btn>
          <v-btn  v-if="png"
                  :disabled="disabled"
                  fab
                  class="white--text"
                  small
                  :color="$store.state.selectedOrganismShown.secondaryColor"
                  @click="raiseEvent('png')"
                  >
                  PNG
          </v-btn>
            <v-btn v-if="csv"
                   :disabled="disabled"
                   fab
                   class="white--text"
                   small
                   :color="$store.state.selectedOrganismShown.secondaryColor"
                   @click="raiseEvent('csv')"
                   >
                   CSV
            </v-btn>
              <v-btn v-if="sif"
                     :disabled="disabled"
                     fab
                     class="white--text"
                     small
                     :color="$store.state.selectedOrganismShown.secondaryColor"
                     @click="raiseEvent('sif')"
                     >
                     SIF
              </v-btn>
                <v-btn v-if="pdf"
                       :disabled="disabled"
                       fab
                       class="white--text"
                       small
                       :color="$store.state.selectedOrganismShown.secondaryColor"
                       @click="raiseEvent('pdf')"
                       >
                       PDF
                </v-btn>
      </v-speed-dial>
      <v-spacer/>
      </v-row>
    </v-col>
</template>

<script>
export default {
  name: "downloadMenu",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    png: {
      type: Boolean,
      default: false
    },
    svg: {
      type: Boolean,
      default: false
    },
    csv: {
      type: Boolean,
      default: false
    },
    sif: {
      type: Boolean,
      default: false
    },
    pdf: {
      type: Boolean,
      default: false
    },
    openOnHover: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'slide-y-transition'
    },
    direction: {
      type: String,
      default: 'bottom'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fabModel: false
    };
  },
  methods: {
    raiseEvent: function(message) {
      this.$emit(message, null)
    }
  },
  mounted() {
  }
};
</script>

