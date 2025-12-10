(function () {
  "use strict";
  function noop() {}
  ((globalThis.google ??= {}).accounts ??= {}).id ??= {
    initialize: noop,
    renderButton: noop,
    disableAutoSelect: noop,
  };
})();
