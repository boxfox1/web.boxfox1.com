function resetSounds(){window.sounds={};window.theme=false;window.muted=(localStorage&&localStorage.muted=="true");}
function play(name_raw){var sound=sounds[name_raw];if(!sound){if(sound=library.sounds[name_raw]){sounds[name_raw]=sound;}
else{log("Unknown sound: '"+ name_raw+"'");return sound;}}
if(sound.readyState){sound.pause();sound.currentTime=0;}
sound.volume=!muted;sound.play();if(!(sound.used++))sound.addEventListener("ended",function(){mlog("Sounds",sound);soundFinish(sound,name_raw);});return sound;}
function playLocal(name,xloc,main){var sound=play(name,main),volume_real;if(!sound||!window.mario)return;if(muted||xloc<0||xloc>gamescreen.unitwidth)volume_real=0;else volume_real=max(.14,min(.84,1.4*(gamescreen.unitwidth- abs(xloc- mario.left))/gamescreen.unitwidth));sound.volume=volume_real;sound.volume_real=volume_real;}
function playTheme(name_raw,resume){if(sound=sounds.theme){soundStop(sound);delete sounds.theme;delete sounds[sound.name_raw];}
if(!name_raw)name_raw=area.theme;var sound=sounds.theme=play(name_raw);sound.loop=true;if(sound.used==1)sound.addEventListener("ended",playTheme);return sound;}
function playCurrentThemeHurry(name_raw){playTheme("Hurry "+(name_raw||area.theme));}
function soundFinish(sound,name_raw){if(sounds[name_raw])delete sounds[name_raw];}
function soundStop(sound){if(sound){sound.pause();if(sound.readyState)sound.currentTime=0;}}
function toggleMute(){var level=!(localStorage.muted=data.muted=muted=!muted);for(var i in sounds)sounds[i].volume=level;}
function pauseAllSounds(){for(var i in sounds)if(sounds[i])sounds[i].pause();}
function resumeAllSounds(){for(var i in sounds)if(sounds[i])sounds[i].play();}
function pauseTheme(){if(sounds.theme)sounds.theme.pause();}
function resumeTheme(){if(sounds.theme)sounds.theme.play();}