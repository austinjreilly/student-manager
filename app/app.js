var StudentManagerApp = angular.module('StudentManagerApp',[
        'ui.router',
        'ngResource',
        'StudentManagerControllers',
        'StudentManagerServices'
    ]
);

StudentManagerApp.config(function($stateProvider,$httpProvider){
    $stateProvider.state('students',{
        url:'/students',
        templateUrl:'app/partials/students.html',
        controller:'StudentListController'
    })
}).run(function($state){
   $state.go('students');
});