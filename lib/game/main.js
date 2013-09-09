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


            /*parseXML: function(xml) {
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

                },  */

            loadEntities: function(xml) {
                console.log("Enter loadEntities --xml:" + xml);
                var new_entity = {};
                var eval_str = "";
                var entity_data = xml.getElementsByTagName("entity_1")[0];
                console.log("loadEntities: length = " + entity_data.children.length);
                for (i = 0 ; i < entity_data.children.length; i ++) {
                    //eval_str = "new_entity.push({'" + entity_data.children[i].nodeName + "': '" + entity_data.children[i].textContent + "'})";
                    //console.log("evaling: " + eval_str);
                    //eval(eval_str);
                    new_entity[entity_data.children[i].nodeName] = entity_data.children[i].textContent;
                        }
                //console.log("values array value for image: " + values["image"]);

                console.log("array values: " + new_entity.y); // y = 10

                // If the values for x and y are hardcoded, everything is fine...
                ig.game.spawnEntity(EntityLayer1, 10 , 10, {zIndex:new_entity["z"], animSheet: new ig.AnimationSheet(new_entity["image"], new_entity["height"], new_entity["width"])});

                // But having the x and y be variables or properties breaks everything...

                //var x = new_entity["x"]; // x = 10 <-- method 1
                //var y = new_entity["y"]; // y = 10
                //ig.game.spawnEntity(EntityLayer1, x, y, {zIndex:new_entity["z"], animSheet: new ig.AnimationSheet(new_entity["image"], new_entity["height"], new_entity["width"])});

                // method 2
                //ig.game.spawnEntity(EntityLayer1, new_entity["x"], new_entity["y"], {zIndex:new_entity["z"], animSheet: new ig.AnimationSheet(new_entity["image"], new_entity["height"], new_entity["width"])});

                // method 3
                //ig.game.spawnEntity(EntityLayer1, new_entity.x, new_entity.y, {zIndex:new_entity["z"], animSheet: new ig.AnimationSheet(new_entity["image"], new_entity["height"], new_entity["width"])});
            },

            init: function() {
                console.log("Begin INIT");

               /* //original

                var request = new XMLHttpRequest();
                request.open("GET", "lib/game/cut_scenes.xml",false);
                request.send(null);
                console.log("INIT.request length: " + request.responseXML.documentElement.childNodes.length);
                var image_array =  ig.game.parseXML(request.responseXML);

                //new and testing  */


                var request2 = new XMLHttpRequest();
                request2.open("GET", "lib/game/scenes.xml",false);
                request2.send(null);
                console.log("INIT.request length: " + request2.responseXML.documentElement.childNodes.length);


                //var new_entity = ig.game.loadEntities(request2.responseXML);

                //end testing

                //console.log("INIT.image_array: " + image_array);

                this.loadLevel( LevelScene1 );
                ig.game.loadEntities(request2.responseXML);

                //ig.game.spawnEntity(EntityLayer1, 10 , 10, {zIndex:new_entity["z"], animSheet: new ig.AnimationSheet(new_entity["image"], new_entity["height"], new_entity["width"])});

                //console.log("INIT.image_url: " + image_array[0]);

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

