var mainBottomLIstsData = null

let moviesRowsData = null

var continueNum = 1
var favoriteNUm = 1
if (localStorage.getItem('img')) {
    favoriteNUm =+localStorage.getItem('img')
}
if (localStorage.getItem('num')) {
    continueNum =+localStorage.getItem('num')
}

var favoritesData = {
    data: {
        playlist: [

        ],
        class:'favorit-card',
        title: 'Favorits',
    }
}

var continueVideoData = {
    data: {
        playlist: [

        ],
        title: 'Continue Watching',
        class: 'continue-card'
    }
}

if (localStorage.getItem('favorite')) {
    favoritesData = JSON.parse(localStorage.getItem('favorite'))
    console.log(favoritesData);
}

if (localStorage.getItem('continue')) {
    continueVideoData = JSON.parse(localStorage.getItem('continue'))
    console.log(continueVideoData);
}


function renderMain() {

    let main = el('main') 
    let mainBox = el('div','main-box')

    mainBox.append(renderMainTopBox())
    mainBox.append(renderMainBottomBox())

    main.append(mainBox)

    document.querySelector('.parent-box').append(main)
    renderMainTopLogoBox()
    renderMainBottomLists()

}

function renderMainTopBox () {
    let mainTopBox = el('div','main_top-box')
    let mainTopLeftBox = el('div','main_top_left-box')
    let mainTopRightBox = el('div','main_top_right-box')
        
    mainTopBox.append(mainTopLeftBox)
    mainTopBox.append(mainTopRightBox)

    return mainTopBox

}

function renderMainTopLogoBox(message) {

    if (message) {
        let mainTopLogoBox = el('div','main_top_logo-box')
        mainTopLogoBox.classList.add('home-slider')
        mainTopLogoBox.style.backgroundImage = 'url(' + message.playlist[0].image
        let mainTopTitleBox = el('div','main_top_title-box')
        mainTopTitleBox.textContent = message.title

        mainTopLogoBox.onclick = ()=> {
            mainTopLogoBoxClick(message,mainTopLogoBox)
        }
    
        mainTopLogoBox.append(mainTopTitleBox)

        document.querySelector('.main_top-box').insertBefore(mainTopLogoBox,document.querySelector('.main_top-box').children[1])
        document.querySelector('.main_top_skeleton-box').remove()

    }else {
        let mainTopSkeletonBox = el('div','main_top_skeleton-box')
        mainTopSkeletonBox.classList.add('shimmer')

        document.querySelector('.main_top-box').insertBefore(mainTopSkeletonBox,document.querySelector('.main_top-box').children[1])

    }

}

function mainTopLogoBoxClick(message,mainTopLogoBox) {
    document.querySelector('.parent').style.display = 'none'

    if (document.querySelector('.categ-videos-box')) {
        document.querySelector('.categ-videos-box').remove()
    }
    
    document.body.append(renderCategVideos(message,mainTopLogoBox))

    
    renderSimilarChanselss([],mainTopLogoBox)

    controls.privius = controls.select
    controls.select = controls.videoPlayer
}

function getMainTopBoxData() {
    req('get','https://cdn.jwplayer.com/v2/playlists/XJKt0Nq7?page_limit=25',{}).then((res)=> {
        renderMainTopLogoBox(res.data)
    })
    .catch((err)=> {
        console.log(err);
    })
}

function renderMainBottomBox() {
    let mainBottomBox = el('div','main_bottom-box')
    let mainBottomContentBox = el('div','main_bottom_content-box')


    mainBottomBox.append(mainBottomContentBox)

    return mainBottomBox

}

function renderMainBottomLists(message) {
    let mainBottomContentBox =  document.querySelector('.main_bottom_content-box')
    if (message) {
        if (document.querySelector('.main_bottom_lists_content-box')) {
            document.querySelector('.main_bottom_lists_content-box').remove()
        }

        mainBottomContentBox.append(renderBottomLists(message))
        if (document.querySelector('.loading-box')) {
            document.querySelector('.loading-box').remove()
            document.querySelector('.parent').style.display = 'block'
            if (document.getElementsByClassName('main_bottom_lists_rows-box')) {
                controls.select = controls.movieList
                controls.select.firstActive()
            }
        }
    }else {
        mainBottomContentBox.append(renderMainBottomListsShimmer())
    }

}

function renderBottomLists(message) {
    moviesRowsData = message
    let mainBottomListsContentBox = el('div','main_bottom_lists_content-box')
    for (let i = 0; i < message.length; i++) {
        if (message[i].data.playlist.length) {
            let mainBottomListsBox = el('div','main_bottom_lists-box')
            let mainBottomListsTitle = el('p','main_bottom_lists-title')
            let mainBottomListsRowsBox = el('div','main_bottom_lists_rows-box')
            mainBottomListsRowsBox.setAttribute('position',0)
            if (!message[i].data.class) {
                message[i].data.class = 'home-card'
            }
    
            mainBottomListsTitle.textContent = message[i].data.title + ' (' + message[i].data.playlist.length +')'
            for (let j = 0; j < message[i].data.playlist.length; j++) {
                mainBottomListsRowsBox.append(renderBottomListsCard(message[i].data.playlist[j],'home-card',message[i]))
            }
    
            mainBottomListsBox.append(mainBottomListsTitle)
            mainBottomListsBox.append(mainBottomListsRowsBox)
    
            mainBottomListsContentBox.append(mainBottomListsBox)
        }
    }

    return mainBottomListsContentBox
}

function renderBottomListsCard(message,cardClass,data) {
    let num = Math.round(message.duration / 60)
        let mainBottomListsRowsCardBox = el('div','main_bottom_lits_rows_card-box')
        let mainBottomListsRowsCardPoster = el('img','main_bottom_lists_rows_card-poster')
        let mainBottomListsRowsCardTitle = el('p','main_bottom_lists_rows_card-title')
        let mainBottomListsRowsCardDuration = el('div','main_bottom_lists_rows_card-duration')
        let mainBottomListsRowsCardProgresDurationBox = el('div','main_bottom_lists_rows_card_progres-duration-box')
        let mainBottomListsRowsCardProgresDuration = el('div','main_bottom_lists_rows_card_progres-duration')
        let favoriteImage = el('img','favorite-img')

        if (data.data) {
            mainBottomListsRowsCardBox.classList.add(data.data.class)
        }

        mainBottomListsRowsCardBox.classList.add(cardClass)
        mainBottomListsRowsCardTitle.textContent = message.title
        mainBottomListsRowsCardPoster.src = message.image
        mainBottomListsRowsCardDuration.textContent = num + 'min'
        favoriteImage.src = 'favorit.jpg'

        mainBottomListsRowsCardPoster.onload = ()=> {
            if (document.querySelector('.main_bottom_shimer-content-box')) {
                document.querySelector('.main_bottom_shimer-content-box').remove()
            }
        }
        mainBottomListsRowsCardBox.onclick = ()=> {
            document.body.append(videoLoading())
            bottomListCardClick(mainBottomListsRowsCardBox,message,data)
            document.querySelector('.categ-video').style.display = 'none'
        }

        mainBottomListsRowsCardBox.append(mainBottomListsRowsCardPoster)
        mainBottomListsRowsCardBox.append(mainBottomListsRowsCardTitle)
        mainBottomListsRowsCardBox.append(mainBottomListsRowsCardDuration)

        if (mainBottomListsRowsCardBox.classList.contains('favorit-card')) {
            mainBottomListsRowsCardBox.append(favoriteImage)
        }
                
        if (mainBottomListsRowsCardBox.classList.contains('continue-card')) {
            mainBottomListsRowsCardBox.append(mainBottomListsRowsCardProgresDurationBox)
            mainBottomListsRowsCardProgresDurationBox.append(mainBottomListsRowsCardProgresDuration)
            mainBottomListsRowsCardProgresDuration.style.width = message.progresDuration
        }

        return mainBottomListsRowsCardBox
}

function bottomListCardClick(mainBottomListsRowsCardBox,message,data) {
    if (mainBottomListsRowsCardBox.classList.contains('home-card')) {
        homeCardClick(mainBottomListsRowsCardBox,message,data)
    }else if (mainBottomListsRowsCardBox.classList.contains('similar-card')) {
        similarCardClick(mainBottomListsRowsCardBox,message,data)
    }else if (mainBottomListsRowsCardBox.classList.contains('categories-card')) {
        categoriesCardClick(mainBottomListsRowsCardBox,message,data)
    }else if (mainBottomListsRowsCardBox.classList.contains('search-card')) {
        searchCardClick(mainBottomListsRowsCardBox,message,data)
    }
}

function homeCardClick(mainBottomListsRowsCardBox,message,data) {
    removeActiveScale(document.querySelectorAll('.main_bottom_lits_rows_card-box'))
    document.querySelector('.parent').style.display = 'none'

    if (document.querySelector('.categ-videos-box')) {
        document.querySelector('.categ-videos-box').remove()
    }
    
    document.body.append(renderCategVideos(message,mainBottomListsRowsCardBox))
    mainBottomListsRowsCardBox.classList.add('active-scale')

    renderSimilarChanselss(moviesRowsData,mainBottomListsRowsCardBox)
    controls.privius = controls.select
    controls.select = controls.loading
}

function similarCardClick(mainBottomListsRowsCardBox,message,data) {
    document.querySelector('.parent').style.display = 'none'
    if (document.querySelector('.categ-videos-box')) {
        document.querySelector('.categ-videos-box').remove()
    }
    document.body.append(renderCategVideos(message,mainBottomListsRowsCardBox))

    renderSimilarChanselss(data,mainBottomListsRowsCardBox)

    controls.similarChannels.index = 0
    controls.select = controls.loading
}

function categoriesCardClick(mainBottomListsRowsCardBox,message,data) {
    document.querySelector('.parent').style.display = 'none'

    if (document.querySelector('.categ-videos-box')) {
        document.querySelector('.categ-videos-box').remove()
    }
    
    document.body.append(renderCategVideos(message,mainBottomListsRowsCardBox))

    renderSimilarChanselss(data,mainBottomListsRowsCardBox)
    controls.privius = controls.select
    controls.select = controls.loading
}

function searchCardClick(mainBottomListsRowsCardBox,message,data) {
    document.querySelector('.parent').style.display = 'none'

    if (document.querySelector('.categ-videos-box')) {
        document.querySelector('.categ-videos-box').remove()
    }
    
    document.body.append(renderCategVideos(message,mainBottomListsRowsCardBox))

    renderSimilarChanselss(moviesRowsData,mainBottomListsRowsCardBox)
    controls.privius = controls.select
    controls.select = controls.loading
}
 
function getMainBottomListsData() {
    Promise.all([
        req('get','https://cdn.jwplayer.com/v2/playlists/S8V8UBwR?page_limit=25',{}),
        req('get','https://cdn.jwplayer.com/v2/playlists/jTXlVWkY?page_limit=25',{}),
        req('get','https://cdn.jwplayer.com/v2/playlists/noQVdQTG?page_limit=25',{}),
        req('get','https://cdn.jwplayer.com/v2/playlists/OgZkEvmg?page_limit=25',{}),
        req('get','https://cdn.jwplayer.com/v2/playlists/xyFRH8vZ?page_limit=25',{})
    ]).then((res)=> {
        mainBottomLIstsData = res
        if (localStorage.getItem('data')) {
           mainBottomLIstsData = JSON.parse(localStorage.getItem('data'))
        }
        console.log(mainBottomLIstsData);
        renderMainBottomLists(mainBottomLIstsData)
    })
    .catch((err)=> {
        console.log(err);
    })
}

function renderMainBottomListsShimmer() {
    let mainBottomShimerContentBox = el('div','main_bottom_shimer-content-box')
    for (let i = 0; i < 5; i++) {
        let mainBottomShimerBox = el('div','main_bottom_shimer-box')
        let mainBottomShimerTitle = el('p','main_bottom_shimer-title')
        mainBottomShimerTitle.classList.add('shimmer')
        let mainBottomShimerRowsBox = el('div','main_bottom_shimer_rows-box')


        mainBottomShimerBox.append(mainBottomShimerTitle)
        mainBottomShimerBox.append(mainBottomShimerRowsBox)

        mainBottomShimerContentBox.append(mainBottomShimerBox)

        for (let j = 0; j < 5; j++) {
            let mainBottomShimerRowsCardBox = el('div','main_bottom_shimer_rows_card-box')
            mainBottomShimerRowsCardBox.classList.add('shimmer')
            mainBottomShimerRowsBox.append(mainBottomShimerRowsCardBox)
        }
    }
    return mainBottomShimerContentBox
}

function removeActiveScale(mainBottomListsRowsCardBox) {
    for (let i = 0; i < mainBottomListsRowsCardBox.length; i++) {
        mainBottomListsRowsCardBox[i].classList.remove('active-scale')        
    }
}