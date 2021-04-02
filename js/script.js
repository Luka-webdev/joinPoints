$(function(){
    const board = $('.board');
    const boardWidth = board.width();
    const boardHeight = board.height();
    let step = 50;
    let shift = 3;
    let coordinateX = 0;
    let coordinateY = 0;
    let numberRows = boardWidth/step+1;
    const numberPoints = numberRows*(boardHeight/step+1);
    let centerPointId = Math.floor(numberPoints/2);
    let centerPoint;
    let activePointsId = [-numberRows-1,-numberRows,-numberRows+1,-1,1,numberRows-1,numberRows,numberRows+1];
    let previousConnectedId;
    let newConnectedId;
    let connections = [];

    // Add canvas

    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d');
    canvas.width = boardWidth;
    canvas.height = boardHeight;

    // Function to create points

    function creatPoints() {
        for(let i=0;i<numberPoints;i++){
            let point = $('<div></div>',{
                'class':'point',
                'id':i,
                css:{
                    'top':coordinateY-shift,
                    'left':coordinateX-shift
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

    // Function to return basic styles

    function resetProperty() {
        centerPoint.removeClass('center');
        $('.active').removeClass('active').off('click', makeMove);
    }

    // Function to connect two points

    function makeMove() {
        
        let centerX = parseInt(centerPoint.css('left'));
        let centerY = parseInt(centerPoint.css('top'));
        resetProperty();
        let newCenterPointId = Number($(this).attr('id'));
        let moveX = parseInt($('#'+newCenterPointId).css('left'));
        let moveY = parseInt($('#'+newCenterPointId).css('top'));

        previousConnectedId = centerPoint.attr('id');
        newConnectedId = $(this).attr('id');
        connections.push(previousConnectedId+"-"+newConnectedId);

        drawMove(centerX,centerY,moveX,moveY);
        setActivePoints(newCenterPointId)
    }

    // Function to set active points

    function setActivePoints(id) {

       centerPoint = $('#'+id);
       centerPoint.addClass('center');
       for(let i=0;i<activePointsId.length;i++){
            if(connections.includes(id+"-"+(id+activePointsId[i])) === false && connections.includes((id+activePointsId[i])+"-"+id) === false){ 
                let activePoint = $('#'+(id+activePointsId[i]));
                activePoint.addClass('active');
                activePoint.on('click', makeMove)
            }
       }
    }

    // function to draw straight line

    function drawMove(centerX,centerY,moveX,moveY) {
        ctx.beginPath();
        ctx.moveTo(centerX+shift,centerY+shift);
        ctx.lineTo(moveX+shift,moveY+shift);
        ctx.lineWidth = 6;
        ctx.strokeStyle = "darkgreen";
        ctx.stroke();
    }

    creatPoints();
    setActivePoints(centerPointId);
})