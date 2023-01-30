function renderSettingsPage() {
    let mainSettingsPageBox = el('div','main-settings-page-box')
    let settingsTitleBox = el('img','settings-title-box')
    let settingsBox = el('div','settings-box')
    let settingsContentBox = el('div','settings-content-box')

    settingsTitleBox.src = 'input.png'

    settingsBox.append(renderSettingsButtonsBox())
    settingsBox.append(settingsContentBox)

    mainSettingsPageBox.append(settingsTitleBox)
    mainSettingsPageBox.append(settingsBox)

    return mainSettingsPageBox
}

function renderSettingsButtonsBox() {
    let buttonsNames = ['Play settings','Exit']
    let settingsButtonsBox = el('div','settings-buttons-box')

    buttonsNames.forEach(val => {
        let settingsButtonsItemBox = el('div','settings-buttons-item-box')
        
        settingsButtonsItemBox.textContent = val
        settingsButtonsItemBox.setAttribute('type',val.toLowerCase())

        settingsButtonsItemBox.onclick = ()=> {
            settingsButtonsType(settingsButtonsItemBox.getAttribute('type'))
        }

        settingsButtonsBox.append(settingsButtonsItemBox)
    });

    return settingsButtonsBox
    
}

function settingsButtonsType(type) {
    switch (type) {
        case 'play settings':
            typePlaySettings()
            break;
    
        case 'exit':
            typeExit()
            break;
    }
    
}

function typePlaySettings() {
    if (document.querySelector('.play-settings-content-box')) {
        document.querySelector('.play-settings-content-box').remove()
    }

    if (document.querySelector('.exit-content-box')) {
        document.querySelector('.exit-content-box').remove()
        controls.settingsExit.index = 1
    }

    document.querySelector('.settings-content-box').append(renderPlaySettingsContent())
    controls.select = controls.settingsPLay
    controls.select.addActive()
    
}

function typeExit() {
    if (document.querySelector('.play-settings-content-box')) {
        document.querySelector('.play-settings-content-box').remove()
    }

    if (document.querySelector('.exit-content-box')) {
        document.querySelector('.exit-content-box').remove()
    }

    controls.settingsExit.index = 1

    document.querySelector('.settings-content-box').append(renderExitContent())
    controls.select = controls.settingsExit
    controls.select.addActive()
}

function renderPlaySettingsContent() {
    let playSettingsContentBox = el('div','play-settings-content-box')
    let contentContinueWatchingBox = el('div','content-continue-watching-box')
    let contentFavoritesBox = el('div','content-continue-watching-box')
    let favoriteImgBox = el('img','favorite-img-box')
    let continueImgBox = el('img','continue-img-box')

    contentContinueWatchingBox.textContent = 'Continue watching'
    contentFavoritesBox.textContent = 'Favorits'
    if (favoriteNUm) {
        favoriteImgBox.src = 'on.png'
    }else {
        favoriteImgBox.src = 'off.png'
    }

    if (continueNum) {
        continueImgBox.src = 'on.png'
    }else {
        continueImgBox.src = 'off.png'
    }

    contentContinueWatchingBox.append(continueImgBox)

    contentFavoritesBox.append(favoriteImgBox)

    playSettingsContentBox.append(contentContinueWatchingBox)
    playSettingsContentBox.append(contentFavoritesBox)

    favoriteOff(favoriteImgBox,contentFavoritesBox)
    continueOff(continueImgBox,contentContinueWatchingBox)

    return playSettingsContentBox

}

function favoriteOff(img,elem) {
    elem.onclick = ()=> {
        if (favoriteNUm) {
            favoriteNUm = 0
            img.src = 'off.png'
            controls.movieList.rowsIndex = 0
            for (let i = 0; i < mainBottomLIstsData.length; i++) {
                if (mainBottomLIstsData[i].data.class === "favorit-card") {
                    mainBottomLIstsData.splice(i,1)
                }
            }

            localStorage.setItem( 'data',JSON.stringify(mainBottomLIstsData))

            localStorage.setItem('img',favoriteNUm)

            renderMainBottomLists(mainBottomLIstsData)
        }else {
            favoriteNUm = 1
            img.src = 'on.png'
            if (favoritesData.data.playlist.length) {
                mainBottomLIstsData.unshift(favoritesData)
            }

            localStorage.setItem( 'data',JSON.stringify(mainBottomLIstsData))

            localStorage.setItem('img',favoriteNUm)

            renderMainBottomLists(mainBottomLIstsData)
        }

    }
}

function continueOff(img,elem) {
    elem.onclick = ()=> {
        if (continueNum) {
            continueNum = 0
            img.src = 'off.png'
            controls.movieList.rowsIndex = 0
            for (let i = 0; i < mainBottomLIstsData.length; i++) {
                if (mainBottomLIstsData[i].data.class === "continue-card") {
                    mainBottomLIstsData.splice(i,1)
                }
            }

            localStorage.setItem( 'data',JSON.stringify(mainBottomLIstsData))

            localStorage.setItem('num',continueNum)

            renderMainBottomLists(mainBottomLIstsData)
        }else {
            continueNum = 1
            img.src = 'on.png'
            if (continueVideoData.data.playlist.length) {
                mainBottomLIstsData.unshift(continueVideoData)
            }
            
            localStorage.setItem( 'data',JSON.stringify(mainBottomLIstsData))

            localStorage.setItem('num',continueNum)

            renderMainBottomLists(mainBottomLIstsData)
        }
    }
}

function renderExitContent() {
    var buttonsNames = ['Yes','No']
    let exitContentBox = el('div','exit-content-box')
    let contentTitleAndButtonsBox = el('div','content-title-and-button-box')
    let conentTitleBox = el('p','content-title-box')
    let contentButtonsBox = el('div','content-buttons-box')

    conentTitleBox.textContent = 'Do you want to exit ?'
    
    buttonsNames.forEach(val => {
        let buttonsItemBox = el('div','buttons-item-box')

        buttonsItemBox.textContent = val
        buttonsItemBox.setAttribute('type',val)

        buttonsItemBox.onclick = ()=> {
            exitButtonsTypes(buttonsItemBox.getAttribute('type'))
        }

        contentButtonsBox.append(buttonsItemBox)
    });

    contentTitleAndButtonsBox.append(conentTitleBox)
    contentTitleAndButtonsBox.append(contentButtonsBox)

    exitContentBox.append(contentTitleAndButtonsBox)

    return exitContentBox
    
}

function exitButtonsTypes(type) {
    switch (type) {
        case 'Yes':
            console.log('yesss');
            break;
    
        case 'No':
            typeNo()
            break;
    }
    
}

function typeNo() {
    document.querySelector('.exit-content-box').remove()
    controls.select = controls.settingsButtons
    controls.select.firstActive()
    controls.select.ok()
}