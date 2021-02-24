<template>
  <v-card flat>
    <div class="d-flex flex-no-wrap">
      <v-avatar
         class="ma-3 elevation-2"
         size="120"
         >
         <v-img v-if="avatar !== ''" :src="require(`@/assets/people/${avatar}`)"></v-img>
        <v-img v-else :src="require(`@/assets/commons/unknown.png`)"></v-img>
      </v-avatar>
      <div >
        <v-card-title
                class="headline"
                >{{name}}
                <div v-for="(icon, i) in social" :key="i">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon 
                               @click="openLink(icon.link)"
                               class="mx-1"
                               v-on="on"
                               >{{icon.icon}}</v-icon>
                  </template>
          <span>{{icon.social}}</span>
                </v-tooltip>
                </div>
        </v-card-title>
        <v-card-subtitle class="pb-0">FOCUS - {{focus}}</v-card-subtitle>
        <v-list dense class="py-0">
          <v-list-item>
            <v-list-item-icon class="mx-2">
              <v-icon>
                mdi-briefcase
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{role}}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    avatar: String,
    name: String,
    role: String,
    focus: String,
    social: Array
  },
  components: {
  },
  data: () => ({
  }),
  methods: {
    openLink: function(url) {
      window.open(url,'_blank');
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  }
}
</script>
<style lang="scss">
</style>
