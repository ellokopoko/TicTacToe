(function() {
  $(function() {
    var Player, TicTacToe, bill, mike, ttt;
    TicTacToe = (function() {
      function TicTacToe(options) {
        var area, createArea, i, id, letters, onClickCell, self, size, td, tr, _i, _len;
        this.options = options;
        this.area = area = $("<table id='tic_tac_toe'></table>");
        td = $("<td><svg class='cross' height='30px' width='30px' x='0px' y='0px' viewBox='0 0 512 512' ><polygon  fill='green' points='476.153,94.43 417.569,35.847 256,197.417 94.431,35.847 35.847,94.43 197.416,256 35.847,417.57 94.431,476.153 256,314.583 417.569,476.153 476.153,417.57 314.584,256'></polygon></svg><svg class='zero' width='30' height='30' x='0px' y='0px' viewBox='1 1 38 38'><circle r='14' cx='20' cy='20' fill='transparent' stroke='orangered' stroke-width='5' /></svg></td>");
        tr = $("<tr></tr>");
        id = [];
        this.size = size = this.options.size;
        this.cells = {};
        this.whose_turn = 1;
        self = this;
        letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];
        createArea = function() {
          var i, letter, _i, _j, _k, _l, _ref;
          for (i = _i = 0; 0 <= size ? _i < size : _i > size; i = 0 <= size ? ++_i : --_i) {
            tr = $(tr).append(td.clone());
          }
          for (i = _j = 0; 0 <= size ? _j < size : _j > size; i = 0 <= size ? ++_j : --_j) {
            $(area).append(tr.clone());
          }
          tr = $("tr", area);
          td = $("td", area);
          for (i = _k = 0, _ref = tr.length; 0 <= _ref ? _k < _ref : _k > _ref; i = 0 <= _ref ? ++_k : --_k) {
            letter = letters[i];
            for (i = _l = 1; 1 <= size ? _l <= size : _l >= size; i = 1 <= size ? ++_l : --_l) {
              id.push(letter + i);
            }
          }
          td.each(function(i) {
            return $(this).attr({
              id: id[i]
            });
          });
          return $("body").append(area);
        };
        createArea();
        for (_i = 0, _len = id.length; _i < _len; _i++) {
          i = id[_i];
          this[i] = null;
        }
        onClickCell = (function(_this) {
          return function(e) {
            return self.manager($(e.target).attr("id"));
          };
        })(this);
        $(area).on("click", td, onClickCell);
      }

      TicTacToe.prototype.setValue = function(cell, value) {
        var error;
        try {
          if (typeof cell !== "string") {
            return console.log("Неверный тип данных. Ожидается String");
          }
          if (typeof value !== "boolean") {
            return console.log("Неверный тип данных. Ожидается Boolean");
          }
          return this[cell] = value;
        } catch (_error) {
          error = _error;
          return console.log(error);
        }
      };

      TicTacToe.prototype.passTurn = function() {
        if (this.whose_turn === 1) {
          return this.whose_turn = 2;
        }
        if (this.whose_turn === 2) {
          return this.whose_turn = 1;
        }
      };

      TicTacToe.prototype.manager = function(id) {
        if (this.whose_turn === 1) {
          $("#" + id).addClass("showC");
          this.setValue(id, true);
        }
        if (this.whose_turn === 2) {
          $("#" + id).addClass("showZ");
          this.setValue(id, false);
        }
        return this.passTurn();
      };

      return TicTacToe;

    })();
    ttt = new TicTacToe({
      size: 3
    });
    Player = (function() {
      var number;

      number = 0;

      function Player(options) {
        this.options = options;
        this.name = this.options.name;
        if (number > 1) {
          return console.log("Невозможно создать более 2 игроков");
        }
        number += 1;
        this.number = number;
      }

      return Player;

    })();
    mike = new Player({
      name: "Mike"
    });
    return bill = new Player({
      name: "Bill"
    });
  });

}).call(this);
