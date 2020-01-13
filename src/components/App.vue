<template>
    <div>
        <button class="btn btn-primary"
                v-on:click="showRes = !showRes">
            {{ btnText }}
        </button>
        <button class="btn" v-on:click="clear()">Clear</button>
        <hr>
        <app-progress v-bind:val="sum" v-bind:max="maxNumbers * 5"></app-progress>
        <transition name="slide">
            <h2 v-show="showRes" class="alert alert-success">Your profit: {{ sum }}</h2>
        </transition>
        <hr>
        <app-progress v-bind:val="numbers.length" v-bind:max="maxNumbers"></app-progress>
        <hr>
        <button class="btn btn-success"
                v-bind:disabled="done"
                v-on:click="addNumber()">
            Add number
        </button>
        <hr>
        <ul class="list-group">
            <li class="list-group-item"
                v-for="number in numbers">
                {{ number }}
            </li>
        </ul>
    </div>
</template>

<script>
    import Progress from './Progress.vue';
    export default {
        name: "App",
        data() {
            return {
                showRes: true,
                numbers: [],
                maxNumbers: 5
            }
        },
        methods: {
            addNumber() {
                if (!this.done) {
                    let rnd = Math.floor(Math.random() * 11) - 5;
                    this.numbers.push(rnd);
                }
            },
            clear() {
                this.numbers = [];
            }
        },
        computed: {
            sum() {
                console.log(1);
                let sum = 0;
                for (let i = 0; i < this.numbers.length; i++) {
                    sum += this.numbers[i];
                }
                return sum;
            },
            btnText() {
                return this.showRes ? 'Hide result' : 'Show result';
            },
            done() {
                return this.numbers.length >= this.maxNumbers;
            }
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
