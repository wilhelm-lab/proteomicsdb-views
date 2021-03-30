<template>
  <v-card>
    <v-toolbar :color="$store.state.selectedOrganismShown.primaryColor" class="white--text">
      <v-card-title>
        Meet the team!
      </v-card-title>
    </v-toolbar>
    <v-card-text>
      <v-list dense max-width="800">
        <div class="mb-5">
      We are scientists and software developers from the Chair of Proteomics and Bioanalytics at the Technische Universität München (TUM) and Cellzome GmbH, a GSK company. We are continuously improving and adding functionality of ProteomicsDB to enable exploration and analysis of human proteome data.
        </div>
      <v-card-title>Team Leader</v-card-title>
      <v-list-item v-for="person in leaders" :key="person.name">
        <v-col class = "pa-0">
        <v-divider></v-divider>
        <card :name="person.name"
                   :role="person.role"
                   :focus="person.focus"
                   :avatar="person.avatar"
                   :social="person.social"
                   ></card>
        </v-col>
      </v-list-item>
      <v-card-title>Core Team</v-card-title>
      <v-list-item v-for="person in coreTeamMembers" :key="person.name">
        <v-col class = "pa-0">
        <v-divider></v-divider>
        <card :name="person.name"
                   :role="person.role"
                   :focus="person.focus"
                   :avatar="person.avatar"
                   :social="person.social"
                   ></card>
        </v-col>
      </v-list-item>
      <v-card-title>Core Team Emeriti</v-card-title>
      <v-list-item v-for="person in coreTeamEmeriti" :key="person.name">
        <v-col class = "pa-0">
        <v-divider></v-divider>
        <card :name="person.name"
                   :role="person.role"
                   :focus="person.focus"
                   :avatar="person.avatar"
                   :social="person.social"
                   ></card>
        </v-col>
      </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import card from "@/views/about/TeamCard"
export default {
  props: {
  },
  components: {
    card
  },
  data: () => ({
    leaders: [
    { 
      name: "Mathias Wilhelm", role: "Team leader, Professor", avatar: "mathias.jpg", text: "",
      social: [
      {
        social: "website",
        link: "https://www.proteomics.wzw.tum.de/people/mathias-wilhelm/",
        icon: "fas fa-external-link-alt"
      },
      {
        social: "LinkedIn",
        link: "https://www.linkedin.com/in/mathias-wilhelm-9567b7181/",
        icon: "fab fa-linkedin"
      }
      ], focus: "Coordination" 
    }
    ],
    coreTeamMembers: [
    { 
      name: "Ludwig Lautenbacher", role: "Full stack developer, Bioinformatician", avatar: "", text: "",
      social: [
      {
        social: "website",
        link: "https://www.proteomics.wzw.tum.de/people/ludwig-lautenbacher/",
        icon: "fas fa-external-link-alt"
      },
      {
        social: "GitHub",
        link: "https://github.com/LLautenbacher",
        icon: "fab fa-github-square"
      },
      {
        social: "LinkedIn",
        link: "https://www.linkedin.com/in/ludwig-lautenbacher-b3414019b/",
        icon: "fab fa-linkedin"
      }
      ], focus: "Feature development, data integration" 
    }
    ],
    coreTeamEmeriti: [
    { 
      name: "Patroklos Samaras", role: "Full stack developer, Bioinformatician", avatar: "psamaras.jpg", text: "",
      social: [
      {
        social: "website",
        link: "https://www.proteomics.wzw.tum.de/people/patroklos-samaras/",
        icon: "fas fa-external-link-alt"
      },
      {
        social: "GitHub",
        link: "https://github.com/patroklossam",
        icon: "fab fa-github-square"
      },
      {
        social: "LinkedIn",
        link: "https://www.linkedin.com/in/patroklos-samaras-846ab63a/",
        icon: "fab fa-linkedin"
      }
      ], focus: "Feature development, data integration" 
    },
    { 
      name: "Tobias Schmidt", role: "Frontend and backend developer, Bioinformatician", avatar: "tkschmidt.jpg", text: "",
      social: [
      {
        social: "website",
        link: "https://tkschmidt.me/",
        icon: "fas fa-external-link-alt"
      },
      {
        social: "GitHub",
        link: "https://github.com/tkschmidt",
        icon: "fab fa-github-square"
      },
      {
        social: "LinkedIn",
        link: "https://www.linkedin.com/in/tkschmidt/",
        icon: "fab fa-linkedin"
      }
      ], focus: "Feature development, Peptide features predictions" 
    },
    { 
      name: "Siegfied Gessulat", role: "Frontend developer, Software developer", avatar: "sgessulat.jpg", text: "",
      social: [
      {
        social: "website",
        link: "https://tkschmidt.me/",
        icon: "fas fa-external-link-alt"
      },
      {
        social: "LinkedIn",
        link: "https://www.linkedin.com/in/siegfried-gessulat/",
        icon: "fab fa-linkedin"
      }
      ], focus: "Feature development, Peptide features prediction" 
    }
    ],
    formerTeamMembers: [
    { name: "Stephan Aiche", role: "bioinformatician, software development", avatar: "", text: "", website: "" }
    ],

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
