import { Sidebar } from "./components/sidebar.js";  
import { Modals } from "./components/modals.js";

document.addEventListener("DOMContentLoaded", () => {
    // Initialize sidebar
    Sidebar.init();

    // Initialize modals
    Modals.init();
});