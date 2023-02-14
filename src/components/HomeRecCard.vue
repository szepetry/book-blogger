<template>
    <div>
        <div class="rec_title_box px-2">
            <div class="rec_title">{{ title }}</div>
        </div>

        <div class="column is-4" v-if="this.$store.state.count == 3">
            <BookCard :book="this.$store.state.recBooks[index]" :truncate="truncate" />
        </div>
    </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue'
import { getOneRandomBook, truncate } from '@/utils/books_helper.js'
export default {
    name: "HomeRecCard",
    data() {
        return {
            loading: true
        };
    },
    methods: {
        truncate
    },
    props: {
        title: String,
        index: Number
    },
    components: {
        BookCard
    },
    async mounted() {
        let book = await getOneRandomBook()
        this.$store.state.recBooks[this.index] = book
        this.$store.commit("setRecBooksState", this.$store.state.recBooks);
        this.$store.commit("incrementCount");
    }
}
</script>

<style>
.rec_title {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    color: white;
}

.rec_title_box {
    background-color: black;
    /* #3d00ec */
    height: 50px;
    color: white;
    border: 2px solid black;
    border-radius: 5px;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: auto;
    width: max-content;
}
</style>