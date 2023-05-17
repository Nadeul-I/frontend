<template>
    <main class="board-list-main">
        <div class="board-list-container">
            <div class="board-list-header">
            <div>
                <h2>자유 게시판</h2>
            </div>

            <form class="board-list-form">
                <input type="hidden" name="pgno" value="${pgno}" />
                <select name="search" id="board-list-search-select" aria-label="검색조건">
                <option selected>검색조건</option>
                <option value="boardTitle">제목</option>
                <option value="boardId">작성자</option>
                </select>
                <div class="board-list-key-container">
                <input
                    type="text"
                    name="word"
                    id="board-list-word"
                    placeholder="검색어..."
                />
                <button id="board-list-search-btn"  type="submit">
                    <img
                    id="board-list-img"
                    src="@/assets/search.png"
                    alt="search-img load fail"
                    />
                </button>
                </div>
            </form>
            </div>

            <div class="board-list-sort">
            <a href="">최신순</a> <a href="">좋아요순</a>
            </div>

            <div class="board-list-list-container">
            <ul>
                <li>
                <div class="board-list-title">
                    <div>제목</div>
                    <div>이름</div>
                    <div>조회수</div>
                    <div>날짜</div>
                </div>
                </li>
                <li v-for="board in boards" :key="board.boardNo" >
                    <div class="board-list-content">
                        <div>{{board.boardTitle}}</div>
                        <div>{{board.boardId}}</div>
                        <div>{{board.boardHit}}</div>
                        <div>{{board.boardDate}}</div>
                    </div>
                </li>
            </ul>
            </div>

            <div class="board-list-write-container">
            <span>
            <button id="board-list-write-btn" class="btn btn-write"> 글쓰기</button>
            </span>
            </div>

            <div class="navigator">${navigation.navigator}</div>
        </div>
    </main>
</template>

<script>
import axios from '@/util.js'
export default {
    data(){
        return{
            boards: [],
        }
    },
    created(){
        axios.get('/board')
        .then(({data})=>{
            data.boards.map((item) => {this.boards.push(item)});
        })
    },
    methods:{

    }
}
</script>

<style>
.board-list-main{
    position:absolute;
    top : 40%;
    left : 50%;
    transform : translate(-50%, -50%);
    width:80%;
    background: white;
    border-radius : 10px;
}

.board-list-container {
    width: 1200px;
    margin: auto;
}

.board-list-header {
    margin: auto;
    border-bottom: 3px solid #000;
    display: flex;
    justify-content: space-around;
}

.board-list-form {
    display: flex;
    align-items: center;
}

#board-list-search-select {
    box-sizing: content-box;
    border: 1px solid #ddd;
    height: 50px;
}

#board-list-word {
    padding: 0;
    border: 1px solid #ddd;
    height: 50px;
}

.board-list-key-container {
    display: flex;
    align-items: center;
}

#board-list-img {
    width: 42px;
    object-fit: cover;
}

.board-list-sort {
    margin: 2rem;
    font-size: 15px;
}

.board-list-sort a {
    margin-left: 1rem;
    font-size: 15px;
}

.board-list-list-container ul {
  padding: 0;
}

.board-list-title {
  padding: 1rem;
  background: rgba(230, 230, 230, 0.3);
}

.board-list-content{
  cursor:pointer;
  padding: 1rem;
}

.board-list-title div,
.board-list-content div {
  font-size: 1.3rem;
  display: inline-block;
}

.board-list-title div {
  text-align: center;
}

.board-list-title div:nth-child(1), .board-list-content div:nth-child(1) {
  width: 650px;
}

.board-list-title div:nth-child(2), .board-list-content div:nth-child(2) {
  width: 200px;
}

.board-list-title div:nth-child(3), .board-list-content div:nth-child(3) {
  width: 75px;
}

.board-list-title div:nth-child(4), .board-list-content div:nth-child(4) {
  width: 140px;
}

.board-list-write-container{
  text-align: right;
  margin: 2rem 0;
}

.pagination{
  display:flex;
  justify-content: center;
}

.page-link{
	box-shadow:inset 0px 1px 0px 0px #bee2f9;
	background-color:transparent;
	border:1px solid #3866a3;
	display:inline-block;
	cursor:pointer;
	color:#14396a;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #7cacde;
}

.page-link:hover {
	background-color:#bddaff;
}
.page-link:active {
	position:relative;
	top:1px;
}
</style>