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
                <button class="btn btn-danger ml-2" @click="clickAttack">Attack</button>
                <button class="btn btn-warning ml-2" @click="clickSpecialAttack">Special Attack</button>
                <button class="btn btn-success ml-2" @click="clickHeal" :class="{'disabled': this.myHealth >= 100}">Heal</button>
                <button class="btn btn-outline-dark ml-2" @click="clickGiveUp">Give Up</button>
            </div>
        </div>
        <div class="row" v-if="gameLogs.length > 0 && monsterHealth < 100">
            <div class="col text-center border py-3 shadow-sm p-3 mb-5 bg-white rounded">
                <div class="alert" role="alert"
                     v-for="gameLog in gameLogs"
                     :class="{'alert-success': gameLog.isPlayer, 'alert-danger': !gameLog.isPlayer}"
                >
                    {{ gameLog.text }}
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
                isStart: false,
                myHealth: 100,
                monsterHealth: 100,
                gameLogs: []
            }
        },
        methods: {
            clickAttack() {
                let deltaMy = this.genNum(10);
                let deltaMonster = this.genNum(10);
                this.myHealth -= deltaMy;
                if (this.isWin()) {
                    return;
                }
                this.monsterHealth -= deltaMonster;
                this.gameLogs.unshift({isPlayer: true, text: 'Player hits monster for ' + deltaMonster});
                this.gameLogs.unshift({isPlayer: false, text: 'Monster hits player for ' + deltaMy});
                this.isWin();
            },
            clickSpecialAttack() {
                let deltaMy = this.genNum(20);
                let deltaMonster = this.genNum(20)
                this.myHealth -= deltaMy;
                if (this.isWin()) {
                    return;
                }
                this.monsterHealth -= deltaMonster;
                this.gameLogs.unshift({isPlayer: true, text: 'Player hits monster for ' + deltaMonster});
                this.gameLogs.unshift({isPlayer: false, text: 'Monster hits player for ' + deltaMy});
                this.isWin();
            },
            clickHeal() {
                if (this.myHealth < 100) {
                    let deltaMy = this.genNum(5);
                    let deltaMonster = this.genNum(2);
                    this.myHealth -= deltaMonster;
                    this.myHealth + deltaMy < 100 ? this.myHealth += deltaMy : this.myHealth = 100;
                    this.gameLogs.unshift({isPlayer: true, text: 'Player heals himself for ' + deltaMy});
                    this.gameLogs.unshift({isPlayer: false, text: 'Monster hits player for ' + deltaMonster});
                }
            },
            clickGiveUp() {
                this.clearLogs();
            },
            clearLogs() {
                this.isStart = false;
                this.myHealth = 100;
                this.monsterHealth = 100;
                this.log = false;
                this.gameLogs = [];
            },
            genNum(bound) {
                return Math.floor(Math.random() * bound) + 1;
            },
            isWin() {
                if (this.myHealth <= 0) {
                    window.alert('You lost!');
                    this.clearLogs();
                    return true;
                } else if (this.monsterHealth <= 0) {
                    window.alert('You won!');
                    this.clearLogs();
                    return true;
                }
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
