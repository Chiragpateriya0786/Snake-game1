let canvas=document.querySelector('canvas')
let pen=canvas.getContext('2d')
/* pen.fillRect(0,0,50,50)
pen.clearRect(10,10,50,50) */

/* shift method of array to remove starting index
arr.shift() */

let cellsize=50
let snakecell=[[0,0]]
let gameover=false
let boardW=1200
let boardH=550
let direction='right'
let count=0
/* genrate food */
let genrateFood = function(){
  return ([
    Math.round(Math.random()*(boardW - cellsize)/50)*50 ,
    Math.round(Math.random()*(boardH - cellsize)/50)*50
  ]
    )
}
 let foodCell=genrateFood()
 console.log(foodCell,"tr");

document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowUp'){
        direction='up'
    }
   else if(e.key==='ArrowDown'){
        direction='down'
    }
   else if(e.key==='ArrowLeft'){
        direction='left'
    }
   else {
        direction='right'
    }

})

/* creat new rectangle on new cordinate snake */
function draw (){
if(gameover===true){
  pen.fillStyle='red'
  pen.fillText('GAME OVER' ,120,120)
  clearInterval(id)
  return;
}

    pen.clearRect(0,0,1200,550)
  for(let cell of snakecell){
    pen.fillStyle='red'
    pen.fillRect(cell[0],cell[1],cellsize,cellsize)
  }
  pen.fillStyle='green'
  pen.fillRect(foodCell[0],foodCell[1],cellsize,cellsize)

  /* show score */
  pen.font='30px san-sarif'
  pen.fillStyle='white'
  pen.fillText(`score ${count}`,50,50)
}
/* to change value of cordinate */
function update(){
  
  let headX=  snakecell[snakecell.length-1][0]
   let headY= snakecell[snakecell.length-1][1]
   
   let newX
   let newY
   /* For changeing directions */
   if(direction==='right'){
    newX= headX + cellsize
    newY= headY
    if(newX===boardW){
      gameover=true
     }
   }
   else if(direction==='left'){
     newX= headX - cellsize
     newY= headY
     if(newX<0){
      gameover=true
     }
     
   }
   else if(direction==='up'){
       newX=headX
       newY=headY - cellsize
       if(newY<0){
        gameover=true
       }
   }
   else{
    newX=headX
    newY=headY+cellsize
    if(newY===boardH){
      gameover=true
    }
   }

   snakecell.push([newX,newY])
   if(newX==foodCell[0] && newY===foodCell[1]){
    foodCell=genrateFood()
    count++
   }
   else{
   snakecell.shift()
   }
}
// Check if the head of the snake overlaps with any body segment
function checkCollision() {
  let headX = snakecell[snakecell.length - 1][0];
  let headY = snakecell[snakecell.length - 1][1];

  for (let i = 0; i < snakecell.length - 1; i++) {
    if (headX === snakecell[i][0] && headY === snakecell[i][1]) {
      gameover = true;
      return;
    }
  }
}

/* call draw multiple time */

let id=setInterval(()=>{
  checkCollision()
  draw()
  update()
},200)



