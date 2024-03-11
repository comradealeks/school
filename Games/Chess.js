function Chesstext(div, numRows, numColumns, rownumber, colnumber, divid){   
    if (div != undefined) {
        chess_create_pieces(div, numRows, numColumns, rownumber, colnumber, divid)
    } else {

    }
}

//createing pieces
function chess_create_pieces(div, numRows, numColumns, rownumber, colnumber, divid) {
    
    if (rownumber < 3) {
        color = 'black'
    } else if (rownumber > 6) {
        color = 'white'
    }
    
    const pieceplacement = [
        [color, 'tower', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'tower', ],
        [color, 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', ],
        [undefined],
        [undefined],
        [undefined],
        [undefined],
        [color, 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', ],
        [color, 'tower', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'tower', ],
    ]

    if (pieceplacement[rownumber - 1][0] != undefined) {
        let piececolor = color
        let piecetype = pieceplacement[rownumber - 1][colnumber]
        let ImageID = divid + '_' + piececolor + "_" + piecetype;
        
        let piece = document.createElement("img");
        piece.setAttribute("id", ImageID);
        piece.setAttribute("class", "chess_picture");
        piece.setAttribute('src', "image files/chess_"+ piececolor + "_" + piecetype + ".png");
        piece.setAttribute("onclick", "chess_selected(this.id, " + numRows + ', ' + numColumns + ', "' + piececolor + '", "' + piecetype + '")');
        div.appendChild(piece); 
    }
}
//selected
function chess_selected(id, numRows, numColumns, piececolor, piecetype) {
    const toggleElements = document.querySelectorAll('.clicked');
    toggleElements.forEach(element => {
        element.classList.toggle('clicked');
    });
    const image = document.getElementById(id);
    image.classList.toggle('clicked');
    
    const pieces = {
        king: king,
        queen: queen,
        bishop: bishop,
        pawn: pawn,
        tower: tower,
        knight: knight
      };

    ids = id.split("_")
    remove_indicators()
    pieces[piecetype](ids, piececolor, numRows);
}

//movement
function pawn(id, piececolor, numRows) {
    colright = parseInt(id[1]) + 1
    colleft = id[1] - 1
    if (piececolor == 'black') {
        startrow = 2
        movement = parseInt(id[0]) + 1
        add = 2

    } else {
        startrow = numRows - 1
        movement = id[0] - 1
        add = -2
    }
    if (id[0] == startrow && check_if_image(movement, id[1]) == false && check_if_image((startrow + add), id[1]) == false) {
        Create_movement_area((startrow + add), id[1], id)
    }

    let leftcheck = check_if_image(movement, colleft)
    let rightcheck = check_if_image(movement, colright)
    if (leftcheck != false && leftcheck[2] != piececolor) {Create_movement_area(movement, colleft, id, true, leftcheck)} //remember this if same color
    if (rightcheck != false && rightcheck[2] != piececolor) {Create_movement_area(movement, colright, id, true, rightcheck)}
    

    if (check_if_image(movement, id[1]) == false){
        Create_movement_area(movement, id[1], id)}
}
function tower(id, piececolor, numRows) {
    let bodyguardindex = []
    let key = [0, 0, 0, 0];
    let direction = []
    let up = id[0];
    let down = id[0];
    let left = id[1];
    let right = id[1];
    direction.push([up, 0], [down, 0], [left, 1], [right, 1])

    while (key[0] != 1 || key[1] != 1 || key[2] != 1 || key[3] != 1) {
        for (let number = 0; number < 4; number++) {
            if (key[number] != 1) {
                if (number == 0) {direction[0][0]--; dir = direction[0][0]}
                if (number == 1) {direction[1][0]++; dir = direction[1][0]}
                if (number == 2) {direction[2][0]--; dir = direction[2][0]}
                if (number == 3) {direction[3][0]++; dir = direction[3][0]}
                if (direction[number][1] === 0) {
                    var checkup = check_if_image(dir, id[1])
                } else {
                    var checkup = check_if_image(id[0], dir)
                }
                if (checkup == false) {
                    if (direction[number][1] === 0) {
                        var check2 = Create_movement_area(dir, id[1], id)
                    } else {
                        var check2 = Create_movement_area(id[0], dir, id)
                    }
                    if (check2 == false) {key[number] = 1}
                } else {
                    if (checkup[2] != piececolor) {
                        if (checkup[3] == 'tower' || checkup[3] == 'queen') {bodyguardindex.push(checkup)}
                        if (direction[number][1] === 0) {
                            Create_movement_area(dir, id[1], id, true, checkup)
                        } else {
                            Create_movement_area(id[0], dir, id, true, checkup)
                        }
                        key[number] = 1
                    } else {key[number] = 1;}
                }
            }
        }
    }
    return(bodyguardindex)
}
function bishop(id, piececolor, numRows) {
    let bodyguardindex = []
    let key = [0, 0, 0, 0];
    let direction = []
    let up = id[0];
    let down = id[0];
    let left = id[1];
    let right = id[1];
    direction.push([up, 0], [down, 0], [left, 1], [right, 1])


    while (key[0] != 1 || key[1] != 1 || key[2] != 1 || key[3] != 1) {
        direction[0][0]--; 
        let ups = direction[0][0];
        direction[1][0]++; 
        let downs = direction[1][0];
        direction[2][0]--; 
        let lefts = direction[2][0];
        direction[3][0]++; 
        let rights = direction[3][0];

        for (let number = 0; number < 4; number++) {
            if (key[number] != 1) {
                if (number == 0) {
                    var checkup = check_if_image(ups, lefts)
                } else if (number == 1) {
                    var checkup = check_if_image(ups, rights)
                } else if (number == 2) {
                    var checkup = check_if_image(downs, lefts)
                } else if (number == 3) {
                    var checkup = check_if_image(downs, rights)
                }
                if (checkup == false) {
                    if (number == 0) {
                        var check2 = Create_movement_area(ups, lefts, id)
                    } else if (number == 1) {
                        var check2 = Create_movement_area(ups, rights, id)
                    } else if (number == 2) {
                        var check2 = Create_movement_area(downs, lefts, id)
                    } else if (number == 3) {
                        var check2 = Create_movement_area(downs, rights, id)
                    }
                    if (check2 == false) {key[number] = 1}
                } else {
                    if (checkup[2] != piececolor) {
                        if (checkup[3] == 'bishop' || checkup[3] == 'queen') {bodyguardindex.push(checkup)}

                        if (number == 0) {
                            Create_movement_area(ups, lefts, id, true, checkup)
                        } else if (number == 1) {
                            Create_movement_area(ups, rights, id, true, checkup)
                        } else if (number == 2) {
                            Create_movement_area(downs, lefts, id, true, checkup)
                        } else if (number == 3) {
                            Create_movement_area(downs, rights, id, true, checkup)
                        }
                        key[number] = 1
                    } else {key[number] = 1;}
                }
            }
        }

    }
    return(bodyguardindex)
}
function knight(id, piececolor, numRows) {
    let bodyguardindex = []
    let leftup = [(parseInt(id[0]) - 1), (parseInt(id[1]) - 2)]
    let upleft = [(parseInt(id[0]) - 2), (parseInt(id[1]) - 1)]
    let upright = [(parseInt(id[0]) - 2), (parseInt(id[1]) + 1)]
    let rightup = [(parseInt(id[0]) - 1), (parseInt(id[1]) + 2)]
    let rightdown = [(parseInt(id[0]) + 1), (parseInt(id[1]) + 2)]
    let downright = [(parseInt(id[0]) + 2), (parseInt(id[1]) + 1)]
    let downleft = [(parseInt(id[0]) + 2), (parseInt(id[1]) - 1)]
    let leftdown = [(parseInt(id[0]) + 1), (parseInt(id[1]) - 2)]

    let collection = []
    collection.push(leftup, upleft, upright, rightup, rightdown, downright, downleft, leftdown)

    for (let number = 0; number < 9; number++) {
        try {var check = check_if_image(collection[number][0], collection[number][1])}
        catch{check= true}
        if (check == false) {
            var check2 = Create_movement_area(collection[number][0], collection[number][1], id)
            if (check2 == false) {}
        } else {
            if (check[2] != piececolor) {
                try {
                    Create_movement_area(collection[number][0], collection[number][1], id, true, check)
                    if (check[3] == 'knight') {
                        bodyguardindex.push(check)}
                    }
                catch{catch2 = true}
            }
        }
    }
    return(bodyguardindex)
}
function queen(id, piececolor, numRows) {
    tower(id, piececolor, numRows)
    bishop(id, piececolor, numRows)
}
function king(id, piececolor, numRows) {
    let upleft = [(parseInt(id[0]) - 1), (parseInt(id[1]) - 1)]
    let up = [(parseInt(id[0]) - 1), (parseInt(id[1]))]
    let upright = [(parseInt(id[0]) - 1), (parseInt(id[1]) + 1)]
    let right = [(parseInt(id[0])), (parseInt(id[1]) + 1)]
    let downright = [(parseInt(id[0]) + 1), (parseInt(id[1]) + 1)]
    let down = [(parseInt(id[0]) + 1), (parseInt(id[1]))]
    let downleft = [(parseInt(id[0]) + 1), (parseInt(id[1]) - 1)]
    let left = [(parseInt(id[0])), (parseInt(id[1]) - 1)]

    let collection = []
    collection.push(upleft, up, upright, right, downright, down, downleft, left)

    for (let number = 0; number < 9; number++) {
        try {var check = check_if_image(collection[number][0], collection[number][1])}
        catch{check= true}
        if (check == false) {
            var check2 = Create_movement_area(collection[number][0], collection[number][1], id, false, check, id[3], piececolor)
            if (check2 == false) {}
        } else {
            if (check[2] != piececolor) {
                try {Create_movement_area(collection[number][0], collection[number][1], id, true, check)}
                catch{catch2 = true}
            }
        }
    }
}

//creating indicator and destroying it
function remove_indicators() {
    const divs = document.querySelectorAll('div[id^="indicator"]');
    divs.forEach((div) => {
      div.remove();
    });
  }

function Create_movement_area(row, col, id, imagecheck, enemy, pawntype, piececolor) {
    let imageID = id.join("_")  
    let divID = "div_" + row + "_" + col
    try{
        let dov = document.getElementById(divID);
        let indicator = document.createElement("div");
        indicator.setAttribute("id", "indicator_" + row + "_" + col);

        body = '#' + row + "_" + col + "_" + id[2] + '_bodyguard'
        console.log(body);
        // let bodyguardthere = document.querySelector(body);
        // console.log(bodyguardthere)
        console.log('2')

        if (imagecheck) {
            indicator.setAttribute("class", "replacement_indicator");
            indicator.setAttribute("onclick", "taking_replacing_piece('" + imageID + "', '" + enemy + "')");
        }else {
            indicator.setAttribute("class", "movement_indicator");
            indicator.setAttribute("onclick", "moving(this.id, '" + imageID + "', '" + pawntype + "', '" + imagecheck + "', '" + piececolor + "', '" + enemy + "')");
        }
        dov.appendChild(indicator);
    } catch{return false}
    
    
}

//checking if there is an image in the place
function check_if_image(row, col) {
    const imagethere = document.querySelector('#' + "div_" + row + "_" + col);
    if (imagethere == null) {return false}
    if (imagethere.querySelector('img')) {
        let itsThere = imagethere.querySelector('img')
        let itsID = itsThere.id
        let id = itsID.split("_")
        return id
    } else {return false}
}

//taking a piece and replacing it with ur location or moving there if there is non
function moving(indicatorID, imageID, pawntype, imagecheck, piececolor, enemy){
    let id = indicatorID.split("_");
    let divID = "div_" + id[1] + "_" + id[2];
    let oldID = imageID.split("_")
    let NEWpicID = id[1] + "_" + id[2] + "_" + oldID[2] + "_" + oldID[3];

    let source = document.getElementById(imageID);
    let target  = document.getElementById(divID);

    remove_indicators()
    target.appendChild(source);
    source.setAttribute("id", NEWpicID);
    if (pawntype == "king") {bodyguards(id[1], id[2], id, imagecheck, piececolor)}
}
function taking_replacing_piece(FriendlyID, enemyID) {
    let enemyIS = enemyID.split(",")
    let enemy = enemyIS.join("_")
    let oldID = FriendlyID.split("_")
    let NEWpicID = enemyIS[0] + "_" + enemyIS[1] + "_" + oldID[2] + "_" + oldID[3]
    let divID = "div_" + enemyIS[0] + "_" + enemyIS[1];
    let img = document.getElementById(FriendlyID)
    let enm = document.getElementById(enemy)
    let div = document.getElementById(divID)

    enm.remove()
    div.appendChild(img);
    img.setAttribute("id", NEWpicID);
    remove_indicators()

}


//special moves
function bodyguards(row, col, id , imagecheck, piececolor) {
    const divt = document.querySelectorAll('div[id^="bodyguard_' + piececolor + '"]');
    divt.forEach((div) => {
      div.remove();
    });
    
    let upleft = [(parseInt(row) - 1), (parseInt(col) - 1)]
    let up = [(parseInt(row) - 1), (parseInt(col))]
    let upright = [(parseInt(row) - 1), (parseInt(col) + 1)]
    let right = [(parseInt(row)), (parseInt(col) + 1)]
    let downright = [(parseInt(row) + 1), (parseInt(col) + 1)]
    let down = [(parseInt(row) + 1), (parseInt(col))]
    let downleft = [(parseInt(row) + 1), (parseInt(col) - 1)]
    let left = [(parseInt(row)), (parseInt(col) - 1)]
    
    let collection = []
    collection.push(upleft, up, upright, right, downright, down, downleft, left)

    for (let number = 0; number < 9; number++) {
        try {var check = check_if_image(collection[number][0], collection[number][1])}
        catch{check = true}
        if (check == false) {
            let divID = "div_" + collection[number][0] + "_" + collection[number][1]
            let indicatorID = (collection[number][0]) + "_" + (collection[number][1]) + "_" + piececolor + "_bodyguard";
            try{
                let dov = document.getElementById(divID)
                let indicator = document.createElement("div");
                indicator.setAttribute("id", indicatorID);
                indicator.setAttribute("class", "bodyguard");
                dov.appendChild(indicator);

                danger = bodyguards_danger(indicatorID, 8, piececolor)
                if (danger == true) {
                    
                } else {indicator.remove()}
            } catch{}
        }
    }
}
function bodyguards_danger(id, numRows, piececolor) {
    ids = id.split("_")
    let knights = knight(ids, piececolor, numRows)
    let bishops = bishop(ids, piececolor, numRows)
    let towers = tower(ids, piececolor, numRows)
    remove_indicators()
    console.log(knights, bishops, towers)
}

function if_king_moved_into_check() {
// "bodyguards"

}
function if_king_in_check() {}
function pawnpromotion() {}
function en_passant() {}
function castling() {}


