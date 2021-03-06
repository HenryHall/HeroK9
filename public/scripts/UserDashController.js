angular.module('myApp').controller('UserDashController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  'Upload',
  '$mdDialog',
  function($scope, $http, $window, $location, Upload, $mdDialog) {

	  $http({
		method: 'GET',
		url: '/userDash'
	}).then(function(data){ // query results
		data = data.data; // scope in where you want stuff to go
		console.log(data);
	});


        $http({
          method: 'GET',
          url: '/userDash/getFormInfo'
        }).success(function(data){
          console.log('In /getFormInfo success with:', data);
	        $scope.username = data.userInfo.username;
	        $scope.status_id = data.userInfo.status_id;
          $scope.certList = data.certs;
          $scope.dogList = data.dogs;
          $scope.breeds = data.form_info.breeds;
          $scope.colors = data.form_info.vest_colors;
          $scope.imprints = data.form_info.vest_imprints;
          $scope.imprintColors = data.form_info.vest_imprint_colors;


	    if( $scope.status_id <= 5 ){
		    $scope.userStatus = [
			    { status: "active", name: "Application In Progress"},
			    { status: "", name: "Application Approved"},
			    { status: "", name: "Grant Approved"},
			    { status: "", name: "Order Sent In"},
			    { status: "", name: "Shipped"}
		    ];
	    }// end 5
	    if( $scope.status_id === 7 ){
		    $scope.userStatus = [
			    { status: "visited", name: "Application In Progress"},
			    { status: "active", name: "Application Approved"},
			    { status: "", name: "Grant Approved"},
			    { status: "", name: "Order Sent In"},
			    { status: "", name: "Shipped"}
		    ];
	    }// end 7
	    if( $scope.status_id === 8 ){
		    $scope.userStatus = [
			    { status: "visited", name: "Application In Progress"},
			    { status: "visited", name: "Application Approved"},
			    { status: "active", name: "Grant Approved"},
			    { status: "", name: "Order Sent In"},
			    { status: "", name: "Shipped"}
		    ];
	    }// end 8
	    if( $scope.status_id === 9 ){
		    $scope.userStatus = [
			    { status: "visited", name: "Application In Progress"},
			    { status: "visited", name: "Application Approved"},
			    { status: "visited", name: "Grant Approved"},
			    { status: "active", name: "Order Sent In"},
			    { status: "", name: "Shipped"}
		    ];
	    }// end 9
	    if( $scope.status_id === 10 ){
		    $scope.userStatus = [
			    { status: "visited", name: "Application In Progress"},
			    { status: "visited", name: "Application Approved"},
			    { status: "visited", name: "Grant Approved"},
			    { status: "visited", name: "Order Sent In"},
			    { status: "active", name: "Shipped"}
		    ];
	    }// end 10

        });


 	// create button on user dash for admin only to update status to update progress bar
	// $scope.setStatus = function( newStatus ){

	// }; // end setStatus

        $scope.updateForm = function(){
          for (var i=0; i<$scope.dogList.length; i++){
            if ($scope.selectedDog.id == $scope.dogList[i].id){
			        $scope.k9Id = $scope.dogList[i].id;
              $scope.dog_name = $scope.dogList[i].k9_name + "'s";
              $scope.k9Age = $scope.dogList[i].age;
              $scope.k9Bio = $scope.dogList[i].k9_bio;
              $scope.k9Back = $scope.dogList[i].k9_back;
              $scope.k9Chest = $scope.dogList[i].k9_chest;
              $scope.k9Girth = $scope.dogList[i].k9_girth;
              $scope.k9Undercarriage = $scope.dogList[i].k9_undercarriage;
              $scope.vestColor = $scope.dogList[i].k9_vest_color;
              $scope.vestImprint = $scope.dogList[i].k9_vest_imprint;
              $scope.vestImprintColor = $scope.dogList[i].k9_vest_imprint_color;
              $scope.squadMake = $scope.dogList[i].squad_make;
              $scope.squadModel = $scope.dogList[i].squad_model;
              $scope.squadYear = $scope.dogList[i].squad_year;
              $scope.squadRetire = $scope.dogList[i].squad_retirement;
              $scope.k9Cert = $scope.dogList[i].k9_certified;
              $scope.k9Active = $scope.dogList[i].active_duty;
              $scope.k9Retire = $scope.dogList[i].retirement;
              $scope.breed = $scope.dogList[i].breed;
              $scope.handlerTitle = $scope.dogList[i].handler_rank;
              $scope.handlerFirstName = $scope.dogList[i].handler_first_name;
              $scope.handlerLastName = $scope.dogList[i].handler_last_name;
              $scope.handlerBadge = $scope.dogList[i].handler_badge;
              $scope.handlerCell = $scope.dogList[i].handler_cell_phone;
              $scope.handlerPhone = $scope.dogList[i].handler_secondary_phone;
              $scope.handlerEmail = $scope.dogList[i].handler_email;
            }
          }

        };


        // k9 breeds
        $scope.breeds = ['German Shepherd', 'Belgian Malinois', 'Bloodhound', 'Other'];
        $scope.getBreed = function() {
          if ($scope.breed !== undefined) {
            return $scope.breed;
          } else {
            return 'Please select a breed';
          }
        };

        // if 'Other' breed
      //   $scope.yesnoCheck = function() {
      //     if (this.breed == 'Other') {
      //       document.getElementById('ifYes').style.display = 'block';
      //     } else {
      //       document.getElementById('ifYes').style.display = 'none';
      //    }
      //   };

      //   var breedToSend;
      //   if ($scope.otherBreed !== undefined){
      //   	breedToSend = $scope.otherBreed;
      //   } else {
      //     	breedToSend = $scope.breed;
      //   }

        // certification checkboxes


        // select vest colors
        $scope.getVestColor = function() {
          if ($scope.vestColor !== undefined) {
            return $scope.vestColor;
          } else {
            return "Please select a color";
          }
        };

        // select vest imprint
        $scope.getVestImprint = function() {
          if ($scope.vestImprint !== undefined) {
            return $scope.vestImprint;
          } else {
            return "Please select a vest imprint";
          }
    };

        // select vest imprint color
        $scope.getImprintColor = function() {
          if ($scope.vestImprintColor !== undefined) {
            return $scope.vestImprintColor;
          } else {
            return "Please select a vest imprint color";
          }
        };

        ////////////////////////////////////////  collect input to send to server  ////////////////////////////////////////
        $scope.sendK9App = function() {
        var k9ToSend = {
		    k9Id: $scope.k9Id,
    		handlerTitle: $scope.handlerTitle,
    		handlerFirstName: $scope.handlerFirstName,
    		handlerLastName: $scope.handlerLastName,
    		handlerBadge: $scope.handlerBadge,
    		handlerCellPhone: $scope.handlerCell,
    		handlerSecondaryCell: $scope.handlerPhone,
    		handlerEmail: $scope.handlerEmail,
    		age: $scope.k9Age,
    	      breed: $scope.breed,
      	certified: $scope.k9Cert,
      	activeDuty: $scope.k9Active,
      	retirement: $scope.k9Retire,
    		bio: $scope.k9Bio,
    		back: $scope.k9Back,
    		chest: $scope.k9Chest,
    		girth: $scope.k9Girth,
    		undercarriage: $scope.k9Undercarriage,
    		vestColor: $scope.vestColor,
    		vestImprint: $scope.vestImprint,
    		vestImprintColor: $scope.vestImprintColor,
    		squadMake: $scope.squadMake,
    		squadModel: $scope.squadModel,
    		squadYear: $scope.squadYear,
    		squadRetire: $scope.squadRetire
          };


    	console.log('test: ', k9ToSend);


          $http({
            method: 'POST',
            url: '/userDash/canine',
            data: k9ToSend
          }).success(function() {
            console.log('in /sendK9App: ', k9ToSend);
          });
        };

      // save button alert modal
      $scope.saveForm = function() {
        var k9ToSave = {
      k9Id: $scope.k9Id,
      handlerTitle: $scope.handlerTitle,
      handlerFirstName: $scope.handlerFirstName,
      handlerLastName: $scope.handlerLastName,
      handlerBadge: $scope.handlerBadge,
      handlerCellPhone: $scope.handlerCell,
      handlerSecondaryCell: $scope.handlerPhone,
      handlerEmail: $scope.handlerEmail,
      age: $scope.k9Age,
      breed: $scope.breed,
      certified: $scope.k9Cert,
      activeDuty: $scope.k9Active,
      retirement: $scope.k9Retire,
      bio: $scope.k9Bio,
      back: $scope.k9Back,
      chest: $scope.k9Chest,
      girth: $scope.k9Girth,
      undercarriage: $scope.k9Undercarriage,
      vestColor: $scope.vestColor,
      vestImprint: $scope.vestImprint,
      vestImprintColor: $scope.vestImprintColor,
      squadMake: $scope.squadMake,
      squadModel: $scope.squadModel,
      squadYear: $scope.squadYear,
      squadRetire: $scope.squadRetire
        };

        $http({
          method: 'PUT',
          url: '/userDash/canine',
          data: k9ToSave
        }).success(function() {
          console.log('in /sendK9App: ', k9ToSave);
        });

        $mdDialog.show(
          $mdDialog.alert({
            title: 'Saved!',
            textContent: 'Your application has been successfully saved.',
            ok: 'Okay'
          })
        );
      };

      // submit button alert modal
      $scope.submitForm = function() {
        $mdDialog.show(
          $mdDialog.alert({
            title: 'Submitted!',
            textContent: 'Your application has been successfully submitted.',
            ok: 'Okay'
          })
        );
      };
    }]); // end HandlerController





    ////////////////////////////////////////////////////////////
    //                     PdfController                      //
    ////////////////////////////////////////////////////////////
    angular.module('myApp').controller('PDFController', [
      '$scope',
      '$http',
      '$window',
      '$location',
      'Upload',
      '$mdDialog',
      function($scope, $http, $window, $location, Upload, $mdDialog) {

        // file variables
        $scope.file = '';
        $scope.uploads = [];
        $scope.comment = '';

        // validate and upload files on submit
        $scope.submitPdf = function() {
          if ($scope.k9form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
            console.log('in submitPdf function, file to upload:', $scope.file);
          }
        };

        // upload files to S3 and to the database
        $scope.upload = function(file) {
          Upload.upload ({
            // this goes to /uploads to S3
            url: '/userDash/uploads',
            data: {
              file: file,
              'user': $scope.user,
              'comment': $scope.comment
            }
          }).then(function(resp) {
            console.log('success: ' + resp.config.data.file.name + ' uploaded and file at ' + resp.data.location);

            // modal to confirm upload
            $mdDialog.show(
              $mdDialog.alert({
                title: 'File Uploaded',
                textContent: 'Your file has been successfully uploaded.',
                ok: 'Okay'
              })
            );

            // then, if success, also send file location (url) to database
            var pdfToServer = {
              k9_id: $scope.k9Id,
              certType: $scope.uploadCert,
              url: resp.data.location,
              notes: $scope.certNotes
            };
            console.log('send to server: ', pdfToServer);

            // post method to send object to database
            $http({
              method: 'POST',
              url: '/userDash/submitPdf',
              data: pdfToServer
            }).then(function() {
              console.log('submitPdf post success');
            });
          }, function(resp) {
            console.log('Error status: ' + resp.status);
          }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
        };
    }]); // end PDFController

    ////////////////////////////////////////////////////////////
    //             ImgController for K9 photos                //
    ////////////////////////////////////////////////////////////
    angular.module('myApp').controller('ImgController', [
      '$scope',
      '$http',
      '$window',
      '$location',
      'Upload',
      '$mdDialog',
      function($scope, $http, $window, $location, Upload, $mdDialog) {

        // file variables
        $scope.file = '';
        $scope.uploads = [];
        $scope.comment = '';

        // validate and upload files on submit
        $scope.submitImg = function() {
          if ($scope.k9form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
            console.log('in submitIMG function, file to upload:', $scope.file);
          }
        };

        // upload files to S3 and to the database
        $scope.upload = function(file) {
          Upload.upload ({
            // this needs to go to /uploads to go to S3 first
            url: '/userDash/uploads',
            data: {
              file: file,
              'user': $scope.user,
              'comment': $scope.comment
            }
          }).then(function(resp) {
            console.log('success: ' + resp.config.data.file.name + ' uploaded and file at ' + resp.data.location);

            // modal to confirm upload
            $mdDialog.show(
              $mdDialog.alert({
                title: 'File Uploaded',
                textContent: 'Your file has been successfully uploaded.',
                ok: 'Okay'
              })
            );

            // then, if success, also collect input & send data and file location to database
            var imgToServer = {
              url: resp.data.location,
              k9_id: $scope.k9Id
            };
            console.log('send img to server: ', imgToServer);

            // post method to send object to database
            $http({
              method: 'POST',
              url: '/userDash/submitImg',
              data: imgToServer
            }).then(function() {
              console.log('submitImg post success');
            });
          }, function(resp) {
            console.log('Error status: ' + resp.status);
          }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
        };
    }]); // end ImgController

    ////////////////////////////////////////////////////////////
    //         SquadImgController for Squad Photos            //
    ////////////////////////////////////////////////////////////
    angular.module('myApp').controller('SquadImgController', [
      '$scope',
      '$http',
      '$window',
      '$location',
      'Upload',
      '$mdDialog',
      function($scope, $http, $window, $location, Upload, $mdDialog) {

        // file variables
        $scope.file = '';
        $scope.uploads = [];
        $scope.comment = '';

        // validate and upload files on submit
        $scope.submitSquadImg = function() {
          if ($scope.k9form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
            console.log('in submitSquadImg function, file to upload:', $scope.file);
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
            console.log('success: ' + resp.config.data.file.name + ' uploaded and file at ' + resp.data.location);

            // modal to confirm upload
            $mdDialog.show(
              $mdDialog.alert({
                title: 'File Uploaded',
                textContent: 'Your file has been successfully uploaded.',
                ok: 'Okay'
              })
            );

            // then, if success, also collect input & send data and file location to database
            var imgToServer = {
              url: resp.data.location,
              k9_id: $scope.k9Id
            };
            console.log('send img to server: ', imgToServer);

            // post method to send object to database
            $http({
              method: 'POST',
              url: '/userDash/submitSquadImg',
              data: imgToServer
            }).then(function() {
              console.log('submitSquadImg post success');
            });
          }, function(resp) {
            console.log('Error status: ' + resp.status);
          }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
        };
    }]); // end SquadImgController
