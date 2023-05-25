const planStore = {
  namespaced: true,
  state: {
    planNo: 0,
    pgno: 1,
  },
  getters: {
    getPlanNo: function(state){
        return state.planNo;
    },
    getPgno: function(state){
      return state.pgno;
    }
  },
  mutations:{
    SET_PLANNO: (state, planNo) =>{
        state.planNo = planNo;
    },
  },
  actions:{
    
  }
};

export default planStore;