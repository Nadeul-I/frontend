const planStore = {
  namespaced: true,
  state: {
    planNo: 0,
  },
  getters: {
    getPlanNo: function(state){
        return state.planNo;
    },
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