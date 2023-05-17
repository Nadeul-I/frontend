<template>
    <main class="board-modify-main">
        <div class="board-modify-container">
            <div class="board-modify-header">
            <div>
                <h2>자유 게시판</h2>
            </div>
            <button class="board-modify-list-btn btn btn-list">≡목록가기</button>
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
                <button type="submit" class="btn" @click="modifyArticle()">수정</button>
                </span>
                <span>
                <button type="button" class="board-modify-cancle-btn btn">
                    취소
                </button>
                </span>
            </div>
            </form>
        </div>
        </main>
</template>

<script>
import axios from '@/util.js';
export default {
    data(){
        return{
            boardNo : this.$route.params.boardNo,
            board : Object,
            boardTitle : "",
            boardContent : "",
        }
    },
    created(){
        axios.get(`/board/${this.boardNo}`)
        .then(({data})=>{
            this.board = data
        })
    },
    methods:{
        modifyArticle(){
            axios.put(`/board/${this.boardNo}`,{
                boardNo : this.boardNo,
                boardTitle : this.boardTitle,
                boardContent : this.boardContent,
            })
            this.$router.push('/board')
        }
    }
}
</script>

<style>
.board-modify-main{
    position:absolute;
    top : 55%;
    left : 50%;
    transform : translate(-50%, -50%);
    width:80%;
    background: white;
    border-radius : 10px;
}
.board-modify-container {
    width: 1200px;
    margin: auto;
  }
  
  .board-modify-header {
    margin: auto;
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
  
  .board-modify-check-container{
      text-align: center;
      margin: 2rem 0;
  }
</style>