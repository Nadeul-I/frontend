<template>
  <header class="header-container">
    <nav class="header-nav">
      <router-link to="/">나들이</router-link>
      <div>
        <ul class="header-inner">
          <li><a href="">공지사항</a></li>
          <router-link :to="{name: 'RegionSearch'}">여행지 검색</router-link>
          <router-link to="maptest">여행 계획</router-link>
          <!-- <li><a href="${root }/board/list?pgno=1&search=&word=">여행 후기</a></li> -->
          <router-link :to="{ name: 'Board' }">자유 게시판</router-link>
        </ul>
      </div>
      <div>
        <ul class="header-inner" v-if="!token">
          <li><router-link :to="{ name: 'SignIn' }">로그인</router-link></li>
          <li><router-link :to="{ name: 'SignUp' }">회원가입</router-link></li>
        </ul>
        <ul class="header-inner" v-else>
          <li><router-link to="mypage">마이페이지</router-link></li>
          <li><router-link to="logout">로그아웃</router-link></li>
        </ul>
      </div>

      <!--
    <input type="checkbox" id="nav-menu" />
    <label class="hamburger" for="nav-menu">
      <span></span>
      <span></span>
      <span></span>
    </label>
    --></nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      token: false,
    };
  },
};

window.onscroll = function () {
  navScroll();
};

function navScroll() {
  let headerContainerElement =
    document.getElementsByClassName("header-container")[0];
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    headerContainerElement.style.borderBottom =
      "0.1px solid rgba(0, 0, 0, 0.3)";
    headerContainerElement.style.backgroundColor = "rgb(0, 0, 0)";
  } else {
    headerContainerElement.style.borderBottom =
      "0.1px solid rgba(255, 255, 255, 0.3)";
    headerContainerElement.style.backgroundColor = "transparent";
  }
}
</script>

<style>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 0.1px solid rgba(255, 255, 255, 0.3);
  font-size: 1.5rem;
  transition: 0.4s;
  z-index: 1;
  height:90px;
}

.header-container a {
  color: rgb(255, 255, 255);
  transition: 0.4s;
}

.header-nav {
  max-width: 1280px;
  margin: 2rem auto 2rem auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-inner {
  display: flex;
  gap: 2rem;
}

.header-container:hover {
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.3) !important;
  background-color: black !important;
}

.header-container a:hover {
  color: rgb(153, 0, 255);
  transition: 0.4s;
}
</style>