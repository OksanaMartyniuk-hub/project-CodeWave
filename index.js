import{i as u,a as f,S as O,N as M,P,R as x}from"./assets/vendor-BS8wHwuc.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();const o=document.querySelector(".desserts-select-wrapper"),l=o.querySelector(".desserts-select-trigger"),C=o.querySelector(".desserts-select-value"),g=o.querySelector(".desserts-filter"),S=document.querySelector("[data-categories-loader]"),E=document.querySelector("[data-list-loader]"),q=document.querySelector(".desserts-list"),d=document.querySelector(".desserts-load-more"),p="https://deserts-store.b.goit.study/api",A=8;let n=1;document.addEventListener("DOMContentLoaded",N);d.addEventListener("click",B);g.addEventListener("click",T);l.addEventListener("click",j);g.addEventListener("click",I);document.addEventListener("click",H);document.addEventListener("keydown",_);async function N(){try{K(),L(),b();const e=await R(),t=[{_id:"all",name:"Всі десерти"},...e];D(t),document.querySelector(".desserts-filter-button").classList.add("is-active"),V();const{desserts:r,totalItems:a}=await m(n);if(r.length>0){y(r);const s=document.querySelectorAll(".desserts-card").length;+a>s&&w()}else u.warning({message:"Desserts not found",position:"topRight"})}catch{h()}finally{v()}}async function T(e){try{if(e.target.nodeName!=="BUTTON")return;const t=e.target.dataset.category;document.querySelectorAll(".desserts-filter-button").forEach(s=>s.classList.remove("is-active")),e.target.classList.add("is-active"),L(),U(),b(),n=1;const{desserts:r,totalItems:a}=t==="all"?await m(n):await $(t,n);if(r.length>0){y(r);const s=document.querySelectorAll(".desserts-card").length;a>s&&w()}else u.warning({message:"Desserts not found",position:"topRight"})}catch{h()}finally{v()}}async function B(){try{L(),b(),d.disabled=!0,n++;const e=document.querySelector(".desserts-filter-button.is-active").dataset.category,{desserts:t,totalItems:r}=e==="all"?await m(n):await $(e,n);if(t.length>0){y(t);const a=document.querySelectorAll(".desserts-card").length;+r>a?w():F()}}catch{h()}finally{v(),d.disabled=!1}}async function R(){return(await f(`${p}/categories`)).data}async function $(e,t){const{data:r}=await f(`${p}/desserts`,{params:{page:t,limit:A,category:e}});return r}async function m(e){const{data:t}=await f(`${p}/desserts`,{params:{limit:A,page:e}});return t}function D(e){const t=e.map(({_id:r,name:a})=>`
    <li class="desserts-filter-item">
      <button class="desserts-filter-button" type="button" data-category="${r}">
        ${a}
      </button>
    </li>
    `).join("");g.insertAdjacentHTML("beforeend",t)}function y(e){const t=e.map(({_id:r,name:a,description:s,price:i,category:c,image:k})=>`          <li class="desserts-card" id="${r}">
            <div class="desserts-card-media">
              <img
                src="${k}"
                alt="${a}"
                class="desserts-card-img"
              />
            </div>
                <p class="desserts-card-category">${c.name}</p>
                <h3 class="desserts-card-title">${a}</h3>
                <p class="desserts-card-text">
                  ${s}
                </p>
              <div class="desserts-card-bottom">
                <p class="desserts-card-price">${i} грн</p>
                <button class="desserts-card-button" type="button" aria-label="Відкрити десерт">
                  <svg class="desserts-card-icon" width="24" height="24">
                    <use href="/img/sprite.svg#icon-arrow_outward"></use>
                  </svg>
                </button>
              </div>
          </li>`).join("");q.insertAdjacentHTML("beforeend",t)}function I(e){if(e.target.nodeName!=="BUTTON")return;o.classList.remove("is-open");const t=e.target.textContent;C.textContent=t,l.setAttribute("aria-expanded","false")}function j(){o.classList.toggle("is-open"),l.setAttribute("aria-expanded",o.classList.contains("is-open")?"true":"false")}function H(e){o.contains(e.target)||(o.classList.remove("is-open"),l.setAttribute("aria-expanded","false"))}function _(e){e.key==="Escape"&&(o.classList.remove("is-open"),l.setAttribute("aria-expanded","false"))}function h(){u.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше.",position:"topRight"})}function F(){u.info({title:"Інформація",message:"Ви дійшли до кінця списку.",position:"topRight"})}function U(){q.innerHTML=""}function K(){S.classList.remove("is-hidden")}function V(){S.classList.add("is-hidden")}function L(){E.classList.remove("is-hidden")}function v(){E.classList.add("is-hidden")}function w(){d.classList.remove("is-hidden")}function b(){d.classList.add("is-hidden")}const z="https://deserts-store.b.goit.study/api/feedbacks/",G=10;async function W(e=1){try{const{data:t}=await f(z,{params:{limit:G,page:e}});return console.log(t),t}catch(t){console.log(t.message)}}const J=document.querySelector(".review-list");function Q(e){const t=e.map(r=>`
      <li class="swiper-slide">
      <div class="review-box">
        <div class="review-rating" data-rate="${r.rate}"></div>
        <p class="review-desc">"${r.description}"</p>
        <p class="review-author">${r.author}</p>
        </div>
      </li>
      `).join("");J.insertAdjacentHTML("beforeend",t),X()}function X(){document.querySelectorAll(".review-rating").forEach(t=>{new x(t,{starType:"i",number:5,score:Number(t.dataset.rate),readOnly:!0,starOn:"fa-solid fa-star",starOff:"fa-regular fa-star",starHalf:"fa-solid fa-star-half-stroke",half:!0}).init()})}async function Y(){const e=await W();Q(e.feedbacks),new O(".review-swiper",{modules:[M,P],spaceBetween:24,pagination:{el:".review-pagination",clickable:!0,dynamicBullets:!0,draggable:!0},navigation:{prevEl:".review-btn.prev",nextEl:".review-btn.next"},breakpoints:{375:{slidesPerView:1},768:{slidesPerView:3,spaceBetween:24}}})}Y();
//# sourceMappingURL=index.js.map
