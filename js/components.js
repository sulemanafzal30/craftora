/* Shared interactive components and delegated shop actions. */
(function () {
  'use strict';
  const C=window.Craftora=window.Craftora||{};
  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
  function toast(message,kind='success') {
    const region=$('[data-toast-region]'); if(!region) return;
    const item=document.createElement('div'); item.className='toast toast--'+kind; item.setAttribute('role','status'); item.textContent=message; region.append(item);
    window.setTimeout(()=>item.remove(),3200);
  }
  function refreshCounts() {
    const cartCount=C.storage.getCart().reduce((s,x)=>s+x.quantity,0), wishCount=C.storage.getWishlist().length;
    $$('[data-cart-count]').forEach(el=>el.textContent=String(cartCount));
    $$('[data-wishlist-count]').forEach(el=>el.textContent=String(wishCount));
    $$('[data-cart-item-count]').forEach(el=>el.textContent=String(cartCount));
    $$('[data-wishlist-item-count]').forEach(el=>el.textContent=String(wishCount));
    $$('[data-toggle-wishlist]').forEach(btn=>{const active=C.storage.getWishlist().includes(btn.dataset.toggleWishlist);btn.setAttribute('aria-pressed',String(active));btn.classList.toggle('is-saved',active);});
  }
  function initNavigation() {
    $$('[data-mobile-nav-toggle]').forEach(button=>button.addEventListener('click',()=>{
      const nav=document.getElementById(button.getAttribute('aria-controls')||'primary-navigation');
      const open=button.getAttribute('aria-expanded')!=='true'; button.setAttribute('aria-expanded',String(open));
      nav?.classList.toggle('is-open',open); button.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    }));
    $$('[data-current-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
  }
  function initTabs() {
    $$('[data-tab-target]').forEach(button=>button.addEventListener('click',()=>{
      const target=button.dataset.tabTarget, scope=button.closest('main, section, [data-artisan-dashboard], [data-product-detail]')||document;
      $$('[data-tab-target]',scope).forEach(b=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-selected',String(active));});
      $$('[data-tab-panel]',scope).forEach(panel=>{panel.hidden=panel.dataset.tabPanel!==target;});
    }));
  }
  function initAccordions() {
    $$('[data-accordion-trigger]').forEach(button=>button.addEventListener('click',()=>{
      const expanded=button.getAttribute('aria-expanded')==='true'; button.setAttribute('aria-expanded',String(!expanded));
      const panel=document.getElementById(button.getAttribute('aria-controls')); if(panel) panel.hidden=expanded;
    }));
  }
  function initQuickView() {
    document.addEventListener('click',event=>{
      if(event.target.closest('[data-close-quick-view]')){document.querySelector('[data-quick-view-dialog]')?.close?.();return;}
      const trigger=event.target.closest('[data-quick-view]');if(!trigger)return;
      const product=C.utils.productById(trigger.dataset.quickView);if(!product){toast('This demo product is unavailable.','error');return;}
      let dialog=document.querySelector('[data-quick-view-dialog]');
      if(!dialog){dialog=document.createElement('dialog');dialog.className='product-editor quick-view-dialog';dialog.setAttribute('data-quick-view-dialog','');dialog.setAttribute('aria-labelledby','quick-view-title');document.body.append(dialog);}
      const safe=C.utils.escapeHTML;const image=product.images?.[0]||'';
      dialog.innerHTML=`<div class="quick-view-content"><form method="dialog"><button class="icon-button" data-close-quick-view aria-label="Close quick view">×</button></form><img src="${safe(image)}" alt="${safe(product.name)}" loading="lazy"><div><p class="eyebrow">${safe(product.category)}</p><h2 id="quick-view-title">${safe(product.name)}</h2><p>${safe(product.description)}</p><strong>${C.utils.formatPKR(product.price)}</strong><div class="product-card__actions"><a class="button button--secondary" href="${safe(C.utils.url('product-details.html',{id:product.id}))}">View details</a><button class="button" type="button" data-add-to-cart="${safe(product.id)}">Add to cart</button></div></div></div>`;
      const img=dialog.querySelector('img');if(img)img.addEventListener('error',()=>{img.removeAttribute('src');img.classList.add('image-fallback');},{once:true});
      if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');
    });
  }
  function initDelegatedShopActions() {
    document.addEventListener('click',event=>{
      const add=event.target.closest('[data-add-to-cart]');
      if(add){const id=add.dataset.addToCart;const p=C.utils.productById(id);if(!p){toast('This demo product is unavailable.','error');return;}if(p.stock<=0){toast('This item is currently out of stock.','error');return;}const already=C.storage.getCart().filter(x=>x.productId===id).reduce((sum,x)=>sum+x.quantity,0);if(already>=p.stock){toast('The available demo stock is already in your cart.','error');return;}C.storage.addCart(id,1,'');refreshCounts();document.dispatchEvent(new CustomEvent('craftora:cart-change'));toast(p.name+' added to your cart.');return;}
      const wish=event.target.closest('[data-toggle-wishlist]');
      if(wish){const id=wish.dataset.toggleWishlist;const p=C.utils.productById(id);if(!p){toast('This saved product is unavailable.','error');return;}const added=C.storage.toggleWishlist(id);refreshCounts();document.dispatchEvent(new CustomEvent('craftora:wishlist-change'));toast(added?'Saved to your wishlist.':'Removed from your wishlist.');return;}
    });
  }
  function initImageFallbacks() {
    document.addEventListener('error',event=>{
      const img=event.target;if(!(img instanceof HTMLImageElement)||img.dataset.fallbackApplied)return;
      img.dataset.fallbackApplied='true';img.removeAttribute('src');img.alt=img.alt||'Image unavailable';img.classList.add('image-fallback');
    },true);
  }
  function init() {initNavigation();initTabs();initAccordions();initQuickView();initDelegatedShopActions();initImageFallbacks();refreshCounts();}
  C.components={toast,refreshCounts,init};
  document.addEventListener('DOMContentLoaded',init,{once:true});
})();
