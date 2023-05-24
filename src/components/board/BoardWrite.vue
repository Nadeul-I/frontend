<template>
  <main class="board-write-main">
    <div class="board-write-container">
      <div class="board-write-header">
        <div>
          <h2>자유 게시판</h2>
        </div>
        <button class="board-write-list-btn btn btn-list" @click="listBoard()">
          ≡목록가기
        </button>
      </div>

      <form>
        <div>
          <input
            name="boardTitle"
            class="board-write-title"
            type="text"
            placeholder="제목을 입력해주세요."
            v-model="boardTitle"
          />
        </div>
        <div>
          <input
            name="boardContent"
            class="board-write-content"
            type="text"
            placeholder="내용을 입력하세요"
            v-model="boardContent"
          />
        </div>
        <div class="board-write-check-container">
          <span>
            <button type="button" class="btn" @click.prevent="write()">확인</button>
          </span>
          <span>
            <button
              type="button"
              class="board-write-cancle-btn btn"
              @click.prevent="listBoard()"
            >
              취소
            </button>
          </span>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { boardWrite } from "@/api/board";
import { mapGetters, mapMutations } from "vuex";

const userStore = "userStore";
const boardStore = "boardStore";

export default {
  data() {
    return {
      boardId: "",
      boardTitle: "",
      boardContent: "",
    };
  },
  computed: {
    ...mapGetters(userStore, ["getUserId"]),
  },
  methods: {
    ...mapMutations(boardStore, ["SET_BOARD_INIT"]),
    listBoard() {
      this.$router.replace({ name: "BoardList" });
    },
    async write() {
      let boardInfo = {
        boardId: this.getUserId,
        boardTitle: this.boardTitle,
        boardContent: this.boardContent,
      };
      await boardWrite(
        boardInfo,
        (data) => {
          this.SET_BOARD_INIT();
          console.log(data.data);
          this.$router.push({ name: "BoardView", params: { boardNo: data.data } });
        },
        () => {
          console.log("write 실패");
        }
      );
    },
  },
};
</script>

<style>
.board-write-main {
  margin: auto;
  width: 100%;
  background: white;
}
.board-write-container {
  width: 1200px;
  margin: auto;
}

.board-write-header {
  margin: auto auto 2rem auto;
  padding: 1rem;
  border-bottom: 3px solid #000;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.board-write-list-btn {
  height: 50px;
}

.board-write-title {
  width: 100%;
  height: 70px;
  margin: 1rem 0;
}

.board-write-content {
  width: 100%;
  height: 500px;
  margin: 1rem 0;
  border-top: 5px solid #000;
}

.board-write-check-container {
  text-align: center;
  margin: 2rem 0;
}
</style>