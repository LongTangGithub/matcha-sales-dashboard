export const Sidebar = {

    // State
    isOpen: false,

    // DOM elements cache
    elements: {},

    // Initialize sidebar functionality
    init() {
        try {
            // Cache DOM elements
            this.elements = {
                overlay: document.getElementById("sidebar-overlay"),
                backdrop: document.getElementById("sidebar-backdrop"),
                panel: document.getElementById("sidebar-panel"),
                close: document.getElementById("sidebar-close"),
                menu: document.getElementById("menu-button"),
            };

            // Verifying required elements exist
            if (!this.elements.overlay || !this.elements.menu) {
                throw new Error("Required sidebar elements not found");
            }

            // Bind event listeners
            this.bindEvents();

            console.log("Sidebar initialized successfully");
        } catch (error) {
            console.error("Error initializing sidebar:", error);
        }
    },

    bindEvents() {
        // Menu button click
        this.elements.menu.addEventListener('click', () => {
            this.toggle();
        });

        // Close button click
        this.elements.close.addEventListener('click', () => {
            this.close();
        });

        // Backdrop click to close
        this.elements.backdrop.addEventListener('click', () => {
            this.close();
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    },

    // Toggle sidebar state
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    // Open sidebar
    open() {
        this.elements.overlay.classList.remove('sidebar-hidden');
        this.elements.overlay.classList.add('sidebar-visible');
        this.elements.panel.classList.remove('-translate-x-full');
        this.elements.panel.classList.add('translate-x-0');
        this.isOpen = true;
    },

    close() {
        this.elements.overlay.classList.remove('sidebar-visible');
        this.elements.overlay.classList.add('sidebar-hidden');
        this.elements.panel.classList.remove('translate-x-0');
        this.elements.panel.classList.add('-translate-x-full');
        this.isOpen = false;
    },
}