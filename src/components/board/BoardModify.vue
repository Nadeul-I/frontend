<template>
  <main class="board-modify-main">
    <div class="board-modify-container">
      <div class="board-modify-header">
        <div>
          <h2>자유 게시판</h2>
        </div>
        <button class="board-modify-list-btn btn btn-list" @click="listBoard()">≡목록가기</button>
      </div>

      <form>
        <input type="hidden" name="boardNo" value="${board.boardNo}" />
        <input type="hidden" name="pgno" value="${pgno}" />
        <input type="hidden" name="search" value="${search}" />
        <input type="hidden" name="word" value="${word}" />
        <div>
          <input
            name="boardTitle"
            class="board-modify-title"
            type="text"
            placeholder="제목을 입력해주세요."
            v-model="boardTitle"
          />
        </div>
        <div>
          <input
            name="boardContent"
            class="board-modify-content"
            type="text"
            placeholder="내용을 입력하세요"
            v-model="boardContent"
          />
        </div>

        <div class="board-modify-check-container">
          <span>
            <button type="submit" class="btn" @click="modifyArticle()">
              수정
            </button>
          </span>
          <span>
            <button type="button" class="board-modify-cancle-btn btn" @click="viewBoard()">
              취소
            </button>
          </span>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { boardView, boardModify } from "@/api/board";
export default {
  data() {
    return {
      boardNo: this.$route.params.boardNo,
      board: Object,
      boardTitle: "",
      boardContent: "",
    };
  },
  created() {
    boardView(
      this.boardNo,
      ({ data }) => {
        (this.board = data),
          (this.boardTitle = this.board.boardTitle),
          (this.boardContent = this.board.boardContent);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    listBoard() {
      this.$router.replace({ name: "BoardList" });
    },
    viewBoard(){
      this.$router.replace({ name: "BoardView", params: { boardNo: this.boardNo } });
    },
    modifyArticle() {
      let boardInfo = {
        boardNo: this.boardNo,
        boardTitle: this.boardTitle,
        boardContent: this.boardContent,
      };
      boardModify(
        boardInfo, 
        () =>{
          console.log(this.boardNo);
        },
        () => {
        console.log("수정 실패");
      });
      this.$router.replace({ name: "BoardView", params: { boardNo: this.boardNo } });
    },
  },
};
</script>

<style>
.board-modify-main {
  margin: auto;
  width: 100%;
  background: white;
}
.board-modify-container {
  width: 1200px;
  margin: auto;
}

.board-modify-header {
  margin: auto auto 2rem auto;
  padding: 1rem;
  border-bottom: 3px solid #000;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.board-modify-list-btn {
  height: 50px;
}

.board-modify-title {
  width: 100%;
  height: 70px;
  margin: 1rem 0;
}

.board-modify-content {
  width: 100%;
  height: 500px;
  margin: 1rem 0;
  border-top: 5px solid #000;
}

.board-modify-check-container {
  text-align: center;
  margin: 2rem 0;
}
</style>
