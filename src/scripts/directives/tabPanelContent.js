'use strict';
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
         return {
          pre: function preLink(scope, iElement, iAttrs, controller) { },
          post: function postLink(scope, iElement, iAttrs, controller) {
            scope.changeContent = function(content){
              iElement.html(content); 
              $compile(iElement)(scope);
            }
          }
        }
      }
    };
  }]);
})();
