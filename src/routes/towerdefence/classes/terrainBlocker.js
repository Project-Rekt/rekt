import Engine from "engine"


//any object that takes up one or more spaces on the map, and blocks the pathing of entities on the map
//space is a 2D matrix of integers where 1 is a space that will be occupied, and 0 is a space that is not occupied by the terrain blocker
// x, y is applied to the top left corner, or [0][0] of the space matrix
export default class TerrainBlocker extends Engine.Actor{
    constructor(bounds, x, y, space){
        super(bounds)
        this.space = space //null indicates occupation of single tile
        this.positionX = x;
        this.positionY = y;
        this.realX = 0;
        this.realY = 0//(y + 1) * 50 - 25;
        this.cost = 0;
    }

    getSpace(){
        if (this.space == null){
            return [[1]]
        }
        return this.space
    }
}