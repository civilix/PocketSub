(function() {
    'use strict';

    function removeDrawingElements() {
        // Target specific child elements first to avoid removing parent containers
        // The user wants to remove the box containing the drawing download area.

        // Strategy 1: Find by class .MaisokuDisplayArea
        const displayAreas = document.querySelectorAll('.MaisokuDisplayArea');
        displayAreas.forEach(area => {
            const container = area.closest('.itandi-bb-ui__Box');
            if (container) {
                container.remove();
                console.log('Removed Maisoku drawing element (by class).');
            }
        });

        // Strategy 2: Find by text "図面ダウンロード"
        // We look for elements that contain this text directly or deep inside,
        // but we start from the button text class as seen in the snippet: .itandi-bb-ui__Button__Text
        const textElements = document.querySelectorAll('.itandi-bb-ui__Button__Text');
        textElements.forEach(el => {
            if (el.innerText && el.innerText.includes('図面ダウンロード')) {
                const container = el.closest('.itandi-bb-ui__Box');
                if (container) {
                    container.remove();
                    console.log('Removed Maisoku drawing element (by text).');
                }
            }
        });
    }

    // Run immediately
    removeDrawingElements();

    // Observe for dynamic content changes
    const observer = new MutationObserver((mutations) => {
        let shouldRun = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                shouldRun = true;
                break;
            }
        }

        if (shouldRun) {
            removeDrawingElements();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
