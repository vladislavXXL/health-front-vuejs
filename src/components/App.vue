<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>You</h1>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: 99%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">99%</div>
                </div>
            </div>
            <div class="col">
                <h1 class="text-right">Monster</h1>
                <div class="progress">
                    <div class="progress-bar bg-danger" role="progressbar" style="width: 33%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">33%</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Progress from './Progress.vue';
    export default {
        name: "App",
        data() {
            return {

            }
        },
        methods: {

        },
        computed: {

        },
        components: {
            AppProgress: Progress
        }
    }
</script>

<style scoped>
    .slide-enter {
        opacity: 0;
    }
    .slide-enter-active {
        transition: opacity 0.5s;
    }
    .slide-leave-active {
        transition: opacity 0.5s;
    }
    .slide-leave-to {
        opacity: 0;
    }
</style>
