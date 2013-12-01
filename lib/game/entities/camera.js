ig.module(
'game.entities.camera'
)
.requires(
'impact.entity'
)
.defines(function(){

        EntityCamera = ig.Entity.extend({

        size: {x:150, y:150},
        zIndex: 0,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet( 'media/camera.png', 150, 150 ),
        velocity: 0,



        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.currentAnim = this.anims.idle;
        },

        update: function() {
            this.parent();



            if (ig.input.state('click')){
                if (this.pos.x < ig.system.width - this.size.x && this.pos.x > 0){
                    this.velocity = ig.game.mouse_velocity;
                    this.pos.x = this.pos.x + ig.game.mouse_velocity;
                }

                else if (this.pos.x >= ig.system.width - this.size.x){
                    this.velocity = 0;
                    this.pos.x = this.pos.x - 1;
                }

                else {
                    this.velocity = 0;
                    this.pos.x = this.pos.x + 1;

                }
                    }
        }
        });


    });
