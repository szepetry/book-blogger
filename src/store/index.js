import { createStore } from 'vuex';
import axios from 'axios'

export default createStore({
  state: {
    count: 0,
    search_keyword: "",
    books: [],
    search_result_count: 0,
    resultsToDisplay: 0,
    filteredBooks: [],
    recBooks: [
      {}, {}, {}
    ],
    bookFilters: {
      ratings: false,
      price: false,
      likedPercent: false
    },
    filterState: {
      ratings: false,
      price: false,
      likedPercent: false
    }
  },
  getters: {
  },
  mutations: {
    setSearchKeyword(state, search_keyword) {
      state.search_keyword = search_keyword
    },
    setResultsToDisplay(state, resultsToDisplay) {
      state.resultsToDisplay = resultsToDisplay
    },
    setSearchResultCount(state, search_result_count) {
      state.search_result_count = search_result_count
    },
    getBooksDataset(state) {
      axios.get("books.json").then(response => {
        state.books = response.data;
      });
    },
    setBookFilters(state, bookFilters) {
      state.bookFilters = bookFilters;
    },
    setFilterState(state, filterState) {
      state.filterState = filterState;
    },
    setRecBooksState(state, recBooks) {
      state.recBooks = recBooks;
    },
    incrementCount(state) {
      state.count += 1
    },
    resetCount(state) {
      state.count = 0
    },
    setBooksDataset(state, books_data) {
      state.books = books_data
    },
    setFilteredBooks(state, filtered_books_data) {
      state.filteredBooks = filtered_books_data
    },

  },
  actions: {
  },
  modules: {
  }
})
