<template>
  <div class="home">
    <main>
      <section class="section1">
        <img src="@/assets/title_img.jpg" alt="section1 img load fail">
        <div class="section1-title">
          <p>나들이와 함께</p>
          <p>즐거운 여행을</p>
          <p>즐겨보세요!!</p>
        </div>
      </section>
    </main>
    <hot-place></hot-place>
  </div>
</template>

<script>
// @ is an alias to /src
import HotPlace from '@/components/region/HotPlace'
export default {
  name: 'HomeView',
  components: {
    HotPlace,
  },
  methods:{
    handleScroll(){
      document.querySelector(".home").addEventListener("scroll", (event) => {
        console.log(event.target);
        console.log('asdf')
      })
    }
  }
}
</script>
<style scoped>
.section1 {
  position: relative;
}

.section1 img {
  width: 100%;
  height: 900px;
  object-fit: cover;
}

.section1-title {
  position: absolute;
  top: 200px;
  left: 3rem;
}

.section1-title p {
  color: white;
  font-size: 4rem;
  margin: 2rem 0;
}

@media (max-width: 980px) {
  .section1-title p {
    font-size: 2rem;
    margin: 1rem 0;
  }
}
</style>