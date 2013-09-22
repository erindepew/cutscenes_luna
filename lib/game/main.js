ig.module(
    'game.main'
)
    .requires(
    'impact.game',
    'impact.debug.debug',

    'game.entities.layer1',
    'game.entities.spoiler',

    'game.levels.scene1'
)
    .defines(function(){

        MyGame = ig.Game.extend({


            loadConfig: function(xml) {
                //load background, music, and set spoiler boolean
                var music_url =  xml.getElementsByTagName("sound")[0].textContent;
                var spoiler = xml.getElementsByTagName("spoiler")[0].textContent;;
                //create background entity
                ig.game.loadEntities("background", 0, 0, xml);
                //add background music
                ig.music.add( music_url );
                ig.music.volume = 1;
                ig.music.play();
                //set spoiler button image to inactive or active
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

                ig.game.spawnEntity(EntityLayer1, x_pos, y_pos, { zIndex:new_entity["z"], animSheet: new ig.AnimationSheet(new_entity["image"],new_entity["width"], new_entity["height"])});
            },

            init: function() {
                console.log("Begin INIT");
                //load xml
                var request = new XMLHttpRequest();
                request.open("GET", "lib/game/scenes.xml",false);
                request.send(null);
                console.log("INIT.request length: " + request.responseXML.documentElement.childNodes.length);

                //load background, music and spoiler
                ig.game.loadConfig(request.responseXML);

                //load entities 1, 2 ... n;
                ig.game.loadEntities("entity_1", 200, 40, request.responseXML);
                ig.game.loadEntities("entity_2", 300, 40, request.responseXML);

                //binding mouse button to drag event
                ig.input.bind(ig.KEY.MOUSE1, 'click');


                console.log("Exiting Init")

            },

            update: function() {
                this.parent();

            },

            draw: function() {
                  this.parent();

            }
        });


        ig.main( '#canvas', MyGame, 60, 640, 480, 1 );

    });

