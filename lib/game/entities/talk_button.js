ig.module(
'game.entities.talk_button'
)
.requires(
'impact.entity',
'game.entities.talking_head'
)
.defines(function(){

        EntityTalkButton = ig.Entity.extend({


        size: {x:50, y:50},
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet( 'media/camera.png', 150, 150 ),


        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.currentAnim = this.anims.idle;
        },


        onButton: function(){
            // if the mouse is within the click radius of the camera and not off the screen
            return (ig.input.mouse.x > this.pos.x
                && ig.input.mouse.x < this.pos.x + this.size.x
                && ig.input.mouse.y > this.pos.y
                && ig.input.mouse.y < this.pos.y + this.size.y);

        },

        update: function() {
            this.parent();
        }


    });


});








