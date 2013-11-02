ig.module(
    'game.main'
)
    .requires(
    'impact.game',
    'impact.debug.debug',

    'game.entities.scene_layer',
    'game.entities.camera',
    'game.entities.spoiler',
    'game.entities.talk_button',
    'game.entities.talking_head',

    'game.levels.scene1'
)
    .defines(function(){


        MyGame = ig.Game.extend({


            talk_state: 0,
            counter: 1,
            xml: {},

            loadXML: function(){
                var request = new XMLHttpRequest();
                request.open("GET", "lib/game/scenes.xml",false);
                request.send(null);

                this.xml = request.responseXML;

            },
            loadConfig: function(xml) {
                //load background and music
                var music_url =  xml.getElementsByTagName("sound")[0].textContent;
                //create background entity
                ig.game.loadEntities("background", 0, 0, xml);
                //add background music (commented out to save my sanity, REMEMBER TO UNCOMMENT)
                //ig.music.add( music_url );
                //ig.music.volume = 1;
                //ig.music.play();
                //set spoiler button image to inactive or active


            },

            loadSpoiler: function(xml){
                var spoiler = xml.getElementsByTagName("spoiler")[0].textContent;
                var spoiler_button = ig.game.spawnEntity(EntitySpoiler, 580, 420, {zIndex:0});
                if (spoiler == true){
                    spoiler_button.currentAnim = spoiler_button.anims.inactive;
                }

            },

            loadEntities: function(entity_name, x_pos, y_pos, xml) {
                //due to a bug in spawnEntities the x and y position need to be passed as values
                //iterate through xml nodes and spawn entity
                console.log("Enter loadEntities --xml:" + xml);
                var new_entity = {};
                var entity_data = xml.getElementsByTagName(entity_name)[0];
                console.log("loadEntities: length = " + entity_data.children.length);
                for (i = 0 ; i < entity_data.children.length; i ++) {
                    new_entity[entity_data.children[i].nodeName] = entity_data.children[i].textContent;
                        }

                ig.game.spawnEntity(EntityLayer, x_pos, y_pos, { zIndex:new_entity["z"],
                    animSheet: new ig.AnimationSheet(new_entity["image"],new_entity["width"], new_entity["height"])});
            },

            loadTalkingHeads: function(entity_name, x_pos, y_pos, text_posx, text_posy, xml) {
                //due to a bug in spawnEntities the x and y position need to be passed as values
                //iterate through xml nodes and spawn entity
                console.log("Enter loadTalkingHeads -- xml:" + xml);
                var new_entity = {};
                var entity_data = xml.getElementsByTagName(entity_name)[0];

                for (i = 0 ; i < entity_data.children.length; i ++) {
                    new_entity[entity_data.children[i].nodeName] = entity_data.children[i].textContent;
                }

                //spawning text also requires an actual integer, can't pass values

                ig.game.spawnEntity(EntityTalkingHead, x_pos, y_pos, {text: new_entity['text'],text_posx: text_posx, text_posy: text_posy,
                    animSheet: new ig.AnimationSheet(new_entity["image"],new_entity["width"], new_entity["height"]), name: entity_name});

            },


            init: function() {
                console.log("Begin INIT");

                ig.game.loadXML();

                console.log("INIT.request length: " + this.xml.documentElement.childNodes.length);



                //load background and music
                ig.game.loadConfig(this.xml);

                //load entities 1, 2 ... n;
                ig.game.loadEntities("entity_1", 0, 40, this.xml);
                ig.game.loadEntities("entity_2", -50, 170, this.xml);
                ig.game.loadEntities("entity_3", 200, 250, this.xml);
                ig.game.loadEntities("entity_4", 400, 230, this.xml);

                 // load spoiler

                ig.game.loadSpoiler(this.xml);
                // load camera

                ig.game.spawnEntity(EntityCamera, 200, 340, {zIndex:10,
                    animSheet: new ig.AnimationSheet('media/camera.png', 150, 150), name: 'camera'});
                ig.game.spawnEntity(EntityTalkButton, 10, 250, {zIndex:12,
                    animSheet: new ig.AnimationSheet('media/talk_button.png', 50, 50), name: 'talk_button'});


                //binding keys
                ig.input.bind(ig.KEY.MOUSE1, 'click');

                ig.input.bind( ig.KEY.ENTER, 'next_text' );



                console.log("Exiting Init")

            },

            update: function() {
                this.parent();

                var entity_data = this.xml.getElementsByTagName('talking_heads')[0];

                var position = {
                    head_x: [30 , 500],
                    head_y: [40 , 200],
                    text_x: [150 ,430],
                    text_y: [80 , 240]
                };


                if (ig.input.pressed('click') && this.talk_state == 0){
                    var talk_button = ig.game.getEntityByName('talk_button');

                    if (talk_button.onButton()){

                        //load first talking head
                        ig.game.loadTalkingHeads( 'talking_head1', position.head_x[0], position.head_y[0], position.text_x[0], position.text_y[0], this.xml);

                        this.talk_state = 1;


                    }
                }

                if (ig.input.pressed('next_text') && this.talk_state == 1 && this.counter < entity_data.children.length){

                    var new_entity = entity_data.children[this.counter].nodeName;

                    console.log("new entity name: " + new_entity);

                    var prev_entity = ig.game.getEntitiesByType('EntityTalkingHead')[0];


                    console.log("length of entity data: " + entity_data.children.length + ", counter: " + this.counter);

                    if (this.counter % 2 == 1 || this.counter == 1) {
                        ig.game.loadTalkingHeads( new_entity, position.head_x[1], position.head_y[1], position.text_x[1], position.text_y[1], this.xml);

                    }
                    else {
                        ig.game.loadTalkingHeads( new_entity, position.head_x[0], position.head_y[0], position.text_x[0], position.text_y[0], this.xml);
                    }




                    this.counter = this.counter +1;
                    prev_entity.kill();

                }

                /*
                TO DO: need to figure out how to remove last talking head

                else if ( this.counter == entity_data.children.length){

                    console.log("entering kill entities stage");

                    console.log("killing entities");
                    var prev_entity = ig.game.getEntitiesByType('EntityTalkingHead')[0];
                    prev_entity.kill();
                } */


            },

            draw: function() {
                  this.parent();

            }
        });


        ig.main( '#canvas', MyGame, 60, 640, 480, 1 );

    });

