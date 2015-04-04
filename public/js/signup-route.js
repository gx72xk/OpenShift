var app = angular.module("signUpApp", ["ngRoute"]);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/home', {
          templateUrl: 'views/home.html',
          //resolve: {
          //    loggedin: checkLoggedin
          //}

      })
      .when('/profile', {
          templateUrl: 'views/profile.html',
       //   controller: 'ProfileCtrl',
          resolve: {
              loggedin: checkLoggedin
          }
      })
   
      .otherwise({
          redirectTo: '/home'
      });
});

var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
            // User is Not Authenticated
        else {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/home');
        }
    });

    return deferred.promise;
};