<template>
<div class="searcharea">
    <div>검색</div>
    <the-map :mapData="mapData" ></the-map>
    <div>작업중입니다.</div>
</div>
</template>

<script>
import axios from '@/util.js'
import TheMap from '@/components/region/TheMap.vue';
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
            gugunData: [],
            mapData:[],
        }
    },
    methods:{
        changeSido(){
            axios.get(`/region/search/${this.sidoCode}`)
            .then(({data})=>{
                this.gugunData.length=0;
                data.map((item)=>{
                    this.gugunData.push(item);
                })
            });
        },
        regionSearch(){
            let keyword = this.keyword == "" ? "0" : this.keyword;
            axios.get(`/region/search/${this.sidoCode}/${this.gugunCode}/${this.category}/${keyword}/`)
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