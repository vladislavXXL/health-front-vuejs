<template>
    <div class="container border px-5">
        <div class="row">
            <div class="col">
                <h1>You</h1>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar"
                         :style="{width: myHealth +'%'}"
                         :aria-valuenow="myHealth" aria-valuemin="0" aria-valuemax="100"
                    >
                        {{ myHealth }}%
                    </div>
                </div>
            </div>
            <div class="col">
                <h1 class="text-right">Monster</h1>
                <div class="progress">
                    <div class="progress-bar bg-danger" role="progressbar"
                         :style="{width: monsterHealth + '%'}"
                         :aria-valuenow="monsterHealth" aria-valuemin="0" aria-valuemax="100"
                    >
                        {{ monsterHealth }}%
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col text-center border py-3 shadow-sm p-3 mb-5 bg-white rounded" v-if="!isStart">
                <button class="btn btn-success" @click="isStart = !isStart">Start new game</button>
            </div>
            <div class="col text-center border py-3 shadow-sm p-3 mb-5 bg-white rounded" v-else>
                <button class="btn ml-3"
                        v-for="button in buttons"
                        :class="button.class"
                        @click="clickButton(button)"
                >
                    {{ button.text }}
                </button>
            </div>
        </div>
        <div class="row" v-if="log">
            <div class="col text-center border py-3 shadow-sm p-3 mb-5 bg-white rounded d-flex flex-column-reverse">
                <div class="alert" role="alert"
                     v-for="(gameLog, index) in gameLogs"
                     :class="defineLogBg(index)"
                >
                    {{ gameLog }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Progress from './Progress.vue';

    function genNum(bound) {
        return Math.floor(Math.random() * bound) + 1;
    }

    export default {
        name: "App",
        data() {
            return {
                isStart: false,
                log: false,
                buttons: [
                    {class: 'btn-danger', text: 'Attack'},
                    {class: 'btn-warning', text: 'Special Attack'},
                    {class: 'btn-success', text: 'Heal'},
                    {class: 'btn-outline-dark', text: 'Give Up'},
                ],
                myHealth: 100,
                monsterHealth: 100,
                gameLogs: []
            }
        },
        methods: {
            clickButton(button) {
                if (button.text === 'Heal' && this.myHealth >= 100 && this.monsterHealth >= 100) {
                    this.log = false;
                } else {
                    this.log = true;
                }
                let deltaMy;
                let deltaMonster;
                if (button.text === 'Attack') {
                    let deltaMy = genNum(10);
                    let deltaMonster = genNum(10);
                    this.myHealth -= deltaMy;
                    this.monsterHealth -= deltaMonster;
                    this.gameLogs.push('Player hits monster for ' + deltaMonster);
                    this.gameLogs.push('Monster hits player for ' + deltaMy);
                } else if (button.text === 'Special Attack') {
                    deltaMy = genNum(20);
                    deltaMonster = genNum(20)
                    this.myHealth -= deltaMy;
                    this.monsterHealth -= deltaMonster;
                    this.gameLogs.push('Player hits monster for ' + deltaMonster);
                    this.gameLogs.push('Monster hits player for ' + deltaMy);
                } else if (button.text === 'Heal' && this.myHealth < 100) {
                    deltaMy = genNum(5);
                    deltaMonster = genNum(2);
                    this.myHealth -= deltaMonster;
                    this.myHealth + deltaMy < 100 ? this.myHealth += deltaMy : this.myHealth = 100;
                    this.gameLogs.push('Player heals himself for '+ deltaMy);
                    this.gameLogs.push('Monster hits player for ' + deltaMonster);
                } else if (button.text === 'Give Up') {
                    this.clearLogs();
                }
                if (this.myHealth <= 0 || this.monsterHealth <= 0) {
                    let winner = this.myHealth > this.monsterHealth ? 'You' : 'Super Monster';
                    window.alert(winner +' win. Game finished');
                    this.clearLogs();
                }
            },
            defineLogBg(index) {
                return index % 2 === 0 ? 'alert-success' : 'alert-danger';
            },
            clearLogs() {
                this.isStart = false;
                this.myHealth = 100;
                this.monsterHealth = 100;
                this.log = false;
                this.gameLogs = [];
            }
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
