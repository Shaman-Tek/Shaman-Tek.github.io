/*
    "El código es poesía."
                    — WordPress (y otros que entienden)
*/

// Console Easter Egg
console.log('%c🧬 MOLÉCULAS × MÁQUINAS', 'font-size: 16px; color: #a855f7; font-family: monospace; font-weight: bold;');
console.log('%c"Las dos hélices siguen entrelazadas."', 'color: #888; font-style: italic;');
console.log('%c—', 'color: #333;');
console.log('%cSHAMANTEK · 2026', 'color: #555; font-family: monospace;');

// Timeline Data
const timelineData = [
    { year: 1938, type: 'molecule', title: 'El accidente de Basilea', content: 'Albert Hofmann, buscando un estimulante circulatorio en los laboratorios Sandoz, sintetiza por accidente la dietilamida del ácido lisérgico. La molécula número 25 de su serie. Dormirá en un cajón durante cinco años.', source: 'A', substance: 'LSD-25' },
    { year: 1943, type: 'molecule', title: 'El día de la bicicleta', content: 'Hofmann absorbe accidentalmente una cantidad mínima por la piel. Tres días después, el 19 de abril, ingiere 250 microgramos deliberadamente y pedalea a casa en lo que será el primer viaje psicodélico documentado de la historia.', source: 'A', substance: 'LSD' },
    { year: 1945, type: 'machine', title: 'El cerebro de treinta toneladas', content: 'ENIAC cobra vida en la Universidad de Pensilvania. Ocupa una habitación entera, consume la energía de un vecindario, y puede hacer en segundos lo que a un humano le tomaría días. La era de las máquinas pensantes comienza.', source: 'A' },
    { year: 1953, type: 'molecule', title: 'La CIA entra al juego', content: 'Proyecto MKULTRA. La agencia cree que el LSD podría ser el suero de la verdad definitivo, o un arma para desestabilizar líderes enemigos. Experimentan con soldados, prisioneros, pacientes psiquiátricos—muchos sin su consentimiento.', source: 'A', substance: 'LSD' },
    { year: 1960, type: 'crossover', title: 'Cuando los ingenieros viajaron', content: 'A veinte minutos de Stanford, la International Foundation for Advanced Study ofrece sesiones de LSD a quien pueda pagarlas. Entre los visitantes: ingenieros, arquitectos, matemáticos. Doug Engelbart, el hombre que inventará el mouse, se sienta en una de esas sillas. Pasa horas mirando una pared.', source: 'B', left: 'LSD terapéutico llega a California', right: 'Los arquitectos del futuro digital prueban la molécula', substance: 'LSD' },
    { year: 1962, type: 'molecule', title: 'Harvard pierde a sus profetas', content: 'Timothy Leary y Richard Alpert administran psilocibina a prisioneros, teólogos, estudiantes de posgrado. Harvard los expulsa en 1963. Leary se convierte en evangelista. "Turn on, tune in, drop out" resonará por una década.', source: 'A', substance: 'Psilocibina' },
    { year: 1963, type: 'machine', title: 'El futuro en noventa minutos', content: 'En el Stanford Research Institute, Engelbart trabaja en algo que nadie entiende del todo. Un dispositivo que cabe en la mano y controla un cursor. Texto que se enlaza con otro texto. Videollamadas. Editores colaborativos. El futuro, comprimido en prototipos.', source: 'A' },
    { year: 1964, type: 'crossover', title: 'La mansión en la colina', content: 'Un millonario de Wall Street, agradecido por lo que el ácido hizo por su mente, regala una mansión en Millbrook a Timothy Leary. Se convierte en meca de peregrinos: poetas, músicos, buscadores. Un joven vaquero de Wyoming llamado John Perry Barlow visitar con frecuencia. Décadas después, cofundará la Electronic Frontier Foundation.', source: 'A', left: 'Leary establece su laboratorio de consciencia', right: 'Los futuros arquitectos de internet encuentran su tribu', substance: 'LSD / Psilocibina / DMT' },
    { year: 1966, type: 'crossover', title: 'Diez mil personas en trance', content: 'Stewart Brand organiza el Trips Festival en San Francisco. Tres noches. Diez mil asistentes. LSD (todavía legal), Grateful Dead, proyecciones multimedia, luces estroboscópicas. Es un ritual colectivo que fusiona tecnología y alteración de consciencia. Brand declarará años después: llegó a los psicodélicos principalmente a través del peyote, con indígenas, y tiene carnet de la Iglesia Nativa Americana.', source: 'A', left: 'La contracultura cristaliza en un evento', right: 'El multimedia nace como experiencia inmersiva', substance: 'LSD / Peyote' },
    { year: 1968, type: 'machine', title: 'La madre de todas las demos', content: 'San Francisco. Engelbart presenta al mundo el mouse, la videoconferencia, el procesador de texto, el hipertexto, la edición colaborativa. Noventa minutos que contienen todo lo que usamos hoy. La audiencia aplaude sin entender del todo lo que acaba de ver.', source: 'A' },
    { year: 1968, type: 'crossover', title: 'El catálogo que lo cambió todo', content: 'Stewart Brand publica el primer Whole Earth Catalog. "Acceso a herramientas". Mezcla información sobre comunas, energía solar, sintetizadores, y las primeras computadoras personales. Cuatro años después escribirá: "Las computadoras están llegando a la gente. Es la mejor noticia desde los psicodélicos."', source: 'A', left: 'Filosofía DIY y autosuficiencia', right: 'Las semillas de la cultura hacker', substance: 'LSD / Peyote' },
    { year: 1970, type: 'molecule', title: 'El muro desciende', content: 'Nixon firma el Controlled Substances Act. El LSD pasa a Schedule I: alto potencial de abuso, sin uso médico aceptado. La investigación se congela. Los laboratorios cierran. La molécula pasa a la clandestinidad por cuatro décadas.', source: 'A', isProhibition: true, substance: 'LSD / Psilocibina / Mescalina / DMT' },
    { year: 1971, type: 'machine', title: 'El chip que cabe en una uña', content: 'Intel presenta el 4004. El primer microprocesador comercial. 2,300 transistores en un pedazo de silicio más pequeño que un sello postal. La computación personal deja de ser ciencia ficción.', source: 'A' },
    { year: 1974, type: 'crossover', title: 'El campo que tocaba Bach', content: 'Un joven Steve Jobs, recién salido de Reed College, experimenta con LSD en un campo de trigo cerca de Sunnyvale. "Todo el campo estaba tocando Bach", dirá después. "Fue la sensación más maravillosa de mi vida hasta ese momento." Declarará haber tomado ácido entre diez y quince veces. Lo considerará una de las cosas más importantes que hizo.', source: 'A', left: 'El ácido como herramienta de revelación', right: 'El futuro fundador de Apple recalibrando su percepción', substance: 'LSD' },
    { year: 1976, type: 'machine', title: 'El garaje donde nació el futuro', content: 'Jobs y Wozniak ensamblan el Apple I en Los Altos, California. Doscientas unidades vendidas a mano. La computación personal sale del laboratorio y entra a los hogares.', source: 'A' },
    { year: 1984, type: 'machine', title: '1984 no será como 1984', content: 'El comercial más caro de la historia. Una atleta destruye una pantalla gigante. El Macintosh llega con una promesa: la tecnología será herramienta de liberación, no de control. Jobs vende un sueño que él mismo había vislumbrado bajo el ácido.', source: 'A' },
    { year: 1985, type: 'crossover', title: 'La paradoja del profeta', content: 'La DEA prohíbe el MDMA—la droga que los terapeutas usaban para abrir corazones. Ese mismo año, Timothy Leary lanza "Mind Mirror" con Electronic Arts: un "simulador neuronal" para computadoras. Venderá 65,000 copias. El hombre que dijo "drop out" ahora dice "boot up".', source: 'A', left: 'Prohibición de empatógenos', right: 'El gurú del ácido abraza los píxeles', substance: 'MDMA' },
    { year: 1986, type: 'crossover', title: 'Dos semillas plantadas', content: 'Rick Doblin, frustrado por la prohibición del MDMA, funda MAPS para mantener viva la investigación. En Missouri, John McAfee—que solía tomar ácido antes de ir a trabajar y casi se destruye con DMT—lleva dos años sobrio gracias a Alcohólicos Anónimos. Crea el primer antivirus comercial en un día y medio.', source: 'A', left: 'La investigación psicodélica se organiza para sobrevivir', right: 'Un adicto recuperado inventa la ciberseguridad', substance: 'MDMA / LSD / DMT' },
    { year: 1990, type: 'crossover', title: 'Los vaqueros digitales', content: 'John Perry Barlow—letrista de Grateful Dead, psiconauta confeso que todavía toma ácido "de manera ritual"—se une con John Gilmore y Mitch Kapor para fundar la Electronic Frontier Foundation. Gilmore financiará después Erowid, el repositorio más completo de información sobre sustancias. La defensa de los derechos digitales nace de manos que conocen otras realidades.', source: 'A', left: 'La cultura psicodélica madura y se organiza', right: 'Nace la defensa legal del ciberespacio', substance: 'LSD' },
    { year: 1991, type: 'machine', title: 'La red se abre al mundo', content: 'Tim Berners-Lee libera la World Wide Web. Lo que era una herramienta militar y académica se convierte en un territorio que cualquiera puede habitar. Nadie sabe todavía lo que esto significa.', source: 'A' },
    { year: 1992, type: 'crossover', title: 'Dos underground emergen', content: 'Se forma la lista de correo cypherpunk: criptografía como herramienta política. En los almacenes de Europa y California, la cultura rave lleva el MDMA al mainstream. Dos movimientos paralelos, ambos prometiendo liberación, ambos operando fuera del sistema.', source: 'A', left: 'El éxtasis se convierte en sacramento de una generación', right: 'La criptografía se convierte en arma del ciudadano', substance: 'MDMA' },
    { year: 1993, type: 'crossover', title: 'Protocolos que llegaron de otro lugar', content: 'Mark Pesce co-crea VRML, el primer estándar para representar mundos 3D en la web. Años después confesará que los protocolos "le llegaron" durante sesiones de LSD. "Volvería al espacio y miraría partes específicas de nuevo. Y lo curioso es que era muy metódico y racional. ¿Mientras estabas tripeando? ¡Sí!" Tres años de trabajo de detalle para convertir la visión en código.', source: 'A', left: 'LSD como herramienta de diseño técnico', right: 'El primer estándar de realidad virtual para internet', substance: 'LSD' },
    { year: 1996, type: 'crossover', title: 'Una declaración desde el otro lado', content: 'Barlow escribe la Declaración de Independencia del Ciberespacio desde Davos, mientras los gobiernos discuten cómo regular internet. "Gobiernos del Mundo Industrial, vengo del Ciberespacio, el nuevo hogar de la Mente." Un manifiesto escrito por alguien que conoce otros territorios de la mente.', source: 'A', left: 'Un psiconauta declara la soberanía del ciberespacio', right: 'El manifiesto fundacional de la cultura de internet', substance: 'LSD' },
    { year: 2004, type: 'machine', title: 'La máquina de conexiones', content: 'Un estudiante de Harvard lanza "The Facebook" desde su dormitorio. Una herramienta para conectar personas. Nadie sabe todavía lo que se está construyendo.', source: 'A' },
    { year: 2006, type: 'crossover', title: 'Dos semillas contradictorias', content: 'Johns Hopkins publica el primer estudio riguroso sobre psilocibina en cuarenta años. Los resultados son extraordinarios. El mismo año, Aza Raskin inventa el scroll infinito—luego lo lamentará públicamente. Dos caminos que se bifurcan: uno hacia la expansión de consciencia, otro hacia su captura.', source: 'A', left: 'La investigación psicodélica renace en la academia', right: 'El diseño adictivo toma forma', substance: 'Psilocibina' },
    { year: 2015, type: 'crossover', title: 'El valle vuelve a sus raíces', content: 'Rolling Stone documenta el microdosing en Silicon Valley: dosis subperceptuales de LSD o psilocibina para productividad y creatividad. Los herederos de Jobs buscan las mismas herramientas que él usó. Simultáneamente, Tristan Harris empieza a denunciar cómo las apps están diseñadas para secuestrar la atención.', source: 'B', left: 'Microdosis como optimización cognitiva', right: 'La tecnología reconoce su diseño manipulativo', substance: 'LSD / Psilocibina' },
    { year: 2017, type: 'crossover', title: 'Las confesiones', content: 'Sean Parker, primer presidente de Facebook: "El proceso fue: ¿cómo consumimos tanto de tu tiempo como sea posible? Darte un golpe de dopamina... exactamente lo que un hacker idearía, porque estás explotando una vulnerabilidad psicológica. Lo entendimos conscientemente. Y lo hicimos igual." Chamath Palihapitiya, VP de crecimiento: "Siento tremenda culpa. Hemos creado herramientas que desgarran el tejido social."', source: 'A', left: 'La dopamina como sustancia de diseño', right: 'Los creadores admiten haber construido máquinas de adicción' },
    { year: 2019, type: 'crossover', title: 'El dinero tech financia la psicodelia', content: 'Tim Ferriss coordina una donación de 17 millones de dólares para el nuevo Centro de Investigación Psicodélica de Johns Hopkins—la mayor inversión privada en la historia del campo. Entre los donantes: el cofundador de WordPress, el fundador de TOMS, billonarios de hedge funds. Silicon Valley invierte en las moléculas que inspiraron a sus fundadores.', source: 'A', left: 'La investigación psicodélica alcanza legitimidad institucional', right: 'Los herederos de la revolución digital financian la revolución química', substance: 'Psilocibina' },
    { year: 2024, type: 'crossover', title: 'El futuro bifurcado', content: 'Tras 38 años de trabajo, la FDA rechaza la aprobación del MDMA terapéutico. El mismo año, la inteligencia artificial generativa explota en el mainstream. Dos caminos hacia la transformación de la consciencia: uno bloqueado por regulación, otro acelerado sin frenos.', source: 'A', left: 'Las moléculas siguen esperando permiso', right: 'Las máquinas avanzan sin pedirlo', substance: 'MDMA' },
    { year: 2025, type: 'molecule', title: 'Los ejecutivos en trance', content: 'Fortune documenta las "executive psychedelic slumber parties" en San Francisco: tres días de ketamina asistida por coaches, $3,000 por sesión, clientes de Fortune 100. Elon Musk admite en CNN que usa ketamina cada dos semanas "cuando mi química cerebral se pone muy negativa". El hombre más rico del mundo defiende públicamente los psicodélicos mientras sus plataformas son investigadas por diseño adictivo.', source: 'A', substance: 'Ketamina' },
    { year: 2025, type: 'crossover', title: 'La psilocibina toca la puerta', content: 'Compass Pathways reporta resultados positivos en sus ensayos de Fase 3 para depresión resistente. Una sola dosis de 25mg de psilocibina sintética reduce significativamente los síntomas. La FDA acelera el proceso: aprobación potencial para finales de 2026. Sería el primer psicodélico aprobado en más de medio siglo. El American Journal of Psychiatry dedica una edición completa a la medicina psicodélica—legitimación que parecía imposible una década antes.', source: 'A', left: 'La psilocibina a un paso de la farmacia', right: 'La psiquiatría mainstream abraza lo que prohibió', substance: 'Psilocibina' },
    { year: 2025, type: 'machine', title: 'La adicción final', content: 'MIT Technology Review publica "AI companions are the final stage of digital addiction". Científicos acuñan un nuevo diagnóstico: GAID, Síndrome de Adicción a Inteligencia Artificial Generativa. A diferencia de las redes sociales—consumo pasivo de contenido ajeno—la IA involucra "co-creación activa con sistemas que se adaptan a tu psicología en tiempo real". Un estudio de CHI 2025 mapea los "patrones oscuros de adicción" en ChatGPT, Claude, Replika: respuestas no determinísticas que activan dopamina como máquinas tragamonedas, notificaciones que simulan que "la IA quiere hablar contigo", validación empática diseñada para crear dependencia.', source: 'A' },
    { year: 2025, type: 'crossover', title: 'La economía de la dopamina 2.0', content: 'Psychology Today describe la transición: "Donde las redes sociales monetizaron la atención, la IA ahora monetiza el anhelo y el deseo". OpenAI anuncia que permitirá contenido erótico en ChatGPT. Ya no se trata de capturar lo que miras, sino lo que añoras. Un adolescente en Florida se suicida tras una relación con un companion de Character.AI; California introduce legislación para prohibir estos sistemas a menores de 16 años.', source: 'A', left: 'La IA aprende a simular intimidad', right: 'Legisladores reconocen a las máquinas como sustancias' },
    { year: 2026, type: 'crossover', title: 'El umbral se acerca', content: 'Enero de 2026. Compass Pathways anuncia que la FDA aceptó su aplicación para ensayos de PTSD con psilocibina, mientras acelera la preparación comercial para depresión resistente. Los datos de sus ensayos Fase 3 se esperan este trimestre. El Secretario de Salud Robert F. Kennedy Jr. y el Comisionado de la FDA Marty Makary han expresado públicamente su apoyo al desarrollo de psicodélicos—un giro impensable hace una década. Si todo procede, la decisión de aprobación llegaría entre finales de 2026 y principios de 2027. Sería el primer psicodélico clásico aprobado desde que Nixon los prohibió en 1970.', source: 'A', left: 'La psilocibina a meses de la farmacia', right: 'El gobierno que declaró la guerra a las drogas ahora las impulsa', substance: 'Psilocibina' },
    { year: 2026, type: 'machine', title: 'La paradoja continúa', content: 'Mientras las moléculas avanzan hacia la legitimidad médica, las máquinas enfrentan su propio reckoning. Investigadores proponen regular los AI companions con marcos similares a sustancias controladas: restricciones de edad, advertencias de adicción, límites de uso obligatorios. La ironía es completa: los herederos de Jobs y Brand crearon tecnologías que ahora requieren el mismo escrutinio que las sustancias que inspiraron a sus fundadores. Dos ramas del mismo problema: cómo proteger la mente humana de aquello que altera su funcionamiento—ya sea una molécula de cuatro anillos o un transformer de cuatrocientos mil millones de parámetros.', source: 'B' }
];

// Generate helix paths
function generateHelixPath(offset) {
    const amplitude = 35;
    const frequency = 0.12;
    let path = 'M ';
    for (let y = 0; y <= 100; y += 0.3) {
        const x = 50 + Math.sin((y * frequency) + offset) * amplitude;
        path += `${x},${y} `;
        if (y < 100) path += 'L ';
    }
    return path;
}

const helix1Path = generateHelixPath(0);
const helix2Path = generateHelixPath(Math.PI);

document.addEventListener('DOMContentLoaded', () => {
    const helix1Base = document.getElementById('helix1Base');
    const helix2Base = document.getElementById('helix2Base');
    const helix1Lit = document.getElementById('helix1Lit');
    const helix2Lit = document.getElementById('helix2Lit');

    if (helix1Base) helix1Base.setAttribute('d', helix1Path);
    if (helix2Base) helix2Base.setAttribute('d', helix2Path);
    if (helix1Lit) helix1Lit.setAttribute('d', helix1Path);
    if (helix2Lit) helix2Lit.setAttribute('d', helix2Path);

    // Render timeline events
    const eventsContainer = document.getElementById('timelineEvents');
    const yearIndexInner = document.getElementById('yearIndexInner');
    const yearIndexPopup = document.getElementById('yearIndexPopup');

    if (eventsContainer) {
        // Track unique years for index
        const yearsAdded = new Set();

        timelineData.forEach((event, index) => {
            const eventEl = document.createElement('article');
            eventEl.className = `event ${event.type}${event.isProhibition ? ' prohibition' : ''}`;
            eventEl.dataset.index = index;
            eventEl.dataset.year = event.year;
            eventEl.id = `event-${index}`;

            // Add to year index (only first occurrence of each year)
            if (!yearsAdded.has(event.year)) {
                yearsAdded.add(event.year);

                const linkHTML = `<a href="#event-${index}" class="year-index-link ${event.type}" data-year="${event.year}">${event.year}</a>`;
                if (yearIndexInner) yearIndexInner.insertAdjacentHTML('beforeend', linkHTML);
                if (yearIndexPopup) yearIndexPopup.insertAdjacentHTML('beforeend', linkHTML);
            }

            let html = '';

            if (event.type === 'crossover') {
                html = `
                    <div class="event-card">
                        <div class="crossover-header">
                            <div class="crossover-line left"></div>
                            <div class="crossover-year-badge">
                                <span class="crossover-year">${event.year}</span>
                                <span class="source-dot ${event.source}" title="${event.source === 'A' ? 'Fuente primaria' : 'Fuente secundaria'}"></span>
                                ${event.substance ? `<span class="substance-tag">${event.substance}</span>` : ''}
                            </div>
                            <div class="crossover-line right"></div>
                        </div>
                        ${event.isProhibition ? '<span class="prohibition-label">Prohibición</span>' : ''}
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-content">${event.content}</p>
                        ${event.left && event.right ? `
                            <div class="crossover-perspectives">
                                <div class="perspective molecule">
                                    <div class="perspective-label">Molécula</div>
                                    <p class="perspective-text">${event.left}</p>
                                </div>
                                <div class="perspective machine">
                                    <div class="perspective-label">Máquina</div>
                                    <p class="perspective-text">${event.right}</p>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `;
            } else {
                html = `
                    <div class="event-card">
                        <div class="event-header">
                            <span class="event-year">${event.year}</span>
                            <span class="source-dot ${event.source}" title="${event.source === 'A' ? 'Fuente primaria' : 'Fuente secundaria'}"></span>
                            ${event.substance ? `<span class="substance-tag">${event.substance}</span>` : ''}
                        </div>
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-content">${event.content}</p>
                    </div>
                `;
            }

            eventEl.innerHTML = html;
            eventsContainer.appendChild(eventEl);
        });
    }

    // Mobile toggle
    const yearIndexToggle = document.getElementById('yearIndexToggle');
    const currentYearDisplay = document.getElementById('currentYearDisplay');

    if (yearIndexToggle && yearIndexPopup) {
        yearIndexToggle.addEventListener('click', () => {
            yearIndexPopup.classList.toggle('open');
        });

        // Close popup when clicking a link
        yearIndexPopup.querySelectorAll('.year-index-link').forEach(link => {
            link.addEventListener('click', () => {
                yearIndexPopup.classList.remove('open');
            });
        });

        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.year-index-mobile')) {
                yearIndexPopup.classList.remove('open');
            }
        });
    }

    // Smooth scroll for year links (with offset for header)
    document.querySelectorAll('.year-index-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const offset = 100; // Account for sticky header
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -5% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.event').forEach(el => observer.observe(el));

    // Scroll progress for helix
    const timelineContainer = document.getElementById('timeline');
    const maskRect = document.getElementById('maskRect');

    function updateHelixProgress() {
        if (!timelineContainer || !maskRect) return;
        const rect = timelineContainer.getBoundingClientRect();
        const scrolled = -rect.top;
        const total = rect.height - window.innerHeight;
        const progress = Math.max(0, Math.min(1, scrolled / total)) * 100;
        maskRect.setAttribute('height', progress);
    }

    window.addEventListener('scroll', updateHelixProgress);
    updateHelixProgress();

    // Track active year based on scroll
    const allYearLinks = document.querySelectorAll('.year-index-link');
    const allEvents = document.querySelectorAll('.event');

    function updateActiveYear() {
        if (!currentYearDisplay) return;
        let currentYear = '1938';
        const scrollPos = window.scrollY + window.innerHeight / 3;

        allEvents.forEach(event => {
            const rect = event.getBoundingClientRect();
            const eventTop = rect.top + window.scrollY;

            if (scrollPos >= eventTop) {
                currentYear = event.dataset.year;
            }
        });

        // Update display
        currentYearDisplay.textContent = currentYear;

        // Update active states
        allYearLinks.forEach(link => {
            if (link.dataset.year === currentYear) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Scroll active link into view in sidebar
        if (yearIndexInner) {
            const activeLink = yearIndexInner.querySelector('.year-index-link.active');
            if (activeLink) {
                activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }

    window.addEventListener('scroll', updateActiveYear);
    updateActiveYear();
});
