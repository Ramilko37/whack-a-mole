
const pickRandomHole = (holes) => {
    console.log(lastHole)
    const randomHole = Math.floor(Math.random() * holes.length)
    const hole = holes[randomHole];
    if (hole === lastHole) { //узнать, что в ластхол
        console.log(lastHole)
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

export default pickRandomHole;