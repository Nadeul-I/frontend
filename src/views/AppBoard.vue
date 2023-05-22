<template>
    <div>
        <side-carousel></side-carousel>
        <router-view></router-view>
    </div>
    
</template>

<script>
import SideCarousel from '@/components/common/SideCarousel.vue';
export default {
    components : {
        SideCarousel,
    },
    name: 'AppBoard',
}
</script>

<style>

</style>