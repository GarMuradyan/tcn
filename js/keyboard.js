var shift = true
function renderKeyboard() {
    if (shift) {
        shift = false
       return renderKeyboardToLowerCase()
    }else {
        shift = true
       return renderKeyboardToUpperCase()
    }

}

function renderKeyboardToLowerCase() {
    console.log('poqr');
    const keyboardArr = [
        [1,2,3,4,5,6,7,8,9,0,'&','Backspace'],
        ['q','w','e','r','t','y','u','i','o','p','{','}','+'],
        ['a','s','d','f','g','h','j','k','l',':',`""`,'Enter'],
        ['Shift','z','x','c','v','b','n','m',',','.','Space',]
    ]
    let keyboardBox = el('div','keyboard-box')
    keyboardBox.classList.add('keyboard-trans')

    for (let i = 0; i < keyboardArr.length; i++) {
        let keyboardRowsBox = el('div','keyboard-rows-box')
        keyboardBox.append(keyboardRowsBox)
        for (let j = 0; j < keyboardArr[i].length; j++) {
            let keyboardRowsBoxItem = el('div','kyeboard-rows-box-item')
            keyboardRowsBoxItem.textContent = keyboardArr[i][j]
            keyboardRowsBox.append(keyboardRowsBoxItem)
            if (keyboardArr[i][j] === 'Enter') {
                keyboardRowsBoxItem.textContent = ''
                keyboardRowsBoxItem.classList.add('enter')
                
            }
            if (keyboardArr[i][j] === 'Backspace') {
                keyboardRowsBoxItem.textContent = ''
                keyboardRowsBoxItem.classList.add('backspace')
                
            }
            if (keyboardArr[i][j] === 'Space') {
                keyboardRowsBoxItem.textContent = ''
                keyboardRowsBoxItem.classList.add('space')
                
            }
            if (keyboardArr[i][j] === 'Shift') {
                keyboardRowsBoxItem.textContent = ''
                keyboardRowsBoxItem.classList.add('shift')
                
            }
        }
    }
    return keyboardBox
}

function renderKeyboardToUpperCase() {
    console.log('mec');
    const keyboardArr = [
        [1,2,3,4,5,6,7,8,9,0,'&','Backspace'],
        ['Q','W','E','R','T','Y','U','I','O','P','{','}','+'],
        ['A','S','D','F','G','H','J','K','L',':',`""`,'Enter'],
        ['Shift','Z','X','C','V','B','N','M',',','.','Space',]
    ]
    let keyboardBox = el('div','keyboard-box')
    keyboardBox.classList.add('keyboard-trans')

    for (let i = 0; i < keyboardArr.length; i++) {
        let keyboardRowsBox = el('div','keyboard-rows-box')
        keyboardBox.append(keyboardRowsBox)
        for (let j = 0; j < keyboardArr[i].length; j++) {
            let keyboardRowsBoxItem = el('div','kyeboard-rows-box-item')
            keyboardRowsBoxItem.textContent = keyboardArr[i][j]
            keyboardRowsBox.append(keyboardRowsBoxItem)
            if (keyboardArr[i][j] === 'Enter') {
                keyboardRowsBoxItem.textContent = ''
                keyboardRowsBoxItem.classList.add('enter')
                
            }
            if (keyboardArr[i][j] === 'Backspace') {
                keyboardRowsBoxItem.textContent = ''
                keyboardRowsBoxItem.classList.add('backspace')
                
            }
            if (keyboardArr[i][j] === 'Space') {
                keyboardRowsBoxItem.textContent = ''
                keyboardRowsBoxItem.classList.add('space')
                
            }
            if (keyboardArr[i][j] === 'Shift') {
                keyboardRowsBoxItem.textContent = ''
                keyboardRowsBoxItem.classList.add('shift')
                
            }
        }
    }
    return keyboardBox
}

function keyboardItemsClick (keyboardRowsBox) {
    for (let i = 0; i < keyboardRowsBox.length; i++) {
        for (let j = 0; j < keyboardRowsBox[i].getElementsByClassName('kyeboard-rows-box-item').length; j++) {
            keyboardRowsBox[i].getElementsByClassName('kyeboard-rows-box-item')[j].onclick = (e)=> {
                if (keyboardRowsBox[i].getElementsByClassName('kyeboard-rows-box-item')[j].textContent) {
                   activeInput.value+= keyboardRowsBox[i].getElementsByClassName('kyeboard-rows-box-item')[j].textContent
                   removeSearchList()
                   removeNotFound()
                   renderSearching(activeInput.value)
                   renderSearchShimer()
                }
                if (keyboardRowsBox[i].getElementsByClassName('kyeboard-rows-box-item')[j].classList.contains('backspace')) {
                    if (activeInput.value) {
                       let x = activeInput.value.substring(0,activeInput.value.length-1)
                       activeInput.value = x
                       removeSearchList()
                       removeNotFound()
                       renderSearching(activeInput.value)
                       renderSearchShimer()
                    }
                }
                if (keyboardRowsBox[i].getElementsByClassName('kyeboard-rows-box-item')[j].classList.contains('space')) {
                    activeInput.value+=' '
                    removeSearchList()
                    removeNotFound()
                    renderSearching(activeInput.value)
                    renderSearchShimer()
                }
                if (keyboardRowsBox[i].getElementsByClassName('kyeboard-rows-box-item')[j].classList.contains('shift')) {
                    keyboardShiftClick()
                }
                if (keyboardRowsBox[i].getElementsByClassName('kyeboard-rows-box-item')[j].classList.contains('enter')) {
                    keyboardEnterClick()
                }
                e.stopPropagation()
            }
        }
    }
}

function renderSearchShimer() {
    if (document.querySelector('.shimer-box')) {
        document.querySelector('.shimer-box').remove()
    }
    let shimerBox = el('div','shimer-box')

    for (let i = 0; i < 5; i++) {
        shimerBox.append(renderCardShimer())
    }

    document.querySelector('.main-search-lists-box').append(shimerBox)
}

function renderCardShimer() {
    let cardShimerBox = el('div','card-shimer-box')
    cardShimerBox.classList.add('shimmer')

    return cardShimerBox
}

function removeSearchList() {
    if (document.querySelector('.search-lists-box')) {
        document.querySelector('.search-lists-box').remove()
    }
}