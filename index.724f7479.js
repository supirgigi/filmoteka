function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){i[e]=t},t.parcelRequired7c6=o),o("epB3k"),o("krGWQ"),o("bMZn5");var s=o("epB3k"),r=o("krGWQ"),a=o("kFh99"),d=o("2nhTy"),c=o("9L75J"),l=o("ioBS9"),u=o("eyjy7"),g=o("bMZn5");o("ftYLF"),(0,u.onAuthStateChanged)(g.auth,(e=>{e?(console.log("user logged in: ",e),r.refs.authSignOut.parentElement.classList.remove("hidden"),r.refs.authOpen.parentElement.classList.add("hidden")):(console.log("user logged out"),r.refs.authSignOut.parentElement.classList.add("hidden"),r.refs.authOpen.parentElement.classList.remove("hidden"))})),l.spinner.show(),s.movieApi.getTrending().then((e=>{console.log(e.results),d.paginationSettings.maxPages=e.total_pages,console.log(d.paginationSettings),(0,d.initializePagination)();const t=e.results.map(a.dataFormat).map(c.cardTemplate).join("");r.refs.movieList.innerHTML=t,l.spinner.close()})),r.refs.pagination.classList.remove("visually-hidden");s=o("epB3k"),r=o("krGWQ"),a=o("kFh99"),c=o("9L75J"),d=o("2nhTy"),l=o("ioBS9");var f=o("eWCmQ");r.refs.searchForm.addEventListener("submit",(function(t){t.preventDefault();const n=t.currentTarget.elements.search.value;if(""===n)return void document.querySelector(".error-msg").classList.remove("transparent");n!==s.movieApi.query&&(s.movieApi.query=n);l.spinner.show(),d.paginationSettings.paginationType="search",console.log(d.paginationSettings.paginationType),s.movieApi.resetPage(),s.movieApi.searchMovies().then((t=>{if(0===t.results.length)return e(f).Notify.failure("No matches"),void l.spinner.close();console.log(t),d.paginationSettings.maxPages=t.total_pages,console.log(d.paginationSettings),(0,d.initializePagination)();const n=t.results.map(a.dataFormat).map(c.cardTemplate).join("");r.refs.movieList.innerHTML=n,l.spinner.close()}))})),o("2nhTy");r=o("krGWQ"),s=o("epB3k"),a=o("kFh99"),g=o("bMZn5"),c=o("9L75J");var p=o("ftYLF");f=o("eWCmQ");let v,m,h;function L(){r.refs.backdrop.classList.toggle("is-hidden"),r.refs.body.classList.toggle("locked"),window.removeEventListener("keydown",y),r.refs.modalCloseBtn.removeEventListener("click",L),r.refs.backdrop.removeEventListener("click",k),v.removeEventListener("click",w),m.removeEventListener("click",E)}function y(e){console.log(e.code),"Escape"===e.code&&L()}function k(e){e.target===e.currentTarget&&L()}async function w(){if(!g.auth.currentUser)return void e(f).Notify.failure("Please sign in");const t=await(0,p.getDoc)((0,p.doc)(g.db,"users",g.auth.currentUser.uid)).then((e=>e.data()));console.log(t);const{userId:n,watchedMovies:i,queuedMovies:o,userEmail:s}=t;i.find((e=>e.id===h.id))?e(f).Notify.failure("Already in collection"):(i.push(h),await(0,p.setDoc)((0,p.doc)(g.db,"users",g.auth.currentUser.uid),{userId:n,userEmail:s,watchedMovies:i,queuedMovies:o}),e(f).Notify.success("Added to watched"))}async function E(){if(!g.auth.currentUser)return void e(f).Notify.failure("Please sign in");const t=await(0,p.getDoc)((0,p.doc)(g.db,"users",g.auth.currentUser.uid)).then((e=>e.data()));console.log(t);const{userId:n,watchedMovies:i,queuedMovies:o,userEmail:s}=t;o.find((e=>e.id===h.id))?e(f).Notify.failure("Already in collection"):(o.push(h),await(0,p.setDoc)((0,p.doc)(g.db,"users",g.auth.currentUser.uid),{userId:n,userEmail:s,watchedMovies:i,queuedMovies:o}),e(f).Notify.success("Added to queue"))}r.refs.movieList.addEventListener("click",(function(e){if(e.target===e.currentTarget)return;const t=e.target.closest("li");s.movieApi.id=t.dataset.id,s.movieApi.getMovie().then((e=>{const t=(0,a.dataFormat)(e);h=t,console.log(h);const n=(0,c.selectedMovieTemplate)(t);r.refs.movieModal.innerHTML=n,v=document.querySelector("[data-watched-add]"),m=document.querySelector("[data-queue-add]"),v.addEventListener("click",w),m.addEventListener("click",E),r.refs.backdrop.classList.toggle("is-hidden"),r.refs.body.classList.toggle("locked"),r.refs.modalCloseBtn.addEventListener("click",L),window.addEventListener("keydown",y),r.refs.backdrop.addEventListener("click",k)}))})),o("hMaZ9"),o("ioBS9");
//# sourceMappingURL=index.724f7479.js.map
