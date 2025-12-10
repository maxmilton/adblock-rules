(function () {
  "use strict";
  function noop() {}
  globalThis.gtag = noop;
  globalThis.initializeGA = noop;
  globalThis.hookupListenerForGA = noop;
})();
