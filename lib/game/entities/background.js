ig.module(
'game.entities.background'
)
.requires(
'impact.entity'
)
.defines(function(){

        EntityLayer = ig.Entity.extend({

        size: {x:200, y:400},
        zIndex: 0,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet( 'media/forest.jpg', 720, 900 ),


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
