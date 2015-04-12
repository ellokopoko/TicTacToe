$ ->
    class TicTacToe
        constructor: (@options)->
            @area = area         = $("<table id='tic_tac_toe'></table>")
            
            td                   = $("<td><svg class='cross' height='30px' width='30px' x='0px' y='0px' viewBox='0 0 512 512' ><polygon  fill='green' points='476.153,94.43 417.569,35.847 256,197.417 94.431,35.847 35.847,94.43 197.416,256 35.847,417.57 94.431,476.153 256,314.583 417.569,476.153 476.153,417.57 314.584,256'></polygon></svg><svg class='zero' width='30' height='30' x='0px' y='0px' viewBox='1 1 38 38'><circle r='14' cx='20' cy='20' fill='transparent' stroke='orangered' stroke-width='5' /></svg></td>")
            tr                   = $("<tr></tr>")
            id                   = []
            
            @size = size         = @options.size
            @cells               = {}
            @whose_turn          = 1
            self                 = this
            
            letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']
            
            createArea = ->
                for i in [0...size]
                    tr = $(tr).append(td.clone())
                
                for i in [0...size]
                    $(area).append(tr.clone())
                    
                tr = $("tr", area)
                td = $("td", area)
                
                for i in [0...tr.length]
                    letter = letters[i]
                    for i in [1..size]
                        id.push(letter + i)
                
                td.each((i)->
                    $(@).attr(id: id[i])
                    
                )    
                
                $("body").append(area)
            createArea()
            
            for i in id
                @[i] = null
                
            onClickCell = (e)->
                id = $(@).attr("id")
                return if self[id] != null
                self.manager(id)
                
            $(area).on("click", "td", onClickCell)        
        # ! ---- Consctructor ---- ! 
        
        
        setValue: (cell, value)->
            try
                return console.log "Неверный тип данных. Ожидается String" unless typeof cell == "string"
                return console.log "Неверный тип данных. Ожидается Boolean" unless typeof value == "boolean"
                @[cell] = value
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
                @setValue(id, true)
            if @whose_turn == 2
                $("#" + id).addClass("showZ")
                @setValue(id, false)
            @passTurn()
    # ! ---- Class Tic Tac Toe ---- !
            
            
            
            #id = "#" + $(e.target).attr("id")
            #$(id).addClass('showZ')
        
            
            
    ttt = new TicTacToe(size: 3)
    
    class Player
        number = 0
        constructor: (@options)->
            @name                = @options.name
            if number > 1 then return console.log "Невозможно создать более 2 игроков"
            number += 1
            @number              = number
        # ! ---- Constrictor ---- !
    # ! ---- Class Player ---- !
            
    mike = new Player(name: "Mike")
    bill = new Player(name: "Bill")
    
    
    
    
#<td><svg class="cross hide" height="30px" width="30px" x='0px' y='0px' viewBox="0 0 512 512" ><polygon  fill="green" points="476.153,94.43 417.569,35.847 256,197.417 94.431,35.847 35.847,94.43 197.416,256 35.847,417.57 94.431,476.153 256,314.583 417.569,476.153 476.153,417.57 314.584,256"></polygon></svg><svg class="zero hide" width="30" height="30" x='0px' y='0px' viewBox="1 1 38 38"><circle r="14" cx="20" cy="20" fill="transparent" stroke="orangered" stroke-width="5" /></svg></td>