let isBlack = true;  //紀錄是否為黑棋下

let reversi = {
    stones : [],  // 以0儲存無子 1為黑 2為白 6為待翻黑 7為待翻白 11新下的黑 12新下的白    //改成10x10的空間 最外圍一圈不顯示
    init : function(){ 
        //將所有格子填入0 
        for(let r = 0; r < 10; r ++){
            reversi.stones.push(Array(10));    //最外圍一圈也是
            for(let c = 0; c < 10; c ++){
                reversi.stones[r][c] = 0;
                ////console.log("load"+r+c);
            }
        }
        // 中間填入黑白
        reversi.stones[3+1][3+1] = 1;
        reversi.stones[4+1][4+1] = 1; 
        reversi.stones[3+1][4+1] = 2;
        reversi.stones[4+1][3+1] = 2;
        //更新棋盤
        reversi.filp();
        isBlack = true;
    },
    move : function(r,c){
        let rNow = r + 1;           //中心新下的那顆棋
        let cNow = c + 1;

        let isAround = false;       //周圍是否有棋
        let canMove = false;        //判斷這能不能下

        let cAround = 0;            
        let rAround = 0;    

        let rCheck = rNow;             //延伸檢查格子的r,c
        let cCheck = cNow;

        let stripHasDif = false;         //紀錄延伸檢查那條是否經過不同的棋
        let stripCanflip = false;        //紀錄延伸檢查那條是否可翻

        //0.沒有棋才能下
        if(reversi.stones[rNow][cNow] != 0){  
            console.log("there has a stone 值:"+reversi.stones[rNow][cNow]);
            return 0;
        }

        //1.把下的那格改成待翻
        if(isBlack){
            this.stones[rNow][cNow] = 11;  //黑的時間存新下黑
            //console.log("Black Time");
        }else{
            this.stones[rNow][cNow] = 12;  //白的時間存新下白
            //console.log("White Time");
        }
        console.log("r:"+rNow+"  c:"+ cNow+" NOW="+reversi.stones[rNow][cNow]);
        //2.繞周圍一圈
        for(let rInc = -1; rInc < 2; rInc ++){  
        for(let cInc = -1; cInc < 2; cInc ++){
            rAround = r + rInc + 1;                                 //周圍要檢查棋的r,c
            cAround = c + cInc + 1;  
            if(rAround == rNow && cAround == cNow){                 //中間下的那顆棋不檢查
                //console.log("中間不檢查")
                continue;
            }
            //console.log("r:"+rAround+"  c:"+ cAround+" 值="+reversi.stones[rAround][cAround]);

            //(2)檢查與自己不同的棋 => (有)向外延伸檢查,沿路改為待翻
            if(reversi.stones[rAround][cAround] != 0 &&             //周圍的那格有棋 且與自己不同
               reversi.stones[rNow][cNow]-10 != reversi.stones[rAround][cAround]){ 

                console.log("r:"+rAround+"  c:"+ cAround+" 值="+reversi.stones[rAround][cAround]);
                
                isAround = true;  //紀錄周圍有與自己不同的棋

                //同向向外延伸檢查開始
                for(let i = 0; i < 8; i ++){
                    rCheck += rInc;
                    cCheck += cInc;

                    // console.log("rAroundr:"+rAround+"  cAround:"+ cAround+" 值="+reversi.stones[rAround][cAround]);
                    console.log("rCheck:"+rCheck+"  cCheck:"+ cCheck+" 值="+reversi.stones[rCheck][cCheck]);
                    if(reversi.stones[rCheck][cCheck] == 0){
                        console.log("break  rCheck:"+rCheck+"  cCheck:"+ cCheck+" 值="+reversi.stones[rCheck][cCheck]);
                        console.log("rInc="+rInc+" cInc="+cInc);
                        break;
                    }
                    if(reversi.stones[rCheck][cCheck] != reversi.stones[rNow][cNow]-10){  
                        //如果與自己不同
                        console.log("不同   rCheck:"+rCheck+"  cCheck:"+ cCheck+" 值="+reversi.stones[rCheck][cCheck]);
                        stripHasDif = true;  //記錄起來
                        reversi.stones[rCheck][cCheck] += 5;  //將他列為待翻

                    }else{  
                        //如果與自己相同
                        console.log("同    rCheck:"+rCheck+"  cCheck:"+ cCheck+" 值="+reversi.stones[rCheck][cCheck]);
                        //console.log("canMove="+canMove);
                        if(stripHasDif){          //如果中間夾了不同 => 紀錄可翻
                            stripCanflip = true;
                            canMove = true;  
                        }
                        break;
                    } 
                    
                }   //延伸檢查結束

                if(stripCanflip){           // 如果這條可以翻
                    console.log("104 canflip");
                    reversi.filp();         //  翻
                }else{                      // 不能翻
                    this.canNotFlip();      //  改回來
                }

                stripHasDif = false;     //重設延伸檢查紀錄
                stripCanflip = false;
                
                rCheck = rNow;             //延伸檢查格子的r,c
                cCheck = cNow;
            }
        }}
        
        //(2)
        if(!isAround || !canMove){  //周圍沒有與自己不同的棋 => 把自己改回,結束
            console.log("不能下這 isAround="+isAround+" canMove="+canMove)
            reversi.stones[rNow][cNow] = 0;               // 改回無棋
        }else{
            if(isBlack){
                document.getElementById("stone"+r+c).style.backgroundColor = 'black';
                this.stones[rNow][cNow] = 1;  //黑的時間存新下黑
                isBlack = false;
            }else{
                document.getElementById("stone"+r+c).style.backgroundColor = 'white';
                this.stones[rNow][cNow] = 2;  //白的時間存新下白
                isBlack = true;
            }
        }

    },
    canNotFlip : function(){                                // 將棋盤上所有待翻的棋改回來
        for(let r = 1; r < 9; r ++){
            for(let c = 1; c < 9; c ++){ 
                if(reversi.stones[r][c] != 0){                  // 如果有棋
                    if(reversi.stones[r][c] > 5 && reversi.stones[r][c] < 10){// 如果他是待翻的
                        console.log("canNotFlip  r="+r+" c="+c);
                        reversi.stones[r][c] -= 5;              // 改回原本顏色
                    }
                }
            }
        }
    },
    //將棋盤上所有待翻的棋翻面 並更新HTML
    filp : function(){    
        let rBoard = 0;
        let cBoard = 0;  
        for(let r = 1; r < 9; r ++){
            for(let c = 1; c < 9; c ++){
                rBoard = r - 1;
                cBoard = c - 1;
                //如果為待翻白,黑棋 => 翻成黑棋
                if(reversi.stones[r][c] == 7 || reversi.stones[r][c] == 1){
                    //黑棋顯示到html上
                    document.getElementById("stone"+rBoard+cBoard).style.backgroundColor = 'black';
                    reversi.stones[r][c] = 1;               //改回正常紀錄
                //如果為待翻黑,白棋 => 翻成白棋
                }else if(reversi.stones[r][c] == 6 || reversi.stones[r][c] == 2){

                    //白棋顯示到html上
                    document.getElementById("stone"+rBoard+cBoard).style.backgroundColor = 'white';
                    reversi.stones[r][c] = 2;               //改回正常紀錄

                }else if(reversi.stones[r][c] == 0){  
                    //無棋顯示到html上
                    document.getElementById("stone"+rBoard+cBoard).style.backgroundColor = 'rgb(182, 230, 200)';
                }
            }
        }
    },
    notValibleMove : function(){

    }
}

function init(){
    reversi.init();
}

function stoneOnclick(r,c){
    ////console.log(r + " " + c);
    reversi.move(r,c);
}

            // if(isValiable != 18){ //不可以翻
            //     // 改回來
            //     this.canNotFlip();
            //     reversi.notValibleMove();  //呼叫notValible動畫
            // }else{
            //     reversi.filp();
            // }

            // if(reversi.stones[rCheck][cCheck] != 0 &&  //如果延伸有棋且不＝下的
                    //    reversi.stones[rCheck][cCheck] != reversi.stones[rNow][cNow]-10){ 
                    //     reversi.stones[rCheck][cCheck] += 5;  //將那顆列為待翻
                    //     isValiable = 6;  //設為6 ＝> 先同後不同＝6 先不同後同＝18
                    //     //console.log("isValiable=" + isValiable);
                    // }else{  //如果相同  or  沒有棋              
                    //     isValiable = isValiable * 3;
                    //     //console.log("isValiable=" + isValiable);
                    //     break;  //跳出迴圈
                    // }


            //延伸檢查到沒棋 (開始)
                // while(reversi.stones[rCheck][cCheck] != 0){  
                //     console.log("rCheck="+rCheck+" cCheck="+cCheck+" stones="+reversi.stones[rCheck][cCheck]);
                //     if(reversi.stones[rCheck][cCheck] != reversi.stones[rNow][cNow]-10){  //如果與自己不同
                        
                //         hasDif = true;
                //         reversi.stones[rCheck][cCheck] += 5;  //將他列為待翻

                //     }else{  //如果與自己相同
                //         if(stripHasDif){
                //             stripCanflip = true;  //如果中間夾了不同 => 紀錄可翻
                //         }
                //         break;
                //     }
                //     rInc2 = rInc + rInc;      //增加延伸檢查增加量
                //     cInc2 = cInc + cInc;
                    
                //     rCheck = rNow + rInc2;      //設定延伸檢查格子的r,c
                //     cCheck = cNow + cInc2;

                    
                // }  //延伸檢查結束
