var activeInput = ''

function renderAside() {
    const MENUITEMSNAME = ['Home','Movies','Live', 'Search', 'Settings']
    const posterLnk = ['home.png','movies.png','live.png','search.png','settings.png']

    let aside = el('aside')
    let asideBox = el('div','aside-box')
    let asideBoxLogo = el('img','aside-box_logo')
    let asideBoxMenu = el('div','aside-box_menu')

    MENUITEMSNAME.forEach((val,i) => {
        let asideBoxMenuItem = el('div','aside-box_menu_item')
        let asideBoxMenuItemTitle = el('div','aside-box_menu_item-title')
        let asideBoxMenuItemPoster = el('img','aside-box_menu_item-poster')

        asideBoxMenuItemTitle.textContent = val
        asideBoxMenuItemTitle.classList.add("width")
        asideBoxMenuItemPoster.src = posterLnk[i]

        if (i === 0) {
            asideBoxMenuItem.classList.add('back-liner')
        }
        asideBoxMenuItem.setAttribute('type',val.toLowerCase())

        asideBoxMenuItem.onclick = function () {
            menuClicks(this.getAttribute('type'),asideBoxMenuItem)
        }

        asideBoxMenuItem.append(asideBoxMenuItemPoster)
        asideBoxMenuItem.append(asideBoxMenuItemTitle)

        asideBoxMenu.append(asideBoxMenuItem)
    });

    asideBoxLogo.src = 'logo 2.png'

    asideBox.append(asideBoxLogo)
    asideBox.append(asideBoxMenu)

    aside.append(asideBox)

    document.querySelector('.parent-box').append(aside)

}

function menuClicks(type,asideBoxMenuItem) {
    let movies = mainBottomLIstsData.filter((val,i)=> {
        if (val.data.title === 'TCN Top 20 Countdown' || val.data.title === 'Alabama Shine' || val.data.title === 'Live at Margaritaville') {
            return val
        }
    }).map((val)=> {
        return val.data
    })
    let live = mainBottomLIstsData.filter((val,i)=> {
        if (val.data.title === 'A Night at Whiskey Bent' || val.data.title === 'Special Programing') {
            return val
        }
    }).map((val)=> {
        return val.data
    }) 

    switch (type) {
        case 'home':
            removeClassBack()
            menuItemHomeClick(asideBoxMenuItem)
            controlsTcnIndex()
            break;
    
        case 'movies':
            removeClassBack()
            menuItemMoviesClick(movies,asideBoxMenuItem)
            controlsTcnIndex()
            break;
        case 'live':
            removeClassBack()
            menuItemMoviesClick(live,asideBoxMenuItem)
            controlsTcnIndex()
            break;
        case 'search':
            removeClassBack()
            menuItemSearchClick(asideBoxMenuItem)
            controlsTcnIndex()
            break;   
        case 'settings':
            removeClassBack()
            menuItemSettingsClick(asideBoxMenuItem)
            controlsTcnIndex()
            break;     
    }
}

function menuItemHomeClick(asideBoxMenuItem) {
    if (document.querySelector('.main_categ-movies-box')) {
        document.querySelector('.main_categ-movies-box').style.display = 'none'
        document.querySelector('.main-box').style.display = 'block'
    }
    if (document.querySelector('.main-search-system-box')) {
        document.querySelector('.main-search-system-box').remove()
        document.querySelector('.main-box').style.display = 'block'
    }
    if (document.querySelector('.main-settings-page-box')) {
        document.querySelector('.main-settings-page-box').remove()
        document.querySelector('.main-box').style.display = 'block'
    }
    asideBoxMenuItem.classList.add('back-liner')
    controls.select = controls.movieList
    controls.select.index = -1
    controls.select.right()
    controls.select.listTransY()
}

function menuItemMoviesClick(data,asideBoxMenuItem) {
    if (document.querySelector('.main_categ-movies-box')) {
        document.querySelector('.main_categ-movies-box').remove()
    }
    if (document.querySelector('.main-search-system-box')) {
        document.querySelector('.main-search-system-box').remove()
    }
    if (document.querySelector('.main-settings-page-box')) {
        document.querySelector('.main-settings-page-box').remove()
    }
    asideBoxMenuItem.classList.add('back-liner')
    document.querySelector('.main-box').style.display = 'none'
    document.getElementsByTagName('main')[0].append(renderCategMoviesBox(data))
    controls.select = controls.moviesTop
    controls.select.firstActive()
}

function menuItemSearchClick(asideBoxMenuItem) {
    if (document.querySelector('.main-box')) {
        document.querySelector('.main-box').style.display = 'none'
    }
    if (document.querySelector('.main_categ-movies-box')) {
        document.querySelector('.main_categ-movies-box').style.display = 'none'
    }
    if (document.querySelector('.main-search-system-box')) {
        document.querySelector('.main-search-system-box').remove()
    }
    if (document.querySelector('.main-settings-page-box')) {
        document.querySelector('.main-settings-page-box').remove()
    }
    asideBoxMenuItem.classList.add('back-liner')
    document.getElementsByTagName('main')[0].append(renderMainSearchBox())
    controls.select = controls.search
    controls.select.addActive()
    
}

function menuItemSettingsClick(asideBoxMenuItem) {
    if (document.querySelector('.main-box')) {
        document.querySelector('.main-box').style.display = 'none'
    }
    if (document.querySelector('.main_categ-movies-box')) {
        document.querySelector('.main_categ-movies-box').style.display = 'none'
    }
    if (document.querySelector('.main-search-system-box')) {
        document.querySelector('.main-search-system-box').remove()
    }
    if (document.querySelector('.main-settings-page-box')) {
        document.querySelector('.main-settings-page-box').remove()
    }
    asideBoxMenuItem.classList.add('back-liner')
    document.getElementsByTagName('main')[0].append(renderSettingsPage())
    controls.select = controls.settingsButtons
    controls.select.ok()
}

function controlsTcnIndex() {
    controls.tcnTop.index = 1
    controls.tcnTop.ind = 0
    controls.tcnTop.rowsIndex = 1
}

function menuOpend() {
    document.getElementsByTagName('aside')[0].style.width = '315px'
    document.getElementsByClassName('aside-box_logo')[0].style.width = '150px'
    for (let i = 0; i < document.getElementsByClassName('aside-box_menu_item').length; i++) {
        document.getElementsByClassName('aside-box_menu_item')[i].style.width = '285px'
    }
    for (let i = 0; i < document.querySelectorAll('.aside-box_menu_item-title').length; i++) {
        document.querySelectorAll('.aside-box_menu_item-title')[i].classList.remove('width')
    }
}

function menuClosed() {
    document.getElementsByTagName('aside')[0].style.width = '150px'
    document.getElementsByClassName('aside-box_logo')[0].style.width = '80px'
    for (let i = 0; i < document.getElementsByClassName('aside-box_menu_item').length; i++) {
        document.getElementsByClassName('aside-box_menu_item')[i].style.width = '120px'
    }
    for (let i = 0; i < document.querySelectorAll('.aside-box_menu_item-title').length; i++) {
        document.querySelectorAll('.aside-box_menu_item-title')[i].classList.add('width')
    }
}

function removeClassBack() {
    for (let i = 0; i < document.querySelectorAll('.aside-box_menu_item').length; i++) {
        document.querySelectorAll('.aside-box_menu_item')[i].classList.remove('back-liner')
    }
}