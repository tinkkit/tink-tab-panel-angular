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
