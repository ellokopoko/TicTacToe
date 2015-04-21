class Player
    number = 0
    constructor: (@options)->
        @name                = @options.name
        if number > 1 then return console.log "Невозможно создать более 2 игроков"
        number += 1
        @number              = number
    # ! ---- Constrictor ---- !