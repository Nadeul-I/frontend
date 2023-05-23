<template>
<div class="search">
    <!-- 제목, 타입, like, 위치, 연락처, 길찾기 -->
    <div class="search-content" v-for="search in searchList" :key="search.keyword" @click="moveToSearch(search.sidoCode, search.gugunCode, search.contentTypeId, search.title)">
        <div class="search-content-id">
            <div>
                <span id="title">{{search.title}}</span>
                <span id="content-type">{{search.contentTypeId}}</span>
            </div>
            <div class="search-content-address">
                {{search.addr1}}
            </div>
        </div>
        <div class="search-content-desc">
            <div class="search-content-left">
                <div class="search-content-like">
                    <font-awesome-icon :icon="['fas', 'heart']" style="color: #e9010193;" />
                    <span id="search-content-count">{{search.readCount}}</span>
                </div>
                <div class="search-content-tel">
                    {{search.tel==''?'연락처 정보 없음':search.tel}}
                </div>
            </div>
            <div class="search-content-right">
                <div class="search-content-start">
                    <input type="button" value="출발"/>
                </div>
                <div class="search-content-end">
                    <input type="button" value="도착"/>
                </div>
            </div>
        </div>

    </div>
</div>

</template>

<script>
export default {
    name: 'SearchResult',
    props: ['mapData'],
    components:{
    },
    data(){
        return{
            searchList: this.mapData,
            img: '@/assets/noimage.png',
        }
    },
    created(){
        console.log(this.searchList)
    },
    watch:{
        mapData(){
            console.log(this.$props.mapData)
            this.searchList.length=0;
            this.searchList = this.$props.mapData;
        }
    },
    methods:{
        moveToSearch(sidoCode, gugunCode, category, keyword){
            console.log(gugunCode)
            let selectedData = {
                sidoCode,
                gugunCode,
                category,
                keyword,
            };
            console.log(sidoCode)
            console.log(category)
            console.log(keyword)
            console.log("?")
            this.$emit('selectedData', selectedData);
        }
    }
}

</script>

<style scoped>
*{
    text-align:left;
}
img{
    width:100%;
    height:200px;
    image-rendering: -webkit-optimize-contrast;
    transform:translateZ(0);
    backface-visibility:hidden;
    border-radius:5px;
    background-size: cover;
}

h2, h3{
    padding-left: 10px;
}
h2{
    font-size:20px;
}
div{
    margin: 5px 0;
}

.search{
    height: calc(100vh - 300px);
    overflow:auto;
}
.search-title{
    padding: 15px 0;
}
.search-content{
    padding:10px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.search::-webkit-scrollbar{
    width: 10px;
}
.search::-webkit-scrollbar-thumb{
    background-color: rgba(0, 0, 0, .3);
    border-radius:10px;
}
.search-content-id >*{
    padding-bottom:1px;
}
.search-content-desc{
    display:flex;
    flex-direction:row;
    justify-content: space-between;
}
.search-content-like{
    display:flex;
    align-items:center;
}
.search-content-like > *{
    margin-right:5px;
}
.search-content-like span{
    font-size:12px;
}
#search-content-count{
    color:#e9010193;
}
.search-content span{
    margin-right:5px;
}
.search-content-address{
    font-size:12px;
    color: rgba(0, 0, 0, .6);
}
#content-type{
    font-size:12px;
    color: rgba(0, 0, 0, .4);
}
.search-content-tel{
    font-size:12px;
    color : rgba(40, 135, 86, 0.5)
}
.search-content-right{
    display:flex;
    flex-direction:row;
}
</style>