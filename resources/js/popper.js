import Popper from '@popperjs/core';

// Use Popper.js
const tooltip = document.getElementById('tooltip');
const tooltipTrigger = document.getElementById('tooltipTrigger');
new Popper(tooltipTrigger, tooltip, {
  placement: 'bottom',
});
