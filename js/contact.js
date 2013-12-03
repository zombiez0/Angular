(function(angular) {

	var app = angular.module('cm', ['ngRoute', 'ngResource'])
		
		app.config(function ($routeProvider) {
			$routeProvider
			//show complete contact list
			.when('/', {
				templateUrl : 'list.html'
			})
			//show contact edit details
			.when('/contact/:index', {
				templateUrl : 'edit.html',
				controller : 'EditContact'
			})
			//add contact
			.when('/add', {
				templateUrl : 'add.html',
				controller : 'AddContact'
			})
			//delete contact
			.when('/delete/:index', {
				templateUrl : 'edit.html',
				controller : 'DeleteContact'
			});

		})
		app.factory('Contact', function($resource) {
			return $resource('../api/index.php/wines/:id');
		})
		app.controller('ContactsList', function($scope, $resource, Contact) {
			$scope.contacts = [
				{name : 'Chetan', number : 856436},
				{name : 'Anand', number : 1231},
				{name : 'David', number : 856236}
			];
			var contact = Contact.query();
			console.log(contact)
			//contact.get({id : '13'});
		})
		app.controller('EditContact', function($scope, $routeParams, Contact) {
			Contact.get({id : '13'});
			$scope.itemIndex = $routeParams.index;
			$scope.contact = $scope.contacts[$routeParams.index];

		})
		app.controller('AddContact', function($scope) {
			$scope.addNewContact = function() {
				$scope.contacts.push(
					{name : $scope.new_contact_name, number : $scope.new_contact_number}
				);
			}
		})
		app.controller('DeleteContact', function($scope, $routeParams, $location) {
			$scope.itemIndex = $routeParams.index;
			$scope.contact = $scope.contacts[$routeParams.index];
			if(confirm('Are you sure you want to delete this contact ?')) {
				$scope.contacts.splice($routeParams.index,1);
				console.log($location)
				$location.path('/')
			}
			
		})

}(angular));