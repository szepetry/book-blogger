<template>
    <div class="nav-end">
        <div class="search">
            <input type="text" id="search_input" placeholder="search" v-model="searchValue" @change="handleSearch()"
                v-on:input="handleSearch()" />
            <div class="symbol">
                <i class="bi bi-search"></i>
            </div>
        </div>


    </div>

</template>


<script>
import { getBooksDataset, applyFilters, getBooksFromSearchText } from '@/utils/books_helper.js';


export default {
    name: "SearchBar",
    data() {
        return {
            books: [],
            searchValue: ""
        }
    },
    methods: {
        handleSearch() {
            // if (this.books !== []) {
            let searchValue = this.searchValue;
            this.$store.commit('setSearchKeyword', searchValue);
            if (searchValue.length > 0) {
                const relevantBooks = getBooksFromSearchText(searchValue, this.books);
                applyFilters(this.$store.state.filteredBooks, relevantBooks);
                this.$router.push("/results/" + searchValue)
            }
            else {
                const toPath = this.$route.query.to || '/'
                this.$router.push(toPath)
            }
        },
    },
    async mounted() {
        this.books = await getBooksDataset();
    }
}
</script>


<style lang="scss" scoped>
.nav-end {
    justify-content: end;
}

.search {
    --background: #ffffff;
    --text-color: #414856;
    --primary-color: #4F29F0;
    --width: 190px;
    --height: 52px;
    background: var(--background);
    width: auto;
    height: var(--height);
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius);
    box-shadow: 0 10px 30px rgba(#414856, .05);
    display: flex;
    justify-content: center;
    align-items: center;

    input[type="text"] {
        position: relative;
        width: var(--height);
        height: var(--height);
        font: 400 16px 'Varela Round', sans-serif;
        color: var(--text-color);
        border: 0;
        box-sizing: border-box;
        outline: none;
        padding: 0 0 0 40px;
        transition: width .6s ease;
        z-index: 10;
        opacity: 0;
        cursor: pointer;

        &:focus {
            z-index: 0;
            opacity: 1;
            width: var(--width);

            ~.symbol {
                &::before {
                    width: 10%;
                }

                &:after {
                    clip-path: inset(0% 0% 0% 100%);
                    transition: clip-path .04s linear .105s;
                }
            }
        }
    }

    .symbol {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        &:before {
            content: "";
            position: absolute;
            right: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-color);
            z-index: -1;
            transition: width .6s ease;
        }

        &:after {
            content: "";
            position: absolute;
            border-radius: 50%;
            background: var(--primary-color);
            z-index: 1;
            clip-path: inset(0% 0% 0% 0%);
            transition: clip-path .04s linear .225s;
        }


    }
}

body {
    background: #E8EBF3;
    height: 100vh;
    font: 400 16px 'Varela Round', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .socials {
        position: fixed;
        display: block;
        left: 20px;
        bottom: 20px;

        >a {
            display: block;
            width: 30px;
            opacity: var(--opacity, .2);
            transform: scale(var(--scale, .8));
            transition: transform .3s cubic-bezier(0.38, -0.12, 0.24, 1.91);

            &:hover {
                --scale: 1;
            }
        }
    }
}
</style>