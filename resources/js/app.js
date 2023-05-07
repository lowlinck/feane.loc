import './bootstrap';
import { createApp } from 'vue';
import axios from 'axios';

import ExampleComponent from './components/ExampleComponent.vue';
import VueCarusel from './components/VueCarusel.vue';
import xTime from './components/xTime.vue';
const tooltip = document.getElementById('tooltip');
const tooltipTrigger = document.getElementById('tooltipTrigger');


/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

const app = createApp({});


app.component('example-component', ExampleComponent);
app.component('vue-carusel', VueCarusel);
app.component('x-times', xTime);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */

app.mount('#app');
