function startLoadingMaps(){if(window.location.protocol=="file:")return;passivelyLoadMap([1,2],new XMLHttpRequest());}
function passivelyLoadMap(map,ajax){if(!map||map[0]>8||map[1]<=0)return;var url="Maps/World"+ map[0]+""+ map[1]+".js"
ajax.open("GET",url,true);mlog("Maps","Requesting:",url);ajax.send();ajax.onreadystatechange=function(){if(ajax.readyState!=4)return;if(ajax.status==200){mapfuncs[map[0]][map[1]]=Function(ajax.responseText);if(window.parentwindow&&parentwindow.onmapload){parentwindow.onmapload(map[0],map[1]);setTimeout(function(){parentwindow.onmapload(map[0],map[1]);},2100);}
mlog("Maps"," Loaded: Maps/World"+ map[0]+""+ map[1]+".js");}
else if(ajax.status!=404)return;setTimeout(function(){passivelyLoadMap(setNextLevelArr(map),ajax);},7);};}
function setNextLevelArr(arr){if(arr[1]++==4){++arr[0];arr[1]=1;}
return arr;}
function startLoadingSounds(){var libsounds=library.sounds;setTimeout(function(){loadSounds(libsounds,library.sounds.names,"Sounds/");},7);setTimeout(function(){loadSounds(libsounds,library.sounds.themes,"Sounds/Themes/");},14);}
function loadSounds(container,reference,prefix){var sound,name_raw,details={preload:'auto',prefix:'',used:0},len,i;for(i=0,len=reference.length;i<len;++i){name_raw=reference[i];sound=createElement("Audio",details);container[name_raw]=sound;mlog("Sounds",sound)
sound.appendChild(createElement("Source",{type:"audio/mp3",src:prefix+"mp3/"+ name_raw+".mp3"}));sound.appendChild(createElement("Source",{type:"audio/ogg",src:prefix+"ogg/"+ name_raw+".ogg"}));sound.volume=0;sound.play();}}