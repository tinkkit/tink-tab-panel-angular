'use strict';
(function(module) {
  try {
    module = angular.module('tink.tabpanel');
  } catch (e) {
    module = angular.module('tink.tabpanel', []);
  }
  module.factory('tinkTab', ['$timeout',function ($timeout) {
    var notLoaded = undefined;
    var activePanels = [];
    var _addPanel = function(panel){
      activePanels[panel.name] = panel;
      if(notLoaded && panel.name === notLoaded.panel){
        _setTabActive(notLoaded.panel,notLoaded.tab);
      }
    }

    var _removePanel = function(panel){
      delete activePanels[panel.name];
    }

    var _setTabActive = function(panel,tab){
      if(activePanels[panel]){
        panel = activePanels[panel];
        panel.ctrl.setTabName(tab);
        notLoaded = undefined;
      }else{
        notLoaded = {panel:panel,tab:tab};
      }
    }
    return {
      addPanel: _addPanel,
      removePanel: _removePanel,
      setTabActive:_setTabActive
    };
  }]);
})();
