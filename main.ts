namespace SpriteKind {
    export const MineHoming = SpriteKind.create()
    export const Weapon = SpriteKind.create()
    export const wallside = SpriteKind.create()
    export const wallbtm = SpriteKind.create()
    export const ContWeapon = SpriteKind.create()
    export const Blast = SpriteKind.create()
    export const Explosion = SpriteKind.create()
    export const ContShield = SpriteKind.create()
    export const Asteroid = SpriteKind.create()
    export const MineStatic = SpriteKind.create()
    export const Turrel = SpriteKind.create()
    export const PlasmaShot = SpriteKind.create()
    export const Shield = SpriteKind.create()
}
namespace StatusBarKind {
    export const Shield = StatusBarKind.create()
}
/**
 * • add start splash
 * 
 * • add boss level
 */
function spawnJet () {
    jet = sprites.create(assets.image`inferjet`, SpriteKind.Player)
    jet.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.8)
    jet.setStayInScreen(true)
    controller.moveSprite(jet, 80, 20)
    statusbar.value = 100
}
function turrelBlastShot () {
    if (turrelBot.x > 0) {
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1, 1489, 255, 0, 396, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
        turrelBlast = sprites.create(assets.image`turrelBlast`, SpriteKind.Blast)
        turrelBlast.setPosition(turrelBot.x, turrelBot.y)
        turrelBlast.z += -5
        animation.runImageAnimation(
        turrelBlast,
        assets.animation`turrelBlast`,
        200,
        true
        )
        turrelBlast.setFlag(SpriteFlag.AutoDestroy, true)
        turrelBlast.follow(jet, 22)
        sprites.destroy(turrelBot, effects.fire, 500)
    }
}
sprites.onOverlap(SpriteKind.Blast, SpriteKind.MineHoming, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
    info.changeScoreBy(3)
})
sprites.onDestroyed(SpriteKind.Turrel, function (sprite) {
    turrels += -1
})
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.ContWeapon, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
    info.changeScoreBy(7)
})
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.MineStatic, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    laserShot(weapontype)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ContShield, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    statusbar.value += randint(5, 20)
    music.play(music.createSoundEffect(WaveShape.Sine, 1132, 2381, 146, 0, 444, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
})
function spawnMineHoming () {
    mineHoming = sprites.create(assets.image`bomb`, SpriteKind.MineHoming)
    mineHoming.setPosition(randint(0, scene.screenWidth()), 0)
    mineHoming.setVelocity(randint(-4, 4), randint(12, 20))
    mineHoming.z += -5
    animation.runImageAnimation(
    mineHoming,
    assets.animation`mine-homing`,
    333,
    true
    )
    mineHoming.setFlag(SpriteFlag.AutoDestroy, true)
    mineHoming.follow(jet, 24)
}
function doExplosion (expsprite: Sprite) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 1534, 255, 0, 150, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    explosion = sprites.create(assets.image`explosion-place`, SpriteKind.Explosion)
    explosion.setPosition(expsprite.x, expsprite.y)
    explosion.setVelocity(expsprite.vx, expsprite.vy)
    explosion.z = 1
    explosion.setFlag(SpriteFlag.AutoDestroy, true)
    animation.runImageAnimation(
    explosion,
    assets.animation`explosion`,
    100,
    false
    )
    pause(150)
    sprites.destroy(expsprite)
}
statusbars.onZero(StatusBarKind.Shield, function (status) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.moveSprite(jet, 0, 0)
    doExplosion(jet)
    pause(1000)
    game.gameOver(false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    game.reset()
})
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.MineStatic, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
    info.changeScoreBy(2)
})
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Asteroid, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.MineHoming, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PlasmaShot, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    controller.moveSprite(jet, 4, 2)
    doShieldImpact(jet)
    doExplosion(otherSprite)
    scene.cameraShake(10, 200)
    statusbar.value += randint(-8, -2)
    pause(200)
    sprites.destroy(inferShield)
    controller.moveSprite(jet, 80, 20)
})
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.ContShield, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
})
sprites.onOverlap(SpriteKind.Blast, SpriteKind.ContWeapon, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
})
sprites.onOverlap(SpriteKind.Blast, SpriteKind.Turrel, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
    info.changeScoreBy(3)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ContWeapon, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    weapontype += 1
    music.play(music.createSoundEffect(WaveShape.Triangle, 333, 2643, 255, 0, 496, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
sprites.onCreated(SpriteKind.Turrel, function (sprite) {
    turrels += 1
})
function spawnAsteroid (num: number) {
    asteroid = sprites.create(assets.image`ast-1`, SpriteKind.Asteroid)
    if (num == 1) {
        animation.runImageAnimation(
        asteroid,
        assets.animation`aster-1`,
        444,
        true
        )
    }
    if (num == 2) {
        animation.runImageAnimation(
        asteroid,
        assets.animation`aster-2`,
        333,
        true
        )
    }
    if (num == 3) {
        animation.runImageAnimation(
        asteroid,
        assets.animation`aster-3`,
        399,
        true
        )
    }
    asteroid.setPosition(randint(0, scene.screenWidth()), 0)
    asteroid.setVelocity(randint(-3, 3), randint(8, 12))
    asteroid.z += -5
    asteroid.setFlag(SpriteFlag.AutoDestroy, true)
}
sprites.onOverlap(SpriteKind.Blast, SpriteKind.ContShield, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
})
sprites.onOverlap(SpriteKind.Blast, SpriteKind.MineStatic, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
    info.changeScoreBy(3)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Asteroid, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.moveSprite(jet, 4, 2)
    doShieldImpact(jet)
    doExplosion(otherSprite)
    scene.cameraShake(10, 200)
    statusbar.value += randint(-10, -5)
    pause(200)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.moveSprite(jet, 80, 20)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.MineStatic, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    controller.moveSprite(jet, 4, 2)
    doShieldImpact(jet)
    doExplosion(otherSprite)
    scene.cameraShake(10, 200)
    statusbar.value += randint(-15, -10)
    pause(200)
    sprites.destroy(inferShield)
    controller.moveSprite(jet, 80, 20)
})
function spawnMineStatic () {
    mineStatic = sprites.create(assets.image`bomb-2`, SpriteKind.MineStatic)
    mineStatic.setPosition(randint(0, scene.screenWidth()), 0)
    mineStatic.setVelocity(randint(-4, 4), randint(12, 20))
    mineStatic.z += -5
    mineStatic.setFlag(SpriteFlag.AutoDestroy, true)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.MineHoming, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    controller.moveSprite(jet, 4, 2)
    doShieldImpact(jet)
    doExplosion(otherSprite)
    scene.cameraShake(10, 200)
    statusbar.value += randint(-20, -15)
    pause(200)
    sprites.destroy(inferShield)
    controller.moveSprite(jet, 80, 20)
})
function laserShot (num: number) {
    // cannon
    if (num == 1) {
        railgun = sprites.create(assets.image`cannon`, SpriteKind.Weapon)
        railgun.setPosition(jet.x - 0, jet.y - 14)
        railgun.setVelocity(0, -33)
        railgun.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Noise, 3419, 1, 255, 0, 107, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    // cannon
    if (num == 2) {
        railgun = sprites.create(assets.image`vulkan`, SpriteKind.Weapon)
        railgun.setPosition(jet.x - 0, jet.y - 13)
        railgun.setVelocity(0, -55)
        railgun.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Noise, 4211, 1, 255, 0, 104, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num == 3) {
        laser = sprites.create(assets.image`lasershot-1x`, SpriteKind.Weapon)
        laser.setPosition(jet.x - 0, jet.y - 10)
        laser.setVelocity(0, -222)
        laser.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Triangle, 1181, 137, 255, 0, 320, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (num == 4) {
        laser = sprites.create(assets.image`lasershot-2x`, SpriteKind.Weapon)
        laser.setPosition(jet.x - 0, jet.y - 8)
        laser.setVelocity(0, -222)
        laser.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Triangle, 1288, 137, 255, 0, 320, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (num == 5) {
        plasma = sprites.create(assets.image`plasmashot-2x`, SpriteKind.Weapon)
        plasma.setPosition(jet.x - 0, jet.y - 12)
        plasma.setVelocity(0, -111)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 878, 499, 255, 0, 557, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num == 6) {
        plasma = sprites.create(assets.image`plasmashot-3x`, SpriteKind.Weapon)
        plasma.setPosition(jet.x - 0, jet.y - 12)
        plasma.setVelocity(0, -111)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1199, 499, 255, 0, 557, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num == 7) {
        plasma = sprites.create(assets.image`phusionshot-3x`, SpriteKind.Weapon)
        plasma.setPosition(jet.x - 0, jet.y - 12)
        plasma.setVelocity(0, -144)
        plasmasideleft45 = sprites.create(assets.image`side-left-45`, SpriteKind.Weapon)
        plasmasideleft45.setPosition(jet.x - 1, jet.y - 2)
        plasmasideleft45.setVelocity(-77, -144)
        plasmasideright45 = sprites.create(assets.image`side-right-45`, SpriteKind.Weapon)
        plasmasideright45.setPosition(jet.x + 1, jet.y - 2)
        plasmasideright45.setVelocity(77, -144)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideleft45.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideright45.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1244, 499, 255, 0, 557, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num == 8) {
        plasma = sprites.create(assets.image`phusionshot-3x`, SpriteKind.Weapon)
        plasma.setPosition(jet.x - 0, jet.y - 12)
        plasma.setVelocity(0, -144)
        plasmasideleft45 = sprites.create(assets.image`side-left-45`, SpriteKind.Weapon)
        plasmasideleft45.setPosition(jet.x - 1, jet.y - 2)
        plasmasideleft45.setVelocity(-77, -144)
        plasmasideright45 = sprites.create(assets.image`side-right-45`, SpriteKind.Weapon)
        plasmasideright45.setPosition(jet.x + 1, jet.y - 2)
        plasmasideright45.setVelocity(77, -144)
        plasmasideright90 = sprites.create(assets.image`side-right-90`, SpriteKind.Weapon)
        plasmasideright90.setPosition(jet.x + 0, jet.y - 7)
        plasmasideright90.setVelocity(144, 0)
        plasmasideleft90 = sprites.create(assets.image`side-left-90`, SpriteKind.Weapon)
        plasmasideleft90.setPosition(jet.x - 0, jet.y - 7)
        plasmasideleft90.setVelocity(-144, 0)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideleft45.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideright45.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideleft90.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideright90.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1645, 499, 255, 0, 557, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
}
function doShieldImpact (jet: Sprite) {
    inferShield = sprites.create(assets.image`infershield`, SpriteKind.Shield)
    inferShield.setPosition(jet.x, jet.y)
    inferShield.z += -4
    controller.moveSprite(inferShield, 4, 2)
}
sprites.onOverlap(SpriteKind.Blast, SpriteKind.Asteroid, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
    info.changeScoreBy(3)
})
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Blast, function (sprite, otherSprite) {
    otherSprite.y += randint(-15, -25)
    otherSprite.x += randint(-10, 10)
})
function spawnTurrel () {
    turrelBot = sprites.create(assets.image`turrel`, SpriteKind.Turrel)
    turrelBot.setPosition(randint(0, scene.screenWidth()), 0)
    turrelBot.setVelocity(randint(-4, 4), randint(8, 10))
    turrelBot.z += -5
    turrelBot.setFlag(SpriteFlag.AutoDestroy, true)
    turrelBot.follow(jet, 12)
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Turrel, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 100)
    if (Math.percentChance(50)) {
        doExplosion(otherSprite)
        info.changeScoreBy(7)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Blast, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    controller.moveSprite(jet, 4, 2)
    doShieldImpact(jet)
    doExplosion(otherSprite)
    scene.cameraShake(10, 200)
    statusbar.value += randint(-16, -8)
    pause(200)
    sprites.destroy(inferShield)
    controller.moveSprite(jet, 80, 20)
})
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.MineHoming, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
    info.changeScoreBy(5)
})
function turrelPlasmaShot (thisTurrel: Sprite) {
    music.play(music.createSoundEffect(WaveShape.Triangle, 1578, 284, 230, 0, 443, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    turrelPlasma = sprites.create(assets.image`turrelPlasma`, SpriteKind.PlasmaShot)
    turrelPlasma.setPosition(thisTurrel.x, thisTurrel.y + 4)
    turrelPlasma.setVelocity(0, 100)
    turrelPlasma.z += -5
    turrelPlasma.setFlag(SpriteFlag.AutoDestroy, true)
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.ContShield, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
    info.changeScoreBy(7)
})
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.ContWeapon, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Turrel, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    controller.moveSprite(jet, 4, 2)
    doShieldImpact(jet)
    doExplosion(otherSprite)
    scene.cameraShake(10, 200)
    statusbar.value += randint(-15, -5)
    pause(200)
    sprites.destroy(inferShield)
    controller.moveSprite(jet, 80, 20)
})
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.Asteroid, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
})
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.Turrel, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
})
let contShield: Sprite = null
let stjerne: Sprite = null
let contWeapon: Sprite = null
let turrelPlasma: Sprite = null
let plasmasideleft90: Sprite = null
let plasmasideright90: Sprite = null
let plasmasideright45: Sprite = null
let plasmasideleft45: Sprite = null
let plasma: Sprite = null
let laser: Sprite = null
let railgun: Sprite = null
let mineStatic: Sprite = null
let asteroid: Sprite = null
let inferShield: Sprite = null
let explosion: Sprite = null
let mineHoming: Sprite = null
let turrelBlast: Sprite = null
let turrelBot: Sprite = null
let jet: Sprite = null
let statusbar: StatusBarSprite = null
let weapontype = 0
scene.setBackgroundColor(15)
game.splash("ER DU KLAR?", "DA TRYKK A")
weapontype = 1
let turrels = 0
info.setScore(0)
statusbar = statusbars.create(30, 2, StatusBarKind.Shield)
statusbar.setColor(8, 2)
statusbar.positionDirection(CollisionDirection.Top)
statusbar.setOffsetPadding(-60, 0)
spawnJet()
game.onUpdate(function () {
    if (weapontype >= 5 && turrels > 0) {
        for (let thisTurrel of sprites.allOfKind(SpriteKind.Turrel)) {
            if (Math.abs(thisTurrel.x - jet.x) < 5) {
                turrelPlasmaShot(thisTurrel)
            }
        }
    }
})
game.onUpdateInterval(15000, function () {
    if (info.score() > 10 && weapontype < 8) {
        if (Math.percentChance(33)) {
            contWeapon = sprites.create(assets.image`wp-cont`, SpriteKind.ContWeapon)
            contWeapon.setPosition(randint(0, scene.screenWidth()), 0)
            contWeapon.setVelocity(randint(-1, 1), 15)
            contWeapon.z += -5
            contWeapon.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
})
game.onUpdateInterval(2000, function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Explosion)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
})
game.onUpdateInterval(100, function () {
    if (Math.percentChance(50)) {
        stjerne = sprites.createProjectileFromSide(assets.image`stjerne`, 0, randint(20, 30))
        stjerne.setPosition(randint(0, scene.screenWidth()), 0)
        stjerne.z += -6
        stjerne.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
game.onUpdateInterval(200, function () {
    if (Math.percentChance(5 + 5 * weapontype)) {
        spawnAsteroid(randint(1, 3))
    }
    if (Math.percentChance(5) && weapontype >= 2) {
        spawnMineStatic()
    }
    if (Math.percentChance(5) && weapontype >= 3) {
        spawnMineHoming()
    }
    if (Math.percentChance(3) && weapontype >= 5) {
        spawnTurrel()
    }
    if (Math.percentChance(1) && weapontype >= 6) {
        turrelBlastShot()
    }
})
game.onUpdateInterval(10000, function () {
    if (statusbar.value < 100) {
        if (Math.percentChance(1000 / statusbar.value)) {
            contShield = sprites.create(assets.image`shield-cont`, SpriteKind.ContShield)
            contShield.setPosition(randint(0, scene.screenWidth()), 0)
            contShield.setVelocity(randint(-1, 1), 15)
            contShield.z += -5
            contShield.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
})
