class TicTacToe
    letters                  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']
    td                       = $("<td><svg class='cross' height='30px' width='30px' x='0px' y='0px' viewBox='0 0 512 512' ><polygon  fill='green' points='476.153,94.43 417.569,35.847 256,197.417 94.431,35.847 35.847,94.43 197.416,256 35.847,417.57 94.431,476.153 256,314.583 417.569,476.153 476.153,417.57 314.584,256'></polygon></svg><svg class='zero' width='30' height='30' x='0px' y='0px' viewBox='1 1 38 38'><circle r='14' cx='20' cy='20' fill='transparent' stroke='orangered' stroke-width='5' /></svg></td>")
    tr                       = $("<tr></tr>")
    id                       = []
    createDiagonally = (cell, revers = false)->
        arr       = []
        letter    = cell.slice(0, 1)
        number    = +cell.slice(1, 2)
        letters   = _.drop(@lengthInLetters, 1)
        index     = letters.indexOf(letter)
        if revers
            letters.sort((a, b)->
                if a > b then return -1
                if a < b then return 1
            )
        letters   = _.drop(letters, index)
        for letter in letters
            arr.push(letter + number)
            if number++ >= @size then return arr
        arr
  
        
    
    constructor: (@options)->
        @area = area            = $("<table id='tic_tac_toe'></table>")
        @size = size            = @options.size
        @whose_turn             = 1
        self                    = this
        @shape_in_row           = 5
        @all_moves              = 0
        @game_over              = false
        @lengthInLetters        = (->
            arr = [' ']
            for i in [0...@size]
                arr.push(letters[i])
            arr
        ).call(@)
        @cells_from_which_builds_diagonal = (->
            ss = size_square_with_cells = @size - @shape_in_row + 1
            
            cells_left_to_right = []
            cells_right_to_left = []
            
            for i in [1..ss]
                cells_left_to_right.push(@lengthInLetters[i] + 1)
                cells_right_to_left.push(@lengthInLetters[@lengthInLetters.length - i] + 1)
                
                cells_left_to_right.push(@lengthInLetters[1] + i)
                cells_right_to_left.push(@lengthInLetters[@size] + i)
            
            {
                cells_left_to_right: _.uniq(cells_left_to_right),
                cells_right_to_left: _.uniq(cells_right_to_left)
            }
        ).call(@)
        @horizontalCells        = (->
            arr = []
            for number in [1..@size]
                for i in [1..@size]
                    arr.push(@lengthInLetters[i] + number)
            _.chunk(arr, @size)
        ).call(@)
        @verticalCells          = (->
            arr = []
            for i in [1..@size]
                for number in [1..@size]
                    arr.push(@lengthInLetters[i] + number)
            _.chunk(arr, @size)
        ).call(@)
        @diagonallyCells        = (->
            cells      = @cells_from_which_builds_diagonal.cells_left_to_right
            #right     = @cells_from_which_builds_diagonal.cells_right_to_left
            arr = []
            for cell in cells
                arr.push(createDiagonally.call(@, cell))
                arr.push(createDiagonally.call(@, cell, true))
            arr
        ).call(@)
        @allCells               = (->
            arr = []
            arr.push(@horizontalCells)
            arr.push(@verticalCells)
            arr.push(@diagonallyCells)
            _.flatten(arr)
        ).call(@)
        
    
        
        createArea = =>
            for i in [0...size]
                tr = $(tr).append(td.clone())
            
            for i in [0...size]
                $(area).append(tr.clone())
                
            tr = $("tr", area)
            td = $("td", area)
            
            #
            for number in [1..@size]
                for i in [1..@size]
                    id.push(@lengthInLetters[i] + number)
            
            td.each((i)->
                $(@).attr(id: id[i])
                
            )    
            
            $("body").append(area)
        createArea()

        
        
        for i in id
            @[i] = null
            
        onClickCell = (e)->
            console.log "click"
            return if self.game_over
            id = $(@).attr("id")
            return if self[id] != null
            self.manager(id)
        $(area).on("click", "td", onClickCell)        
    # ! ---- Consctructor ---- ! 
        
    
    
    
    setValue: (cell, value)->
        console.log "set"
        try
            return console.log "Неверный тип данных. Ожидается String" unless typeof cell == "string"
            return console.log "Неверный тип данных. Ожидается Boolean" unless typeof value == "number"
            @[cell] = value
            @all_moves++
        catch error
            console.log error
    # ! ---- Set Value ---- !
                
        
    
    
    
    passTurn: ->
        if @whose_turn == 1 then return @whose_turn = 2
        if @whose_turn == 2 then return @whose_turn = 1
    # ! ---- Pass Turn ---- !
        
    
    
    
    manager: (id)->
        if @whose_turn == 1
            $("#" + id).addClass("showC")
            @setValue(id, 1)
        if @whose_turn == 2
            $("#" + id).addClass("showZ")
            @setValue(id, 2)
        console.log @all_moves
        if @findItemsConsecutive()
            @game_over = true
            alert "Победил #{@findItemsConsecutive().winner} игрок"
            console.log @findItemsConsecutive().line_winner
            return
        if @size*@size == @all_moves
            @game_over = true
            alert "Ничья!"
            return
        @passTurn()
    # ! ---- Manager ---- !
    
    
    
    findItemsConsecutive: ->
        console.log "calc"
        count       = 0
        for lines in @allCells
            count           = 0
            
            for i, num in lines
                iteam = @[i]
                
                if iteam != prev_iteam
                    count = 0
                if iteam != null
                    count++
                    
                prev_iteam  = iteam
                
                if count == @shape_in_row
                    return winner: iteam, line_winner: lines 
        false
        
    
    
    
    checkHorizontal: (amount_numbers_in_row)->
        col = letters
        col.length = amount_numbers_in_row
        for number in [1..amount_numbers_in_row]
            for letter in col
                alert letter + number
            
    
    checkVertical: (amount_numbers_in_row)->
        col = letters
        col.length = amount_numbers_in_row
        for letter in col
            for number in [1..amount_numbers_in_row]
                alert letter + number
    
    checkDiagonallyRightToLeft: ->
    
    checkDiagonallyLeftToRight: ->