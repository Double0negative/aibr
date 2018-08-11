class Map {

    constructor(x, y, z, factor) {
        this.x = x
        this.y = y
        this.z = z
        this.factor = factor
        this.map = new Array(x * z)
    }

    getAt(x, z) {
        return this.map[x * this.w + this.h]
    }

    set(x, z, tile) {
        this.map[x * this.w + this.h] = tile
    }

}

class Tile {
    constructor(x, y, heightMap) {
        this.x = x
        this.y = y
        this.heightMap = heightMap

    }
}