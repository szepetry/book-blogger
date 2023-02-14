<template>
    <div>
        <vue-carousel v-if="$store.state.books" :data="getCarouselList($store.state.books)"
            :autoplay="true"></vue-carousel>
    </div>
</template>


<script>
import VueCarousel from '@chenfengyuan/vue-carousel';
import '@/css/carousel_view.css'
import { getBookRecommendations } from '@/utils/books_helper.js'

export default {
    name: "CarouselItem",
    components: {
        VueCarousel
    },
    methods: {
        getCarouselList(data) {
            let caro_list = [];
            for (let i in data) {
                caro_list.push(`<div class="feat-slide">
                <img class="img_wrapper" src="${data[i]['coverImg']}" alt="" />
                <div class="caro_center">
                    <div class="columns caro_subtitle_text">${data[i]['author']}</div>
                    <div class="columns caro_title_text">${data[i]['title']}</div>
                    <div class="columns caro_sep_col_height">
                    <hr class="caro_sep">
                    </div>
                    <div class="columns caro_button_col">
                    <div class="caro_button" @click="$router.push('/books/${data[i]['bookId']}')" >READ MORE</div>
                    </div>
                </div>
                </div>`);
            }
            return caro_list;
        },
        // getBookRecommendations
    },
    mounted() {
        getBookRecommendations();
    },
}
</script>

<style>

</style>