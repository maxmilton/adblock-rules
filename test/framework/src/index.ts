/* oxlint-disable no-console */

// oxlint-disable-next-line require-module-specifiers
export {};

window.addEventListener(
  "load",
  () => {
    console.log("<iframe> count:", document.querySelectorAll("iframe").length);
    console.log("<object> count:", document.querySelectorAll("object").length);
    console.log("<embed> count:", document.querySelectorAll("embed").length);
  },
  { once: true },
);

/**
 * @param parentId - The parent element's ID.
 * @param text - The text to display.
 * @param ok - Whether the element is loaded or blocked.
 */
function setStatus(parentId: string, text: string, ok: boolean) {
  const statusElement = document.querySelector(`#${parentId}-status`)!;
  statusElement.textContent = text;
  statusElement.className = `status ${ok ? "loaded" : "blocked"}`;
}

function handleIframeLoad(event: Event) {
  const target = event.currentTarget as HTMLIFrameElement;
  console.debug("iframe loaded", target.id, event);
  setTimeout(() => {
    console.debug("iframe loaded (2)", target.id, event);
    try {
      // This will throw an error if the iframe is loaded but cross-origin,
      // or if it's completely blocked
      const iframeDocument = target.contentDocument || target.contentWindow!.document;
      console.debug("iframe document", iframeDocument);

      // If we get here, it's likely same-origin and loaded
      if (iframeDocument.documentElement.outerHTML === "<html><head></head><body></body></html>") {
        setStatus(target.id, "Loaded (empty)", true);
      } else {
        setStatus(target.id, "Loaded", true);
      }
    } catch (error) {
      console.error("iframe error", error);
      setStatus(target.id, "Blocked or Failed to Load", false);
    }
  }, 1000);
}

function handleObjectLoad(event: Event) {
  const target = event.currentTarget as HTMLObjectElement;
  console.debug("object loaded", target.id, event);
  setTimeout(() => {
    console.debug("object loaded (2)", target.id, event);
  }, 1000);
}

function handleEmbedLoad(event: Event) {
  const target = event.currentTarget as HTMLEmbedElement;
  console.debug("embed loaded", target.id, event);
  setTimeout(() => {
    console.debug("embed loaded (2)", target.id, event);
  }, 1000);
}

function handleIframeError(event: Event) {
  const target = event.currentTarget as HTMLIFrameElement;
  console.debug("iframe error", target.id, event);
  setStatus(target.id, "Error", false);
}

function handleObjectError(event: Event) {
  const target = event.currentTarget as HTMLObjectElement;
  console.debug("object error", target.id, event);
  setStatus(target.id, "Error", false);
}

function handleEmbedError(event: Event) {
  const target = event.currentTarget as HTMLEmbedElement;
  console.debug("embed error", target.id, event);
  setStatus(target.id, "Error", false);
}

function handleIframeAbort(event: Event) {
  const target = event.currentTarget as HTMLIFrameElement;
  console.debug("iframe abort", target.id, event);
  setStatus(target.id, "Abort", false);
}

function handleObjectAbort(event: Event) {
  const target = event.currentTarget as HTMLObjectElement;
  console.debug("object abort", target.id, event);
  setStatus(target.id, "Abort", false);
}

function handleEmbedAbort(event: Event) {
  const target = event.currentTarget as HTMLEmbedElement;
  console.debug("embed abort", target.id, event);
  setStatus(target.id, "Abort", false);
}

// Because this script is executed in the HTML document head, this observer will see every node mutation from the time
new MutationObserver((list, _observer) => {
  for (const mutation of list) {
    if (mutation.type === "childList") {
      for (const node of mutation.addedNodes) {
        switch (node instanceof Element && node.tagName) {
          case "IFRAME":
            node.addEventListener("load", handleIframeLoad);
            node.addEventListener("error", handleIframeError);
            node.addEventListener("abort", handleIframeAbort);
            break;
          case "OBJECT":
            node.addEventListener("load", handleObjectLoad);
            node.addEventListener("error", handleObjectError);
            node.addEventListener("abort", handleObjectAbort);
            break;

          case "EMBED":
            node.addEventListener("load", handleEmbedLoad);
            node.addEventListener("error", handleEmbedError);
            node.addEventListener("abort", handleEmbedAbort);
            break;

          default:
            break;
        }
      }
    }
  }
}).observe(document, { childList: true, subtree: true });
