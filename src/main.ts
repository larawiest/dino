import './app.css'
import { mount } from 'svelte';
import App from './App.svelte'

// svelte 5
const app = mount(App, { target: document.getElementById("app") });

export default app
