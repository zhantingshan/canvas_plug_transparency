// JavaScript Document
  function getStyle(ele){
	  var style=null;
	  if(window.getComputedStyle){
		  
		  style=window.getComputedStyle(ele,null);
		  	  
		  }else{
			  
		  style=ele.currentStyle;  
			  
			  }
	  return style;
	  
	  }

  var index=1;
  function slide(){
			  var bottom=document.getElementById("bottom");
			  var slider=document.getElementsByClassName("slide")[0];
			  //同一个对象不能被appand多次，多次等于添加一次
			  var bottom_clone=bottom.cloneNode(true);			  
              slider.appendChild(bottom_clone);
			  
			  bottom_clone=bottom_clone.cloneNode(true);			  
			  slider.appendChild(bottom_clone);
			  
			  bottom_clone=bottom_clone.cloneNode(true);
			  slider.appendChild(bottom_clone);
			  
			  bottom_clone=bottom_clone.cloneNode(true);
			  slider.appendChild(bottom_clone);
			  
			  var cover1=slider.children[1];
			  var cover2=slider.children[2];
			  var cover3=slider.children[3];
			  var cover4=slider.children[4];
			  
			  cover1.className="cover1";
			  cover2.className="cover2";
			  cover3.className="cover3";
			  cover4.className="cover4";
			  
			  
			  
			  
			  index+=1;
			  if(index>5){index=1} ;
			  bottom.style.backgroundImage="url(../myblog/image/bucky/"+index+".jpg)";
			  
			  setTimeout(del_cover,2500);
			  
			  function del_cover(){
				  
				  
				  slider.removeChild(cover1);
				  slider.removeChild(cover2);
				  slider.removeChild(cover3);
				  slider.removeChild(cover4);
				  
				  }
			  
			  }
			  
			  setInterval(slide,5000);
