import { defineStore } from "pinia"
import orgs from "@/static/orgs.json";
import members from "@/static/members.json";

const useData = defineStore({
  id: 'tableAlert',
  state: () => ({
    orgs,
    members
  }),
  persist: {
    enabled: true,
    strategies: [
      {
          key: 'orgsAndMember',
          paths: ['orgs', 'members'],
      }
    ]
},
})

export default useData
