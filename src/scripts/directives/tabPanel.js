'use strict';
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
