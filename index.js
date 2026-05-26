import{i as l,a as f,S as te,N as se,P as ne,A as we,R as Le}from"./assets/vendor-DdBOpbMR.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();function be(){const e=document.querySelector(".slider-track"),t=document.querySelectorAll(".slide_active"),s=document.querySelector(".next"),o=document.querySelector(".prev"),r=document.querySelectorAll(".slider-dots li");if(!t.length||!e)return;let n=0;function a(){if(window.innerWidth<768){e.style.transform="none",e.style.transition="none";return}const d=parseFloat(window.getComputedStyle(e).gap)||0,u=t[0].getBoundingClientRect().width+d;e.style.transform=`translateX(-${n*u}px)`,e.style.transition="transform 300ms ease",r.length&&(r.forEach(m=>{m.classList.remove("dot_active"),m.classList.add("dot")}),r[n]&&(r[n].classList.remove("dot"),r[n].classList.add("dot_active")))}function i(){return window.innerWidth>=1440?t.length-1:window.innerWidth>=768?t.length-2:0}s&&s.addEventListener("click",()=>{if(window.innerWidth<768)return;const d=i();n=n>=d?0:n+1,a()}),o&&o.addEventListener("click",()=>{if(window.innerWidth<768)return;const d=i();n=n<=0?d:n-1,a()}),r.length&&r.forEach((d,u)=>{d.addEventListener("click",()=>{if(window.innerWidth<768)return;const m=i();u<=m&&(n=u,a())})}),window.addEventListener("resize",()=>{if(window.innerWidth<768)n=0;else{const d=i();n>d&&(n=d)}a()}),a()}document.addEventListener("DOMContentLoaded",be);const c=document.querySelector(".desserts-select-wrapper"),B=c.querySelector(".desserts-select-trigger"),Ee=c.querySelector(".desserts-select-value"),A=c.querySelector(".desserts-filter"),re=document.querySelector("[data-categories-loader]"),oe=document.querySelector("[data-list-loader]"),ae=document.querySelector(".desserts-list"),I=document.querySelector(".desserts-load-more"),D="https://deserts-store.b.goit.study/api",ie=8;let p=1;document.addEventListener("DOMContentLoaded",Ie);I.addEventListener("click",Be);A.addEventListener("click",$e);B.addEventListener("click",xe);A.addEventListener("click",Me);document.addEventListener("click",Ce);document.addEventListener("keydown",Pe);async function Ie(){try{Ne(),H(),V();const e=await Se(),t=[{_id:"all",name:"Всі десерти"},...e];ke(t),document.querySelector(".desserts-filter-button").classList.add("is-active"),_e();const{desserts:s,totalItems:o}=await T(p);if(s.length>0){R(s);const r=document.querySelectorAll(".desserts-card").length;+o>r&&U()}else l.warning({message:"Desserts not found",position:"topRight"})}catch{j()}finally{W()}}async function $e(e){try{if(e.target.nodeName!=="BUTTON")return;const t=e.target.dataset.category;document.querySelectorAll(".desserts-filter-button").forEach(r=>r.classList.remove("is-active")),e.target.classList.add("is-active"),H(),Oe(),V(),p=1;const{desserts:s,totalItems:o}=t==="all"?await T(p):await de(t,p);if(s.length>0){R(s);const r=document.querySelectorAll(".desserts-card").length;o>r&&U()}else l.warning({message:"Desserts not found",position:"topRight"})}catch{j()}finally{W()}}async function Be(){try{H(),V(),I.disabled=!0,p++;const e=document.querySelector(".desserts-filter-button.is-active").dataset.category,{desserts:t,totalItems:s}=e==="all"?await T(p):await de(e,p);if(t.length>0){R(t);const o=document.querySelectorAll(".desserts-card").length;+s>o?U():qe()}}catch{j()}finally{W(),I.disabled=!1}}async function Se(){return(await f(`${D}/categories`)).data}async function de(e,t){const{data:s}=await f(`${D}/desserts`,{params:{page:t,limit:ie,category:e}});return s}async function T(e){const{data:t}=await f(`${D}/desserts`,{params:{limit:ie,page:e}});return t}function ke(e){const t=e.map(({_id:s,name:o})=>`
    <li class="desserts-filter-item">
      <button class="desserts-filter-button" type="button" data-category="${s}">
        ${o}
      </button>
    </li>
    `).join("");A.insertAdjacentHTML("beforeend",t)}function R(e){const t=e.map(({_id:s,name:o,description:r,price:n,category:a,image:i})=>`          <li class="desserts-card" id="${s}" data-dessert>
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
                    <use href="/img/sprite.svg#icon-arrow_outward"></use>
                  </svg>
                </button>
              </div>
          </li>`).join("");ae.insertAdjacentHTML("beforeend",t)}function Me(e){if(e.target.nodeName!=="BUTTON")return;c.classList.remove("is-open");const t=e.target.textContent;Ee.textContent=t,B.setAttribute("aria-expanded","false")}function xe(){c.classList.toggle("is-open"),B.setAttribute("aria-expanded",c.classList.contains("is-open")?"true":"false")}function Ce(e){c.contains(e.target)||(c.classList.remove("is-open"),B.setAttribute("aria-expanded","false"))}function Pe(e){e.key==="Escape"&&(c.classList.remove("is-open"),B.setAttribute("aria-expanded","false"))}function j(){l.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше.",position:"topRight"})}function qe(){l.info({title:"Інформація",message:"Ви дійшли до кінця списку.",position:"topRight"})}function Oe(){ae.innerHTML=""}function Ne(){re.classList.remove("is-hidden")}function _e(){re.classList.add("is-hidden")}function H(){oe.classList.remove("is-hidden")}function W(){oe.classList.add("is-hidden")}function U(){I.classList.remove("is-hidden")}function V(){I.classList.add("is-hidden")}const J=["6852a9fcb459460cb6b47768","6852a9fcb459460cb6b4772b","6852a9fcb459460cb6b47748"];function O(e){const t=e.img||e.imageUrl||e.image||"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",s=e.category||"",o=typeof s=="object"?(s==null?void 0:s.name)||"":s,r=e.price!==void 0?e.price+" грн":"",n=e.description||e.shortDescription||"",a=e._id||e.id;return`
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 13L13 3M13 3H6M13 3V10"
                stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `}const ce=f.create({baseURL:"https://deserts-store.b.goit.study/api"}),le=10;let L=1,ue=0,q=!1,h=null;const me=e=>ce.get("/desserts",{params:{type:"popular",limit:le,page:e}}).then(t=>t.data),Ae=e=>ce.get(`/desserts/${e}`).then(t=>t.data),y=document.getElementById("loader");let x=0;function De(){x++,y==null||y.classList.remove("hidden")}function Te(){x=Math.max(0,x-1),x===0&&(y==null||y.classList.add("hidden"))}async function N(e){De();try{return await e()}finally{Te()}}const pe={position:"topRight",timeout:4e3,transitionIn:"fadeInDown",transitionOut:"fadeOutUp"};function _(e){l.error({title:"Помилка",message:e,...pe})}async function Re(){if(q)return;if(L*le>=ue){l.info({title:"Інфо",message:"Всі десерти завантажені",...pe});return}q=!0,L++;try{const s=(await N(()=>me(L))).desserts||[],o=document.getElementById("popularSwiperWrapper");if(!o||!h)return;s.forEach(r=>{const n=document.createElement("div");n.className="swiper-slide",n.innerHTML=O(r),o.appendChild(n)}),h.update(),C(h)}catch(t){_("Помилка підвантаження: "+t.message),L--}finally{q=!1}}async function je(){const e=document.getElementById("popularSwiperWrapper");if(!e)return;let t=[];try{t=await N(()=>Promise.all(J.map(s=>Ae(s))))}catch{_("Не вдалося завантажити популярні товари");return}e.innerHTML=t.map(s=>`<div class="swiper-slide">${O(s)}</div>`).join(""),h=new te(".popular-swiper",{modules:[se,ne],slidesPerView:1,watchOverflow:!1,spaceBetween:20,navigation:{prevEl:"#popularPrev",nextEl:"#popularNext",disabledClass:"swiper-button-disabled"},pagination:{el:".popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},breakpoints:{375:{slidesPerView:1},640:{slidesPerView:2},1024:{slidesPerView:3}},on:{init(s){C(s)},slideChange(s){C(s),s.isEnd&&Re()}}});try{const s=await N(()=>me(L)),o=(s.desserts||[]).filter(r=>!J.includes(r._id));ue=s.totalItems||o.length,o.forEach(r=>{const n=document.createElement("div");n.className="swiper-slide",n.innerHTML=O(r),e.appendChild(n)}),h.update(),C(h)}catch{_("Не вдалося завантажити популярні товари")}}function C(e){const t=document.getElementById("popularPrev"),s=document.getElementById("popularNext");!t||!s||(t.disabled=e.isBeginning,s.disabled=e.isEnd)}je();new we(".accordion-container",{duration:300,showMultiple:!1});const He="https://deserts-store.b.goit.study/api/feedbacks/",We=8;async function Ue(e=1){try{const{data:t}=await f(He,{params:{limit:We,page:e}});return console.log(t),t}catch(t){console.log(t.message)}}const Ve=document.querySelector(".review-list");function Fe(e){const t=e.map(s=>`
      <li class="swiper-slide">
      <div class="review-box">
        <div class="review-rating" data-rate="${s.rate}"></div>
        <p class="review-desc">"${s.description}"</p>
        <p class="review-author">${s.author}</p>
        </div>
      </li>
      `).join("");Ve.insertAdjacentHTML("beforeend",t),ze()}function ze(){document.querySelectorAll(".review-rating").forEach(t=>{new Le(t,{starType:"i",number:5,score:Number(t.dataset.rate),readOnly:!0,starOn:"fa-solid fa-star",starOff:"fa-regular fa-star",starHalf:"fa-solid fa-star-half-stroke",half:!0}).init()})}async function Ke(){const e=await Ue();Fe(e.feedbacks),new te(".review-swiper",{modules:[se,ne],spaceBetween:24,pagination:{el:".review-pagination",clickable:!0,dynamicBullets:!1,renderBullet:function(t,s){return t<6?'<span class="'+s+'"></span>':""}},navigation:{prevEl:".review-btn.prev",nextEl:".review-btn.next"},breakpoints:{375:{slidesPerView:1},768:{slidesPerView:3,spaceBetween:24}}})}Ke();const Ge=f.create({baseURL:"https://deserts-store.b.goit.study/api"}),Xe=e=>Ge.post("/orders",e).then(t=>t.data),v=document.getElementById("loader");let P=0;function Ze(){P++,v==null||v.classList.remove("hidden")}function Je(){P=Math.max(0,P-1),P===0&&(v==null||v.classList.add("hidden"))}async function Qe(e){Ze();try{return await e()}finally{Je()}}const fe={position:"topRight",timeout:4e3,transitionIn:"fadeInDown",transitionOut:"fadeOutUp"};function Ye(e){l.success({title:"Успіх",message:e,...fe})}function k(e){l.error({title:"Помилка",message:e,...fe})}let b=null;function et(){var o,r,n;const e=document.getElementById("orderOverlay"),t=document.getElementById("orderClose"),s=document.getElementById("orderForm");document.addEventListener("open-order-modal",a=>{var i;b=((i=a.detail)==null?void 0:i.dessertId)||null,Q()}),document.addEventListener("click",a=>{var i,d;a.target.closest(".js-open-order")&&(b=((d=(i=a.target.closest(".js-open-order"))==null?void 0:i.dataset)==null?void 0:d.id)||null,Q())}),t==null||t.addEventListener("click",E),e==null||e.addEventListener("click",a=>{a.target===e&&E()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&!(e!=null&&e.hidden)&&E()}),s==null||s.addEventListener("submit",async a=>{a.preventDefault(),await tt(s)}),(o=document.getElementById("orderName"))==null||o.addEventListener("input",()=>w("orderName","nameError")),(r=document.getElementById("orderPhone"))==null||r.addEventListener("input",()=>w("orderPhone","phoneError")),(n=document.getElementById("orderComment"))==null||n.addEventListener("input",()=>w("orderComment","commentError"))}function Q(){var t;const e=document.getElementById("orderOverlay");e&&(e.hidden=!1,document.body.style.overflow="hidden",(t=document.getElementById("orderName"))==null||t.focus())}function E(){const e=document.getElementById("orderOverlay");e&&(e.hidden=!0,document.body.style.overflow="",ge())}function M(e,t,s){var r;(r=document.getElementById(e))==null||r.classList.add("error");const o=document.getElementById(t);o&&(o.textContent=s,o.style.display="block")}function w(e,t){var o;(o=document.getElementById(e))==null||o.classList.remove("error");const s=document.getElementById(t);s&&(s.textContent="",s.style.display="none")}function ge(){w("orderName","nameError"),w("orderPhone","phoneError"),w("orderComment","commentError")}async function tt(e){var i,d,u,m,z,K,G,X;ge();const t=(i=document.getElementById("orderName"))==null?void 0:i.value.trim(),s=(d=document.getElementById("orderComment"))==null?void 0:d.value.trim(),o=(((u=document.getElementById("orderPhone"))==null?void 0:u.value)||"").replace(/\D/g,""),r=/[a-zA-Zа-яА-ЯёЁіІїЇєЄ]/.test(((m=document.getElementById("orderPhone"))==null?void 0:m.value)||"");let n=!0;if((!t||t.length<2)&&(M("orderName","nameError","Введіть коректне ім'я (мінімум 2 символи)"),n=!1),r?(M("orderPhone","phoneError","Телефон має містити лише цифри"),n=!1):o.length!==12&&(M("orderPhone","phoneError",'Введіть рівно 12 цифр без "+". Наприклад: 380961234568. Зараз: '+o.length+" цифр"),n=!1),(!s||s.length<2)&&(M("orderComment","commentError","Введіть коментар (мінімум 2 символи)"),n=!1),!b){k("Спочатку оберіть десерт"),E(),(z=document.getElementById("desserts"))==null||z.scrollIntoView({behavior:"smooth"});return}if(!n)return;const a={name:t,phone:o,dessertId:b,comment:s};try{const g=await Qe(()=>Xe(a));Ye("Замовлення "+(g.orderNum?"Nr"+g.orderNum+" ":"")+"прийнято! Ми зв'яжемося з вами."),e.reset(),E(),b=null}catch(g){const Z=(K=g.response)==null?void 0:K.status,ve=((X=(G=g.response)==null?void 0:G.data)==null?void 0:X.message)||g.message||"";if(Z===400){k('Невірні дані. Телефон має містити рівно 12 цифр без "+". Наприклад: 380961234568.');return}if(Z===404){k("Десерт не знайдено.");return}k(ve||"Сталася помилка. Спробуйте ще раз.")}}et();const Y=document.querySelector(".desserts-list"),ee=document.querySelector("#popularSwiperWrapper"),F=document.querySelector(".details-modal-overlay"),S=document.querySelector(".details-modal"),st="https://deserts-store.b.goit.study/api";Y&&Y.addEventListener("click",he);ee&&ee.addEventListener("click",he);S.addEventListener("click",at);document.addEventListener("keydown",it);async function he(e){try{const t=e.target.closest("[data-open-modal]");if(!t)return;const s=t.dataset.id;F.classList.add("is-open"),document.body.classList.add("no-scroll"),S.innerHTML='<div class="loader" data-details-loader></div>';const o=await nt(s);rt(o),setTimeout(()=>{document.addEventListener("click",ye)})}catch{$(),l.error({message:"Не вдалося завантажити інформацію про десерт",position:"topRight"})}}async function nt(e){return(await f(`${st}/desserts/${e}`)).data}function rt({_id:e,name:t,description:s,price:o,image:r,composition:n,rate:a}){const i=`      
          <button
        class="details-modal-close"
        type="button"
        data-details-modal-close
        aria-label="Закрити модальне вікно"
      >
        <svg class="details-modal-close-icon" width="24" height="24">
          <use href="/img/sprite.svg#icon-close"></use>
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
          ${ot(a)}
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
      </div>`;S.innerHTML=i}function ot(e){const t=Number(e),s=Math.floor(t),o=t%1!==0,r=5-s-(o?1:0);let n="";for(let a=0;a<s;a++)n+=`
      <li class="details-modal-star">
        <svg class="details-modal-star-icon" width="16" height="15.2">
          <use href="/img/sprite.svg#icon-star"></use>
        </svg>
      </li>`;o&&(n+=`
      <li class="details-modal-star">
        <svg class="details-modal-star-icon" width="16" height="15.2">
          <use href="/img/sprite.svg#icon-half-star"></use>
        </svg>
      </li>`);for(let a=0;a<r;a++)n+=`
      <li class="details-modal-star">
        <svg class="details-modal-empty-star-icon" width="16" height="15.2">
          <use href="/img/sprite.svg#icon-star"></use>
        </svg>
      </li>`;return n}function $(){F.classList.remove("is-open"),document.removeEventListener("click",ye),document.body.classList.remove("no-scroll"),dt()}function at(e){if(e.target.closest(".js-open-order")){$();return}e.target.closest("[data-details-modal-close]")&&$()}function ye(e){S.contains(e.target)||$()}function it(e){e.key==="Escape"&&F.classList.contains("is-open")&&$()}function dt(){S.innerHTML=""}
//# sourceMappingURL=index.js.map
