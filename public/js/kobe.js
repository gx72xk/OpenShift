var app = angular.module("KobeApp", []);
app.controller("KobeController", function ($scope, $http) {
    $http.get("/api/kobe")
    .success(function (response) {
        $scope.kobe = response;
        console.log($scope.kobe)
    });


    $scope.selectedIndex = null;
    $scope.select = function (index) {
        $scope.selectedIndex = index;
        $scope.selectedStats = $scope.kobe.stats[index];
    }

    
    $scope.add = function (stats) {
        $http.post("/api/kobe/stats", stats)
      .success(function (response) {
            $scope.kobe = response;
    
            console.log($scope.kobe)
      });   
    };

    $scope.update = function (selectedStats) {
        $http.put("/api/kobe/stats/" + $scope.selectedIndex, selectedStats)
        .success(function (response) {
            $scope.kobe = response;
          });
        console.log(selectedStats)
    };

});