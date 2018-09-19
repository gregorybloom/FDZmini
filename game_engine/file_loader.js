// CommonJS ClassLoader Hack
var classLoadList = [];
if(typeof GameEngine === "undefined")     var GameEngine = module.parent.exports;     // Direct Load
function _loadJSEngineClasses(opts) {
	var classes = GameEngine.loadJS( __dirname, ["FileLoader"], opts, classLoadList );
	for(var i in classes) {if(eval("typeof "+i+" === 'undefined'")) {eval(""+i+" = classes[i];");}};
} _loadJSEngineClasses({"mode":"loadneeds"});



var FileLoader = FileLoader || {};

FileLoader.fetchGameEngine = function() {
  return module.parent.exports;
};
FileLoader.checkNextStage = function(_completedList,_checkIndex) {
    var subCheckList = _completedList[_checkIndex];

    for(var nameString in subCheckList) {
      var loadCheckItem = subCheckList[nameString];
      if(typeof loadCheckItem === "undefined")		continue;
      if(loadCheckItem == 0)				return _checkIndex;
      if(loadCheckItem == 1)				continue;
      return;
    }
    delete _completedList[ _checkIndex ];
    return this.getSmallestIndex( Object.keys(_completedList) );
};
FileLoader.getSmallestIndex = function(_indexList) {
  var smallestIndex = null;
  for(var i=0; i<_indexList.length; i++) {
    if(smallestIndex == null || smallestIndex > parseInt(_indexList[i]))		smallestIndex = parseInt(_indexList[i]);
  }
  return smallestIndex;
};

FileLoader.loadFileGroup = function(loadState,GameEngine,loadList,loadIndex,loadopts,callback) {
  var subList = loadList[loadIndex];
  for(var j=0; j<subList.length; j++) {
    var loadItem = subList[j];
    var nameString = GameEngine.GameResources.grabNameLabel(loadItem);

    var optsList = {"args":{"name":nameString}};
    if(typeof loadopts['mode'] !== "undefined")		optsList["args"]["mode"] = loadopts['mode'];

    var path = window.location.href;
    path = (path.match(/^(.*[\/\\])/mg)).pop();
    GameEngine.asyncBrowserLoad(path+"/game_engine/"+loadItem['path'], optsList, function(_opts, _e) {
        var loadedName = _opts['args']['name'];
        var loadedMode = _opts['args']['mode'];

        GameEngine.GameResources.checkList[loadIndex][loadedName]=1;

        // Is next Index the same file, or new?
        var checkIndex = this.checkNextStage(GameEngine.GameResources.checkList,loadIndex);
        if(loadIndex == checkIndex)		return;
        if(checkIndex != null)					FileLoader.loadFileGroup(loadState,GameEngine,loadList,checkIndex,loadopts,callback);

        if( Object.keys(GameEngine.GameResources.checkList).length > 0 )		return;

      // If there are no more indexes in checkList...
        if(checkIndex == null && typeof callback === "function")      callback();

    }.bind(this));
  }
};

FileLoader.loadEngineFiles = function(loadState,GameEngine) {
  if(loadState == "classFiles") {
    GameEngine.loadedClassList = GameEngine.GameResources.buildOrderedLoadList(GameEngine.GameResources.classList,null);
    GameEngine.GameResources.checkList = GameEngine.GameResources.createChecklist(GameEngine.loadedClassList);
  }
  if(loadState == "codeFiles" && GameEngine.getEngineType() == 'electron') {
    GameEngine.loadedCodeList = GameEngine.GameResources.buildOrderedLoadList(GameEngine.GameResources.codeList,{"mode":"codeload"});
    GameEngine.GameResources.checkList = GameEngine.GameResources.createChecklist(GameEngine.loadedCodeList);
  }


  var loadingList = null;
  if(loadState == "classFiles")     loadingList = GameEngine.loadedClassList;
  if(loadState == "codeFiles")      loadingList = GameEngine.loadedCodeList;

  if(loadingList == null)           return;

  if(loadState == "classFiles")     GameEngine.loadPhase = "CLASSLOAD";
  if(loadState == "codeFiles")      GameEngine.loadPhase = "CODELOAD";


  if( GameEngine.getEngineType() == 'browser' ) {
      var smallestIndex = this.getSmallestIndex( Object.keys(loadingList) );

      this.loadFileGroup(loadState,GameEngine,loadingList,smallestIndex,{"mode":"classload"},function() {
					GameEngine.loadedCodeList = GameEngine.GameResources.buildOrderedLoadList(GameEngine.GameResources.codeList,{"mode":"codeload"});
			    GameEngine.GameResources.checkList = GameEngine.GameResources.createChecklist(GameEngine.loadedCodeList);
					console.log("CALLBACK");

          var smallestIndex = this.getSmallestIndex( Object.keys(GameEngine.loadedCodeList) );

	        this.loadFileGroup(loadState,GameEngine,GameEngine.loadedCodeList,smallestIndex,{"mode":"codeload"},function() {

		          console.log("LOAD COMPLETE!  BEGIN GAME...");
		          GameEngine.asyncBrowserLoad(path+"/game_engine/game_setup.js", {}, function(_opts, _e) {});
	        }.bind(this));

      }.bind(this));

  }
  if( GameEngine.getEngineType() == 'electron' ) {

    for(var i in loadingList) {
        for(var loadIndex in loadingList[i]) {
            var loadItem = loadingList[i][loadIndex];

            var loadName = GameEngine.GameResources.grabNameLabel(loadItem);

            var newModule = require("./" + loadItem['path']);
            for(var j in newModule) {
                if(j == "classSet") {
                    for(var k in newModule[j]) {
                        if(k == "_loadJSEngineClasses")    continue;

                        GameEngine.classes[k] = newModule[j][k];
                    }
                }
                else if(j == loadName) {
                    GameEngine.classes[j] = newModule[j];
                    if(loadState == "codeFiles") {
                      if(typeof newModule[j]._loadJSEngineClasses === "function")   newModule[j]._loadJSEngineClasses({"mode":"loadneeds"});
                    }
                }
            }
        }
    }

    if(loadState == "classFiles") {
        GameEngine.loadPhase = "FIXCLASSLOAD";
        for(var classIndex in GameEngine.classes) {
            var classListItem = GameEngine.classes[ classIndex ];
            if(classListItem != null && typeof classListItem !== "undefined") {
              if(typeof classListItem._loadJSEngineClasses === "function")   classListItem._loadJSEngineClasses({"mode":"loaduses"});
            }
        }
    }

  }
};

GameEngine.FileLoader = FileLoader;

exports.FileLoader = FileLoader;
exports.FileLoader._loadJSEngineClasses = _loadJSEngineClasses;
