import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    ym: (id: number, method: string, ...args: any[]) => void;
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const YANDEX_METRIKA_ID = 'YOUR_YANDEX_METRIKA_ID';
const GOOGLE_ANALYTICS_ID = 'YOUR_GA_MEASUREMENT_ID';

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    const ymScript = document.createElement('script');
    ymScript.type = 'text/javascript';
    ymScript.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(${YANDEX_METRIKA_ID}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      });
    `;
    document.head.appendChild(ymScript);

    const ymNoScript = document.createElement('noscript');
    ymNoScript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}" style="position:absolute; left:-9999px;" alt="" /></div>`;
    document.body.appendChild(ymNoScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ANALYTICS_ID);

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    document.head.appendChild(gaScript);

    return () => {
      if (ymScript.parentNode) ymScript.parentNode.removeChild(ymScript);
      if (ymNoScript.parentNode) ymNoScript.parentNode.removeChild(ymNoScript);
      if (gaScript.parentNode) gaScript.parentNode.removeChild(gaScript);
    };
  }, []);

  useEffect(() => {
    if (window.ym) {
      window.ym(parseInt(YANDEX_METRIKA_ID), 'hit', location.pathname + location.search);
    }
    
    if (window.gtag) {
      window.gtag('config', GOOGLE_ANALYTICS_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};
