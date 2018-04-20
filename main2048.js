var board = new Array();
var score = 0;
//初始化表示每个格子是否叠加过的二维数组
var hasConflicted = new Array();
//开始触控的坐标值
var startx = 0;
var starty = 0;
//结束触控的坐标值
var endx = 0;
var endy = 0;

$(document).ready(function(){
  prepareForMobile();
  newgame();
});

function prepareForMobile(){
  if(documentWidth > 500){//如果屏幕宽度大于500像素，表明此时为桌面端，则使用固定数值
    gridContainerWidth = 500;
    cellSpace = 20;
    cellSideLength = 100;
  }
  $("#grid-container").css("width",gridContainerWidth-2*cellSpace);
  $("#grid-container").css("height",gridContainerWidth-2*cellSpace);
  $("#grid-container").css("padding",cellSpace);
  $("#grid-container").css("border-radius",0.02*gridContainerWidth);
  $(".grid-cell").css("width",cellSideLength);
  $(".grid-cell").css("height",cellSideLength);
  $(".grid-cell").css("border-radius",0.02*cellSideLength);
}

function newgame(){
  //初始化棋盘格
  init();
  //在随机两个格子生成数字
  generateOneNumber();
  generateOneNumber();
}

function init(){
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      var $gridCell = $("#grid-cell-"+i+"-"+j);
      $gridCell.css("top",getPosTop(i,j));
      $gridCell.css("left",getPosLeft(i,j));
    }
  }
  for(var i=0;i<4;i++){
    //设置board为二维数组
    board[i] = new Array();
    //设置hasConflicted为二维数组
    hasConflicted[i] = new Array();
    for(var j=0;j<4;j++){
      //初始化设置数组中所有的值均为0
      board[i][j] = 0;
      //初始化设置数组中所有的值均为false,表示刚开始每个格子都没叠加过
      hasConflicted[i][j] = false;
    }
  }
  updateBoardView();
  score = 0;
  updateScore(score);
}

function updateBoardView(){
  //创建储存数字格的仓库
  var fragment = document.createDocumentFragment();
  //将DOM元素转化为Jquery元素
  var $fragment = $(fragment);
  //将之前存在的数字格去除
  $(".number-cell").remove();
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      // $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
      //创建当前数字格
      var $numberCell = $('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
      // var theNumberCell = $("#number-cell-"+i+"-"+j);
      //如果数字格值为0则不显示，为其他数字则以特殊格式显示
      if(board[i][j] === 0){
        $numberCell.css("width","0px");
        $numberCell.css("height","0px");
        $numberCell.css("top",getPosTop(i,j)+cellSideLength/2);
        $numberCell.css("left",getPosLeft(i,j)+cellSideLength/2);
      }else{
        $numberCell.css("width",cellSideLength);
        $numberCell.css("height",cellSideLength);
        $numberCell.css("top",getPosTop(i,j));
        $numberCell.css("left",getPosLeft(i,j));
        //根据当前数字格的值设置背景颜色
        $numberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
        //根据当前数字格的值设置字体颜色
        $numberCell.css("color",getNumberColor(board[i][j]));
        //将当前格子内容设置为相应的数字
        $numberCell.text(board[i][j]);
      }
      $fragment.append($numberCell);
      //每次更新棋盘后要将每个格子还原为未叠加的状态
      hasConflicted[i][j] = false;
    }
  }
  $("#grid-container").append($fragment);
  $(".number-cell").css("line-height",cellSideLength+"px");
  $(".number-cell").css("font-size",0.4*cellSideLength+"px");
  $(".number-cell").css("border-radius",0.02*cellSideLength);
}

function generateOneNumber(){
  if(nospace(board)){
    return false;
  }else{
    //随机一个位置
   var randx = parseInt(Math.floor(Math.random()*4));//产生0-4之间的随机整数
   var randy = parseInt(Math.floor(Math.random()*4));
   var times = 0;//设置允许计算机尝试产生随机数的次数
   while (times < 50) {
     //如果当前的随机坐标在数组中为空,则返回该坐标,否则继续产生随机数
     if(board[randx][randy] == 0){
       break;
     }
     randx = parseInt(Math.floor(Math.random()*4));
     randy = parseInt(Math.floor(Math.random()*4));
     times++;
   }
   //如果在允许次数内没有产生成功的坐标,则手动查找成功的坐标
   if(times === 50){
     for(var i=0;i<4;i++){
       for(var j=0;j<4;j++){
         if(board[i][j] == 0){
           randx = i;
           randy = j;
         }
       }
     }
   }
    //随机一个数字
    //以五五开的概率随机产生2或4(Math.random()产生0-1但不包括1的随机数，所以产生2的概率还是大于4的概率)
   var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
  }
  return true;
}
$(document).keydown(function(e){
  switch(e.keyCode){
    //每次按键后要产生一个新的数字，并且要判断游戏是否结束
    case 37://left
    e.preventDefault();
    if(moveLeft()){
      setTimeout("generateOneNumber()",210);
      setTimeout("isgameover()",300);
    }
    break;
    case 38://up
    e.preventDefault();
    if(moveUp()){
      setTimeout("generateOneNumber()",210);
      setTimeout("isgameover()",300);
    }
    break;
    case 39://right
    e.preventDefault();
    if(moveRight()){
      setTimeout("generateOneNumber()",210);
      setTimeout("isgameover()",300);
    }
    break;
    case 40://down
    e.preventDefault();
    if(moveDown()){
      setTimeout("generateOneNumber()",210);
      setTimeout("isgameover()",300);
    }
    break;
  }
})
document.addEventListener("touchstart",function(e){
  startx = e.touches[0].pageX;
  starty = e.touches[0].pageY;
})
document.addEventListener("touchend",function(e){
  endx = e.changedTouches[0].pageX;
  endy = e.changedTouches[0].pageY;
  var deltax = endx - startx;
  var deltay = endy - starty;
  //如果此时移动距离过小说明用户只是点击，则不执行移动操作
  if( Math.abs( deltax ) < 0.3*documentWidth && Math.abs( deltay ) < 0.3*documentWidth ){
      return;
  }
  //在x轴方向移动
  if(Math.abs(deltax) >= Math.abs(deltay)){
    //move right
    if(deltax > 0){
      if(moveRight()){
        setTimeout("generateOneNumber()",210);
        setTimeout("isgameover()",300);
      }
    }else{
      //move left
      if(moveLeft()){
        setTimeout("generateOneNumber()",210);
        setTimeout("isgameover()",300);
      }
    }
  }else{//在y轴方向移动
    //move down
    if(deltay > 0){
      if(moveDown()){
        setTimeout("generateOneNumber()",210);
        setTimeout("isgameover()",300);
      }
    }else{
      //move up
      if(moveUp()){
        setTimeout("generateOneNumber()",210);
        setTimeout("isgameover()",300);
      }
    }
  }
})
function isgameover(){
  if(nospace(board) && nomove(board)){
    gameover();
  }
}
function gameover(){
  alert("gameover");
}
function moveLeft(){
  if(!canMoveLeft(board)){
    return false;
  }else{
    for(var i=0;i<4;i++){
      for(var j=1;j<4;j++){
        if(board[i][j] != 0){
          //遍历该格子左侧所有格子
          for(var k=0;k<j;k++){
            //当左侧有格子为0并且两者之间没障碍时可以移动
            if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
              //move
              showMoveAnimation(i,j,i,k);
              board[i][k] = board[i][j];
              board[i][j] = 0;
              continue;
            }
            //当左侧有格子与该格子相等且两者之间没障碍且左侧格子没有发生过叠加时可以移动
            else if(board[i][j] == board[i][k] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
              //move
              showMoveAnimation(i,j,i,k);
              //add
              board[i][k] += board[i][j];
              board[i][j] = 0;
              //add score
              score += board[i][k];
              updateScore(score);
              hasConflicted[i][k] = true;
              continue;
            }
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}
function moveUp(){
  if(!canMoveUp(board)){
    return false;
  }else{
    for(var i=1;i<4;i++){
      for(var j=0;j<4;j++){
        if(board[i][j] != 0){
          //遍历该格子上侧所有格子
          for(var k=0;k<i;k++){
            //当上侧有格子为0并且两者之间没障碍时可以移动
            if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
              //move
              showMoveAnimation(i,j,k,j);
              board[k][j] = board[i][j];
              board[i][j] = 0;
              continue;
            }
            //当上侧有格子与该格子相等且两者之间没障碍且上侧格子没有发生过叠加时可以移动
            else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
              //move
              showMoveAnimation(i,j,k,j);
              //add
              board[k][j] += board[i][j];
              board[i][j] = 0;
              //add score
              score += board[k][j];
              updateScore(score);
              hasConflicted[k][j] = true;
              continue;
            }
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}
function moveRight(){
  if(!canMoveRight(board)){
    return false;
  }else{
    for(var i=0;i<4;i++){
      for(var j=0;j<3;j++){
        if(board[i][j] != 0){
          //遍历该格子右侧所有格子
          for(var k=3;k>j;k--){
            //当右侧有格子为0并且两者之间没障碍时可以移动
            if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
              //move
              showMoveAnimation(i,j,i,k);
              board[i][k] = board[i][j];
              board[i][j] = 0;
              continue;
            }
            //当右侧有格子与该格子相等且两者之间没障碍且右侧格子没有发生过叠加时可以移动
            else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
              //move
              showMoveAnimation(i,j,i,k);
              //add
              board[i][k] += board[i][j];
              board[i][j] = 0;
              //add score
              score += board[i][k];
              updateScore(score);
              hasConflicted[i][k] = true;
              continue;
            }
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}
function moveDown(){
  if(!canMoveDown(board)){
    return false;
  }else{
    for(var i=0;i<3;i++){
      for(var j=0;j<4;j++){
        if(board[i][j] != 0){
          //遍历该格子下侧所有格子
          for(var k=3;k>i;k--){
            //当下侧有格子为0并且两者之间没障碍时可以移动
            if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
              //move
              showMoveAnimation(i,j,k,j);
              board[k][j] = board[i][j];
              board[i][j] = 0;
              continue;
            }
            //当下侧有格子与该格子相等且两者之间没障碍且下侧格子没有发生过叠加时可以移动
            else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
              //move
              showMoveAnimation(i,j,k,j);
              //add
              board[k][j] += board[i][j];
              board[i][j] = 0;
              //add score
              score += board[k][j];
              updateScore(score);
              hasConflicted[k][j] = true;
              continue;
            }
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}
