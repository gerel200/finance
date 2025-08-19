// display controller
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };
  var nodeListForeach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  var formatMoney = function (too, type) {
    too = "" + too;
    var x = too.split("").reverse().join("");
    var y = "";
    var count = 1;
    for (i = 0; i < x.length; i++) {
      y = y + x[i];

      if (count % 3 === 0) y = y + ",";
      count++;
    }
    var z = y.split("").reverse().join("");

    if (z[0] === ",") z = z.substring(1, z.length - 1);

    if (type === "inc") z = "+ " + z;
    else z = "- " + z;

    return z;
  };

  return {
    displayDate: function () {
      var today = new Date();
      document.querySelector(DOMstrings.dateLabel).textContent =
        today.getFullYear() +
        " year " +
        today.getMonth() +
        " month HOUSEHOLD FINANCE";
    },

    changeType: function(){
      var fields = document.querySelectorAll(DOMstrings.inputType + ', ' + DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      nodeListForeach(fields, function(el){
        el.classList.toggle('red-focus');
      });

      document.querySelector(DOMstrings.addBtn).classList.toggle("red");
    },

    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    displayPercentages: function (allPercentages) {
      // expense NODElist oloh
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );
      // element bolgonii huwid zarlagiin %iig  array -s awch shiwj oruulah
      nodeListForeach(elements, function(el, index) {
        el.textContent = allPercentages[index];
      });
    },

    getDOMstrings: function () {
      return DOMstrings;
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );
      // convert list to array
      var fieldsArr = Array.prototype.slice.call(fields); //for(var i=0; i<fieldsArr.length; i++){fieldsArr[i].value="";} ingj bichij bas boloh bsan
      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });

      fieldsArr[0].focus();
    },

    tosowiigUzuuleh: function (tusuw) {
      var type;
      if(tusuw.tosow >0) type = 'inc';
      else type = 'exp';
      document.querySelector(DOMstrings.budgetLabel).textContent = formatMoney(tusuw.tosow, type);
      document.querySelector(DOMstrings.incomeLabel).textContent =
        formatMoney(tusuw.totalInc, 'inc');
      document.querySelector(DOMstrings.expenseLabel).textContent =
        formatMoney(tusuw.totalExp, 'exp');
      if (tusuw.huwi !== 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuw.huwi + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuw.huwi;
      }
    },

    deleteListItem: function (id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    addListItem: function (item, type) {
      // to prepare inc exp element in html
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          ' <div class="item clearfix" id="inc-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //in html use REPLACE to change
      html = html.replace("%id%", item.id);
      html = html.replace("%%DESCRIPTION%%", item.description);
      html = html.replace("$$VALUE$$", formatMoney(item.value, type));
      //finished html to DOM
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
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
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0)
      this.percentage = Math.round((this.value / totalIncome) * 100);
    else this.percentage = 0;
  };
  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
  };
  //private data
  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },

    tosow: 0,
    huwi: 0,
  };

  return {
    tusuwTootsooloh: function () {
      calculateTotal("inc");
      calculateTotal("exp");

      data.tosow = data.totals.inc - data.totals.exp;
      if (data.totals.inc > 0)
        data.huwi = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.huwi = 0;
    },

    calculatePercentages: function () {
      data.items.exp.forEach(function (el) {
        el.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPercentages = data.items.exp.map(function (el) {
        return el.getPercentage();
      });
    },

    tosowiigAwah: function () {
      return {
        tosow: data.tosow,
        huwi: data.huwi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },

    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },

    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item);
      return item;
    },
  };
})();

// programm connection controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. oruulah ogogdoliig delgetsnees olj awah
    var input = uiController.getInput();

    if (input.description !== "" && input.value !== "") {
      // 2. olj awsan ogogdluudee sanhuugiin controller d damjuulj tend hadgalna
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      // 3. olj awsan ogogluudee web deeree tohiroh hesegt n gargana
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      // tosowiig shineer tootsollod delgetsend uzuulne
      updateTosow();
    }
  };

  var updateTosow = function () {
    // 4. toswiig tootsooloh
    financeController.tusuwTootsooloh();
    // 5. etssiin uldegdel
    var tosow = financeController.tosowiigAwah();
    // 6.  tootsoog delgetsend gargana
    uiController.tosowiigUzuuleh(tosow);
    //7. element -n % tootsoh
    financeController.calculatePercentages();
    //8. element % iig huleej awah
    var allPercentages = financeController.getPercentages();
    //9. element % iig display d haruulna
    uiController.displayPercentages(allPercentages);
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
    document.querySelector(DOM.inputType).addEventListener('change', uiController.changeType);

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);

          //1. delete and use type and id
          financeController.deleteItem(type, itemId);
          //2. delete element on display
          uiController.deleteListItem(id);
          //3. update balance sheet
          updateTosow();
        }
      });
  };
  return {
    init: function () {
      console.log("Application started...");
      uiController.displayDate();
      uiController.tosowiigUzuuleh({
        tosow: 0,
        huwi: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setUpEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
