const portrait = document.querySelector(".portrait-trigger");
const modal = document.querySelector(".portrait-modal");
const modalClose = document.querySelector(".modal-close");

if (portrait && modal && modalClose) {
    const openModal = () => {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
    };

    const closeModal = () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
    };

    portrait.addEventListener("click", openModal);
    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}
