cutscenes_luna
==============

generates cut scenes for Luna Nova game

#API

### function load_cutscene

input: path to xml    
output: (null) or state    
desc: main i/o loop  
process:   
1. request_xml  
2. load_config   
3. load_entities   

###load_config 

input: xml file config node  
output: (null)  
desc: creates background, determines whether it's a spoiler, loads music  
process:  
1. load background image  
2. set boolean for spoiler/mask share button  
3. load/play music  


###load_entities 
input: xml file entity node  
output: (null)  
desc: spawn entities   
process:  
1. iterate through entities in node  
  a. read in image, x, y, z, height and width  
  b. set spawn values and spawn  


### XML layout 

    <config>
      <background>
      <sound>
      <spoiler>

    <entity>
      <entity_1>
        <x>
        <y>
        <z>
        <height>
        <width>
        <image>
    
      ... 
  
      <entity_n>
 

###horiz_motion

input: delta of mouse or finger x position  
output: (null)  
desc: moves scene horizontally with a parallax effect when the user drags their mouse or finger  
process:  
1. If x_delta is not 0  
	a. entity_zindex * delta = velocity  
	b. entity_xindex = velocity + entity_xindex

###set_spoiler

input: spoiler boolean  
output: null  
desc: changes the spoiler button to active or grayed out depending on boolean  
process:  
1. if spoiler boolean is true:  
	a. replace spoiler button image with non-active button  
2. if spoiler boolean is false:  
	a. do nothing

#Parallax Motion Effect   

##Camera   



###onCamera
input: (null)   
output: true or false   
desc: logic for determining if mouse is on the camera entity   
process:  
Since the camera position is determined from the upper left corner of the image  
1. if mouse x pos is greater than camera x pos AND mouse x pos is less than camera x pos + width of image AND   
mouse y pos is greater than camera y pos AND mouse y pos is less than camera y pos + height of image AND within the canvas  
	a. return true  

###onClick

input: delta of mouse or finger x position and onCamera  
output: (null)  
desc: click and drag camera object and calculate the velocity  
process:  
1. If velocity of mouse is not 0 and onCamera is true    
	a.camera.velocity = current pos x - previous pos x       
2. Else
	a. camera.velocity = 0  


##Entity  


###onClick

input: camera entity velocity   
output: (null)  
desc: moves scene horizontally with a parallax effect when the user drags the camera  
process:  
1. If camera velocity is not 0  
	a. entity velocity = (entity_zindex * camera velocity ) / speed of motion    
	b. entity_x pos = entity velocity + entity_x pos


#Talking Heads 

###talking_heads  

input: (null) 
output: (null) 
desc: spawns talking heads and displays text on screen  
process:  
1. onClick  
	a. call spawn_heads
	b. call type_text  
 

###type_text  
input: conversation text strings from xml file  
output: (null)  
desc: reads in strings from xml file, every half a second type a letter onto the screen   
process:  
1. every half second  
	a. for i = 0, i < string.length, i++  
		i. draw string.slice(0, i)  

##spawn_heads  
	similar to spawn_layer1 but with a higher z-index and attached to one of four anchors // need to think this through a little more. 
 




  
 



