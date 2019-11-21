let cNum=5;
let iter=50000;
let speed=100;
let r;
let color_mode="color_black";

let runtime=false;
let points=0;

let curr_p=new Point(0,0);
let corners;


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
  noFill();
  stroke(255);

  make_corners();

  loadPixels();

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
    set(curr_p.x,curr_p.y,choose_color(map(c,0,cNum,0,255)));
    points++;
    if(points>iter) {runtime=false;}
    }
    updatePixels();
  }else if(points<iter){
    make_background();
    draw_corners();
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
    stroke(choose_color(map(i,0,cNum,0,255)));
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

function make_background()
{
  if(color_mode=="white_black" || color_mode=="color_black")
  { background(0);
  }else 
  { background(255);
  }
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

function help()
{
  textFont("Courier New",13);
  //fill(120,255,255);
  text('SPACE   -> start/stop', 10, 30);
  text('DOWN/UP -> less/more corners', 10, 50);
  text('Shift   -> change color mode', 10, 70);
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
      } 
    }
  if(keyCode===DOWN_ARROW) 
    {
      if(cNum>3)
        {
          cNum--;
          make_corners();
          runtime=false;
          points=0;
        }
    }
    if(keyCode===UP_ARROW) 
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
}
