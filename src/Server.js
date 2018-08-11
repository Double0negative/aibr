const express = require('express')
const app = express()
var expressWs = require('express-ws')(app);

module.exports = class Server {

    constructor(game, port) {
        this.game = game
        this.port = port
        this.connections = {};
    }

    start() {
        app.ws("/", (ws, req) => {
            ws.on("message", (msg) => {
                let json = JSON.parse(msg)
                if(json.command == "CONNECT"){
                    let connection = new Connection(this.game, ws)
                    this.connections[json.id] = connection;
                    this.game.connect(connection, json)
                } else {
                    this.connections[json.id].read(json)
                }
            })
        })

        app.listen(this.port, () => console.log("Started server on", this.port))
    }

}

class Connection {
    constructor(game, ws) {
        this.ws = ws;
        this.game = game;
    }

    setPlayer(player) {
        this.player = player
    }

    send(command, data, id) {
        this.ws.send(JSON.stringify({command,id,  data}))
    }

    read(obj) {
        if(this.player && this.game) {
            switch(obj.command) {
                case "PLAYER_SPAWN":
                    this.player.spawn(obj.data.x, obj.data.z)
                    break;
                case "PLAYER_MOVE":
                    this.player.move(obj.data.x, obj.data.z)
                    break;
            }
        }
    }

}

