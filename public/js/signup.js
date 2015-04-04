var app = angular.module("signUpApp");
app.controller("NavController", function ($scope, $http, $location, $rootScope){
    $scope.register = function (user) {
        console.log(user);
        if (user.password != user.password2 || !user.password || !user.password2) {
            $rootScope.message = "Your passwords don't match";
            alert("password don't match!")
        }
        else {
            $http.post("/register", user)
            .success(function (response) {
                console.log(response);
               // angular.element(document.querySelector("#submit")).attr("data-dismiss", "modal");
                if (response != null) {
                    $rootScope.currentUser = response;
                    $('#myModal').modal('hide');
                    //console.log($rootScope.currentUser);
                    $location.url("/profile");
                }
            });
        }
    }

    $scope.login = function (user) {
        console.log(user);
        $http.post("/login", user)
        .success(function (response) {
            console.log(response);
            $rootScope.currentUser = response;
            $scope.u.username = null;
            $scope.u.password = null;
            $location.url("/profile");
        });
    }

    $scope.logout = function () {
        $http.post("/logout")
        .success(function () {
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    };

});