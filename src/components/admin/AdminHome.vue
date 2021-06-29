<template>
    <div>
        <admin-nav-menu></admin-nav-menu>
        <router-view/>
    </div>
</template>

<script>
    import AdminNavMenu from '../common/AdminNavMenu'
    export default {
        name: "AdminHome",
        components: { AdminNavMenu }
    }
</script>

<style scoped>

</style>