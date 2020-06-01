

const direction = Object.freeze({
    NORTH: "North",
    EAST: "East",
    SOUTH: "South",
    WEST: "West"
  });

export default function moveOverPath(mob, time){
    if (time == 0 || mob.hasReachedGoal()){
        return
    }
    //console.log(mob)
    let speed = mob.getSpeed()
    let currentPosition = mob.getPosition()
    let distanceToTravel = speed * time
    let path = mob.getPath()
    let targetPosition = path[mob.getStep()+1]
    let maximumStepDistance = Math.sqrt(Math.pow(currentPosition[0] - targetPosition[0], 2) + Math.pow(currentPosition[1] - targetPosition[1], 2))
    //snap to next position, recursive call
    if (maximumStepDistance <= distanceToTravel){
        let newDistanceToTravel = distanceToTravel - maximumStepDistance
        let newTime = newDistanceToTravel / speed
        //console.log("time = " + newTime)
        mob.setDistance(mob.getDistance() - maximumStepDistance)
        mob.setStep(mob.getStep() + 1)
        mob.updatePosition(targetPosition)
        moveOverPath(mob, newTime)
        return
    }
    setOrientation(mob, currentPosition, targetPosition)
    let xFactor = 0
    let yFactor = 0
    //all x movement
    if (currentPosition[0] - targetPosition[0] == 0){
        xFactor = distanceToTravel
        if (currentPosition[1] - targetPosition[1] > 0){
            xFactor = -xFactor
        }
    }
    //all y movement
    else if (currentPosition[1] - targetPosition[1] == 0){
        yFactor = distanceToTravel
        if (currentPosition[0] - targetPosition[0] > 0){
            yFactor = -yFactor
        }
    }
    //mixed movement
    else{
        let angle = Math.atan((currentPosition[0] - targetPosition[0])/(currentPosition[1] - targetPosition[1]))
        xFactor = distanceToTravel * Math.cos(angle)
        yFactor = distanceToTravel * Math.sin(angle)
    }
    
    let newPosition = [currentPosition[0] + yFactor, currentPosition[1] + xFactor]
    mob.updatePosition(newPosition)
    mob.setDistance(mob.getDistance() - distanceToTravel)
    //mob.setStep(mob.getStep()+1)
}

function setOrientation(mob, current, next){
    let x0 = current[0]
    let y0 = current[1]
    let x1 = next[0]
    let y1 = next[1]

    //all y movement
    if (x0 == x1){
        if (y0 - y1 < 0){
            mob.orientation = direction.SOUTH
            return
        }
        if (y0 - y1 > 0){
            mob.orientation = direction.NORTH
            return
        }
    }
    //all x movement
    else if (y0 == y1){
        if (x0 - x1 < 0){
            mob.orientation = direction.EAST
            return
        }
        if (y0 - x1 > 0){
            mob.orientation = direction.WEST
        }
    }
}
