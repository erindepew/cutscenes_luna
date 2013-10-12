ig.module(
'game.entities.camera'
)
.requires(
'impact.entity'
)
.defines(function(){

        EntityCamera = ig.Entity.extend({



        prev_posx: 0,
        size: {x:150, y:150},
        zIndex: 0,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet( 'media/camera.png', 150, 150 ),
        prev_pos_x: 0,
        current_pos_x: 0,
        velocity: 0,



        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.currentAnim = this.anims.idle;
        },

        onCamera: function(){
            var click_radius = 100;
            // if the mouse is within the click radius of the camera and not off the screen
            return (ig.input.mouse.x > this.pos.x
                && ig.input.mouse.x < this.pos.x + click_radius
                && ig.input.mouse.y > this.pos.y
                && ig.input.mouse.y < this.pos.y + click_radius
                && ig.input.mouse.x > 50
                && ig.input.mouse.x < 550);
        },

        update: function() {
            this.parent();

            if (ig.input.state('click')){
                if (this.onCamera()){

                    this.pos.x = ig.input.mouse.x - 50; //subtract 50 pixels to center the camera

                    //calculate velocity, this.vel.x always returns 0
                    this.prev_pos_x  = this.current_pos_x;
                    this.current_pos_x = this.pos.x;
                    if (this.prev_pos_x != 0){
                        this.velocity =  this.current_pos_x - this.prev_pos_x;
                    }



                }
                else {
                    this.velocity = 0;
                }
            }
        }
        });


    });
