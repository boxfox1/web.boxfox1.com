function upkeep(){if(window.paused)return;window.nextupk=setTimeout(upkeep,timer);adjustFPS();determineAllQuadrants();maintainSolids();maintainCharacters();maintainMario();if(texts.length)maintainTexts();handleEvents();refillCanvas();}
function adjustFPS(){window.time_now=now();var time_diff=time_now- time_prev,fps_actual=roundDigit(1000/time_diff,.001);window.fps=roundDigit((.7*fps)+(.3*fps_actual),.01);window.realtime=fps_target/fps;window.time_prev=time_now;}
function pause(big){if(paused&&!window.nextupk)return;cancelAnimationFrame(nextupk);pauseAllSounds();paused=true;if(big)play("Pause");}
function unpause(){if(!paused)return;window.nextupk=requestAnimationFrame(upkeep);paused=false;resumeAllSounds();}
function maintainSolids(update){for(var i=0,solid;i<solids.length;++i){solid=solids[i];if(solid.alive){if(solid.movement)solid.movement(solid);}
if(!solid.alive||solid.right<quads.delx)
deleteThing(solid,solids,i);}}
function maintainCharacters(update){var delx=gamescreen.right+ quads.rightdiff,character,i;for(i=0;i<characters.length;++i){character=characters[i];if(!character.resting){if(!character.nofall)character.yvel+=character.gravity||map.gravity;character.yvel=min(character.yvel,map.maxyvel);}else character.yvel=0;updatePosition(character);determineThingQuadrants(character);character.under=character.undermid=false;determineThingCollisions(character);if(character.resting){if(!characterOnResting(character,character.resting)){character.resting=false;}else{character.yvel=false;setBottom(character,character.resting.top);}}
if(character.alive){if(character.type!="mario"&&!map.shifting&&(character.numquads==0||character.left>delx)&&!character.outerok){deleteThing(character,characters,i);}
else{if(!character.nomove&&character.movement)
character.movement(character);}}
else if(!map.shifting)deleteThing(character,characters,i);}}
function maintainMario(update){if(!mario.alive)return;if(mario.yvel>0){if(!map.underwater)mario.keys.jump=0;if(!mario.jumping){if(map.underwater){if(!mario.paddling){switchClass(mario,"paddling","paddling");mario.padding=true;}}
else{addClass(mario,"jumping");mario.jumping=true;}}
if(!mario.piping&&!mario.dying&&mario.top>gamescreen.deathheight){if(map.exitloc){if(map.random){goToTransport(["Random","Overworld","Down"]);marioDropsIn();return;}
return shiftToLocation(map.exitloc);}
clearMarioStats();killMario(mario,2);}}
if(mario.xvel>0){if(mario.right>gamescreen.middlex){if(mario.right>gamescreen.right- gamescreen.left)
mario.xvel=min(0,mario.xvel);}}
else if(mario.left<0){mario.xvel=max(0,mario.xvel);}
if(mario.under)mario.jumpcount=0;window.scrolloffset=(map.canscroll)*(mario.right- gamescreen.middlex);if(scrolloffset>0&&!map.shifting){scrollWindow(lastscroll=round(min(mario.scrollspeed,scrolloffset)));}
else lastscroll=0;}
function maintainTexts(){var element,me,i;for(i=texts.length- 1;i>=0;--i){me=texts[i];element=me.element||me;if(me.xvel)elementShiftLeft(element,me.xvel);if(me.yvel)elementShiftTop(element,me.yvel);}}