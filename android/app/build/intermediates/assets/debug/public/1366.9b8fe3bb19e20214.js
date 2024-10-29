"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1366],{1366:(F,b,c)=>{c.r(b),c.d(b,{Tab4PageModule:()=>w});var i=c(4742),g=c(177),f=c(4341),v=c(5352),m=c(5171),h=c(467),d=c(4262),R=c(1785),_=c(7905),T=c(4412),e=c(4438),P=c(5621);const C=n=>({"selected-card":n});function M(n,l){if(1&n){const r=e.RV6();e.j41(0,"div",7)(1,"ion-button",4),e.bIt("click",function(){e.eBV(r);const o=e.XpG();return e.Njj(o.openNewRecipeModal())}),e.EFF(2,"Nueva receta"),e.k0s()()}}function I(n,l){if(1&n){const r=e.RV6();e.j41(0,"ion-col",3)(1,"ion-button",8),e.bIt("click",function(){e.eBV(r);const o=e.XpG();return e.Njj(o.eliminarRecetasSeleccionadas())}),e.EFF(2," Eliminar seleccionadas "),e.k0s()()}if(2&n){const r=e.XpG();e.R7$(),e.Y8G("disabled",!r.hayRecetasSeleccionadas())}}function y(n,l){if(1&n){const r=e.RV6();e.j41(0,"ion-col",3)(1,"ion-card",9),e.bIt("click",function(){const o=e.eBV(r).$implicit,a=e.XpG();return e.Njj(a.seleccionando?a.toggleSelection(o):a.openRecipeDetail(o))}),e.nrm(2,"ion-img",10),e.j41(3,"ion-card-header")(4,"ion-card-title",11)(5,"h6"),e.EFF(6),e.k0s()()(),e.j41(7,"ion-card-content"),e.nrm(8,"ion-icon",12),e.j41(9,"span",13),e.EFF(10),e.k0s()()()()}if(2&n){const r=l.$implicit,t=e.XpG();e.R7$(),e.Y8G("ngClass",e.eq3(4,C,r.selected)),e.R7$(),e.Y8G("src",r.imagen),e.R7$(4),e.JRh(r.titulo),e.R7$(4),e.JRh(t.formatTiempo(r.minutos))}}const N=[{path:"",component:(()=>{var n;class l{constructor(t,o,a,s){this.router=t,this.modalController=o,this.auth=a,this.firestore=s,this.recetas=[],this.filteredRecetas=[],this.searchTerm="",this.seleccionando=!1,this.userId="",this.authorNames=new Map}ngOnInit(){this.auth.onAuthStateChanged(t=>{t?(this.userId=t.uid,this.loadUserRecipes()):this.router.navigate(["/login"])})}loadUserRecipes(){var t=this;return(0,h.A)(function*(){try{const o=(0,d.rJ)(t.firestore,"recetas"),a=(0,d.P)(o,(0,d._M)("autorId","==",t.userId)),s=yield(0,d.GG)(a);t.recetas=s.docs.map(p=>({...p.data(),id:p.id,selected:!1})),t.filteredRecetas=t.recetas,t.loadAuthorNames()}catch(o){console.error("Error loading user recipes:",o)}})()}toggleSeleccionar(){this.seleccionando=!this.seleccionando,this.seleccionando||this.recetas.forEach(t=>t.selected=!1)}toggleSelection(t){t.selected=!t.selected}hayRecetasSeleccionadas(){return this.recetas.some(t=>t.selected)}eliminarRecetasSeleccionadas(){var t=this;return(0,h.A)(function*(){const o=t.recetas.filter(a=>a.selected);if(0!==o.length){for(const a of o)if(a.id)try{const s=(0,d.H9)(t.firestore,"recetas",a.id);yield(0,d.kd)(s),console.log(`Receta ${a.titulo} eliminada exitosamente`)}catch(s){console.error("Error al eliminar la receta: ",s)}else console.error("La receta no tiene un ID v\xe1lido: ",a);t.recetas=t.recetas.filter(a=>!a.selected),t.filteredRecetas=t.filteredRecetas.filter(a=>!a.selected)}else console.log("No hay recetas seleccionadas para eliminar")})()}loadAuthorNames(){var t=this;return(0,h.A)(function*(){for(const o of t.recetas){const a=o.autorId;if(a&&!t.authorNames.has(a)){const s=(0,d.H9)(t.firestore,`users/${a}`),u=(yield(0,d.x7)(s)).data();t.authorNames.set(a,new T.t(`${(null==u?void 0:u.firstName)||"Desconocido"} ${(null==u?void 0:u.lastName)||""}`).asObservable())}}})()}getAuthorName(t){return this.authorNames.get(t)||new T.t("Desconocido").asObservable()}filterRecipes(){const t=this.searchTerm.toLowerCase();this.filteredRecetas=this.recetas.filter(o=>o.titulo.toLowerCase().includes(t)||o.descripcion.toLowerCase().includes(t))}openNewRecipeModal(){var t=this;return(0,h.A)(function*(){const o=yield t.modalController.create({component:_.V});yield o.present(),yield o.onDidDismiss(),t.loadUserRecipes()})()}openRecipeDetail(t){var o=this;return(0,h.A)(function*(){return yield(yield o.modalController.create({component:R.G,componentProps:{receta:t}})).present()})()}formatTiempo(t){return t>=60?`${Math.floor(t/60)}h ${t%60}m`:`${t}m`}}return(n=l).\u0275fac=function(t){return new(t||n)(e.rXU(m.Ix),e.rXU(i.W3),e.rXU(P.Nj),e.rXU(d._7))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-tab4"]],decls:12,vars:6,consts:[[3,"fullscreen"],["placeholder","Buscar receta...",1,"round-searchbar",3,"ngModelChange","ionInput","ngModel"],["class","new-recipes-title",4,"ngIf"],["size","6"],["expand","block",3,"click"],["size","6",4,"ngIf"],["size","6",4,"ngFor","ngForOf"],[1,"new-recipes-title"],["expand","block",3,"click","disabled"],["color","light",3,"click","ngClass"],[2,"height","5rem","width","100%","object-fit","cover","overflow","hidden",3,"src"],[2,"overflow","hidden","white-space","nowrap","text-overflow","ellipsis"],["name","time-outline",1,"icon"],[1,"text"]],template:function(t,o){1&t&&(e.j41(0,"ion-content",0)(1,"ion-searchbar",1),e.mxI("ngModelChange",function(s){return e.DH7(o.searchTerm,s)||(o.searchTerm=s),s}),e.bIt("ionInput",function(){return o.filterRecipes()}),e.k0s(),e.DNE(2,M,3,0,"div",2),e.j41(3,"ion-grid")(4,"ion-row")(5,"ion-col",3)(6,"ion-button",4),e.bIt("click",function(){return o.toggleSeleccionar()}),e.EFF(7),e.k0s()(),e.DNE(8,I,3,1,"ion-col",5),e.k0s()(),e.j41(9,"ion-grid")(10,"ion-row"),e.DNE(11,y,11,6,"ion-col",6),e.k0s()()()),2&t&&(e.Y8G("fullscreen",!0),e.R7$(),e.R50("ngModel",o.searchTerm),e.R7$(),e.Y8G("ngIf",!o.seleccionando),e.R7$(5),e.SpI(" ",o.seleccionando?"Cancelar selecci\xf3n":"Seleccionar recetas"," "),e.R7$(),e.Y8G("ngIf",o.seleccionando),e.R7$(3),e.Y8G("ngForOf",o.filteredRecetas))},dependencies:[g.YU,g.Sq,g.bT,f.BC,f.vS,i.Jm,i.b_,i.I9,i.ME,i.tN,i.hU,i.W9,i.lO,i.iq,i.KW,i.ln,i.S1,i.Gw],styles:['@charset "UTF-8";.new-recipes-title[_ngcontent-%COMP%]{padding:8px;text-align:left;margin-top:8px;margin-bottom:8px}.new-recipes-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.8rem;color:#333}.round-searchbar[_ngcontent-%COMP%]{--border-radius: 20px;--background: #f4f4f4;--box-shadow: none;--ion-color-light-shade: transparent}.no-border-card[_ngcontent-%COMP%]{--border-width: 0;box-shadow:none}.rounded-img[_ngcontent-%COMP%]{border-radius:10px;overflow:hidden}.icon[_ngcontent-%COMP%]{display:inline-block;margin-right:3px;font-size:15px;vertical-align:middle}.text[_ngcontent-%COMP%]{display:inline-block;vertical-align:middle}.selected-card[_ngcontent-%COMP%]{border:2px solid #4CAF50;background-color:#4caf501a}']}),l})()}];let j=(()=>{var n;class l{}return(n=l).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[m.iI.forChild(N),m.iI]}),l})(),w=(()=>{var n;class l{}return(n=l).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[g.MD,f.YN,i.bv,j,v.S]}),l})()}}]);