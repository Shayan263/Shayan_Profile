(() => {
  "use strict";
  const panel=document.getElementById("recruiterPanel"),overlay=document.getElementById("recruiterOverlay");
  const openButton=document.getElementById("recruiterCornerToggle"),closeButton=document.getElementById("recruiterPanelClose");
  if(!panel||!overlay||!openButton||!closeButton)return;
  let previousFocus=null;
  function openPanel(){
    previousFocus=document.activeElement;overlay.hidden=false;
    requestAnimationFrame(()=>overlay.classList.add("is-open"));
    panel.classList.add("is-open");panel.setAttribute("aria-hidden","false");
    openButton.setAttribute("aria-expanded","true");document.body.style.overflow="hidden";closeButton.focus();
  }
  function closePanel(){
    panel.classList.remove("is-open");overlay.classList.remove("is-open");
    panel.setAttribute("aria-hidden","true");openButton.setAttribute("aria-expanded","false");
    document.body.style.overflow="";window.setTimeout(()=>{overlay.hidden=true;},280);
    if(previousFocus&&typeof previousFocus.focus==="function")previousFocus.focus();
  }
  openButton.addEventListener("click",openPanel);closeButton.addEventListener("click",closePanel);overlay.addEventListener("click",closePanel);
  document.addEventListener("keydown",event=>{
    if(!panel.classList.contains("is-open"))return;
    if(event.key==="Escape"){closePanel();return;}
    if(event.key==="Tab"){
      const focusable=[...panel.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')];
      if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  const projectsLink=document.getElementById("recruiterProjectsLink");
  if(projectsLink)projectsLink.addEventListener("click",()=>closePanel());
})();
