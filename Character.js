import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from './utils.js'

//Burada class kullanabilirdim. Daha sonradan classa çeviriyorum fakat şuanlık böyle bırakma kararı aldım. Classa çevirdiğim kodu neden buraya koymadın derseniz:
//Şuanda scrimba üzerinden kurs alıyorum ve aylık para ödüyorum. Öğrenci olduğum için her ay para çıkarmakta zorlanıyorum o yüzden hiç vakit kaybetmek istemedim.
//İşin doğrusunu söylemek gerekirse constructor function ve class arasındaki farkı hiç anlamadım her daim class kullanma tarafındayım.

function Character(data) {
    Object.assign(this, data)
    this.maxHealth = this.health

    this.diceArray = getDicePlaceholderHtml(this.diceCount)

    this.getDiceHtml = function () {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map((num) =>
            `<div class="dice">${num}</div>`).join("")
    }

    this.takeDamage = function (attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, num) => total + num)
        this.health -= totalAttackScore
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }
    }

    //Css üzerinden health barı gösteren göstergenin functionu
    this.getHealthBarHtml = function () {
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                            style="width:${percent}%;">
                    </div>
                </div>`  
    }
    
    //Karakterlerin DOM a renderlanmasını sağlayan functionlardan biri
    this.getCharacterHtml = function () {
        const {  name, avatar, health  } = this
        const healthBar = this.getHealthBarHtml()
        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${this.diceArray}
                </div>
            </div>`
    }
}

export default Character