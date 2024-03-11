//Checkers code                     ;

function Checkerstext(div, numRows, numColumns, rownumber, colnumber, divid) {
    if (div != undefined) {
        checkers_create_pieces(div, numRows, numColumns, rownumber, colnumber, divid)
    } else {

    }
}

var checker_counter = 1;
var pawncolor = 'white';
function checkers_create_pieces(div, numRows, numColumns, rownumber, colnumber, divid) {
    if (rownumber % 2 === 0 && colnumber == 1) {
        checker_counter = 2;
    } else if (rownumber % 2 !== 0 && colnumber == 1) {
        checker_counter = 1;
    }

    if (rownumber < 4) {
        var pawncolor = 'black';
    } else if (rownumber > (numRows - 3)) {
        var pawncolor = 'red';
    } else {
        var pawncolor = '';
    }

    let ImageID = divid + '_' + pawncolor + '_pawn';
    let pawntype = 'pawn'

    if (rownumber < 4) {
        if (checker_counter == 1){
            checker_counter = 2;
        } else {
            let pawn = document.createElement("img");
            pawn.setAttribute("id", ImageID);
            pawn.setAttribute("class", "picture");
            pawn.setAttribute('src', "image files/checkers_black_pawn.png");
            pawn.setAttribute("onclick", "selected(this.id, " + rownumber + ", " + colnumber + ', ' + numRows + ', ' + numColumns + ', "' + pawncolor + '", "' + pawntype + '")');
            div.appendChild(pawn); 
            checker_counter = 1;
        }
    } else if (rownumber > (numRows - 3)) {
        if (checker_counter == 1){
            checker_counter = 2;
        } else {
            let pawn = document.createElement("img");
            pawn.setAttribute("id", ImageID);
            pawn.setAttribute("class", "picture");
            pawn.setAttribute('src', "image files/checkers_red_pawn.png");
            pawn.setAttribute("onclick", "selected(this.id, " + rownumber + ", " + colnumber + ', ' + numRows + ', ' + numColumns + ', "' + pawncolor + '", "' + pawntype + '")');
            div.appendChild(pawn); 
            checker_counter = 1;
        }
    } else {

    }
}

function selected(id, row_location, column_location, numRows, numColumns, pawncolor, pawntype) {
    const deleteem = document.querySelectorAll('.ind');
    deleteem.forEach(element => {
        element.remove()
    });
    const toggleElements = document.querySelectorAll('.clicked');
    toggleElements.forEach(element => {
        element.classList.toggle('clicked');
    });
    const image = document.getElementById(id);
    image.classList.toggle('clicked');

    var UpRow = row_location - 1;
    var DownRow = row_location + 1;
    var ColumnL = column_location - 1;
    var ColumnR = column_location + 1;
        outside_or_blocked(DownRow, UpRow, ColumnL, ColumnR, pawncolor, numRows, numColumns, id, pawntype)
}

function outside_or_blocked(DownRow, UpRow, ColumnL, ColumnR, pawncolor, numRows, numColumns, id, pawntype) {
    var topLeft = "div_" + UpRow + '_' + ColumnL
    var topRight = "div_" + UpRow + '_' + ColumnR
    var bottomLeft = "div_" + DownRow + '_' + ColumnL
    var bottomRight = "div_" + DownRow + '_' + ColumnR

    //and it indeed is a pawn// this is for checking if there is an image on the tile they want to go
    const inside = [];
    inside.push(["topLeft", topLeft], ["topRight", topRight], ["bottomLeft", bottomLeft], ["bottomRight", bottomRight]);

    const enemy_pawn_location = []

    var insidecount = inside.length;
    for (let start = 0; start < insidecount; start = start + 1) {
        const intheway = document.querySelector('#' + inside[start][1]);
        if (intheway != null && intheway.querySelector('img')) {
            const namearray = [
                [[inside[0][1]], ["top"], ["Left"], [-1], [-1]], 
                [[inside[1][1]], ["top"], ["Right"], [-1], [+1]], 
                [[inside[2][1]], ["bottom"], ["Left"], [+1], [-1]], 
                [[inside[3][1]], ["bottom"], ["Right"], [+1], [+1]]];

            var index = inside[start][1]
            let substrings = index.split("_");

            for (let namearea = 0; namearea < 4; namearea = namearea + 1) {        
                let direction = namearray[namearea][0]
                let vertical = namearray[namearea][1]
                let horizontal = namearray[namearea][2]

                if (inside[start][0].includes(vertical) && inside[start][0].includes(horizontal)) {
                    substrings[1] = parseInt(substrings[1]) + parseInt(namearray[namearea][3])
                    substrings[2] = parseInt(substrings[2]) + parseInt(namearray[namearea][4])

                    let previousid = direction
                    inside[start][1] = "div_" + (substrings[1]) + '_' + (substrings[2])
                    namearray[namearea][1] = "div_" + substrings[1] + '_' + substrings[2]

                    const stillthere = document.querySelector('#' + inside[start][1]);
                    if (stillthere == null || stillthere.querySelector('img')) { inside[start] = 'woop'
                    } else {                    
                        const stillthere = document.querySelector('#' + previousid);
                        let imageelement = stillthere.querySelector('img');
                        let imageid = imageelement.id
                        if (imageid.includes(pawncolor)) {inside[start] = 'woop'} else {enemy_pawn_location.push(imageid, inside[start][1])}
                    }                
                }
            }
        }
    }   
    outsidebounds(inside, numColumns, numRows, pawncolor, pawntype)
    movement_indicator(inside, pawntype, pawncolor, id, numRows, numColumns, enemy_pawn_location)
}

function outsidebounds(inside, numColumns, numRows, pawncolor, pawntype) {
    let absolutecol = numColumns + 1
    let absoluterow = '_' + (numRows + 1) + '_'
    var insidecount = inside.length;

    for (let start = 0; start < insidecount; start = start + 1) {
        if (inside[start][0]) {
            if (inside[start][0] == "bottomLeft") {
                if (inside[start][1].endsWith("_0") || inside[start][1].includes(absoluterow)){inside[start] = 'woop'}
                if (pawncolor == 'red' && pawntype == 'pawn') {inside[start] = 'woop'}
            }
            if (inside[start][0] == "topLeft") {
                if (inside[start][1].endsWith("_0") || inside[start][1].includes("_0_")){inside[start] = 'woop'}
                if (pawncolor == 'black' && pawntype == 'pawn') {inside[start] = 'woop'}
            }
            
            if (inside[start][0] == "bottomRight") {
                if (inside[start][1].endsWith(absolutecol) || inside[start][1].includes(absoluterow)){inside[start] = 'woop'}
                if (pawncolor == 'red' && pawntype == 'pawn') {inside[start] = 'woop'}
            }
            
            if (inside[start][0] == "topRight") {
                if (inside[start][1].endsWith(absolutecol) || inside[start][1].includes("_0_")){inside[start] = 'woop'}
                if (pawncolor == 'black' && pawntype == 'pawn') {inside[start] = 'woop'}
            }
        }
    }


    for (let start = 0; start < 4; start = start + 1) {
        if (inside[0] == 'woop')
            {inside.splice(0, 1)}
        if (inside[1] == 'woop')
            {inside.splice(1, 1)}
        if (inside[2] == 'woop')
            {inside.splice(2, 1)}
        if (inside[3] == 'woop')
            {inside.splice(3, 1)}
    }
}

function movement_indicator(inside, pawntype, pawncolor, id, numRows, numColumns, enemy_pawn_location) {
    var insidecount = inside.length;
    for (let start = 0; start < insidecount; start++) {
        divid = inside[start][1]
        let indicator = document.createElement("img");
        let dov = document.getElementById(divid)
        indicator.setAttribute("id", "indicator_" + start);
        indicator.setAttribute("class", "ind");
        indicator.setAttribute("onclick", "checkers_move('" + divid + "', '" + pawncolor + "', '" + pawntype + "', '" + id + "', '" + numRows + "', '" + numColumns + "', '" + enemy_pawn_location + "')");
        indicator.setAttribute('src', "image files/movement indicator.png");
        if (dov != null) {
            dov.appendChild(indicator); 
        } else {indicator.remove()}   
    }
}

function checkers_move(div_id, pawncolor, pawntype, id, numRows, numColumns, enemy_pawn_location) {
    const elements = document.getElementsByClassName('ind');
    const elementsArray = Array.from(elements);
    elementsArray.forEach((element) => {element.remove();});

    checkers_take_pieces(div_id, enemy_pawn_location)

    pawntype = checkers_transformtoking(pawntype, pawncolor, numRows, div_id)

    let div = document.getElementById(div_id)
    idp = document.getElementById(id);
    idp.remove();
    idd = div_id.split("_");
    ImageID = idd[1] + "_" + idd[2] + "_" + pawncolor + "_" + pawntype;

    let pawn = document.createElement("img");
    pawn.setAttribute("id", ImageID);
    pawn.setAttribute("class", "box, picture");
    pawn.setAttribute('src', "image files/checkers_" + pawncolor + "_" + pawntype + ".png");
    pawn.setAttribute("onclick", "selected(this.id, " + idd[1] + ", " + idd[2] + ', ' + numRows + ', ' + numColumns + ', "' + pawncolor + '", "' + pawntype + '")');
    div.appendChild(pawn); 
}

function checkers_take_pieces(div_id, enemy_pawn_location) {
    enemy_pawn = enemy_pawn_location.split(",")
    let length = enemy_pawn.length
    for (var start = 0; start < length; start = start + 2){
        enemy = document.getElementById(enemy_pawn[start])
        if (div_id == enemy_pawn[parseInt(start) + 1]) {
            enemy.remove()
        }}
}

function checkers_transformtoking(pawntype, pawncolor, numRows, div_id) {
    if (pawntype == 'pawn') {
        let idd = div_id.split("_");
        if (idd[1] == numRows && pawncolor == 'black') {
            var pawntype = 'king'
            return (pawntype)
        } else if (idd[1] == 1 && pawncolor == 'red') {
            var pawntype = 'king'
            return (pawntype)
        } else {
            var pawntype = 'pawn'
            return(pawntype)
        }

    } else if (pawntype == 'king') {
        var pawntype = 'king';
        return(pawntype);
    }
}