import{i as l,a as g,S as ne,N as re,P as oe,A as Ie,R as $e}from"./assets/vendor-DdBOpbMR.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const p="/project-CodeWave/assets/sprite-Bwk32YKx.svg";function Se(){const e=document.querySelector(".slider-track"),t=document.querySelectorAll(".slide_active"),s=document.querySelector(".next"),o=document.querySelector(".prev"),r=document.querySelectorAll(".slider-dots li");if(!t.length||!e)return;let n=0;function a(){if(window.innerWidth<768){e.style.transform="none",e.style.transition="none";return}const d=parseFloat(window.getComputedStyle(e).gap)||0,u=t[0].getBoundingClientRect().width+d;e.style.transform=`translateX(-${n*u}px)`,e.style.transition="transform 300ms ease",r.length&&(r.forEach(m=>{m.classList.remove("dot_active"),m.classList.add("dot")}),r[n]&&(r[n].classList.remove("dot"),r[n].classList.add("dot_active")))}function i(){return window.innerWidth>=1440?t.length-1:window.innerWidth>=768?t.length-2:0}s&&s.addEventListener("click",()=>{if(window.innerWidth<768)return;const d=i();n=n>=d?0:n+1,a()}),o&&o.addEventListener("click",()=>{if(window.innerWidth<768)return;const d=i();n=n<=0?d:n-1,a()}),r.length&&r.forEach((d,u)=>{d.addEventListener("click",()=>{if(window.innerWidth<768)return;const m=i();u<=m&&(n=u,a())})}),window.addEventListener("resize",()=>{if(window.innerWidth<768)n=0;else{const d=i();n>d&&(n=d)}a()}),a()}document.addEventListener("DOMContentLoaded",Se);const c=document.querySelector(".desserts-select-wrapper"),B=c.querySelector(".desserts-select-trigger"),Be=c.querySelector(".desserts-select-value"),D=c.querySelector(".desserts-filter"),ae=document.querySelector("[data-categories-loader]"),ie=document.querySelector("[data-list-loader]"),de=document.querySelector(".desserts-list"),$=document.querySelector(".desserts-load-more"),T="https://deserts-store.b.goit.study/api",ce=8;let f=1;document.addEventListener("DOMContentLoaded",Me);$.addEventListener("click",qe);D.addEventListener("click",ke);B.addEventListener("click",Oe);D.addEventListener("click",Pe);document.addEventListener("click",Ae);document.addEventListener("keydown",_e);async function Me(){try{Te(),H(),F();const e=await xe(),t=[{_id:"all",name:"Всі десерти"},...e];Ce(t),document.querySelector(".desserts-filter-button").classList.add("is-active"),Re();const{desserts:s,totalItems:o}=await R(f);if(s.length>0){j(s);const r=document.querySelectorAll(".desserts-card").length;+o>r&&V()}else l.warning({message:"Desserts not found",position:"topRight"})}catch{W()}finally{U()}}async function ke(e){try{if(e.target.nodeName!=="BUTTON")return;const t=e.target.dataset.category;document.querySelectorAll(".desserts-filter-button").forEach(r=>r.classList.remove("is-active")),e.target.classList.add("is-active"),H(),De(),F(),f=1;const{desserts:s,totalItems:o}=t==="all"?await R(f):await le(t,f);if(s.length>0){j(s);const r=document.querySelectorAll(".desserts-card").length;o>r&&V()}else l.warning({message:"Desserts not found",position:"topRight"})}catch{W()}finally{U()}}async function qe(){try{H(),F(),$.disabled=!0,f++;const e=document.querySelector(".desserts-filter-button.is-active").dataset.category,{desserts:t,totalItems:s}=e==="all"?await R(f):await le(e,f);if(t.length>0){j(t);const o=document.querySelectorAll(".desserts-card").length;+s>o?V():Ne()}}catch{W()}finally{U(),$.disabled=!1}}async function xe(){return(await g(`${T}/categories`)).data}async function le(e,t){const{data:s}=await g(`${T}/desserts`,{params:{page:t,limit:ce,category:e}});return s}async function R(e){const{data:t}=await g(`${T}/desserts`,{params:{limit:ce,page:e}});return t}function Ce(e){const t=e.map(({_id:s,name:o})=>`
    <li class="desserts-filter-item">
      <button class="desserts-filter-button" type="button" data-category="${s}">
        ${o}
      </button>
    </li>
    `).join("");D.insertAdjacentHTML("beforeend",t)}function j(e){const t=e.map(({_id:s,name:o,description:r,price:n,category:a,image:i})=>`          <li class="desserts-card" id="${s}" data-dessert>
            <div class="desserts-card-media">
              <img
                src="${i}"
                alt="${o}"
                class="desserts-card-img"
              />
            </div>
                <p class="desserts-card-category">${a.name}</p>
                <h3 class="desserts-card-title">${o}</h3>
                <p class="desserts-card-text">
                  ${r}
                </p>
              <div class="desserts-card-bottom">
                <p class="desserts-card-price">${n} грн</p>
                <button class="desserts-card-button" type="button" aria-label="Відкрити десерт" data-id="${s}" data-open-modal>
                  <svg class="desserts-card-icon" width="24" height="24">
                    <use href="${p}#icon-arrow_outward"></use>
                  </svg>
                </button>
              </div>
          </li>`).join("");de.insertAdjacentHTML("beforeend",t)}function Pe(e){if(e.target.nodeName!=="BUTTON")return;c.classList.remove("is-open");const t=e.target.textContent;Be.textContent=t,B.setAttribute("aria-expanded","false")}function Oe(){c.classList.toggle("is-open"),B.setAttribute("aria-expanded",c.classList.contains("is-open")?"true":"false")}function Ae(e){c.contains(e.target)||(c.classList.remove("is-open"),B.setAttribute("aria-expanded","false"))}function _e(e){e.key==="Escape"&&(c.classList.remove("is-open"),B.setAttribute("aria-expanded","false"))}function W(){l.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше.",position:"topRight"})}function Ne(){l.info({title:"Інформація",message:"Ви дійшли до кінця списку.",position:"topRight"})}function De(){de.innerHTML=""}function Te(){ae.classList.remove("is-hidden")}function Re(){ae.classList.add("is-hidden")}function H(){ie.classList.remove("is-hidden")}function U(){ie.classList.add("is-hidden")}function V(){$.classList.remove("is-hidden")}function F(){$.classList.add("is-hidden")}const Q=["6852a9fcb459460cb6b47768","6852a9fcb459460cb6b4772b","6852a9fcb459460cb6b47748"];function A(e){const t=e.img||e.imageUrl||e.image||"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",s=e.category||"",o=typeof s=="object"?(s==null?void 0:s.name)||"":s,r=e.price!==void 0?e.price+" грн":"",n=e.description||e.shortDescription||"",a=e._id||e.id;return`
    <div class="dessert-card" data-id="${a}">
      <div class="dessert-card__img">
        <img src="${t}" alt="${e.name}" loading="lazy" width="300" height="200" />
      </div>
      <div class="dessert-card__body">
        ${o?`<div class="dessert-card__category">${o}</div>`:""}
        <h3 class="dessert-card__name">${e.name}</h3>
        ${n?`<p class="dessert-card__desc">${n}</p>`:""}
        <div class="dessert-card__footer">
          <div class="dessert-card__price">${r}</div>
          <button
            class="dessert-card__btn js-open-details"
            data-id="${a}"
            data-open-modal
            aria-label="Детальніше про ${e.name}"
            type="button"
          >
            <svg width="16" height="16" aria-hidden="true">
                <use href="${p}#icon-arrow_outward"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `}const ue=g.create({baseURL:"https://deserts-store.b.goit.study/api"}),me=10;let b=1,pe=0,O=!1,y=null;const fe=e=>ue.get("/desserts",{params:{type:"popular",limit:me,page:e}}).then(t=>t.data),je=e=>ue.get(`/desserts/${e}`).then(t=>t.data),v=document.getElementById("loader");let x=0;function We(){x++,v==null||v.classList.remove("hidden")}function He(){x=Math.max(0,x-1),x===0&&(v==null||v.classList.add("hidden"))}async function _(e){We();try{return await e()}finally{He()}}const ge={position:"topRight",timeout:4e3,transitionIn:"fadeInDown",transitionOut:"fadeOutUp"};function N(e){l.error({title:"Помилка",message:e,...ge})}async function Ue(){if(O)return;if(b*me>=pe){l.info({title:"Інфо",message:"Всі десерти завантажені",...ge});return}O=!0,b++;try{const s=(await _(()=>fe(b))).desserts||[],o=document.getElementById("popularSwiperWrapper");if(!o||!y)return;s.forEach(r=>{const n=document.createElement("div");n.className="swiper-slide",n.innerHTML=A(r),o.appendChild(n)}),y.update(),C(y)}catch(t){N("Помилка підвантаження: "+t.message),b--}finally{O=!1}}async function Ve(){const e=document.getElementById("popularSwiperWrapper");if(!e)return;let t=[];try{t=await _(()=>Promise.all(Q.map(s=>je(s))))}catch{N("Не вдалося завантажити популярні товари");return}e.innerHTML=t.map(s=>`<div class="swiper-slide">${A(s)}</div>`).join(""),y=new ne(".popular-swiper",{modules:[re,oe],slidesPerView:1,watchOverflow:!1,spaceBetween:20,navigation:{prevEl:"#popularPrev",nextEl:"#popularNext",disabledClass:"swiper-button-disabled"},pagination:{el:".popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},breakpoints:{375:{slidesPerView:1},640:{slidesPerView:2},1024:{slidesPerView:3}},on:{init(s){C(s)},slideChange(s){C(s),s.isEnd&&Ue()}}});try{const s=await _(()=>fe(b)),o=(s.desserts||[]).filter(r=>!Q.includes(r._id));pe=s.totalItems||o.length,o.forEach(r=>{const n=document.createElement("div");n.className="swiper-slide",n.innerHTML=A(r),e.appendChild(n)}),y.update(),C(y)}catch{N("Не вдалося завантажити популярні товари")}}function C(e){const t=document.getElementById("popularPrev"),s=document.getElementById("popularNext");!t||!s||(t.disabled=e.isBeginning,s.disabled=e.isEnd)}Ve();new Ie(".accordion-container",{duration:300,showMultiple:!1});const Fe="https://deserts-store.b.goit.study/api/feedbacks/",ze=8;document.querySelectorAll(".icon-arrow use").forEach(e=>{e.setAttribute("href",`${p}#icon-arrow`)});async function Ke(e=1){try{const{data:t}=await g(Fe,{params:{limit:ze,page:e}});return console.log(t),t}catch(t){console.log(t.message)}}const Ge=document.querySelector(".review-list");function Xe(e){const t=e.map(s=>`
      <li class="swiper-slide">
      <div class="review-box">
        <div class="review-rating" data-rate="${s.rate}"></div>
        <p class="review-desc">"${s.description}"</p>
        <p class="review-author">${s.author}</p>
        </div>
      </li>
      `).join("");Ge.insertAdjacentHTML("beforeend",t),Ye()}function Ye(){document.querySelectorAll(".review-rating").forEach(t=>{new $e(t,{starType:"i",number:5,score:Number(t.dataset.rate),readOnly:!0,starOn:"fa-solid fa-star",starOff:"fa-regular fa-star",starHalf:"fa-solid fa-star-half-stroke",half:!0}).init()})}async function Ze(){const e=await Ke();Xe(e.feedbacks),new ne(".review-swiper",{modules:[re,oe],spaceBetween:24,pagination:{el:".review-pagination",clickable:!0,dynamicBullets:!1,renderBullet:function(t,s){return t<6?'<span class="'+s+'"></span>':""}},navigation:{prevEl:".review-btn.prev",nextEl:".review-btn.next"},breakpoints:{375:{slidesPerView:1},768:{slidesPerView:3,spaceBetween:24}}})}Ze();const Je=g.create({baseURL:"https://deserts-store.b.goit.study/api"}),Qe=e=>Je.post("/orders",e).then(t=>t.data),L=document.getElementById("loader");let P=0;function et(){P++,L==null||L.classList.remove("hidden")}function tt(){P=Math.max(0,P-1),P===0&&(L==null||L.classList.add("hidden"))}async function st(e){et();try{return await e()}finally{tt()}}const he={position:"topRight",timeout:4e3,transitionIn:"fadeInDown",transitionOut:"fadeOutUp"};function nt(e){l.success({title:"Успіх",message:e,...he})}function k(e){l.error({title:"Помилка",message:e,...he})}let E=null;function rt(){var o,r,n;const e=document.getElementById("orderOverlay"),t=document.getElementById("orderClose"),s=document.getElementById("orderForm");document.addEventListener("open-order-modal",a=>{var i;E=((i=a.detail)==null?void 0:i.dessertId)||null,ee()}),document.addEventListener("click",a=>{var i,d;a.target.closest(".js-open-order")&&(E=((d=(i=a.target.closest(".js-open-order"))==null?void 0:i.dataset)==null?void 0:d.id)||null,ee())}),t==null||t.addEventListener("click",I),e==null||e.addEventListener("click",a=>{a.target===e&&I()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&!(e!=null&&e.hidden)&&I()}),s==null||s.addEventListener("submit",async a=>{a.preventDefault(),await ot(s)}),(o=document.getElementById("orderName"))==null||o.addEventListener("input",()=>w("orderName","nameError")),(r=document.getElementById("orderPhone"))==null||r.addEventListener("input",()=>w("orderPhone","phoneError")),(n=document.getElementById("orderComment"))==null||n.addEventListener("input",()=>w("orderComment","commentError"))}function ee(){var t;const e=document.getElementById("orderOverlay");e&&(e.hidden=!1,document.body.style.overflow="hidden",(t=document.getElementById("orderName"))==null||t.focus())}function I(){const e=document.getElementById("orderOverlay");e&&(e.hidden=!0,document.body.style.overflow="",ye())}function q(e,t,s){var r;(r=document.getElementById(e))==null||r.classList.add("error");const o=document.getElementById(t);o&&(o.textContent=s,o.style.display="block")}function w(e,t){var o;(o=document.getElementById(e))==null||o.classList.remove("error");const s=document.getElementById(t);s&&(s.textContent="",s.style.display="none")}function ye(){w("orderName","nameError"),w("orderPhone","phoneError"),w("orderComment","commentError")}async function ot(e){var i,d,u,m,G,X,Y,Z;ye();const t=(i=document.getElementById("orderName"))==null?void 0:i.value.trim(),s=(d=document.getElementById("orderComment"))==null?void 0:d.value.trim(),o=(((u=document.getElementById("orderPhone"))==null?void 0:u.value)||"").replace(/\D/g,""),r=/[a-zA-Zа-яА-ЯёЁіІїЇєЄ]/.test(((m=document.getElementById("orderPhone"))==null?void 0:m.value)||"");let n=!0;if((!t||t.length<2)&&(q("orderName","nameError","Введіть коректне ім'я (мінімум 2 символи)"),n=!1),r?(q("orderPhone","phoneError","Телефон має містити лише цифри"),n=!1):o.length!==12&&(q("orderPhone","phoneError",'Введіть рівно 12 цифр без "+". Наприклад: 380961234568. Зараз: '+o.length+" цифр"),n=!1),(!s||s.length<2)&&(q("orderComment","commentError","Введіть коментар (мінімум 2 символи)"),n=!1),!E){k("Спочатку оберіть десерт"),I(),(G=document.getElementById("desserts"))==null||G.scrollIntoView({behavior:"smooth"});return}if(!n)return;const a={name:t,phone:o,dessertId:E,comment:s};try{const h=await st(()=>Qe(a));nt("Замовлення "+(h.orderNum?"Nr"+h.orderNum+" ":"")+"прийнято! Ми зв'яжемося з вами."),e.reset(),I(),E=null}catch(h){const J=(X=h.response)==null?void 0:X.status,Ee=((Z=(Y=h.response)==null?void 0:Y.data)==null?void 0:Z.message)||h.message||"";if(J===400){k('Невірні дані. Телефон має містити рівно 12 цифр без "+". Наприклад: 380961234568.');return}if(J===404){k("Десерт не знайдено.");return}k(Ee||"Сталася помилка. Спробуйте ще раз.")}}rt();const te=document.querySelector(".desserts-list"),se=document.querySelector("#popularSwiperWrapper"),z=document.querySelector(".details-modal-overlay"),M=document.querySelector(".details-modal"),at="https://deserts-store.b.goit.study/api";te&&te.addEventListener("click",ve);se&&se.addEventListener("click",ve);M.addEventListener("click",lt);document.addEventListener("keydown",ut);async function ve(e){try{const t=e.target.closest("[data-open-modal]");if(!t)return;const s=t.dataset.id;z.classList.add("is-open"),document.body.classList.add("no-scroll"),M.innerHTML='<div class="loader" data-details-loader></div>';const o=await it(s);dt(o),setTimeout(()=>{document.addEventListener("click",Le)})}catch{S(),l.error({message:"Не вдалося завантажити інформацію про десерт",position:"topRight"})}}async function it(e){return(await g(`${at}/desserts/${e}`)).data}function dt({_id:e,name:t,description:s,price:o,image:r,composition:n,rate:a}){const i=`      
          <button
        class="details-modal-close"
        type="button"
        data-details-modal-close
        aria-label="Закрити модальне вікно"
      >
        <svg class="details-modal-close-icon" width="24" height="24">
          <use href="${p}#icon-close"></use>
        </svg>
      </button>
  <div class="details-modal-media">
        <img
          src="${r}"
          alt="${t}"
          class="details-modal-img"
        />
      </div>
      <div class="details-modal-content">
        <h2 class="details-modal-title">${t}</h2>
        <p class="details-modal-price">${o} грн</p>
        <ul class="details-modal-rate">
          ${ct(a)}
        </ul>
        <p class="details-modal-text">
          ${s}
        </p>
        <p class="details-modal-ingredients">
          <span class="details-modal-ingredients-accent">Склад</span>: ${n}
        </p>
        <button class="details-modal-button js-open-order" type="button" data-id="${e}">
          Перейти до замовлення
        </button>
      </div>`;M.innerHTML=i}function ct(e){const t=Number(e),s=Math.floor(t),o=t%1!==0,r=5-s-(o?1:0);let n="";for(let a=0;a<s;a++)n+=`
      <li class="details-modal-star">
        <svg class="details-modal-star-icon" width="16" height="15.2">
          <use href="${p}#icon-star"></use>
        </svg>
      </li>`;o&&(n+=`
      <li class="details-modal-star">
        <svg class="details-modal-star-icon" width="16" height="15.2">
          <use href="${p}#icon-half-star"></use>
        </svg>
      </li>`);for(let a=0;a<r;a++)n+=`
      <li class="details-modal-star">
        <svg class="details-modal-empty-star-icon" width="16" height="15.2">
          <use href="${p}#icon-star"></use>
        </svg>
      </li>`;return n}function S(){z.classList.remove("is-open"),document.removeEventListener("click",Le),document.body.classList.remove("no-scroll"),mt()}function lt(e){if(e.target.closest(".js-open-order")){S();return}e.target.closest("[data-details-modal-close]")&&S()}function Le(e){M.contains(e.target)||S()}function ut(e){e.key==="Escape"&&z.classList.contains("is-open")&&S()}function mt(){M.innerHTML=""}const pt=document.querySelector(".open-burger-btn"),K=document.querySelector(".mobile-menu"),we=document.querySelector("[data-open-menu]"),be=document.querySelector("[data-close-menu]");pt.addEventListener("click",ft);K.addEventListener("click",gt);function ft(){document.body.classList.toggle("no-scroll"),K.classList.toggle("is-open"),we.classList.toggle("hidden"),be.classList.toggle("hidden")}function gt(e){e.target.closest("a")&&(document.body.classList.remove("no-scroll"),K.classList.remove("is-open"),we.classList.remove("hidden"),be.classList.add("hidden"))}
//# sourceMappingURL=index.js.map
