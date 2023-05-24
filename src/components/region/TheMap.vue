<template>
    <div id="map"></div>
</template>

<script>
import img from '@/assets/noimage.png'
export default {
    name: "TheMap",
    props:{
        mapData: Array,
        startPoint: [],
        destPoint: [],
    },
    data(){
        return{
            map : null,
            openedInfo : [],
            searchLink: false,
            start: false,
            dest: false,
            clickLine: Object,
            distanceOverlay: Object,
            dots:[],
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
        },
        startPoint: function(){
            this.startPoint.sidoCode != null ? this.start=true : this.start=false
            if(this.start && this.start && this.dest) this.find();
        },
        destPoint: function(){
            this.destPoint.sidoCode != null ? this.dest=true : this.dest=false
            if(this.dest && this.start && this.dest) this.find();
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
        find(){
            // console.log(this.destPoint);
            this.initMap();

            let startPosition = new kakao.maps.LatLng(this.startPoint.latitude, this.startPoint.longitude);
            let destPosition = new kakao.maps.LatLng(this.destPoint.latitude, this.destPoint.longitude);
            let clickLine = new kakao.maps.Polyline({
                map: this.map,
                path: [startPosition],
                strokeWeight:3,
                strokeColor: '#db4040',
                strokeOpacity: 1,
                strokeStyle: 'solid'
            })
            this.displayCircleDot(startPosition, 0)

            let path = clickLine.getPath();
            path.push(destPosition);
            clickLine.setPath(path);

            let distance = Math.round(clickLine.getLength());
            this.displayCircleDot(destPosition, distance);

            let content = this.getTimeHTML(distance);

            let halfPosition = new kakao.maps.LatLng((this.startPoint.latitude+this.destPoint.latitude)/2, (this.startPoint.longitude+this.destPoint.longitude)/2);
            this.map.setCenter(halfPosition)
            this.map.setLevel(this.mapLevel(distance)) 
            this.showDistance(content, halfPosition);

            path.map((item)=>{
                let marker = new kakao.maps.Marker({
                    position: item
                })
                marker.setMap(this.map)
            })
        },
        displayCircleDot(position, distance){
            if(distance<=0){
            this.circleOverlay = new kakao.maps.CustomOverlay({
                content: '<span class="dot"></span>',
                position: position,
                zIndex: 1
            });
            this.circleOverlay.setMap(this.map);
            this.distanceOverlay = new kakao.maps.CustomOverlay({
                content: '',
                position: position,
                yAnchor: 1,
                zIndex: 2
            });
            this.distanceOverlay.setMap(this.map);
            }
            this.dots.push({circle:this.circleOverlay, distance: this.distanceOverlay})
        },
        getTimeHTML(distance) {

            // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
            var walkkTime = distance / 67 | 0;
            var walkHour = '', walkMin = '';

            // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
            if (walkkTime > 60) {
                walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
            }
            walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'

            // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
            var bycicleTime = distance / 227 | 0;
            var bycicleHour = '', bycicleMin = '';

            // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
            if (bycicleTime > 60) {
                bycicleHour = '<span class="number">' + Math.floor(bycicleTime / 60) + '</span>시간 '
            }
            bycicleMin = '<span class="number">' + bycicleTime % 60 + '</span>분'

            // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
            var content = '<div class="dotOverlay distanceInfo">';
            content += '        <div class="title"><span class="label">총거리 : </span><span class="number">' + distance + '</span>m </div>';
            content += '        <div class="dobo">';
            content += '            <div class="doboImg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z"/></svg></div>';
            content += '            <div class="doboDesc"><span class="label">도보 </span>' + walkHour + walkMin + '</div>'
            content += '        </div>';
            content += '        <div class="bicycle">';
            content += '            <div class="bicycleImg"><span class="img"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M312 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h25.7l34.6 64H222.9l-27.4-38C191 99.7 183.7 96 176 96H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h43.7l22.1 30.7-26.6 53.1c-10-2.5-20.5-3.8-31.2-3.8C57.3 224 0 281.3 0 352s57.3 128 128 128c65.3 0 119.1-48.9 127-112h49c8.5 0 16.3-4.5 20.7-11.8l84.8-143.5 21.7 40.1C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L375.4 48.8C369.8 38.4 359 32 347.2 32H312zM458.6 303.7l32.3 59.7c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-32.3-59.7c3.6-.6 7.4-.9 11.2-.9c39.8 0 72 32.2 72 72s-32.2 72-72 72s-72-32.2-72-72c0-18.6 7-35.5 18.6-48.3zM133.2 368h65c-7.3 32.1-36 56-70.2 56c-39.8 0-72-32.2-72-72s32.2-72 72-72c1.7 0 3.4 .1 5.1 .2l-24.2 48.5c-9 18.1 4.1 39.4 24.3 39.4zm33.7-48l50.7-101.3 72.9 101.2-.1 .1H166.8zm90.6-128H365.9L317 274.8 257.4 192z"/></svg></span></div>'
            content += '            <div class="bicycleDesc"><span class="label">자전거 </span>' + bycicleHour + bycicleMin + '</div>';
            content += '        </div>';
            content += '    </div>'

            return content;
        },
        showDistance(content, position) {
                // 커스텀 오버레이를 생성하고 지도에 표시합니다
            this.distanceOverlay = new kakao.maps.CustomOverlay({
                map: this.map, // 커스텀오버레이를 표시할 지도입니다
                content: content,  // 커스텀오버레이에 표시할 내용입니다
                position: position, // 커스텀오버레이를 표시할 위치입니다.
                xAnchor: 0,
                yAnchor: 0,
                zIndex: 3  
            });      

        },
        mapLevel(distance){
            let level;
            if(distance<=1000) level = 4;
            else if(distance<=2500) level = 5;
            else if(distance<=5000) level = 6;
            else if(distance<=10000) level = 7;
            else if(distance<=20000) level = 8;
            else if(distance<=40000) level = 9;
            else if(distance<=80000) level = 10;
            else if(distance<=160000) level = 11;
            else level = 12;
            return level;
        }
        
    }   
}
</script>
<style >
#map{
    width:100%;
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
.dot{
    font-size:100px;
}
.distanceInfo{
    background-color:rgb(255, 255, 255);
    transform: translateX(-100%);
    border: 3px solid red;
    border-radius: 5px;
}
.distanceInfo .title{
    padding:10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0);
}
.distanceInfo li{
    padding: 5px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.dobo, .bicycle{
    display:Flex;
    flex-direction: row;
    align-items:center;
    justify-content:space-around;
}
.doboImg, .bicycleImg{
    width:20%;
}
.doboImg svg{
    margin-left: 5px;
}
</style>