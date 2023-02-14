<template>
    <div class="main-filter-container columns is-mobile">
        <div class="column is-3 zero_pad">
            <div class="dropdown is-left px-1" v-bind:class="{ 'is-active': showFilterMenu }">
                <div class="dropdown-trigger">
                    <button class="button filter_button_style" aria-haspopup="true" aria-controls="dropdown-menu2"
                        @click="toggleFilterMenu()">
                        <span>Sort</span>
                        <span class="icon is-small">
                            <i class="bi bi-chevron-down chev-icon-size" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu2" role="menu">
                    <div class="dropdown-content">
                        <div class="dropdown-item">
                            <div class="field">
                                <input id="price_sort" @click="togglePriceSwitch" v-model="price_sort" type="checkbox"
                                    name="price_sort" class="switch is-small" checked="checked"
                                    :disabled="percent_sort || rating_sort">
                                <label for="price_sort">Sort by price</label>
                            </div>
                            <div class="field">
                                <input id="rating_sort" @click="toggleRatingSwitch" v-model="rating_sort"
                                    type="checkbox" name="rating_sort" class="switch is-small" checked="checked"
                                    :disabled="price_sort || percent_sort">
                                <label for="rating_sort">Sort by rating</label>
                            </div>
                            <div class="field">
                                <input id="percent_sort" @click="togglePercentSwitch" v-model="percent_sort"
                                    type="checkbox" name="percent_sort" class="switch is-small" checked="checked"
                                    :disabled="price_sort || rating_sort">
                                <label for="percent_sort">Sort by liked percent</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-2 zero_pad"></div>
        <div class="column is-7 zero_pad">
            <div class="field results_slider_col">
                <label class="results_label" for="results_slider">Books to display: </label>
                <input id="results_slider" v-model="this.$store.state.resultsToDisplay" name="results_slider"
                    class="results_slider slider has-output is-fullwidth is-large" step="1" min="0"
                    :max="this.books.length" type="range">
                <output class="slider_output" for="results_slider">{{ this.$store.state.resultsToDisplay }}</output>
            </div>
        </div>
    </div>
</template>

<script>
import { primaryColor } from '@/utils/app_constants.js'
import { applyFilters, applyFilterStates, refilter } from '@/utils/books_helper.js'


export default {
    name: 'FilterRack',
    data() {
        return {
            showFilterMenu: false,
            resultsToDisplay: this.$store.state.resultsToDisplay,
            primaryColor: primaryColor,
            price_sort: false,
            rating_sort: false,
            percent_sort: false,
        };
    },
    props: {
        books: Array
    },
    methods: {
        toggleFilterMenu() {
            this.showFilterMenu = !this.showFilterMenu
        },
        async toggleRatingSwitch() {
            // await refilter();
            this.rating_sort = !this.rating_sort;
        },
        async togglePriceSwitch() {
            // await refilter();
            this.price_sort = !this.price_sort;
        },
        async togglePercentSwitch() {
            // await refilter();
            this.percent_sort = !this.percent_sort;
        },
    },
    watch: {
        resultsToDisplay(value) {
            this.$store.commit('setResultsToDisplay', value);
        },
        price_sort(price_sort) {
            if (price_sort) {
                applyFilterStates(false, price_sort, false);
                applyFilters(this.$store.state.filterState, this.books)
            }
            else {
                refilter();
            }
        },
        percent_sort(percent_sort) {
            if (percent_sort) {
                applyFilterStates(false, false, percent_sort);
                applyFilters(this.$store.state.filterState, this.books)
            }
            else {
                refilter();
            }
        },
        rating_sort(rating_sort) {
            if (rating_sort) {
                applyFilterStates(this.rating_sort, false, false);
                applyFilters(this.$store.state.filterState, this.books)
            }
            else {
                refilter();
            }
        },
    },
    mounted() {
        this.resultsToDisplay = this.$store.state.resultsToDisplay;
    }
}
</script>

<style lang="scss">
.results_label {
    display: none;
}

.slider_output {
    display: flex !important;
    justify-content: center !important;
    z-index: 1 !important;
}


@media (min-width: 768px) {
    .results_label {
        white-space: nowrap;
        margin: auto;
        padding-right: 8px;
        display: flex;
    }

    .slider_output {
        display: flex !important;
        justify-content: center !important;
        z-index: 1 !important;
    }
}



.zero_pad {
    padding: 0;
}

.results_slider_col {
    padding: 0;
    display: flex;
    align-content: stretch;
    justify-content: center;
    align-items: center;
}

.is-small {
    margin: 0 !important;
}

.results_slider {
    color: v-bind(primaryColor) !important;
}

.chev-icon-size {
    width: 5px !important;
    // height: 5px;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
}

.main-filter-container {
    border: 0px solid black;
    height: 52px !important;
    width: 80vw !important;
    background-color: white;
    justify-content: left;
    display: flex;
    align-items: center;
    border-radius: 8px;
    margin: auto;
}

.filter_button_style {
    color: white !important;
    background-color: v-bind(primaryColor) !important;
    border: 1px solid transparent;
    border-radius: 8px;
    -webkit-transition: background-color 0.3s ease-in;
    -moz-transition: background-color 0.3s ease-in;
    -o-transition: background-color 0.3s ease-in;
    transition: background-color 0.3s ease-in;
}

.filter_button_style:hover {
    background-color: white !important;
    color: black !important;
    cursor: pointer;
}
</style>