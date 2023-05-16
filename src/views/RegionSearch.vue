<template>
<div>
  <div class="center">
        <h1>지역별 여행지 검색</h1>
        <form method="GET" action="search">
        <div class="region">
            <select id="sido" @change="changeSido" v-model="sidoCode">
                <option value="0" selected>시도 선택</option>
                <option value="1">서울</option>
                <option value="2">인천</option>
                <option value="3">대전</option>
                <option value="4">대구</option>
                <option value="5">광주</option>
                <option value="6">부산</option>
                <option value="7">울산</option>
                <option value="8">세종</option>
                <option value="31">경기도</option>
                <option value="32">강원도</option>
            </select>
            <select id="gugun" v-model="gugunCode">
                <option value="0">시군구 선택</option>
            </select>
            <select id="category" v-model="category">
                <option value="0" selected>카테고리 선택</option>
                <option value="12">관광지</option>
                <option value="14">문화시설</option>
                <option value="15">축제공연행사</option>
                <option value="25">여행코스</option>
                <option value="28">레포츠</option>
                <option value="32">숙박</option>
                <option value="38">쇼핑</option>
                <option value="39">음식점</option>
            </select>
            <input type="text" v-model="keyword" placeholder="키워드 입력"/>
            <input type="button" @click="regionSearch()" value="검색"/>     
        </div>
        </form>
        <the-map :mapData="mapData" ></the-map>
    </div>
</div>
</template>

<script>
import axios from '@/util.js'
import TheMap from '@/components/TheMap.vue';
export default {
    components:{
        TheMap,
    },
    data(){
        return{
            sidoCode: 0,
            gugunCode: 0,
            category: 0,
            keyword: "",
            mapData:[],
        }
    },
    methods:{
        async changeSido(){
            await axios.get(`region/search/${this.sidoCode}`)
            .then(({data})=>{
                let gugunList = document.getElementById('gugun');
                while(gugunList.firstChild){
                    gugunList.firstChild.remove()
                }
                for(let item of data){
                    let option = document.createElement('option');
                    option.setAttribute('value', item.gugunCode);
                    option.innerText=item.gugunName;
                    gugunList.appendChild(option);
                }
            });
        },
        async regionSearch(){
            let keyword = this.keyword == "" ? "0" : this.keyword;
            console.log(keyword)
            await axios.get(`region/search/${this.sidoCode}/${this.gugunCode}/${this.category}/${keyword}/`)
            .then(({data})=>{
                if(data.length==0){
                    alert('여행지 정보가 없습니다')
                    return;
                }else{
                    let newData = [];
                    data.forEach((item)=>{
                        newData.push(item);
                    })
                    this.mapData = newData;
                }
            });
        }
    }
}

</script>

<style scoped>
@charset "UTF-8";
@font-face {
    font-family: 'S-CoreDream-3Light';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
body{
    margin:0;
    padding:0;
    height: 100vh;
    overflow: hidden;
}
.center{
    position:absolute;
    top : 30%;
    left : 50%;
    transform : translate(-50%, -50%);
    width:80%;
    background: white;
    border-radius : 10px;
}
.center h1{
    text-align:center;
    padding: 20px 0 20px 0;
    border-bottom: 1px solid silver;
}
.center form{
    padding: 0px 10px 40px;
    box-sizing: border-box;
}

select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none; 
}
.region{
    display:flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
}
.region > *{
    margin-right: 10px;
    border-radius: 5px;
}
.region select{
    width:200px;
    height: 30px;
    text-align : center;
}
input{
	padding:6px;
}
input[type="button"]{
    width:10%;
    height:10%;
	border:1px solid gray;
	background-color:white;
}
input[type="text"]{
    padding-left: 20px;
    border : 2px solid gray;
}
</style>