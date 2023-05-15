<template>
  <header class="header-container">
  <nav class="header-nav">
    <router-link to="/">나들이</router-link>
    <div>
      <ul class="header-inner">
        <li><a href="">공지사항</a></li>
        <router-link to="region">여행 계획</router-link>
        <li><a href="${root }/board/list?pgno=1&search=&word=">여행 후기</a></li>
        <li><a href="${root }/board/list?pgno=1&search=&word=">자유 게시판</a></li>
      </ul>
    </div>
    <div>
      <ul class="header-inner">
        <router-link to="signin">로그인</router-link>
        <router-link to="signup">회원가입</router-link>
        <li><a href="${root}/user/mypage"> 마이페이지</a></li>
        <li><a href="${root}/auth/logout"> 로그아웃</a></li>
      </ul>
    </div>

    <input type="checkbox" id="nav-menu" />
    <label class="hamburger" for="nav-menu">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </nav>
</header>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style>
@font-face {
    font-family: 'S-CoreDream-3Light';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

body{
    margin: 0;
    font-family: 'S-CoreDream-3Light', sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
}

a{
    text-decoration: none;
    color: black;
}

ol, ul{
    list-style: none;
}

.lump{
    height: 150px;
}

.btn{
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

.btn:hover {
	background-color:#bddaff;
}
.btn:active {
	position:relative;
	top:1px;
}
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 0.1px solid rgb(0, 0, 0);
  transition: 0.4s;
  z-index: 1;
}

.header-container a {
  color: rgb(0, 0, 0);
  transition: 0.4s;
}

.header-nav {
  max-width: 1280px;
  margin: 1rem auto 1rem auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-inner {
  display: flex;
  gap: 2rem;
}

#nav-menu {
  display: none;
}

.hamburger {
  display: none;
  position: relative;
  width: 3rem;
  height: 2rem;
  cursor:pointer;
}

.hamburger span {
  position: absolute;
  width: 3rem;
  height: 4px;
  border-radius: 30px;
  background-color: rgb(0, 0, 0);
  transition: 0.4s;
}

.hamburger > span:nth-child(1) {
  top: 0;
}

.hamburger > span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger > span:nth-child(3) {
  bottom: 0;
}

#nav-menu:checked + .hamburger span:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

#nav-menu:checked + .hamburger span:nth-child(2) {
  opacity: 0;
}

#nav-menu:checked + .hamburger span:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

@media (max-width: 980px) {
  .header-inner {
    display: none;
  }

  .hamburger {
    display: block;
  }
}

</style>