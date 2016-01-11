'use strict';
(function(module) {
  try {
    module = angular.module('tink.tabpanel');
  } catch (e) {
    module = angular.module('tink.tabpanel', []);
  }
  module.directive('tinkTab', ['$timeout',function ($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      require:'^tinkTabPanel',
      link: function(scope,element,attr,req) {
        scope.active = function(){
          element.addClass('active');
        }

        scope.unactive = function(){
          element.removeClass('active');
        }
        element.on('click',function(){
          scope.$apply(function(){
            req.setActiveTab({name:attr.tinkTab,elem: element,scope:scope,temp:attr.tinkTabTemplate});
          })          
        })

        req.registerTab({name:attr.tinkTab,elem: element,scope:scope,temp:attr.tinkTabTemplate});
      }
    };
  }]);
})();
;'use strict';
(function(module) {
  try {
    module = angular.module('tink.tabpanel');
  } catch (e) {
    module = angular.module('tink.tabpanel', []);
  }
  module.directive('tinkTabPanel', ['$sce',function ($sce) {
    return {
      restrict: 'EA',
      replace:true,
      controller:'TabPanelController',
      link:function(scope,elem,attr,ctrl){

      }
    };
  }])
  .controller('TabPanelController',function($attrs,$location,$timeout,$sce,$templateRequest,tinkTab){
        var ctrl = this;
        var tabs = [];
        var activeTab = undefined;
        var notLoaded = undefined;
        ctrl.setActiveTab = function(tab){
          setActive(tab);
        }

        ctrl.setTabName = function(tabName){
          var found = false;
          angular.forEach(tabs,function(tab){
            if(tabName === tab.name){
              found = true;
              setActive(tab);
            }
          })
          if(!found){
            notLoaded = tabName;
          }
        }

        ctrl.registerTab = function(tab){
          tabs.push(tab);
          var selected = $location.search().tab;
          if(selected === tab.name){
            setActive(tab);
            notLoaded = undefined;
          }
          if(notLoaded){
            ctrl.setTabName(notLoaded);
          }
        }

        var setActive = function(tab){
          if(activeTab){
            activeTab.scope.unactive();
          }
          $location.search('tab', tab.name);
          setContent(tab.temp)
          tab.scope.active();
          activeTab = tab;
          notLoaded = undefined;      
        }

        var setContent = function(content){
          $timeout(function() {
            if($attrs.tinkTabPanel){
              var panel = $("[tink-tab-panel-content='"+$attrs.tinkTabPanel+"']")
              var changeContent = panel.scope().changeContent;
              if(changeContent){
                var templateUrl = $sce.getTrustedResourceUrl(content);
                $templateRequest(templateUrl).then(function(template) {
                    changeContent(template);
                }, function(e) {
                    console.error('Template error!',e);
                });
              }
            }
          }, 0);
        }
        if($attrs.tinkTabPanel){
          tinkTab.addPanel({name:$attrs.tinkTabPanel,ctrl:this});
        }
        
      })
})();
;'use strict';
(function(module) {
  try {
    module = angular.module('tink.tabpanel');
  } catch (e) {
    module = angular.module('tink.tabpanel', []);
  }
  module.directive('tinkTabPanelContent', ['$sce','$compile',function ($sce,$compile) {
    return {
      restrict: 'EA',
      replace: false,
      compile:function compile(tElement, tAttrs, transclude) {
        //$(tElement).attr('ng-bind-html','contentTab');
         return {
          pre: function preLink(scope, iElement, iAttrs, controller) { },
          post: function postLink(scope, iElement, iAttrs, controller) {
            scope.changeContent = function(content){

              iElement.html(content); 
              $compile(iElement)(scope);
              console.log(scope)
            }
          }
        }
      }
    };
  }]);
})();
;'use strict';
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
;