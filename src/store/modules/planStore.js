const planStore = {
  namespaced: true,
  state: {
    planNo: 0,
    pgno: 1,
    Plan:{
      planTitle: "",
      planStart: 0,
      planEnd: 0,
      planImg: "",
      planId: "",
    }, 
  },
  getters: {
    getPlanNo: function(state){
        return state.planNo;
    },
    getPgno: function(state){
      return state.pgno;
    },
    getPlan: function(state){
      return state.Plan;
    }
  },
  mutations:{
    SET_PLANNO: (state, planNo) =>{
        state.planNo = planNo;
    },
    SET_PGNO: (state, pgno) =>{
      state.pgno = pgno;
    },
    SET_PLAN: (state, plan) =>{
      state.Plan.planTitle = plan.planTitle;
      state.Plan.planStart = plan.planStart;
      state.Plan.planEnd = plan.planEnd;
      state.Plan.planImg = plan.planImg;
      state.Plan.planId = plan.planId;
      console.log(state);
    },
  },
  actions:{
    
  }
};

export default planStore;