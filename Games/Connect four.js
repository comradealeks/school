    //Connect four code

    //variable to check whos turn it is
    var turn = 1;

    //code to set player text and color
    function Connectfourtext(div, numRows, numColumns) {
        let playercolor = document.getElementById("playercolor")
        let player = document.getElementById("player")
        if (div != undefined) {
            document.getElementById("player").innerText="player 1";
            document.getElementById("playercolor").innerText="______.";
            player.setAttribute("class", "W ");
            playercolor.style.backgroundColor = "red";
            playercolor.style.color = "red";
            div.setAttribute("onclick", "ConnectFourPhysics(this.id, " + numRows + ")")
        } else if (div == undefined) {
            if (turn == 1){
                document.getElementById("player").innerText="player 2";
                player.setAttribute("class", "W ");
                playercolor.style.backgroundColor = "yellow";
                playercolor.style.color = "yellow";
                colr = 'red';
                turn = 2;
            } else {
                document.getElementById("player").innerText="player 1";
                player.setAttribute("class", "W ");
                playercolor.style.backgroundColor = "red";
                playercolor.style.color = "red";
                colr = 'yellow';
                turn = 1;
            }
        }
    }


    //fixes the "fall physics"
    function ConnectFourPhysics(idd, numRows) {
        //these variables are here for me to be able to change and check the ids each time a new tile is clicked
        var div2 = document.getElementById(idd);
        var divR = idd.slice(4, -2);
        var divC = idd.slice(6, 7);
        var div3 = document.getElementById("div_" + numRows + '_' + divC);
        var down = numRows - divR;
        //this part only checks if ur clicking on a white tile
        if (div2.style.backgroundColor.includes('white')) {
            Connectfourtext()
            //this part checks where on the vertical line the color should appear (furthest down point)
            for (var r = 0; r <= down; r++) {
                divr = parseInt(divR) + parseInt(r)
                div2 = document.getElementById("div_" + divr + '_' + divC)
                //this one checks if tile bellow where u clicked is white (and continues down until it hits a color)
                if (div2.style.backgroundColor.includes('red') || div2.style.backgroundColor.includes('yellow')) {
                    div2 = document.getElementById("div_" + (parseInt(divr) -1) + '_' + divC)
                    div2.setAttribute("style", "background-color: " + colr)
                    checkWin(colr, divC, divr, -1)
                    break
                } 
                //this makes sure that if the bottom row is white it stops and colors this one first
                else if (r == down) {
                    div3.setAttribute("style", "background-color: " + colr)
                    checkWin(colr, divC, numRows, 0)
                }
            }   
        }
    }

    function checkWin(colr, col1, row1, num) {
        //the one that was clicked
        var divs = "div_" + (parseInt(row1) + num) + '_' + col1;
        var divi = document.getElementById(divs);


        //variables for the horisontal and diagonal wins
        var left = -1;
        var right = 1;
        var down = -1
        var up = 1

        //variables for the diagonal ones (yeah, alot, i know)
        //up left
        var UL_left = -1;
        var UL_up = 1;

        //down left
        var DL_left = -1
        var DL_down = -1

        //up right
        var UR_right = 1
        var UR_up = 1

        //down right
        var DR_right = 1
        var DR_down = -1

        //winlog
        var ltr = 1
        var rtl = 1

        //for loop for checking if the win conditions is met in any direction
        for (let t = 0; t <= 4; t++) {
            //Horizontal 2 possible ways
            let leftdiv = "div_" + (parseInt(row1) + num) + '_' + (parseInt(col1) + left);
            let rightdiv = "div_" + (parseInt(row1) + num) + '_' + (parseInt(col1) + right);

            let divhl = document.getElementById(leftdiv);
            let divhr = document.getElementById(rightdiv);

            if (divhl !== null && divhl.style.backgroundColor.includes(colr)) {
                left--
                if (Math.abs(left) + right == 5) {
                    winner()
                }
            }
            if (divhr !== null && divhr.style.backgroundColor.includes(colr)) {
                right++
                if (Math.abs(left) + right == 5) {
                    winner()
                }
            }

            //vertical 2 possible ways
            let downdiv = "div_" + (parseInt(row1) + num + down) + '_' + (parseInt(col1));
            let updiv = "div_" + (parseInt(row1) + num + up) + '_' + (parseInt(col1));

            let divvd = document.getElementById(downdiv);
            let divvu = document.getElementById(updiv);

            if (divvd !== null && divvd.style.backgroundColor.includes(colr)) {
                down--
                if (Math.abs(down) + up == 5) {
                    winner()
                }
            }
            if (divvu !== null && divvu.style.backgroundColor.includes(colr)) {
                up++
                if (Math.abs(down) + up == 5) {
                    winner()
                }
            }

            //diagonal 4 possible ways
            let Diagonal_Up_left = "div_" + (parseInt(row1) + num + UL_up) + '_' + (parseInt(col1) + UL_left);
            let Digaonal_down_left = "div_" + (parseInt(row1) + num + DL_down) + '_' + (parseInt(col1) + DL_left);
            let Diagonal_Up_right = "div_" + (parseInt(row1) + num + UR_up) + '_' + (parseInt(col1) + UR_right);
            let Digaonal_down_right = "div_" + (parseInt(row1) + num + DR_down) + '_' + (parseInt(col1) + DR_right);

            let upLeft = document.getElementById(Diagonal_Up_left);
            let downLeft = document.getElementById(Digaonal_down_left);
            let upRight = document.getElementById(Diagonal_Up_right);
            let downRight = document.getElementById(Digaonal_down_right);

            if (upLeft !== null && upLeft.style.backgroundColor.includes(colr)) {
                UL_up++
                UL_left--
                ltr++
                if (ltr == 4) {
                    winner()
                }
            }
            if (downLeft !== null && downLeft.style.backgroundColor.includes(colr)) {
                DL_down--
                DL_left--
                rtl++
                if (rtl == 4) {
                    winner()
                }
            }
            if (upRight !== null && upRight.style.backgroundColor.includes(colr)) {
                UR_up++
                UR_right++
                rtl++
                if (rtl == 4) {
                    winner()
                }
            }
            if (downRight !== null && downRight.style.backgroundColor.includes(colr)) {
                DR_down--
                DR_right++
                ltr++
                if (ltr == 4) {
                    winner()
                }
            }

        }            
    }

    function winner() {
        //this one changes the text and fonts if someone has won
        playercolor.remove()
        div_grid.remove()
        player.setAttribute("id", "playerwinner");
        playerwinner.setAttribute("class", "title");
        if (turn == 1){
                document.getElementById("playerwinner").innerText="player 2";
            } else {
                document.getElementById("playerwinner").innerText="player 1";
            }
        document.getElementById("winneris").innerText="The winner is:";
        winneris.setAttribute("style", "background-color: " + colr)
        
    }

