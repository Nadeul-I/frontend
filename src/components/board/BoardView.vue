<template>
    <main class="board-view-main">
        <div class="board-view-container">
            <div class="board-view-header">
                <div>
                    <h2>자유 게시판</h2>
                </div>
                <button class="board-view-list-btn btn btn-list" @click="listArticle()">≡ 목록가기</button>
            </div>

            <div class="board-view-title">
                <h2>{{ boardInfo.boardTitle }}</h2>
                <div>{{boardInfo.boardDate}}</div>
            </div>

            <div>
                <div class="board-view-content">{{boardInfo.boardContent}}</div>
            </div>
            <div class="board-view-condition-container" v-if = "getUserId === boardInfo.boardId">
                <span>
                <button type="button" class="btn board-view-modify-btn" @click="modifyBoard()">
                    수정
                </button>
                </span>
                <span>
                <button type="button" class="btn board-view-delete-btn" @click="deleteBoard()">
                    삭제
                </button>
                </span>
            </div>
        </div>
    </main>
</template>

<script>
import { boardView, boardDelete } from '@/api/board';
import { mapGetters } from 'vuex';

const userStore = "userStore";

export default {
    data(){
        return{
            boardNo : this.$route.params.boardNo,
            boardInfo : Object,
        }
    },
    created(){
        boardView(this.boardNo, ({data}) => {this.boardInfo = data}, (error) => {console.log(error)})
    },
    computed:{
        ...mapGetters(userStore, ["getUserId"]),
    },
    methods:{
        listBoard(){
            
        },
        deleteBoard(){
            boardDelete(this.boardNo, () => this.$router.replace('/board'), (error) => {console.log(error)})
        },
        modifyBoard(){
            this.$router.replace({ name: 'BoardModify', params : {boardNo : this.boardNo}});
        },
    }
}
</script>

<style>
.board-view-main{
    margin: auto;
    width:100%;
    background: white;
}
.board-view-container {
  width: 1200px;
  margin: auto;
}

.board-view-header{
    margin:auto;
    border-bottom: 3px solid #000;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.board-view-list-btn{
    height: 50px;
}

.board-view-title{
    border-bottom: 1px solid #adadad;
}

.board-view-title h2{
    margin-bottom: 10px;
}

.board-view-title div{
    font-size: 18px;
    margin-bottom: 10px;
}

.board-view-content{
    margin: 1rem;
}

.board-view-condition-container{
    text-align: center;
    margin: 4rem 0;
}
</style>