// analytics.js - Enhanced Analytics Tracking

class AnalyticsTracker {
    constructor() {
        this.gaId = 'G-K2MN0CZX8M';
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        // Load GA4 Script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
        document.head.appendChild(script);
        
        // Configure GA4
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', this.gaId, {
            'page_title': document.title,
            'page_location': window.location.href,
            'page_path': window.location.pathname
        });
        
        this.initialized = true;
        console.log('Analytics initialized');
    }

    trackEvent(category, action, label, value = null) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value
            });
        }
    }

    trackDownload(version) {
        this.trackEvent('download', 'software_download', version, 1);
    }

    trackPageView() {
        this.trackEvent('engagement', 'page_view', document.title);
    }

    trackTimeOnPage() {
        // Track time on page
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            let timeSpent = Date.now() - startTime;
            this.trackEvent('engagement', 'time_spent', 'page_duration', Math.round(timeSpent / 1000));
        });
    }
}

// Initialize
const analytics = new AnalyticsTracker();
document.addEventListener('DOMContentLoaded', () => {
    analytics.init();
    analytics.trackPageView();
    analytics.trackTimeOnPage();
    
    // Track downloads
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const version = this.textContent.includes('DirectX') ? 'DirectX12' : 
                           this.textContent.includes('NVIDIA') ? 'NVIDIA' : 'GitHub';
            analytics.trackDownload(version);
        });
    });
    
    // Track navigation clicks
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            analytics.trackEvent('navigation', 'menu_click', this.textContent);
        });
    });
});