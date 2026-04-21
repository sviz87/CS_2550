/*
Project: Project 5 - Personal Web Site - Visitor Form Validation - Refactor JS
Name: Stefan Vizante
Submitted: 2026-04-20

I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student,
or leaving my code on a public web site constitutes cheating.
I acknowledge that If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.

Reflection: I learned that not every refactor should make the site behave like an app with
fully switched views. In this version, the page script has a smaller role: it reveals the
hidden visitor form section while keeping the rest of the travel site as one continuous page.

The harder part was backing out the broader section switching logic without losing the new
Project 5 requirement for a hidden Log Visit area. I had to keep the form launch behavior
while restoring normal one page anchor navigation for the rest of the site.
*/

(function () {
  function revealVisitSection() {
    const visitSection = document.getElementById("visit");
    if (!(visitSection instanceof HTMLElement)) return;

    visitSection.classList.remove("visit-panel-hidden");
    visitSection.setAttribute("aria-hidden", "false");
    visitSection.classList.add("show");
    visitSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setupVisitToggle() {
    document.querySelectorAll("[data-visit-toggle]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        revealVisitSection();
        window.history.replaceState(null, "", "#visit");
      });
    });
  }

  function restoreVisitFromHash() {
    if (window.location.hash === "#visit") {
      revealVisitSection();
    }
  }

  function init() {
    setupVisitToggle();
    restoreVisitFromHash();
  }

  window.RoadbookPage = {
    init,
    revealVisitSection
  };
})();
