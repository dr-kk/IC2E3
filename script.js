//Allowed routes, if more routes needed, update it
const ALLLOWED_ROUTES = [
    '#index.html',
    '#scope.html',
    '#eindhoven.html',
    '#venue.html',
    '#dates.html',
    '#committees.html',
    '#keynotes.html',
    '#forauthors.html',
    '#registration.html',
    '#accommodation.html',
    '#program.html',
    '#socialprogram.html',
    '#contactinformation.html',
    '#partners.html'
]

fetch("components/tweeter_feed.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.getElementById("tweeter-placeholder").innerHTML = data;
    });

fetch("components/navbar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;
    });

fetch("components/sidebar.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.getElementById("sidebar-placeholder").innerHTML = data;
    });

fetch("components/footer.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
    });

window.addEventListener('load', (event) => {
    // render initial content
     loadInitial(event);

    // Ugly timeout to wait for nav-items to be added in the DOM
    // If selected navbar item loses the boldness increase the timeout slightly
     setTimeout(()=> {
         onClickToggleActive();
         getActiveItem();
     }
    , 50);
});

//Change content shown after url/hash change
window.addEventListener('hashchange', function (e) {
    //Change visible content
    let currPage = e.currentTarget.location.hash;
    activeTab(currPage);

    //Update navbar focused item on url changes alone
    let listElements =  document.getElementsByClassName('nav-link');
    Array.from(listElements).map(element => element.classList.remove('active'));
    listElements[Array.from(listElements)
        .map(el => el.getAttribute("href"))
        .findIndex(el=> el === currPage)].classList
        .add('active');
})

/*Intial loading and check ALLOWED_ROUTES.
In case of more routes the ALLOWED_ROUTES array needs to be updated.
*/
function loadInitial(event) {
    let currPage = event.currentTarget.location.hash;

    if (ALLLOWED_ROUTES.indexOf(currPage) === -1) {
        renderHomePage();
    }
      else {
        activeTab(currPage);
    }
}

// Add onclick listener to every list item in navbar
 function  onClickToggleActive() {
    let listElements =  Array.from(document.getElementsByClassName('nav-link'));
    for(let element of listElements) {
        element.onclick = setActiveItem;
    };
}

//Set active list item
function setActiveItem() {
    let listElements =  Array.from(document.getElementsByClassName('nav-link'));
    listElements.map(element => element.classList.remove('active'));
    this.classList.add('active');
}

// Get active item from url
function getActiveItem() {
    let currentLink = window.location.hash;
    let linkElements = document.getElementsByClassName("nav-link");

    if(currentLink.length === 0 ) {
        document.getElementById("home").classList.add('active');
    }

    let currentLinkElement = linkElements[Array.from(linkElements)
    .map(el => el.getAttribute("href"))
    .findIndex(el=> el === currentLink)];

    currentLinkElement.classList.add('active');
}


function renderHomePage() {
    fetch("html/_index.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.getElementById("body-placeholder").innerHTML = data;
        }
    );
}

function activeTab(selectedPage) {
    if (ALLLOWED_ROUTES.indexOf(selectedPage) === -1) {
        renderHomePage();
    } else {
        let contentToFetch = window.location.hash.substring(1);
        fetch(`html/_${contentToFetch}`)
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.getElementById("body-placeholder").innerHTML = data;

            //This is used to change the title on the tab
            page_title = document.getElementsByName("page-title")[0].innerHTML;
            document.querySelector('title').innerHTML = "SEST 2022".concat(' - ', page_title);
        });
    }
}