<template>
    <section class="section">
        <FilterRack :books="$store.state.filteredBooks" />
        <!-- {{ this.$store.state.search_keyword }}
        {{ keyword }} -->
        <div class="container">
            <div class="jumboSettings">
                <h1><span class="not_imp">Search Results for </span> <span class="imp">"{{
                    this.$store.state.search_keyword
                }}"</span>
                </h1>
                <p>Total results found: <span class="total_entry">{{ $store.state.search_result_count }}</span></p>
            </div>
            <div class="row center">
                <div class="col-md-12">
                    <div class="results" id="results"></div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div v-if="this.$store.state.filteredBooks.length > 0" class="search__results">
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

import { getBooksFromSearchText, getBooksDataset, truncate, applyFilters } from '@/utils/books_helper.js'
import BookCard from '@/components/BookCard.vue'
import FilterRack from '@/components/FilterRack.vue'

export default {
    name: "SearchView",
    components: {
        BookCard,
        FilterRack
    },
    data() {
        return {
            keyword: "",
        }
    },
    async mounted() {
        document.title = 'Search | Blogger';
        this.keyword = this.$store.state.search_keyword.length > 0 ? this.$store.state.search_keyword : this.$route.params.keyword;
        this.$store.commit('setSearchKeyword', this.keyword)
        let books = await getBooksDataset();
        let filtered_books = getBooksFromSearchText(this.keyword, books);
        applyFilters(this.$store.state.bookFilters, filtered_books)
    },
    methods: {
        truncate
    }
}
</script>

<style lang="scss">
.imp {
    font-size: 38px;
    color: black;
}

.not_imp {
    color: rgb(212, 211, 211) !important;
    font-weight: normal !important;
    font-size: 28px !important;
}

.control {
    display: flex !important;
}

.total_entry {
    font-weight: bold;
}

.title_text {
    text-transform: uppercase;
}

#content {
    display: block;
}

.content {
    padding: 24px;
    padding-left: 12px;
}


.card-content {
    color: black !important;
}

@media (min-width: 768px) {
    #content {
        display: flex;
        justify-content: center;
    }

    .control {
        width: 20vw !important;
        // height: 60vh !important;
    }
}

.card {
    -webkit-transition: background-color 0.1s ease-in;
    -moz-transition: background-color 0.1s ease-in;
    -o-transition: background-color 0.1s ease-in;
    transition: background-color 0.1s ease-in;
}


.card:hover {
    color: white !important;
    background-color: black !important;
    box-shadow: 4px 4px 4px white;
    transform: scale(1.01);
}


.img-control {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
</style>