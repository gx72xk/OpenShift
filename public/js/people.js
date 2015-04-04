
var app = angular.module("mongoApp", []);

app.controller("mongoAppController", function ($scope, $http) {
    $http.get("/api/people")
.success(function (response) {
    $scope.people = response;
    
});

    $scope.add = function (selectedPeople) {
        console.log(selectedPeople)
        $http.post("/api/people", selectedPeople)
      .success(function (response) {
          $scope.people = response;
      });
    };

    $scope.remove = function (id) {
        $http.delete("/api/people/" + id)
        .success(function (response) {
            $scope.people = response;
        });
    };

    $scope.selectedIndex = null;
    $scope.select = function (id) {
        $scope.selectedIndex = id;
        $http.get("/api/people/" + id)
        .success(function (response) {
            $scope.selectedPeople = response
        })
     
        console.log(id);
    }

    $scope.update = function (selectedPeople) {
        $http.put("/api/people/"+selectedPeople._id, selectedPeople)
        .success(function (response) {
            $scope.people = response;
        });
     
    };
})