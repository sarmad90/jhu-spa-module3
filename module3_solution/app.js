(function(){
  var NarrowItDownApp = angular.module('NarrowItDownApp', []);
  NarrowItDownApp.controller('NarrowItDownController', NarrowItDownController);
  NarrowItDownApp.service('MenuSearchService', MenuSearchService);

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService){
    var thisController = this;

    thisController.searchTerm = "";
    thisController.found = [];
    thisController.search = function(){
      thisController.found = MenuSearchService.getMatchedMenuItems(thisController.searchTerm);
    };
  };

  MenuSearchService.$inject = ["$http"];
  function MenuSearchService($http){
    var thisService = this;

    thisService.getMatchedMenuItems = function(searchTerm){
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function (result) {
        // process result and only keep items that match
        var foundItems = [];
        for (var i = 0; i < result.data.menu_items.length; i++) {
          if(result.data.menu_items[i].description.indexOf(searchTerm) > -1){
            foundItems.push(result.data.menu_items[i]);
          }
        }

        console.log("result", foundItems);

        // return processed items
        return foundItems;
      });
    };
  };

})();
