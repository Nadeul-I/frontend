<template>
  <div>
    <div class="lump" />
    <div class="search">
      <div class="search-info" v-if="!searchToggleBtn">
        <div class="region">
          <form method="GET" action="search">
            <select id="sido" v-model="sidoCode" @change="changeGugun">
              <option :value="0" selected>시도 선택</option>
              <option
                v-for="sido in sidoData"
                :key="sido.sidoCode"
                :value="sido.sidoCode"
              >
                {{ sido.sidoName }}
              </option>
            </select>
            <select id="gugun" v-model="gugunCode">
              <option :value="0" selected>구군 선택</option>
              <option
                v-for="gugun in gugunData"
                :key="gugun.gugunCode"
                :value="gugun.gugunCode"
              >
                {{ gugun.gugunName }}
              </option>
            </select>
            <div id="search-form">
              <font-awesome-icon
                :icon="['fas', 'magnifying-glass']"
                style="color: #5c98ff"
                @click="search()"
                class="search-icon"
              />
              <input
                type="text"
                id="search-btn"
                v-model="keyword"
                placeholder="키워드 입력"
              />
            </div>
          </form>
        </div>
        <div class="notice">공지사항</div>
        <hot-place @selectedData="getMapInfo" v-if="!afterSearch"></hot-place>
        <search-result
          @selectedData="getMapInfo"
          :mapData="mapData"
          v-else
        ></search-result>
      </div>
      <div class="open-info">
        <div class="bar" />
        <span>
          <font-awesome-icon
            :icon="['fas', 'caret-right']"
            style="color: #427bff"
            v-if="searchToggleBtn"
            @click="searchToggle()"
            class="toggle-btn"
          />
          <font-awesome-icon
            :icon="['fas', 'caret-left']"
            style="color: #427bff"
            v-else
            @click="searchToggle()"
            class="toggle-btn"
          />
        </span>
      </div>
      <div>
        <div class="detail-option" v-if="!searchToggleBtn">
          <div
            v-for="cat in catList"
            :key="cat.catNum"
            @click="catChange(cat.catNum)"
            :tabindex="cat.catNum"
          >
            <font-awesome-icon
              v-if="cat.catNum != 0"
              :icon="['fas', cat.icon]"
              :style="{ color: `${cat.style}` }"
            />
            <label>{{ cat.name }}</label>
          </div>
        </div>
      </div>
      <the-map :mapData="mapData"></the-map>
    </div>
  </div>
</template>

<script>
import TheMap from "@/components/region/TheMap.vue";
import HotPlace from "@/components/region/HotPlace.vue";
import { sidoList, gugunList, regionSearch } from "@/api/region";
import SearchResult from "@/components/region/SearchResult";

export default {
  components: {
    TheMap,
    HotPlace,
    SearchResult,
  },
  data() {
    return {
      sidoCode: 0,
      gugunCode: 0,
      category: 0,
      keyword: "",
      sidoData: [],
      gugunData: [],
      mapData: [],
      searchToggleBtn: true,
      afterSearch: false,
      catList: [
        { catNum: 0, icon: "", style: "", name: "미선택" },
        { catNum: 12, icon: "plane", style: "#4d9aff", name: "관광지" },
        { catNum: 14, icon: "landmark", style: "#90f4c5", name: "문화시설" },
        {
          catNum: 15,
          icon: "clapperboard",
          style: "#fda43f",
          name: "공연행사",
        },
        {
          catNum: 25,
          icon: "person-hiking",
          style: "#9494ff",
          name: "여행코스",
        },
        { catNum: 28, icon: "baseball", style: "#ff7b00", name: "레포츠" },
        { catNum: 32, icon: "hotel", style: "#d84dff", name: "숙박" },
        { catNum: 38, icon: "cart-shopping", style: "#ff4f42", name: "쇼핑" },
        { catNum: 39, icon: "utensils", style: "#33f1ff", name: "음식점" },
      ],
    };
  },
  created() {
    if (this.$route.params.sidoCode) {
      (this.sidoCode = this.$route.params.sidoCode), this.changeGugun();
      (this.gugunCode = this.$route.params.gugunCode),
        (this.category = this.$route.params.category),
        (this.keyword = this.$route.params.keyword),
        (this.mapData = [
          {
            sidoCode: this.sidoCode,
            gugunCode: this.gugunCode,
            category: this.category,
            keyword: this.keyword,
          },
        ]);
      this.search();
    }
    // sido list load
    sidoList(
      ({ data }) => {
        data.map((item) => {
          this.sidoData.push(item);
        });
      },
      () => {
        console.log("sido 로드 실패");
      }
    );
  },
  methods: {
    changeGugun() {
      gugunList(
        this.sidoCode,
        ({ data }) => {
          this.gugunData.length = 0;
          data.map((item) => {
            this.gugunData.push(item);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    search() {
      this.afterSearch = true;
      let sidoInfo = {
        sidoCode: this.sidoCode,
        gugunCode: this.gugunCode,
        category: this.category,
        keyword: this.keyword == "" ? "0" : this.keyword,
      };
      regionSearch(sidoInfo, ({ data }) => {
        if (data.length == 0) {
          alert("여행지 정보가 없습니다");
          return;
        } else {
          let newData = [];
          data.map((item) => {
            newData.push(item);
          });
          this.mapData = newData;
        }
      });
    },
    searchToggle() {
      this.searchToggleBtn = !this.searchToggleBtn;
    },
    catChange(catNum) {
      this.category = catNum;
    },
    getMapInfo(mapInfo) {
      // map 에 그리기.
      this.sidoCode = mapInfo.sidoCode;
      this.changeGugun();
      this.gugunCode = mapInfo.gugunCode;
      this.category = mapInfo.category;
      this.keyword = mapInfo.keyword;
      this.search();
      // search option 변경
    },
  },
};
</script>

<style scoped>
@charset "UTF-8";
@font-face {
  font-family: "S-CoreDream-3Light";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
.lump {
  height: 89px;
  background-color: rgba(111, 173, 207, 0.7)
}
.search {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: calc(100vh - 90px);
  overflow: hidden;
}
.search-info {
  padding: 20px;
  z-index: 1;
  height: calc(100vh - 89px);
  width: 20%;
  min-width: 290px;
}
.search-info form {
  display: flex;
  flex-direction: column;
}
#search-container-btn img {
  width: 100px;
  height: 100px;
}
.region {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0;
}
.region > * {
  margin-right: 10px;
  border-radius: 5px;
}

.region select {
  -webkit-appearance: none; /* 크롬 화살표 없애기 */
  -moz-appearance: none; /* 파이어폭스 화살표 없애기 */
  appearance: none; /* 화살표 없애기 */
  width: 100%;
  height: 40px;
  text-align: center;
  border: 1px solid #5c98ff;
  border-radius: 5px;
  margin-bottom: 5px;
}

.region #search-btn {
  border-radius: 10px;
}
.open-info {
  z-index: 20;
  width: 0;
  border-collapse: collapse;
}
.bar {
  font-size: 16px;
  height: 45%;
}
.toggle-btn {
  background-color: white;
  width: 10px;
  height: 20px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

input {
  padding: 6px;
}
input[type="button"] {
  width: 100%;
  height: 100%;
  border: 1px solid gray;
  background-color: white;
}
input[type="text"] {
  padding-left: 20px;
  border: 2px solid gray;
}

#search-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  border: 3px solid #5c98ff;
  border-radius: 5px;
  padding: 5px 12px;
}
#search-form input {
  border: 0;
}
#search-form input:focus,
.region select:focus {
  outline: none;
}
.notice {
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.detail-option {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  min-width: 850px;
  background-color: white;
  left: 380px;
  padding: 10px;
  top: 100px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  z-index: 2;
}
.detail-option div {
  padding: 10px 5px;
  width: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.detail-option div:focus {
  border: 1px solid #5c98ff;
}
.detail-option div img {
  width: 20px;
  height: 20px;
}
.detail-option * {
  cursor: pointer;
  margin-right: 2px;
}
.search-icon {
  cursor: pointer;
}
hot-place {
  overflow: scroll;
}
</style>
