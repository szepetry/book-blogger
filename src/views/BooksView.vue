<template>
    <section class="section">
        <FilterRack :books="$store.state.books"/>
        <transition name="fade">
            <div v-if="this.$store.state.filteredBooks.length == 0" class="search__results">
                <div class="columns content is-multiline" id="content">
                    <div v-for="(book, k) in this.$store.state.books.slice(0, this.$store.state.resultsToDisplay)" :key="k">
                        <BookCard :book="book" :truncate="truncate" />
                    </div>
                </div>
            </div>
            <div v-else class="search__results">
                <div class="columns content is-multiline" id="content">
                    <div v-for="(book, k) in this.$store.state.filteredBooks.slice(0, this.$store.state.resultsToDisplay)" :key="k">
                        <BookCard :book="book" :truncate="truncate" />
                    </div>
                </div>
            </div>
        </transition>
    </section>
</template>

<script>
import axios from 'axios';
import { truncate } from '../utils/books_helper.js'
import BookCard from '@/components/BookCard.vue'
import FilterRack from '@/components/FilterRack.vue'

export default {
    name: "BooksView",
    components: {
        BookCard,
        FilterRack
    },
    methods: {
        callDispBooks() {
            axios.get("books.json").then(response => {
                this.$store.commit('setBooksDataset', response.data);
                this.$store.commit('setResultsToDisplay',response.data.length);
            });
        },
        truncate
    },
    mounted() {
        document.title = 'Books | Blogger';
        this.callDispBooks();
    },
}
</script>

<style lang="scss">



.content {
    padding: 24px;
    padding-left: 12px;
}

@media (min-width: 768px) {
    #content {
        display: flex;
        justify-content: center;
    }

    .control {
        width: 20vw !important;
    }
}
</style>