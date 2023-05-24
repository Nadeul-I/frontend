<template>
  <main class="plan-list-main">
    <div class="plan-list-container">
      <div class="plan-list-header">
        <div>
          <h2>여행 계획</h2>
        </div>
        <button class="plan-list-write-btn btn btn-list">글 작성</button>
      </div>

      <div class="plan-list-list-container">
        <ul>
          <li v-for="(plan, index) in plans" :key="index">
            <div>

            </div>
        </li>
        </ul>
      </div>

      <div class="plan-list-write-container">
        <span>
          <button
            id="plan-list-write-btn"
            class="btn btn-write"
            @click="moveWrite()"
          >
            글쓰기
          </button>
        </span>
      </div>

      <div class="navigator">
        <span>
          <ul class="pagination">
            <li class="page-item">
              <a href="#" class="page-link" @click="onClickPage(1)">최신</a>
            </li>
            <li class="page-item" v-if="navigation.startRange">
              <a href="#" class="page-link" @click="onClickPage(start)">이전</a>
            </li>
            <li class="page-item" v-for="i in indexList" :key="i.index">
              <a
                href="#"
                class="page-link"
                :class="{ select: i.index === navigation.currentPage }"
                @click="onClickPage(i.index)"
                >{{ i.value }}</a
              >
            </li>
            <li class="page-item" v-if="navigation.endRange">
              <a href="#" class="page-link" @click="onClickPage(end)">다음</a>
            </li>
            <li class="page-item">
              <a
                href="#"
                class="page-link"
                @click="onClickPage(navigation.totalPageCount)"
                >마지막</a>
            </li>
          </ul>
        </span>
      </div>
    </div>
  </main>
</template>
  
  <script>
//import { planList } from "@/api/plan";

export default {
  data() {
    return {};
  },
  created() {},

  methods: {},
};
</script>
  
  <style>
.plan-list-main {
  margin: auto;
  width: 100%;
  background: white;
}

.plan-list-container {
  width: 80%;
  min-width: 980px;
  margin: auto;
}

h2 {
  font-size: 2rem;
}

.plan-list-header {
  margin: auto auto 2rem auto;
  padding: 1rem;
  border-bottom: 3px solid #000;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.plan-list-write-btn {
  height: 50px;
}

.plan-list-list-container ul {
  padding: 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.page-link {
  background-color: transparent;
  cursor: pointer;
  color: #7cacde;
  border-bottom: 0px;
  font-family: Arial;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  margin: 5px 10px;
  padding-bottom: 5px;
  text-shadow: 0px 1px 0px #7cacde;
}

.page-link:hover {
  border-bottom: 1px solid #14396a;
  transition: border-bottom 0.5s ease-in;
}
.page-link:active {
  position: relative;
  top: 1px;
}

.select {
  color: #000;
}
</style>