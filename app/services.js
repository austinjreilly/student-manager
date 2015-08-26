var StudentManagerServices = angular.module('StudentManagerServices',[]);

StudentManagerServices.factory('slimAPI', function($http){
    return {
        list: function(callback){
            $http({
                method: 'GET',
                url: 'http://localhost/student-manager-example/api/students',
            }).success(callback);
        },
        add: function(data, callback){
            $http({
                method: 'POST',
                url: 'http://localhost/student-manager-example/api/students',
                data: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    fall_test_score: data.fall_test_score,
                    spring_test_score: data.spring_test_score,
                    final_test_score: data.final_test_score
                }
            }).success(callback);
        },
        view: function(id, callback){
            $http({
                method: 'GET',
                url: 'http://localhost/student-manager-example/api/students/' + id
            }).success(callback);
        },
        update: function(data, callback){
            $http({
                method: 'PUT',
                url: 'http://localhost/student-manager-example/api/students/' + data.id,
                data: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    fall_test_score: data.fall_test_score,
                    spring_test_score: data.spring_test_score,
                    final_test_score: data.final_test_score
                }
            }).success(callback);
        },
        delete: function(id, callback){
            $http({
                method: 'DELETE',
                url: 'http://localhost/student-manager-example/api/students/' + id
            }).success(callback);
        }
    };
});

StudentManagerServices.service('popupService',function($window){
    this.showPopup = function(message){
        return $window.confirm(message);
    };
});