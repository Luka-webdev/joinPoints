$(function(){
    const board = $('.board');
    const boardWidth = board.width();
    const boardHeight = board.height();
    const step = 50;
    let coordinateX = 0;
    let coordinateY = 0;
    const numberPoints = (boardWidth/step+1)*(boardHeight/step+1);
    let centerPointId = Math.floor(numberPoints/2);;

    function creatPoints() {
        for(let i=0;i<numberPoints;i++){
            let point = $('<div></div>',{
                'class':'point',
                'id':i,
                css:{
                    'top':coordinateY-3,
                    'left':coordinateX-3
                }
            })
            board.append(point);
            if(coordinateX>=boardWidth){
                coordinateY+=step;
                coordinateX=0;
            }
            else if(coordinateX<boardWidth){
                coordinateX+=step;
            }
            
        }
    }

    function setActivePoints() {
       let centerPoint = $('#'+centerPointId);
       centerPoint.addClass('active')

       console.log(centerPointId,numberPoints,centerPoint)
    }
    creatPoints();
    setActivePoints();
})