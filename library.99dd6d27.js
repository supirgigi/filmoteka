function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},n={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in i)return i[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return i[e]=a,t.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},t.parcelRequired7c6=a),a("epB3k"),a("krGWQ"),a("bMZn5");var s=a("krGWQ"),r=a("ftYLF"),o=a("2nhTy"),d=a("epB3k"),c=a("9L75J"),l=(o=a("2nhTy"),a("eWCmQ")),g=a("ioBS9"),u=a("eyjy7"),p=a("bMZn5");const f=document.querySelector("[data-watched]"),v=document.querySelector("[data-queue]");async function m(){p.auth.currentUser?(d.movieApi.resetPage(),s.refs.movieList.innerHTML="",f.classList.add("library-btns__btn_current"),v.classList.remove("library-btns__btn_current"),o.paginationSettings.paginationType="watched",(0,r.onSnapshot)((0,r.doc)(p.db,"users",p.auth.currentUser.uid),(e=>{g.spinner.show();const{watchedMovies:t}=e.data();o.paginationSettings.maxPages=Math.ceil(t.length/o.paginationSettings.perPage);let i=t.filter(((e,t)=>t<d.movieApi.page*o.paginationSettings.perPage&&t>=d.movieApi.page*o.paginationSettings.perPage-o.paginationSettings.perPage));0===i.length&&(console.log("empty"),d.movieApi.page-=1,i=t.filter(((e,t)=>t<d.movieApi.page*o.paginationSettings.perPage&&t>=d.movieApi.page*o.paginationSettings.perPage-o.paginationSettings.perPage))),console.log(i);const n=i.map(c.cardLibraryTemplate).join("");s.refs.movieList.innerHTML=n,(0,o.initializePagination)(),g.spinner.close()}))):e(l).Notify.failure("Please sign in")}(0,u.onAuthStateChanged)(p.auth,(e=>{e?(console.log("user logged in: ",e),s.refs.authSignOut.parentElement.classList.remove("hidden"),s.refs.authOpen.parentElement.classList.add("hidden"),m()):(console.log("user logged out"),s.refs.authSignOut.parentElement.classList.add("hidden"),s.refs.authOpen.parentElement.classList.remove("hidden"),s.refs.pagination.classList.add("visually-hidden"))})),f.addEventListener("click",m),v.addEventListener("click",(async function(){if(!p.auth.currentUser)return void e(l).Notify.failure("Please sign in");d.movieApi.resetPage(),s.refs.movieList.innerHTML="",f.classList.remove("library-btns__btn_current"),v.classList.add("library-btns__btn_current"),o.paginationSettings.paginationType="queue",(0,r.onSnapshot)((0,r.doc)(p.db,"users",p.auth.currentUser.uid),(e=>{g.spinner.show();const{queuedMovies:t}=e.data();o.paginationSettings.maxPages=Math.ceil(t.length/o.paginationSettings.perPage);let i=t.filter(((e,t)=>t<d.movieApi.page*o.paginationSettings.perPage&&t>=d.movieApi.page*o.paginationSettings.perPage-o.paginationSettings.perPage));0===i.length&&(console.log("empty"),d.movieApi.page--,i=t.filter(((e,t)=>t<d.movieApi.page*o.paginationSettings.perPage&&t>=d.movieApi.page*o.paginationSettings.perPage-o.paginationSettings.perPage))),console.log(i);const n=i.map(c.cardLibraryTemplate).join("");s.refs.movieList.innerHTML=n,(0,o.initializePagination)(),g.spinner.close()}))})),a("2nhTy");s=a("krGWQ"),d=a("epB3k");var h=a("kFh99");p=a("bMZn5"),c=a("9L75J"),r=a("ftYLF"),o=a("2nhTy"),l=a("eWCmQ");let L,y,b;async function S(){let{queuedMovies:t}=await(0,r.getDoc)((0,r.doc)(p.db,"users",p.auth.currentUser.uid)).then((e=>e.data()));t=t.filter((e=>e.id!==b.id)),await(0,r.updateDoc)((0,r.doc)(p.db,"users",p.auth.currentUser.uid),{queuedMovies:t}).then((()=>{w(),e(l).Notify.success("Removed successfully")}))}async function k(){let{watchedMovies:t}=await(0,r.getDoc)((0,r.doc)(p.db,"users",p.auth.currentUser.uid)).then((e=>e.data()));t=t.filter((e=>e.id!==b.id)),await(0,r.updateDoc)((0,r.doc)(p.db,"users",p.auth.currentUser.uid),{watchedMovies:t}).then((()=>{w(),e(l).Notify.success("Removed successfully")}))}function w(){s.refs.backdrop.classList.toggle("is-hidden"),s.refs.body.classList.toggle("locked"),window.removeEventListener("keydown",M),s.refs.modalCloseBtn.removeEventListener("click",w),s.refs.backdrop.removeEventListener("click",P),L?L.removeEventListener("click",k):y.removeEventListener("click",S)}function M(e){e.code="ESC",w()}function P(e){e.target===e.currentTarget&&w()}s.refs.movieList.addEventListener("click",(function(t){if(t.target===t.currentTarget)return;const i=t.target.closest("li");d.movieApi.id=i.dataset.id;try{d.movieApi.getMovie().then((e=>{const t=(0,h.dataFormat)(e);let i;b=t,console.log(b),"watched"===o.paginationSettings.paginationType?(i=(0,c.selectedWatchedTemplate)(t),s.refs.movieModal.innerHTML=i,L=document.querySelector("[data-watched-remove]"),L.addEventListener("click",k)):(i=(0,c.selectedQueueTemplate)(t),s.refs.movieModal.innerHTML=i,y=document.querySelector("[data-queue-remove]"),y.addEventListener("click",S)),s.refs.backdrop.classList.toggle("is-hidden"),s.refs.body.classList.toggle("locked"),s.refs.modalCloseBtn.addEventListener("click",w),window.addEventListener("keydown",M),s.refs.backdrop.addEventListener("click",P)}))}catch(t){e(l).Notify.failure(t.message)}})),a("hMaZ9"),a("ioBS9");
//# sourceMappingURL=library.99dd6d27.js.map