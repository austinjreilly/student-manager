var StudentManagerControllers = angular.module('StudentManagerControllers',[]);


StudentManagerControllers.controller('StudentListController',function($scope,$state,popupService,$window,slimAPI){

    slimAPI.list(function(result){
        $scope.students = result;

        angular.forEach($scope.students,function(value,index){
            var all_test_scores_array = [];

            all_test_scores_array.push($scope.students[index].fall_test_score);
            all_test_scores_array.push($scope.students[index].spring_test_score);
            all_test_scores_array.push($scope.students[index].final_test_score);

            $scope.students[index].all_test_scores = all_test_scores_array;
        });
    });

    $scope.deleteStudent = function(student){
        if(popupService.showPopup('Are you sure you want to remove this student?')){
            slimAPI.delete(student.id, function(){
                $window.location.href='';
            });
        }
    };

    $scope.calculateAverage = function(data){
        console.log(data.length);
        var sum = 0;
        for(i = 0; i < data.length; i++) {
            sum += parseInt(data[i], 10);
        }

        var average = sum/data.length;

        return average;
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