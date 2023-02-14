<template>
    <div class="navbar-item" @click="$router.push(path)">
        <div class="nav_fontsize common_navbar_item">
            <router-link :to='path' class="link_color" >{{title}}</router-link>
        </div>
    </div>
</template>

<script>
import '@/css/nav_style.css'
export default {
    name: 'NavItem',
    props:{
        path: String,
        title: String
    }
}
</script>
