/* eslint-disable no-unused-vars */
import axios from 'axios';
import store from '../store'

export async function getBooksDataset() {

    let response = await axios.get("/books.json");
    if (response.error) {
        console.log("Error: " + response.error)
        return;
    }
    store.commit('setBooksDataset', response.data);
    return response.data;
}

function rtrim(x, characters) {
    var start = 0;
    var end = x.length - 1;
    while (characters.indexOf(x[end]) >= 0) {
        end -= 1;
    }
    return x.substr(0, end + 1).trim();
}

function ltrim(x, characters) {
    var start = 0;
    while (characters.indexOf(x[start]) >= 0) {
        start += 1;
    }
    var end = x.length - 1;
    return x.substr(start).trim();
}

export function listCleaner(list_item) {
    list_item = ltrim(list_item, "'")
    list_item = ltrim(list_item, "[")
    list_item = ltrim(list_item, "'")
    list_item = ltrim(list_item, "'")
    list_item = rtrim(list_item, "]")
    list_item = rtrim(list_item, "'")
    list_item = rtrim(list_item, "'")
    return list_item;
}

export async function applyFilters(filters, books) {
    let __filteredBooks = structuredClone(books);
    if (filters["ratings"]) {
        __filteredBooks = await sortBooksByRatings(
            __filteredBooks,
        );
    }
    if (filters["price"]) {
        __filteredBooks = await sortBooksByPrice(
            __filteredBooks,
        );
    }
    if (filters["likedPercent"]) {
        __filteredBooks = await sortBooksByPercent(
            __filteredBooks,
        );
    }

    store.commit('setSearchResultCount', __filteredBooks.length)
    store.commit('setFilteredBooks', __filteredBooks)
    store.commit('setResultsToDisplay', __filteredBooks.length)
}

export async function refilter() {
    let books = await getBooksDataset();
    let filtered_books = [];
    if (store.state.search_keyword.length > 0)
        filtered_books = getBooksFromSearchText(store.state.search_keyword, books);
    applyFilters(store.state.bookFilters, filtered_books.length > 0 ? filtered_books : books)
}

export function getBooksFromSearchText(searchValue, books) {
    let relevantBooks = [];
    relevantBooks = books.filter((book) =>
        book.title
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
        book.author
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ||
        book.language
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ||
        book.genres
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ||
        book.setting
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ||
        book.publisher
            .toLowerCase()
            .includes(searchValue.toLowerCase())
    );
    return relevantBooks;
}

export function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}

export function feelingLucky() {
    let bookId = "";
    try {
        if (store.state.books.length > 0)
            bookId = store.state.books[Math.floor(Math.random() * 499)]['bookId']
        else
            bookId = '256683.City_of_Bones'
    }
    catch (e) {
        bookId = '13079982-fahrenheit-451'
    }
    return "/books/" + bookId;
}

export async function getBookRecommendations() {
    let books = [];
    await axios.get("books.json").then(response => {
        for (let i = 0; i < 5; i++) {
            books.push(response.data[Math.floor(Math.random() * 100)]);
        }
    });

    store.commit('setBooksDataset', books)
}

export const sortBooksByRatings = async (
    _books,
) => {
    // setRatingsLoading(true);
    try {
        let _sortedBooks = [];
        _books.forEach((book) => {
            if (String(book.rating) != 'null')
                _sortedBooks.push([
                    book,
                    book.rating
                ]);
        });

        let sortedBooks = [];

        sort_by_key(_sortedBooks, 1);

        for (let index = _sortedBooks.length - 1; index >= 0; index--) {
            sortedBooks.push(_sortedBooks[index][0]);
        }

        return sortedBooks;
    } catch (error) {
        return _books;
    }
};

export const sortBooksByPercent = async (
    _books,
) => {
    // setRatingsLoading(true);
    try {
        let _sortedBooks = [];
        _books.forEach((book) => {
            if (String(book.likedPercent) != 'null')
                _sortedBooks.push([
                    book,
                    book.likedPercent
                ]);
        });

        let sortedBooks = [];

        sort_by_key(_sortedBooks, 1);

        for (let index = _sortedBooks.length - 1; index >= 0; index--) {
            sortedBooks.push(_sortedBooks[index][0]);
        }

        return sortedBooks;
    } catch (error) {
        return _books;
    }
};


export const sortBooksByPrice = async (
    _books,
) => {
    // setRatingsLoading(true);
    try {
        let _sortedBooks = [];
        _books.forEach((book) => {
            if (String(book.price) != 'null')
                _sortedBooks.push([
                    book,
                    book.price
                ]);
        });

        let sortedBooks = [];

        sort_by_key(_sortedBooks, 1);

        _sortedBooks.forEach((sortedBook) => {
            sortedBooks.push(sortedBook[0]);
        });

        return sortedBooks;
    } catch (error) {
        return _books;
    }
};

function sort_by_key(array, key) {
    return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
    });
}

export function applyFilterStates(rating_sort, price_sort, percent_sort) {
    store.commit('setFilterState', {
        ratings: rating_sort,
        price: price_sort,
        likedPercent: percent_sort
    })
}

export async function getOneRandomBook() {
    // incrementCount
    let books = [];
    let response = await axios.get("books.json");
    if (response.error) {
        console.log("Error: " + response.error)
    }
    return response.data[Math.floor(Math.random() * 499)];
}

export function nFormatter(num, digits) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
