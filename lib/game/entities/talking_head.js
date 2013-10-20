ig.module(
'game.entities.talking_head'
)
.requires(
'impact.entity'
)
.defines(function(){

        EntityTalkingHead = ig.Entity.extend({


        size: {x:100, y:100},
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet( 'media/talking_head.png', 100, 100 ),
        font: new ig.Font( 'media/verdana_18.png' ),
        text: '',

        //anchor positions for talking heads
        upper_left:{x:50, y:50},
        upper_right:{x:500, y:10},
        lower_right:{x:500, y:300},
        lower_left:{x:10, y:300},


        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.currentAnim = this.anims.idle;

            this.fontTimer = new ig.Timer();
            this.fontTimeScale = 5;
        },


        update: function() {
            this.parent();
        },

        draw: function () {
            this.parent();

            var si = (this.fontTimer.delta() * this.fontTimeScale).round();
            this.font.draw('It Works!'.substr(0, si), this.upper_left['x'], this.upper_left['y'], ig.Font.ALIGN.LEFT);
        }


    });


});

