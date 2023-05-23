<template>
<div class="hotplace">
    <div class="hotplace-title">
        <h2>🔥 Hot Place 🔥</h2>
    </div>
    <!-- 제목, 타입, like, 위치, 연락처, 길찾기 -->
    <div class="hotplace-content" v-for="hotplace in hotPlaceList" :key="hotplace.keyword" @click="moveToSearch(hotplace.sidoCode, hotplace.gugunCode, hotplace.contentTypeId, hotplace.title)">
        <div class="hotplace-content-id">
            <div>
                <span id="title">{{hotplace.title}}</span>
                <span id="content-type">{{hotplace.contentTypeId}}</span>
            </div>
            <div class="hotplace-content-address">
                {{hotplace.addr1}}
            </div>
        </div>
        <div class="hotplace-content-desc">
            <div class="hotplace-content-left">
                <div class="hotplace-content-like">
                    <font-awesome-icon :icon="['fas', 'heart']" style="color: #e9010193;" />
                    <span id="hotplace-content-count">{{hotplace.readCount}}</span>
                </div>
                <div class="hotplace-content-tel">
                    {{hotplace.tel==''?'연락처 정보 없음':hotplace.tel}}
                </div>
            </div>
            <div class="hotplace-content-right">
                <div class="hotplace-content-start">
                    <input type="button" value="출발"/>
                </div>
                <div class="hotplace-content-end">
                    <input type="button" value="도착"/>
                </div>
            </div>
        </div>

    </div>
</div>

</template>

<script>
import { hotPlace } from '@/api/region.js';

export default {
    name: 'HotPlace',
    components:{
    },
    data(){
        return{
            hotPlaceList: [],
            img: '@/assets/noimage.png',
        }
    },
    created(){
        let tempList = []
        hotPlace(
            ({data}) =>{
                data.map((item)=>{
                    tempList.push(item)
                })
            }
        )
        this.hotPlaceList = tempList
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

.hotplace{
    height: calc(100vh - 300px);
    overflow:auto;
}
.hotplace-title{
    padding: 15px 0;
}
.hotplace-content{
    padding:10px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.hotplace::-webkit-scrollbar{
    width: 10px;
}
.hotplace::-webkit-scrollbar-thumb{
    background-color: rgba(0, 0, 0, .3);
    border-radius:10px;
}
.hotplace-content-id >*{
    padding-bottom:1px;
}
.hotplace-content-desc{
    display:flex;
    flex-direction:row;
    justify-content: space-between;
}
.hotplace-content-like{
    display:flex;
    align-items:center;
}
.hotplace-content-like > *{
    margin-right:5px;
}
.hotplace-content-like span{
    font-size:12px;
}
#hotplace-content-count{
    color:#e9010193;
}
.hotplace-content span{
    margin-right:5px;
}
.hotplace-content-address{
    font-size:12px;
    color: rgba(0, 0, 0, .6);
}
#content-type{
    font-size:12px;
    color: rgba(0, 0, 0, .4);
}
.hotplace-content-tel{
    font-size:12px;
    color : rgba(40, 135, 86, 0.5)
}
.hotplace-content-right{
    display:flex;
    flex-direction:row;
}
</style>