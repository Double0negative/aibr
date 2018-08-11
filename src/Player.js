const jumpHeight = 2;

module.exports =  class Player {
    constructor(game, con, id) {
        this.con = con;
        this.game = game;
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.yaw = 0;
        this.pitch = 0;
    }

    getConnection() {
        return this.con;
    }

    send(command, obj, id) {
        this.con.send(command, obj, id)
    }

    spawn(x, z) {
      this.moveTo(x, z, this.game.getMap().getMaxAt(x, z).y + 1)
    }

    move(x, z) {
        let op = [-1, 0, 1]
        console.log(x, z, op.includes(x), op.includes(z))
        if(op.includes(x) && op.includes(z)) {
            let newX = this.x + x
            let newZ = this.z + z
            let y = this.game.getMap().getMaxAt(newX, newZ).y + 1
            if(y < this.y + jumpHeight)
                this.moveTo(newX, y, newZ)
        }
    }

    moveTo(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.game.sendAll("PLAYER_SEEN", {x, y, z}, this.id)
    }
}
