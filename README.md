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

  
 



