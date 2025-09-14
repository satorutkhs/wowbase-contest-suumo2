class WorldClock {
    constructor() {
        this.timezones = new Set();
        this.updateInterval = null;
        this.clocksContainer = document.getElementById('clocks-container');
        this.errorMessage = document.getElementById('error-message');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.addDefaultTimezones();
        this.startClock();
        this.showEmptyState();
    }

    setupEventListeners() {
        // Add timezone from dropdown
        document.getElementById('add-timezone-btn').addEventListener('click', () => {
            const select = document.getElementById('timezone-select');
            const timezone = select.value;
            if (timezone) {
                this.addTimezone(timezone);
                select.value = ''; // Reset selection
            }
        });

        // Add custom timezone
        document.getElementById('add-custom-btn').addEventListener('click', () => {
            const input = document.getElementById('custom-timezone');
            const timezone = input.value.trim();
            if (timezone) {
                this.addTimezone(timezone);
                input.value = ''; // Clear input
            }
        });

        // Allow Enter key for custom timezone input
        document.getElementById('custom-timezone').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('add-custom-btn').click();
            }
        });

        // Allow Enter key for timezone select
        document.getElementById('timezone-select').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('add-timezone-btn').click();
            }
        });
    }

    addDefaultTimezones() {
        // Add a few default timezones for better user experience
        const defaultTimezones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
        defaultTimezones.forEach(tz => {
            this.addTimezone(tz, false); // Don't show success message for defaults
        });
    }

    addTimezone(timezone, showSuccess = true) {
        // Check if timezone already exists
        if (this.timezones.has(timezone)) {
            this.showError(`${timezone} is already added.`);
            return;
        }

        // Validate timezone
        if (!this.isValidTimezone(timezone)) {
            this.showError(`Invalid timezone: ${timezone}. Please check the spelling and format.`);
            return;
        }

        // Add timezone
        this.timezones.add(timezone);
        this.createClockCard(timezone);
        this.hideEmptyState();
        this.hideError();
        
        if (showSuccess) {
            this.showSuccess(`Added ${timezone} successfully!`);
        }
    }

    removeTimezone(timezone) {
        this.timezones.delete(timezone);
        const clockCard = document.querySelector(`[data-timezone="${timezone}"]`);
        if (clockCard) {
            clockCard.remove();
        }

        // Show empty state if no timezones left
        if (this.timezones.size === 0) {
            this.showEmptyState();
        }
    }

    isValidTimezone(timezone) {
        try {
            // Test if the timezone is valid by trying to create a formatter
            new Intl.DateTimeFormat('en-US', { timeZone: timezone });
            return true;
        } catch (error) {
            return false;
        }
    }

    createClockCard(timezone) {
        const clockCard = document.createElement('div');
        clockCard.className = 'clock-card';
        clockCard.setAttribute('data-timezone', timezone);

        const timezoneName = this.getTimezoneDisplayName(timezone);
        
        clockCard.innerHTML = `
            <button class="remove-btn" onclick="worldClock.removeTimezone('${timezone}')" aria-label="Remove ${timezoneName}">×</button>
            <div class="timezone-name">${timezoneName}</div>
            <div class="time-display" id="time-${timezone.replace(/[^a-zA-Z0-9]/g, '_')}">--:--:--</div>
            <div class="date-display" id="date-${timezone.replace(/[^a-zA-Z0-9]/g, '_')}">Loading...</div>
        `;

        this.clocksContainer.appendChild(clockCard);
        this.updateClockCard(timezone);
    }

    getTimezoneDisplayName(timezone) {
        // Convert timezone identifier to human-readable name
        if (timezone === 'UTC') return 'UTC';
        
        const parts = timezone.split('/');
        if (parts.length >= 2) {
            return parts[parts.length - 1].replace(/_/g, ' ');
        }
        return timezone.replace(/_/g, ' ');
    }

    updateClockCard(timezone) {
        try {
            const now = new Date();
            const safeTimezoneId = timezone.replace(/[^a-zA-Z0-9]/g, '_');
            
            // Format time
            const timeFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            // Format date
            const dateFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const timeElement = document.getElementById(`time-${safeTimezoneId}`);
            const dateElement = document.getElementById(`date-${safeTimezoneId}`);
            
            if (timeElement && dateElement) {
                timeElement.textContent = timeFormatter.format(now);
                dateElement.textContent = dateFormatter.format(now);
            }
        } catch (error) {
            console.error(`Error updating clock for ${timezone}:`, error);
            // Handle error gracefully - maybe the timezone was removed
            const timeElement = document.getElementById(`time-${timezone.replace(/[^a-zA-Z0-9]/g, '_')}`);
            const dateElement = document.getElementById(`date-${timezone.replace(/[^a-zA-Z0-9]/g, '_')}`);
            
            if (timeElement) timeElement.textContent = 'Error';
            if (dateElement) dateElement.textContent = 'Invalid timezone';
        }
    }

    updateAllClocks() {
        this.timezones.forEach(timezone => {
            this.updateClockCard(timezone);
        });
    }

    startClock() {
        // Update immediately
        this.updateAllClocks();
        
        // Update every second
        this.updateInterval = setInterval(() => {
            this.updateAllClocks();
        }, 1000);
    }

    stopClock() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.className = 'error-message show';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    hideError() {
        this.errorMessage.className = 'error-message';
    }

    showSuccess(message) {
        // Create temporary success message
        const successMessage = document.createElement('div');
        successMessage.textContent = message;
        successMessage.style.cssText = `
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #28a745;
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            animation: fadeInUp 0.3s ease-out;
        `;
        
        document.body.appendChild(successMessage);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }

    showEmptyState() {
        if (this.timezones.size === 0) {
            this.clocksContainer.innerHTML = `
                <div class="empty-state">
                    <h3>No Timezones Added</h3>
                    <p>Select a timezone from the dropdown above or enter a custom one to get started.</p>
                </div>
            `;
        }
    }

    hideEmptyState() {
        const emptyState = this.clocksContainer.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
    }

    // Public method to restart clock if needed
    restart() {
        this.stopClock();
        this.startClock();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.worldClock = new WorldClock();
});

// Handle page visibility changes to optimize performance
document.addEventListener('visibilitychange', () => {
    if (window.worldClock) {
        if (document.hidden) {
            window.worldClock.stopClock();
        } else {
            window.worldClock.startClock();
        }
    }
});

// Handle errors gracefully
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    if (window.worldClock) {
        window.worldClock.showError('An unexpected error occurred. Please refresh the page.');
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (window.worldClock) {
        window.worldClock.showError('An unexpected error occurred. Please refresh the page.');
    }
});