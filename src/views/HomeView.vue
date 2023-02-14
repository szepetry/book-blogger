<template>
  <div class="home">
    <section class="section is-small">
      <CarouselItem />
    </section>
    <section class="section">
      <div class="books-overview">
        <div class="columns">
          <HomeRecCard title="Today's Trending" :index="0" />
          <HomeRecCard title="Challenge of the month" :index="1" />
          <HomeRecCard title="Most recommended" :index="2" />
        </div>
      </div>
    </section>


  </div>
</template>

<script>
import CarouselItem from '@/components/CarouselItem.vue'
import HomeRecCard from '@/components/HomeRecCard.vue'

export default {
  name: "HomeView",
  components: {
    CarouselItem,
    HomeRecCard
  },
  mounted() {
    document.title = 'Home | Blogger';
    this.$store.commit("resetCount");
  }
};
</script>
