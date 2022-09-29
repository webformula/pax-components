const observer = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.target.nodeName === 'FORM') modifyForm(mutation.target);

    const form = mutation.target.querySelector('form');
    if (form) modifyForm(form);
  }
});

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
  observer.observe(document.body, { childList: true, subtree: true });

  // observer will not catch the initial load of the page
  [...document.querySelectorAll('form')].forEach(modifyForm);
}


// manually call report validity on inputs because we are prevent the default behavior (to not show tool tip)
function modifyForm(form) {
  const originalReportValidity = form.reportValidity;
  form.reportValidity = () => {
    const valid = originalReportValidity.call(form);
    // TODO make sure this does not need to trigger other elements
    [...form.querySelectorAll('input')].forEach(el => el.reportValidity());
    return valid;
  };
}
