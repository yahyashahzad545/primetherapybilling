export const THANK_YOU_PATH = "/thank-you";

// Sends the visitor to the thank-you page after a form is submitted.
// A full page load (not a client-side route change) so any open popup or modal closes with it;
// the page they came from stays in the browser history, so Back returns them to it.
export function goToThankYou() {
  window.location.assign(THANK_YOU_PATH);
}
