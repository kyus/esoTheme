
function eyeContact(e) {
    // height : 237.5 / 146 ~ 166
    // l : 623 / 590 ~ 623
    // r : 638 ~ 667
    let docPosition = {
        w: document.body.offsetWidth,
        h: document.body.offsetHeight,
        x: e.pageX,
        y: e.pageY
    };
    let eyeMovement = {
        lw:0,
        lh:0,
        rw:0,
        rh:0
    };
    let half = docPosition.w/2;
    let halfH = docPosition.h/2;
//    console.log('handle',e.pageX, e.pageY, halfH);
    let { eyeLeft, eyeRight } = "translate(0,0)";
    if (docPosition.y < halfH - 90) {
        eyeMovement.lh = -8;
        eyeMovement.rh = -8;
    } else if (docPosition.y > halfH - 90 && docPosition.y < halfH - 70) {
        eyeMovement.lh = docPosition.y - halfH + 78;
        eyeMovement.rh = docPosition.y - halfH + 78;
    } else {
        eyeMovement.lh = 8;
        eyeMovement.rh = 8;
    }
    if (docPosition.x > half) {
        eyeMovement.lw = 12;
        if (docPosition.x < half + 15) {
            eyeMovement.rw = -15;
        } else if (docPosition.x < half + 45) {
            eyeMovement.rw = docPosition.x - half - 30;
            eyeMovement.lw += (docPosition.x - half)/30;
        } else {
            eyeMovement.rw = 15;
        }
        
    } else {
        eyeMovement.rw = -12;
        if (docPosition.x > half - 30) {
            eyeMovement.lw = docPosition.x - half + 15;
            eyeMovement.rw += (docPosition.x - half)/10;
        } else {
            eyeMovement.lw = -15;
        }
    }
//    console.log(eyeMovement);
    
    eyeLeft = "translate("+eyeMovement.lw+"px,"+eyeMovement.lh+"px)";
    eyeRight = "translate("+eyeMovement.rw+"px,"+eyeMovement.rh+"px)";
    $('#apeach:not(.active) #eye-left').css("transform",eyeLeft);
    $('#apeach:not(.active) #eye-left1').css("transform",eyeLeft);
    $('#apeach:not(.active) #eye-right').css("transform",eyeRight);
    $('#apeach:not(.active) #eye-right1').css("transform",eyeRight);
}

$(document).ready(function(){
    document.addEventListener("mousemove", (e) => {eyeContact(e)});
    
    $('.tooltip').click(function(){
        $(this).next().focus();
    });
    $('input').focus(function(){
        $('#apeach').attr('class','active');
        $('#apeach #eye-left, #apeach #eye-right').css("transform","none");
        $(this).closest('.input-wrapper').addClass('active');
    });
    $('.tooltip + input').blur(function(){
        if( $(this).val() == '') {
            $('#apeach').attr('class','non-active');
            $(this).closest('.input-wrapper').removeClass('active');
        }
    });
    $('.tooltip.id + input').keydown(function(){
        let val = $(this).val();
        let eyePosition = val.length - 15;
        eyePosition = (eyePosition > 15) ? 15 : eyePosition;
        $('#apeach #eye-left').css("transform", "translate( "+eyePosition+"px, 8px)");
        $('#apeach #eye-right').css("transform", "translate( "+eyePosition+"px, 8px)");
        $('#apeach #eye-left1').css("transform", "translate( "+eyePosition+"px, 8px)");
        $('#apeach #eye-right1').css("transform", "translate( "+eyePosition+"px, 8px)");
        console.log('val', val.length);
        if (val.length > 9) {
            $('#apeach').attr("class", "active athumb");
        } else {
            $('#apeach').attr("class", "active");
        }
        
    });
});