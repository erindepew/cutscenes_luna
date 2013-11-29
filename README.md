cut-scenes_luna
==============

generates cut-scenes for Luna Nova game

#API

##main.js

###function loadXML
input: (null)
output: (null)
desc: request and store xml file
process:
1. new xml request
2. open xml file
3. set global xml variable to result of xml file

###function loadMusic
input: xml
output: (null)
desc: get music file url from xml file and play
1. get "sound" node from xml file and set music_url to url text
2. add music to game
3. set volume to 1
4. play music file

###function loadSpoiler
input: parent_node, xml
output: (null)
desc: set spoiler to either true/inactive or false/active
1. Get current segment spoiler node and set var spoiler to text content
2. spawn spoiler button entity
    a. if var spoiler == true set current animation to inactive
    b. if var spoiler == false set current animation to active

###function loadEntities
input: xml, parent_node, child_node
output: (null)
desc: spawn entities and background
1. if segment_num is less than total length of segments
2. iterate to this segment's background node
3. spawn background entity
4. for each entity child node of this segment
    a. spawn entity

###function loadTalkingHeads
input: entity_name, x_pos, y_pos, text_posx, text_posy, xml
output: (null)
desc: display talking heads with text
1. spawn talking head entity

##update loop main.js

###event handler next_scene
input: (null)
output: (null)
desc: load all entities for next scene
1. If this is not the first scene
    a. kill all the entities
2. call function loadEntities
3. spawn camera entity
4. call function loadCamera
5. spawn talk_button entity
6. increment segment_num

###even handler click
input: click on talk_button
output: (null)
desc: start talking head sequence
1. if click event is first click event on talk_button
    a. load first talking_head entity
    b. set talk_state to 1

###event handler next_text
input: enter key event
output: (null)
desc: load next talking head and text
1. if enter key event happens and talk_state > 1 and var counter < total talking heads
    a. set current talking head entity to prev_entity
    b.if counter is even load next talking head at upper right corner
    c. if counter is odd load next alking head at upper left corner
2. increment counter
3. kill prev_entity

##scene_layer.js

###event handler click
input: (null)
output: (null)
desc: change entity velocity proportionate to camera entity velocity
1. if camera is moving
    a. set entity velocity to z-index * camera velocity
    b. set entity position to entity position + velocity

##talking_head.js

###function draw_text
input: (null)
output: (null)
desc: draw text string on screen one letter at a time
1. set var si to amount of time passed
2. draw substring of text equal to amount of time passed

##talk_button.js

###function Onbutton
input: (null)
output: boolean
desc: return true if mouse click is on button
1. return true if mouse x position is on button and mouse y position is on button

##camera.js

###function onCamera
input: (null)
output: boolean
desc: return true if mouse click is on camera entity
1. return true if mouse x position is on camera entity and mouse y position is on camera entity

###event handler click
input: click event
output: (null)
desc: set camera position to mouse position
1. if function onCamera returns true
    a.camera x position = mouse x position

##XML
    <segment>
        <config>
            <background>
            <sound>
            <spoiler>
        <entities>
            <entity>
                <x>
                <y>
                <z>
                <height>
                <width>
                <image>
                <name>
                 ...
            <entity n>
        <talking_heads>
            <talking_head1>
                <position>
                <height>
                <width>
                <image>
                <text>
                <text_posx>
                <text_posy>
                ...
            <talking_head n>
    ...
    <segment n>
