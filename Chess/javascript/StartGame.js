var board = new Array(64);
var selected_position;
var selected_piece;
var temp_position;
var if_select = 0;
var current_turn;
var turn_black = 0;
var turn_white = 1;

function click_play(){
  document.getElementById('Play_Button').disabled = true;
  init_piece();
  display_board();
  current_turn = turn_white;
}

function init_piece(){
  // black : pawn = 1, rook = 2, knight = 3, bishop = 4, queen = 5, king = 6
  // white : pawn = 11, rook = 12, knight = 13, bishop = 14, queen = 15, king = 16
  board = [2,3,4,5,6,4,3,2,
          1,1,1,1,1,1,1,1,
          0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,
          11,11,11,11,11,11,11,11,
          12,13,14,16,15,14,13,12];
}

function display_board(){ // Show pieces on the chessboard
  for(var i = 0; i < 64; i++){
    var temp = document.getElementById('Position' + i);
    if(board[i] != 0){
      var string = '<input id="Piece" type="image" src="./img/' + board[i] + '.png" onclick="click_position' + i +'()">';
      temp.innerHTML=string;
    }
    else{
      temp.innerHTML=null;
    }
  }
}

function move(){
  board[selected_position] = selected_piece;  // Move to the selected position(green mark).
  board[temp_position] = 0; // Remove piece from past position.
  if(current_turn == turn_white){
    current_turn = turn_black;
  }
  else if(current_turn == turn_black){
    current_turn = turn_white;
  }
}

function remove(){
  board[selected_position] = selected_piece;  // Remove the selected enemy piece(red mark) and move to the position.
  board[temp_position] = 0; // Remove piece from past position.
  if(current_turn == turn_black){
    current_turn = turn_white;
  }
  else if(current_turn == turn_white){
    current_turn = turn_black;
  }
}

function black_pawn(){
  var x = selected_position % 8;  // X-coordinate
  var y = Math.floor(selected_position / 8); // Y-coordinate

  if(y < 7){  // The selected piece is less than Y-coordinate 7.
    if(board[selected_position + 8] == 0){  // There's nothing in that position(Y+1 from selected piece).
      board[selected_position + 8] = 100; // Mark at the position.

      if(y == 1 && board[selected_position + 16] == 0){
        // The black pawn didn't move.
        // There's nothing in that position(Y+2 from selected piece).
        board[selected_position + 16] = 100; // Mark at the position.
      }
    }
    if(board[selected_position + 9] >= 11 && board[selected_position + 9] <= 16){
      // There is an enemy in the position(X+1,Y+1 from selected piece).
      if(x != 7){ // The selected piece is not X-coordinate 7.
        board[selected_position + 9] += 20; // Mark on a piece in that position(X+1,Y+1 from selected piece).
      }
    }
    if(board[selected_position + 7] >= 11 && board[selected_position + 7] <= 16){
      // There is an enemy in the position(X-1,Y+1 from selected piece).
      if(x != 0){  // The selected piece is not X-coordinate 0.
        board[selected_position + 7] += 20; // Mark on a piece in that position(X-1,Y+1 from selected piece).
      }
    }
  }
}

function white_pawn(){
  var x = selected_position % 8;  // X-coordinate
  var y = Math.floor(selected_position / 8); // Y-coordinate

  if(y > 0){  // The selected piece is greater than Y-coordinate 0.
    if(board[selected_position - 8] == 0){  // There's nothing in that position(Y-1 from selected piece).
      board[selected_position - 8] = 100; // Mark at the position.

      if(y == 6 && board[selected_position - 16] == 0){
        // The black pawn didn't move.
        // There's nothing in that position(Y-2 from selected piece).
        board[selected_position - 16] = 100; // Mark at the position.
      }
    }
    if(board[selected_position - 9] >= 1 && board[selected_position - 9] <= 6){
      // There is an enemy in the position(X-1,Y-1 from selected piece).
      if(x != 0){ // The selected piece is not X-coordinate 0.
        board[selected_position - 9] += 20; // Mark on a piece in that position(X-1,Y-1 from selected piece).
      }
    }
    if(board[selected_position - 7] >= 1 && board[selected_position - 7] <= 6){
      // There is an enemy in the position(X+1,Y-1 from selected piece).
      if(x != 7){  // The selected piece is not X-coordinate 7.
        board[selected_position - 7] += 20; // Mark on a piece in that position(X+1,Y-1 from selected piece).
      }
    }
  }
}

function rook(){
  var init_x = selected_position % 8;
  var init_y = Math.floor(selected_position / 8);
  var x = init_x;
  var y = init_y;
  var i;

  i = 1;
  while(1){
    if(x == 7){
      break;
    }
    if(board[selected_position + i] == 0){
      board[selected_position + i] = 21;
    }
    else if(board[selected_position + i] >= 1 && board[selected_position + i] <= 6 && (selected_piece == 12 || selected_piece == 15)){
      board[selected_position + i] += 30;
      break;
    }
    else if(board[selected_position + i] >= 11 && board[selected_position + i] <= 16 && (selected_piece == 2 || selected_piece == 5)){
      board[selected_position + i] += 30;
      break;
    }
    else{
      break;
    }
    i++;
    x++;
  }

  i = 1;
  x = init_x;
  while(1){
    if(x == 0){
      break;
    }
    if(board[selected_position - i] == 0){
      board[selected_position - i] = 21;
    }
    else if(board[selected_position - i] >= 1 && board[selected_position - i] <= 6 && (selected_piece == 12 || selected_piece == 15)){
      board[selected_position - i] += 30;
      break;
    }
    else if(board[selected_position - i] >= 11 && board[selected_position -i] <= 16 && (selected_piece == 2 || selected_piece == 5)){
      board[selected_position - i] += 30;
      break;
    }
    else{
      break;
    }
    i++;
    x--;
  }

  i = 8;
  while(1){
    if(y == 7){
      break;
    }
    if(board[selected_position + i] == 0){
      board[selected_position + i] = 21;
    }
    else if(board[selected_position + i] >= 1 && board[selected_position + i] <= 6 && (selected_piece == 12 || selected_piece == 15)){
      board[selected_position + i] += 30;
      break;;
    }
    else if(board[selected_position + i] >= 11 && board[selected_position + i] <= 16 && (selected_piece == 2 || selected_piece == 5)){
      board[selected_position + i] += 30;
      break;;
    }
    else{
      break;;
    }
    i += 8;
    y++;
  }

  i = 8;
  y = init_y;
  while(1){
    if(y == 0){
      break;
    }
    if(board[selected_position - i] == 0){
      board[selected_position - i] = 21;
    }
    else if(board[selected_position - i] >= 1 && board[selected_position - i] <= 6 && (selected_piece == 12 || selected_piece == 15)){
      board[selected_position - i] += 30;
      break;
    }
    else if(board[selected_position - i] >= 11 && board[selected_position - i] <= 16 && (selected_piece == 2 || selected_piece == 5)){
      board[selected_position - i] += 30;
      break;
    }
    else{
      break;
    }
    i += 8;
    y--;
  }
}

function knight(){

}

function bishop(){

}

function queen(){

}

function king(){

}

function click_position0(){
  display_board();
  selected_position = 0;

  if(if_select == 0){ // Piece is not selected.
    if(current_turn == turn_white){ // it's white time.
      if(board[selected_position] >= 11 && board[selected_position] <= 16){ // The selected piece is white.
        if_select = 1;
        temp_position = selected_position;  // Temporarily store the selected position.
        selected_piece = board[selected_position]; // Store the selected piece.
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){  // it's black time.
      if(board[selected_position] >= 1 && board[selected_position] <= 6){ // The selected piece is black.
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{ // Piece is selected.
    if_select = 0;
    if(board[selected_position] == 100){  // The position is marked in green.
      move(); // To move to the selected position.
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){  // The position is marked in red.
      remove(); // Remove the piece from its position.
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){ // Green mark.
        board[i] = 0; // Remove the mark
      }
      if(board[i] >= 21 && board[i] <= 36){ // Red mark.
        board[i] -= 20; // Remove the mark
      }
    }
  }
  display_board();
}

function click_position1(){
  display_board();
  selected_position = 1;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position2(){
  display_board();
  selected_position = 2;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position3(){
  display_board();
  selected_position = 3;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position4(){
  display_board();
  selected_position = 4;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position5(){
  display_board();
  selected_position = 5;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position6(){
  display_board();
  selected_position = 6;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position7(){
  display_board();
  selected_position = 7;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position8(){
  display_board();
  selected_position = 8;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position9(){
  display_board();
  selected_position = 9;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position10(){
  display_board();
  selected_position = 10;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position11(){
  display_board();
  selected_position = 11;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position12(){
  display_board();
  selected_position = 12;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position13(){
  display_board();
  selected_position = 13;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position14(){
  display_board();
  selected_position = 14;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position15(){
  display_board();
  selected_position = 15;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position16(){
  display_board();
  selected_position = 16;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position17(){
  display_board();
  selected_position = 17;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position18(){
  display_board();
  selected_position = 18;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position19(){
  display_board();
  selected_position = 19;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position20(){
  display_board();
  selected_position = 20;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position21(){
  display_board();
  selected_position = 21;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position22(){
  display_board();
  selected_position = 22;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position23(){
  display_board();
  selected_position = 23;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position24(){
  display_board();
  selected_position = 24;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position25(){
  display_board();
  selected_position = 25;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position26(){
  display_board();
  selected_position = 26;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position27(){
  display_board();
  selected_position = 27;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position28(){
  display_board();
  selected_position = 28;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position29(){
  display_board();
  selected_position = 29;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position30(){
  display_board();
  selected_position = 30;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position31(){
  display_board();
  selected_position = 31;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position32(){
  display_board();
  selected_position = 32;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position33(){
  display_board();
  selected_position = 33;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position34(){
  display_board();
  selected_position = 34;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position35(){
  display_board();
  selected_position = 35;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position36(){
  display_board();
  selected_position = 36;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position37(){
  display_board();
  selected_position = 37;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position38(){
  display_board();
  selected_position = 38;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position39(){
  display_board();
  selected_position = 39;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position40(){
  display_board();
  selected_position = 40;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position41(){
  display_board();
  selected_position = 41;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position42(){
  display_board();
  selected_position = 42;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position43(){
  display_board();
  selected_position = 43;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position44(){
  display_board();
  selected_position = 44;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position45(){
  display_board();
  selected_position = 45;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position46(){
  display_board();
  selected_position = 46;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position47(){
  display_board();
  selected_position = 47;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position48(){
  display_board();
  selected_position = 48;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position49(){
  display_board();
  selected_position = 49;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position50(){
  display_board();
  selected_position = 50;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position51(){
  display_board();
  selected_position = 51;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position52(){
  display_board();
  selected_position = 52;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position53(){
  display_board();
  selected_position = 53;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position54(){
  display_board();
  selected_position = 54;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position55(){
  display_board();
  selected_position = 55;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position56(){
  display_board();
  selected_position = 56;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position57(){
  display_board();
  selected_position = 57;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position58(){
  display_board();
  selected_position = 58;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position59(){
  display_board();
  selected_position = 59;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position60(){
  display_board();
  selected_position = 60;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position61(){
  display_board();
  selected_position = 61;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position62(){
  display_board();
  selected_position = 62;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}

function click_position63(){
  display_board();
  selected_position = 63;
  if(if_select == 0){
    if(current_turn == turn_white){
      if(board[selected_position] >= 11 && board[selected_position] <= 16){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
    else if(current_turn == turn_black){
      if(board[selected_position] >= 1 && board[selected_position] <= 6){
        if_select = 1;
        temp_position = selected_position;
        selected_piece = board[selected_position];
        switch(selected_piece){
          case 1:black_pawn();break;
          case 2:rook();break;
          case 3:knight();break;
          case 4:bishop();break;
          case 5:queen();break;
          case 6:king();break;

          case 11:white_pawn();break;
          case 12:rook();break;
          case 13:knight();break;
          case 14:bishop();break;
          case 15:queen();break;
          case 16:king();break;

          default: break;
        }
      }
    }
  }
  else{
    if_select = 0;
    if(board[selected_position] == 100){
      move();
    }
    else if(board[selected_position] >= 21 && board[selected_position] <= 36){
      remove();
    }
    for(var i = 0; i < 64; i++){
      if(board[i] == 100){
        board[i] = 0;
      }
      if(board[i] >= 21 && board[i] <= 36){
        board[i] -= 20;
      }
    }
  }
  display_board();
}
