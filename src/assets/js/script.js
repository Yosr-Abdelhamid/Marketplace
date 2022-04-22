(function(){

  angular.module('myApp', ['ngRoute', 'slickCarousel'])
  
  .controller('MainCtrl', ['$scope', function($scope){

		$scope.slickConfigLoaded = false;
		$scope.slickCurrentIndex1 = 0;
		$scope.slickCurrentIndex2 = 0;
		$scope.slickDots = true;
		$scope.slickInfinite = true;

		$scope.slickConfig1 = {
				autoplay: false,
				dots: $scope.slickDots,
				enabled: true,
				focusOnSelect: true,
				infinite: $scope.slickInfinite,
				initialSlide: 0,
				slidesToShow: 5,
				slidesToScroll: 1,
				method: {},
				event: {
			        afterChange: function (event, slick, currentSlide, nextSlide) {
			            $scope.slickCurrentIndex1 = currentSlide;
			        },
			        init: function (event, slick) {
			              slick.slickGoTo($scope.slickCurrentIndex1); // slide to correct index when init
			        }
				}
		};

		$scope.slickConfig2 = {
				autoplay: false,
				dots: $scope.slickDots,
				enabled: true,
				focusOnSelect: true,
				infinite: $scope.slickInfinite,
				initialSlide: 0,
				slidesToShow: 4,
				slidesToScroll: 1,
				method: {},
				event: {
			        afterChange: function (event, slick, currentSlide, nextSlide) {
			            $scope.slickCurrentIndex2 = currentSlide;
			        },
			        init: function (event, slick) {
			              slick.slickGoTo($scope.slickCurrentIndex2); // slide to correct index when init
			        }
				}
		};
		
		$scope.items = [{
		  label: '1'
		},{
		  label: '2'
		},{
		  label: '3'
		},{
		  label: '4'
		},{
		  label: '5'
		}];
    
		$scope.slickConfigLoaded = true;
  }]);

})();
