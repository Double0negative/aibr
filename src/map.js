let Simplex = require("fast-simplex-noise").default

module.exports.Map = class Map {

    constructor(game, x, y, z) {
        this.game = game
        this.x = x
        this.y = y
        this.z = z
        this.map = new Array(x * z)
    }

    generate() {
        let simplex = new Simplex({ frequency: 0.01, max: this.y, min: 0, octaves: 4 })
        for(let a = 0; a < this.x; a++) {
            for(let b = 0; b < this.z; b++) {
                let y = Math.floor(simplex.scaled([a, b]))
                let block = new Block(a, y, b, "m")
                this.set(a, b, new Tile(a, b, [block]))
            }
        }
    }

    getMaxAt(x, z) {
        return this.getAt(x, z).heightMap[0]
    }

    getAt(x, z) {
        return this.map[x * this.z + z]
    }

    set(x, z, tile) {
        this.map[x * this.z + z] = tile
    }

    toJson() {
        return {x: this.x, z: this.z, map: this.map.map(tile => tile.toJson())};
    }

}

class Tile {
    constructor(x, y, heightMap) {
        this.x = x
        this.y = y
        this.heightMap = heightMap.sort((a, b) => a.y - b.y)
    }

    toJson() {
        return this.heightMap.map(block => block.toJson())
    }
}


class Block {
    constructor(x, y, z, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
    } 

    toJson() {
        return this.y + ":" +this.type
    }
}


