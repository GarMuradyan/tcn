var gridData = null

function renderCategMoviesBox(data) {
    let mainCategMoviesBox = el('div','main_categ-movies-box')
    let mainCategMoviesTcnTitle = el('p','main_categ-movies_tcn-title')

    mainCategMoviesTcnTitle.textContent = data[0].title

    mainCategMoviesBox.append(renderCategMoviesTopBox(data))
    mainCategMoviesBox.append(mainCategMoviesTcnTitle)
    mainCategMoviesBox.append(renderCategMoviesCategoriesBox(data[0]))

    return mainCategMoviesBox
}

function renderCategMoviesTopBox(data) {
    let mainCategMoviesTopBox = el('div','main_categ-movies_top-box')

    data.forEach(val => {
        let mainCategMoviesCategoriesBox = el('div','main_categ-movies_top_categories-box')
        mainCategMoviesCategoriesBox.textContent = val.title
        mainCategMoviesCategoriesBox.onclick = function () {
            mainCategMoviesTopCategClicks(this.textContent)
        }
        mainCategMoviesTopBox.append(mainCategMoviesCategoriesBox)
    });

    return mainCategMoviesTopBox

}

function renderCategMoviesCategoriesBox(data) {
    gridData = data
    if (document.querySelector('.main_categ-movies-tcn-top')) {
        document.querySelector('.main_categ-movies-tcn-top').remove()
    }
    let mainCategMoviesTcnTop = el('div','main_categ-movies-tcn-top')
    let mainCategMoviesTcnBox = el('div','main_categ-movies_tcn-box')
    let mainCategMoviesTcnListsParent = el('div','main_categ-movies_tcn_lists_parent')
    let mainCategMoviesTcnLists = el('div','main_categ-movies_tcn_lists')

    gridData.playlist.forEach(val => {
        mainCategMoviesTcnLists.append(renderBottomListsCard(val,'categories-card',gridData))
    });

    mainCategMoviesTcnListsParent.append(mainCategMoviesTcnLists)

    mainCategMoviesTcnBox.append(mainCategMoviesTcnListsParent)

    mainCategMoviesTcnTop.append(mainCategMoviesTcnBox)

    return mainCategMoviesTcnTop
}

function tcnLIstsCardClick(data) {
    document.querySelector('.parent').style.display = 'none'
    if (document.querySelector('.categ-videos-box')) {
        document.querySelector('.categ-videos-box').remove()
    }
    document.body.append(renderCategVideos(data))
    renderSimilarChanselss(data)
    controls.privius = controls.select
    controls.select = controls.videoPlayer
}

function mainCategMoviesTopCategClicks(textContent) {
    for(let i = 0; i < 2; i++) {
        if (mainBottomLIstsData.length > 5) {
            mainBottomLIstsData.shift()
        }
    }
    
    let data = mainBottomLIstsData.map(item => item.data)

    switch (textContent) {
        case 'TCN Top 20 Countdown':
            categoriesData = []
            renderTcnTop(data[0])
            controlsTcnIndex()
            break;
        case 'Alabama Shine':
            categoriesData = []
            renderTcnTop(data[1])
            controlsTcnIndex()
            break;
        case 'Live at Margaritaville':
            categoriesData = []
            renderTcnTop(data[2])
            controlsTcnIndex()
            break;
        case 'A Night at Whiskey Bent':
            categoriesData = []
            renderTcnTop(data[3])
            controlsTcnIndex()
            break;
        case 'Special Programing':
            categoriesData = []
            renderTcnTop(data[4])
            controlsTcnIndex()
            break;
        default:
            break;
    } 
}

function renderTcnTop(data) {
    if ( document.querySelector('.main_categ-movies_tcn-title').textContent) {
        document.querySelector('.main_categ-movies_tcn-title').textContent = ''
    }
    if (document.querySelector('.main_categ-movies-tcn-top')) {
        document.querySelector('.main_categ-movies-tcn-top').remove()
    }
    document.querySelector('.main_categ-movies-box').append(renderCategMoviesCategoriesBox(data))
    document.querySelector('.main_categ-movies_tcn-title').textContent = data.title
}