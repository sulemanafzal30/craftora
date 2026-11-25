/* Centralized, defensive localStorage access for the Craftora prototype. */
(function () {
  'use strict';
  const C = window.Craftora = window.Craftora || {};
  const KEYS = Object.freeze({
    cart:'craftora.cart.v1', wishlist:'craftora.wishlist.v1', orders:'craftora.orders.v1',
    customer:'craftora.customer.v1', applications:'craftora.artisanApplications.v1',
    artisan:'craftora.artisan.v1', products:'craftora.managedProducts.v1', discount:'craftora.discount.v1'
  });
  const clone = value => JSON.parse(JSON.stringify(value));
  const readArray = (key, fallback=[]) => { const value=read(key, fallback); return Array.isArray(value) ? value : clone(fallback); };
  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return clone(fallback);
      const parsed = JSON.parse(raw);
      return parsed === null || typeof parsed !== 'object' ? clone(fallback) : parsed;
    } catch (error) {
      console.warn('Craftora storage read reset:', key, error);
      try { localStorage.removeItem(key); } catch (_) {}
      return clone(fallback);
    }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (error) { console.error('Craftora could not save demo data:', error); return false; }
  }
  const validId = id => typeof id === 'string' && /^[a-zA-Z0-9_-]{1,40}$/.test(id);
  const getCart = () => readArray(KEYS.cart).filter(x => x && validId(x.productId)).map(x => ({productId:x.productId, quantity:Math.max(1,Math.min(99,Number.parseInt(x.quantity,10)||1)), variant:String(x.variant||'')}));
  const setCart = items => write(KEYS.cart, items.filter(x => x && validId(x.productId)).map(x => ({productId:x.productId,quantity:Math.max(1,Math.min(99,Number.parseInt(x.quantity,10)||1)),variant:String(x.variant||'')})));
  const getWishlist = () => [...new Set(readArray(KEYS.wishlist).filter(validId))];
  const setWishlist = items => write(KEYS.wishlist, [...new Set(items.filter(validId))]);
  const getOrders = () => readArray(KEYS.orders).filter(x => x && typeof x.id === 'string' && Array.isArray(x.items));
  const setOrders = orders => write(KEYS.orders, orders);
  const defaultCustomer = {name:'Craftora Guest',email:'guest@example.com',phone:'',address:'',city:'',province:'Punjab',postal:''};
  const getCustomer = () => { const saved=read(KEYS.customer, defaultCustomer); return {...defaultCustomer,...(saved && !Array.isArray(saved) && typeof saved==='object' ? saved : {})}; };
  const setCustomer = customer => write(KEYS.customer, {...defaultCustomer,...customer});
  const getApplications = () => readArray(KEYS.applications);
  const addApplication = application => { const items=getApplications(); items.unshift(application); return write(KEYS.applications,items); };
  const defaultArtisan = {id:'a001',name:'Zainab’s Loom',city:'Matiari',province:'Sindh',craft:'Ajrak & handwoven textiles',bio:'Fictional demo artisan profile.'};
  const getArtisan = () => { const saved=read(KEYS.artisan, defaultArtisan); return saved && !Array.isArray(saved) && typeof saved==='object' ? {...defaultArtisan,...saved} : {...defaultArtisan}; };
  const setArtisan = artisan => write(KEYS.artisan,artisan);
  const getManagedProducts = () => {
    const saved = read(KEYS.products, null);
    return Array.isArray(saved) ? saved.filter(p => p && validId(p.id) && typeof p.name==='string' && Number.isFinite(Number(p.price))) : clone(C.data.products);
  };
  const setManagedProducts = products => write(KEYS.products, Array.isArray(products) ? products : []);
  const getDiscount = () => { const saved=read(KEYS.discount, {code:'',amount:0}); return saved && !Array.isArray(saved) && typeof saved==='object' ? {code:String(saved.code||''),amount:Math.max(0,Number(saved.amount)||0)} : {code:'',amount:0}; };
  const setDiscount = discount => write(KEYS.discount,discount);
  function addCart(productId, quantity=1, variant='') {
    const items=getCart(); const existing=items.find(x=>x.productId===productId && x.variant===variant);
    if(existing) existing.quantity=Math.min(99,existing.quantity+quantity); else items.push({productId,quantity:Math.max(1,Math.min(99,quantity)),variant});
    return setCart(items);
  }
  function setCartQuantity(productId, quantity) {
    const items=getCart(); const item=items.find(x=>x.productId===productId);
    if(!item) return false;
    if(quantity<=0) return removeCart(productId);
    item.quantity=Math.min(99,Math.max(1,Math.floor(quantity))); return setCart(items);
  }
  function setCartItemQuantity(index, quantity) {
    const items=getCart(); if(!Number.isInteger(index) || index<0 || index>=items.length) return false;
    if(quantity<=0) return removeCartItem(index);
    items[index].quantity=Math.min(99,Math.max(1,Math.floor(quantity))); return setCart(items);
  }
  function removeCart(productId) { return setCart(getCart().filter(x=>x.productId!==productId)); }
  function removeCartItem(index) { const items=getCart(); if(!Number.isInteger(index)||index<0||index>=items.length) return false; items.splice(index,1); return setCart(items); }
  function toggleWishlist(productId) { const items=getWishlist(); const exists=items.includes(productId); setWishlist(exists?items.filter(id=>id!==productId):[...items,productId]); return !exists; }
  C.storage={KEYS,read,write,getCart,setCart,addCart,setCartQuantity,setCartItemQuantity,removeCart,removeCartItem,getWishlist,setWishlist,toggleWishlist,getOrders,setOrders,getCustomer,setCustomer,getApplications,addApplication,getArtisan,setArtisan,getManagedProducts,setManagedProducts,getDiscount,setDiscount};
})();
