var searchText
var searchMoviesData = []

function renderMainSearchBox() {

    let mainSearchSystemBox = el('div','main-search-system-box')
    let mainSearchBox = el('div','main-search-box')
    let mainSearchInputBox = el('input','main-search-input-box')
    let mainSearchListsBox = el('div','main-search-lists-box')

    mainSearchInputBox.onclick = selectInput


    mainSearchInputBox.setAttribute('type','text')
    mainSearchInputBox.setAttribute('placeholder','Search...')

    mainSearchBox.append(mainSearchInputBox)

    mainSearchSystemBox.append(mainSearchBox)
    mainSearchSystemBox.append(mainSearchListsBox)
    mainSearchSystemBox.append(renderKeyboard())


    return mainSearchSystemBox
}

function renderSearching(value) {
    for(let i = 0; i < 2; i++) {
        if (mainBottomLIstsData.length > 5) {
            mainBottomLIstsData.shift()
        }
    }
    searchText = value
    searchMoviesData = []
    for (let i = 0; i < mainBottomLIstsData.length; i++) {
        for (let j = 0; j < mainBottomLIstsData[i].data.playlist.length; j++) {
           searchMoviesData.push(mainBottomLIstsData[i].data.playlist[j])
        }
    }
    refresh(searchMoviesData,searchText)
}

let id

function refresh(searchMoviesData,searchText) {
    if (id !== undefined) {
        clearTimeout(id)
    }

    id = setTimeout(() => {
        renderSearch(searchMoviesData,searchText)
    }, 1000);
}

function renderSearch(list,text) {
    if (document.querySelector('.search-lists-box')) {
        document.querySelector('.search-lists-box').remove()
        controls.searchLists.index = 0
    }
    let searchListsBox = el('div','search-lists-box')
    let data = list.filter((val)=> {
        return val.title.indexOf(text) !== -1
    })

    renderNotFound(data)

    for (let i = 0; i < data.length; i++) {
        searchListsBox.append(renderBottomListsCard(data[i],'search-card',data))
    }
    
    if (document.querySelector('.shimer-box')) {
        document.querySelector('.shimer-box').remove()
    }
    
    document.querySelector('.main-search-lists-box').append(searchListsBox)

}

function renderNotFound(data) {
    if (!data.length) {
        let notFoundBox = el('div','not-found-box')

        notFoundBox.textContent = 'Not Found'

        document.querySelector('.main-search-system-box').append(notFoundBox)
    }
}

function removeNotFound() {
    if (document.querySelector('.not-found-box')) {
        document.querySelector('.not-found-box').remove()
    }
}

function selectInput (e) {
    activeInput = this
    let keyboardBox = document.querySelector('.keyboard-box')
    keyboardBox.classList.remove('keyboard-trans')
    controls.select.removeClass()
    controls.select = controls.keyboard
    controls.select.removeClass()
    controls.select.index = 0
    controls.select.rowsIndex = 0
    controls.select.firstActive()
    keyboardItemsClick(document.querySelectorAll('.keyboard-rows-box'))

}

function keyboardEnterClick() {
    if (document.getElementsByClassName('search-lists-box')[0] && document.getElementsByClassName('search-lists-box')[0].getElementsByClassName('main_bottom_lits_rows_card-box').length) {
        document.querySelector('.keyboard-box').classList.add('keyboard-trans')
        controls.keyboard.removeClass()
        controls.select = controls.searchLists
        controls.select.addActive()
    }else {
        document.querySelector('.keyboard-box').classList.add('keyboard-trans')
        controls.keyboard.removeClass()
        controls.select = controls.search
        controls.select.addActive()
    }
}

function keyboardShiftClick() {
    if (document.querySelector('.keyboard-box')) {
        document.querySelector('.keyboard-box').remove()
    }

   document.querySelector('.main-search-system-box').append(renderKeyboard())
   document.querySelector('.keyboard-box').classList.remove('keyboard-trans')
   console.log(controls.select);
   activeInput = document.querySelector('.main-search-input-box')
   keyboardItemsClick(document.querySelectorAll('.keyboard-rows-box'))
   controls.select.addActive()
}