import{i as l,a as f,S as J,N as Y,P as ee,A as ye,R as ve}from"./assets/vendor-DdBOpbMR.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();function we(){const e=document.querySelector(".slider-track"),t=document.querySelectorAll(".slide_active"),s=document.querySelector(".next"),o=document.querySelector(".prev"),n=document.querySelectorAll(".slider-dots li");if(!t.length||!e)return;let r=0;function a(){if(window.innerWidth<768){e.style.transform="none",e.style.transition="none";return}const d=parseFloat(window.getComputedStyle(e).gap)||0,u=t[0].getBoundingClientRect().width+d;e.style.transform=`translateX(-${r*u}px)`,e.style.transition="transform 300ms ease",n.length&&(n.forEach(m=>{m.classList.remove("dot_active"),m.classList.add("dot")}),n[r]&&(n[r].classList.remove("dot"),n[r].classList.add("dot_active")))}function i(){return window.innerWidth>=1440?t.length-1:window.innerWidth>=768?t.length-2:0}s&&s.addEventListener("click",()=>{if(window.innerWidth<768)return;const d=i();r=r>=d?0:r+1,a()}),o&&o.addEventListener("click",()=>{if(window.innerWidth<768)return;const d=i();r=r<=0?d:r-1,a()}),n.length&&n.forEach((d,u)=>{d.addEventListener("click",()=>{if(window.innerWidth<768)return;const m=i();u<=m&&(r=u,a())})}),window.addEventListener("resize",()=>{if(window.innerWidth<768)r=0;else{const d=i();r>d&&(r=d)}a()}),a()}const Le=setInterval(()=>{document.querySelector(".slider-track")&&(clearInterval(Le),we())},50),c=document.querySelector(".desserts-select-wrapper"),$=c.querySelector(".desserts-select-trigger"),Ee=c.querySelector(".desserts-select-value"),_=c.querySelector(".desserts-filter"),te=document.querySelector("[data-categories-loader]"),se=document.querySelector("[data-list-loader]"),ne=document.querySelector(".desserts-list"),I=document.querySelector(".desserts-load-more"),N="https://deserts-store.b.goit.study/api",re=8;let p=1;document.addEventListener("DOMContentLoaded",be);I.addEventListener("click",$e);_.addEventListener("click",Ie);$.addEventListener("click",xe);_.addEventListener("click",Be);document.addEventListener("click",Me);document.addEventListener("keydown",Ce);async function be(){try{Oe(),D(),H();const e=await Se(),t=[{_id:"all",name:"Всі десерти"},...e];ke(t),document.querySelector(".desserts-filter-button").classList.add("is-active"),_e();const{desserts:s,totalItems:o}=await A(p);if(s.length>0){T(s);const n=document.querySelectorAll(".desserts-card").length;+o>n&&j()}else l.warning({message:"Desserts not found",position:"topRight"})}catch{R()}finally{W()}}async function Ie(e){try{if(e.target.nodeName!=="BUTTON")return;const t=e.target.dataset.category;document.querySelectorAll(".desserts-filter-button").forEach(n=>n.classList.remove("is-active")),e.target.classList.add("is-active"),D(),Pe(),H(),p=1;const{desserts:s,totalItems:o}=t==="all"?await A(p):await oe(t,p);if(s.length>0){T(s);const n=document.querySelectorAll(".desserts-card").length;o>n&&j()}else l.warning({message:"Desserts not found",position:"topRight"})}catch{R()}finally{W()}}async function $e(){try{D(),H(),I.disabled=!0,p++;const e=document.querySelector(".desserts-filter-button.is-active").dataset.category,{desserts:t,totalItems:s}=e==="all"?await A(p):await oe(e,p);if(t.length>0){T(t);const o=document.querySelectorAll(".desserts-card").length;+s>o?j():qe()}}catch{R()}finally{W(),I.disabled=!1}}async function Se(){return(await f(`${N}/categories`)).data}async function oe(e,t){const{data:s}=await f(`${N}/desserts`,{params:{page:t,limit:re,category:e}});return s}async function A(e){const{data:t}=await f(`${N}/desserts`,{params:{limit:re,page:e}});return t}function ke(e){const t=e.map(({_id:s,name:o})=>`
    <li class="desserts-filter-item">
      <button class="desserts-filter-button" type="button" data-category="${s}">
        ${o}
      </button>
    </li>
    `).join("");_.insertAdjacentHTML("beforeend",t)}function T(e){const t=e.map(({_id:s,name:o,description:n,price:r,category:a,image:i})=>`          <li class="desserts-card" id="${s}" data-dessert>
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
                  ${n}
                </p>
              <div class="desserts-card-bottom">
                <p class="desserts-card-price">${r} грн</p>
                <button class="desserts-card-button" type="button" aria-label="Відкрити десерт" data-id="${s}" data-open-modal>
                  <svg class="desserts-card-icon" width="24" height="24">
                    <use href="/img/sprite.svg#icon-arrow_outward"></use>
                  </svg>
                </button>
              </div>
          </li>`).join("");ne.insertAdjacentHTML("beforeend",t)}function Be(e){if(e.target.nodeName!=="BUTTON")return;c.classList.remove("is-open");const t=e.target.textContent;Ee.textContent=t,$.setAttribute("aria-expanded","false")}function xe(){c.classList.toggle("is-open"),$.setAttribute("aria-expanded",c.classList.contains("is-open")?"true":"false")}function Me(e){c.contains(e.target)||(c.classList.remove("is-open"),$.setAttribute("aria-expanded","false"))}function Ce(e){e.key==="Escape"&&(c.classList.remove("is-open"),$.setAttribute("aria-expanded","false"))}function R(){l.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше.",position:"topRight"})}function qe(){l.info({title:"Інформація",message:"Ви дійшли до кінця списку.",position:"topRight"})}function Pe(){ne.innerHTML=""}function Oe(){te.classList.remove("is-hidden")}function _e(){te.classList.add("is-hidden")}function D(){se.classList.remove("is-hidden")}function W(){se.classList.add("is-hidden")}function j(){I.classList.remove("is-hidden")}function H(){I.classList.add("is-hidden")}const Ne="/project-CodeWave/assets/brownie-Cf_3_PbZ.png",Ae="/project-CodeWave/assets/cupcake-L7WT4hHm.png",Te="/project-CodeWave/assets/fondant-DZpQIlSO.png",Re=[{_id:"static-1",name:"Брауні з горіхами",category:"Шоколадні випічки",description:"Соковитий шоколадний пиріг з хрусткими горіхами.",price:110,img:Ne},{_id:"static-2",name:"Фруктовий тарт",category:"Фруктові десерти",description:"Пісочна основа з заварним кремом та свіжими фруктами.",price:140,img:Ae},{_id:"static-3",name:"Лавандовий кекс",category:"Гарячі десерти",description:"Ароматний кекс з ніжним лавандовим смаком.",price:90,img:Te}];function O(e){const t=e.img||e.imageUrl||e.image||"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",s=e.category||"",o=typeof s=="object"?(s==null?void 0:s.name)||"":s,n=e.price!==void 0?e.price+" грн":"",r=e.description||e.shortDescription||"",a=e._id||e.id;return`
    <div class="dessert-card" data-id="${a}">
      <div class="dessert-card__img">
        <img src="${t}" alt="${e.name}" loading="lazy" width="300" height="200" />
      </div>
      <div class="dessert-card__body">
        ${o?`<div class="dessert-card__category">${o}</div>`:""}
        <h3 class="dessert-card__name">${e.name}</h3>
        ${r?`<p class="dessert-card__desc">${r}</p>`:""}
        <div class="dessert-card__footer">
          <div class="dessert-card__price">${n}</div>
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
  `}const De=f.create({baseURL:"https://deserts-store.b.goit.study/api"}),ae=10;let L=1,ie=0,P=!1,h=null;const de=e=>De.get("/desserts",{params:{type:"popular",limit:ae,page:e}}).then(t=>t.data),y=document.getElementById("loader");let x=0;function We(){x++,y==null||y.classList.remove("hidden")}function je(){x=Math.max(0,x-1),x===0&&(y==null||y.classList.add("hidden"))}async function ce(e){We();try{return await e()}finally{je()}}const le={position:"topRight",timeout:4e3,transitionIn:"fadeInDown",transitionOut:"fadeOutUp"};function ue(e){l.error({title:"Помилка",message:e,...le})}async function He(){if(P)return;if(L*ae>=ie){l.info({title:"Інфо",message:"Всі десерти завантажені",...le});return}P=!0,L++;try{const s=(await ce(()=>de(L))).desserts||[],o=document.getElementById("popularSwiperWrapper");if(!o||!h)return;s.forEach(n=>{const r=document.createElement("div");r.className="swiper-slide",r.innerHTML=O(n),o.appendChild(r)}),h.update(),M(h)}catch(t){ue("Помилка підвантаження: "+t.message),L--}finally{P=!1}}async function Ue(){const e=document.getElementById("popularSwiperWrapper");if(e){e.innerHTML=Re.map(t=>`<div class="swiper-slide">${O(t)}</div>`).join(""),h=new J(".popular-swiper",{modules:[Y,ee],slidesPerView:1,watchOverflow:!1,spaceBetween:20,navigation:{prevEl:"#popularPrev",nextEl:"#popularNext",disabledClass:"swiper-button-disabled"},pagination:{el:".popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},breakpoints:{375:{slidesPerView:1},640:{slidesPerView:2},1024:{slidesPerView:3}},on:{init(t){M(t)},slideChange(t){M(t),t.isEnd&&He()}}});try{const t=await ce(()=>de(L)),s=t.desserts||[];ie=t.totalItems||s.length,s.forEach(o=>{const n=document.createElement("div");n.className="swiper-slide",n.innerHTML=O(o),e.appendChild(n)}),h.update(),M(h)}catch{ue("Не вдалося завантажити популярні товари")}}}function M(e){const t=document.getElementById("popularPrev"),s=document.getElementById("popularNext");!t||!s||(t.disabled=e.isBeginning,s.disabled=e.isEnd)}Ue();new ye(".accordion-container",{duration:300,showMultiple:!1});const Ve="https://deserts-store.b.goit.study/api/feedbacks/",Fe=8;async function ze(e=1){try{const{data:t}=await f(Ve,{params:{limit:Fe,page:e}});return console.log(t),t}catch(t){console.log(t.message)}}const Ke=document.querySelector(".review-list");function Ze(e){const t=e.map(s=>`
      <li class="swiper-slide">
      <div class="review-box">
        <div class="review-rating" data-rate="${s.rate}"></div>
        <p class="review-desc">"${s.description}"</p>
        <p class="review-author">${s.author}</p>
        </div>
      </li>
      `).join("");Ke.insertAdjacentHTML("beforeend",t),Ge()}function Ge(){document.querySelectorAll(".review-rating").forEach(t=>{new ve(t,{starType:"i",number:5,score:Number(t.dataset.rate),readOnly:!0,starOn:"fa-solid fa-star",starOff:"fa-regular fa-star",starHalf:"fa-solid fa-star-half-stroke",half:!0}).init()})}async function Qe(){const e=await ze();Ze(e.feedbacks),new J(".review-swiper",{modules:[Y,ee],spaceBetween:24,pagination:{el:".review-pagination",clickable:!0,dynamicBullets:!1,renderBullet:function(t,s){return t<6?'<span class="'+s+'"></span>':""}},navigation:{prevEl:".review-btn.prev",nextEl:".review-btn.next"},breakpoints:{375:{slidesPerView:1},768:{slidesPerView:3,spaceBetween:24}}})}Qe();const Xe=f.create({baseURL:"https://deserts-store.b.goit.study/api"}),Je=e=>Xe.post("/orders",e).then(t=>t.data),v=document.getElementById("loader");let C=0;function Ye(){C++,v==null||v.classList.remove("hidden")}function et(){C=Math.max(0,C-1),C===0&&(v==null||v.classList.add("hidden"))}async function tt(e){Ye();try{return await e()}finally{et()}}const me={position:"topRight",timeout:4e3,transitionIn:"fadeInDown",transitionOut:"fadeOutUp"};function st(e){l.success({title:"Успіх",message:e,...me})}function k(e){l.error({title:"Помилка",message:e,...me})}let E=null;function nt(){var o,n,r;const e=document.getElementById("orderOverlay"),t=document.getElementById("orderClose"),s=document.getElementById("orderForm");document.addEventListener("open-order-modal",a=>{var i;E=((i=a.detail)==null?void 0:i.dessertId)||null,G()}),document.addEventListener("click",a=>{var i,d;a.target.closest(".js-open-order")&&(E=((d=(i=a.target.closest(".js-open-order"))==null?void 0:i.dataset)==null?void 0:d.id)||null,G())}),t==null||t.addEventListener("click",b),e==null||e.addEventListener("click",a=>{a.target===e&&b()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&!(e!=null&&e.hidden)&&b()}),s==null||s.addEventListener("submit",async a=>{a.preventDefault(),await rt(s)}),(o=document.getElementById("orderName"))==null||o.addEventListener("input",()=>w("orderName","nameError")),(n=document.getElementById("orderPhone"))==null||n.addEventListener("input",()=>w("orderPhone","phoneError")),(r=document.getElementById("orderComment"))==null||r.addEventListener("input",()=>w("orderComment","commentError"))}function G(){var t;const e=document.getElementById("orderOverlay");e&&(e.hidden=!1,document.body.style.overflow="hidden",(t=document.getElementById("orderName"))==null||t.focus())}function b(){const e=document.getElementById("orderOverlay");e&&(e.hidden=!0,document.body.style.overflow="",pe())}function B(e,t,s){var n;(n=document.getElementById(e))==null||n.classList.add("error");const o=document.getElementById(t);o&&(o.textContent=s,o.style.display="block")}function w(e,t){var o;(o=document.getElementById(e))==null||o.classList.remove("error");const s=document.getElementById(t);s&&(s.textContent="",s.style.display="none")}function pe(){w("orderName","nameError"),w("orderPhone","phoneError"),w("orderComment","commentError")}async function rt(e){var i,d,u,m,V,F,z,K;pe();const t=(i=document.getElementById("orderName"))==null?void 0:i.value.trim(),s=(d=document.getElementById("orderComment"))==null?void 0:d.value.trim(),o=(((u=document.getElementById("orderPhone"))==null?void 0:u.value)||"").replace(/\D/g,""),n=/[a-zA-Zа-яА-ЯёЁіІїЇєЄ]/.test(((m=document.getElementById("orderPhone"))==null?void 0:m.value)||"");let r=!0;if((!t||t.length<2)&&(B("orderName","nameError","Введіть коректне ім'я (мінімум 2 символи)"),r=!1),n?(B("orderPhone","phoneError","Телефон має містити лише цифри"),r=!1):o.length!==12&&(B("orderPhone","phoneError","Введіть рівно 12 цифр. Наприклад: 380961234568. Зараз: "+o.length+" цифр"),r=!1),(!s||s.length<2)&&(B("orderComment","commentError","Введіть коментар (мінімум 2 символи)"),r=!1),!E){k("Спочатку оберіть десерт"),b(),(V=document.getElementById("desserts"))==null||V.scrollIntoView({behavior:"smooth"});return}if(!r)return;const a={name:t,phone:o,dessertId:E,comment:s};try{const g=await tt(()=>Je(a));st("Замовлення "+(g.orderNum?"Nr"+g.orderNum+" ":"")+"прийнято! Ми зв'яжемося з вами."),e.reset(),b(),E=null}catch(g){const Z=(F=g.response)==null?void 0:F.status,he=((K=(z=g.response)==null?void 0:z.data)==null?void 0:K.message)||g.message||"";if(Z===400){k("Невірні дані. Телефон має містити рівно 12 цифр (380961234568).");return}if(Z===404){k("Десерт не знайдено.");return}k(he||"Сталася помилка. Спробуйте ще раз.")}}nt();const Q=document.querySelector(".desserts-list"),X=document.querySelector("#popularSwiperWrapper"),U=document.querySelector(".details-modal-overlay"),S=document.querySelector(".details-modal"),ot="https://deserts-store.b.goit.study/api";Q&&Q.addEventListener("click",fe);X&&X.addEventListener("click",fe);S.addEventListener("click",ct);document.addEventListener("keydown",lt);async function fe(e){try{const t=e.target.closest("[data-open-modal]");if(!t)return;const s=t.dataset.id;U.classList.add("is-open"),document.body.classList.add("no-scroll"),S.innerHTML='<div class="loader" data-details-loader></div>';const o=await at(s);it(o),setTimeout(()=>{document.addEventListener("click",ge)})}catch{q(),l.error({message:"Не вдалося завантажити інформацію про десерт",position:"topRight"})}}async function at(e){return(await f(`${ot}/desserts/${e}`)).data}function it({_id:e,name:t,description:s,price:o,image:n,composition:r,rate:a}){const i=`      
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
          src="${n}"
          alt="${t}"
          class="details-modal-img"
        />
      </div>
      <div class="details-modal-content">
        <h2 class="details-modal-title">${t}</h2>
        <p class="details-modal-price">${o} грн</p>
        <ul class="details-modal-rate">
          ${dt(a)}
        </ul>
        <p class="details-modal-text">
          ${s}
        </p>
        <p class="details-modal-ingredients">
          <span class="details-modal-ingredients-accent">Склад</span>: ${r}
        </p>
        <button class="details-modal-button" type="button" data-id="${e}">
          Перейти до замовлення
        </button>
      </div>`;S.innerHTML=i}function dt(e){const t=Number(e),s=Math.floor(t),o=t%1!==0,n=5-s-(o?1:0);let r="";for(let a=0;a<s;a++)r+=`
      <li class="details-modal-star">
        <svg class="details-modal-star-icon" width="16" height="15.2">
          <use href="/img/sprite.svg#icon-star"></use>
        </svg>
      </li>`;o&&(r+=`
      <li class="details-modal-star">
        <svg class="details-modal-star-icon" width="16" height="15.2">
          <use href="/img/sprite.svg#icon-half-star"></use>
        </svg>
      </li>`);for(let a=0;a<n;a++)r+=`
      <li class="details-modal-star">
        <svg class="details-modal-empty-star-icon" width="16" height="15.2">
          <use href="/img/sprite.svg#icon-star"></use>
        </svg>
      </li>`;return r}function q(){U.classList.remove("is-open"),document.removeEventListener("click",ge),document.body.classList.remove("no-scroll"),ut()}function ct(e){e.target.closest("[data-details-modal-close]")&&q()}function ge(e){S.contains(e.target)||q()}function lt(e){e.key==="Escape"&&U.classList.contains("is-open")&&q()}function ut(){S.innerHTML=""}
//# sourceMappingURL=index.js.map
