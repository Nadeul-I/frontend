<template>
    <main class="board-view-main">
        <div class="board-view-container">
            <div class="board-view-header">
                <div>
                    <h2>자유 게시판</h2>
                </div>
                <button class="board-view-list-btn btn btn-list">≡ 목록가기</button>
            </div>

            <div class="board-view-title">
                <h2>{{ boardInfo.boardTitle }}</h2>
                <div>{{boardInfo.boardDate}}</div>
            </div>

            <div>
                <div class="board-view-content">{{boardInfo.boardContent}}</div>
            </div>
            <div class="board-view-condition-container">
                <span>
                <button type="button" class="btn board-view-modify-btn" @click="modifyArticle()">
                    수정
                </button>
                </span>
                <span>
                <button type="button" class="btn board-view-delete-btn" @click="deleteArticle()">
                    삭제
                </button>
                </span>
            </div>
        </div>
    </main>
</template>

<script>
import axios from '@/util.js'
export default {
    data(){
        return{
            boardNo : this.$route.params.boardNo,
            boardInfo : Object,
        }
    },
    created(){
        axios.get(`/board/${this.boardNo}`)
        .then(({data})=>{
            this.boardInfo = data;
        });
    },
    methods:{
        deleteArticle(){
            axios.delete(`/board/${this.boardNo}`)
            this.$router.push('/board');
        },
        modifyArticle(){
            this.$router.push({name: 'BoardModify', params:{'boardNo': this.boardNo}});
        }
    }
}
</script>

<style>
.board-view-main{
    position:absolute;
    top : 40%;
    left : 50%;
    transform : translate(-50%, -50%);
    width:80%;
    background: white;
    border-radius : 10px;
}
.board-view-container{
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