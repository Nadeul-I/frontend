<template>
    <div class="hotplace">
        <h2>🔥 Hot Place 🔥</h2>
        <carousel class="info-carousel" :per-page="5" :autoplay="true" :autoplayTimeout="5000">
            <slide v-for="hotPlace in hotPlaceList" :key="hotPlace.contentId" >
                <div class="hotplace_item" @click="moveToSearch(hotPlace.sidoCode, hotPlace.gugunCode, hotPlace.contentTypeId, hotPlace.title)">
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
        Slide,
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
            this.$router.push({name: 'RegionSearch', query:{sidoCode, gugunCode,category, keyword}});
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

.hotplace:hover{
    cursor:pointer;
}
.hotplace p{
    font-size:18px;
}
.hotplace_item{
    padding:10px;
    padding-bottom: 30px;
    border : 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    height:300px;
}

</style>