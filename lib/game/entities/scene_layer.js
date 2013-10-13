ig.module(
'game.entities.scene_layer'
)
.requires(
'impact.entity',
'game.entities.camera'
)
.defines(function(){

        EntityLayer = ig.Entity.extend({



        size: {x:200, y:400},
        zIndex: 0,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet( 'media/mountain1.png', 117, 400 ),


        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.currentAnim = this.anims.idle;
        },

        update: function() {
            this.parent();

            if (ig.input.state('click')){
                // var speed controls how fast the drag is. The higher the number, the slower the drag
                var speed = 10;
                var camera = ig.game.getEntityByName('camera');
                //console.log("camera velocity " + camera.velocity);
                if ( camera.velocity != 0){
                    var x_vel = (this.zIndex * camera.velocity)/speed;
                    this.pos.x = this.pos.x + x_vel;

                }
            }


        }
        });


    });
