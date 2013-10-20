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

                ig.game.spawnEntity(EntityLayer, x_pos, y_pos, { zIndex:new_entity["z"], animSheet: new ig.AnimationSheet(new_entity["image"],new_entity["width"], new_entity["height"])});
            },

            loadTalkingHeads: function(xml) {
                //due to a bug in spawnEntities the x and y position need to be passed as values
                //iterate through xml nodes and spawn entity
                console.log("Enter loadTalkingHeads -- xml:" + xml);
                var new_entity = {};
                var entity_data = xml.getElementsByTagName('talking_heads')[0];

                for (i = 0 ; i < entity_data.children.length; i ++) {
                    new_entity[entity_data.children[i].nodeName] = entity_data.children[i].textContent;
                }

                ig.game.spawnEntity(EntityTalkingHead, 50, 50, {text: new_entity['text'], animSheet: new ig.AnimationSheet(new_entity["image"],new_entity["width"], new_entity["height"])});
            },


            init: function() {
                console.log("Begin INIT");

                var request = new XMLHttpRequest();
                request.open("GET", "lib/game/scenes.xml",false);
                request.send(null);
                console.log("INIT.request length: " + request.responseXML.documentElement.childNodes.length);



                //load background and music
                ig.game.loadConfig(request.responseXML);

                //load entities 1, 2 ... n;
                ig.game.loadEntities("entity_1", 0, 40, request.responseXML);
                ig.game.loadEntities("entity_2", -50, 170, request.responseXML);
                ig.game.loadEntities("entity_3", 200, 250, request.responseXML);
                ig.game.loadEntities("entity_4", 400, 230, request.responseXML);

                 // load spoiler

                ig.game.loadSpoiler(request.responseXML);
                // load camera

                ig.game.spawnEntity(EntityCamera, 200, 340, {zIndex:10, animSheet: new ig.AnimationSheet('media/camera.png', 150, 150), name: 'camera'});
                ig.game.spawnEntity(EntityTalkButton, 10, 250, {zIndex:12, animSheet: new ig.AnimationSheet('media/talk_button.png', 50, 50), name: 'talk_button'});


                //binding mouse button to drag event
                ig.input.bind(ig.KEY.MOUSE1, 'click');



                console.log("Exiting Init")

            },

            update: function() {
                this.parent();
                if (ig.input.pressed('click')){
                    var talk_button = ig.game.getEntityByName('talk_button');
                    if (talk_button.onButton()){
                        var request = new XMLHttpRequest();
                        request.open("GET", "lib/game/scenes.xml",false);
                        request.send(null);


                        ig.game.loadTalkingHeads(request.responseXML);


                    }
                }

            },

            draw: function() {
                  this.parent();

            }
        });


        ig.main( '#canvas', MyGame, 60, 640, 480, 1 );

    });

