$(function(){
    const board = $('.board');
    const boardWidth = board.width();
    const boardHeight = board.height();
    const step = 50;
    let coordinateX = 0;
    let coordinateY = 0;
    let numberRows = boardWidth/step+1;
    const numberPoints = numberRows*(boardHeight/step+1);
    let centerPointId = Math.floor(numberPoints/2);
    let centerPoint;
    let activePointsId = [-numberRows-1,-numberRows,-numberRows+1,-1,1,numberRows-1,numberRows,numberRows+1]

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

    function makeMove() {
        
        centerPoint.removeClass('center');
        $('.active').removeClass('active').off('click', makeMove);
        let newCenterPointId = Number($(this).attr('id'));
        setActivePoints(newCenterPointId)
    }

    function setActivePoints(id) {
       centerPoint = $('#'+id);
       centerPoint.addClass('center');
       for(let i=0;i<activePointsId.length;i++){
           let activePoint = $('#'+(id+activePointsId[i]));
           activePoint.addClass('active');
           activePoint.on('click', makeMove)
       }
    }
    creatPoints();
    setActivePoints(centerPointId);
})