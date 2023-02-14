<template>
    <section class="section is-medium">
        <!-- {{ bookId }} -->
        <div class="columns">
            <!-- <div class="col-md-12"> -->
            <div class="column is-2 col1">
                <div>
                    <hr class="hr_control">
                    <div class="img_control" id="img_control"></div>
                    <span class="bold_text paddingTop">Information</span>
                    <hr class="hr_control">
                    <span class="grey_text">Book format: </span><span class="bookFormat" id="bookFormat"></span>
                    <br>
                    <span class="grey_text">Published on: </span><span class="released_on" id="released_on"></span>
                    <br>
                    <span class="grey_text">Pages: </span><span class="pages" id="pages"></span>
                    <br>
                    <!-- <br> -->
                    <!-- <span class="grey_text">Author: </span><span class="author link_text_author" id="author"></span> -->
                    <!-- <br> -->
                    <!-- <br> -->
                    <!-- <span class="grey_text">Setting: </span><span class="setting primary_color" id="setting"></span> -->
                    <!-- <br> -->
                    <br>
                    <!-- <span class="grey_text">Genres: </span><span class="genres primary_color" id="genres"></span> -->
                </div>
            </div>
            <div class="column is-10 col2">
                <div class="paddingTop"></div>
                <div class="edit_button paddingTop">
                    <!-- <button id="edit_button"><em class="fa fa-pencil" aria-hidden="false"></em></button> -->
                </div>
                <span class="title bold_text_title" id="title"></span>
                <br>
                <span class="grey_text">Liked by: </span><span class="likedPercent bold_text_popularity"
                    id="likedPercent"></span>
                <br>
                <div class="column zero_pad rating_row">
                    <span class="rating bold_text_popularity" id="rating"></span>
                    <span><i class="bi bi-star-fill star-fill"></i></span>
                    <span class="numRatings" id="numRatings"></span>
                </div>
                <span class="grey_text">Price: </span><span class="price bold_text_popularity"
                    id="price"></span>
                <br>
                <br>
                <span class="grey_text">Author: </span><span class="author link_text_author" id="author"></span>
                <br>
                <span class="grey_text">Setting: </span><span class="setting primary_color" id="setting"></span>
                <br>
                <span class="grey_text">Genres: </span><span class="genres primary_color" id="genres"></span>
                <br>
                <br>
                <span class="bold_text">Synopsis</span>
                <hr class="hr_control">
                <div class="description" id="description"></div>
            </div>
        </div>
    </section>
</template>


<script>
import { getBooksDataset, listCleaner, nFormatter } from '@/utils/books_helper.js'
import '@/css/book_style.css'

export default {
    name: "BookView",
    data() {
        return {
            bookId: this.$route.params.bookId,
            book: {}
        }
    },
    methods: {
        async getBookUsingId() {
            let books = await getBooksDataset();
            const book = books.filter(
                (book) => book["bookId"] === this.bookId
            );
            this.book = book[0];
            document.title = this.book.title + ' | Blogger';
            this.view_generater(book[0]);
        },
        // $('#edit_button').click(function () {
        //         navigate_to_edit(id);
        //     });
        navigate_to_edit(id) {
            location.href = `/edit/${id}`;
        },
        view_generater(book) {
            let image_HTML = `<img class="img_control" src='${book['coverImg']}' alt="${book['title']}: ${book['description']}"></img>`;
            document.getElementById("img_control").innerHTML = image_HTML;

            let title = `${book['title']}`;
            document.getElementById("title").innerHTML = title;

            let bookFormat = `${book['bookFormat']}`;
            document.getElementById("bookFormat").innerHTML = bookFormat;

            let released_on = `${book['publishDate']}`;
            document.getElementById("released_on").innerHTML = released_on;

            let description = `${book['description']}`;
            document.getElementById("description").innerHTML = description;

            let author = `<a href="/results/${book['author']}">${book['author']}</a>`;
            document.getElementById("author").innerHTML = author;

            // let genres_list = [];

            for (let k = 0; k < String(book['genres'].trim()).split(",").length; k++) {
                let genre_element = listCleaner(String(book['genres']).split(",")[k]);
                let genres = `<a href="/results/${genre_element}">${genre_element}</a>`;
                if (k !== String(book['genres']).split(",").length - 1) genres += ", ";
                document.getElementById("genres").innerHTML += genres;
            }

            // let setting_list = [];
            for (let k = 0; k < String(book['setting']).split(",").length; k++) {
                let setting_element = listCleaner(String(book['setting']).split(",")[k]);
                let setting = `<a href="/results/${setting_element}">${setting_element}</a>`;
                if (k !== String(book['setting']).split(",").length - 1) setting += ", ";

                document.getElementById("setting").innerHTML += setting;
            }

            let pages = `${book['pages']}`;
            document.getElementById("pages").innerHTML = pages;

            let likedPercent = `${book['likedPercent']}%`;
            document.getElementById("likedPercent").innerHTML = likedPercent;

            let rating = `${book['rating']}`;
            document.getElementById("rating").innerHTML = rating;
            
            let numRatings = `${book['numRatings']}`;
            document.getElementById("numRatings").innerHTML = '('+nFormatter(numRatings, 2)+')';
            
            let price = `${book['price']}`;
            document.getElementById("price").innerHTML = price=='null'?'N/A':('$'+price);
        }
    },
    mounted() {
        this.getBookUsingId();
    }

}
</script>


<style lang="css">

</style>