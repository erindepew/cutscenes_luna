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
        text_posx: 0,
        text_posy: 0,

        //anchor positions for talking head text
        upper_left_text:{x: 150 , y: 70},
        upper_right_text:{x: 400 , y: 70},  //untested
        lower_right_text:{x:500, y:300}, //untested
        lower_left_text:{x:40, y:300},   //untested


        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.currentAnim = this.anims.idle;
            ig.game.talking_head = this;

            this.fontTimer = new ig.Timer();
            this.fontTimeScale = 10; //controls speed of drawing for text, lower numbers are slower, higher numbers are faster
        },

        draw_text: function(){
            var si = (this.fontTimer.delta() * this.fontTimeScale).round();
            this.font.draw(this.text.substr(0, si), this.text_posx, this.text_posy, ig.Font.ALIGN.LEFT);

        },


        update: function() {
            this.parent();
        },

        draw: function () {
            this.parent();

             this.draw_text();

        }


    });


});

