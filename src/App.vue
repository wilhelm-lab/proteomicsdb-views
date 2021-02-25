<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right clipped-left :color="$store.state.selectedOrganismShown.primaryColor" dark>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn x-large text dark @click="showHome">
          <v-avatar size=40>
            <img :src="imagesrc" class="prdbIcon" >
          </v-avatar>ProteomicsDB</v-btn>
      </v-toolbar-items>
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x absolute>
        <template v-slot:activator="{ on, attrs }">
          <v-chip label flat  v-bind="attrs" v-on="on"  outlined>
            <v-avatar left><v-icon dark v-text="$store.state.selectedOrganismShown.icon"></v-icon></v-avatar>   {{$store.state.selectedOrganismShown.text}}
            <v-avatar right><v-icon dark>fas fa-chevron-circle-down</v-icon></v-avatar>
          </v-chip>
        </template>
        <v-card>
          <v-list-item>
            <v-text-field v-model="searchOrganismInput"
                          append-icon="mdi-magnify"
                          label="Search"
                          autofocus
                          single-line
                          hide-details
                          @input="searchOrganism"
                          @change="searchOrganism"
                          clearable
                          @click:clear="resetOrganism"
                          ></v-text-field>
          </v-list-item>
          <v-list >
            <v-list-item-group color="accent" mandatory v-model="selectedOrgInList">
              <v-list-item v-for="item in organismsFiltered"
                           :key="item.id"
                           :value="item.taxcode"
                           return-object
                           @click="checkForClose(item.taxcode)"
                           @keyup.enter="checkForClose(item.taxcode)"
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
                          autofocus
                          placeholder="Search for a"
                          @keyup.enter="triggerSearch"
                          @change="cleanString"
                          @input="cleanString"
                          @focus="cleanString"
                          clearable
                          ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select
                 v-model="selectSearchType"
                 :items="searchTypes"
                 :background-color="$store.state.selectedOrganismShown.color"
                 dark
                 dense
                 flat outlined 
                 />
            </v-col>
          </v-row>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-dialog v-model='redirectWarning' persistent max-width=500>
        <v-card>
          <v-card-title class="headline">Warning - Redirecting to home page</v-card-title>
          <v-card-text>This action will cause the website to redirect to the home page. If you wish to continue please select OK, otherwise select cancel.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="OKAndClose">OK</v-btn>
            <v-btn color="red darken-1" text @click="CancelAndClose">CANCEL</v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>
      <v-navigation-drawer
                   v-model="drawerRight"
                   :expand-on-hover="!isMobile()"
                   app
                   clipped
                   right
                   bottom
                   >
                   <v-list>
                     <v-list-item-group v-model="selectedPage" :color="$store.state.selectedOrganismShown.secondaryColor" mandatory>
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
        <selectOrganismPopup :openDialog="noOrganismSelected" :organisms="organisms" @selectedOrganism="selectOrganism"/>

        <v-footer app :color="$store.state.selectedOrganismShown.primaryColor"
                                        class="white--text"
                                        >
                                        <span>TUM &copy;{{ new Date().getFullYear() }}</span>
                                        <v-spacer></v-spacer>
                                        <v-btn x-small text class="white--text" @click="showAbout">About us</v-btn>
                                        <v-divider vertical></v-divider>
                                        <v-btn x-small text class="white--text" @click="showFaq">Frequently asked questions</v-btn>
                                        <v-divider vertical></v-divider>
                                        <v-btn x-small text class="white--text" @click="showApi">Programmatic access - API</v-btn>
                                        <v-divider vertical></v-divider>
                                        <v-btn x-small text class="white--text" @click="showContact">Contact us</v-btn>
                                        <v-divider vertical></v-divider>
                                        <v-btn x-small text class="white--text">Terms of use</v-btn>
                                        <v-divider vertical></v-divider>
                                        <v-btn x-small text class="white--text">Impressum</v-btn>
                                        <v-spacer></v-spacer>
                                        <span> v{{version}} </span>
        </v-footer>
    </v-app>
</template>

<script>
import store from '@/store/store.js'
import router from '@/router';
import selectOrganismPopup from '@/views/popup/OrganismSelection'

import {
  mapGetters,
} from 'vuex'
export default {
  components: {
    selectOrganismPopup
  },
  props: {
  },
  data: () => ({
    redirectWarning: false,
    newOrg: null,
    selectedOrgInList: null,
    menu: false,
    imagesrc: require("@/assets/prdbIcon.png"),
    expandedMenu: true,
    selectedPage: 0,
    selectedOrg: null,
    noOrganismSelected: false,
    organismsFiltered: [],
    searchOrganismInput: "",
    searchString: "",
    drawerRight: false,
    right: false,
    left: false,
    version: '4.0',
    selectSearchType: 'Protein',
    searchTypes: ['Protein', 'Peptide', 'Project', 'Drug', 'Cell line']
  }),
  methods: {
    CancelAndClose: function () {
      this.selectedOrgInList = this.$store.state.selectedOrg;
      this.redirectWarning = false;
    },
    OKAndClose: function () {
      this.selectedOrg = this.newOrg;
      this.newOrg = null;
      this.redirectWarning = false;
      router.push('/').catch(()=>{});
    },
    showHome: function(){
      this.searchString = "";
      router.push('/').catch(()=>{});
    },
    triggerSearch: function(){
      this.setSearchString();
      router.push('/protein/search?q='+this.searchString+'&s='+this.selectSearchType).catch(()=>{});
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
    showContact: function(){
      router.push('/contact/').catch(()=>{});
    },
    checkForClose: function(data){
      if(this.selectedOrg !== data) {
        this.newOrg = data;
        if(this.$route.name !== 'home') {
          this.redirectWarning = true;
        } else {
          this.OKAndClose();
          this.menu = false;
        }
        if(this.organismsFiltered.length === 1){
          this.menu = false;
        }
      }
    },
    resetOrganism: function() {
      this.organismsFiltered = Object.assign(this.organisms);
    },
    setStoreShownOrganism: function( obj) {
      store.dispatch({
        type: 'setShownOrganism',
        value: obj
      });
    },
    setStoreOrganism: function() {
      store.dispatch({
        type: 'setOrganism',
        value: this.$cookie.get('organism')
      });
    },
    setSearchString: function() {
      store.dispatch({
        type: 'setSearchString',
        value: this.searchString
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
      if (this.searchOrganismInput !== null) {
        this.searchOrganismInput = this.searchOrganismInput.replaceAll('/','');
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
    selectOrganism: function(taxcode) {
      this.selectedOrg = taxcode;
      this.$cookie.set('organism', taxcode, { expires: 14, SameSite: 'Lax' });
      this.setStoreOrganism();
      let selectedOrganismShown = Object.assign(this.organisms.filter((x) => { return(x.taxcode === this.selectedOrg)})[0])
      this.setStoreShownOrganism(selectedOrganismShown);

    },
    focusInput: function () {
      this.$refs.searchBar.focus();
      this.searchString="";
    },
    cleanString: function () {
      if (this.searchString !== null) {
        this.searchString = this.searchString.replaceAll('/','');
      }
    }
  },
  computed: {
    ...mapGetters(['organisms']),
  },
  watch: {
    '$store.state.search': function(str){
      this.searchString = str;
    },
    selectedOrg: function (val) {
      let selectedOrganismShown = Object.assign(this.organisms.filter((x) => { return(x.taxcode === parseInt(val))})[0])
      this.$cookie.set('organism', val, { expires: 14, SameSite: 'Lax' });
      this.setStoreOrganism();
      this.setStoreShownOrganism(selectedOrganismShown);
    }
  },
  created() {
    var that =  this;
    window.addEventListener('keydown', function(e) {
      if (e.keyCode === 191) {
        that.focusInput();
      }
    });
  },
  mounted() {
    this.organismsFiltered = Object.assign(this.organisms);
    var iTaxcode = parseInt(this.$cookie.get('organism'));
    if (iTaxcode === null || isNaN(iTaxcode)) {
      //open dialog
      this.noOrganismSelected = true;
    } else {
      this.selectOrganism(iTaxcode);
    }
  }
}
</script>
<style lang="scss">
.prdbIcon{
  border: 2px solid lightgray;
  background-color: lightgray;
}

.dx-selection {
  background-color: #b0b0b0 !important;
}
</style>
