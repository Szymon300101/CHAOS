let cNum=5;
let dens=0.15;
let iter=1;
let speed=100;
let r;
let color_mode="color_black";

let runtime=false;
let points=0;

let curr_p=new Point(0,0);
let corners;

let scale=1;
let border=new Point(0,0);

let show_dens=false;

function Point(x,y)
{
  this.x=x;
  this.y=y;
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(1000);
  colorMode(HSB,255);
  background(0);

  r=height/2-20;
  noStroke();
  loadPixels();

  make_corners();

  curr_p.x=random(0,width);
  curr_p.y=random(0,height);
}

function draw() {
  if(runtime)
  {
    for(let i=0;i<speed;i++)
    {
    let c=int(random(0,cNum));
    curr_p.x=corners[c].x+(curr_p.x-corners[c].x)/2;
    curr_p.y=corners[c].y+(curr_p.y-corners[c].y)/2;
    if(curr_p.x>border.x && curr_p.x<border.x+(width/scale) && curr_p.y>border.y && curr_p.y<border.y+(height/scale))
    {
      set((curr_p.x-border.x)*scale,(curr_p.y-border.y)*scale,choose_color(map(c,0,cNum,0,255)));
    }
    points++;
    if(points>iter) {runtime=false;}
    }
    updatePixels();
    if(show_dens)
    {
      dens_bar();
    }
  }else if(points<iter){
    make_background();
    draw_corners();
    draw_border();
    dens_bar();
    help();
  }
}

function make_corners()
{
  corners=new Array();
  let angle=-PI/2;
  for(let i=0;i<cNum;i++)
  {
    let x=width/2+cos(angle)*r;
    let y=height/2+sin(angle)*r;
    corners.push(new Point(x,y));
    fill(choose_color(map(i,0,cNum,0,255)));
    ellipse(corners[i].x,corners[i].y,5,5);
    angle+=2*PI/cNum;
  }
}

function draw_corners()
{
  for(let i=0;i<cNum;i++)
  {
    fill(choose_color(map(i,0,cNum,0,255)));
    noStroke();
    ellipse(corners[i].x,corners[i].y,5,5);
  }
}

function draw_border()
{
  if(scale!=1)
  {
  noFill();
  stroke(50,255,255);
  border.x=winMouseX-(width/scale)/2;
  border.y=winMouseY-(height/scale)/2;
  rect(border.x,border.y,width/scale,height/scale);
  }else
  {
    border.x=0;
    border.y=0;
  }
}

function dens_bar()
{
  if(points>iter) return;
  noStroke();
  if(runtime)
  {
    let curr_dens=points/poligon_area(cNum,r);
    fill(255, 206,206);
    rect(width-40,30+(0.5-curr_dens)/0.5*(height-60)/3,10,(1-(0.5-curr_dens)/0.5)*(height-60)/3);
    fill(136, 206,206,80);
  }else{
    fill(136, 206,206);
  } 
  rect(width-40,30+(0.5-dens)/0.5*(height-60)/3,10,(1-(0.5-dens)/0.5)*(height-60)/3);
  stroke(0, 0, 128);
  noFill();
  rect(width-40,30,10,(height-60)/3);
}

function choose_color(hue)
{
  if(color_mode=="color_white" || color_mode=="color_black")
      {
        return color(hue,255,255);
      }else if(color_mode=="white_black")
      {
        return color(255);
      }else if(color_mode=="black_white")
      {
        return color(0);
      } 
}

function make_background()
{
  if(color_mode=="white_black" || color_mode=="color_black")
  { background(0);
  }else 
  { background(255);
  }
}

function poligon_area(n,R)
{
  return n*pow(R,2)*sin(2*PI/n)/2;
}

function help()
{
  fill(0,0,128);
  noStroke();
  textFont("Courier New",13);
  text('SPACE         -> start/stop', 10, 30);
  text('DOWN/UP       -> change max dens. of points', 10, 50);
  text('LEFT/RIGHT    -> less/more corners', 10, 70);
  text('Shift         -> change color mode', 10, 90);
  text('Scroll/Mouse  -> set zoom', 10, 110);
  text('\'D\'           -> show/hide progress', 10, 130);
}




function keyPressed()
{
  console.log(keyCode);
  if(keyCode===32) //SPACE
    {
      if(runtime || points>iter)
      {
        runtime=false;
        points=0;
      }else
      {
        runtime=true;
        make_background();
        iter=dens*poligon_area(cNum,r);
        show_dens=false;
      } 
    }
  if(keyCode===LEFT_ARROW) 
    {
      if(cNum>3)
        {
          cNum--;
          make_corners();
          runtime=false;
          points=0;
        }
    }
    if(keyCode===RIGHT_ARROW) 
    {
      if(cNum<10)
        {
          cNum++;
          make_corners();
          runtime=false;
          points=0;
        }
    }
    if(keyCode==SHIFT) 
    {
      if(color_mode=="color_black")
        { color_mode="white_black"; }
      else if(color_mode=="white_black")
        { color_mode="color_white"; }
      else if(color_mode=="color_white")
        { color_mode="black_white"; }
      else if(color_mode=="black_white")
        { color_mode="color_black"; }

      make_corners();
      runtime=false;
      points=0;
    }
    if(keyCode===DOWN_ARROW) 
    {
      if(points==0)
      if(dens>0.02) dens-=0.02;
    }
    if(keyCode===UP_ARROW) 
    {
      if(points==0)
      dens=min(0.5,dens+0.02);
    }
    if(keyCode===68)   //d
    {
      show_dens=!show_dens;
    }
}

function mouseWheel(event) {
  if(points>0) return 0;
  if(scale-sign(event.delta)>=1) scale-=sign(event.delta);
  console.log(scale);
}

function sign(a)
{
  if(a>0) return 1;
  if(a<0) return -1;
  if(a==0) return 0;
}
