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
