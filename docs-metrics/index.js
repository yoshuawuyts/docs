const signupNavSub = document.querySelector('#signup-nav-sub')
const signupFooterSub = document.querySelector('#signup-footer-sub')
const newsletterJoin = document.querySelector('#newsletter-join')

if (signupNavSub) signupNavSub.onclick = trackSignupClick
if (signupFooterSub) signupFooterSub.onclick = trackSignupClick
if (newsletterJoin) newsletterJoin.onclick = trackCorporateClick

// sign up clicks on sub pages
// obj -> obj
function trackSignupClick (e) {
  const buttonId = e.target.getAttribute('id')
  const pageId = document.querySelector('body').getAttribute('id')
  return client.trackExternalLink(event, 'signup_click', {id: buttonId, page: pageId})
}

// external links
// obj -> obj
function trackCorporateClick (e) {
  const buttonId = e.target.getAttribute('id')
  const pageId = document.querySelector('body').getAttribute('id')
  return client.trackExternalLink(event, "corporate_click", {id: buttonId, page: pageId})
}
