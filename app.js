// display controller
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
    addListItem: function(item, type){
      // inc exp element in html prepare
      var html, list;
      if (type === 'inc'){
        list = '.income__list';
        html = ' <div class="item clearfix" id="income-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }else{
        list = 'expenses__title';
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      };
      //in html use REPLACE to change
      html = html.replace('%id%', item.id);
      html = html.replace('%%DESCRIPTION%%', item.description);
      html = html.replace('$$VALUE$$', item.value);
     //finished html to DOM
      document.querySelector(list).insertAdjacentHTML('beforeend', html);
    }
  };
})();

// sanhuugiin ajillah controller
var financeController = (function () {
  //private function
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //private data
  var data = {
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };

  return{
    addItem: function(type, desc, val){

      var item, id;

      if (data.items[type].length === 0) id =1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      };

      if(type === 'inc'){
          item = new Income(id, desc, val);
      }else {
          item = new Expense(id, desc, val);
      }

      data.items[type].push(item);
      return item;
    }
  }
})();

// programm connection controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. oruulah ogogdoliig delgetsnees olj awah
    console.log(uiController.getInput());
    // 2. olj awsan ogogdluudee sanhuugiin controller d damjuulj tend hadgalna
    var item = financeController.addItem(input.type, input.description, input.value);
    // 3. olj awsan ogogluudee web deeree tohiroh hesegt n gargana
    uiController.addListItem(item, input.type);
    // 4. toswiig tootsooloh
    // 5. etssiin uldegdel tootsoog delgetsend gargana
  };

  var setUpEventListeners = function () {
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function () {
      console.log("Application started...");
      setUpEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
