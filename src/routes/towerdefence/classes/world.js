import Engine from "engine";
import Background from "./background";
import Block from "./block";
import EndPoint from "./endpoint";
import Line from "./line";
import Monster from "./monster";
import Node from "./node";
import Pather from "./pather";
import Player from "./player";
import Spawner from "./spawner";
import Tower from "./tower";
import WaveTimer from "./waveTimer";
import Shop from "./shop";

import LightTower from "./lightTower";
import HeavyTower from "./heavyTower";

import TowerSelect from "./placeholderclasses/towerSelect";
import WaveStart from "./placeholderclasses/waveStart";
import menuBackground from "./placeholderclasses/menuBackground";
import Weeb from "./weeb";

export default class World extends Engine.Stage {
  constructor(elem) {
    super(elem);
    this.player = new Player(500, 200);
    this.shop = new Shop();
    this.spawners = [];
    this.waveTimer = null;
    this.pather = null;
    this.events = 0;
    this.matrix = null;
    this.towers = [];
    this.buttons = [];
    //this.activeEnemies = []
  }

  /*
   *
   * create map
   * place static objects (nodes, spawners, endpoint, towers, walls)
   */
  createDemoWorld() {
    this.matrix = [
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], //0
      [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0], //1
      [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0], //2
      [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0], //3
      [0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0], //4
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0], //5
      [1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1], //6
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0], //7
      [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0], //8
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0], //9
      [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0], //10
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2] //11
      //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11]
    ];
    let waves = this.generateSpawnList(50, 3, 6, 25, 5, 0.005, 0, 2, 0.002);
    console.log(waves.length + " waves");

    this.waveTimer = new WaveTimer();

    this.waveTimer = new WaveTimer();

    //add nodes(blue dots) and lines (white gridlines)
    for (let i = 0; i <= 600; i += 50) {
      for (let j = 0; j <= 600; j += 50) {
        this.addActor(
          new Node({ x: i - 25, y: j - 25, width: 2, height: 2 }),
          0
        );
      }
      this.addActor(new Line({ x: i, y: 0, width: 1, height: 600 }), 22);
      this.addActor(new Line({ x: 0, y: i, width: 600, height: 1 }), 22);
    }
    //add obstacles
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.matrix[i][j] == 1) {
          this.addActor(new Block(j, i), 5);
        }
      }
    }
    this.addActor(new Background({ x: 0, y: 0, width: 600, height: 600 }), -1);
    this.spawners = [new Spawner(1, 1), new Spawner(6, 2), new Spawner(8, 5)];
    this.pathSpawners();

    for (let i = 0; i < this.spawners.length; i++) {
      this.addActor(this.spawners[i], 8);
    }
    this.waveTimer.setSpawners(this.spawners);
    this.waveTimer.setWaves(waves);

    this.addActor(this.waveTimer, 0);

    this.addActor(new EndPoint(11, 11), 100);
    this.tryAddNewTower(new LightTower(1, 3));
    this.tryAddNewTower(new HeavyTower(10, 4));

    this.addActor(this.player.wallet, 40);
    this.addActor(this.player.lifeCounter, 40);
    this.addActor(this.player);
    this.addActor(new menuBackground(), 0);

    //console.log(this.children)

    this.createInputhandler();
    this.createButtons();
    //console.log(this.matrix)
  }

  createButtons() {
    let b = new TowerSelect(680, 100, "Light Tower", LightTower);
    this.addActor(b);
    this.buttons.push(b);
    b = new TowerSelect(680, 175, "Heavy Tower", HeavyTower);
    this.addActor(b);
    this.buttons.push(b);
    b = new WaveStart(680, 500, "Start Wave");
    this.addActor(b);
    this.buttons.push(b);
  }

  startWave() {
    if (this.waveTimer.waveCompleted()) {
      this.waveTimer.enable();
    }
  }

  lineSpawn(startTime, gapTime, hp, speed, def, number) {
    let list = [];
    for (let i = 0; i < number; i++) {
      list.push([startTime + gapTime * i, new Monster(hp, speed, def)]);
    }
    return list;
  }

  //generates spawn list with specifications, including base stats and the amount they scale by per turn
  generateSpawnList(
    waveCount,
    spawnerCount,
    enemyCount,
    gapTime,
    hp,
    speed,
    def,
    hpScale,
    speedScale
  ) {
    let waves = [];
    let id = 1;
    for (let i = 0; i < waveCount; i++) {
      let wave = [];
      for (let j = 0; j < spawnerCount; j++) {
        let spawnList = [];
        for (let k = 0; k < enemyCount; k++) {
          let monster = new Weeb({ x: 0, y: 0, width: 0, height: 0 });

          // let monster = new Monster(
          //   hp + hpScale * i,
          //   speed + speedScale * i,
          //   def
          // );
          monster.id = id;
          id++;
          spawnList.push([gapTime * k, monster]);
        }
        wave.push(spawnList);
      }
      waves.push(wave);
    }
    return waves;
  }

  enemyReachedGoal() {
    if (!this.player.isDead()) {
      this.player.damage(1);
      //console.log("player damage! current health: " + this.player.getHp())
    }
    this.events++;
  }

  enemyKilled() {
    if (!this.player.isDead()) {
      this.player.gainMoney(1);
      //console.log("enemy killed! current money: " + this.player.getMoney())
    }
    this.events++;
  }

  playerKilled() {
    console.log("Player has died...");
    this.waveTimer.disable();
  }

  //get all enemies currently in the world that is not dead or reached the end
  getActiveEnemies() {
    let enemyLayerID = 9;
    let activeEnemies = [];
    let enemyLayer = this.children[enemyLayerID];
    if (enemyLayer == null) {
      //console.log("no enemies on map")
      return activeEnemies;
    }
    //console.log("enemies on map")
    for (let i = 0; i < enemyLayer.length; i++) {
      let a = enemyLayer[i];
      if (a instanceof Monster && a.isActive()) {
        activeEnemies.push(a);
      }
    }
    return activeEnemies;
  }

  //return true if it is possible to add a tower and add it
  //does not check money
  tryAddNewTower(tower) {
    //if (this.matrix[tower.positionY][tower.positionX] == 0){
    if (this.probeNewBlockage(tower.positionX, tower.positionY)) {
      this.addActor(tower, 10);
      this.towers.push(tower);
      this.matrix[tower.positionY][tower.positionX] = 1;
      this.pathSpawners();
      return true;
    }
    return false;
  }

  //return if adding a blockage at x y in the matrix will result in all spawners able to find an end
  probeNewBlockage(x, y) {
    let testMatrix = this.cloneMatrix(this.matrix);
    testMatrix[y][x] = 1;
    let pather = new Pather();
    pather.initializeGraph(testMatrix);
    //console.log(testMatrix)
    for (let i = 0; i < this.spawners.length; i++) {
      //console.log(this.spawners[i].getPosition()[0] + ", " + this.spawners[i].getPosition()[1])
      if (
        pather.findShortestPathToEnds(
          this.spawners[i].getPosition()[0],
          this.spawners[i].getPosition()[1]
        ) == null
      ) {
        //console.log("Blockage detected at " + x + ", " + y)
        return false;
      }
    }
    return true;
  }

  cloneMatrix(matrix) {
    let m2 = [];
    //console.log(matrix)
    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      for (let j = 0; j < matrix.length; j++) {
        row.push(matrix[i][j]);
      }
      m2.push(row);
    }
    return m2;
  }

  //iterate through all spawners in world, set path for each to an end
  pathSpawners() {
    let pather = new Pather();
    pather.initializeGraph(this.matrix);
    for (let i = 0; i < this.spawners.length; i++) {
      this.spawners[i].setPath(
        pather.findShortestPathToEnds(
          this.spawners[i].getPosition()[0],
          this.spawners[i].getPosition()[1]
        )
      );
    }
  }

  /*
   * input handler calls this
   * action is determined by what the user clicked on
   * 0 -> attempt to place turret
   * 1 -> attempt to upgrade turret
   * 2 -> attempt to start next wave
   * 0 and 2 will check and deplete player currency and give an error message otherwise
   * 3 will only activate if all enemies are dead
   * 1 will only activate if all enemies are dead
   */
  playerInteract(x, y) {
    if (this.matrix[y][x] == 0 && this.waveTimer.waveCompleted()) {
      let b = this.player.towerSelect == null;
      //console.log(b)
      if (!b) {
        let tower = new this.player.towerSelect(x, y);
        if (this.player.getMoney() >= tower.cost) {
          if (this.tryAddNewTower(new this.player.towerSelect(x, y))) {
            //Tower(30, 1, "nearest", 3, x, y))){
            this.player.spendMoney(tower.cost);
          } else {
            console.log("Can't block enemy path");
          }
        } else {
          console.log("Need " + tower.cost + " money to buy turret");
        }
      } else {
        console.log("Select a tower to purchase");
      }
    } else if (this.matrix[y][x] == 1) {
      let t = this.getTower(x, y);
      if (t == null) {
        //console.log("")
      } else {
        if (this.player.getMoney() >= 20) {
          this.upgradeTower(t);
          this.player.spendMoney(20);
        } else {
          console.log("Need 20 money to upgrade a turret");
        }
      }
    }
    /*
        else if(this.matrix[y][x] == 2 && this.waveTimer.waveCompleted()){
            this.waveTimer.enable()
        }
        */
  }

  upgradeTower(tower) {
    tower.atk += 1;
    tower.range += 0.5;
  }

  //get a tower with the given virtual xy coords
  getTower(x, y) {
    for (let i = 0; i < this.towers.length; i++) {
      let t = this.towers[i];
      if (t.positionX == x && t.positionY == y) {
        return t;
      }
    }
    return null;
  }

  checkButtons(xy) {
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].isClicked(xy[0], xy[1])) {
        this.buttons[i].activate();
      }
    }
  }

  //create handler, start it, give it references
  createInputhandler() {
    let stage = this;
    let inp = new Engine.InputHandler(document.querySelector("body"), {
      mousedown: function() {
        let xy = stage.getMouseXYSector(this);
        if (!stage.isValidSector(xy)) {
          stage.checkButtons(stage.getMouseXY(this));
          return;
        }
        //console.log(xy[0] + ", " + xy[1])//this.getMouseXY())//this.input.x + ", " + this.input.y);
        stage.playerInteract(xy[0], xy[1]);
      }
    });

    inp.startHandler();
  }
  selectBuyTower(tower) {
    this.player.towerSelect = tower;
  }

  //return if indices are in bounds of map
  isValidSector(sector) {
    return (
      sector[0] >= 0 && sector[0] <= 11 && sector[1] >= 0 && sector[1] <= 11
    );
  }
  //given indices of matrix, convert to real coordinates
  translateSectorToCoord(sector) {
    return [sector[0] * 50, sector[1] * 50];
  }
  //get mouse coords in term of matrix index
  getMouseXYSector(handler) {
    return [Math.floor(handler.input.x / 50), Math.floor(handler.input.y / 50)];
  }
  //get real mouse coords
  getMouseXY(handler) {
    return [handler.input.x, handler.input.y];
  }
}
/*
let this = new World(document.querySelector('#main'));
console.log("start")
this.createDemoWorld()
this.start();*/
