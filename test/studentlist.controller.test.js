describe("Testing StudentManagerApp", function() {
  beforeEach(module('StudentManagerApp'));

  var StudentListController, $scope;

  describe('Testing StudentListController', function() {
    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      $scope = $rootScope.$new();

      $httpBackend.expectGET("app/partials/students.html").respond(200);

      $httpBackend.when('GET', 'http://localhost/student-manager-example/api/students')
        .respond({students: 'Student'});

      StudentListController = $controller('StudentListController', { $scope: $scope });
      $httpBackend.flush();
    }));

    it('should set students to "Stuent"', function() {
      expect($scope.students).toEqual({
        students: 'Student'
      });
    });
  });
});