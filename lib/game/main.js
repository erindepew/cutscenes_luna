ig.module(
    'game.main'
)
    .requires(
    'impact.game',
    'impact.debug.debug',

    'game.entities.layer1',

    'game.levels.scene1'
)
    .defines(function(){

        MyGame = ig.Game.extend({


            getXML: function() {
                console.log("Entering getXML");
                    $.ajax({
                        type: "GET",
                        url: "lib/game/cut_scenes.xml",
                        dataType: "xml",
                        success: ig.game.parseXML
                    });
                console.log("Exiting getXML");
                },

            parseXML: function(xml) {
                console.log("Entering parseXML -- xml: " + xml );
                var new_variables = [];
                $(xml).find("asset").each(function()
                    {
                       new_variables.push($(this).find("image").text());
                       new_variables.push($(this).find("height").text());
                       new_variables.push($(this).find("width").text());
                    });
                console.log("Exiting parseXML: new_variables " + new_variables);
                return new_variables;
                //return ['media/balloons.png', 402, 595];

                },

            init: function() {
                console.log("Begin INIT");
                var request = new XMLHttpRequest();
                request.open("GET", "lib/game/cut_scenes.xml",false);
                request.send(null);
                console.log("INIT.request length: " + request.responseXML.documentElement.childNodes.length);
                var image_array =  ig.game.parseXML(request.responseXML);
                console.log("INIT.image_array: " + image_array);

                this.loadLevel( LevelScene1 );

                ig.game.spawnEntity(EntityLayer1, 10 , 10, {zIndex:-10, animSheet: new ig.AnimationSheet(image_array[0], image_array[1], image_array[2])});

                console.log("INIT.image_url: " + image_array[0]);

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

