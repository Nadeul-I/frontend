<template>
<div>
    <div class="lump"/>   
    <div class="search" >
        <div class="search-info" v-if="!searchToggleBtn">
            <div class="region">
                <form method="GET" action="search">
                <select id="sido" v-model="sidoCode" @change="changeGugun" >
                    <option :value="0" selected>시도 선택</option>
                    <option v-for="sido in sidoData" :key="sido.sidoCode" :value="sido.sidoCode">{{sido.sidoName}}</option>
                </select>
                <select id="gugun" v-model="gugunCode">
                    <option :value="0" selected>구군 선택</option>
                    <option v-for="gugun in gugunData" :key="gugun.gugunCode" :value="gugun.gugunCode" >{{gugun.gugunName}}</option>
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
                <input type="text" id="search-btn" v-model="keyword" placeholder="키워드 입력"/>
                <input type="button" @click="search()" value="검색"/>    
                </form> 
            </div>
            <div class="notice">
                
            </div>
        </div>
            <div class="toggle-btn" v-if="searchToggleBtn">
                <input type="button" value=">>" @click="searchToggle()"/>
            </div>
            <div class="toggle-btn" v-else>
                <input type="button" value="<<" @click="searchToggle()"/>
            </div>
            <the-map :mapData="mapData" ></the-map>
    </div>
</div>
</template>

<script>
import TheMap from '@/components/region/TheMap.vue';
import { sidoList, gugunList, regionSearch } from '@/api/region';

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
            sidoData: [],
            gugunData: [],
            mapData:[],
            searchToggleBtn: true,
        }
    },
    created(){
        if(this.$route.query.sidoCode){
            this.sidoCode= this.$route.query.sidoCode,
            this.changeGugun()
            this.gugunCode= this.$route.query.gugunCode,
            this.category= this.$route.query.category,
            this.keyword= this.$route.query.keyword,
            this.mapData=[{
                sidoCode : this.sidoCode,
                gugunCode : this.gugunCode,
                category : this.category,
                keyword : this.keyword,
                }
            ]
            this.search()
        }
        // sido list load
        sidoList(
            ({data})=>{
                data.map((item)=>{
                    this.sidoData.push(item);
                })
            }, 
            () =>{console.log('sido 로드 실패')})

    },
    methods:{
        changeGugun(){
            gugunList(this.sidoCode,
            ({data}) =>{
                this.gugunData.length = 0;
                data.map((item)=>{
                    this.gugunData.push(item);
                })
            },
            (error) => {console.log(error)}
            )
        },
        search(){
            let sidoInfo = {
                sidoCode : this.sidoCode,
                gugunCode : this.gugunCode,
                category : this.category,
                keyword : this.keyword == "" ? "0" : this.keyword
            }
            regionSearch(sidoInfo, 
            ({data}) => {
                if(data.length==0){
                    alert('여행지 정보가 없습니다')
                    return
                }else{
                    let newData = [];
                    data.map((item)=>{
                        newData.push(item);
                    })
                    this.mapData = newData;
                }
            })
        },
        searchToggle(){
            this.searchToggleBtn = !this.searchToggleBtn;
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

.search{
    display: flex;
    flex-direction:row;
    justify-content: center;
    height:calc(100vh - 90px);
}
.search-info{
    padding: 20px;
    z-index:1;
}
.search-info form{
    display:flex;
    flex-direction:column;
}
#search-container-btn img{
    width:100px;
    height:100px;
}
.region{
    display:flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
    border-bottom : 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px 0;
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
.region #search-btn{
    border-radius: 10px;
}
.region .toggle-btn{
    padding: 0;
    margin:0;
}
input{
	padding:6px;
}
input[type="button"]{
    width:100%;
    height:100%;
	border:1px solid gray;
	background-color:white;
}
input[type="text"]{
    padding-left: 20px;
    border : 2px solid gray;
}
.lump{
    height:89px;
    background-color:black;
}
</style>