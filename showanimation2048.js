function showNumberWithAnimation(i,j,number){
  var $theNumberCell = $("#number-cell-"+i+"-"+j);
  $theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
  $theNumberCell.css("color",getNumberColor(board[i][j]));
  $theNumberCell.text(board[i][j]);
  $theNumberCell.animate({
    width:cellSideLength,
    height:cellSideLength,
    top:getPosTop(i,j),
    left:getPosLeft(i,j)
  },50);
}
function showMoveAnimation(fromx,formy,tox,toy){
  var $theNumberCell = $("#number-cell-"+fromx+"-"+formy);
  $theNumberCell.animate({
    top:getPosTop(tox,toy),
    left:getPosLeft(tox,toy)
  },200);
}
function updateScore(score){
  $("#score").text(score);
}
