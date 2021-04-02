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
    let activePointsId = [-numberRows-1,-numberRows,-numberRows+1,-1,1,numberRows-1,numberRows,numberRows+1];

    // Add canvas

    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d');
    canvas.width = boardWidth;
    canvas.height = boardHeight;

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
        
        let centerX = parseInt(centerPoint.css('left'));
        let centerY = parseInt(centerPoint.css('top'));
        centerPoint.removeClass('center');
        $('.active').removeClass('active').off('click', makeMove);
        let newCenterPointId = Number($(this).attr('id'));
        let moveX = parseInt($('#'+newCenterPointId).css('left'));
        let moveY = parseInt($('#'+newCenterPointId).css('top'));
        drawMove(centerX,centerY,moveX,moveY);
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

    function drawMove(centerX,centerY,moveX,moveY) {
        ctx.beginPath();
        ctx.moveTo(centerX,centerY);
        ctx.lineTo(moveX,moveY);
        ctx.lineWidth = 6;
        ctx.strokeStyle = "darkgreen";
        ctx.stroke();
    }

    creatPoints();
    setActivePoints(centerPointId);
})