export function cardTemplate({ poster_path, release_date, genres, id, title }) {
  return `
      <li class="card" data-id="${id}">
          <img src="${poster_path}" alt="${title} poster" class="card__img" />
          <div class="card-info">
            <h3 class="card-info__title">${title}</h3>
            <ul class="card-descr">
                <li class="card-descr__item">${genres}</li>
                <li class="card-descr__item">${release_date}</li>
            </ul>
          </div>
        </li> 
      `;
}

export function cardLibraryTemplate({
  poster_path,
  release_date,
  genres,
  id,
  title,
  vote_average,
}) {
  return `
        <li class="card" data-id="${id}">
            <img src="${poster_path}" alt="${title} poster" class="card__img" />
            <div class="card-info">
              <h3 class="card-info__title">${title}</h3>
              <ul class="card-descr">
                <li class="card-descr__item">${genres}</li>
                <li class="card-descr__item">${release_date}</li>
                <li class="card-descr__rating">${vote_average}</li>
              </ul>
            </div>
          </li> 
        `;
}

export function selectedMovieTemplate({
  original_title,
  title,
  poster_path,
  id,
  full_genres,
  vote_average,
  vote_count,
  popularity,
  overview,
}) {
  return `
            <img src="${poster_path}" alt="${title} poster" class="modal-card__img" />
            <div class="modal-card-info">
              <h3 class="modal-card-info__title">${title}</h3>
              <table class="modal-card-table">
                  <tbody>
                      <tr class="modal-card-table__row">
                          <td class="modal-card-table__header">Vote / Votes</td>
                          <td class="modal-card-table__descr"><span class="modal-card-votes">${vote_average}</span><span class="modal-card-slash">/</span> ${vote_count}</td>
                      </tr>
                      <tr class="modal-card-table__row">
                          <td class="modal-card-table__header">Popularity</td>
                          <td class="modal-card-table__descr">${popularity}</td>
                      </tr>
                      <tr class="modal-card-table__row">
                          <td class="modal-card-table__header">Original Title</td>
                          <td class="modal-card-table__descr">${original_title}</td>
                      </tr>
                      <tr class="modal-card-table__row">
                          <td class="modal-card-table__header">Genre</td>
                          <td class="modal-card-table__descr">${full_genres}</td>
                      </tr>
                  </tbody>
              </table>
              <div class="modal-card-about">
                  <p class="modal-card-about__title">About</p>
                  <p class="modal-card-about__text">${overview}</p>
              </div>
              <ul class="modal-card-buttons">
                  <li class="modal-card-buttons__item">
                      <button class="watched-btn" data-watched-add>add to Watched</button>
                  </li>
                  <li class="modal-card-buttons__item">
                      <button class="queue-btn" data-queue-add>add to queue</button>
                  </li>
              </ul>
            </div>
        `;
}

export function selectedWatchedTemplate({
  original_title,
  title,
  poster_path,
  id,
  full_genres,
  vote_average,
  vote_count,
  popularity,
  overview,
}) {
  return `
              <img src="${poster_path}" alt="${title} poster" class="modal-card__img" />
              <div class="modal-card-info">
                <h3 class="modal-card-info__title">${title}</h3>
                <table class="modal-card-table">
                    <tbody>
                        <tr class="modal-card-table__row">
                            <td class="modal-card-table__header">Vote / Votes</td>
                            <td class="modal-card-table__descr"><span class="modal-card-votes">${vote_average}</span><span class="modal-card-slash">/</span> ${vote_count}</td>
                        </tr>
                        <tr class="modal-card-table__row">
                            <td class="modal-card-table__header">Popularity</td>
                            <td class="modal-card-table__descr">${popularity}</td>
                        </tr>
                        <tr class="modal-card-table__row">
                            <td class="modal-card-table__header">Original Title</td>
                            <td class="modal-card-table__descr">${original_title}</td>
                        </tr>
                        <tr class="modal-card-table__row">
                            <td class="modal-card-table__header">Genre</td>
                            <td class="modal-card-table__descr">${full_genres}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="modal-card-about">
                    <p class="modal-card-about__title">About</p>
                    <p class="modal-card-about__text">${overview}</p>
                </div>
                <button class="watched-btn" data-watched-remove>Remove from watched</button>
              </div>
          `;
}

export function selectedQueueTemplate({
  original_title,
  title,
  poster_path,
  id,
  full_genres,
  vote_average,
  vote_count,
  popularity,
  overview,
}) {
  return `
                <img src="${poster_path}" alt="${title} poster" class="modal-card__img" />
                <div class="modal-card-info">
                  <h3 class="modal-card-info__title">${title}</h3>
                  <table class="modal-card-table">
                      <tbody>
                          <tr class="modal-card-table__row">
                              <td class="modal-card-table__header">Vote / Votes</td>
                              <td class="modal-card-table__descr"><span class="modal-card-votes">${vote_average}</span><span class="modal-card-slash">/</span> ${vote_count}</td>
                          </tr>
                          <tr class="modal-card-table__row">
                              <td class="modal-card-table__header">Popularity</td>
                              <td class="modal-card-table__descr">${popularity}</td>
                          </tr>
                          <tr class="modal-card-table__row">
                              <td class="modal-card-table__header">Original Title</td>
                              <td class="modal-card-table__descr">${original_title}</td>
                          </tr>
                          <tr class="modal-card-table__row">
                              <td class="modal-card-table__header">Genre</td>
                              <td class="modal-card-table__descr">${full_genres}</td>
                          </tr>
                      </tbody>
                  </table>
                  <div class="modal-card-about">
                      <p class="modal-card-about__title">About</p>
                      <p class="modal-card-about__text">${overview}</p>
                  </div>
                  <button class="queue-btn" data-queue-remove>Remove from queue</button>
                </div>
            `;
}
