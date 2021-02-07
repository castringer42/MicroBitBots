function Wrap2Pi (num: number) {
    tempAngle = num
    if (num < 0) {
        tempAngle += pi * 2
    }
    return tempAngle
}
function RoundToHundredths (num: number) {
    return Math.round(num * 100) / 100
}
let right = 0
let left = 0
let lastY = 0
let lastX = 0
let angle = 0
let magnitude = 0
let newY = 0
let newX = 0
let tempAngle = 0
let pi = 0
radio.setGroup(1)
pi = 3.14159
basic.forever(function () {
    newX = bitcommander.readJoystick(BCJoystick.X) / 512 - 1
    newY = bitcommander.readJoystick(BCJoystick.Y) / 512 - 1
    magnitude = RoundToHundredths(Math.min(Math.sqrt(newX ** 2 + newY ** 2), 1))
    angle = RoundToHundredths(Wrap2Pi(Math.atan2(newY, newX)))
    if (newX != lastX || newY != lastY) {
        if (magnitude < 0.25) {
            radio.sendValue("stop", 0)
            basic.showLeds(`
                . # # # .
                # # . # #
                # . # . #
                # # . # #
                . # # # .
                `)
        } else {
            if (angle < pi / 4 || angle >= 7 * (pi / 4)) {
                basic.showArrow(ArrowNames.East)
                left = magnitude
                right = 0 - magnitude
            } else if (angle >= 1 * (pi / 4) && angle < 3 * (pi / 4)) {
                basic.showArrow(ArrowNames.North)
                left = magnitude
                right = magnitude
            } else if (angle >= 3 * (pi / 4) && angle < 5 * (pi / 4)) {
                basic.showArrow(ArrowNames.West)
                left = 0 - magnitude
                right = magnitude
            } else {
                basic.showArrow(ArrowNames.South)
                left = 0 - magnitude
                right = 0 - magnitude
            }
            radio.sendValue("left", left * 128)
            radio.sendValue("right", right * 128)
        }
        lastX = newX
        lastY = newY
    }
    basic.pause(100)
})
