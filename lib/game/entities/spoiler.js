ig.module(
'game.entities.spoiler'
)
.requires(
'impact.entity'
)
.defines(function(){

        EntitySpoiler = ig.Entity.extend({


        size: {x:50, y:50},
        collides: ig.Entity.COLLIDES.PASSIVE,
        activeAnimSheet: new ig.AnimationSheet( 'media/active_spoiler.png', 50, 50 ),
        inactiveAnimSheet: new ig.AnimationSheet( 'media/inactive_spoiler.png', 50, 50 ),

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.anims.active = new ig.Animation( this.activeAnimSheet, 0.2, [0] );
            this.anims.inactive = new ig.Animation( this.inactiveAnimSheet, 0.2, [0] );

            this.currentAnim = this.anims.active;
        },

        update: function() {
            this.parent();
        }


    });


});

