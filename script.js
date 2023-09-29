document.getElementById('burger-menu').addEventListener('click', function() {
    const header = document.querySelector('header');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');

    if (header.classList.contains('open')) {
        header.classList.remove('open');
        iconOpen.style.opacity = "1";
        iconClose.style.opacity = "0";
    } else {
        header.classList.add('open');
        iconOpen.style.opacity = "0";
        iconClose.style.opacity = "1";
    }
});

const links = document.querySelectorAll("#navbar .linkMenu");

links.forEach(link => {
    link.addEventListener('click', function() {
        const header = document.querySelector('header');
        const iconOpen = document.getElementById('icon-open');
        const iconClose = document.getElementById('icon-close');

        header.classList.remove('open');
        iconOpen.style.opacity = "1";
        iconClose.style.opacity = "0";
    });
});


document.addEventListener("DOMContentLoaded", function() {

    const skillItems = document.querySelectorAll('.skillItem');

    skillItems.forEach((item) => {

        item.addEventListener('mouseover', function() {

            // Flouter les éléments précédents
            let prevElem = this.previousElementSibling;
            while(prevElem) {
                prevElem.querySelector('.skillsLogo').style.filter = "blur(3px)";
                prevElem = prevElem.previousElementSibling;
            }

            // Flouter les éléments suivants
            let nextElem = this.nextElementSibling;
            while(nextElem) {
                nextElem.querySelector('.skillsLogo').style.filter = "blur(3px)";
                nextElem = nextElem.nextElementSibling;
            }
        });

        item.addEventListener('mouseout', function() {
            // Retirer le flou de tous les éléments lorsqu'on ne survole plus
            skillItems.forEach((siblingItem) => {
                siblingItem.querySelector('.skillsLogo').style.filter = "none";
            });
        });

    });

});

let counter = 0;
let projects = document.querySelectorAll(".divProjet");
let size = getCarouselWidth();
let autoSlideInterval;

// Affiche le premier slide au chargement de la page
projects[counter].style.display = 'flex';

function resetProgressBar() {
    projects.forEach((project) => {
        project.querySelector('.progress-bar').style.width = '0';
    });
}

function startProgressBar() {
    resetProgressBar();
    setTimeout(() => {
        projects[counter].querySelector('.progress-bar').style.width = '100%';
    }, 10); // Ce délai court garantit que la transition CSS commence après la réinitialisation
}


function nextSlide() {
    // Cache la diapositive actuelle
    projects[counter].style.display = 'none';
    resetProgressBar();
    counter++;

    // Boucle vers la première diapositive si on est à la fin
    if (counter >= projects.length) {
        counter = 0;
    }

    // Affiche la diapositive suivante
    projects[counter].style.display = 'flex';
    startProgressBar();
}

function previousSlide() {
    // Cache la diapositive actuelle
    projects[counter].style.display = 'none';
    resetProgressBar();
    counter--;

    // Boucle vers la dernière diapositive si on est au début
    if (counter < 0) {
        counter = projects.length - 1;
    }

    // Affiche la diapositive précédente
    projects[counter].style.display = 'flex';
    startProgressBar();
}

document.getElementById('prevBtn').addEventListener('click', function() {
    // Stoppe le défilement automatique
    clearInterval(autoSlideInterval);
    previousSlide();
    // Redémarre le défilement automatique
    startAutoSlide();
});

document.getElementById('nextBtn').addEventListener('click', function() {
    // Stoppe le défilement automatique
    clearInterval(autoSlideInterval);
    nextSlide();
    // Redémarre le défilement automatique
    startAutoSlide();
});

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Change toutes les 5 secondes
    startProgressBar();
}

// Démarre le défilement automatique et la barre de progression lors du chargement de la page
startAutoSlide();

window.addEventListener('resize', () => {
    size = getCarouselWidth();
});

function getCarouselWidth() {
    return document.querySelector(".carousel-container").clientWidth;
}



window.addEventListener('scroll', function() {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const progressWidth = (scrollPosition / totalHeight) * 100;
    
    document.querySelector('.progress-barBottom').style.width = progressWidth + '%';
});





