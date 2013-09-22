ig.module(
'game.entities.layer1'
)
.requires(
'impact.entity'
)
.defines(function(){

        EntityLayer1 = ig.Entity.extend({


        current_mousex: 0,
        prev_mousex: 0,
        size: {x:200, y:400},
        zIndex: 0,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet( 'media/layer1.png', 200, 400 ),


        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.currentAnim = this.anims.idle;
        },

        update: function() {
            this.parent();

            if (ig.input.state('click')){
                var mouse_accel = 0;
                // var speed controls how fast the drag is. The higher the number, the slower the drag
                var speed = 70;
                this.prev_mousex = this.current_mousex;
                this.current_mousex = ig.input.mouse.x;
                if (this.prev_mousex != 0){
                    mouse_accel = this.current_mousex - this.prev_mousex;
                    /*console.log("previous mouse pos: " + this.prev_mousex);
                    console.log("current mouse pos: " + this.current_mousex);
                    console.log("current mouse acceleration: " + mouse_accel); */
                }

                if ( mouse_accel != 0 || this.prev_mousex == 0){
                    var x_vel = (this.zIndex * mouse_accel)/speed;
                    this.pos.x = this.pos.x + x_vel;

                }
            }


        }
        });


    });
