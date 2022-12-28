import * as basicLightbox from 'basiclightbox';

const markup = `
  <div class="preloader">
    <div class="preloader__row">
      <div class="preloader__item"></div>
      <div class="preloader__item"></div>
    </div>
  </div>
`;

export const spinner = basicLightbox.create(markup);
