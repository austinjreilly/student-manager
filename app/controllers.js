var StudentManagerControllers = angular.module('StudentManagerControllers',[]);


StudentManagerControllers.controller('StudentListController',function($scope,$state,popupService,$window,slimAPI){

    slimAPI.list(function(result){
        $scope.students = result;
    });

    $scope.deleteStudent = function(student){
        if(popupService.showPopup('Are you sure you want to remove this student?')){
            slimAPI.delete(student.id, function(){
                $window.location.href='';
            });
        }
    };
});

StudentManagerControllers.controller('StudentViewController',function($scope,$stateParams,slimAPI){

    slimAPI.view($stateParams.id, function(result){
        $scope.student = result;
    });

});

StudentManagerControllers.controller('studentCreateController',function($scope,$state,$stateParams,slimAPI){

    $scope.student = {};

    $scope.addStudent = function(){
        slimAPI.add($scope.student, function(){
            $state.go('students');
        });
    };
});

StudentManagerControllers.controller('StudentEditController',function($scope,$state,$stateParams,slimAPI){

    $scope.updateStudent = function(){
        slimAPI.update($scope.student, function(){
            $state.go('students');
        });
    };

    $scope.loadStudent = function(){
        slimAPI.view($stateParams.id, function(result){;
            $scope.student = result;
        });
    };

    $scope.loadStudent();
});