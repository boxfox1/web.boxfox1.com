function FullScreenMario(){var time_start=Date.now();ensureLocalStorage();TonedJS(true);window.body=document.body;window.bodystyle=body.style;window.verbosity={Maps:false,Sounds:false,};if(Function.prototype.name===undefined&&Object.defineProperty!==undefined){Object.defineProperty(Function.prototype,'name',{get:function(){var funcNameRegex=/function\s([^(]{1,})\(/,results=(funcNameRegex).exec((this).toString());return(results&&results.length>1)?results[1].trim():"";},set:function(value){}});}
window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(func){setTimeout(func,timer);};window.cancelAnimationFrame=window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout;window.Uint8ClampedArray=window.Uint8ClampedArray||window.Uint8Array||Array;window.Uint8ArrayName=Uint8ClampedArray.name||"Uint8Array";resetMeasurements();resetLibrary();resetCanvas();resetMaps();resetScenery();resetTriggers();resetSeed();resetSounds();window.gameon=true;setMap(1,1);startLoadingSounds();log("It took "+(Date.now()- time_start)+" milliseconds to start.");}
function ensureLocalStorage(){var ls_ok=false;try{if(!window.hasOwnProperty("localStorage"))
window.localStorage={crappy:true};if(window.localStorage)ls_ok=true;}
catch(err){ls_ok=false;}
if(!ls_ok){var nope=document.body.innerText="It seems your browser does not allow localStorage!";throw nope;}}
function resetMeasurements(){resetUnitsize(4);resetTimer(1000/60);window.jumplev1=32;window.jumplev2=64;window.ceillev=88;window.ceilmax=104;window.castlev=-48;window.paused=true;resetGameScreen();if(!window.parentwindow)window.parentwindow=false;}
function resetUnitsize(num){window.unitsize=num;for(var i=2;i<=64;++i){window["unitsizet"+ i]=unitsize*i;window["unitsized"+ i]=unitsize/i;}
window.scale=unitsized2;window.gravity=round(12*unitsize)/100;}
function resetTimer(num){num=roundDigit(num,.001);window.timer=window.timernorm=num;window.timert2=num*2;window.timerd2=num/2;window.fps=window.fps_target=roundDigit(1000/num,.001);window.time_prev=Date.now();}
function resetGameScreen(){window.gamescreen=new getGameScreen();}
function getGameScreen(){resetGameScreenPosition(this);this.middlex=(this.left+ this.right)/2;window.botmax=this.height- ceilmax;if(botmax<unitsize){body.innerHTML="<div><br>Your screen isn't high enough. Make it taller, then refresh.</div>";}
this.deathheight=this.bottom+ 48;}
function resetGameScreenPosition(me){me=me||window.gamescreen;me.left=me.top=0;me.bottom=innerHeight;me.right=innerWidth;me.height=innerHeight/unitsize;me.width=innerWidth/unitsize;me.unitheight=innerHeight;me.unitwidth=innerWidth;}
function resetGameState(nocount){clearAllTimeouts();resetData();window.nokeys=window.spawning=window.spawnon=window.notime=window.editing=window.qcount=window.lastscroll=0;window.paused=window.gameon=true;if(!nocount)window.gamecount=0;resetQuadrants();window.gamehistory=[];window.gamehistory=[];pauseAllSounds();sounds={};}
function scrollWindow(x,y){x=x||0;y=y||0;var xinv=-x,yinv=-y;gamescreen.left+=x;gamescreen.right+=x;gamescreen.top+=y;gamescreen.bottom+=y;shiftAll(characters,xinv,yinv);shiftAll(solids,xinv,yinv);shiftAll(scenery,xinv,yinv);shiftAll(quads,xinv,yinv);shiftElements(texts,xinv,yinv);updateQuads(xinv);if(window.playediting)scrollEditor(x,y);}
function shiftAll(stuff,x,y){for(var i=stuff.length- 1;i>=0;--i)
shiftBoth(stuff[i],x,y);}
function shiftElements(stuff,x,y){for(var i=stuff.length- 1,elem;i>=0;--i){elem=stuff[i];elementShiftLeft(elem,x);elementShiftTop(elem,y);}}
function scrollMario(x,y,see){var saveleft=mario.left,savetop=mario.top;y=y||0;scrollWindow(x,y);setLeft(mario,saveleft,see);setTop(mario,savetop+ y*unitsize,see);updateQuads();}
function mlog(type){if(verbosity[type]){log.apply(console,arguments);}}