/**
 * PDF Download functionality for ShamanTek articles
 * Creates a clean printable version in an iframe to avoid CSS conflicts
 */

(function() {
    'use strict';

    /**
     * Extracts the main text content from the page
     */
    function extractContent() {
        // Get the title
        const title = document.querySelector('h1')?.textContent ||
                     document.querySelector('.hero-title')?.textContent ||
                     document.title.split('—')[0].trim();

        // Get subtitle if exists
        const subtitle = document.querySelector('.hero-subtitle')?.textContent ||
                        document.querySelector('.subtitle')?.textContent ||
                        '';

        // Find main content - try different selectors
        let contentHTML = '';

        // For La Llave y otros con main.main
        const mainContent = document.querySelector('main.main');
        if (mainContent) {
            // Clone and process
            const clone = mainContent.cloneNode(true);
            // Remove unwanted elements
            clone.querySelectorAll('.nav, .toc-progress, .scroll-indicator, .footer-nav, svg, canvas, .pdf-download-container').forEach(el => el.remove());
            contentHTML = clone.innerHTML;
        }

        // For articles with article tag
        if (!contentHTML) {
            const article = document.querySelector('article');
            if (article) {
                const clone = article.cloneNode(true);
                clone.querySelectorAll('svg, canvas').forEach(el => el.remove());
                contentHTML = clone.innerHTML;
            }
        }

        // For Moléculas y Máquinas - access timelineData directly (it's lazy loaded)
        if (!contentHTML || contentHTML.trim().length < 500) {
            // Check if timelineData exists (defined in moleculas-maquinas.js)
            if (typeof timelineData !== 'undefined' && Array.isArray(timelineData)) {
                let html = '';

                // Get intro from DOM
                const intro = document.querySelector('.intro, section.intro');
                if (intro) {
                    const h1 = intro.querySelector('h1')?.textContent || '';
                    const introP = intro.querySelector('p')?.textContent || '';
                    html += `<div class="intro"><h1>${h1}</h1><p>${introP}</p></div>`;
                }

                // Generate ALL events from timelineData array
                console.log('Found timelineData with', timelineData.length, 'events');
                timelineData.forEach(event => {
                    let perspectivesHtml = '';
                    if (event.type === 'crossover' && event.left && event.right) {
                        perspectivesHtml = `
                            <p><em>Molécula:</em> ${event.left}</p>
                            <p><em>Máquina:</em> ${event.right}</p>
                        `;
                    }

                    const substanceHtml = event.substance ? `<p><small>Sustancia: ${event.substance}</small></p>` : '';

                    html += `
                        <div class="event">
                            <h3>${event.year} — ${event.title}</h3>
                            <p>${event.content}</p>
                            ${perspectivesHtml}
                            ${substanceHtml}
                        </div>
                    `;
                });

                // Get conclusion from DOM
                const conclusion = document.querySelector('.conclusion, section.conclusion');
                if (conclusion) {
                    const conclusionClone = conclusion.cloneNode(true);
                    conclusionClone.querySelectorAll('svg').forEach(el => el.remove());
                    html += '<div class="conclusion">' + conclusionClone.innerHTML + '</div>';
                }

                if (html) contentHTML = html;
            } else {
                // Fallback: try to get events from DOM
                const intro = document.querySelector('.intro, section.intro');
                const events = document.querySelectorAll('.event, article.event');
                const conclusion = document.querySelector('.conclusion, section.conclusion');

                if (intro || events.length > 0 || conclusion) {
                    let html = '';

                    if (intro) {
                        const h1 = intro.querySelector('h1')?.textContent || '';
                        const introP = intro.querySelector('p')?.textContent || '';
                        html += `<div class="intro"><h1>${h1}</h1><p>${introP}</p></div>`;
                    }

                    events.forEach(event => {
                        const year = event.querySelector('.event-year, .crossover-year')?.textContent || '';
                        const eventTitle = event.querySelector('.event-title, h3')?.textContent || '';
                        const content = event.querySelector('.event-content, p.event-content')?.textContent || '';

                        html += `
                            <div class="event">
                                <h3>${year} — ${eventTitle}</h3>
                                <p>${content}</p>
                            </div>
                        `;
                    });

                    if (conclusion) {
                        const conclusionClone = conclusion.cloneNode(true);
                        conclusionClone.querySelectorAll('svg').forEach(el => el.remove());
                        html += '<div class="conclusion">' + conclusionClone.innerHTML + '</div>';
                    }

                    if (html) contentHTML = html;
                }
            }
        }

        // For container-based layouts
        if (!contentHTML || contentHTML.trim().length < 500) {
            const container = document.querySelector('.container');
            if (container) {
                const clone = container.cloneNode(true);
                clone.querySelectorAll('svg, canvas, header, nav').forEach(el => el.remove());
                contentHTML = clone.innerHTML;
            }
        }

        // Fallback - get all sections
        if (!contentHTML || contentHTML.trim().length < 500) {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const clone = section.cloneNode(true);
                clone.querySelectorAll('svg, canvas').forEach(el => el.remove());
                contentHTML += clone.innerHTML;
            });
        }

        return { title, subtitle, content: contentHTML };
    }

    /**
     * Creates an iframe with clean, printable content
     */
    function createPrintableFrame(data) {
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; border: none; z-index: 999998; background: white;';
        document.body.appendChild(iframe);

        // Debug: log content length
        console.log('PDF Content length:', data.content.length, 'chars');

        const doc = iframe.contentDocument || iframe.contentWindow.document;

        doc.open();
        doc.write(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${data.title} - ShamanTek</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.7;
            color: #000 !important;
            background: #fff !important;
            padding: 20px 40px;
            max-width: 800px;
            margin: 0 auto;
            height: auto !important;
            overflow: visible !important;
        }

        h1 {
            font-size: 28pt;
            margin-bottom: 10px;
            color: #000;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
        }

        .subtitle {
            font-size: 14pt;
            color: #444;
            font-style: italic;
            margin-bottom: 30px;
        }

        h2 {
            font-size: 18pt;
            margin: 30px 0 15px;
            color: #000;
            border-bottom: 1px solid #999;
            padding-bottom: 5px;
        }

        h3 {
            font-size: 14pt;
            margin: 25px 0 10px;
            color: #000;
        }

        h4 {
            font-size: 12pt;
            margin: 20px 0 8px;
            color: #000;
        }

        p {
            margin: 12px 0;
            color: #000;
            text-align: justify;
        }

        a {
            color: #000;
            text-decoration: underline;
        }

        blockquote {
            margin: 20px 0;
            padding: 15px 20px;
            border-left: 4px solid #666;
            background: #f5f5f5;
            font-style: italic;
            color: #000;
        }

        blockquote p {
            margin: 0;
        }

        .callout, .note, .warning, .data-highlight {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #999;
            background: #f9f9f9;
            color: #000;
        }

        ul, ol {
            margin: 15px 0 15px 30px;
            color: #000;
        }

        li {
            margin: 8px 0;
            color: #000;
        }

        .event {
            margin: 25px 0;
            padding-bottom: 20px;
            border-bottom: 1px dashed #ccc;
        }

        .event h3 {
            color: #000;
            margin-bottom: 10px;
        }

        strong, b {
            color: #000;
            font-weight: bold;
        }

        em, i {
            color: #000;
            font-style: italic;
        }

        .intro {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #000;
        }

        .intro h1 {
            text-align: center;
            border: none;
        }

        .intro p {
            text-align: center;
            font-size: 14pt;
        }

        .separator, hr {
            border: none;
            border-top: 1px solid #ccc;
            margin: 25px 0;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #999;
            text-align: center;
            font-size: 10pt;
            color: #666;
        }

        /* Hide any remaining problematic elements */
        svg, canvas, video, audio, iframe,
        .nav, .toc-progress, .progress-bar,
        .scroll-indicator, .pdf-download-container {
            display: none !important;
        }

        /* Ensure all text is visible */
        * {
            -webkit-text-fill-color: #000 !important;
        }

        @media print {
            html, body {
                padding: 0;
                height: auto !important;
                overflow: visible !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            @page {
                margin: 1.5cm;
                size: A4;
            }

            .event {
                page-break-inside: avoid;
            }

            h1, h2, h3 {
                page-break-after: avoid;
            }
        }
    </style>
</head>
<body>
    <h1>${data.title}</h1>
    ${data.subtitle ? `<p class="subtitle">${data.subtitle}</p>` : ''}

    <div class="content">
        ${data.content}
    </div>

    <div class="footer">
        ShamanTek • shamantek.com
    </div>
</body>
</html>
        `);
        doc.close();

        return iframe;
    }

    /**
     * Main download function
     */
    function downloadPDF(event) {
        event.preventDefault();

        // Show dialog
        const overlay = document.createElement('div');
        overlay.innerHTML = `
            <div style="
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.9); display: flex;
                align-items: center; justify-content: center; z-index: 999999;
            ">
                <div style="
                    background: #fff; padding: 2rem; border-radius: 8px;
                    max-width: 420px; text-align: center; color: #000;
                ">
                    <h3 style="margin: 0 0 1rem 0; color: #000; font-size: 1.3rem;">Descargar PDF</h3>
                    <p style="margin: 0 0 1.5rem 0; color: #333; line-height: 1.6;">
                        Se abrirá el diálogo de impresión.<br>
                        Selecciona <strong>"Guardar como PDF"</strong> o<br>
                        <strong>"Microsoft Print to PDF"</strong> como destino.
                    </p>
                    <button id="btn-print" style="
                        background: #000; color: #fff; border: none;
                        padding: 12px 24px; border-radius: 4px;
                        cursor: pointer; font-size: 1rem; margin-right: 10px;
                    ">Continuar</button>
                    <button id="btn-cancel" style="
                        background: #ddd; color: #000; border: none;
                        padding: 12px 24px; border-radius: 4px;
                        cursor: pointer; font-size: 1rem;
                    ">Cancelar</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('btn-cancel').onclick = () => overlay.remove();

        document.getElementById('btn-print').onclick = () => {
            overlay.remove();

            // Extract content
            const data = extractContent();

            // Create printable iframe
            const iframe = createPrintableFrame(data);

            // Wait for iframe to fully load and render, then print
            setTimeout(() => {
                // Scroll iframe to ensure all content is rendered
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                const iframeBody = iframeDoc.body;

                console.log('Iframe body height:', iframeBody.scrollHeight);

                iframe.contentWindow.focus();
                iframe.contentWindow.print();

                // Remove iframe after printing
                setTimeout(() => {
                    iframe.remove();
                }, 3000);
            }, 1000);
        };
    }

    /**
     * Initialize
     */
    function init() {
        document.querySelectorAll('.pdf-download-btn').forEach(btn => {
            btn.addEventListener('click', downloadPDF);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.ShamanTekPDF = { downloadPDF, init };
})();
