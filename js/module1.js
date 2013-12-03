(function(angular) {
	angular.module('module1', [])
		.controller('example', ['$scope', function(app) {
			app.userName="Chetan";
		}]);
}(angular));