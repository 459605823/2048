var documentWidth = window.screen.availWidth;//获取屏幕宽度
var gridContainerWidth = 0.92*documentWidth;//设置棋盘格总宽度为屏幕宽度的92%
var cellSideLength = 0.18*documentWidth;//设置每个小格宽度为屏幕宽度的18%
var cellSpace = 0.04*documentWidth;//设置小格间隙为屏幕宽度的4%
function getPosTop(i,j){//获取top值
  return cellSpace+i*(cellSpace+cellSideLength);
}
function getPosLeft(i,j){//获取left值
  return cellSpace+j*(cellSpace+cellSideLength);
}
function getNumberBackgroundColor(number){//根据传入数字不同返回不同背景颜色
  switch(number){
    case 2:return "#eee4da";break;
    case 4:return "#ede0c8";break;
    case 8:return "#f2b179";break;
    case 16:return "#f59563";break;
    case 32:return "#f67c5f";break;
    case 64:return "#f65e3b";break;
    case 128:return "#edcf72";break;
    case 256:return "#edcc61";break;
    case 512:return "#9c0";break;
    case 1024:return "#33b5e5";break;
    case 2048:return "#09c";break;
    case 4096:return "#a6c";break;
    case 8192:return "#93c";break;
  }
  return "black";
}
function getNumberColor(number){//根据传入数字不同返回不同字体颜色
  if(number <= 4){
    return "#776e65";
  }
  return "white";
}
function nospace(board){//检测棋盘中是否还有空余格子
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      if(board[i][j] === 0){
        return false;
      }
    }
  }
  return true;
}
function canMoveLeft(board){//判断是否可以向左移动
  for(var i=0;i<4;i++){
    //最左侧一列不用遍历，只用遍历右侧12个格子
    for(var j=1;j<4;j++){
      if(board[i][j] != 0){
        //当该格子左侧的格子为0或左侧的格子与该格子相等时可以向左移动
        if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
          return true;
        }
      }
    }
  }
  return false;
}
function canMoveUp(board){//判断是否可以向上移动
  for(var i=1;i<4;i++){
    //最上侧一行不用遍历，只用遍历下面12个格子
    for(var j=0;j<4;j++){
      if(board[i][j] != 0){
        //当该格子上侧的格子为0或上侧的格子与该格子相等时可以向上移动
        if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
          return true;
        }
      }
    }
  }
  return false;
}
function canMoveRight(board){//判断是否可以向右移动
  for(var i=0;i<4;i++){
    //最右侧一列不用遍历，只用遍历左侧12个格子
    for(var j=0;j<3;j++){
      if(board[i][j] != 0){
        //当该格子右侧的格子为0或右侧的格子与该格子相等时可以向右移动
        if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
          return true;
        }
      }
    }
  }
  return false;
}
function canMoveDown(board){//判断是否可以向下移动
  for(var i=0;i<3;i++){
    //最下面一行不用遍历，只用遍历上面12个格子
    for(var j=0;j<4;j++){
      if(board[i][j] != 0){
        //当该格子下侧的格子为0或下侧的格子与该格子相等时可以向下移动
        if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
          return true;
        }
      }
    }
  }
  return false;
}
function noBlockHorizontal(row,col1,col2,board){//判断水平方向之间是否没有障碍物
  //遍历当前格子与另一个格子之间的所有格子,如果之间某个格子有值,则存在障碍物
  for(var i=col1+1;i<col2;i++){
    if(board[row][i] != 0){
      return false;
    }
  }
  return true;
}
function noBlockVertical(col,row1,row2,board){//判断竖直方向之间是否没有障碍物
 for(var i=row1+1;i<row2;i++){
   if(board[i][col] != 0){
     return false;
   }
 }
  return true;
}
function nomove(board){
  if(canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board)){
    return false;
  }else{
    return true;
  }
}
