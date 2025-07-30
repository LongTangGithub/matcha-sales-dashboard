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

        // Listen for transition end to update state
        this.elements.overlay.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'opacity' && !this.isOpen) {
                // Animation finished, ensure sidebar is hidden
                this.elements.overlay.classList.add('sidebar-hidden');
                this.elements.overlay.classList.remove('sidebar-visible');
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
        this.isOpen = true;
    },

    close() {
        // Start the closing animation
        this.elements.overlay.classList.remove('sidebar-visible');
        this.elements.overlay.classList.add('sidebar-hidden');
        this.isOpen = false;
        
        // Let CSS handle the animation timing
        // The transitionend event will clean up the classes
    },
}