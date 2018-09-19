// CommonJS ClassLoader Hack
var classLoadList = ["GameWorld","StarFieldArea","CharActor","CamField","DropperActor"];
if(typeof GameEngine === "undefined")     var GameEngine = module.parent.exports.FileLoader.fetchGameEngine();
function _loadJSEngineClasses(opts) {
	var classes = GameEngine.loadJS( __dirname, [], opts, classLoadList );
	for(var i in classes) {if(eval("typeof "+i+" === 'undefined'")) {eval(""+i+" = classes[i];");}};
} _loadJSEngineClasses({"mode":"loadneeds"});



LEVELLOADER.level0 = function(args) {
  var checkpt;
  if(args) {
    checkpt = JSON.parse(JSON.stringify(args));
  }

  this.level0_base(checkpt);
  this.level0_dropper();

  GAMEMUSIC.currSong=0;
//  GAMEMUSIC.playAudio();
};
LEVELLOADER.level0_base = function(checkpt)
{
        GAMEMODEL.modelClock.changeRate(1);

        GAMEMODEL.activeObjs = 0;

        var GW = GameWorld.alloc();

        GAMEMODEL.gameSession.gameWorldList[0]=GW;
        GAMEMODEL.gameSession.gameWorld=GW;
        GAMEMODEL.gameSession.gameWorld.clear();


        GW.load();
        GW.size = {w:800,h:600};
        GW.updatePosition({x:0,y:0});

        GAMEMODEL.modelCamera.updatePosition({x:0,y:0});


        var SF = StarFieldArea.alloc();
        SF.updatePosition({x:0,y:0});
        SF.size = {w:800,h:600};
        GAMEMODEL.gameSession.gameWorld.addActor(SF,'background');



        GW.gamePlayer = CharActor.alloc();
        GAMEMODEL.gameSession.gameWorld.addActor(GW.gamePlayer,'player');
        GW.gamePlayer.updatePosition({x:0,y:50});


        var CF = CamField.alloc();
        CF.player = GW.gamePlayer;
//        CF.updatePosition({x:GW.gamePlayer.position.x,y:(GW.gamePlayer.position.y-150)});
        GW.addActor(CF,'act');
        GW.camField = CF;

            var D = DropperActor.alloc();
            D.target = CF;
            D.updatePosition({x:CF.position.x,y:CF.position.y});
            GW.addActor(D,'act');
            GW.dropper = D;

        if(checkpt) {
          GW.dropper.savedCheckpt = checkpt;
        }

};
LEVELLOADER.level0_dropper = function()
{
  var GW = GAMEMODEL.gameSession.gameWorld;

var prepactors = ACTOR_FACTORY.prepActors;
var preptext = ACTOR_FACTORY.prepTextActor;
var prepjump = ACTOR_FACTORY.prepJumpActor;


//	phases -
//	  startup
//		    titlecard & names
GW.dropper.addAndProcessLoad( "0a0aA1", 0, 0, 510, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:220},{'fadetime':7500,'fsize':44,'spd':0.24,'txt':"StarPath"}]} );
GW.dropper.addAndProcessLoad( "0a0aA2", 0, 0, 2000, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:260},{'fadetime':4500,'fsize':24,'spd':0.38,'txt':"-working title-"}]} );
GW.dropper.addAndProcessLoad( "0a0aA3", 0, 0, 4700, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:-240},{'fadetime':4500,'fsize':34,'spd':0.28,'txt':"Development by Gregory Bloom"}]} );
GW.dropper.addAndProcessLoad( "0a0aA4", 0, 0, 7000, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:-180},{'fadetime':4500,'fsize':34,'spd':0.28,'txt':"Music by Jeremy Ouillette"}]} );

GW.dropper.addAndProcessLoad( "0a0aA", 0, 0, 7500, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:0},{'prog':7500,'step':0,'stage':0,'pcol':0}]} );
GW.dropper.addAndProcessLoad( "0a0aA5", 0, 0, 10010, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:260},{'fadetime':7500,'fsize':20,'spd':0.24,'txt':"(press 1 to skip tutorial)"}]} );

//	    teleport to move!
GW.dropper.addAndProcessLoad( "0a0aB1", 0, 0, 11400, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:-80},{'fadetime':4500,'fsize':30,'spd':0.24,'txt':"Try holding and releasing SPACEBAR!"}]} );
GW.dropper.addAndProcessLoad( "0a0aB2", 0, 0, 12500, "prepfns",[prepactors,prepjump],{'act':{'name':"B1",'data':0},'args':[,"EnemyJumperActor",{x:350,y:0},{'color':0,'spd':0.05}]} );
GW.dropper.addAndProcessLoad( "0a0aB5", 0, 0, 16500, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:120},{'fadetime':4500,'fsize':30,'spd':0.2,'txt':"When in doubt, telehop by holding SHIFT..."}]} );
GW.dropper.addAndProcessLoad( "0a0aB3", 0, 0, 18500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:150,y:200},{'color':1,'spd':0.1},{'type':"ITEMORB",'color':1}]} );
GW.dropper.addAndProcessLoad( "0a0aB4", 0, 0, 19500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:150,y:-220},{'color':2,'spd':0.1}]} );

GW.dropper.addAndProcessLoad( "0a0aB", 0, 0, 21000, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:0},{'prog':20000,'step':0,'stage':0,'pcol':0}]} );

GW.dropper.addAndProcessLoad( "0a0aC1", 0, 0, 21100, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:350,y:-100},{'color':2},{'type':"ITEMORB",'color':1}]} );
GW.dropper.addAndProcessLoad( "0a0aC2", 0, 0, 23500, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:-160},{'fadetime':4500,'fsize':30,'spd':0.2,'txt':"Use SPACEBAR to strike through your foes...!"}]} );

GW.dropper.addAndProcessLoad( "0a0aC3", 0, 0, 26000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:140}] } );
GW.dropper.addAndProcessLoad( "0a0aC4", 0, 0, 28000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:40},{'color':1}] } );
GW.dropper.addAndProcessLoad( "0a0aC5", 0, 0, 31000, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:220},{'fadetime':4500,'fsize':30,'spd':0.2,'txt':"...Just don't land on them. >.<"}]} );

GW.dropper.addAndProcessLoad( "0a0aC6", 0, 0, 38000, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:220},{'fadetime':4500,'fsize':30,'spd':0.2,'txt':"lastly... your Walls, and your Color, can protect you..."}]} );
GW.dropper.addAndProcessLoad( "0a0aC7", 0, 0, 39000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:350,y:-60},{'color':0,'spd':0.24,'shot':{'active':false}}]} );

//	    opening measure
GW.dropper.addAndProcessLoad( "0a1a-", 0, 1, 200, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:0},{'prog':0,'step':1,'stage':0,'pcol':0}]} );

GW.dropper.addAndProcessLoad( "0a1aA1", 0, 1, 1500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:350,y:60},{'color':0,'spd':0.24,'shot':{'active':false}}]} );
GW.dropper.addAndProcessLoad( "0a1aA2", 0, 1, 3500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:350,y:160},{'color':0,'spd':0.24,'shot':{'active':false}}]} );

GW.dropper.addAndProcessLoad( "0a1aA3", 0, 1, 5500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:0},{'color':1,'spd':0.1,'laser':{'color':2,'angle':180}},{'type':"ITEMORB",'color':2}]} );

GW.dropper.addAndProcessLoad( "0a1aA4", 0, 1, 7000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:50},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aA5", 0, 1, 7000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:100},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aA6", 0, 1, 7000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:150},{'color':0,'spd':0.1}]} );

GW.dropper.addAndProcessLoad( "0a1aA7", 0, 1, 9500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:0},{'color':1,'spd':0.1,'laser':{'color':2,'angle':0}},{'type':"ITEMORB",'color':2}]} );

GW.dropper.addAndProcessLoad( "0a1aA", 0, 1, 13000, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:-100},{'prog':10000,'step':1,'stage':0,'pcol':0}]} );

GW.dropper.addAndProcessLoad( "0a1aA8", 0, 1, 12500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:350,y:60},{'color':0,'spd':0.04,'shot':{'active':false}},{'type':"ITEMORB",'color':2}]} );
GW.dropper.addAndProcessLoad( "0a1aA9", 0, 1, 16500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':2,'spd':0.05,'laser':{'color':2,'angle':180}},{'type':"ITEMORB",'color':2}]} );



GW.dropper.addAndProcessLoad( "0a1aA10j", 0, 1, 25000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:-260},{'color':1,'spd':0.1,'angle':90}] } );
GW.dropper.addAndProcessLoad( "0a1aA10k", 0, 1, 25000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:260},{'color':1,'spd':0.1}] } );

GW.dropper.addAndProcessLoad( "0a1aA10a", 0, 1, 24500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:200},{'color':1,'spd':0.12,'laser':{'color':0,'angle':270}}]} );
GW.dropper.addAndProcessLoad( "0a1aA10b", 0, 1, 25000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:150},{'color':1,'spd':0.12,'laser':{'color':1,'angle':270}}]} );
GW.dropper.addAndProcessLoad( "0a1aA10c", 0, 1, 25500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:100},{'color':1,'spd':0.12,'laser':{'color':2,'angle':270}}]} );
GW.dropper.addAndProcessLoad( "0a1aA10d", 0, 1, 26000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:50},{'color':1,'spd':0.12,'laser':{'color':1,'angle':270}}]} );
GW.dropper.addAndProcessLoad( "0a1aA10e", 0, 1, 26500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:0},{'color':1,'spd':0.12,'laser':{'color':0,'angle':270}}]} );
GW.dropper.addAndProcessLoad( "0a1aA10f", 0, 1, 27000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-50},{'color':1,'spd':0.12,'laser':{'color':1,'angle':270}}]} );
GW.dropper.addAndProcessLoad( "0a1aA10g", 0, 1, 27500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-100},{'color':1,'spd':0.12,'laser':{'color':2,'angle':270}}]} );
GW.dropper.addAndProcessLoad( "0a1aA10h", 0, 1, 28000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-150},{'color':1,'spd':0.12,'laser':{'color':1,'angle':270}},{'type':"ITEMORB",'color':1}]} );
GW.dropper.addAndProcessLoad( "0a1aA10i", 0, 1, 28500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-200},{'color':1,'spd':0.12,'laser':{'color':0,'angle':270}}]} );



GW.dropper.addAndProcessLoad( "0a1aA-2", 0, 1, 36000, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:0},{'prog':35000,'step':1,'stage':0,'pcol':0}]} );

GW.dropper.addAndProcessLoad( "0a1aA12a", 0, 1, 42000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-125},{'color':0,'spd':0.04,'laser':{'color':0,'angle':90}}]} );
GW.dropper.addAndProcessLoad( "0a1aA12b", 0, 1, 42000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-75},{'color':0,'spd':0.04,'laser':{'color':0,'angle':90}}]} );
GW.dropper.addAndProcessLoad( "0a1aA12c", 0, 1, 42000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-25},{'color':0,'spd':0.04,'laser':{'color':0,'angle':90}}]} );
GW.dropper.addAndProcessLoad( "0a1aA12d", 0, 1, 42000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:25},{'color':2,'spd':0.04,'laser':{'color':2,'angle':90}}]} );
GW.dropper.addAndProcessLoad( "0a1aA12e", 0, 1, 42000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:75},{'color':2,'spd':0.04,'laser':{'color':2,'angle':90}}]} );
GW.dropper.addAndProcessLoad( "0a1aA12f", 0, 1, 42000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:125},{'color':2,'spd':0.04,'laser':{'color':2,'angle':90}}]} );

GW.dropper.addAndProcessLoad( "0a1aA13a", 0, 1, 44000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':1,'spd':0.12,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aA13b", 0, 1, 44000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-225},{'color':1,'spd':0.12,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aA13c", 0, 1, 44000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-175},{'color':1,'spd':0.12,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aA13d", 0, 1, 44000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:175},{'color':1,'spd':0.12,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aA13e", 0, 1, 44000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:225},{'color':1,'spd':0.12,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aA13f", 0, 1, 44000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':1,'spd':0.12,'empty':true}]} );


// forward swarm
GW.dropper.addAndProcessLoad( "0a1aB", 0, 2, 200, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:0},{'prog':0,'step':2,'stage':0,'pcol':0}]} );

GW.dropper.addAndProcessLoad( "0a1aB1", 0, 2, 4000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:0}] } );
GW.dropper.addAndProcessLoad( "0a1aB2", 0, 2, 4000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:-80}] } );
GW.dropper.addAndProcessLoad( "0a1aB3", 0, 2, 4500, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:160},{'fadetime':4500,'fsize':30,'spd':0.2,'txt':"or build a wall......?"}]} );
GW.dropper.addAndProcessLoad( "0a1aB4", 0, 2, 8000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:80}] } );
GW.dropper.addAndProcessLoad( "0a1aB5", 0, 2, 8000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:-200}] } );
GW.dropper.addAndProcessLoad( "0a1aB6", 0, 2, 12500, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:160},{'fadetime':4500,'fsize':30,'spd':0.2,'txt':"...a thick one"}]} );
GW.dropper.addAndProcessLoad( "0a1aB7", 0, 2, 13000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:-80}] } );

GW.dropper.addAndProcessLoad( "0a1aB8", 0, 2, 14000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:150}] } );
GW.dropper.addAndProcessLoad( "0a1aB9", 0, 2, 14500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:260}] } );
GW.dropper.addAndProcessLoad( "0a1aB10", 0, 2, 14500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:200}] } );
GW.dropper.addAndProcessLoad( "0a1aB11", 0, 2, 16500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:-80}] } );
GW.dropper.addAndProcessLoad( "0a1aB12", 0, 2, 16500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:-200}] } );

//forest of leaves

GW.dropper.addAndProcessLoad( "0a1aB13", 0, 2, 22000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:200},{'type':"ITEMORB",'color':1}] } );
GW.dropper.addAndProcessLoad( "0a1aB14", 0, 2, 22500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:0},{'type':"ITEMORB",'color':2}] } );
GW.dropper.addAndProcessLoad( "0a1aB15", 0, 2, 22800, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:-200}] } );

GW.dropper.addAndProcessLoad( "0a1aB-2", 0, 2, 23000, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:0},{'prog':19000,'step':2,'stage':0,'pcol':0}]} );

GW.dropper.addAndProcessLoad( "0a1aB16", 0, 2, 27100, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:120}] } );
GW.dropper.addAndProcessLoad( "0a1aB17", 0, 2, 27100, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:120},{'angle':90,'color':2}] } );
GW.dropper.addAndProcessLoad( "0a1aB18", 0, 2, 31200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:-120}] } );
GW.dropper.addAndProcessLoad( "0a1aB19", 0, 2, 31200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:-120},{'angle':90,'color':2}] } );

GW.dropper.addAndProcessLoad( "0a1aB20", 0, 2, 31200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:220},{'color':2}] } );
GW.dropper.addAndProcessLoad( "0a1aB21", 0, 2, 31200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:220},{'angle':90,'color':2}] } );

GW.dropper.addAndProcessLoad( "0a1aB22", 0, 2, 31600, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:-280},{'angle':180}] } );
GW.dropper.addAndProcessLoad( "0a1aB23", 0, 2, 32800, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:-280},{'angle':180,'color':1}] } );
GW.dropper.addAndProcessLoad( "0a1aB24", 0, 2, 34000, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:-280},{'angle':180,'color':2}] } );

GW.dropper.addAndProcessLoad( "0a1aB25", 0, 2, 37200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:10},{'color':2}] } );
GW.dropper.addAndProcessLoad( "0a1aB26", 0, 2, 37200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:380,y:10},{'angle':90,'color':1}] } );

GW.dropper.addAndProcessLoad( "0a1aB-2", 0, 2, 44000, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:0},{'prog':41000,'step':2,'stage':0,'pcol':0}]} );

GW.dropper.addAndProcessLoad( "0a1aB27", 0, 2, 45500, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:120},{'fadetime':4500,'fsize':30,'spd':0.2,'txt':"WALL + + +..."}]} );

GW.dropper.addAndProcessLoad( "0a1aB28a-1", 0, 2, 51000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aB28a-2", 0, 2, 51000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-225},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aB28a-3", 0, 2, 51000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aB28a-4", 0, 2, 51000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:225},{'color':1,'spd':0.1,'empty':true}]} );

GW.dropper.addAndProcessLoad( "0a1aB28c", 0, 2, 51200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:-160},{'color':1,'spd':0.1,'laser':{'color':2,'angle':90}}] } );
GW.dropper.addAndProcessLoad( "0a1aB28d", 0, 2, 51200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:-110},{'color':2,'spd':0.1,'laser':{'color':1,'angle':90}}] } );
GW.dropper.addAndProcessLoad( "0a1aB28e", 0, 2, 51200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:-60},{'color':1,'spd':0.1,'laser':{'color':0,'angle':90}}] } );

GW.dropper.addAndProcessLoad( "0a1aB28f", 0, 2, 53200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:-15},{'color':0,'spd':0.1,'laser':{'color':1,'angle':90}}] } );
GW.dropper.addAndProcessLoad( "0a1aB28g", 0, 2, 53200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:15},{'color':2,'spd':0.1,'laser':{'color':0,'angle':90}}] } );

GW.dropper.addAndProcessLoad( "0a1aB28h", 0, 2, 54200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:60},{'color':1,'spd':0.1,'laser':{'color':0,'angle':90}}] } );
GW.dropper.addAndProcessLoad( "0a1aB28i", 0, 2, 54200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:110},{'color':2,'spd':0.1,'laser':{'color':1,'angle':90}}] } );
GW.dropper.addAndProcessLoad( "0a1aB28j", 0, 2, 54200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:340,y:160},{'color':1,'spd':0.1,'laser':{'color':2,'angle':90}}] } );

GW.dropper.addAndProcessLoad( "0a1aB28l-1", 0, 2, 53000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aB28l-2", 0, 2, 53000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-225},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aB28l-3", 0, 2, 53000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:225},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aB28l-4", 0, 2, 53000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':1,'spd':0.1,'empty':true}]} );



GW.dropper.addAndProcessLoad( "0a1aC", 0, 3, 200, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:0},{'prog':0,'step':3,'stage':0,'pcol':0}]} );

GW.dropper.addAndProcessLoad( "0a1aC1", 0, 3, 600, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:350,y:-20},{'color':0,'spd':0.1,'shot':{'active':false}},{'type':"ITEMORB",'color':2}]} );

GW.dropper.addAndProcessLoad( "0a1aCl-1", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aCl-2", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-225},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aCl-3", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-175},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aCl-4", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-125},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aCl-5", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-75},{'color':1,'spd':0.1,'empty':true}]} );

GW.dropper.addAndProcessLoad( "0a1aC2-1", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-25},{'color':2,'spd':0.1,'laser':{'color':2,'angle':270}}]} );
GW.dropper.addAndProcessLoad( "0a1aC2-2", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:25},{'color':2,'spd':0.1,'laser':{'color':2,'angle':270}}]} );

GW.dropper.addAndProcessLoad( "0a1aCl-9", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:75},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aCl-10", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:125},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aCl-11", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:175},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aCl-12", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:225},{'color':1,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aCl-13", 0, 3, 3000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':1,'spd':0.1,'empty':true}]} );

GW.dropper.addAndProcessLoad( "0a1aC3-1", 0, 3, 9000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-25},{'color':2,'spd':0.1,'empty':true}]} );
GW.dropper.addAndProcessLoad( "0a1aC3-2", 0, 3, 9000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:25},{'color':2,'spd':0.1,'empty':true}]} );




//    cyan bridge
GW.dropper.addAndProcessLoad( "0a4aC", 0, 4, 200, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:0},{'prog':0,'step':4,'stage':0,'pcol':0}]} );

GW.dropper.addAndProcessLoad( "0a4aX1", 0, 4, 600, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:350,y:-20},{'color':0,'spd':0.1,'shot':{'active':false}},{'type':"ITEMORB",'color':0}]} );

GW.dropper.addAndProcessLoad( "0a4aC2", 0, 4, 6500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':0,'spd':0.025,'laser':{'color':0,'angle':0}},{'type':"ITEMORB",'color':2}]} );

GW.dropper.addAndProcessLoad( "0a4aC3", 0, 4, 16500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':6,'spd':0.05,'laser':{'color':5,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a4aC4", 0, 4, 17500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:225},{'color':5,'spd':0.05,'laser':{'color':5,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a4aC5", 0, 4, 18500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:175},{'color':5,'spd':0.05,'laser':{'color':5,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a4aC6", 0, 4, 19500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:125},{'color':5,'spd':0.05,'laser':{'color':5,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a4aC7", 0, 4, 20500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:75},{'color':5,'spd':0.05,'laser':{'color':5,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a4aC8", 0, 4, 21500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:25},{'color':5,'spd':0.05,'laser':{'color':5,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a4aC9", 0, 4, 22500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-25},{'color':5,'spd':0.05,'laser':{'color':5,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a4aC10", 0, 4, 23500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-75},{'color':5,'spd':0.05,'laser':{'color':5,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a4aC11", 0, 4, 24500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-125},{'color':5,'spd':0.05,'laser':{'color':5,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a4aC12", 0, 4, 25500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-175},{'color':5,'spd':0.05,'laser':{'color':5,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a4aC13", 0, 4, 26500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-225},{'color':5,'spd':0.05,'laser':{'color':5,'angle':180}}]} );


GW.dropper.addAndProcessLoad( "0a5aC", 0, 5, 200, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:0},{'prog':0,'step':5,'stage':0,'pcol':0}]} );

GW.dropper.addAndProcessLoad( "0a5aX1", 0, 5, 600, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:350,y:-20},{'color':0,'spd':0.1,'shot':{'active':false}},{'type':"ITEMORB",'color':2}]} );

// death flippers
GW.dropper.addAndProcessLoad( "0a1aD1-1", 0, 5, 15000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':2,'spd':0.1,'laser':{'color':2,'angle':0}}]} );
GW.dropper.addAndProcessLoad( "0a1aD1-2", 0, 5, 15500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':1,'spd':0.1,'laser':{'color':1,'angle':0}}]} );
GW.dropper.addAndProcessLoad( "0a1aD1-3", 0, 5, 16000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':0,'spd':0.1,'laser':{'color':0,'angle':0}}]} );
GW.dropper.addAndProcessLoad( "0a1aD1-4", 0, 5, 16500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':1,'spd':0.1,'laser':{'color':1,'angle':0}}]} );
GW.dropper.addAndProcessLoad( "0a1aD2-1", 0, 5, 17000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':2,'spd':0.1,'laser':{'color':2,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a1aD2-2", 0, 5, 17500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':1,'spd':0.1,'laser':{'color':1,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a1aD2-3", 0, 5, 18000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':0,'spd':0.1,'laser':{'color':0,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a1aD2-4", 0, 5, 18500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':1,'spd':0.1,'laser':{'color':1,'angle':180}}]} );

GW.dropper.addAndProcessLoad( "0a1aD3-1", 0, 5, 19000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':2,'spd':0.1,'laser':{'color':2,'angle':0}}]} );
GW.dropper.addAndProcessLoad( "0a1aD3-2", 0, 5, 19500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':1,'spd':0.1,'laser':{'color':1,'angle':0}}]} );
GW.dropper.addAndProcessLoad( "0a1aD3-3", 0, 5, 20000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':0,'spd':0.1,'laser':{'color':0,'angle':0}}]} );
GW.dropper.addAndProcessLoad( "0a1aD3-4", 0, 5, 20500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:-275},{'color':1,'spd':0.1,'laser':{'color':1,'angle':0}}]} );
GW.dropper.addAndProcessLoad( "0a1aD4-1", 0, 5, 21000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':2,'spd':0.1,'laser':{'color':2,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a1aD4-2", 0, 5, 21500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':1,'spd':0.1,'laser':{'color':1,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a1aD4-3", 0, 5, 22000, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':0,'spd':0.1,'laser':{'color':0,'angle':180}}]} );
GW.dropper.addAndProcessLoad( "0a1aD4-4", 0, 5, 22500, "prepfns",[prepactors],{'args':[,"EnemySquareBlaster",{x:350,y:275},{'color':1,'spd':0.1,'laser':{'color':1,'angle':180}}]} );






GW.dropper.addAndProcessLoad( "0a4aX6", 0, 6, 200, "prepfns",[preptext],{'args':[,"TextActor",{x:420,y:220},{'fadetime':4500,'fsize':30,'spd':0.2,'txt':"Thanks for trying this experimental idea..."}]} );
GW.dropper.addAndProcessLoad( "0a4aX7", 0, 6, 200, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:350,y:-90},{'color':2,'spd':0.24,'shot':{'active':false}}]} );

GW.dropper.addAndProcessLoad( "0a4aX1", 0, 6, 1500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:350,y:10},{'color':2,'spd':0.24,'shot':{'active':false}}]} );
GW.dropper.addAndProcessLoad( "0a4aX2", 0, 6, 1500, "prepfns",[prepactors],{'args':[,"EnemyCircleBlaster",{x:350,y:160},{'color':2,'spd':0.24,'shot':{'active':false}}]} );


/**/

if(GW.dropper.savedCheckpt) {
  GW.dropper.cutToProgress( GW.dropper.savedCheckpt.progress, GW.dropper.savedCheckpt.step, GW.dropper.savedCheckpt.stage, GW.dropper.savedCheckpt.lastId );
  GW.gamePlayer.colorNum = GW.dropper.savedCheckpt.pColor;
  GW.dropper.addAndProcessLoad( "xxxx", 0, 0, 0, "prepfns",[preptext],{'args':[,"CheckpointActor",{x:420,y:0},{'prog':GW.dropper.savedCheckpt.progress,'step':GW.dropper.savedCheckpt.step,'stage':GW.dropper.savedCheckpt.stage,'dark':true}]} );
}


/*
phases -
  startup
    titlecard & names
        - "StarPath"
        - "Development by Gregory Bloom"
        - "Music by Jeremy Ouillette"
  opening measure
        - base circle, shooting left, at bottom
          - "teleport to move!"
        - then, following circle: "Use big teleports by holding and releasing SPACEBAR!"
          - base circle, shooting right, at top. holds blue orb


    /**/

};
