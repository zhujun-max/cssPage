const canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        HalfPI = Math.PI / 2,
        gravity = vector.create(0, 0.35)

    let objects = [];
    let startFireworks = true;
    
    document.body.appendChild(canvas);

    function random255() {
        return Math.floor(Math.random() * 100 + 155);
    }

    function randomColor() {
        let r = random255(),
            g = random255(),
            b = random255();
        return `rgb(${r}, ${g}, ${b})`;
    }

    class PhysicsBody {
        constructor() {
            objects.push(this);
        }
        PhysicsUpdate() {
            this.lastPosition = this.position.duplicate();
            this.position.addTo(this.velocity);
            this.velocity.addTo(gravity);
        }
        deleteObject() {
            objects[objects.indexOf(this)] = undefined;
        }}


    class firework extends PhysicsBody {
        constructor() {
            super();
            this.position = vector.create(Math.random() * width, height);

            let Velocity = vector.create(0, 0);
            Velocity.setLength(Math.random() * 10 + 15);
            Velocity.setAngle(Math.PI * 1.35 + Math.random() * Math.PI * 0.30);
            this.velocity = Velocity;

            this.trail = Math.floor(Math.random() * 4) != 1;
            this.trailColor = this.trail ? randomColor() : undefined;
            this.trailWidth = 2;

            this.TimeCreated = new Date().getTime();
            this.TimeExpired = this.TimeCreated + (Math.random() * 5 + 7) * 100;

            this.BlastParticleCount = Math.floor(Math.random() * 50) + 25;
            this.funky = Math.floor(Math.random() * 5) == 1;

            this.exposionColor = randomColor();
        }

        draw() {
            context.strokeStyle = this.trailColor;
            context.lineWidth = this.trailWidth;

            let p = this.position,
                lp = this.lastPosition;

            context.beginPath();
            context.moveTo(lp.getX(), lp.getY());
            context.lineTo(p.getX(), p.getY());
            context.stroke();
        }

        funkyfire() {
            var funky = this.funky;
            for (var i = 0; i < Math.floor(Math.random() * 10); i++) {
                new BlastParticle({ firework: this, funky });
            }
        }

        explode() {
            var funky = this.funky;
            for (var i = 0; i < this.BlastParticleCount; i++) {
                new BlastParticle({ firework: this, funky });
            }
            this.deleteObject();
        }

        checkExpire() {
            let now = new Date().getTime();
            if (now >= this.TimeExpired) this.explode();
        }

        render() {
            if (this.trail) this.draw();
            if (this.funky) this.funkyfire();
            this.checkExpire();
        }}


    class BlastParticle extends PhysicsBody {
        constructor({ firework, funky }) {
            super();
            this.position = firework.position.duplicate();

            let Velocity = vector.create(0, 0);
            if (!this.funky) {
                Velocity.setLength(Math.random() * 6 + 2);
                Velocity.setAngle(Math.random() * Math.PI * 2);
            } else {
                Velocity.setLength(Math.random() * 3 + 1);
                Velocity.setAngle(firework.getAngle + Math.PI / 2 - Math.PI * 0.25 + Math.PI * .5);
            }

            this.velocity = Velocity;

            this.color = firework.exposionColor;

            this.particleSize = Math.random() * 4;

            this.TimeCreated = new Date().getTime();
            this.TimeExpired = this.TimeCreated + (Math.random() * 4 + 3.5) * 100;
        }

        draw() {
            context.strokeStyle = this.color;
            context.lineWidth = this.particleSize;
            let p = this.position,
                lp = this.lastPosition;

            context.beginPath();
            context.moveTo(lp.getX(), lp.getY());
            context.lineTo(p.getX(), p.getY());
            context.stroke();
        }

        checkExpire() {
            let now = new Date().getTime();
            if (now >= this.TimeExpired) this.deleteObject();
        }

        render() {
            this.draw();
            this.checkExpire();
        }}


    document.body.addEventListener('mousedown', function (e) {
        let color = randomColor();
        for (var i = 0; i < Math.floor(Math.random() * 20) + 25; i++) {
            new BlastParticle({
                firework: {
                    position: vector.create(e.pageX, e.pageY),
                    velocity: vector.create(0, 0),
                    exposionColor: color },

                funky: false });

        }
    });

    setInterval(function () {
        if (!startFireworks) return;
        for (var i = 0; i < Math.floor(Math.random() * 4); i++) {
            new firework();
        }
    }, 500);

    function cleanupObjects() {
        objects = objects.filter(o => o != undefined);
    }

    function loop() {
        context.fillStyle = 'rgba(0,0,0,0.085)';
        context.fillRect(0, 0, width, height);

        let unusedObjectCount = 0;
        objects.map(o => {
            if (!o) {unusedObjectCount++;return;}
            o.PhysicsUpdate();
            o.render();
        });
        if (unusedObjectCount > 100) cleanupObjects();

        requestAnimationFrame(loop);
    }

    loop();