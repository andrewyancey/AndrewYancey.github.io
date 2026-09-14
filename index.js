const contactDialog = document.querySelector('#contact-dialog');
const form = document.querySelector(".contact-me");
const nextButton = document.querySelector("#carousel-next");
const previousButton = document.querySelector("#carousel-previous");
const _debug = false;
let carouselIndicators = document.querySelectorAll(".carousel-indicator");
const selectedSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="carousel-indicator carousel-selected" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/>
</svg>`;
const unselectedSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="carousel-indicator"
          viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        </svg>`;
let indicatorIndex = 0;
let previousIndicator = 0;

function showContactBox() {
    if (!contactDialog.open) {
        contactDialog.showModal();
    }
}

function hideContactBox() {
    if (contactDialog.open) {
        contactDialog.close();
    }
}

function handleContactClick() {
    showContactBox();
}

function handleContactOverlayClick(event) {
    if (event.target === event.currentTarget) {
        hideContactBox();
    }
}


function handleNextButton(event) {
    const next = document.querySelector(".carousel-next-pos");
    const active = document.querySelector(".carousel-active-pos");
    const prev = document.querySelector(".carousel-previous-pos");

    next.classList.add("carousel-active-pos");
    next.classList.remove("carousel-next-pos");
    active.classList.add("carousel-previous-pos");
    active.classList.remove("carousel-active-pos");
    prev.classList.add("carousel-next-pos");
    prev.classList.remove("carousel-previous-pos");
    setSelectedIndicator(indicatorIndex - 1);
}

function handlePreviousButton(event) {
    const next = document.querySelector(".carousel-next-pos");
    const active = document.querySelector(".carousel-active-pos");
    const prev = document.querySelector(".carousel-previous-pos");

    next.classList.add("carousel-previous-pos");
    next.classList.remove("carousel-next-pos");
    active.classList.add("carousel-next-pos");
    active.classList.remove("carousel-active-pos");
    prev.classList.add("carousel-active-pos");
    prev.classList.remove("carousel-previous-pos");
    setSelectedIndicator(indicatorIndex + 1);
}

function submissionSuccess() {
    const contactForm = document.querySelector(".contact-me");
    const thanksBox = document.querySelector(".thanks-box");

    contactForm.classList.add("hidden");
    thanksBox.classList.remove("hidden");

    contactDialog.setAttribute("aria-labelledby", "success-title");
    document.querySelector("#success-close").focus();
}

async function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(form);
    let response = {};
    try {
        if (_debug === true) {
            console.log("Debug mode: form submission skipped");
            response = {
                ok: true,
                status: "200"
            };
        } else {
            response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });
        }

        if (response.ok) {
            form.reset();
            submissionSuccess();
        } else {
            alert("something went wrong. Please try again later.");
            hideContactBox();
        }
    }
    catch (error) {
        alert("Unable to process your request. Please check your internet connection and try again.");
    }
}

function addListeners() {
    form.addEventListener("submit", submitForm);
    nextButton.addEventListener("click", handleNextButton);
    previousButton.addEventListener("click", handlePreviousButton);
}

function setSelectedIndicator(index) {
    previousIndicator = indicatorIndex;
    indicatorIndex = clampIndicators(index);;
    carouselIndicators[indicatorIndex].outerHTML = selectedSVG;
    carouselIndicators[previousIndicator].outerHTML = unselectedSVG;
    carouselIndicators = document.querySelectorAll(".carousel-indicator");
}

function clampIndicators(index) {
    if (index < 0) {
        return carouselIndicators.length - 1;
    } else if (index >= carouselIndicators.length) {
        return 0;
    } else {
        return index;
    }
}

function pageInit() {
    setSelectedIndicator(indicatorIndex);
};

addListeners();
pageInit();