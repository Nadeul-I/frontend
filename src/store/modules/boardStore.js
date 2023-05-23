

const boardStore = {
  namespaced: true,
  state: {
    BoardSearch: {
      search: "",
      word: "",
      pgno: 1,
    },
  },
  getters: {
    getBoardSearch:function(state){
      return state.BoardSearch;
    }
  },
  mutations: {
    SET_BOARD_INIT: (state) => {
      state.BoardSearch.search = "";
      state.BoardSearch.word = "";
      state.BoardSearch.pgno = 1;
      console.log("call board reset");
    },
    SET_BOARD_STATE: (state, boardSearch) => {
      state.BoardSearch.search = boardSearch.search;
      state.BoardSearch.word = boardSearch.word;
      state.BoardSearch.pgno = boardSearch.pgno;
    }
  },
  actions: {

  },
};

export default boardStore;