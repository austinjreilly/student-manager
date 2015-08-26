var StudentManagerControllers = angular.module('StudentManagerControllers',[]);

StudentManagerControllers.controller('StudentListController',function($scope,slimAPI){
    slimAPI.list(function(result){
        $scope.students = result;
    });
});
