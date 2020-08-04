<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right clipped-left color="primary" dark>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn x-large text dark @click="showHome">
          <v-avatar size=40>
            <img :src="imagesrc" class="prdbIcon" >
          </v-avatar>ProteomicsDB</v-btn>
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
                                   <v-list-item>
                                     <v-text-field
                                                                 v-model="searchOrganismInput"
                                                                 append-icon="mdi-magnify"
                                                                 label="Search"
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
      <v-toolbar-items>
        <v-row>
          <v-col cols="7">
            <v-text-field v-model="searchString"
                          ref="searchBar"
                          hide-details
                          prepend-icon="search"
                          single-line
                          absolute
                          label="Search for a"
                          @keyup.enter="triggerSearch"
                          clearable
                          ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="selectSearchType"
              :items="searchTypes"
              background-color="primary"
              dark
              dense
              flat outlined 
              />
          </v-col>
        </v-row>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
                            v-model="drawerRight"
                            :expand-on-hover="!isMobile()"
                            app
                            clipped
                            right
                            bottom
                            >
                            <v-list>
                              <v-list-item-group v-model="selectedPage" color="accent" mandatory>
                                <v-list-item @click="showHome">
                                  <v-list-item-action>
                                    <v-icon>fas fa-home</v-icon>
                                  </v-list-item-action>
                                  <v-list-item-content>
                                    <v-list-item-title>Home</v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
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


    <router-view/> 

      <v-footer
                                                                        app
                                                                        color="primary"
                                                                        class="white--text"
                                                                        >
                                                                        <span>TUM &copy;{{ new Date().getFullYear() }}</span>
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn x-small text dark>About us</v-btn>
                                                                        <v-btn x-small text dark>Frequently asked questions</v-btn>
                                                                        <v-btn x-small text dark>Programmatic access - API</v-btn>
                                                                        <v-divider vertical/>
                                                                          <v-btn x-small text dark>Contact us</v-btn>
                                                                          <v-btn x-small text dark>Impressum</v-btn>
                                                                          <v-spacer></v-spacer>
                                                                          <span> v{{version}} </span>
                                                                        </v-footer>
      </v-app>
</template>

<script>
import store from '@/store/store.js'
import router from '@/router';
export default {
  props: {
    source: String,
  },
  data: () => ({
    menu: false,
    imagesrc: require("@/assets/prdbIcon.png"),
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
    searchString: "",
    selectedOrganismShown: {},
    drawerRight: false,
    right: false,
    left: false,
    version: '4.0',
    selectSearchType: 'Protein',
    searchTypes: ['Protein', 'Peptide', 'Project', 'Drug', 'Cell line']
  }),
  methods: {
    showHome: function(){
      router.push('/').catch(()=>{});
    },
    triggerSearch: function(){
      this.$store.state.search = this.searchString;
      router.push('/protein/search/'+this.searchString).catch(()=>{});
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
    resetOrganism: function() {
      this.organismsFiltered = Object.assign(this.organisms);
    },
    showKey: function(event) {
      console.log(event.key)
    },
    setStoreOrganism: function() {
      store.dispatch({
        type: 'setOrganism',
        value: this.$cookie.get('organism')
      });
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
        this.resetOrganism();
      }

      if (this.organismsFiltered.length === 0) {
        this.resetOrganism();
      }
    }
  },
  computed: {
  },
  watch: {
    '$store.state.search': function(str){
      this.searchString = str;
    },
    selectedOrg: function (val) {
      this.selectedOrganismShown = Object.assign(this.organisms.filter((x) => { return(x.taxcode === parseInt(val))})[0])
      this.$cookie.set('organism', val, 14);
      this.setStoreOrganism();
      //TODO always change to Home page?
    }
  },
  created: {
    function() {
      window.addEventListener('keydown', function(e) {
        if (e.keyCode === 191) {
          this.$refs.searchBar.focus();
        }
       });
     }
  },
  mounted() {
    this.organismsFiltered = Object.assign(this.organisms);
    this.selectedOrganismShown = Object.assign(this.organisms.filter((x) => { return(x.taxcode === this.selectedOrg)})[0])
    var iTaxcode = this.$cookie.get('organism');
    iTaxcode = iTaxcode === null ? 9606 : iTaxcode;
    this.selectedOrg = iTaxcode;
    this.$cookie.set('organism', iTaxcode);
    this.setStoreOrganism();
  }
}
</script>
<style lang="scss">
.prdbIcon{
  border: 2px solid lightgray;
  background-color: lightgray;
}
</style>
