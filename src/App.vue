<template>
  <v-app id="inspire">

    <v-app-bar app clipped-right clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn x-large text dark @click="showHome">ProteomicsDB</v-btn>
      </v-toolbar-items>
      <v-menu
                       v-model="menu"
                       :close-on-content-click="false"
                       :nudge-width="200"
                       offset-x
                       >
                       <template v-slot:activator="{ on, attrs }">
                         <v-chip label flat color="primary" v-bind="attrs" v-on="on">
                           <v-avatar left><v-icon dark v-text="selectedOrganismShown.icon"></v-icon></v-avatar>   {{selectedOrganismShown.text}}
                           <v-avatar right><v-icon dark>fas fa-chevron-circle-down</v-icon></v-avatar>
                         </v-chip>
                       </template>
                       <v-card>
                         <v-text-field
                                                       v-model="searchOrganismInput"
                                                       append-icon="mdi-magnify"
                                                       label="Search"
                                                       single-line
                                                       hide-details
                                                       @input="searchOrganism"
                                                       @change="searchOrganism"
                                                       ></v-text-field>
                           <v-list >
                             <v-list-item-group v-model="selectedOrg" color="accent" mandatory>
                               <v-list-item
                                                                      v-for="item in organismsFiltered"
                                                                      :key="item.id"
                                                                      :value="item.taxcode"
                                                                      @click="menu = !menu"
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
      </v-menu>
      <v-spacer></v-spacer>
            <v-text-field
                 center
                 hide-details
                 prepend-icon="search"
                 single-line
                 absolute
                 ></v-text-field>
              <v-btn-toggle
                 v-model="searchOption"
                 background-color="primary"
                 dark
                 dense
                 mandatory
                 >
                 <v-btn outlined value="protein">Protein</v-btn>
                <v-btn outlined value="peptide">Peptide</v-btn>
              </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
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
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :expand-on-hover="!isMobile()"
      app
      clipped
      left
      bottom
      >
      <v-list shaped>
        <v-list-item-group v-model="selectedPage" color="accent" mandatory>
          <v-list-item @click="showHome">
            <v-list-item-action>
              <v-icon>fas fa-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
                                                  prepend-icon="fas fa-search"
                                                  value="false">
            <template v-slot:activator><v-list-item-title>Search</v-list-item-title></template>
            <v-list-item @click="showProteins" right>
              <v-list-item-action>
                <v-icon>fas fa-folder</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Protein</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="showPeptides" right>
              <v-list-item-action>
                <v-icon>fas fa-folder</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Peptide</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item @click="showProjects">
            <v-list-item-action>
              <v-icon>fas fa-folder</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Project</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showAnalytics">
            <v-list-item-action>
              <v-icon>fas fa-chart-pie</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Analytics</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showApi">
            <v-list-item-action>
              <v-icon>fas fa-terminal</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>API</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showFaq">
            <v-list-item-action>
              <v-icon>fas fa-question-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>FAQ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showAbout">
            <v-list-item-action>
              <v-icon>fas fa-info-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>About Us</v-list-item-title>
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


      <v-navigation-drawer
                                                  v-model="drawerRight"
                                                  app
                                                  clipped
                                                  right
                                                  bottom
                                                  :expand-on-hover="!isMobile()"
                                                  >
                                                  <v-list shaped>
                                                    <v-list-item-group v-model="selectedOrg" color="accent">
                                                      <v-list-item
                                                                                             v-for="item in organisms"
                                                                                             :key="item.id"
                                                                                             :value="item.taxcode"
                                                                                             @click.stop="right = !right">
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

      <router-view/> 

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
import commons from '@/commons';
import router from '@/router';
export default {
  props: {
    source: String,
  },
  data: () => ({
    menu: false,
    expandedMenu: true,
    selectedPage: 0,
    selectedOrg: 9606,
    organisms: [
    {id: 0, text: 'Homo sapiens', icon: 'fas fa-user', taxcode: 9606},
    {id: 1, text: 'Arabidopsis thaliana', icon: 'fas fa-seedling', taxcode: 3702},
    {id: 2, text: 'Mus musculus', icon: 'fas fa-paw', taxcode: 10090}
    ],
    organismsFiltered: [],
    searchOrganismInput: "",
    selectedOrganismShown: {},
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    version: '4.0',
    searchOption: 'protein'
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
    checkForClose: function(){
      if(this.organismsFiltered.length === 1){
        this.menu = false;
      }
    },
    isMobile: function() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    searchOrganism: function() {
      if (this.searchOrganismInput !== '') {
        this.organismsFiltered = Object.assign(this.organisms.filter((x) => { return(x.text.toLowerCase().includes(this.searchOrganismInput.toLowerCase()))}));
      } else {
        this.organismsFiltered = Object.assign(this.organisms);
      }

      if (this.organismsFiltered.length === 0) {
        this.organismsFiltered = Object.assign(this.organisms);
      }
    }
  },
  computed: {
    /*    selectedOrganismShown: function() {
      return( this.organisms.filter((x) => {return(x.taxcode === this.selectedOrg)})[0])
    }*/
  },
  watch: {
    selectedOrg: function (val) {
      this.selectedOrganismShown = Object.assign(this.organisms.filter((x) => { return(x.taxcode === parseInt(val))})[0])
      commons.setCookie('organism',val, 14);
      //TODO always change to Home page?
    }
  },
  mounted() {
    this.organismsFiltered = Object.assign(this.organisms);
    this.selectedOrganismShown = Object.assign(this.organisms.filter((x) => { return(x.taxcode === this.selectedOrg)})[0])
    var iTaxcode = commons.getCookie('organism');
    iTaxcode = iTaxcode === null ? 9606 : iTaxcode;
    this.selectedOrg = iTaxcode;
    commons.setCookie('organism',iTaxcode, 14);
  }
}
</script>
<style lang="scss">
</style>
