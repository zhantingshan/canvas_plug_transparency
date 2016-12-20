// JavaScript Document
 var imageCanvas;  
   var maskCanvas;  
   var imageContext;  
   var maskContext;  
   var frameCount=0;  
   var nextFrames=0;  
   var maskX=225;  
   var maskY=160;  
   var maskSpeedX=0;  
   var maskSpeedY=0;  
   var MASK_R=25;
   var mask_bgcolor='rgba(139,139,122,0.8)';
   
    /*??有时CANVAS_WIDTH！=document.getElementsByClassName('head')[0].clientWidth；
     i don't know why,是因为body没设overflow:hidden;？*/
   var CANVAS_WIDTH=document.getElementsByClassName('head')[0].clientWidth;
   var head_height=document.getElementsByClassName('head')[0].clientHeight;
   var CANVAS_HEIGHT=head_height;  
   var word_speed=1;
   var speed=1;
   var word_size=16;
   var jump_hight=10;
   var jumpx;
   var jumpy;
   var wordx=0;
   var wordy=225;
   var word_angle;
   var word_flag=0;//0-up,1-dowm
   var stop_flag=0;
   
   //此参数不能用，原因ditto，直接用document.getElementsByClassName('head')[0].clientWidth*4可行
   var max_wordx=CANVAS_WIDTH*4;
   var timer1;
   var timer2;
   
   var menu_speed=35;//菜单线速度
   var menu1x=document.getElementsByClassName('head')[0].clientWidth;
   var menu1y=50;
   var menu1_long=menu1x+150;
   var menu_flag=0;
   
   var menu2x=100;
   var menu2y=head_height;
   var menu2_long=menu2y+10;

            function pageInit(){  		
            
                //创建图片canvas标签  
                maskCanvas=document.createElement("canvas");  
                maskCanvas.width=CANVAS_WIDTH;  
                maskCanvas.height=CANVAS_HEIGHT;  
                document.getElementsByClassName('head')[0].appendChild(maskCanvas);  
                maskCanvas.style.position="relative";  
                maskContext=maskCanvas.getContext("2d");    
                timer1 =setInterval(moveMask,20);  
            }  
   
   
            function moveMask(){  
                //在给定矩形内清空一个矩形,清空原来的can：
                maskContext.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);  
                //下面覆盖上面
                maskContext.globalCompositeOperation="source-over";  
                maskContext.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);  
                //上面覆盖下面
                maskContext.globalCompositeOperation="destination-out"; 
                //设置填充色
                maskContext.fillStyle=mask_bgcolor;
                //执行填充 
                maskContext.fill(); 
                //重置当前的路径
                maskContext.font = 'bold '+word_size+'px arial';
                maskContext.textAlign = 'left';
                maskContext.textBaseline = 'top';
                //写文字w3school.com.cn ，坐标10,90
                maskContext.fillText("ZTS.blog",wordx,wordy);
                               
                jump();
              
                
          function jump(){			 
             
             //字体最大为145
             word_size+=1.2;
             if(word_size>=150){
                 word_size=150;
             }
             
             
             //0-up,1-dowm
             if(!word_flag){
                 jump_up();
                 
                 }else{
                     
                 jump_down(); 
                     
                     }
             
             
             
             function jump_up(){
                 //上移角度约55度
                 word_angle=0.3*Math.PI;
                 //加速度，在顶时为1，在底到达最大然后开始减
                 speed-=0.001;
                 //原移动距离减去加速度，向上要减速
                 word_speed+=speed;
                 
                 //文字移动的距离
                jumpx=Math.cos(word_angle) * word_speed;
                jumpy=Math.sin(word_angle) * word_speed;
                             
                 //文字加上移动的距离
                 wordx+=jumpx;
                 wordy=wordy-jumpy; 
                 
                                      
                 }
              
              function jump_down(){
                  //下移角度约20度
                  word_angle=0.1*Math.PI;
                  speed+=0.01;
                 //原移动距离减去加速度，向下要加速 
                 word_speed+=speed; 
                 
                 //文字移动的距离
                 jumpy=Math.cos(word_angle) * word_speed;
                 jumpx=Math.sin(word_angle) * word_speed;
                 
                 //文字减去移动的距离 
                 wordx+=jumpx;
                 wordy+=jumpy; 
                 
                 
                
                                 
                 }
              
              
              if(wordy<=jump_hight)
              {  	
                  word_flag=1;      
                  
               }
               
               //设置字体底部位置
               if(wordy+word_size>=head_height)
              {  
                 //保证跳动不超底
                 wordy=head_height-word_size;	
                 word_flag=0;
                 //每次所跳最高点降低
                 jump_hight+=8;
                 //速度重置			                 
                 speed=1;
                 
                  
                              
               }
               
               //设置字体的停止位置
              if(wordx>=document.getElementsByClassName('head')[0].clientWidth*0.55 && stop_flag==0){	
                     wordx=document.getElementsByClassName('head')[0].clientWidth*0.55-1;
                     wordy=head_height-word_size;
                     clearInterval(timer1);
					 stop_flag=1;
                     moveMask();
					 //以防无限循环
					 
					 timer2 =setInterval(menu,20);  
                } 
              
              
              }
              
			  
			//菜单线    
            function menu(){
				    
					//menu1画到顶时停止
                   if(menu1x<=0&&menu_flag==0){
							menu1x=0;
							//menu1完成标识
							menu_flag=1;
							//需在再执行一次，才能到顶；
							menu1_move();
							//菜单选项弹出
							list_move();
							}
							
					//menu2画到顶时停止，并终止interval	
				   if(menu2y<=0){
					        //使menu2y不超过顶，不过超了好像也没什么
							menu2y=0;
							clearInterval(timer2);
							
							}
                    
					if(menu_flag==0){
                        menu1_move();                    
                    }else if(menu_flag==1){
						menu2_move();
																		
						} 
					
					
					
					function menu1_move(){
					maskContext.beginPath();
                    maskContext.lineWidth=6;
                    maskContext.moveTo(menu1x,menu1y);
                    maskContext.lineTo(menu1_long,menu1y);
                    maskContext.stroke();					
					                  					
                    menu1x=menu1x-menu_speed;							
						}
						
					function menu2_move(){
					maskContext.beginPath();
                    maskContext.lineWidth=6;
                    maskContext.moveTo(menu2x,menu2y);
                    maskContext.lineTo(menu2x,menu2_long);
                    maskContext.stroke();					
					                  					
                    menu2y=menu2y-menu_speed;							
						}	
					
					                                     
                    }	
					
					 function list_move(){
				        var list=document.getElementById("menu");
						/*1.animation-fill-mode 设定动画完成后的状态，默认是none 设为forwards 就可以在动画完成后定格在动画最后一帧;ie用不了；
						2.*/
						list.innerHTML="#list1{animation: mymove 0.5s 1; -webkit-animation: mymove 0.5s; animation-fill-mode:forwards;} #list2{animation: mymove 0.5s; -webkit-animation: mymove 0.5s 1; animation-delay:0.5s;-webkit-animation-delay:0.5s;animation-fill-mode:forwards; }#list3{animation: mymove 0.5s 1; -webkit-animation: mymove 0.5s; animation-delay:1s;-webkit-animation-delay:1s; animation-fill-mode:forwards;}#list4{animation: mymove 0.5s 1; -webkit-animation: mymove 0.5s; animation-delay:1.5s;-webkit-animation-delay:1.5s;animation-fill-mode:forwards;}@keyframes mymove { from {left:2000px;}to {left:0;} } @-webkit-keyframes mymove /*Safari and Chrome*/ {from {left:2000px;}to {left:0;}}";
									
						}
                 
            }  
          pageInit();
         
          