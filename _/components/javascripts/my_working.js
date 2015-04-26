(function() {
  var Player, TicTacToe;

  TicTacToe = (function() {
    var createDiagonally, id, letters, td, tr;

    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];

    td = $("<td><svg class='cross' height='30px' width='30px' x='0px' y='0px' viewBox='0 0 512 512' ><polygon  fill='green' points='476.153,94.43 417.569,35.847 256,197.417 94.431,35.847 35.847,94.43 197.416,256 35.847,417.57 94.431,476.153 256,314.583 417.569,476.153 476.153,417.57 314.584,256'></polygon></svg><svg class='zero' width='30' height='30' x='0px' y='0px' viewBox='1 1 38 38'><circle r='14' cx='20' cy='20' fill='transparent' stroke='orangered' stroke-width='5' /></svg></td>");

    tr = $("<tr></tr>");

    id = [];

    createDiagonally = function(cell, revers) {
      var arr, index, letter, number, _i, _len;
      if (revers == null) {
        revers = false;
      }
      arr = [];
      letter = cell.slice(0, 1);
      number = +cell.slice(1, 2);
      letters = _.drop(this.lengthInLetters, 1);
      index = letters.indexOf(letter);
      if (revers) {
        letters.sort(function(a, b) {
          if (a > b) {
            return -1;
          }
          if (a < b) {
            return 1;
          }
        });
      }
      letters = _.drop(letters, index);
      for (_i = 0, _len = letters.length; _i < _len; _i++) {
        letter = letters[_i];
        arr.push(letter + number);
        if (number++ >= this.size) {
          return arr;
        }
      }
      return arr;
    };

    function TicTacToe(options) {
      var area, createArea, i, onClickCell, self, size, _i, _len;
      this.options = options;
      this.area = area = $("<table id='tic_tac_toe'></table>");
      this.size = size = this.options.size;
      this.whose_turn = 1;
      self = this;
      this.shape_in_row = 5;
      this.all_moves = 0;
      this.game_over = false;
      this.lengthInLetters = (function() {
        var arr, i, _i, _ref;
        arr = [' '];
        for (i = _i = 0, _ref = this.size; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          arr.push(letters[i]);
        }
        return arr;
      }).call(this);
      this.cells_from_which_builds_diagonal = (function() {
        var cells_left_to_right, cells_right_to_left, i, size_square_with_cells, ss, _i;
        ss = size_square_with_cells = this.size - this.shape_in_row + 1;
        cells_left_to_right = [];
        cells_right_to_left = [];
        for (i = _i = 1; 1 <= ss ? _i <= ss : _i >= ss; i = 1 <= ss ? ++_i : --_i) {
          cells_left_to_right.push(this.lengthInLetters[i] + 1);
          cells_right_to_left.push(this.lengthInLetters[this.lengthInLetters.length - i] + 1);
          cells_left_to_right.push(this.lengthInLetters[1] + i);
          cells_right_to_left.push(this.lengthInLetters[this.size] + i);
        }
        return {
          cells_left_to_right: _.uniq(cells_left_to_right),
          cells_right_to_left: _.uniq(cells_right_to_left)
        };
      }).call(this);
      this.horizontalCells = (function() {
        var arr, i, number, _i, _j, _ref, _ref1;
        arr = [];
        for (number = _i = 1, _ref = this.size; 1 <= _ref ? _i <= _ref : _i >= _ref; number = 1 <= _ref ? ++_i : --_i) {
          for (i = _j = 1, _ref1 = this.size; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
            arr.push(this.lengthInLetters[i] + number);
          }
        }
        return _.chunk(arr, this.size);
      }).call(this);
      this.verticalCells = (function() {
        var arr, i, number, _i, _j, _ref, _ref1;
        arr = [];
        for (i = _i = 1, _ref = this.size; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          for (number = _j = 1, _ref1 = this.size; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; number = 1 <= _ref1 ? ++_j : --_j) {
            arr.push(this.lengthInLetters[i] + number);
          }
        }
        return _.chunk(arr, this.size);
      }).call(this);
      this.diagonallyCells = (function() {
        var arr, cell, cells, _i, _len;
        cells = this.cells_from_which_builds_diagonal.cells_left_to_right;
        arr = [];
        for (_i = 0, _len = cells.length; _i < _len; _i++) {
          cell = cells[_i];
          arr.push(createDiagonally.call(this, cell));
          arr.push(createDiagonally.call(this, cell, true));
        }
        return arr;
      }).call(this);
      this.allCells = (function() {
        var arr;
        arr = [];
        arr.push(this.horizontalCells);
        arr.push(this.verticalCells);
        arr.push(this.diagonallyCells);
        return _.flatten(arr);
      }).call(this);
      createArea = (function(_this) {
        return function() {
          var i, number, _i, _j, _k, _l, _ref, _ref1;
          for (i = _i = 0; 0 <= size ? _i < size : _i > size; i = 0 <= size ? ++_i : --_i) {
            tr = $(tr).append(td.clone());
          }
          for (i = _j = 0; 0 <= size ? _j < size : _j > size; i = 0 <= size ? ++_j : --_j) {
            $(area).append(tr.clone());
          }
          tr = $("tr", area);
          td = $("td", area);
          for (number = _k = 1, _ref = _this.size; 1 <= _ref ? _k <= _ref : _k >= _ref; number = 1 <= _ref ? ++_k : --_k) {
            for (i = _l = 1, _ref1 = _this.size; 1 <= _ref1 ? _l <= _ref1 : _l >= _ref1; i = 1 <= _ref1 ? ++_l : --_l) {
              id.push(_this.lengthInLetters[i] + number);
            }
          }
          td.each(function(i) {
            return $(this).attr({
              id: id[i]
            });
          });
          return $("body").append(area);
        };
      })(this);
      createArea();
      for (_i = 0, _len = id.length; _i < _len; _i++) {
        i = id[_i];
        this[i] = null;
      }
      onClickCell = function(e) {
        console.log("click");
        if (self.game_over) {
          return;
        }
        id = $(this).attr("id");
        if (self[id] !== null) {
          return;
        }
        return self.manager(id);
      };
      $(area).on("click", "td", onClickCell);
    }

    TicTacToe.prototype.setValue = function(cell, value) {
      var error;
      console.log("set");
      try {
        if (typeof cell !== "string") {
          return console.log("Неверный тип данных. Ожидается String");
        }
        if (typeof value !== "number") {
          return console.log("Неверный тип данных. Ожидается Boolean");
        }
        this[cell] = value;
        return this.all_moves++;
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
        this.setValue(id, 1);
      }
      if (this.whose_turn === 2) {
        $("#" + id).addClass("showZ");
        this.setValue(id, 2);
      }
      console.log(this.all_moves);
      if (this.findItemsConsecutive()) {
        this.game_over = true;
        alert("Победил " + (this.findItemsConsecutive().winner) + " игрок");
        console.log(this.findItemsConsecutive().line_winner);
        return;
      }
      if (this.size * this.size === this.all_moves) {
        this.game_over = true;
        alert("Ничья!");
        return;
      }
      return this.passTurn();
    };

    TicTacToe.prototype.findItemsConsecutive = function() {
      var count, i, iteam, lines, num, prev_iteam, _i, _j, _len, _len1, _ref;
      console.log("calc");
      count = 0;
      _ref = this.allCells;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        lines = _ref[_i];
        count = 0;
        for (num = _j = 0, _len1 = lines.length; _j < _len1; num = ++_j) {
          i = lines[num];
          iteam = this[i];
          if (iteam !== prev_iteam) {
            count = 0;
          }
          if (iteam !== null) {
            count++;
          }
          prev_iteam = iteam;
          if (count === this.shape_in_row) {
            return {
              winner: iteam,
              line_winner: lines
            };
          }
        }
      }
      return false;
    };

    TicTacToe.prototype.checkHorizontal = function(amount_numbers_in_row) {
      var col, letter, number, _i, _results;
      col = letters;
      col.length = amount_numbers_in_row;
      _results = [];
      for (number = _i = 1; 1 <= amount_numbers_in_row ? _i <= amount_numbers_in_row : _i >= amount_numbers_in_row; number = 1 <= amount_numbers_in_row ? ++_i : --_i) {
        _results.push((function() {
          var _j, _len, _results1;
          _results1 = [];
          for (_j = 0, _len = col.length; _j < _len; _j++) {
            letter = col[_j];
            _results1.push(alert(letter + number));
          }
          return _results1;
        })());
      }
      return _results;
    };

    TicTacToe.prototype.checkVertical = function(amount_numbers_in_row) {
      var col, letter, number, _i, _len, _results;
      col = letters;
      col.length = amount_numbers_in_row;
      _results = [];
      for (_i = 0, _len = col.length; _i < _len; _i++) {
        letter = col[_i];
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (number = _j = 1; 1 <= amount_numbers_in_row ? _j <= amount_numbers_in_row : _j >= amount_numbers_in_row; number = 1 <= amount_numbers_in_row ? ++_j : --_j) {
            _results1.push(alert(letter + number));
          }
          return _results1;
        })());
      }
      return _results;
    };

    TicTacToe.prototype.checkDiagonallyRightToLeft = function() {};

    TicTacToe.prototype.checkDiagonallyLeftToRight = function() {};

    return TicTacToe;

  })();

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

  $(function() {
    var bill, mike, ttt;
    ttt = new TicTacToe({
      size: 15
    });
    mike = new Player({
      name: "Mike"
    });
    return bill = new Player({
      name: "Bill"
    });
  });

}).call(this);
