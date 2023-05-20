<template>
    <main class="board-write-main">
        <div class="board-write-container">
            <div class="board-write-header">
            <div>
                <h2>자유 게시판</h2>
            </div>
            <button class="board-write-list-btn btn btn-list">≡목록가기</button>
            </div>

            <form @submit.prevent="write()">
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
                <button type="submit" class="btn">확인</button>
                </span>
                <span>
                <button type="button" class="board-write-cancle-btn btn">취소</button>
                </span>
            </div>
            </form>
        </div>
    </main>
</template>

<script>
import { boardWrite } from '@/api/board'
export default {
    data(){
        return{
            boardId: "",
            boardTitle: "",
            boardContent: "",
        }
    },
    methods:{
        write(){
            let boardInfo = {
                boardId: 'ssafy',
                boardTitle: this.boardTitle,
                boardContent : this.boardContent,
            }
            boardWrite(boardInfo, () => this.$router.replace(`/board`), () => console.log('write 실패'));
        }
    }
}
</script>

<style>
.board-write-main{
    position:absolute;
    top : 55%;
    left : 48%;
    transform : translate(-50%, -50%);
    width:80%;
    background: white;
    border-radius : 10px;
}
.board-write-container {
  width: 1200px;
  margin: auto;
}

.board-write-header {
  margin: auto;
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

.board-write-check-container{
    text-align: center;
    margin: 2rem 0;
}
</style>