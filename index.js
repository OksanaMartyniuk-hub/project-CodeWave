import{i as u,a as f,A as M,S as O,N as P,P as x,R as C}from"./assets/vendor-BdBE7nqo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();const o=document.querySelector(".desserts-select-wrapper"),l=o.querySelector(".desserts-select-trigger"),B=o.querySelector(".desserts-select-value"),p=o.querySelector(".desserts-filter"),S=document.querySelector("[data-categories-loader]"),E=document.querySelector("[data-list-loader]"),A=document.querySelector(".desserts-list"),d=document.querySelector(".desserts-load-more"),g="https://deserts-store.b.goit.study/api",q=8;let n=1;document.addEventListener("DOMContentLoaded",N);d.addEventListener("click",R);p.addEventListener("click",T);l.addEventListener("click",H);p.addEventListener("click",j);document.addEventListener("click",_);document.addEventListener("keydown",F);async function N(){try{V(),L(),b();const e=await D(),t=[{_id:"all",name:"Всі десерти"},...e];I(t),document.querySelector(".desserts-filter-button").classList.add("is-active"),z();const{desserts:r,totalItems:a}=await m(n);if(r.length>0){y(r);const s=document.querySelectorAll(".desserts-card").length;+a>s&&w()}else u.warning({message:"Desserts not found",position:"topRight"})}catch{h()}finally{v()}}async function T(e){try{if(e.target.nodeName!=="BUTTON")return;const t=e.target.dataset.category;document.querySelectorAll(".desserts-filter-button").forEach(s=>s.classList.remove("is-active")),e.target.classList.add("is-active"),L(),K(),b(),n=1;const{desserts:r,totalItems:a}=t==="all"?await m(n):await $(t,n);if(r.length>0){y(r);const s=document.querySelectorAll(".desserts-card").length;a>s&&w()}else u.warning({message:"Desserts not found",position:"topRight"})}catch{h()}finally{v()}}async function R(){try{L(),b(),d.disabled=!0,n++;const e=document.querySelector(".desserts-filter-button.is-active").dataset.category,{desserts:t,totalItems:r}=e==="all"?await m(n):await $(e,n);if(t.length>0){y(t);const a=document.querySelectorAll(".desserts-card").length;+r>a?w():U()}}catch{h()}finally{v(),d.disabled=!1}}async function D(){return(await f(`${g}/categories`)).data}async function $(e,t){const{data:r}=await f(`${g}/desserts`,{params:{page:t,limit:q,category:e}});return r}async function m(e){const{data:t}=await f(`${g}/desserts`,{params:{limit:q,page:e}});return t}function I(e){const t=e.map(({_id:r,name:a})=>`
    <li class="desserts-filter-item">
      <button class="desserts-filter-button" type="button" data-category="${r}">
        ${a}
      </button>
    </li>
    `).join("");p.insertAdjacentHTML("beforeend",t)}function y(e){const t=e.map(({_id:r,name:a,description:s,price:i,category:c,image:k})=>`          <li class="desserts-card" id="${r}">
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
          </li>`).join("");A.insertAdjacentHTML("beforeend",t)}function j(e){if(e.target.nodeName!=="BUTTON")return;o.classList.remove("is-open");const t=e.target.textContent;B.textContent=t,l.setAttribute("aria-expanded","false")}function H(){o.classList.toggle("is-open"),l.setAttribute("aria-expanded",o.classList.contains("is-open")?"true":"false")}function _(e){o.contains(e.target)||(o.classList.remove("is-open"),l.setAttribute("aria-expanded","false"))}function F(e){e.key==="Escape"&&(o.classList.remove("is-open"),l.setAttribute("aria-expanded","false"))}function h(){u.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше.",position:"topRight"})}function U(){u.info({title:"Інформація",message:"Ви дійшли до кінця списку.",position:"topRight"})}function K(){A.innerHTML=""}function V(){S.classList.remove("is-hidden")}function z(){S.classList.add("is-hidden")}function L(){E.classList.remove("is-hidden")}function v(){E.classList.add("is-hidden")}function w(){d.classList.remove("is-hidden")}function b(){d.classList.add("is-hidden")}new M(".accordion-container",{duration:300,showMultiple:!1});const G="https://deserts-store.b.goit.study/api/feedbacks/",W=8;async function J(e=1){try{const{data:t}=await f(G,{params:{limit:W,page:e}});return console.log(t),t}catch(t){console.log(t.message)}}const Q=document.querySelector(".review-list");function X(e){const t=e.map(r=>`
      <li class="swiper-slide">
      <div class="review-box">
        <div class="review-rating" data-rate="${r.rate}"></div>
        <p class="review-desc">"${r.description}"</p>
        <p class="review-author">${r.author}</p>
        </div>
      </li>
      `).join("");Q.insertAdjacentHTML("beforeend",t),Y()}function Y(){document.querySelectorAll(".review-rating").forEach(t=>{new C(t,{starType:"i",number:5,score:Number(t.dataset.rate),readOnly:!0,starOn:"fa-solid fa-star",starOff:"fa-regular fa-star",starHalf:"fa-solid fa-star-half-stroke",half:!0}).init()})}async function Z(){const e=await J();X(e.feedbacks),new O(".review-swiper",{modules:[P,x],spaceBetween:24,pagination:{el:".review-pagination",clickable:!0,dynamicBullets:!1,renderBullet:function(t,r){return t<6?'<span class="'+r+'"></span>':""}},navigation:{prevEl:".review-btn.prev",nextEl:".review-btn.next"},breakpoints:{375:{slidesPerView:1},768:{slidesPerView:3,spaceBetween:24}}})}Z();
//# sourceMappingURL=index.js.map
