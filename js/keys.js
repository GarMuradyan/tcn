document.onkeydown = (e)=> {
    var key = ''
    switch (e.keyCode) {
        case 13:
            key = 'ok'
            break;
        case 37:
            key = 'left'
            break;
        case 39:
            key = 'right'
            break;
        case 40:
            key = 'down'
            break;
        case 38:
            key = 'up'
            break; 
        case 8:
            key = 'back'           
        default:
            break;
    }
    if (key) {
        controls.select[key]()
    }
}