<template>
  <div class="home">
    <div class="lump" />
    <main>
      <section class="section1">
        <img src="@/assets/trip.jpg" alt="section1 img load fail" />
        <div class="section1-title">
          <p>나들이와 함께</p>
          <p>즐거운 여행을</p>
          <p>떠나보세요!!</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "HomeView",
  components: {},
  methods: {
    handleScroll() {
      document.querySelector(".home").addEventListener("scroll", (event) => {
        console.log(event.target);
        console.log("asdf");
      });
    },
  },
};
</script>
<style scoped>
.section1 {
  position: relative;
}
.lump {
  height: 89px;
  background-color: rgba(111, 173, 207, 0.7);
}
.section1 img {
  height: 100vh;
  width: 100%;
  object-fit: cover;
  filter: brightness(60%);
}

.section1-title {
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
}

.section1-title p {
  color: white;
  font-size: 4rem;
  margin: 2rem 0;
}
</style>
