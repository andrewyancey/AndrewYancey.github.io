const contactOverlay = document.querySelector('.overlay');
const form = document.querySelector(".contact-me");
const _debug = false;

function showContactBox() {
    if (contactOverlay.classList.contains("hidden")) {
        contactOverlay.classList.remove("hidden");
    }
}

function hideContactBox() {
    if (!contactOverlay.classList.contains("hidden")) {
        contactOverlay.classList.add("hidden");
    }
}

function handleContactClick(event) {
    showContactBox();
}

function handleContactOverlayClick(event) {
    if (event.target === event.currentTarget) {
        hideContactBox();
    }
}

function handleKeyPress(event) {
    if (event.key === "Escape") handleEscapeKey(event);
}

function handleEscapeKey(event) {
    if (!contactOverlay.classList.contains("hidden")) {
        hideContactBox();
    }
}

function submissionSuccess() {
    const contactForm = document.querySelector(".contact-me");
    const thanksBox = document.querySelector(".thanks-box");

    contactForm.classList.add("hidden");
    thanksBox.classList.remove("hidden");
}

async function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(form);
    let response = {};
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

function addListeners() {
    form.addEventListener("submit", submitForm);
    document.addEventListener("keydown", handleKeyPress);
}

addListeners();