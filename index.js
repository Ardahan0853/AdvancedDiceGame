import characterData from '/data.js'
import Character from '/Character.js'

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false

//monstersArray'dan canavar alıp kullanılmasına yardımcı olan function
function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}



//İsminden de anlaşıldığı üzere attack function
function attack() {
    if(!isWaiting){
        wizard.getDiceHtml()
        monster.getDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        
        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
        }    
    }

}


//Oyun bittiğinde ekrana çıkan yazıyı yöneten function
function endGame() {
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 && monstersArray != 0 ?
        "There is still monsters left - Monsters won" : wizard.health === 0 && monster.health === 0  ? "All dead no victorious." :
        wizard.health > 0 ? "The Wizard Wins" :
            `The ${monster.name} is Victorious`

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
        }, 1500)
}


document.getElementById("attack-button").addEventListener('click', attack)


//Asıl DOM'a renderlanmayı sağlayan function
function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}
//constructor function ile yapılan karakterler
const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()