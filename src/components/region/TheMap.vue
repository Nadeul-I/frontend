<template>
    <div id="map"></div>
</template>

<script>
import img from '@/assets/noimage.png'
import { planWrite, planDelete, planModify } from '@/api/plan';
import { mapGetters } from "vuex";

const userStore = "userStore";
const planStore = "planStore";

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
            tempStart: "",
            tempDest: "",
            start: false,
            dest: false,
            clickLine: Object,
            distanceOverlay: Object,
            dots:[],
            planNo: 0,
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
            if(this.getPlanNo!=0){
            this.find();
        }   else{
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
        startPoint: function(){
            this.startPoint.keyword != null ? this.start=true : this.start=false
            if(this.startPoint.keyword!=null&& this.destPoint.keyword!=null) this.find();
            console.log(this.startPoint)
            console.log('스타트')
        },
        destPoint: function(){
            this.destPoint.keyword != null ? this.dest=true : this.dest=false
            if(this.startPoint.keyword!=null&& this.destPoint.keyword!=null) this.find();
        }
    },
    computed: {
        ...mapGetters(userStore, ["getUserId"]),
        ...mapGetters(planStore, ["getPlan", "getPlanNo"])
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
            let numberSpan = document.createElement('span');
            numberSpan.setAttribute('class', 'number');
            
            // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
            if(walkkTime >= 2400){
                    let day = Math.floor(walkkTime/2400);
                    let hour = Math.floor(walkkTime%2400/60);
                    // walkHour = '<span class="number">'+ day +'일 ' + hour + '시간</span> '
                    numberSpan.appendChild(document.createTextNode(`${day}일 ${hour}시간 `))
            }
            else if (walkkTime > 60) {
                // walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
                numberSpan.appendChild(document.createTextNode(`${Math.floor(walkkTime/60)}시간 `))
            }
            let numberSpan2 = document.createElement('span');
            numberSpan2.setAttribute('class','number');
            numberSpan2.appendChild(document.createTextNode(`${walkkTime%60}분`));
            // walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'

            // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
            var bycicleTime = distance / 227 | 0;
            let numberSpan3 = document.createElement('span');
            
            numberSpan3.setAttribute('class','number');
            
            // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
            if (bycicleTime > 60) {
                numberSpan3.appendChild(document.createTextNode(`${Math.floor(bycicleTime/60)}시간 `))
            }
            let numberSpan4 = document.createElement('span');
            numberSpan4.setAttribute('class','number');

            numberSpan4.appendChild(document.createTextNode(`${bycicleTime%60}분 `))
            let dist = distance>=1000 ? (distance/1000).toFixed(1)+'km' : distance + 'm'
            // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다


            let content2 = document.createElement('div');
            content2.setAttribute('class', 'dotOverlay distanceInfo');

            let title = document.createElement('div');
            title.setAttribute('class', 'title');
            
            let titleSpan = document.createElement('span');
            titleSpan.setAttribute('class', 'label');
            titleSpan.appendChild(document.createTextNode(`총거리 : `));
            title.appendChild(titleSpan);

            let titleSpan2 = document.createElement('span');
            titleSpan2.setAttribute('class', 'number');
            titleSpan2.appendChild(document.createTextNode(`${dist}`));
            title.appendChild(titleSpan2);

            let dobo = document.createElement('div');
            dobo.setAttribute('class', 'dobo');
            
            let doboImg = document.createElement('div');
            doboImg.setAttribute('class', 'doboImg');
            let doboIcon = document.createElement('i');
            doboIcon.setAttribute('class', 'fa-solid fa-person-walking');
            doboIcon.setAttribute('style', 'color: #5c98ff;');
            doboImg.appendChild(doboIcon);

            let doboDesc = document.createElement('div');
            doboDesc.setAttribute('class', 'doboDesc');
            doboDesc.appendChild(numberSpan)
            doboDesc.appendChild(numberSpan2);

            dobo.appendChild(doboImg);
            dobo.appendChild(doboDesc);

            let bicycle = document.createElement('div');
            bicycle.setAttribute('class', 'bicycle');
            
            let bicycleImg = document.createElement('div');
            bicycleImg.setAttribute('class', 'bicycleImg');
            let bicycleIcon = document.createElement('i');
            bicycleIcon.setAttribute('class', 'fa-solid fa-bicycle');

            let bicycleDesc = document.createElement('div');
            bicycleDesc.setAttribute('class', 'bicycleDesc');
            bicycleDesc.appendChild(numberSpan3);
            bicycleDesc.appendChild(numberSpan4);

            bicycle.appendChild(bicycleImg);
            bicycle.appendChild(bicycleDesc);

            let distanceInput = document.createElement('div');
            distanceInput.setAttribute('class', 'distance-input');

            let input1 = document.createElement('input');
            input1.setAttribute('type', 'text');
            input1.setAttribute('placeholder', '제목');
            if(this.getPlanNo!=0){
                input1.setAttribute('value', `${this.getPlan.planTitle}`)
            }
            

            distanceInput.appendChild(input1);

            let saveInfo = document.createElement('div');
            saveInfo.setAttribute('class', 'saveInfo');

            let saveBtn = document.createElement('input');
            saveBtn.setAttribute('type', 'button');
            saveBtn.setAttribute('value', '저장');
            saveBtn.onclick = () => {
                let userInput = input1.value;
                this.saveInfo(userInput)
            }

            let modifyBtn = document.createElement('input');
            modifyBtn.setAttribute('type', 'button');
            modifyBtn.setAttribute('value', '수정');
            modifyBtn.onclick = () => {
                let value = input1.value;
                this.modifyInfo(value);
            }

            let deleteBtn = document.createElement('input');
            deleteBtn.setAttribute('type', 'button');
            deleteBtn.setAttribute('value', '삭제');
            deleteBtn.onclick = () => {
                this.deleteInfo(this.getPlanNo)
            }
            if(this.getPlanNo==0){saveInfo.appendChild(saveBtn);}
            else{
                saveInfo.appendChild(modifyBtn);
                saveInfo.appendChild(deleteBtn);
            }

            content2.appendChild(title);
            content2.appendChild(dobo);
            content2.appendChild(bicycle);
            content2.appendChild(distanceInput);
            content2.appendChild(saveInfo);
            
            return content2;
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
        },
        saveInfo(value){
            console.log(this.startPoint);
            console.log(this.destPoint);
            console.log(value)
            let newPlan = {
                planTitle : value,
                planStartTitle: this.startPoint.keyword,
                planStartLat : this.startPoint.latitude,
                planStartLng : this.startPoint.longitude,
                planStart : this.startPoint.contentId,
                planEndTitle: this.destPoint.keyword,
                planEndLat : this.destPoint.latitude,
                planEndLng : this.destPoint.longitude,
                planEnd : this.destPoint.contentId,
                planImg : this.destPoint.firstImage == '' ? this.startPoint.firstImage : this.destPoint.firstImage,
                planId : this.getUserId,
            }
            planWrite(newPlan,
            ()=> {
                this.$router.push('/plan/list')
                },
            ()=> {console.log('글 작성 실패')})
            
        },modifyInfo(value){
            let modifyPlan = {
                planNo : this.getPlanNo,
                planTitle : value,
                planStartTitle: this.startPoint.keyword,
                planStartLat : this.startPoint.latitude,
                planStartLng : this.startPoint.longitude,
                planStart : this.startPoint.contentId,
                planEndTitle: this.destPoint.keyword,
                planEndLat : this.destPoint.latitude,
                planEndLng : this.destPoint.longitude,
                planEnd : this.destPoint.contentId,
                planImg : this.destPoint.firstImage == '' ? (this.startPoint.firstImage == ''? img : this.startPoint.firstImage) : this.destPoint.firstImage,
                planId : this.getUserId,
            }
            console.log("?")
            console.log(modifyPlan)
            planModify(modifyPlan,
            ()=> {this.$router.push('/plan/list')},
            ()=> {console.log('수정 실패')})
        },
        deleteInfo(value){
            console.log(this.startPoint);
            console.log(this.destPoint);
            planDelete(value, 
            ()=>{
                this.$router.push('/plan/list')
            },
            ()=>{
                console.log('글 삭제 실패')
            })
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
    border: 1px solid #2691d9;
    border-radius: 5px;
    padding:10px;
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
    justify-content:space-between;

}
.doboImg, .bicycleImg{
    width:20%;
}
.doboImg svg{
    margin-left: 5px;
}
.distance-input{
    display:flex;
    justify-content: center;
    flex-direction: column;
}
.distance-input input{
    padding:3px;
    margin-bottom: 5px;
}

</style>