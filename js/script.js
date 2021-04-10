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

        ctx.beginPath();
        ctx.moveTo(0,boardHeight/2-2*step);
        ctx.lineTo(2*step,boardHeight/2-2*step);
        ctx.lineTo(2*step,boardHeight/2+2*step);
        ctx.lineTo(0,boardHeight/2+2*step);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(boardWidth,boardHeight/2-2*step);
        ctx.lineTo(boardWidth-2*step,boardHeight/2-2*step);
        ctx.lineTo(boardWidth-2*step,boardHeight/2+2*step);
        ctx.lineTo(boardWidth,boardHeight/2+2*step);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,boardHeight/2);
        ctx.lineTo(0,boardHeight/2-step);
        ctx.lineTo(0,boardHeight/2+step);
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(boardWidth,boardHeight/2);
        ctx.lineTo(boardWidth,boardHeight/2-step);
        ctx.lineTo(boardWidth,boardHeight/2+step);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0,0,step/2,0,Math.PI*0.5,false);
        ctx.strokeStyle = "white";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(boardWidth,0,step/2,0,Math.PI*0.5,true);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0,boardHeight,step/2,0,Math.PI*0.5,true);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(boardWidth,boardHeight,step/2,0,Math.PI*0.5,true);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(2*step,boardHeight/2,step,Math.PI*0.5,Math.PI*1.5,true);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(boardWidth-2*step,boardHeight/2,step,Math.PI*0.5,Math.PI*1.5,false);
        ctx.stroke();
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
        $('.active').removeClass('active').off('click', makeMove);
        gameOrder=!gameOrder;
    }

    // Function to connect two points

    function getCoordinate(newId){
            centerX = parseInt(centerPoint.css('left'));
            centerY = parseInt(centerPoint.css('top'));

            moveX = parseInt($('#'+newCenterPointId).css('left'));
            moveY = parseInt($('#'+newCenterPointId).css('top'));

            previousConnectedId = centerPoint.attr('id');
            newConnectedId = $('#'+newCenterPointId).attr('id');
            connections.push(previousConnectedId+"-"+newConnectedId);
    }

    function cpuMove(){
        setTimeout(function(){
            newCenterPointId = Number(arrayActualId[0]);
            resetProperty();
            getCoordinate(newCenterPointId)
            drawMove(centerX,centerY,moveX,moveY,"red");
            setActivePoints(newCenterPointId);
            actualActivePointsId();
            if($('#'+newCenterPointId).attr('clicked')){
                gameOrder=false
                cpuMove()
            } 
            else{
                $('#'+newCenterPointId).attr('clicked',true)
                gameOrder=true
            } 
        },1000)
    }

    function makeMove() {
        if(gameOrder){
            newCenterPointId = Number($(this).attr('id'));
            resetProperty();
            getCoordinate(newCenterPointId)
            drawMove(centerX,centerY,moveX,moveY,"green");
            setActivePoints(newCenterPointId);
            actualActivePointsId();
            if($(this).attr('clicked')){
                console.log($(this).attr('clicked'))
                gameOrder=true
            } 
            else{
                $(this).attr('clicked',true)
                gameOrder=false
            } 
        }  
        if(gameOrder===false){
            cpuMove()
        }
    }

    // Function to set active points

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
                activePoint.on('click', makeMove)
            }
       }  
    }

    // określenie gdzie ma kliknąć cpu

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