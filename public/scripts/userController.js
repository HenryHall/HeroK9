angular.module('myApp').controller('UserController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $http, $window, $location, Upload) {

    // custom welcome message to the user
    $scope.username = "Officer Henry Hall";

    ////////////////////////////////////////////////////////////
    //                  FORM FUNCTIONALITY                    //
    ////////////////////////////////////////////////////////////

    // certification checkboxes
    $scope.items = ['Explosives', 'Narcotics', 'Patrol', 'Trailing', 'Tracking', 'Other'];
    $scope.selected = [1];

    $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
    };
    $scope.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };
    $scope.isIndeterminate = function() {
      return ($scope.selected.length !== 0 &&
          $scope.selected.length !== $scope.items.length);
    };
    $scope.isChecked = function() {
      return $scope.selected.length === $scope.items.length;
    };
    $scope.toggleAll = function() {
      if ($scope.selected.length === $scope.items.length) {
        $scope.selected = [];
      } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
        $scope.selected = $scope.items.slice(0);
      }
    };

    // select vest colors
    $scope.colors = ['Black', 'Tan', 'Green'];
    $scope.getVestColor = function() {
      if ($scope.color !== undefined) {
        return $scope.color;
      } else {
        return "Please select a color";
      }
    };




    ////////////////////////////////////////////////////////////
    //                      FILE UPLOADS                      //
    ////////////////////////////////////////////////////////////

    // file variables
    $scope.file = '';
    $scope.uploads = [];
    $scope.comment = '';

    // validate and upload files on submit
    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
          $scope.upload($scope.file);
          console.log('in submit function, file to upload:', $scope.file);
      }
    };

    // upload files to S3 and to the database
    $scope.upload = function(file) {
      Upload.upload ({
        url: '/userDash/uploads',
        data: {
          file: file,
          'user': $scope.user,
          'comment': $scope.comment
        }
      }).then(function(resp) {
        console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);

        // then, if success, also send data and file location to database

        // collect input and create object to send

        // post method to send inputs to database

        // redirect users to their dashboard after form submission
        // $location.path('/');


      }, function(resp) {
        console.log('Error status: ' + resp.status);
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };











}]);