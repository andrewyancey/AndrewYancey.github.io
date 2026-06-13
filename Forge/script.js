const accordionTriggers = document.querySelectorAll(".accordion-trigger");

accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        accordionTriggers.forEach((otherTrigger) => {
            const otherContent = document.getElementById(
                otherTrigger.getAttribute("aria-controls")
            );

            otherTrigger.setAttribute("aria-expanded", "false");
            otherContent.hidden = true;
        });

        if (!isOpen) {
            const content = document.getElementById(
                trigger.getAttribute("aria-controls")
            );

            trigger.setAttribute("aria-expanded", "true");
            content.hidden = false;
        }
    });
});
