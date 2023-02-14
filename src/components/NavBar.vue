<template>
    <nav class="navbar is-fixed-top is-black navbar-height">
        <div class="navbar-brand navbar-height">
            <router-link to="/" class="navbar-item nav_fontsize">Home</router-link>
            <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu"
                @click="showMobileMenu = !showMobileMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu nav_menu_props zero_pad" id="navbar-menu"
            v-bind:class="{ 'is-active': showMobileMenu, 'nav_menu_padding': !showMobileMenu }">
            <SearchBar v-bind:class="{ 'display_search': !showMobileMenu }" />
            <NavItem title="Books" path="/books" />
            <template v-if="$store.state.books.length > 0">
                <NavItem title="Feeling lucky" :path="feelingLucky()" />
            </template>
            <SearchBar v-bind:class="{ 'display_search': showMobileMenu }" />
        </div>


    </nav>
</template >

<script>
import NavItem from '@/components/NavItem.vue';
import SearchBar from '@/components/SearchBar.vue';
import { feelingLucky, getBooksDataset } from '@/utils/books_helper';

export default {
    name: "NavBar",
    components: {
        NavItem,
        SearchBar
    },
    data() {
        return {
            showMobileMenu: false
        }
    },
    methods: {
        feelingLucky
    },
    async mounted(){
        await getBooksDataset();
    }
    // async beforeMount() {
    //     await getBooksDataset();
    // },
    // async beforeCreate(){
    //     await getBooksDataset();
    // }
};
</script>

<style lang="scss" scoped>
// $navbar-background-color: black;
.zero_pad {
    padding: 0;
}

.navbar-height {
    height: 50px !important;
}

.display_search {
    display: none;
}

.repos {
    align-items: center;
    display: flex;
}

.nav_menu_props {
    background-color: black;
    float: none;
    justify-content: end;
}

.nav_menu_padding {
    // padding-right: 60px;
}
</style>