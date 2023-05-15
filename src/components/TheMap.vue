<template>
    <div class="center" id="map"></div>
</template>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=8ae06e1c329b4fe685636eddc4ce2a3d"></script>
<script>   
 var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption); </script>
<script>
export default {
    name: "TheMap",
}
</script>

<style>
#map{
    width:100%;
    height:500px;
    top: 220%;
}
</style>