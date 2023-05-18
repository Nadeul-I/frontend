<template>
  <div class="home">
    <hot-place></hot-place>
  </div>
</template>

<script>
// @ is an alias to /src
import HotPlace from '@/components/HotPlace'
export default {
  name: 'HomeView',
  components: {
    HotPlace,
  }
}
</script>
