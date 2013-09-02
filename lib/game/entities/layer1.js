ig.module(
'game.entities.layer1'
)
.requires(
'impact.entity'
)
.defines(function(){

        EntityLayer1 = ig.Entity.extend({


        size: {x:400, y:264},
        collides: ig.Entity.COLLIDES.FIXED,
        animSheet: new ig.AnimationSheet( 'media/layer1.png', 400, 264 ),

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.currentAnim = this.anims.idle;
        },

        update: function() {
            this.parent();
        }


    });


});
