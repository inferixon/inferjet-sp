@namespace
class SpriteKind:
    Bomba = SpriteKind.create()
    Weapon = SpriteKind.create()

def on_b_pressed():
    game.reset()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    global laser
    laser = sprites.create(img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . . . 2 1 2 . . . . . . 
                    . . . . . . . 2 1 2 . . . . . . 
                    . . . . . . . 2 1 2 . . . . . . 
                    . . . . . . . 3 1 3 . . . . . . 
                    . . . . . . 2 3 1 3 2 . . . . . 
                    . . . . . . 2 1 1 1 2 . . . . . 
                    . . . . . . 2 1 1 1 3 . . . . . 
                    . . . . . . 3 1 1 1 3 . . . . . 
                    . . . . . . 3 1 1 1 3 . . . . . 
                    . . . . . . 3 1 1 1 3 . . . . . 
                    . . . . . . 2 3 1 3 2 . . . . . 
                    . . . . . . . 2 2 2 . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        """),
        SpriteKind.Weapon)
    laser.set_position(jet.x, jet.y)
    laser.set_scale(0.5, ScaleAnchor.MIDDLE)
    laser.set_velocity(0, -80)
    music.play(music.create_sound_effect(WaveShape.TRIANGLE,
            1181,
            137,
            255,
            0,
            379,
            SoundExpressionEffect.NONE,
            InterpolationCurve.CURVE),
        music.PlaybackMode.IN_BACKGROUND)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    global jet
    controller.move_sprite(jet, 0, 0)
    sprites.destroy(jet, effects.disintegrate, 500)
    music.play(music.create_sound_effect(WaveShape.NOISE,
            1526,
            1365,
            255,
            0,
            100,
            SoundExpressionEffect.NONE,
            InterpolationCurve.LOGARITHMIC),
        music.PlaybackMode.IN_BACKGROUND)
    animation.run_image_animation(jet,
        [img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . 4 4 . . . . . . . 
                        . . . . . . 4 5 5 4 . . . . . . 
                        . . . . . . 2 5 5 2 . . . . . . 
                        . . . . . . . 2 2 . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . 4 . . . . . 
                        . . . . 2 . . . . 4 4 . . . . . 
                        . . . . 2 4 . . 4 5 4 . . . . . 
                        . . . . . 2 4 d 5 5 4 . . . . . 
                        . . . . . 2 5 5 5 5 4 . . . . . 
                        . . . . . . 2 5 5 5 5 4 . . . . 
                        . . . . . . 2 5 4 2 4 4 . . . . 
                        . . . . . . 4 4 . . 2 4 4 . . . 
                        . . . . . 4 4 . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . 3 . . . . . . . . . . . 4 . . 
                        . 3 3 . . . . . . . . . 4 4 . . 
                        . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
                        . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
                        . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
                        . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
                        . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
                        . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
                        . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
                        . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
                        . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
                        . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
                        . 4 4 d d 4 d d d 4 3 d d 4 . . 
                        . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
                        . 4 5 4 . . 4 4 4 . . . 4 4 . . 
                        . 4 4 . . . . . . . . . . 4 4 .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . b b . b b b . . . . . 
                        . . . . b 1 1 b 1 1 1 b . . . . 
                        . . b b 3 1 1 d d 1 d d b b . . 
                        . b 1 1 d d b b b b b 1 1 b . . 
                        . b 1 1 1 b . . . . . b d d b . 
                        . . 3 d d b . . . . . b d 1 1 b 
                        . b 1 d 3 . . . . . . . b 1 1 b 
                        . b 1 1 b . . . . . . b b 1 d b 
                        . b 1 d b . . . . . . b d 3 d b 
                        . b b d d b . . . . b d d d b . 
                        . b d d d d b . b b 3 d d 3 b . 
                        . . b d d 3 3 b d 3 3 b b b . . 
                        . . . b b b d d d d d b . . . . 
                        . . . . . . b b b b b . . . . .
            """)],
        500,
        False)
    animation.run_image_animation(bomba,
        [img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . 4 4 . . . . . . . 
                        . . . . . . 4 5 5 4 . . . . . . 
                        . . . . . . 2 5 5 2 . . . . . . 
                        . . . . . . . 2 2 . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . 4 . . . . . 
                        . . . . 2 . . . . 4 4 . . . . . 
                        . . . . 2 4 . . 4 5 4 . . . . . 
                        . . . . . 2 4 d 5 5 4 . . . . . 
                        . . . . . 2 5 5 5 5 4 . . . . . 
                        . . . . . . 2 5 5 5 5 4 . . . . 
                        . . . . . . 2 5 4 2 4 4 . . . . 
                        . . . . . . 4 4 . . 2 4 4 . . . 
                        . . . . . 4 4 . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . 3 . . . . . . . . . . . 4 . . 
                        . 3 3 . . . . . . . . . 4 4 . . 
                        . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
                        . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
                        . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
                        . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
                        . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
                        . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
                        . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
                        . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
                        . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
                        . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
                        . 4 4 d d 4 d d d 4 3 d d 4 . . 
                        . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
                        . 4 5 4 . . 4 4 4 . . . 4 4 . . 
                        . 4 4 . . . . . . . . . . 4 4 .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . b b . b b b . . . . . 
                        . . . . b 1 1 b 1 1 1 b . . . . 
                        . . b b 3 1 1 d d 1 d d b b . . 
                        . b 1 1 d d b b b b b 1 1 b . . 
                        . b 1 1 1 b . . . . . b d d b . 
                        . . 3 d d b . . . . . b d 1 1 b 
                        . b 1 d 3 . . . . . . . b 1 1 b 
                        . b 1 1 b . . . . . . b b 1 d b 
                        . b 1 d b . . . . . . b d 3 d b 
                        . b b d d b . . . . b d d d b . 
                        . b d d d d b . b b 3 d d 3 b . 
                        . . b d d 3 3 b d 3 3 b b b . . 
                        . . . b b b d d d d d b . . . . 
                        . . . . . . b b b b b . . . . .
            """)],
        500,
        False)
    info.change_life_by(-1)
    scene.camera_shake(4, 300)
    pause(500)
    jet = sprites.create(img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . . . 1 1 . . . . . . . 
                    . . . . b . 1 1 1 1 . b . . . . 
                    . . . b b . 1 1 1 1 . b b . . . 
                    . . . . b 1 1 8 8 1 1 b . . . . 
                    . . . . b 1 1 8 8 1 1 b . . . . 
                    . . . . 1 1 8 8 8 8 1 1 . . . . 
                    . . . b 1 8 8 9 9 8 8 1 b . . . 
                    . . b 1 1 8 8 9 9 8 8 1 1 b . . 
                    . . b 1 8 8 9 9 9 9 8 8 1 b . . 
                    . . b 1 8 8 8 8 8 8 8 8 1 b . . 
                    . b 1 1 8 1 1 1 1 1 1 8 1 1 b . 
                    . b 1 1 8 9 8 1 1 8 9 8 1 1 b . 
                    . 1 1 8 9 9 . 1 1 . 9 9 8 1 1 . 
                    . 1 8 9 . . . 1 1 . . . 9 8 1 . 
                    1 8 9 . . . . . . . . . . 9 8 1
        """),
        SpriteKind.player)
    jet.set_position(scene.screen_width() / 2, scene.screen_height() * 0.8)
    controller.move_sprite(jet, 100, 10)
sprites.on_overlap(SpriteKind.player, SpriteKind.Bomba, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    animation.run_image_animation(bomba,
        [img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . 4 4 . . . . . . . 
                        . . . . . . 4 5 5 4 . . . . . . 
                        . . . . . . 2 5 5 2 . . . . . . 
                        . . . . . . . 2 2 . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . 4 . . . . . 
                        . . . . 2 . . . . 4 4 . . . . . 
                        . . . . 2 4 . . 4 5 4 . . . . . 
                        . . . . . 2 4 d 5 5 4 . . . . . 
                        . . . . . 2 5 5 5 5 4 . . . . . 
                        . . . . . . 2 5 5 5 5 4 . . . . 
                        . . . . . . 2 5 4 2 4 4 . . . . 
                        . . . . . . 4 4 . . 2 4 4 . . . 
                        . . . . . 4 4 . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . 3 . . . . . . . . . . . 4 . . 
                        . 3 3 . . . . . . . . . 4 4 . . 
                        . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
                        . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
                        . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
                        . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
                        . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
                        . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
                        . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
                        . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
                        . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
                        . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
                        . 4 4 d d 4 d d d 4 3 d d 4 . . 
                        . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
                        . 4 5 4 . . 4 4 4 . . . 4 4 . . 
                        . 4 4 . . . . . . . . . . 4 4 .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . b b . b b b . . . . . 
                        . . . . b 1 1 b 1 1 1 b . . . . 
                        . . b b 3 1 1 d d 1 d d b b . . 
                        . b 1 1 d d b b b b b 1 1 b . . 
                        . b 1 1 1 b . . . . . b d d b . 
                        . . 3 d d b . . . . . b d 1 1 b 
                        . b 1 d 3 . . . . . . . b 1 1 b 
                        . b 1 1 b . . . . . . b b 1 d b 
                        . b 1 d b . . . . . . b d 3 d b 
                        . b b d d b . . . . b d d d b . 
                        . b d d d d b . b b 3 d d 3 b . 
                        . . b d d 3 3 b d 3 3 b b b . . 
                        . . . b b b d d d d d b . . . . 
                        . . . . . . b b b b b . . . . .
            """)],
        200,
        False)
    pause(200)
    sprites.destroy(bomba)
sprites.on_overlap(SpriteKind.Weapon, SpriteKind.Bomba, on_on_overlap2)

stjerne: Sprite = None
bomba: Sprite = None
laser: Sprite = None
jet: Sprite = None
scene.set_background_color(15)
jet = sprites.create(img("""
        . . . . . . . . . . . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . b . 1 1 1 1 . b . . . . 
            . . . b b . 1 1 1 1 . b b . . . 
            . . . . b 1 1 8 8 1 1 b . . . . 
            . . . . b 1 1 8 8 1 1 b . . . . 
            . . . . 1 1 8 8 8 8 1 1 . . . . 
            . . . b 1 8 8 9 9 8 8 1 b . . . 
            . . b 1 1 8 8 9 9 8 8 1 1 b . . 
            . . b 1 8 8 9 9 9 9 8 8 1 b . . 
            . . b 1 8 8 8 8 8 8 8 8 1 b . . 
            . b 1 1 8 1 1 1 1 1 1 8 1 1 b . 
            . b 1 1 8 9 8 1 1 8 9 8 1 1 b . 
            . 1 1 8 9 9 . 1 1 . 9 9 8 1 1 . 
            . 1 8 9 . . . 1 1 . . . 9 8 1 . 
            1 8 9 . . . . . . . . . . 9 8 1
    """),
    SpriteKind.player)
jet.set_position(scene.screen_width() / 2, scene.screen_height() * 0.8)
controller.move_sprite(jet, 100, 10)
info.set_life(3)

def on_on_update():
    global stjerne, bomba
    if Math.percent_chance(5):
        stjerne = sprites.create_projectile_from_side(assets.image("""
            stjerne
        """), 0, randint(20, 30))
        stjerne.change_scale(0.05, ScaleAnchor.MIDDLE)
        stjerne.set_position(randint(0, scene.screen_width()), 0)
    if Math.percent_chance(0.2):
        bomba = sprites.create(assets.image("""
            bomba
        """), SpriteKind.Bomba)
        bomba.set_scale(2, ScaleAnchor.MIDDLE)
        bomba.set_position(randint(0, scene.screen_width()), 0)
        bomba.set_velocity(randint(-2, 2), 10)
game.on_update(on_on_update)
