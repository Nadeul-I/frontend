<template>
    <div class="hotplace">
        <h2>🔥 hot place 🔥</h2>
        <carousel class="info-carousel" :per-page="5" :autoplay="true">
            <slide v-for="hotPlace in hotPlaceList" :key="hotPlace.contentId" >
                <div @click="moveToSearch(hotPlace.sidoCode, hotPlace.gugunCode, hotPlace.contentTypeId, hotPlace.title)">
                    <img :src="hotPlace.firstImage" />
                    <p v-text="hotPlace.title"></p>
                </div>
            </slide>
        </carousel>
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import axios from '@/util.js'

export default {
    name: 'HotPlace',
    components:{
        Carousel,
        Slide
    },
    data(){
        return{
            hotPlaceList: [],
        }
    },
    created(){
        let tempList = []
        axios.get('/region/hotplace')
        .then(({data}) => {
            data.map((item)=>{
                console.log(item)
                tempList.push(item)
            })
        })
        this.hotPlaceList = tempList
    },
    methods:{
        moveToSearch(sidoCode, gugunCode, category, keyword){
            this.$router.push({name: 'hotRegion', query:{'sidoCode': sidoCode, 'gugunCode': gugunCode, 'category':category, 'keyword': keyword}});
        }
    }
}

</script>

<style scoped>
img{
    width:100%;
    height:200px;
}
h2{
    text-align:left;
    padding-left: 10px;
}
.hotplace{
    top: 10%;
    margin-top:10%;
}
.hotplace p{
    font-size:20px;
}
</style>