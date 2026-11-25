/* Shared formatting, validation, routing and pricing functions. */
(function () {
  'use strict';
  const C=window.Craftora=window.Craftora||{};
  const formatPKR = amount => 'Rs. ' + new Intl.NumberFormat('en-PK',{maximumFractionDigits:0}).format(Math.max(0,Math.round(Number(amount)||0)));
  function calculate(items, deliveryMethod='standard', discountCode='') {
    const subtotal=items.reduce((sum,item)=>sum+Math.max(0,Number(item.price)||0)*Math.max(0,Number(item.quantity)||0),0);
    const code=String(discountCode||'').trim().toUpperCase();
    const discount=code==='CRAFT10'?Math.min(Math.round(subtotal*0.10),1500):0;
    const delivery=deliveryMethod==='express'?450:(subtotal>=10000||subtotal===0?0:250);
    return {subtotal,discount,delivery,total:Math.max(0,subtotal-discount+delivery)};
  }
  const escapeHTML = value => String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const emailValid = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value||'').trim());
  const phoneValid = value => /^(?:\+92|0)3\d{9}$/.test(String(value||'').replace(/[\s-]/g,''));
  const productById = id => C.storage.getManagedProducts().find(p=>p.id===id) || null;
  const artisanById = id => C.data.artisans.find(a=>a.id===id) || null;
  const currentPage = () => document.body?.dataset.page || '';
  const isHome = () => currentPage()==='home-page';
  const url = (file, params={}) => {
    const target=(isHome()?'pages/':'')+file;
    const query=new URLSearchParams(Object.entries(params).filter(([,v])=>v!==undefined&&v!==null&&String(v)!==''));
    return target+(query.toString()?'?'+query.toString():'');
  };
  const query = key => new URLSearchParams(window.location.search).get(key);
  const makeId = prefix => prefix+'-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase();
  const sumCart = cart => cart.map(row=>{const p=productById(row.productId);return {price:p?.price||0,quantity:row.quantity};});
  function deductInventory(products, purchasedLines) {
    const totals=new Map();
    (Array.isArray(purchasedLines)?purchasedLines:[]).forEach(line=>{if(line&&typeof line.productId==='string'&&Number.isInteger(Number(line.quantity))&&Number(line.quantity)>0)totals.set(line.productId,(totals.get(line.productId)||0)+Number(line.quantity));});
    return (Array.isArray(products)?products:[]).map(product=>totals.has(product.id)?{...product,stock:Math.max(0,(Number(product.stock)||0)-totals.get(product.id))}:product);
  }
  C.utils={formatPKR,calculate,escapeHTML,emailValid,phoneValid,productById,artisanById,currentPage,isHome,url,query,makeId,sumCart,deductInventory};
})();
