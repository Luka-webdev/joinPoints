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
    let gameOrder = true;
    let newCenterPointId;

    // Add canvas

    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d');
    canvas.width = boardWidth;
    canvas.height = boardHeight;

    //function to create football pitch

    function createPitch() {
        ctx.beginPath();
        ctx.moveTo(boardWidth/2,0);
        ctx.lineTo(boardWidth/2,boardHeight);
        ctx.closePath();
        ctx.lineWidth = 8;
        ctx.strokeStyle = "white";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(boardWidth/2,boardHeight/2,2*step,0,Math.PI*2,true);
        ctx.stroke();
        
        function goalArea(x0,x1){
            ctx.beginPath();
            ctx.moveTo(x0,boardHeight/2-2*step);
            ctx.lineTo(x1,boardHeight/2-2*step);
            ctx.lineTo(x1,boardHeight/2+2*step);
            ctx.lineTo(x0,boardHeight/2+2*step);
            ctx.stroke();
        }

        goalArea(0,2*step)
        goalArea(boardWidth,boardWidth-2*step)

        function goalLine(x0){
            ctx.beginPath();
            ctx.moveTo(x0,boardHeight/2);
            ctx.lineTo(x0,boardHeight/2-step);
            ctx.lineTo(x0,boardHeight/2+step);
            ctx.strokeStyle = "black";
            ctx.stroke();
        }

        goalLine(0);
        goalLine(boardWidth);

        function corners(x0,y0,direction){
            ctx.beginPath();
            ctx.arc(x0,y0,step/2,0,Math.PI*0.5,direction);
            ctx.strokeStyle = "white";
            ctx.stroke();
        }
        
        corners(0,0,false)
        corners(boardWidth,0,true)
        corners(0,boardHeight,true)
        corners(boardWidth,boardHeight,true)

        function semicircle(x0,direction){
            ctx.beginPath();
            ctx.arc(x0,boardHeight/2,step,Math.PI*0.5,Math.PI*1.5,direction);
            ctx.stroke();
        }
        
        semicircle(2*step,true)
        semicircle(boardWidth-2*step,false)
    }

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
        $('.active').removeClass('active').off('click', userMove);
        gameOrder=!gameOrder;
    }

    // Function to determine coordinate

    function getCoordinate(newId){

            centerX = parseInt(centerPoint.css('left'));
            centerY = parseInt(centerPoint.css('top'));

            moveX = parseInt($('#'+newId).css('left'));
            moveY = parseInt($('#'+newId).css('top'));

            previousConnectedId = centerPoint.attr('id');
            newConnectedId = $('#'+newId).attr('id');
            connections.push(previousConnectedId+"-"+newConnectedId);
    }

    // function to make move

    function makeMove(color){
        resetProperty();
        getCoordinate(newCenterPointId)
        drawMove(centerX,centerY,moveX,moveY,color);
        setActivePoints(newCenterPointId);
        actualActivePointsId();
    }

    // Function for handling computer movement

    function cpuMove(){
        setTimeout(function(){
            newCenterPointId = Number(arrayActualId[0]);
            makeMove("red");
            if($('#'+newCenterPointId).attr('clicked')){
                gameOrder=false;
                cpuMove();
            } 
            else{
                $('#'+newCenterPointId).attr('clicked',true)
                gameOrder=true;
            } 
        },1000)
    }

    // Function for handling user movement

    function userMove() {
        if(gameOrder){
            newCenterPointId = Number($(this).attr('id'));
            makeMove("green");
            if($(this).attr('clicked')){
                gameOrder=true;
            } 
            else{
                $(this).attr('clicked',true);
                gameOrder=false;
            } 
        }  
        if(gameOrder===false){
            cpuMove();
        }
    }

    // Function to determination active points for user motion

    function setActivePoints(id) {

        if(id === Math.floor(numberPoints/2)){
            $('#'+id).attr('clicked',true);
        }
       centerPoint = $('#'+id);
       centerPoint.addClass('center');
       for(let i=0;i<activePointsId.length;i++){
            if(connections.includes(id+"-"+(id+activePointsId[i])) === false && connections.includes((id+activePointsId[i])+"-"+id) === false){ 
                let activePoint = $('#'+(id+activePointsId[i]));
                activePoint.addClass('active');
                activePoint.on('click', userMove)
            }
       }  
    }

    // Function to determination of active points for computer motion

    function actualActivePointsId(){
        arrayActualId=[];
        let actualActivePoints=$('.active')
        actualActivePoints.each(function(){
            arrayActualId.push($(this).attr('id'))
        })     
    }

    // function to draw straight line

    function drawMove(centerX,centerY,moveX,moveY,color) {
        ctx.beginPath();
        ctx.moveTo(centerX+shift,centerY+shift);
        ctx.lineTo(moveX+shift,moveY+shift);
        ctx.lineWidth = 6;
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    createPitch();
    creatPoints();
    setActivePoints(centerPointId);
})