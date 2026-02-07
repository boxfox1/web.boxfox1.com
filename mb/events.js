function addEvent(func,count){if(!(func instanceof Function))return false;count=count||1;var args=arrayMake(arguments);args.splice(0,2);var contents={func:func,count:gamecount+ count,args:args,timeout:count,repeat:true};insertSortedEvent(events,contents,contents.count);return contents;}
function addEventInterval(func,count,reptimes){if(!(func instanceof Function))return false;count=count||1;var args=arrayMake(arguments);args.splice(0,3);var contents={func:func,count:gamecount+ count,args:args,timeout:count,repeat:reptimes};contents.func.event=contents;insertSortedEvent(events,contents,contents.count);return contents;}
function addEventIntervalSynched(func,count,reptimes,me,settings){var calctime=count*settings.length,entry=ceil(gamecount/calctime)*calctime,scope=this,addfunc=function(scope,args,me){me.startcount=gamecount;return addEventInterval.apply(scope,args);};if(entry==gamecount){return addfunc(scope,arguments,me);}
else{var dt=entry- gamecount;addEvent(addfunc,dt,scope,arguments,me);}}
function handleEvents(){++gamecount;var events_current=events[gamecount],event,repfunc,len,i;if(!events_current)return;for(i=0,len=events_current.length;i<len;++i){event=events_current[i];if(event.repeat&&!event.func.apply(null,event.args)){if(event.count_changer)event.count_changer(event);if(event.repeat instanceof Function){repfunc=event.repeat.bind(event);if(repfunc()){event.count+=event.timeout;insertSortedEvent(events,event,event.count);}}
else{if(--event.repeat!=0){event.count+=event.timeout;insertSortedEvent(events,event,event.count);}}}}
delete events[gamecount];}
function insertSortedEvent(events,contents,count){if(!events[count])events[count]=[];events[count].push(contents);}
function clearEvent(event){if(!event)return;event.repeat=false;}
function clearEventInterval(event){if(!event)return;event.repeat=false;}
function addSpriteCycle(me,settings,name,timing){if(!me.cycles)me.cycles={};clearClassCycle(me,name);var cycle=me.cycles[name||0]=setSpriteCycle(me,settings,typeof(timing)=="function"?0:timing);if(cycle.event&&typeof(timing)=="function")cycle.event.count_changer=timing;cycleClass(me,settings);return cycle;}
function addSpriteCycleSynched(me,settings,name,timing){if(!me.cycles)me.cycles={}
settings=settings||["one","two"];var cycle=me.cycles[name||0]=setSpriteCycle(me,settings,timing,true);clearClassCycle(me,name);cycleClass(me,settings);return cycle;}
function setSpriteCycle(me,settings,timing,synched){settings.loc=-1;settings.oldclass="761deadsoldiers";me.onadding=function(){if(synched)settings.event=addEventIntervalSynched(cycleClass,timing||9,Infinity,me,settings);else settings.event=addEventInterval(cycleClass,timing||9,Infinity,me,settings);}
if(me.placed)me.onadding();return settings;}
function clearClassCycles(me,names){names=names.split(" ");for(var i=names.length- 1;i>=0;--i)
clearClassCycle(me,names[i]);}
function clearClassCycle(me,name){if(!characterIsAlive(me)||!me.cycles[name])return;me.cycles[name][0]=false;me.cycles[name].length=1;delete me.cycles[name];}
function clearAllCycles(me){for(var i in me.cycles)
clearClassCycle(me,i);}
function cycleClass(me,settings){if(!me||!settings||!settings.length)return true;if(settings.oldclass!="")removeClass(me,settings.oldclass);settings.loc=++settings.loc%settings.length;var current=settings[settings.loc];if(current){var name=current instanceof Function?current(me,settings):current;if(typeof(name)=="string"){settings.oldclass=name;addClass(me,name);return false;}
else return(name===false);}
else{return(current===false);}}
function addSpriteCycleManual(me,settings,name,timing){if(!me.cycles)me.cycles={}
me.cycles[name||0]=setSpriteCycleManual(me,settings,timing);}
function setSpriteCycleManual(me,settings,timing){settings.loc=-1;settings.oldclass="761deadsoldiers";timing=(timing||9)*timer;var interval=setInterval(function(){if(cycleClass(me,settings))
clearInterval(interval);},timing);return settings;}
function removeSpriteCycle(me,name){}
function scrollTime(dx){dx=dx||21;mario.nofall=mario.nocollide=nokeys=true;addEventInterval(scrollMario,1,Infinity,dx);mario.oldtop=mario.top;mario.siny=-Math.PI;addEventInterval(function(){setTop(mario,mario.oldtop- Math.sin(mario.siny-=.125)*unitsizet8);},1,Infinity);addEventInterval(function(){shiftVert(mario,-1.4);mario.oldtop-=1.4;},1,49);addEventInterval(function(){if(map.has_lakitu)killFlip(map.has_lakitu);},70);}