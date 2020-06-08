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

import Monkey from "./monkey";
import Gril from "./gril";
import Normie from "./normie";
import Weeb from "./weeb";
import TowerSelect from "./ui/towerSelect";
import WaveStart from "./ui/waveStart";

import GUI from "../classes/ui/gui";
import Notification from "../classes/ui/notification"
import TestMulti from "./ui/testMulti";
import Image from './ui/image';
import TowerSelectMenu from './ui/towerSelectMenu';
import Button from './ui/button';
import DropdownButton from './ui/dropdownButton';
import OptionsMenu from './ui/optionsMenu';

import SmallBlock from './smallBlock'
import MediumBlock from './mediumBlock'
import LargeBlock from './largeBlock'

export default class World extends Engine.Stage {
  constructor(elem, fCanvas) {
    super(elem);
    this.fCanvas = fCanvas;
    this.player = new Player(500, 500);
    this.shop = new Shop();
    this.spawners = [];
    this.waveTimer = null;
    this.pather = null;
    this.events = 0;
    this.matrix = null;
    this.ownershipMatrix = null;
    this.towers = [];
    this.buttons = [];
    this.images = [];
    this.activeEnemies = []

    this.gui = new GUI(document.querySelector('.ui'), this);




    this.startX = 25
    this.startY = 25
    this.blockWidth = 65
    this.blockHeight = 10
    this.numBlocksWide = 0
    this.numBlocksTall = 0
    this.totalWidth = 0
    this.totalHeight = 0
  }

  /*
   *
   * create map
   * place static objects (nodes, spawners, endpoint, towers, walls)
   */
  createDemoWorld() {
    this.matrix = [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //0
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], //2
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0], //3
      [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0], //4
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0], //5
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], //6
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //7
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], //8
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9 //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2] //11
      //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11]
    ];

    this.numBlocksWide = this.matrix[0].length
    this.numBlocksTall = this.matrix.length
    this.totalHeight = this.numBlocksTall * this.blockHeight
    this.totalWidth = this.numBlocksWide * this.blockWidth

    this.waveTimer = new WaveTimer();

    this.ownershipMatrix = []; //place walls and set ownership
    for(let i = 0; i < this.matrix.length; i++){
      let row = []
      for(let j = 0; j < this.matrix[0].length; j++){
        if (this.matrix[i][j] == 1) {
          let block = new Block(j, i)
          this.tryAddNewTerrainBlocker(block)
          row.push(block)
          this.addActor(block, 5);
        }
        else if(this.matrix[i][j] == 2){
          let endpoint = new EndPoint(j, i)
          row.push(endpoint)
          this.addActor(endpoint, 8)
        }
        else if(this.matrix[i][j] == 3){
          let spawner = new Spawner(j, i)
          spawner.setScaleFunction(this.simpleScale)
          row.push(spawner)
          this.addActor(spawner, 8)
          this.spawners.push(spawner)
        }
        else{
          row.push(null)
        }
      }
      this.ownershipMatrix.push(row)
    }
    let waves = this.generateSpawnList(50, this.spawners.length, 6, 1000, [Monkey, Normie, Gril, Weeb]);
    console.log(waves.length + " waves");


    this.pathSpawners();
    this.waveTimer.setSpawners(this.spawners);
    this.waveTimer.setWaves(waves);
    this.addActor(this.waveTimer, 0);


    //add nodes(blue dots) and lines (white gridlines)
    for (let i = 0; i <= this.totalHeight; i += this.blockHeight) {
      for (let j = 0; j <= this.totalWidth; j += this.blockWidth) {
        //this.addActor(
        //  new Node({ x: i - 25, y: j - 25, width: 2, height: 2 }),
        //  0
        //);
        this.addActor(new Line({ x: j + this.startX, y: this.startY, width: 1, height: this.totalHeight }), 22);
      }
      this.addActor(new Line({ x: this.startX, y: i + this.startY, width: this.totalWidth, height: 1 }), 22);
    }
    
    this.addActor(new Background("#000000"), -1)//{ x: 0, y: 0, width: 600, height: 600 }), -1);
    //this.spawners = [new Spawner(1, 1), new Spawner(6, 2), new Spawner(8, 5)];
    
    

    //this.addActor(new EndPoint(11, 11), 100);
    this.tryAddNewTerrainBlocker(new LightTower(1, 3));
    this.tryAddNewTerrainBlocker(new HeavyTower(10, 4));

    this.gui.addInterface(this.player.wallet);
    this.gui.addInterface(this.player.lifeCounter);
    this.addActor(this.player);

    //console.log(this.children)

    this.createInputhandler();
    this.createButtons();
    //this.createImages();
    //console.log(this.matrix)
  }

  blockIsAvailable(x, y){
    return this.matrix[y][x] == 0 && this.ownershipMatrix[y][x] == null
  }

  createButtons() {
    //let b = new TowerSelect(680, 100, "Light Tower", LightTower);
    //this.addActor(b);
    //this.gui.addInterface(b);
    //this.buttons.push(b);
    //b = new TowerSelect(680, 175, "Heavy Tower", HeavyTower);
    //this.addActor(b);
    //this.gui.addInterface(b);
    //this.buttons.push(b);
    let b = new TowerSelectMenu(680, 65, "Towers", ["Light Tower", "Heavy Tower"], [LightTower, HeavyTower])
    this.gui.addInterface(b);
    this.buttons.push(b);
    b = new WaveStart(680, 635, "Start Wave");
    this.gui.addInterface(b);
    //this.addActor(b);
    this.buttons.push(b);
    //let testMulti = new TestMulti(600, 600, "TESTING TOOLTIP", "Hi!")
    //this.gui.addInterface(testMulti);
    b = new TowerSelectMenu(680, 310, "Obstacles", ["Small", "Medium", "Large"], [SmallBlock, MediumBlock, LargeBlock])
    this.gui.addInterface(b);
    this.buttons.push(b);
    /*
    b = new DropdownButton(680, 310, "Obstacles", ["1x1", "2x1", "2x2"]);
    this.gui.addInterface(b);
    this.buttons.push(b);
    */

    //b = new DropdownButton(420, 635, "Options", ["Resume", "Pause", "Restart", "Quit"])
    b = new OptionsMenu(200, 635, "Options", ["Resume", "Pause", "Restart", "Quit", "Help"]);
    this.gui.addInterface(b);
    this.buttons.push(b);
  }

/*
  createImages() {
    let i = new Image("/../spriteAssets/world/heart.png", 30, 605, 80, 80);
    this.gui.addInterface(i);
    this.images.push(i);
    i = new Image("/../spriteAssets/world/tear.png", 140, 605, 80, 80);
    this.gui.addInterface(i);
    this.images.push(i);
  }
*/

  startWave() {
    if (this.waveTimer.waveCompleted()) {
      this.waveTimer.enable();
    }
  }


  simpleScale(n){
    return 1 + (1/5)*n
  }

  addActive(mob){
    this.activeEnemies.push(mob)
  }

  removeActive(mob){
    let index = this.activeEnemies.indexOf(mob)
    console.log(index)
    if (index > -1){
      this.activeEnemies.splice(index, 1)
    }
  }



  //generates spawn list with specifications, including base stats and the amount they scale by per turn
  generateSpawnList(
    waveCount,
    spawnerCount,
    enemyCount,
    gapTime,
    spawnOptions
  ) {
    let waves = [];
    let id = 1;
    for (let i = 0; i < waveCount; i++) {
      let wave = [];
      for (let j = 0; j < spawnerCount; j++) {
        let spawnList = [];
        let monsterType = spawnOptions[Math.floor(Math.random()*spawnOptions.length)]
        //console.log(monsterType)
        for (let k = 0; k < enemyCount; k++) {
          //let monster = new Weeb({ x: 0, y: 0, width: 0, height: 0 });

          // let monster = new Monster(
          //   hp + hpScale * i,
          //   speed + speedScale * i,
          //   def
          // );
          //monster.id = id;
          //id++;
          //spawnList.push([gapTime * k, monster]);
          spawnList.push([gapTime * k, monsterType])
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

  enemyKilled(bounty) {
    if (!this.player.isDead()) {
      this.player.gainMoney(bounty);
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
    //console.log(this.activeEnemies.length)
    return this.activeEnemies
    /* implementation outdated with changing z values
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
    */
  }

  //return true if it is possible to add a terrain blocker and add it
  //does not check money
  //in theory terrain blocker can be of any size and combination of blocked cells
  tryAddNewTerrainBlocker(blocker){
    let x = blocker.positionX;
    let y = blocker.positionY;
    let space = blocker.getSpace();
   if (!this.probeMassBlockage(x, y, space))
   {
      return false;
   }
   this.addActor(blocker, 10);
   if(blocker instanceof Tower){
     this.towers.push(blocker);
   }
   for(let i = 0; i < space.length; i++){
     for(let j = 0; j < space[0].length; j++){
      this.matrix[y + i][x + j] = 1;
      this.ownershipMatrix[y + i][x + j] = blocker;
     }
    }
    this.pathSpawners();
    return true;
  }


  //return true if adding all the blocked cells starting from xy as top left corner will result in all spawners able to find the end 
  probeMassBlockage(x, y, blockage){
    if (y + blockage.length > this.matrix.length || x + blockage[0].length > this.matrix[0].length){
      return false //blockage results in out of bounds
    }

    let testMatrix = this.cloneMatrix(this.matrix);
    for(let i = 0; i < blockage.length; i++){ //place all 1's from blockage into test matrix
      for (let j = 0; j < blockage[0].length; j++){
        if (blockage[i][j] == 0){ //no blockage to add
          continue;
        }
        if (blockage[i][j] == 1 && testMatrix[i+y][j+x] == 0){
          testMatrix[i+y][j+x] = 1; //blockage can fit
          continue;
        }
        //console.log("false")
        return false; //blockage does not fit here
      }
    }

    let pather = new Pather(); //test all spawners
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
      let b = this.player.blockerSelect == null;
      //console.log(b)
      if (!b) {
        let tower = new this.player.blockerSelect(x, y);
        if (this.player.getMoney() >= tower.cost) {
          if (this.tryAddNewTerrainBlocker(tower)) {
            //Tower(30, 1, "nearest", 3, x, y))){
            this.player.spendMoney(tower.cost);
          } else {
            this.gui.addInterface(new Notification("Can't block enemy path"));
          }
        } else {
          this.gui.addInterface(new Notification("Need " + tower.cost + " money to buy turret"));
        }
      } else {
        this.gui.addInterface(new Notification("Select a tower to purchase"));
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
          this.gui.addInterface(new Notification("Need 20 money to upgrade a turret"));
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
          //stage.checkButtons(stage.getMouseXY(this));
          return;
        }
        //console.log(xy[0] + ", " + xy[1])//this.getMouseXY())//this.input.x + ", " + this.input.y);
        stage.playerInteract(xy[0], xy[1]);
      }
    });

    inp.startHandler();
  }
  selectBuyTower(tower) {
    this.selectBuyBlocker(tower)
  }

  selectBuyBlocker(blocker){
    console.log(blocker)
    this.player.blockerSelect = blocker
  }

  //return if indices are in bounds of map
  isValidSector(sector) {
    return (
      sector[0] >= 0 && sector[0] <= this.numBlocksWide && sector[1] >= 0 && sector[1] <= this.numBlocksTall
    );
  }
  //given indices of matrix, convert to real coordinates
  translateSectorToCoord(sector) {
    return [sector[0] * this.blockWidth, sector[1] * this.blockHeight];
  }
  //get mouse coords in term of matrix index
  getMouseXYSector(handler) {
    return [Math.floor((handler.input.x - this.startX) / this.blockWidth), Math.floor((handler.input.y - this.startY) / this.blockHeight)];
  }
  //get real mouse coords
  getMouseXY(handler) {
    return [handler.input.x, handler.input.y];
  }
}