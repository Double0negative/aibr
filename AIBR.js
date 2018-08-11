const Map      = require("./src/Map").Map
const Player   = require("./src/Player")
const Server   = require("./Server")
const x = 100
const y = 50
const z = 100
const port = 3000

class BattleRoyale {

    constructor() {
        this.players = {};
        this.map = new Map(this, x, y, z);
    }

    setup() {
        console.log("Starting server..")
        this.server = new Server(this, port)
        this.server.start()

        console.log("Generating map..")
        this.map.generate()
        console.log("Setup Complete")
    }

    connect(connection, json) {
        let player = new Player(this, connection, json.id)
        this.players[json.id] = player
        connection.setPlayer(player)
        player.send("MAP_FULL", this.map.toJson())
    }

    sendAll(command, obj) {
        for(let id in this.players) {
            this.players[id].send(command, obj)
        }
    }

    getMap() {
        return this.map
    }

}


new BattleRoyale().setup()