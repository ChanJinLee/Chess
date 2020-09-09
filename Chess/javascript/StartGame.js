var piece = new Array(64);

function click_play(){
  document.getElementById('Play_Button').disabled = true;
  init_piece();
  display_piece();
}

function init_piece(){
  piece = [2,3,4,5,6,4,3,2,
          1,1,1,1,1,1,1,1,
          0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,
          11,11,11,11,11,11,11,11,
          12,13,14,16,15,14,13,12];
}

function display_piece(){
  for(var i = 0; i < 64; i++){
    var temp = document.getElementById('Position' + i);
    if(piece[i] != 0){
      var string = '<input id="Piece" type="image" src="./img/' + piece[i] + '.png" onclick="click_position' + i +'()">';
      temp.innerHTML=string;
    }
    else{
      temp.innerHTML=null;
    }
  }
}
