var vector = {
    _x: 1,
    _y: 0,

    create: function(x, y) {
        var obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
    },

    duplicate: function() {
        return vector.create(this._x, this._y);
    },

    random: function(maxX, maxY, minX, minY){
        var x = Math.random() * (maxX-minX) + minX;
        var y = Math.random() * (maxY-minY) + minY;
        return vector.create(x,y);
    },

    setX: function(value) {
        this._x = value;
    },

    getX: function() {
        return this._x;
    },

    setY: function(value) {
        this._y = value;
    },

    getY: function() {
        return this._y;
    },

    bounds: function(size, mX, mY){
        var mapsize = size;
        if(this._x  > mX + mapsize){ this._x = -size; }
        if(this._x < -mapsize){ this._x = mX + size; }

        if(this._y > mY + mapsize){ this._y = -size; }
        if(this._y < -mapsize){ this._y = mY + size; }
    },

    outOfBounds: function(sx, sy, ex, ey){
        if(this._x < sx){ return true; }
        if(this._x > ex){ return true; }

        if(this._y < sy){ return true; }
        if(this._y > ey){ return true; }
    },

    setAngle: function(angle) {
        var length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },

    getAngle: function() {
        return Math.atan2(this._y, this._x);
    },

    angleTo: function(p2) {
        return Math.atan2(p2.getY() - this._y, p2.getX() - this._x);
    },

    distanceTo: function(p2) {
        var dx = p2.getX() - this._x,
            dy = p2.getY() - this._y;

        return Math.sqrt(dx * dx + dy * dy);
    },

    setLength: function(length) {
        var angle = this.getAngle();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },

    gravitateTo: function(p2, mass, mymass) {
        var grav = Vector.create(0, 0),
            dist = mypos.distanceTo(p2);

        //grav.setLength(mass / (dist * dist));
        grav.setLength((G*mass*mymass) / (dist * dist));
        grav.setAngle(this.angleTo(p2));
        this.addTo(grav);
    },

    getLength: function() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    },

    maxSpeed: function(s){
        if(this.getLength() > s){
            this.setLength(s);
        }
    },

    add: function(v2) {
        return vector.create(this._x + v2.getX(), this._y + v2.getY());
    },

    subtract: function(v2) {
        return vector.create(this._x - v2.getX(), this._y - v2.getY());
    },

    multiply: function(val) {
        return vector.create(this._x * val, this._y * val);
    },

    divide: function(val) {
        return vector.create(this._x / val, this._y / val);
    },

    addTo: function(v2) {
        this._x += v2.getX();
        this._y += v2.getY();
    },

    subtractFrom: function(v2) {
        this._x -= v2.getX();
        this._y -= v2.getY();
    },

    multiplyBy: function(val) {
        this._x *= val;
        this._y *= val;
    },

    divideBy: function(val) {
        this._x /= val;
        this._y /= val;
    },

    normalize: function(scale){
        var norm = Math.sqrt(this._x * this._x + this._y * this._y);
        if (norm != 0) {
            return vector.create(
                scale * this._x / norm,
                scale * this._y / norm
            );
        }
    },

    dot: function(v2){
        return this._x * v2._x + this._y * v2._y;
    }
};