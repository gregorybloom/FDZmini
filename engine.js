//      https://github.com/electron-userland/electron-packager#usage

//      https://humanwhocodes.com/blog/2009/07/28/the-best-way-to-load-external-javascript/

var GameEngine = GameEngine || {};
GameEngine.classes = {};

GameEngine.basePath = './game_engine/';

//    https://stackoverflow.com/questions/42731381/module-exports-returns-an-empty-object
//		https://stackoverflow.com/questions/12820953/asynchronous-script-loading-callback

/*
GameEngine.getEngineType = function() {
};
GameEngine.asyncBrowserLoad = function(url, opts, call) {
};
/**/
GameEngine.loadGameEngineStartupData = function(call) {
    if( GameEngine.getEngineType() == 'electron' ) {
        var newModule = require(this.basePath + "game_resources.js");
        var newModule = require(this.basePath + "file_loader.js");

        if(typeof call === "function")    call();
    }
    else if( GameEngine.getEngineType() == 'browser' ) {

        var path = window.location.href;
        path = (path.match(/^(.*[\/\\])/mg)).pop();

        console.log("Loaded: JQuery",path+"/jquery-3.3.1.min.js");

        this.asyncBrowserLoad(path+"/game_engine/file_loader.js",null,null);
        this.asyncBrowserLoad(path+"/game_engine/game_resources.js", {"defer":true}, function(_opts, _e) {
          if(typeof call === "function")    call();
        }.bind(this));

    }

};
GameEngine.loadJS = function(dirPath, nameArray, loadOpts, fileArray) {
  var baseloadPath = GameEngine.basePath;

  var returnVars = {};

  var loadIndex = 0;
  var loadLength = 0;

  var needsArray = null;

  var fetchItem = null;
  if(typeof GameEngine.GameResources !== "undefined") {
      fetchItem = GameEngine.GameResources.fetchItemFromLoadList(nameArray,GameEngine.loadedClassList);
      if(fetchItem != null && typeof loadOpts !== "undefined" && typeof loadOpts['mode'] !== "undefined") {
          var varName = null;
          if(loadOpts['mode'] == "loadneeds")     varName = "needs";
          if(loadOpts['mode'] == "loaduses")      varName = "uses";
          if(varName != null) {
              if(typeof fetchItem[varName] === "undefined")     needsArray = fileArray;
              else                                              needsArray = fetchItem[varName];
          }
      }
  }
  if(fetchItem == null) {
    needsArray = fileArray;
  }
  if(needsArray == null)                      return;

  for(loadIndex = 0, loadLength = needsArray.length; loadIndex < loadLength; loadIndex++) {

      var loadName = needsArray[ loadIndex ];

      if(typeof loadIndex === "undefined")    continue;
      if(typeof loadName === "undefined")     continue;
      if(nameArray.indexOf(loadName) > -1)    continue;

      if(GameEngine.classes && GameEngine.classes[loadName]) {
          returnVars[loadName] = GameEngine.classes[loadName];
      }
  }
  return returnVars;
};

GameEngine.init = function() {
    this.loadPhase = "PRELOAD";

    this.loadGameEngineStartupData(function (_opts) {

        if( this.getEngineType() == 'electron' ) {
          this.FileLoader.loadEngineFiles("classFiles",GameEngine);
          this.FileLoader.loadEngineFiles("codeFiles",GameEngine);

          require(this.basePath+"game_setup.js");
        }
        if( this.getEngineType() == 'browser' ) {
          this.FileLoader.loadEngineFiles("classFiles",GameEngine);
        }
    }.bind(this));
};




if(typeof getEngineType === "function") {
  GameEngine.getEngineType = getEngineType;
}
if(typeof asyncBrowserLoad === "function") {
  GameEngine.asyncBrowserLoad = asyncBrowserLoad;
}
if( GameEngine.getEngineType() == 'browser' ) {
  var exports={};
  var module={};
  module.parent = {};
  module.parent.exports = {};
  module.parent.exports.loadJS = function() {return {};};
  module.parent.exports.loadPhase = "NONE";
  __dirname = "";
}


module.exports = GameEngine;
