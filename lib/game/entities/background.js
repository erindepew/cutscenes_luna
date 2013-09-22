ig.module(
'game.entities.background'
)
.requires(
'impact.entity'
)
.defines(function(){

        EntityLayer1 = ig.Entity.extend({

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

                }
            }


        }
        });


    });
