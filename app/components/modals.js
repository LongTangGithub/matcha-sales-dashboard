export const Modals = {
    isOpen: false,
    currentModalType: null,

    elements: {},

    init() {
        try {
            this.elements = {
                overlay: document.getElementById("modal-overlay"),
                backdrop: document.querySelector(".modal-backdrop"),
                container: document.querySelector(".modal-container"),
                close: document.getElementById("modal-close"),
                title: document.getElementById("modal-title"),
                content: document.getElementById("modal-content"),
                metricCardsGrid: document.querySelector(".metric-cards__grid")
            };

            if ( !this.elements.overlay || !this.elements.metricCardsGrid ) {
                throw new Error("Required modal elements not found");
            }

            // Bind the events listeners
            this.bindEvents();

            console.log("Modal initialized successfully");
        } catch ( error ) {
            console.error("Error initializing modal:", error);
        }
    },

    bindEvents() {
        // Metric cards click (event delegation)
        this.elements.metricCardsGrid.addEventListener('click', ( e ) => {
            const metricCard = e.target.closest('.metric-cards');

            if( metricCard ) {
                // Add visual feedback
                metricCard.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    metricCard.style.transform = '';
                }, 150);

                // Get metric type from title
                const titleElement = metricCard.querySelector('.metric-cards__title');
                const metricType = titleElement.textContent.trim();

                this.isOpen( metricType );
            }
        });

        // Close button click
        this.elements.close.addEventsListener('click', () => {
            this.close();
        });

        // Backdrop click to close
        this.elements.backdrop.addEventListener('click', () => {
            this.close();
        })

        // Escape key to close
        document.addEventListener('keydown', (e ) => {
            if( e.key === 'Escape' && this.isOpen ) {
                this.close();
            }
        });

        // Listen for transition end to update state
        this.elements.overlay.addEventListener('transitionend', ( e ) => {
            if ( e.propertyName === 'opacity' && !this.isOpen ) {
                // Animation completed, ensure modal is hidden
                this.elements.overlay.classList.add('modal-hidden');
                this.elements.overlay.classList.remove('modal-visible');

                // Restore body scrolling
                document.body.style.overflow = '';
            }
        });
    },

    // Open modal with specific content
    open( metricType ) {
        // Prevent multiple modals
        if ( this.isOpen ) {
            this.close();

            // Small delay to allow closing animation
            setTimeout(() => this.open( metricType ), 100 );
            return;
        }

        this.currentModalType = metricType;

        // Set modal content
        this.setModalContent( metricType );
        this.setModalTitle( metricType );

        // Show modal
        this.elements.overlay.classList.remove('modal-hidden');
        this.elements.overlay.classList.add('modal-visible');

        // Prevent scrolling
        document.body.style.overflow = 'hidden';

        this.isOpen = true;

        // Update icons ( for the close button and content icons )
        lucide.createIcons();

    },

    close() {
        // Start the closing animation
        this.elements.overlay.classList.add('modal-visible');
        this.elements.overlay.classList.remove('modal-hidden');

        this.isOpen = false;
        this.currentModalType = null;

        // let CSS handle the animation timing
        // The transitioned event will clean up classes and restore scrolling
    },

    setModalTitle( metricType ) {
        const icons = {
            'Total Revenue': 'dollar-sign',
            'Monthly Sales': 'calendar',
            'Active Deals': 'target',
            'Conversion Rate': 'users',
        };

        const icon = icons[metricType] || 'bar-chart';

        // Set the title with the icon and metric type
        this.elements.title.innerHTML = `
            <i data-lucide="${icon}"></i>
            ${metricType} Breakdown
        `;
    },

    setModalContent( metricType ) {
        // Placeholder content for now - will be replaced with actual content
        const placeholderContent = {
            'Total Revenue': `
                <div class="text-center py-8">
                    <h3 class="text-lg font-medium text-[#315a39] mb-4">Revenue Analysis</h3>
                </div>
            `,
            'Monthly Sales': `
                <div class="text-center py-8">
                    <h3 class="text-lg font-medium text-[#315a39] mb-4">Monthly Sales Analysis</h3>
                    <p class="text-gray-600">Daily sales breakdown coming soon...</p>
                </div>
            `,
            'Active Deals': `
                <div class="text-center py-8">
                    <h3 class="text-lg font-medium text-[#315a39] mb-4">Active Deals Pipeline</h3>
                    <p class="text-gray-600">Pipeline analysis coming soon...</p>
                </div>
            `,
            'Conversion Rate': `
                <div class="text-center py-8">
                    <h3 class="text-lg font-medium text-[#315a39] mb-4">Conversion Funnel Analysis</h3>
                    <p class="text-gray-600">Funnel breakdown coming soon...</p>
                </div>
            `
        };

        this.elements.content.innerHTML = placeholderContent[metricType] || '<p>Content not found</p>';
    }
}