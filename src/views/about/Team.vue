<template>
  <v-card>
    <v-toolbar
      :color="$store.state.selectedOrganismShown.primaryColor"
      class="white--text"
    >
      <v-card-title> Meet the team! </v-card-title>
    </v-toolbar>
    <v-card-text>
      <v-list dense max-width="800">
        <div class="mb-5">
          We are scientists and software developers from the Chair of Proteomics
          and Bioanalytics at the Technische Universität München (TUM) and
          Cellzome GmbH, a GSK company. We are continuously improving and adding
          functionality of ProteomicsDB to enable exploration and analysis of
          human proteome data.
        </div>
        <v-card-title>Team Leader</v-card-title>
        <v-list-item v-for="person in leaders" :key="person.name">
          <v-col class="pa-0">
            <v-divider></v-divider>
            <card
              :name="person.name"
              :role="person.role"
              :focus="person.focus"
              :avatar="person.avatar"
              :social="person.social"
              :affiliation="person.affiliation"
              :position="person.position"
            ></card>
          </v-col>
        </v-list-item>
        <v-card-title>Core Team</v-card-title>
        <v-list-item v-for="person in coreTeamMembers" :key="person.name">
          <v-col class="pa-0">
            <v-divider></v-divider>
            <card
              :name="person.name"
              :role="person.role"
              :focus="person.focus"
              :avatar="person.avatar"
              :social="person.social"
              :affiliation="person.affiliation"
              :position="person.position"
            ></card>
          </v-col>
        </v-list-item>
        <v-card-title>Core Team Emeriti</v-card-title>
        <v-list-item v-for="person in coreTeamEmeriti" :key="person.name">
          <v-col class="pa-0">
            <v-divider></v-divider>
            <card
              :name="person.name"
              :role="person.role"
              :focus="person.focus"
              :avatar="person.avatar"
              :social="person.social"
            ></card>
          </v-col>
        </v-list-item>
        <v-card-title>Alumni</v-card-title>
        <v-list-item v-for="person in formerTeamMembers" :key="person.name">
          {{ person.name }} &#8212; {{ person.role }}
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import card from "@/views/about/TeamCard";
export default {
  props: {},
  components: {
    card,
  },
  data: () => ({
    leaders: [
      {
        name: "Mathias Wilhelm",
        role: "Team leader",
        avatar: "mathias.jpg",
        text: "",
        affiliation: "Professorship of Computational Mass Spectrometry",
        position: "Professor",
        social: [
          {
            social: "Website",
            link: "https://www1.ls.tum.de/en/compms/group-members/people/mathias-wilhelm/",
            icon: "fas fa-external-link-alt",
          },
          {
            social: "LinkedIn",
            link: "https://www.linkedin.com/in/mathias-wilhelm-9567b7181/",
            icon: "fab fa-linkedin",
          },
        ],
        focus: "Coordination",
      },
    ],
    coreTeamMembers: [
      {
        name: "Ludwig Lautenbacher",
        role: "Full stack developer, Bioinformatician",
        avatar: "",
        text: "",
        affiliation: "Professorship of Computational Mass Spectrometry",
        position: "PhD Student",
        social: [
          {
            social: "Website",
            link: "https://www1.ls.tum.de/en/compms/group-members/people/ludwig-lautenbacher/",
            icon: "fas fa-external-link-alt",
          },
          {
            social: "GitHub",
            link: "https://github.com/LLautenbacher",
            icon: "fab fa-github-square",
          },
          {
            social: "LinkedIn",
            link: "https://www.linkedin.com/in/ludwig-lautenbacher-b3414019b/",
            icon: "fab fa-linkedin",
          },
        ],
        focus: "Feature development, data integration",
      },

      {
        name: "Wassim Gabriel",
        role: "Full stack developer, Bioinformatician",
        avatar: "wgabriel.jpg",
        affiliation: "Professorship of Computational Mass Spectrometry",
        position: "PhD Student",
        text: "",
        social: [
          {
            social: "Website",
            link: "https://www1.ls.tum.de/en/compms/people/people/wassim-gabriel/",
            icon: "fas fa-external-link-alt",
          },
          {
            social: "LinkedIn",
            link: "https://www.linkedin.com/in/wassim-gabriel-93b91737/",
            icon: "fab fa-linkedin",
          },
        ],
        focus: "Feature development, data integration",
      },

      {
        name: "Matthew The",
        role: "Full stack developer, Bioinformatician",
        avatar: "mthe.jpg",
        text: "",
        affiliation: "Chair of Proteomics and Bioanalytics",
        position: "Postdoc",
        social: [
          {
            social: "Website",
            link: "https://www1.ls.tum.de/proteomics/people/dr-matthew-the/",
            icon: "fas fa-external-link-alt",
          },
          {
            social: "GitHub",
            link: "https://github.com/MatthewThe",
            icon: "fab fa-github-square",
          },
          {
            social: "LinkedIn",
            link: "https://www.linkedin.com/in/matthewthe",
            icon: "fab fa-linkedin",
          },
        ],
        focus: "Feature development, data integration",
      },

      {
        name: "Julian Müller",
        role: "Full stack developer, Bioinformatician",
        avatar: "jmueller.jpg",
        text: "",
        affiliation: "Chair of Proteomics and Bioanalytics",
        position: "PhD Student",
        social: [
          {
            social: "Website",
            link: "https://www1.ls.tum.de/proteomics/people/julian-mueller/",
            icon: "fas fa-external-link-alt",
          },
          {
            social: "GitHub",
            link: "https://github.com/jmueller95/",
            icon: "fab fa-github-square",
          },
          {
            social: "LinkedIn",
            link: "https://www.linkedin.com/in/julian-m%C3%BCller-4a056a20a/",
            icon: "fab fa-linkedin",
          },
        ],
        focus: "Feature development, data integration",
      },

      {
        name: "Cecilia Jensen",
        role: "Full stack developer, Bioinformatician",
        avatar: "cjensen.jpg",
        affiliation: "Chair of Proteomics and Bioanalytics",
        position: "PhD Student",
        text: "",
        social: [
          {
            social: "Website",
            link: "https://www1.ls.tum.de/proteomics/people/cecilia-jensen/",
            icon: "fas fa-external-link-alt",
          },
          {
            social: "LinkedIn",
            link: "https://www.linkedin.com/in/cecilia-bang-jensen-b81846ba/",
            icon: "fab fa-linkedin",
          },
        ],
        focus: "Feature development, data integration",
      },

      {
        name: "Mario Picciani",
        role: "Full stack developer, Bioinformatician",
        avatar: "",
        affiliation: "Professorship of Computational Mass Spectrometry",
        position: "PhD Student",
        text: "",
        social: [
          {
            social: "GitHub",
            link: "https://github.com/picciama",
            icon: "fab fa-github-square",
          },
          {
            social: "LinkedIn",
            link: "https://www.linkedin.com/in/mario-picciani-ab9288207/",
            icon: "fab fa-linkedin",
          },
        ],
        focus: "Feature development, data integration",
      },
    ],
    coreTeamEmeriti: [
      {
        name: "Patroklos Samaras",
        role: "Full stack developer, Bioinformatician",
        avatar: "psamaras.jpg",
        text: "",
        social: [
          {
            social: "Website",
            link: "https://www.proteomics.wzw.tum.de/people/patroklos-samaras/",
            icon: "fas fa-external-link-alt",
          },
          {
            social: "GitHub",
            link: "https://github.com/patroklossam",
            icon: "fab fa-github-square",
          },
          {
            social: "LinkedIn",
            link: "https://www.linkedin.com/in/patroklos-samaras-846ab63a/",
            icon: "fab fa-linkedin",
          },
        ],
        focus: "Feature development, data integration",
      },
      {
        name: "Tobias Schmidt",
        role: "Frontend and backend developer, Bioinformatician",
        avatar: "tkschmidt.jpg",
        text: "",
        social: [
          {
            social: "Website",
            link: "https://tkschmidt.me/",
            icon: "fas fa-external-link-alt",
          },
          {
            social: "GitHub",
            link: "https://github.com/tkschmidt",
            icon: "fab fa-github-square",
          },
          {
            social: "LinkedIn",
            link: "https://www.linkedin.com/in/tkschmidt/",
            icon: "fab fa-linkedin",
          },
        ],
        focus: "Feature development, Peptide features predictions",
      },
      {
        name: "Siegfied Gessulat",
        role: "Frontend developer, Software developer",
        avatar: "sgessulat.jpg",
        text: "",
        social: [
          {
            social: "Website",
            link: "https://tkschmidt.me/",
            icon: "fas fa-external-link-alt",
          },
          {
            social: "LinkedIn",
            link: "https://www.linkedin.com/in/siegfried-gessulat/",
            icon: "fab fa-linkedin",
          },
        ],
        focus: "Feature development, Peptide features prediction",
      },
    ],
    formerTeamMembers: [
      {
        name: "Adelya Fatykhova (SAP - ICP)",
        role: "continuous integration, testing",
      },
      {
        name: "Anja Gerstmair (SAP)",
        role: "software developer, project coordination",
      },
      {
        name: "David Weese (SAP - ICP)",
        role: "software development",
      },
      {
        name: "Emanuel Ziegler (SAP)",
        role: "software developer, backend development",
      },
      {
        name: "Hannes Hahne (TUM)",
        role: "scientist, UI and data analysis concepts, UI prototyping, proteomics data",
      },
      {
        name: "Hans-Christian Ehrlich (SAP - ICP)",
        role: "bioinformatician, software development",
      },
      {
        name: "Helmut Cossmann (SAP)",
        role: "dba, infrastructure setup",
      },
      {
        name: "Ingrid Hurbain (SAP - ICP)",
        role: "software developer, ui development",
      },
      {
        name: "Jan Huenges (SAP - ICP)",
        role: "software developer, ui development",
      },
      {
        name: "Judith Schlegl (SAP)",
        role: "scientist, dba and project coordination",
      },
      {
        name: "Lars Butzmann (SAP - ICP)",
        role: "software developer, ui development",
      },
      {
        name: "Lars Rueckert (SAP - ICP)",
        role: "software developer, ui development",
      },
      {
        name: "Martin Frejno (TUM / SAP)",
        role: "bioinformatician, software development, data analysis",
      },
      {
        name: "Marcus Bantscheff (GSK)",
        role: "scientist, concepts",
      },
      {
        name: "Marcus Lieberenz (SAP)",
        role: "software developer, ui development",
      },
      {
        name: "Mikhail Savitski (GSK)",
        role: "scientist, data analysis",
      },
      {
        name: "Mohammed AbuJarour (SAP - ICP)",
        role: "software development",
      },
      {
        name: "Stephan Aiche (SAP - ICP)",
        role: "bioinformatician, software development",
        avatar: "",
        text: "",
        Website: "",
      },
      {
        name: "Toby Mathieson (GSK)",
        role: "bioinformatician, data collation",
      },
      {
        name: "Wilhelm Becker (SAP - ICP)",
        role: "software developer, ui development",
      },
    ],
  }),
  methods: {
    openLink: function (url) {
      window.open(url, "_blank");
    },
  },
  computed: {},
  watch: {},
  mounted() {},
};
</script>
<style lang="scss">
</style>
