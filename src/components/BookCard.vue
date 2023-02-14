<template>
    <div>
        <div class="column control is-3">
            <a :href="'/books/' + book['bookId']">
                <div class="card">
                    <div class="card-image">
                        <img class="img-control" :src="book.coverImg" :alt="book['title'] + ': ' + book['description']">
                    </div>
                    <div class="card-content">
                        <p class="columns title title_text is-4">
                            {{ truncate(book['title'], 30) }}
                        </p>
                        <p class="columns subtitle subtitle_text is-6">
                            {{ truncate(book['author'], 30) }}
                        </p>
                        <p class="columns subtitle rating_p subtitle_text is-6 is-mobile">
                            <span class="column is-5 left_col">
                                <span class="rating" id="rating">{{ book['rating'] }}</span>
                                <span><i class="bi bi-star-fill star-fill"></i></span>
                                <span class="numRatings" id="numRatings">({{
                                    nFormatter(book['numRatings'], 2)
                                }})</span>
                            </span>

                            <span class="column is-3 mid_col">
                                <span class="likedPercent" id="likedPercent">{{
                                book['likedPercent'] }}%
                                </span>
                                <i class="bi bi-suit-heart-fill"></i>

                            </span>
                            <span class="column is-4 right_col">
                                <span v-if="book['price'] == null" class="price" id="price"></span>
                                <span v-else class="price" id="price"><i class="bi bi-currency-dollar"></i>{{ book['price']}}</span>
                            </span>
                        </p>
                    </div>

                    <div class="content">
                        {{ truncate(book['description'], 200) }}
                        <br>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
<script>
import { nFormatter } from '@/utils/books_helper.js';
export default {
    name: "BookCard",
    props: {
        book: Object,
        truncate: Function
    },
    methods: {
        nFormatter
    }
}

</script>
<style lang="css">
.left_col {
    display: flex;
    align-items: center;
    text-align: left;
    justify-content: flex-start;
    padding-left: 0;
    font-size: 14px !important;
}

.numRatings {
    font-size: 11px !important;
}

.right_col {
    display: flex;
    align-items: center;
    padding-right: 0;
    align-content: center;
    justify-content: space-evenly;
    font-size: 14px !important;
}

.mid_col {
    display: flex;
    align-items: center;
    /* padding-right: 0; */
    padding-left: 0;
    justify-content: flex-start;
    font-size: 14px !important;
}

.bi-currency-dollar{
    color: green;
}

.rating_p {
    display: flex;
    align-items: center;
}

.bi-suit-heart-fill {
    width: 14px;
    color: rgba(255, 68, 0, 0.751);
}

.control {
    display: flex !important;
}

.title_text {
    text-transform: uppercase;
}

.content {
    padding: 24px;
    padding-left: 12px;
}

#content {
    padding: 0;
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
    }
}

.card {
    box-shadow: 0 0 20px #aaa;
    -webkit-transition: background-color 0.1s ease-in;
    -moz-transition: background-color 0.1s ease-in;
    -o-transition: background-color 0.1s ease-in;
    transition: background-color 0.1s ease-in;
}


.card:hover {
    box-shadow: 0 0 20px #aaa;
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