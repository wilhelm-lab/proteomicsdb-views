<template>
  <v-app id="inspire">

    <v-navigation-drawer
      v-model="drawer"
      expand-on-hover
      app
      clipped
      left
    >
      <v-list shaped>
        <v-list-item-group v-model="selectedOrg" color="accent">
          <v-list-item
            v-for="(item, i) in organisms"
            :key="i"
            @click.stop="left = !left">
            <v-list-item-action>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title><i>{{item.text}}</i></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="left"
      fixed
      temporary
    ></v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      clipped-left
      color="primary"
      dark
    >
      <v-toolbar-title>ProteomicsDB</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text @click="showHome">Home</v-btn>
        <v-btn text @click="showProteins">Proteins</v-btn>
        <v-btn text @click="showPeptides">Peptides</v-btn>
        <v-btn text @click="showProjects">Projects</v-btn>
        <v-btn text @click="showAnalytics">Analytics</v-btn>
        <v-divider
          dark
          inset
          vertical>
        </v-divider>
        <v-btn text @click="showApi">API</v-btn>
        <v-btn text @click="showFaq">FAQ</v-btn>
        <v-btn text @click="showAbout">About Us</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
      expand-on-hover>
      <v-list dense>
        <v-list-item @click.stop="right = !right">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Previous Help Menu...</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model="right"
      fixed
      right
      temporary
    ></v-navigation-drawer>

    <v-footer
      app
      color="primary"
      class="white--text"
    >
      <span>TUM &copy;{{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
      <v-btn text dark>Impressum</v-btn>
      <v-btn text dark>Contact us</v-btn>
      <v-spacer></v-spacer>
      <span> v{{version}} </span>
    </v-footer>
  </v-app>
</template>

<script>
  import router from '@/router';
  export default {
    props: {
      source: String,
    },
    data: () => ({
      selectedOrg: 0,
      organisms: [
        {text: 'Homo sapiens', icon: 'fas fa-user'},
        {text: 'Arabidopsis thaliana', icon: 'fas fa-seedling'},
        {text: 'Mus musculus', icon: 'fas fa-paw'}
      ],
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
      version: '4.0'
    }),
    methods: {
      showHome: function(){
        router.push('/home/').catch(()=>{});
      },
      showProteins: function(){
        router.push('/protein/').catch(()=>{});
      },
      showPeptides: function(){
        router.push('/peptide/').catch(()=>{});
      },
      showProjects: function(){
        router.push('/project/').catch(()=>{});
      },
      showAnalytics: function(){
        router.push('/analytics/').catch(()=>{});
      },
      showApi: function(){
        router.push('/api/').catch(()=>{});
      },
      showFaq: function(){
        router.push('/faq/').catch(()=>{});
      },
      showAbout: function(){
        router.push('/about/').catch(()=>{});
      },
    }
  }
</script>
