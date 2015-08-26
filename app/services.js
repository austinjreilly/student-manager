var StudentManagerServices = angular.module('StudentManagerServices',[]);

StudentManagerServices.factory('slimAPI', function($http){
    return {
        list: function(callback){
            $http({
                method: 'GET',
                url: 'http://localhost/student-manager-example/api/students',
            }).success(callback);
        },
    };
});