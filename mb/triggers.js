function resetTriggers(){window.controls=new Controls({left:[37,65,"AXIS_LEFT","DPAD_LEFT"],right:[39,68,"AXIS_RIGHT","DPAD_RIGHT"],up:[38,87,32,"FACE_2"],down:[40,83,"AXIS_DOWN","DPAD_DOWN"],sprint:[16,17,"FACE_1"],pause:[80,"START_FORWARD"],mute:[77],qcount:[81]});if(window.Gamepad){window.gamepad=new Gamepad();gamepad.bind(Gamepad.Event.BUTTON_DOWN,ControlsPipe("keydown",true));gamepad.bind(Gamepad.Event.BUTTON_UP,ControlsPipe("keyup",false));gamepad.init();}
proliferate(body,{onkeydown:ControlsPipe("keydown",true),onkeyup:ControlsPipe("keyup",false),oncontextmenu:contextmenu,onmousedown:mousedown});}
function Controls(pipes,gamepadPipes){this.pipes=pipes;var keydown=this.keydown={left:function(keys){keys.run=-1;keys.left_down=true;},right:function(keys){keys.run=1;keys.right_down=true;},up:function(keys){keys.up=true;if(mario.canjump&&(mario.resting||map.underwater)){keys.jump=1;mario.canjump=keys.jumplev=0;if(mario.power>1)play("Jump Super");else play("Jump Small");if(map.underwater)setTimeout(function(){mario.jumping=keys.jump=false;},timer*14);}},down:function(keys){keys.crouch=true;},sprint:function(keys){if(mario.power==3&&keys.sprint==0&&!keys.crouch)
mario.fire();keys.sprint=1;},pause:function(keys){if(!paused&&!(window.editing&&!editor.playing))
setTimeout(function(){pause(true);},140);},mute:function(keys){toggleMute();},q:function(keys){if(++qcount>28)maxlulz();switch(qcount){case 7:lulz();break;case 14:superlulz();break;case 21:hyperlulz();break;}}};var keyup=this.keyup={left:function(keys){keys.run=0;keys.left_down=false;},right:function(keys){keys.run=0;keys.right_down=false;},up:function(keys){if(!map.underwater)keys.jump=keys.up=0;mario.canjump=true;},down:function(keys){keys.crouch=0;removeCrouch();},sprint:function(keys){keys.sprint=0;},pause:function(keys){unpause(true);},}
var tag,codes,code,i;for(tag in pipes){codes=pipes[tag];for(i in codes){code=codes[i];keydown[code]=keydown[tag];keyup[code]=keyup[tag];}}}
function ControlsPipe(name,strict){var responses=controls[name];return function(event){if((strict&&((mario&&mario.dead)||window.paused))||window.nokeys)return;if(typeof(event)!="number"||event.which||event.control)
event=event.which||event.control;if(responses[event])
responses[event](mario.keys);else mlog(name,"Could not",name,event);window.gamehistory[gamecount]=[keydown,event];}}
function keydown(event){if((mario&&mario.dead)||window.paused||window.nokeys)return;if(typeof(event)!="number"||event.which)
event=event.which;window.gamehistory[gamecount]=[keydown,event];}
function keyup(event){if(window.nokeys)return;if(typeof(event)!="number"||event.which)
event=event.which;window.gamehistory[gamecount]=[keyup,event];}
function contextmenu(event){if(event.preventDefault)
event.preventDefault();}
function mousedown(event){if(event.which==3){if(paused)unpause();else if((!window.editor)||(!editing&&!editor.playing))pause(true);if(event.preventDefault)
event.preventDefault()}}
function scriptKeys(oldhistory){var i,entry;for(i in oldhistory){entry=oldhistory[i];addEvent(entry[0],i,entry[1]);addEvent(function(){alert(entry[0].name+", "+ entry[1])},i);}}
function lulz(options,timer){mario.star=true;options=options||[Goomba];timer=timer||7;addEventInterval(function(){if(characters.length>210)return;var lul=new Thing(options[randInt(options.length)],randBoolJS(),randBoolJS());lul.yvel=random()*-unitsizet4;lul.xvel=lul.speed=random()*unitsizet2*randSign();addThing(lul,(32*random()+ 128)*unitsize,(88*random())*unitsize);},timer,Infinity);}
function superlulz(){lulz([Goomba,Koopa,Beetle,HammerBro,Lakitu,Podoboo,Blooper]);}
function hyperlulz(){lulz([Bowser],21);}
function maxlulz(){addEventInterval(function(arr){setAreaSetting(arr[randInt(arr.length)]);},7,Infinity,["Overworld","Underworld","Underwater","Sky","Castle"]);}