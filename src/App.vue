<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'App',
}
window.onerror = function (msg, url, lineNo, columnNo, error) {
    // ... handle error ...

    return false;
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;

}
</style>
