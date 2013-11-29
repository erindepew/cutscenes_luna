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
            //for button opacity
            timeout: 0,

            // for talking heads
            talk_state: 0,
            counter: 1,

            //for importing info for game
            xml: {},

            //positions for entities (because x & y pos is fucked up in impact.js)
            spoiler_pos: [580, 420],
            camera_pos: [200, 340],
            talkbutton_pos: [10, 250],

            entity_pos: [[0 , 40],[-50 , 170],[200 ,250],[400 , 230]],

            //counter for which segment

            segment_num: 0,

            loadXML: function(){
                var request = new XMLHttpRequest();
                request.open("GET", "lib/game/scenes.xml",false);
                request.send(null);

                this.xml = request.responseXML;

            },
            loadMusic: function(xml) {
                var music_url =  xml.getElementsByTagName("sound")[0].textContent;
                //add background music (commented out to save my sanity, TO DO: REMEMBER TO UNCOMMENT)
                //ig.music.add( music_url );
                //ig.music.volume = 1;
                //ig.music.play();
            },

            loadSpoiler: function(parent_node, xml){

                var segment = xml.getElementsByTagName(parent_node);
                var spoiler = segment[this.segment_num].getElementsByTagName('spoiler')[0].textContent;
                console.log("spoiler true or false: " + spoiler);
                var spoiler_button = ig.game.spawnEntity(EntitySpoiler, this.spoiler_pos[0], this.spoiler_pos[1], {zIndex:0});
                if (spoiler == "true"){
                    spoiler_button.currentAnim = spoiler_button.anims.inactive;
                }
                else{
                    spoiler_button.currentAnim = spoiler_button.anims.active;
                }

            },

            loadEntities: function(parent_node, child_node, xml) {
                //due to a bug in spawnEntities the x and y position need to be passed as values
                //iterate through xml nodes and spawn entity
                var segment = xml.getElementsByTagName(parent_node);
                var new_entity = {};
                var background = {};

                if (this.segment_num < segment.length){
                //load background

                var background_data = segment[this.segment_num].getElementsByTagName('background')[0];
                for (i = 0 ; i < background_data.children.length; i ++) {
                    background[background_data.children[i].nodeName] = background_data.children[i].textContent;
                    //console.log("entity node name: " + entity_data1.children[i].nodeName + "node value: " + entity_data1.children[i].textContent);
                }
                ig.game.spawnEntity(EntityLayer, 0, 0, { zIndex:0,
                    animSheet: new ig.AnimationSheet(background["image"],background["width"], background["height"])});


                //load entities

                    for (x = 0 ; x < segment[this.segment_num].getElementsByTagName(child_node).length; x ++){
                        var entity_data = segment[this.segment_num].getElementsByTagName(child_node)[x];
                        for (i = 0 ; i < entity_data.children.length; i ++) {
                            new_entity[entity_data.children[i].nodeName] = entity_data.children[i].textContent;
                            //console.log("entity node name: " + entity_data1.children[i].nodeName + "node value: " + entity_data1.children[i].textContent);
                        }
                        ig.game.spawnEntity(EntityLayer, this.entity_pos[x][0], this.entity_pos[x][1], { zIndex:new_entity["z"], name: new_entity["name"],
                            animSheet: new ig.AnimationSheet(new_entity["image"],new_entity["width"], new_entity["height"])});


                    }
                    console.log( "segment #" + this.segment_num + "number of entities: " + segment[this.segment_num].getElementsByTagName(child_node).length);
                    console.log(" xml variable x: " + new_entity["x_var"]);
                }
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

                //load  music
                ig.game.loadMusic(this.xml);

                //binding keys

                ig.input.bind(ig.KEY.MOUSE1, 'click');

                ig.input.bind( ig.KEY.ENTER, 'next_text' );

                ig.input.bind( ig.KEY.RIGHT_ARROW, 'next_scene');


                console.log("Exiting Init")

            },

            update: function() {

                this.parent();



                if (ig.input.pressed('next_scene')){

                    if (this.segment_num > 0){
                        //remove previous scene entities, TO DO: should I remove camera a talk button as well?
                        var layers = ig.game.getEntitiesByType('EntityLayer');
                        var spoiler = ig.game.getEntitiesByType('EntitySpoiler');
                            for(var i = 0; i<layers.length; i++){
                                layers[i].kill();
                            }
                            for(var i = 0; i<spoiler.length; i++){
                                spoiler[i].kill();
                            }
                    }
                    //spawn entities, background, camera, spoiler, and talk button
                    ig.game.loadEntities('segment', 'entity', this.xml);

                    ig.game.spawnEntity(EntityCamera, this.camera_pos[0], this.camera_pos[1], {zIndex:10,
                        animSheet: new ig.AnimationSheet('media/camera.png', 150, 150), name: 'camera'});

                    ig.game.loadSpoiler('segment', this.xml);
                    // TO DO: set up a spawn talk button function that checks if there's even a conversation
                    ig.game.spawnEntity(EntityTalkButton, this.talkbutton_pos[0], this.talkbutton_pos[1], {zIndex:12,
                        animSheet: new ig.AnimationSheet('media/talk_button.png', 50, 50), name: 'talk_button', alpha:0.5});


                    this.segment_num = this.segment_num + 1;

                }


                var talk_button = ig.game.getEntityByName('talk_button');

                /*
                 TO DO: Working on making controls semi-opaque when mouse not moving

                document.onmousemove = function(){
                    talk_button.currentAnim.alpha = .5;
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(function(){window.alert("move your mouse");}, 3000);
                }; */


                /*talking heads function */
                var entity_data = this.xml.getElementsByTagName('talking_heads')[0];
                /* can't import position from xml sheet, so using dictionary
                placement for text and head is that x,y[0] for head match x,y[0] for text
                 */
                var position = {
                    head_x: [30 , 500],
                    head_y: [40 , 200],
                    text_x: [150 ,430],
                    text_y: [80 , 240]
                };


                if (ig.input.pressed('click') && this.talk_state == 0){   /* for first click on the talk button bring up
                                                                              first head, disable after */
                    //var talk_button = ig.game.getEntityByName('talk_button');

                    if (talk_button.onButton()){

                        //load first talking head
                        ig.game.loadTalkingHeads( 'talking_head1', position.head_x[0], position.head_y[0], position.text_x[0], position.text_y[0], this.xml);

                        this.talk_state = 1;


                    }
                }

                if (ig.input.pressed('next_text') && this.talk_state == 1 && this.counter < entity_data.children.length){
                    /* after first head, if the enter button is pressed, and we haven't run out of talking heads yet,
                    load head and text.
                     */

                    var new_entity = entity_data.children[this.counter].nodeName;

                    console.log("new entity name: " + new_entity);

                    var prev_entity = ig.game.getEntitiesByType('EntityTalkingHead')[0];


                    console.log("length of entity data: " + entity_data.children.length + ", counter: " + this.counter);

                    /* switch positions of heads */

                    if (this.counter % 2 == 1 || this.counter == 1) {

                        ig.game.loadTalkingHeads( new_entity, position.head_x[1], position.head_y[1], position.text_x[1], position.text_y[1], this.xml);

                    }
                    else {
                        ig.game.loadTalkingHeads( new_entity, position.head_x[0], position.head_y[0], position.text_x[0], position.text_y[0], this.xml);
                    }



                     /* increment counter and kill the previous head */
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

