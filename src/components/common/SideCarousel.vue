<template>
  <div class="side-carousel-container">
    <div v-for="(image, i) in images" :key="i">
      <transition name="fade">
        <img
          v-if="i == idx"
          :src="require(`@/assets/${image}`)"
          alt="image-load-fail"
        />
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: ["carousel1.jpg", "carousel2.jpg", "carousel3.jpg",  "carousel4.jpg"],
      idx: 0,
      timer: null,
    };
  },
  mounted: function () {
    this.startRotation();
  },
  methods: {
    startRotation: function () {
      this.timer = setInterval(this.next, 3000);
    },
    next: function () {
      this.idx = (this.idx + 1) % this.images.length;
    },
  },
  beforeDestroyed: function () {
    clearTimeout(this.timer);
    this.timer = null;
  },
};
</script>
<style>
.side-carousel-container {
  height: 320px;
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
}

.side-carousel-container img {
  position:absolute;
  object-fit: cover;
  bottom: 0;
  right: 0;
  height: 320px;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease;
  opacity: 1;
}
.fade-enter, .fade-leave /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.3;
}
</style>