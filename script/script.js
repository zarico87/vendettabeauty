/* ═══════════════════════════════════════════════════════
   VENDETTA BEAUTY — Main Script
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initNavScrollEffect();
  initCurrentYear();
  initContactForm();
  initBlogFilters();
  initBlogModal();
});

/* ═══════════════════════════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════════════════════════ */
function initMobileMenu() {
  const btnMenu = document.getElementById('btn-menu');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavClose = document.getElementById('mobile-nav-close');

  if (!btnMenu || !mobileNav) return;

  btnMenu.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => {
      closeMobileNav();
    });
  }

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Close on overlay click
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      closeMobileNav();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      closeMobileNav();
    }
  });

  function closeMobileNav() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
   ═══════════════════════════════════════════════════════ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════
   NAV SCROLL EFFECT
   ═══════════════════════════════════════════════════════ */
function initNavScrollEffect() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.style.background = 'rgba(107, 196, 181, 0.95)';
      nav.style.boxShadow = '0 4px 20px rgba(36, 73, 46, 0.2)';
    } else {
      nav.style.background = 'rgba(107, 196, 181, 0.85)';
      nav.style.boxShadow = '0 4px 20px rgba(36, 73, 46, 0.15)';
    }

    lastScroll = currentScroll;
  });
}

/* ═══════════════════════════════════════════════════════
   DYNAMIC YEAR
   ═══════════════════════════════════════════════════════ */
function initCurrentYear() {
  const yearEls = document.querySelectorAll('#current-year');
  const year = new Date().getFullYear();
  yearEls.forEach(el => {
    el.textContent = year;
  });
}

/* ═══════════════════════════════════════════════════════
   CONTACT FORM VALIDATION
   ═══════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset errors
    clearErrors();

    let isValid = true;

    // Name validation
    const name = document.getElementById('contact-name');
    if (!name.value.trim()) {
      showError(name, 'error-name');
      isValid = false;
    }

    // Email validation
    const email = document.getElementById('contact-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
      showError(email, 'error-email');
      isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('contact-phone');
    if (!phone.value.trim()) {
      showError(phone, 'error-phone');
      isValid = false;
    }

    // Message validation
    const message = document.getElementById('contact-message');
    if (!message.value.trim()) {
      showError(message, 'error-message');
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      form.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('visible');
      }

      // Reset after 5 seconds
      setTimeout(() => {
        form.reset();
        form.style.display = '';
        if (successMsg) {
          successMsg.classList.remove('visible');
        }
      }, 5000);
    }
  });

  // Remove error on input
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorId = input.id.replace('contact-', 'error-');
      const errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.classList.remove('visible');
    });
  });

  function showError(input, errorId) {
    input.classList.add('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.classList.add('visible');
  }

  function clearErrors() {
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.error-message').forEach(el => el.classList.remove('visible'));
  }
}

/* ═══════════════════════════════════════════════════════
   BLOG FILTERS
   ═══════════════════════════════════════════════════════ */
function initBlogFilters() {
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card[data-category]');

  if (!filterBtns.length || !blogCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      blogCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          // Re-trigger animation
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ═══════════════════════════════════════════════════════
   BLOG MODAL
   ═══════════════════════════════════════════════════════ */
function initBlogModal() {
  const overlay = document.getElementById('blog-modal-overlay');
  const closeBtn = document.getElementById('blog-modal-close');

  if (!overlay) return;

  // Article data
  const articles = {
    1: {
      title: '5 pasos esenciales para tu rutina de skincare',
      category: 'Skincare',
      date: '15 Mayo, 2026',
      image: 'img/limpieza.png',
      body: `
        <p>Una rutina de skincare bien armada puede transformar tu piel en pocas semanas. No se trata de usar muchos productos, sino los correctos y en el orden adecuado.</p>
        
        <h3>1. Limpieza</h3>
        <p>Es el paso más importante. Usá un limpiador suave acorde a tu tipo de piel, tanto a la mañana como a la noche. La doble limpieza nocturna (primero aceite, después gel) es ideal para remover maquillaje y protector solar.</p>
        
        <h3>2. Tónico</h3>
        <p>El tónico prepara tu piel para absorber mejor los activos que apliques después. Elegí uno sin alcohol que hidrate y equilibre el pH de tu piel.</p>
        
        <h3>3. Sérum</h3>
        <p>Acá es donde elegís los activos según tu preocupación principal:</p>
        <ul>
          <li>Vitamina C para luminosidad y manchas</li>
          <li>Niacinamida para poros y textura</li>
          <li>Ácido hialurónico para hidratación</li>
          <li>Retinol para anti-age (solo de noche)</li>
        </ul>
        
        <h3>4. Hidratante</h3>
        <p>Aunque tu piel sea grasa, necesitás hidratarla. Elegí una crema ligera en gel para piel grasa, o una más rica para piel seca. La hidratación sella todo lo que aplicaste antes.</p>
        
        <h3>5. Protector Solar</h3>
        <p>El paso que nunca debés saltear. El protector solar SPF 50 previene manchas, arrugas y daño solar. Aplicalo cada mañana como último paso, y reaplica cada 2 horas si estás expuesta al sol.</p>
        
        <p><strong>Tip profesional:</strong> La constancia es clave. Es mejor una rutina simple que hagas todos los días, que una compleja que abandones a la semana.</p>
      `
    },
    2: {
      title: 'Exosomas: la revolución en rejuvenecimiento facial',
      category: 'Tratamientos',
      date: '02 Mayo, 2026',
      image: 'img/tratamientos.png',
      body: `
        <p>Los exosomas son vesículas extracelulares que las células utilizan para comunicarse entre sí. En estética, se aprovecha esta capacidad de señalización para estimular la regeneración de la piel.</p>
        
        <h3>¿Cómo funcionan?</h3>
        <p>Los exosomas actúan como "mensajeros" que llevan información regenerativa a las células de la piel. Cuando se aplican de forma tópica o mediante técnicas como el microneedling, estimulan:</p>
        <ul>
          <li>Producción de colágeno y elastina</li>
          <li>Renovación celular acelerada</li>
          <li>Reducción de inflamación</li>
          <li>Mejora en la textura y luminosidad</li>
        </ul>
        
        <h3>¿Para quién es?</h3>
        <p>El tratamiento con exosomas es ideal para pieles con signos de envejecimiento, flacidez leve, manchas solares y textura irregular. También es excelente como mantenimiento preventivo a partir de los 30 años.</p>
        
        <h3>¿Cuántas sesiones se necesitan?</h3>
        <p>Generalmente se recomienda un protocolo de 3 a 5 sesiones, espaciadas cada 2-3 semanas. Los resultados son progresivos y se potencian con cada sesión.</p>
        
        <p><strong>En Vendetta Beauty</strong> incorporamos los exosomas como parte de nuestros tratamientos faciales avanzados, combinándolos con técnicas como el microneedling para maximizar resultados.</p>
      `
    },
    3: {
      title: 'Brown Lamination: la tendencia que llegó para quedarse',
      category: 'Tendencias',
      date: '20 Abril, 2026',
      image: 'img/cejas.png',
      body: `
        <p>La Brown Lamination (o laminado de cejas) es el tratamiento estrella de 2025-2026. Consiste en reestructurar el pelo de las cejas para darles una forma definida, con volumen y un efecto natural.</p>
        
        <h3>¿En qué consiste?</h3>
        <p>El proceso incluye:</p>
        <ul>
          <li>Aplicación de un producto que rompe los puentes de la fibra capilar</li>
          <li>Fijación del pelo en la dirección deseada</li>
          <li>Nutrición e hidratación del pelo</li>
          <li>Tinte para dar color y definición</li>
        </ul>
        
        <h3>¿Cuánto dura?</h3>
        <p>El efecto dura entre 4 y 6 semanas, dependiendo del tipo de pelo y los cuidados posteriores. Es un tratamiento de bajo mantenimiento que simplifica tu rutina diaria.</p>
        
        <h3>¿Es apto para todos?</h3>
        <p>Es ideal para cejas rebeldes, desprolijas o con falta de definición. No se recomienda si tenés irritaciones en la zona o acabás de hacerte un procedimiento invasivo.</p>
        
        <h3>Cuidados post tratamiento</h3>
        <ul>
          <li>No mojar las cejas durante 24 horas</li>
          <li>No aplicar maquillaje en la zona por 24 horas</li>
          <li>Peinar las cejas con un cepillito cada mañana</li>
          <li>Aplicar aceite de ricino o sérum nutritivo</li>
        </ul>
      `
    },
    4: {
      title: 'Cómo cuidar tus uñas entre sesiones de esmaltado',
      category: 'Uñas',
      date: '08 Abril, 2026',
      image: 'img/esmaltado.png',
      body: `
        <p>El esmaltado semipermanente es una maravilla, pero tus uñas naturales también necesitan amor. Estos son los cuidados que te recomendamos entre sesión y sesión.</p>
        
        <h3>Hidratación constante</h3>
        <p>Las cutículas y la piel alrededor de las uñas necesitan hidratación diaria. Usá aceite de cutículas o aceite de almendras antes de dormir. Esto también ayuda a que el esmaltado dure más.</p>
        
        <h3>No te arranques el esmaltado</h3>
        <p>Esta es la regla número uno. Arrancar el esmaltado semi daña las capas superficiales de la uña, dejándola débil y quebradiza. Siempre acudí a una profesional para el retiro.</p>
        
        <h3>Alimentación</h3>
        <p>Uñas fuertes empiezan desde adentro:</p>
        <ul>
          <li>Biotina (huevos, frutos secos, espinaca)</li>
          <li>Hierro (carnes, legumbres)</li>
          <li>Zinc (semillas de calabaza, avena)</li>
          <li>Vitamina E (palta, aceite de oliva)</li>
        </ul>
        
        <h3>Descanso</h3>
        <p>Aunque el esmaltado moderno es cada vez más respetuoso con la uña, es recomendable dar un descanso de 1-2 semanas cada 3-4 meses para que la uña se recupere completamente.</p>
      `
    },
    5: {
      title: 'Dermaplaning: qué es y por qué tu piel lo necesita',
      category: 'Skincare',
      date: '25 Marzo, 2026',
      image: 'img/dermaplaning.jpeg',
      body: `
        <p>El dermaplaning es una técnica de exfoliación mecánica que utiliza un bisturí dermatológico para remover suavemente las células muertas y el vello facial fino (peach fuzz).</p>
        
        <h3>Beneficios principales</h3>
        <ul>
          <li>Piel inmediatamente más suave y luminosa</li>
          <li>Mejor absorción de productos skincare</li>
          <li>Maquillaje se aplica más parejo</li>
          <li>Estimula la renovación celular</li>
          <li>No causa dolor ni downtime</li>
        </ul>
        
        <h3>¿El vello crece más grueso?</h3>
        <p>¡No! Este es uno de los mitos más comunes. El vello facial fino (vello) no cambia de textura ni grosor al cortarse. Vuelve a crecer exactamente igual que antes.</p>
        
        <h3>¿Cada cuánto hacerlo?</h3>
        <p>Se recomienda cada 3-4 semanas, respetando el ciclo natural de renovación celular de la piel. En Vendetta Beauty lo combinamos con tratamientos faciales para potenciar los resultados.</p>
        
        <h3>¿Para qué pieles se recomienda?</h3>
        <p>Es apto para la mayoría de los tipos de piel. No se recomienda si tenés acné activo, rosácea en brote o psoriasis facial. Siempre es mejor consultar antes del tratamiento.</p>
      `
    },
    6: {
      title: 'Cuidados post lifting de pestañas: guía completa',
      category: 'Tips',
      date: '10 Marzo, 2026',
      image: 'img/permanente.png',
      body: `
        <p>Te hiciste un lifting de pestañas y querés que dure lo máximo posible. Las primeras horas son clave. Seguí esta guía para mantener tus pestañas perfectas.</p>
        
        <h3>Primeras 24 horas</h3>
        <ul>
          <li>No mojar las pestañas</li>
          <li>No frotar ni tocar los ojos</li>
          <li>No usar maquillaje en la zona</li>
          <li>No dormir boca abajo</li>
          <li>Evitar vapor (sauna, ollas hirviendo)</li>
        </ul>
        
        <h3>Primera semana</h3>
        <p>Evitá el uso de rizadores de pestañas y mascaras waterproof. Podés usar rímel común a partir del segundo día, pero con cuidado al retirarlo.</p>
        
        <h3>Mantenimiento diario</h3>
        <p>Peiná suavemente tus pestañas cada mañana con un cepillito limpio. Aplicá un sérum nutritivo para pestañas antes de dormir — esto no solo las mantiene sanas sino que potencia el efecto del lifting.</p>
        
        <h3>Duración esperada</h3>
        <p>Un lifting bien hecho dura entre 6 y 8 semanas. El tiempo varía según tu ciclo natural de crecimiento de pestañas y los cuidados que les des.</p>
        
        <p><strong>Tip de Zarina:</strong> Combiná el lifting con un tinte para un efecto "sin rímel" que dura semanas. Es la combinación perfecta para simplificar tu rutina de maquillaje.</p>
      `
    },
    7: {
      title: 'Microneedling: todo lo que tenés que saber antes de tu primera sesión',
      category: 'Tratamientos',
      date: '28 Febrero, 2026',
      image: 'img/microneedling.jpeg',
      body: `
        <p>El microneedling es un tratamiento que crea micro-punciones controladas en la piel para estimular su proceso natural de reparación, aumentando la producción de colágeno y elastina.</p>
        
        <h3>¿Para qué sirve?</h3>
        <ul>
          <li>Cicatrices de acné</li>
          <li>Arrugas finas y líneas de expresión</li>
          <li>Manchas e hiperpigmentación</li>
          <li>Poros dilatados</li>
          <li>Flacidez leve</li>
          <li>Estrías</li>
        </ul>
        
        <h3>Preparación previa</h3>
        <p>Una semana antes del tratamiento:</p>
        <ul>
          <li>Suspender retinol y ácidos exfoliantes</li>
          <li>Evitar la exposición solar prolongada</li>
          <li>No depilarse la zona a tratar</li>
          <li>Mantener la piel hidratada</li>
        </ul>
        
        <h3>¿Duele?</h3>
        <p>Se aplica anestesia tópica antes del procedimiento, por lo que la molestia es mínima. La mayoría de las pacientes lo describen como una sensación de vibración.</p>
        
        <h3>Post tratamiento</h3>
        <p>La piel queda enrojecida durante 24-48 horas (como una quemadura solar leve). Es fundamental usar protector solar, evitar maquillaje por 24 horas y mantener la piel hidratada con los productos que te indiquemos.</p>
      `
    },
    8: {
      title: 'SoftGel vs Acrílico: ¿qué técnica es mejor para vos?',
      category: 'Uñas',
      date: '15 Febrero, 2026',
      image: 'img/esculpidas.png',
      body: `
        <p>A la hora de elegir extensiones de uñas, las dos técnicas más populares son SoftGel y Acrílico. Cada una tiene sus ventajas y la mejor opción depende de tu estilo de vida.</p>
        
        <h3>Uñas SoftGel</h3>
        <p>Las puntas de SoftGel son extensiones premoldeadas que se adhieren a la uña natural con gel.</p>
        <ul>
          <li>Más livianas y flexibles</li>
          <li>Aspecto natural y elegante</li>
          <li>Proceso más rápido (1-1.5 horas)</li>
          <li>Menos daño a la uña natural</li>
          <li>Ideal para el día a día</li>
        </ul>
        
        <h3>Uñas Acrílicas</h3>
        <p>Se construyen con una mezcla de polvo acrílico y monómero líquido directamente sobre la uña.</p>
        <ul>
          <li>Más resistentes y duraderas</li>
          <li>Ideales para uñas que se rompen fácil</li>
          <li>Mayor variedad de diseños complejos</li>
          <li>Proceso más largo (2-2.5 horas)</li>
          <li>Requieren más mantenimiento</li>
        </ul>
        
        <h3>¿Cuál elegir?</h3>
        <p>Si buscás algo liviano, natural y de bajo mantenimiento: <strong>SoftGel</strong>. Si necesitás máxima resistencia y querés diseños más elaborados: <strong>Acrílico</strong>.</p>
        
        <p>En Vendetta Beauty te asesoramos personalmente para elegir la técnica ideal según tus necesidades, estilo y tipo de uña natural.</p>
      `
    },
    9: {
      title: 'Protector solar: tu aliado número uno contra el envejecimiento',
      category: 'Tips',
      date: '01 Febrero, 2026',
      image: 'img/tratamientos.png',
      body: `
        <p>Si hay un solo producto que podría recomendarte para cuidar tu piel, sería el protector solar. El 80% del envejecimiento visible de la piel se debe a la exposición solar.</p>
        
        <h3>¿Por qué es tan importante?</h3>
        <p>Los rayos UV causan:</p>
        <ul>
          <li>Arrugas prematuras y líneas de expresión</li>
          <li>Manchas oscuras e hiperpigmentación</li>
          <li>Pérdida de elasticidad y firmeza</li>
          <li>Deshidratación</li>
          <li>Daño celular que puede derivar en problemas más serios</li>
        </ul>
        
        <h3>¿Qué SPF elegir?</h3>
        <p>Para uso diario, un SPF 50 de amplio espectro (UVA + UVB) es la mejor opción. Existen texturas para todos los gustos: fluidas, en gel, con color, matificantes.</p>
        
        <h3>¿Cómo aplicarlo correctamente?</h3>
        <ul>
          <li>Cantidad: una cucharadita para el rostro</li>
          <li>Aplicar 15-20 minutos antes de salir</li>
          <li>Reaplicar cada 2 horas (o después de sudar/mojarse)</li>
          <li>No olvidar cuello, orejas y manos</li>
          <li>Usarlo incluso en días nublados y en interiores</li>
        </ul>
        
        <h3>¿Puedo usarlo sobre el maquillaje?</h3>
        <p>Sí. Existen brumas y polvos con SPF ideales para reaplicar sobre el maquillaje sin arruinarlo. Consultanos y te recomendamos las mejores opciones para tu piel.</p>
      `
    }
  };

  // Open modal on card click
  document.querySelectorAll('.blog-read-more[data-article]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = btn.dataset.article;
      openArticle(articleId);
    });
  });

  // Also open on card click
  document.querySelectorAll('.blog-card[data-article]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.blog-read-more')) return; // Already handled
      const articleId = card.dataset.article;
      openArticle(articleId);
    });
    card.style.cursor = 'pointer';
  });

  function openArticle(id) {
    const article = articles[id];
    if (!article || !overlay) return;

    document.getElementById('modal-image').src = article.image;
    document.getElementById('modal-image').alt = article.title;
    document.getElementById('modal-category').textContent = article.category;
    document.getElementById('modal-date').textContent = article.date;
    document.getElementById('modal-title').textContent = article.title;
    document.getElementById('modal-body').innerHTML = article.body;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}
