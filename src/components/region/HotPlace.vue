<template>
<div class="hotplace">
    <div class="hotplace-title">
        <h2>🔥 Hot Place 🔥</h2>
    </div>
    <div class="hotplace-content" v-for="hotplace in hotPlaceList" :key="hotplace.keyword" @click="moveToSearch(hotplace.sidoCode, hotplace.gugunCode, hotplace.contentTypeId, hotplace.title)">
        <div class="hotplace-content-id">
            <h3>{{hotplace.title}}</h3>
        </div>
        <div class="hotplace-content-desc">
            <div class="hotplace-content-img">
                <img :src="hotplace.firstImage"/>
            </div>
        </div>

    </div>
</div>

</template>

<script>
import axios from '@/util.js'
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
        axios.get('/region/hotplace')
        .then(({data}) => {
            data.map((item)=>{
                tempList.push(item)
            })
        })
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
img{
    width:100%;
    height:200px;
    image-rendering: -webkit-optimize-contrast;
    transform:translateZ(0);
    backface-visibility:hidden;
}

h2, h3{
    text-align:left;
    padding-left: 10px;
}
h2{
    font-size:20px;
}
div{
    margin-bottom: 10px;
}
.hotplace{
    height: calc(100vh - 300px);
    overflow:auto;
}
.hotplace-title{
    padding: 15px 0;
}
.hotplace-content{
    padding:0 10px;
}
.hotplace::-webkit-scrollbar{
    width: 10px;
}
.hotplace::-webkit-scrollbar-thumb{
    background-color: rgba(0, 0, 0, .3);
    border-radius:10px;
}
</style>