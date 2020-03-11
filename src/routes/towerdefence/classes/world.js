import Engine from 'engine';
import Background from './background'
import Block from './block'
import EndPoint from './endpoint'
import Line from './line'
import Monster from './monster'
import Node from './node'
import Pather from './pather'
import Player from './player'
import Spawner from './spawner'
import Tower from './tower'
import WaveTimer from './waveTimer'
import InputHandler from 'engine'
import Shop from './shop';

export default class World extends Engine.Stage {
    constructor(elem){
        super(elem)
        this.player = new Player(100, 200)
        this.shop = new Shop()
        this.spawners = []
        this.waveTimer = null
        this.pather = null
        this.events = 0
        //this.activeEnemies = []
    }

    /*
     * 
     * create map
     * place static objects (nodes, spawners, endpoint, towers, walls)
     */
    createDemoWorld(){
        let matrix = [
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], //0
            [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0], //1
            [0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0], //2
            [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0], //3
            [0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0], //4
            [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0], //5
            [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1], //6
            [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0], //7
            [0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], //8
            [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0], //9
            [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0], //10
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2], //11
          //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11]
        ];
        let waves = this.generateSpawnList(10, 3, 6, 50, 5, .3, 0, 3, .05)
        console.log(waves.length + " waves")
        /*
        let waves = [
            [//wave1
                //spawner1
                    this.lineSpawn(30, 10, 3, .07, 0, 10),
                //spawner2
                    this.lineSpawn(10, 4, 1, .04, 0, 20),
                //spawner3
                    this.lineSpawn(50, 20, 2, .07, 0, 5)
            ],
            [//wave2
                [//spawner1
                    [30, new Monster(10, .1, 0)],
                    [100, new Monster(5, .02, 0)],
                    [150, new Monster(20, .07, 0)],
                    [250, new Monster(4, .8, 0)]
                ],
                [//spawner2
                    [30, new Monster(10, .1, 0)],
                    [50, new Monster(5, .02, 0)],
                    [70, new Monster(10, .02, 0)],
                    [120, new Monster(10, .4, 0)],
                    [300, new Monster(300, .06, 0)]
                ],
                [//spawner3
                    [30, new Monster(10, .1, 0)],
                    [90, new Monster(5, .02, 0)],
                    [130, new Monster(10, .02, 0)],
                    [200, new Monster(10, .4, 0)],
                    [230, new Monster(50, .01, 0)]
                ]
            ]
        ]
        */
        //console.log(waves[0])
        this.waveTimer = new WaveTimer()

        

        for (let i = 0; i <= 600; i += 50) {
            for (let j = 0; j <= 600; j += 50) {
                this.addActor(new Node({ x: i - 25, y: j - 25, width: 2, height: 2 }), 0);
            }
            this.addActor(new Line({ x: i, y: 0, width: 1, height: 600 }), 1);
            this.addActor(new Line({ x: 0, y: i, width: 600, height: 1 }), 1);
        }
        for(let i = 0; i < matrix.length; i++){
            for(let j = 0; j < matrix[0].length; j++){
                if(matrix[i][j] == 1){
                    this.addActor(new Block(j, i), 5)
                }
            }
        }
        this.addActor(new Background({x: 0, y: 0, width: 600, height: 600}), -1)
        this.spawners =[
            new Spawner(1, 1),
            new Spawner(6, 2),
            new Spawner(8, 5)
        ]
        this.pather = new Pather()
        this.pather.initializeGraph(matrix)
        for(let i = 0; i < this.spawners.length; i++){
            this.spawners[i].setPath(this.pather.findShortestPathToEnds(this.spawners[i].getPosition()[0], this.spawners[i].getPosition()[1]))
            this.addActor(this.spawners[i], 8);
        }
        this.waveTimer.setSpawners(this.spawners)
        this.waveTimer.setWaves(waves)

        this.addActor(this.waveTimer, 0)
        
        this.addActor(new EndPoint(11, 11), 8);
        this.addActor(new Tower(30, 1, "nearest", 3, 2, 3), 10);
        this.addActor(new Tower(10, .3, "nearest", 3, 7, 1), 10);
        this.addActor(new Tower(45, 4, "nearest", 2, 3, 8), 10);
        this.addActor(new Tower(60, 20, "nearest", 6, 8, 7), 10);

        this.addActor(this.player)

        //console.log(this.children)
    }

    lineSpawn(startTime, gapTime, hp, speed, def, number){
        let list = []
        for(let i = 0; i < number; i++){
            list.push([startTime + gapTime*i,new Monster(hp, speed, def)])
        }
        return list
    }

    generateSpawnList(waveCount, spawnerCount, enemyCount, gapTime, hp, speed, def, hpScale, speedScale){
        let waves = []
        let id = 1
        for(let i = 0; i < waveCount; i++){
            let wave = []
            for(let j = 0; j < spawnerCount; j++){
                let spawnList = []
                for(let k = 0; k < enemyCount; k++){
                    let monster = new Monster(hp + hpScale*i, speed + speedScale*i, def)
                    monster.id = id
                    id++
                    spawnList.push([gapTime*k, monster])
                }
                wave.push(spawnList)
            }
            waves.push(wave)
        }
        return waves
    }

    enemyReachedGoal(){
        if(!this.player.isDead()){
            this.player.damage(1)
            console.log("player damage! current health: " + this.player.getHp())
        }
        this.events++
    }

    enemyKilled(){
        if (!this.player.isDead()){
            this.player.gainMoney(1)
            console.log("enemy killed! current money: " + this.player.getMoney())
        }
        this.events++
    }

    playerKilled(){
        console.log("Player has died...")
        this.waveTimer.disable()
    }


    getActiveEnemies(){
        let enemyLayerID = 9
        let activeEnemies = []
        let enemyLayer = this.children[enemyLayerID]
        if (enemyLayer == null){
            //console.log("no enemies on map")
            return activeEnemies
        }
        //console.log("enemies on map")
        for (let i = 0; i < enemyLayer.length; i++){
            let a = enemyLayer[i]
            if (a instanceof Monster && a.isActive()){
                activeEnemies.push(a)
            }
        }
        return activeEnemies
    }
    
}
/*
let this = new World(document.querySelector('#main'));
console.log("start")
this.createDemoWorld()
this.start();*/