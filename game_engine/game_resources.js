// CommonJS ClassLoader Hack
var classLoadList = [];
if(typeof GameEngine === "undefined")     var GameEngine = module.parent.exports;     // Direct Load
function _loadJSEngineClasses(opts) {
	var classes = GameEngine.loadJS( __dirname, ["GameResources"], opts, classLoadList );
	for(var i in classes) {if(eval("typeof "+i+" === 'undefined'")) {eval(""+i+" = classes[i];");}};
} _loadJSEngineClasses({"mode":"loadneeds"});



var GameResources = GameResources || {};
GameResources.checkList = {};
GameResources.sortKeyList = function(classListKeys){
  return classListKeys.sort();
};
GameResources.parseToPath = function(path) {
  return (path.match(/^(.*[\/\\]game_engine[\/\\])/mg) || ["./"]).pop();
};
GameResources.parseFromPath = function(path) {
  return (path.match(/([\/\\]game_engine[\/\\]).*$/mg) || ["./"]).pop();
};
GameResources.grabNameLabel = function(_loadItem) {
  var nameString = null;
  if(typeof _loadItem['nameset'] !== "undefined")			nameString = _loadItem['nameset'];
  else if(typeof _loadItem['name'] !== "undefined")		nameString = _loadItem['name'];
  else if(typeof _loadItem['label'] !== "undefined")		nameString = _loadItem['label'];
  return nameString;
};

GameResources.fetchItemFromLoadList = function(nameList,loadList){

  var nameSearch = nameList[0];
  if(nameList.length > 1)  nameSearch = JSON.stringify(nameList.sort());

  var fetchedArray = null;
  for(var index in loadList) {
    for(var loadItemIndex in loadList[index]) {
      var loadItem = loadList[index][loadItemIndex];

      if(typeof nameSearch === "string") {
        if(typeof loadItem['name'] !== "undefined" && nameSearch == loadItem['name']) {
          return loadItem;
        }
        if(typeof loadItem['label'] !== "undefined" && nameSearch == loadItem['label']) {
          return loadItem;
        }
      }
      if(typeof nameSearch === "object") {
        if(typeof loadItem['nameset'] !== "undefined" && nameSearch == JSON.stringify(loadItem['nameset'].sort())) {
          return loadItem;
        }
      }
    }
  }
  return null;
};

GameResources.createChecklist = function(_loadList) {

  completedList = {};
  for(var loadIndex in _loadList) {
    completedList[loadIndex] = {};
    var subList = _loadList[loadIndex];
    for(var j=0; j<subList.length; j++) {
      var loadItem = subList[j];

      var nameString = GameResources.grabNameLabel(loadItem);
      if(nameString != null) {
        completedList[loadIndex][ nameString ]=0;
      }
    }
  }
  return completedList;
};
GameResources.buildOrderedLoadList = function(classList,moderun){
  if(typeof moderun === "undefined" || moderun == null)     moderun={};


  var loadList = {};
  var entryList = {};
  var tempEntryList = {};


  var keylist = Object.keys(classList);
  var sortedlist = this.sortKeyList(keylist);


  for(var i=0; i<sortedlist.length; i++) {
    var key = sortedlist[i];
    if(typeof classList[key] === "undefined" || classList[key] == null)   continue;

    var stepLoadList = [];

    var itemGroup = classList[key];
    for(var j=0; j<itemGroup.length; j++) {
      for(var k=0; k < itemGroup[j].length; k++) {

        var item = itemGroup[j][k];
        if(typeof item['name'] !== "undefined") {
          entryList[ item['name'] ] = JSON.parse(JSON.stringify(item));
        }
        else if(typeof item['nameset'] !== "undefined") {
          for(var m=0; m<item['nameset'].length; m++) {
            entryList[ item['nameset'][m] ] = JSON.parse(JSON.stringify(item));
          }
        }
        else if(typeof item['label'] !== "undefined") {
          entryList[ item['label'] ] = JSON.parse(JSON.stringify(item));
        }
      }
    }


//    console.log('-----------------------------');
    tempEntryList = JSON.parse(JSON.stringify(entryList));
    var levelCount = 0;

    while(true) {
//      console.log('* ~~~~~~~~~~~~~~~~~~~~~~~~~~',i,',',levelCount,'~~~~~~~~~~~~~~~~~~~~~~~~~~');
      if(Object.keys(tempEntryList).length == 0)        break;

      var baseStep = (Object.keys(loadList)).length;
      var totalCount = baseStep;
      for(var itemName in tempEntryList) {
//        console.log('* -------------',itemName,'-------------');
        baseStep = (Object.keys(loadList)).length;
        totalCount = baseStep;


        if(totalCount > Object.keys(entryList).length)    break;
        if(typeof entryList[itemName] === "undefined")    continue;

        if(typeof tempEntryList[itemName]['count'] === "undefined") {
          if(tempEntryList[itemName].needs.length == 0) {
            entryList[itemName]['count'] = 0;
            tempEntryList[itemName]['count'] = 0;
          }
          else {
            var levelFound = -1;
            for(var neededIndex in tempEntryList[itemName].needs) {
              var neededItemName = tempEntryList[itemName].needs[neededIndex];


              if(typeof entryList[neededItemName] === "undefined")    {levelFound = -1; break;}
              if(typeof entryList[neededItemName]['count'] === "undefined")    {levelFound = -1; break;}

              if(entryList[neededItemName]['count'] > levelFound)   levelFound = entryList[neededItemName]['count'];
            }
            if(levelFound == -1)    continue;

            entryList[itemName]['count'] = levelFound+1;
            tempEntryList[itemName]['count'] = levelFound+1;
            }
        }

        if(tempEntryList[itemName]['count'] >= levelCount) {
          var loadLevel = tempEntryList[itemName]['count'];

          if(typeof loadList[loadLevel] === "undefined")   loadList[loadLevel] = [];
          loadList[loadLevel].push(  tempEntryList[itemName]  );

          delete tempEntryList[itemName];
          continue;
        }

      }

      levelCount += 1;
    }

  }
  return loadList;
};


GameResources.classList = {
    1:
    [
      //    Start UpItems
      [
        {'name':'BufferLoader',     'path':   'buffer_loader.js',      'needs':[],          'uses':[],          },
      ],

      //    Core Game Engine Components
      [
        {'name':'GAMEGEOM',       'path':   'FDZ_js/game_geometrics.js',     'needs':[],          'uses':[],          },
        {'name':'GAMECONTROL',    'path':   'FDZ_js/game_control.js',        'needs':[],          'uses':[],          },
        {'name':'GAMESOUNDS',     'path':   'FDZ_js/game_sounds.js',         'needs':[],          'uses':["BufferLoader"],          },
        {'name':'GAMEMUSIC',      'path':   'FDZ_js/game_music.js',          'needs':[],          'uses':[],          },
        {'name':'GAMEVIEW',       'path':   'FDZ_js/game_view.js',           'needs':[],          'uses':["GameCamera"],          },
        {'name':'GAMEANIMATIONS', 'path':   'FDZ_js/game_animations.js',     'needs':[],          'uses':[],          },
        {'name':'GAMEMODEL',      'path':   'FDZ_js/game_model.js',          'needs':[],          'uses':["Actor","SessionActor","GameCamera","GameClock","ScreenManager"],          },
      ],

      //    Secondary Game Engine Components
      [
        {'name':'GAMELOADER',       'path':   'FDZ_js/game_loader.js',         'needs':[],          'uses':[],          },
        {'name':'RenderEngine',     'path':   'FDZ_js/gameview/render_engine.js',       'needs':[],          'uses':[],          },
      ],

      //    Base Engine Components
      [
        {'name':'TimerObj',       'path':   'FDZ_js/actors/timer.js',       'needs':[],          'uses':[],          },
        {'name':'Actor',          'path':   'FDZ_js/actors/actor.js',       'needs':[],          'uses':[],          },
      ],

      [
        {'name':'GameCamera',       'path':  'FDZ_js/gamedisplay/gamecamera.js',     'needs':["Actor"],          'uses':[],          },
        {'name':'ScreenManager',    'path':  'FDZ_js/gamedisplay/screen_manager.js',     'needs':["Actor"],          'uses':["GameCamera"],          },
        {'name':'ViewScreen',       'path':  'FDZ_js/gamedisplay/view_screen.js',     'needs':["Actor"],          'uses':[],          },
      ],

      [
        {'name':'GameClock',       'path':  'FDZ_js/gamemodel/gameclock.js',       'needs':[],          'uses':[],          },
        {'name':'AreaActor',       'path':  'FDZ_js/gamemodel/areaactor.js',       'needs':["Actor"],          'uses':[],          },
        {'name':'SessionActor',    'path':  'FDZ_js/gamemodel/session_actor.js',     'needs':["Actor"],          'uses':["WorldActor","GameCamera","GameClock"],          },
        {'name':'WorldActor',      'path':  'FDZ_js/gamemodel/world_actor.js',     'needs':["Actor"],          'uses':[],          },
      ],

      [
        {'nameset':['ImageFrame','ImageFrameSet'],
                                  'path':  'FDZ_js/graphics/imgframe.js',     'needs':[],          'uses':[],          },
        {'nameset':['AnimationFrame,AnimationSequence,AnimationCollection'],
                                  'path':  'FDZ_js/graphics/animframe.js',     'needs':[],          'uses':[],          },
      ],

      [
        {'name':'ShapeObject',       'path':  'FDZ_js/module/shapes/shapeobj.js',       'needs':[],          'uses':[],          },
        {'name':'CircleShape',       'path':  'FDZ_js/module/shapes/circleshape.js',       'needs':["ShapeObject"],      'uses':[],          },
				{'name':'BoxShape',     		  'path':  'FDZ_js/module/shapes/boxshape.js',       'needs':["ShapeObject"],      'uses':[],          },
				{'name':'SegmentShape',       'path':  'FDZ_js/module/shapes/segmentshape.js',       'needs':["ShapeObject"],      'uses':[],          },
      ],

      [
        {'name':'ActionObject',       'path':  'FDZ_js/module/actions/actionobj.js',       'needs':[],          'uses':[],          },
        {'name':'ActionList',       'path':  'FDZ_js/module/actions/actionlist.js',       'needs':[],      'uses':[],          },
      ],

      [
        {'name':'ActionModule',       'path':  'FDZ_js/module/actionmodule.js',       'needs':[],          'uses':[],          },
        {'name':'StepModule',       'path':  'FDZ_js/module/stepmodule.js',       'needs':[],          'uses':[],          },
        {'name':'AnimationModule',       'path':  'FDZ_js/module/animationmodule.js',       'needs':[],          'uses':[],          },
        {'name':'CollisionModule',       'path':  'FDZ_js/module/collisionmodule.js',       'needs':[],          'uses':[],          },
        {'name':'MotionModule',       'path':  'FDZ_js/module/motionmodule.js',       'needs':["ActionModule"],          'uses':[],          },
      ],

      [
        {'name':'MoveActorComponent',       'path':  'FDZ_js/module/movescripts/movecomponent.js',       'needs':[],          'uses':[],          },
        {'name':'MoveActorBasicPath',       'path':  'FDZ_js/module/movescripts/basicpath.js',       'needs':["MoveActorComponent"],          'uses':[],          },
        {'name':'MoveActorBasicProgress',       'path':  'FDZ_js/module/movescripts/basicprogress.js',       'needs':["MoveActorComponent"],          'uses':[],          },
      ],

      [
        {'name':'MoveActor',       'path':  'FDZ_js/module/movescripts/moveactor.js',       'needs':["ActionObject"],          'uses':[],          },
        {'nameset':['MoveActorDuration','DurationByTime','DurationByDistance'],
                                  'path':  'FDZ_js/module/movescripts/durations.js',     'needs':["MoveActorComponent"],          'uses':[],          },
        {'nameset':['MoveActorHeading','HeadingByVector'],
                                'path':  'FDZ_js/module/movescripts/headings.js',     'needs':["MoveActorComponent"],          'uses':[],          },
        {'nameset':['MoveActorIncrement','IncrementBySpeed'],
                                'path':  'FDZ_js/module/movescripts/increments.js',     'needs':["MoveActorComponent"],          'uses':[],          },
        {'nameset':['CubicBezierPath','QuadBezierPath','LinearPath'],
                                'path':  'FDZ_js/module/movescripts/paths.js',     'needs':["MoveActorBasicPath"],          'uses':[],          },
        {'name':'LinearProgress',       'path':  'FDZ_js/module/movescripts/progress.js',       'needs':["MoveActorBasicProgress"],          'uses':[],          },

      ],


      [
        {'name':'TextActor',       'path':  'ex_js9/actors/textactor.js',       'needs':["Actor"],          'uses':[],          },
        {'name':'BlockActor',       'path':  'ex_js9/actors/blockactor.js',       'needs':["Actor"],          'uses':[],          },
        {'name':'CharActor',       'path':  'ex_js9/actors/charactor.js',       'needs':["Actor"],          'uses':["TimerObj","TeleportCircleActor","PlayerTeleportCircle","BlockActor","LaserBoxActor","SmokeActor","CollisionModule","CircleShape","BoxShape"],          },
        {'name':'CheckpointActor',       'path':  'ex_js9/actors/checkpoint.js',       'needs':["Actor"],          'uses':["TimerObj"],          },
        {'name':'LaserBoxActor',       'path':  'ex_js9/actors/laserbox.js',       'needs':["Actor"],          'uses':["LaserBeamActor"],          },
        {'name':'MirrorActor',       'path':  'ex_js9/actors/mirroractor.js',       'needs':["Actor"],          'uses':[],          },
        {'name':'OrbActor',       'path':  'ex_js9/actors/orbactor.js',       'needs':["Actor"],          'uses':["TimerObj","CharActor","CollisionModule","CircleShape"],          },
        {'name':'PathChainActor',       'path':  'ex_js9/actors/pathchain.js',       'needs':["Actor"],          'uses':["TelPathActor"],          },
        {'name':'SwitchActor',       'path':  'ex_js9/actors/switchactor.js',       'needs':["Actor"],          'uses':[],          },
      ],

      [
        {'name':'TeleportCircleActor',       'path':  'ex_js9/actors/teleportcircle.js',       'needs':["Actor"],          'uses':["TimerObj","PathChainActor"],          },
        {'name':'PlayerTeleportCircle',       'path':  'ex_js9/actors/playerteleportcircle.js',       'needs':["TeleportCircleActor"],          'uses':["Actor","TimerObj","TeleportRayActor","TeleMoveShadowActor","CharActor"],          },
        {'name':'EnemyTeleportCircle',       'path':  'ex_js9/actors/enemyteleportcircle.js',       'needs':["TeleportCircleActor"],          'uses':["Actor","TeleportRayActor","TeleMoveShadowActor"],          },
      ],

      [
        {'name':'EffectActor',       'path':  'ex_js9/effects/effectactor.js',       'needs':["Actor"],          'uses':["TimerObj"],          },
        {'name':'SmokeActor',       'path':  'ex_js9/effects/smokeactor.js',       'needs':["Actor"],          'uses':[],          },
        {'name':'StarFieldArea',       'path':  'ex_js9/effects/starfield.js',       'needs':["Actor"],          'uses':[],          },
        {'name':'TeleMoveLineActor',       'path':  'ex_js9/effects/telemoveline.js',       'needs':["EffectActor"],          'uses':["TeleMoveShadowActor"],          },
        {'name':'TeleMoveShadowActor',       'path':  'ex_js9/effects/telemoveshadow.js',       'needs':["EffectActor"],          'uses':[],          },
      ],

      [
        {'name':'EnemyActor',       'path':  'ex_js9/enemies/enemyactor.js',       'needs':["Actor"],          'uses':["TimerObj","MotionModule"],          },
        {'name':'EnemyBlasterActor',       'path':  'ex_js9/enemies/enemyblasteractor.js',       'needs':["EnemyActor"],          'uses':["TimerObj","Actor","LaserBeamActor","EnemyShotActor"],          },
        {'name':'EnemyCircleBlaster',       'path':  'ex_js9/enemies/enemycircleblaster.js',       'needs':["EnemyBlasterActor"],          'uses':["CharActor","EnemyJumperActor",,"CollisionModule","CircleShape"],          },
        {'name':'EnemyDropActor',       'path':  'ex_js9/enemies/enemydropactor.js',       'needs':["Actor"],          'uses':["TimerObj"],          },
        {'name':'EnemyJumperActor',       'path':  'ex_js9/enemies/enemyjumperactor.js',       'needs':["EnemyBlasterActor"],          'uses':["TimerObj","Actor","CharActor","StepModule","BlockActor","LaserBoxActor","TeleportCircleActor","EnemyTeleportCircle",,"CollisionModule","CircleShape"],          },
        {'name':'EnemySquareBlaster',       'path':  'ex_js9/enemies/enemysquareblaster.js',       'needs':["EnemyBlasterActor"],          'uses':["TimerObj","CharActor","EnemyJumperActor","CollisionModule","BoxShape"],          },
      ],


      [
				{'name':'RayActor',       'path':  'ex_js9/rayactors/rayactor.js',       'needs':["Actor"],          'uses':["CollisionModule","SegmentShape","EnemyActor","LaserBeamActor"],          },
        {'name':'StepRayActor',       'path':  'ex_js9/rayactors/stepray.js',       'needs':["Actor"],          'uses':["OrbActor","LaserBoxActor","SwitchActor","BlockActor","TelPathActor","EnemySquareBlaster","EnemyCircleBlaster","EnemyJumperActor"],          },
        {'name':'LaserBeamActor',       'path':  'ex_js9/rayactors/laserbeam.js',       'needs':["RayActor"],          'uses':["EnemyActor","LaserBeamActor"],          },
        {'name':'TelPathActor',       'path':  'ex_js9/rayactors/telepath.js',       'needs':["EffectActor"],          'uses':[],          },
        {'name':'TeleportRayActor',       'path':  'ex_js9/rayactors/teleportray.js',       'needs':["Actor"],          'uses':["CharActor","TelPathActor","TeleMoveLineActor","EnemyCircleBlaster","EnemySquareBlaster","EnemyJumperActor","LaserBoxActor","MirrorActor","OrbActor","BlockActor","SwitchActor"],          },
      ],

      [
        {'name':'BasicShotActor',       'path':  'ex_js9/shotactors/basicshotactor.js',       'needs':["Actor"],          'uses':[],          },
        {'name':'EnemyShotActor',       'path':  'ex_js9/shotactors/enemyshotactor.js',       'needs':["BasicShotActor"],          'uses':["StepRayActor"],          },
      ],

      [
        {'name':'ACTOR_FACTORY',       'path':  'ex_js9/gamemodel/actor_factory.js',       'needs':[],          'uses':["Actor"],          },
        {'name':'LEVELLOADER',       'path':  'ex_js9/gamemodel/level_loader.js',       'needs':[],          'uses':["TextActor","OrbActor","EnemyDropActor","CheckpointActor","EnemyCircleBlaster","EnemySquareBlaster","EnemyJumperActor"],          },
        {'name':'CamField',       'path':  'ex_js9/gamemodel/camfield.js',       'needs':["Actor"],          'uses':["CharActor","BasicShotActor","EnemyActor","CheckpointActor"],          },
        {'name':'DropperActor',       'path':  'ex_js9/gamemodel/dropper.js',       'needs':["Actor"],          'uses':["TimerObj","EnemyActor"],          },
        {'name':'GameWorld',       'path':  'ex_js9/gamemodel/gameworld.js',       'needs':["WorldActor"],          'uses':["Actor","LEVELLOADER","CharActor","DropperActor"],          },
      ],

      [
        {'name':'BEHAVIOR_BUILDER',       'path':  'ex_js9/behavior_builder.js',       'needs':[],          'uses':[],          },
      ],

    ],
};
GameResources.codeList = {
    1:
    [
      [
        {'label':'ranseedloader',       'path':  'seedrandom.davidbau.2.4.0.min.js',       'needs':[],          'uses':[],          },
        {'label':'xxxx1',               'path':  'ex_js9/levels/level0.js',       'needs':[],                     'uses':["GameWorld","StarFieldArea","CharActor","CamField","DropperActor"],          },
        {'label':'xxxx2',               'path':  'ex_js9/loadoverrides.js',       'needs':['xxxx1'],          'uses':["Actor","AnimationCollection"],          },
        {'label':'xxxx3',               'path':  'ex_js9/gameoverrides.js',       'needs':['xxxx2'],          'uses':["GAMEVIEW","GAMEMODEL","GameWorld","Actor"],          },
      ],
    ],
};

GameEngine.GameResources = GameResources;

exports.GameResources = GameResources;
exports.GameResources._loadJSEngineClasses = _loadJSEngineClasses;
