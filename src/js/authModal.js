import { refs } from './refs';

refs.authOpen.addEventListener('click', toggleAuth);
refs.authClose.addEventListener('click', toggleAuth);

function toggleAuth() {
  refs.authModal.classList.toggle('is-hidden');
}
