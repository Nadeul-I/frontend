<template>
    <div id="map"></div>
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
            searchLink: false,
        }
    },
    created(){
        if(this.$route.params) this.searchLink = true
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
                                <div class="info_title">${item.title.length>12 ? item.title.substring(0,12)+"..." : item.title}</div>
                                <div class="info_content">
                                    <div class="info_image">
                                        <img src="${item.firstImage==''?img : item.firstImage}" >
                                    </div>
                                    <div class="info_detail">
                                        <div>${item.addr1}</div>
                                        <div>${item.addr2 == "" ? "" : "("+item.addr2+")"}</div>
                                    </div>
                                </div>
                                </div>`,
                infoRemoveable = true;

            let info = new kakao.maps.CustomOverlay({
                content : infoContent,
                map: null,
                position: markerPosition,
                removable : infoRemoveable,
                toggle: false,
                yAnchor:1.2,
            })
            if(this.searchLink&&this.mapData.length==1){
                info.toggle = true,
                info.setMap(this.map)
            }
            kakao.maps.event.addListener(marker, 'click', ()=>{
                !info.toggle ? info.setMap(this.map) : info.setMap(null);
                info.toggle = !info.toggle;
                this.map.panTo(mapLatLng)
            })
                
            });
        }
    },
    methods:{
        initMap() {
            const container = document.getElementById('map')
            
            let options = {
            // 처음 지도의 위치를 lat, lng(위도, 경도) 값으로 설정한다.
            center: new kakao.maps.LatLng(37.515877, 127.05775),
            level: 8
            }

            // if(window.navigator.geolocation){
            //     window.navigator.geolocation.getCurrentPosition(function(position){
            //         console.log(position.coords.latitude)
            //         options.center = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
            //     })
            // }
            this.map = new kakao.maps.Map(container, options)
        },
        replace(e){
            e.target.src = img;
        },
        
        
    }   
}
</script>
<style >
#map{
    width:110%;
}
.info{
    object-fit:none;
    width:100%;
    height:150px;
    font-size:16px;
    background-color:white;
    border-radius:5px;
    margin: 10px;
}
.info .info_title{
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom:5px;
}
.info .info_content{
    display:flex;
    justify-content:space-between;
    padding-top:10px;
}
.info .info_content>div{
    padding:0 15px;
}
.info_image img{
    object-fit:none;
    width:100px;
    height:100px;
    border-radius:5px;
}
.info_detail{
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
}
.lump{
    height:89px;

}

</style>