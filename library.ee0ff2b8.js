!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){i[e]=t},t.parcelRequired7c6=r),r("fkvfI"),r("4Nugj"),r("euqRf");var a=r("bpxeT"),s=r("2TvXO"),o=r("4Nugj"),c=r("6m2hf"),u=r("jcFG7"),d=r("fkvfI"),p=r("bXAnp"),l=(u=r("jcFG7"),r("iU1Pc")),g=r("4smAb"),f=r("gQOBw"),v=r("euqRf"),m=document.querySelector("[data-watched]"),h=document.querySelector("[data-queue]");function b(){return y.apply(this,arguments)}function y(){return(y=e(a)(e(s).mark((function t(){return e(s).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(v.auth.currentUser){t.next=3;break}return e(l).Notify.failure("Please sign in"),t.abrupt("return");case 3:d.movieApi.resetPage(),o.refs.movieList.innerHTML="",m.classList.add("library-btns__btn_current"),h.classList.remove("library-btns__btn_current"),u.paginationSettings.paginationType="watched",w();case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function L(){return(L=e(a)(e(s).mark((function t(){return e(s).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(v.auth.currentUser){t.next=3;break}return e(l).Notify.failure("Please sign in"),t.abrupt("return");case 3:d.movieApi.resetPage(),o.refs.movieList.innerHTML="",m.classList.remove("library-btns__btn_current"),h.classList.add("library-btns__btn_current"),u.paginationSettings.paginationType="queue",S();case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function w(){(0,c.onSnapshot)((0,c.doc)(v.db,"users",v.auth.currentUser.uid),(function(e){g.spinner.show();var t=e.data().watchedMovies;u.paginationSettings.maxPages=Math.ceil(t.length/u.paginationSettings.perPage);var n=t.filter((function(e,t){return t<d.movieApi.page*u.paginationSettings.perPage&&t>=d.movieApi.page*u.paginationSettings.perPage-u.paginationSettings.perPage}));0===n.length&&(console.log("empty"),d.movieApi.page-=1,n=t.filter((function(e,t){return t<d.movieApi.page*u.paginationSettings.perPage&&t>=d.movieApi.page*u.paginationSettings.perPage-u.paginationSettings.perPage}))),console.log(n);var i=n.map(p.cardLibraryTemplate).join("");o.refs.movieList.innerHTML=i,(0,u.initializePagination)(),g.spinner.close()}))}function S(){(0,c.onSnapshot)((0,c.doc)(v.db,"users",v.auth.currentUser.uid),(function(e){g.spinner.show();var t=e.data().queuedMovies;u.paginationSettings.maxPages=Math.ceil(t.length/u.paginationSettings.perPage);var n=t.filter((function(e,t){return t<d.movieApi.page*u.paginationSettings.perPage&&t>=d.movieApi.page*u.paginationSettings.perPage-u.paginationSettings.perPage}));0===n.length&&(console.log("empty"),d.movieApi.page--,n=t.filter((function(e,t){return t<d.movieApi.page*u.paginationSettings.perPage&&t>=d.movieApi.page*u.paginationSettings.perPage-u.paginationSettings.perPage}))),console.log(n);var i=n.map(p.cardLibraryTemplate).join("");o.refs.movieList.innerHTML=i,(0,u.initializePagination)(),g.spinner.close()}))}(0,f.onAuthStateChanged)(v.auth,(function(e){e?(console.log("user logged in: ",e),o.refs.authSignOut.parentElement.classList.remove("hidden"),o.refs.authOpen.parentElement.classList.add("hidden"),b()):(console.log("user logged out"),o.refs.authSignOut.parentElement.classList.add("hidden"),o.refs.authOpen.parentElement.classList.remove("hidden"),o.refs.pagination.classList.add("visually-hidden"))})),m.addEventListener("click",b),h.addEventListener("click",(function(){return L.apply(this,arguments)})),r("jcFG7");a=r("bpxeT"),s=r("2TvXO"),o=r("4Nugj"),d=r("fkvfI");var k,P,T,E=r("Db1qJ");v=r("euqRf"),p=r("bXAnp"),c=r("6m2hf"),u=r("jcFG7"),l=r("iU1Pc");function x(){return A.apply(this,arguments)}function A(){return(A=e(a)(e(s).mark((function t(){var n;return e(s).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,c.getDoc)((0,c.doc)(v.db,"users",v.auth.currentUser.uid)).then((function(e){return e.data()}));case 2:return n=(n=t.sent.queuedMovies).filter((function(e){return e.id!==T.id})),t.next=6,(0,c.updateDoc)((0,c.doc)(v.db,"users",v.auth.currentUser.uid),{queuedMovies:n}).then((function(){_(),e(l).Notify.success("Removed successfully")}));case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function M(){return q.apply(this,arguments)}function q(){return(q=e(a)(e(s).mark((function t(){var n;return e(s).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,c.getDoc)((0,c.doc)(v.db,"users",v.auth.currentUser.uid)).then((function(e){return e.data()}));case 2:return n=(n=t.sent.watchedMovies).filter((function(e){return e.id!==T.id})),t.next=6,(0,c.updateDoc)((0,c.doc)(v.db,"users",v.auth.currentUser.uid),{watchedMovies:n}).then((function(){_(),e(l).Notify.success("Removed successfully")}));case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function _(){o.refs.backdrop.classList.toggle("is-hidden"),o.refs.body.classList.toggle("locked"),window.removeEventListener("keydown",U),o.refs.modalCloseBtn.removeEventListener("click",_),o.refs.backdrop.removeEventListener("click",N),k?k.removeEventListener("click",M):P.removeEventListener("click",x)}function U(e){e.code="ESC",_()}function N(e){e.target===e.currentTarget&&_()}o.refs.movieList.addEventListener("click",(function(t){if(t.target===t.currentTarget)return;var n=t.target.closest("li");d.movieApi.id=n.dataset.id;try{d.movieApi.getMovie().then((function(e){var t,n=(0,E.dataFormat)(e);T=n,console.log(T),"watched"===u.paginationSettings.paginationType?(t=(0,p.selectedWatchedTemplate)(n),o.refs.movieModal.innerHTML=t,(k=document.querySelector("[data-watched-remove]")).addEventListener("click",M)):(t=(0,p.selectedQueueTemplate)(n),o.refs.movieModal.innerHTML=t,(P=document.querySelector("[data-queue-remove]")).addEventListener("click",x)),o.refs.backdrop.classList.toggle("is-hidden"),o.refs.body.classList.toggle("locked"),o.refs.modalCloseBtn.addEventListener("click",_),window.addEventListener("keydown",U),o.refs.backdrop.addEventListener("click",N)}))}catch(t){e(l).Notify.failure(t.message)}})),r("2yGCU"),r("4smAb")}();
//# sourceMappingURL=library.ee0ff2b8.js.map
