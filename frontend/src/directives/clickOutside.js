// clickOutside.js
export default {
  mounted(el, binding) {
    // Define the event handler and attach it to the element object
    // so we can reference it later for removal
    el.clickOutsideEvent = (event) => {
      // Check if the click was outside the element and its children
      if (!(el === event.target || el.contains(event.target))) {
        // If it was outside, call the method provided in the attribute
        binding.value(event);
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    // Clean up the event listener when the element is destroyed
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};