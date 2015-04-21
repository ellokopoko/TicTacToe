$ ->
 
    ttt = new TicTacToe(size: 4)
    #alert ttt.cells_from_which_builds_diagonal.cells_right_to_left
    #alert ttt.cells_from_which_builds_diagonal.cells_left_to_right
    #for i in ttt.diagonallyCells
        #alert i
    for i in ttt.allCells
        alert i
    
    
    mike = new Player(name: "Mike")
    bill = new Player(name: "Bill")
    
    
    
    
#<td><svg class="cross hide" height="30px" width="30px" x='0px' y='0px' viewBox="0 0 512 512" ><polygon  fill="green" points="476.153,94.43 417.569,35.847 256,197.417 94.431,35.847 35.847,94.43 197.416,256 35.847,417.57 94.431,476.153 256,314.583 417.569,476.153 476.153,417.57 314.584,256"></polygon></svg><svg class="zero hide" width="30" height="30" x='0px' y='0px' viewBox="1 1 38 38"><circle r="14" cx="20" cy="20" fill="transparent" stroke="orangered" stroke-width="5" /></svg></td>