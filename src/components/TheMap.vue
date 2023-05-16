<template>
    <div class="center" id="map"></div>
</template>

<script>
import img from '@/assets/noimage.png'
export default {
    name: "TheMap",
    props:{
        mapData: Array,
    },
    data(){
        return{
            map : null,
            openedInfo : [],
        }
    },
    mounted(){
        if (!window.kakao || !window.kakao.maps) {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =
            '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8ae06e1c329b4fe685636eddc4ce2a3d'
            /* eslint를 사용한다면 kakao 변수가 선언되지 않았다고
            * 오류를 내기 때문에 아래 줄과 같이 전역변수임을
            * 알려주어야 한다. */
            /* global kakao */
            script.addEventListener('load', () => {
            kakao.maps.load(() => {
                // 카카오맵 API가 로딩이 완료된 후 지도의 기본적인 세팅을 시작해야 한다.
                this.initMap()
            })
            })
            document.head.appendChild(script)
        } else {
            // 이미 카카오맵 API가 로딩되어 있다면 바로 지도를 생성한다.
            this.initMap()
        }

    },
    watch:{
        mapData: function(){
            if(this.mapData.length==0){
                alert("여행지 정보가 없습니다.")
                return;
            }
            this.initMap();
            console.log(this.mapData)
            this.mapData.map((item)=>{
            let mapLatLng = new kakao.maps.LatLng(item.latitude, item.longitude)
            this.map.setCenter(mapLatLng)

            let markerPosition = mapLatLng
            let marker = new kakao.maps.Marker({
                position: markerPosition,
                clickable: true,
            })
            
            marker.setMap(this.map)
            let infoContent = `<div class="info" style="padding:5px;">
                                <div>${item.title.length>12 ? item.title.substring(0,12)+"..." : item.title}</div>
                                <div class="show_info">
                                    <div class="info_image">
                                        <img src="${item.firstImage==null ? img : item.firstImage}">
                                    </div>
                                    <div class="info_detail">
                                        <div>${item.addr1}</div>
                                        <div>${item.addr2 == null ? "":item.addr2}</div>
                                    </div>
                                </div>
                                </div>`,
                infoRemoveable = true;

            let info = new kakao.maps.InfoWindow({
                content : infoContent,
                removable : infoRemoveable,
            })
            kakao.maps.event.addListener(marker, 'click', ()=>{
                info.open(this.map, marker)
            })
                
            });
        }
    },
    methods:{
        initMap() {
            const container = document.getElementById('map')

            const options = {
            // 처음 지도의 위치를 lat, lng(위도, 경도) 값으로 설정한다.
            center: new kakao.maps.LatLng(35.161068, 126.80197),
            level: 8
            }
        
            this.map = new kakao.maps.Map(container, options)
        },
        replace(e){
            e.target.src = require(`@/assets/noimage.png`);
        }
        
    }
}
</script>

<style>
#map{
    width:100%;
    height:500px;
    top: 220%;
}
.info{
    width:350px;
    height:150px;
    font-size:16px;
    margin: 0 10px;
}
.info .show_info{
    display:flex;
    justify-content:space-between;
    padding-top:10px;
}
.info .show_info>div{
    padding:5px;
}
.info img{
    width:100px;
    height:100px;
}
</style>