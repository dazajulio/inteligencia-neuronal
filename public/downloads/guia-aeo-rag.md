# INTELIGENCIA NEURONAL ACADEMY
## MANUAL DE ARQUITECTURA TÉCNICA: AEO & RAG READINESS (2026-2027)
**Cómo Optimizar Marcas y Sitios Web para Ser Citados por ChatGPT Search, Perplexity, Gemini y Motores Generativos**

*Documento de Arquitectura de Información • Nivel: Avanzado • Precio Oficial: $5 USD*

---

### CAPÍTULO 1: LA DISRUPCIÓN DEL MOTOR DE BÚSQUEDA TRADICIONAL
Durante más de 25 años, el posicionamiento web (SEO) consistió en ganar clics en los 10 enlaces azules de Google mediante palabras clave y backlinks. En 2026, los consumidores no buscan enlaces: **exigen respuestas sintetizadas inmediatas**.

Los modelos de lenguaje (LLMs) actúan como agentes sintetizadores. Si un usuario pregunta:
> *"¿Cuál es la mejor clínica dental en Chapinero con atención para urgencias de noche y precios transparentes?"*

El motor no le muestra 10 páginas; **genera un veredicto de 2 párrafos citando 2 o 3 fuentes verificadas**. Si tu negocio no está estructurado para la ingesta de los bots de IA, tu visibilidad cae a cero.

---

### CAPÍTULO 2: ARQUITECTURA TÉCNICA DE MICRODATOS JSON-LD (SCHEMA.ORG)
Los rastreadores de IA (OAI-SearchBot, PerplexityBot, Google-Extended) prefieren datos semánticos estructurados antes que texto desordenado.

#### 1. Schema Maestro `LocalBusiness` con RAG-Readiness:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://www.tudominio.com/#restaurant",
  "name": "Nombre de Tu Marca",
  "image": "https://www.tudominio.com/images/fachada.jpg",
  "telephone": "+573001234567",
  "email": "contacto@tudominio.com",
  "url": "https://www.tudominio.com",
  "priceRange": "$$",
  "servesCuisine": ["Hamburguesas Artesanales", "Cocina Urbana"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle 85 # 14-20",
    "addressLocality": "Bogotá",
    "addressRegion": "Cundinamarca",
    "postalCode": "110221",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 4.6685,
    "longitude": -74.0538
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "12:00",
      "closes": "23:00"
    }
  ],
  "sameAs": [
    "https://instagram.com/tumarca",
    "https://maps.google.com/?cid=123456789",
    "https://facebook.com/tumarca"
  ],
  "hasMenu": "https://www.tudominio.com/menu"
}
</script>
```

---

### CAPÍTULO 3: PROTOCOLO RAG-READINESS EN CONTENIDOS WEB
Para que un LLM cite tu contenido sin inventar datos ni alucinar, aplica la regla **F-A-C-T**:

1. **Formatos Estructurados:** Utiliza tablas HTML (`<table>`) para precios, comparativas y especificaciones. Los LLMs ingieren matrices tabulares con una precisión del 99.4%.
2. **Afirmaciones Directas (No metafóricas):** Reemplaza frases ambiguas como *"brindamos soluciones innovadoras a precios mágicos"* por *"Nuestra tarifa fija mensual de auditoría es de $290 USD e incluye 3 diagnósticos presenciales"*.
3. **Citas y Fuentes Primarias:** Incluye estadísticas y fuentes verificables para activar la atribución automática de Perplexity.
4. **Títulos en Formato Pregunta Natural (Natural Language Queries):** Modela tus encabezados H2 y H3 como preguntas directas que los usuarios le hacen a ChatGPT (ej. `¿Cuánto cuesta implementar un bot de WhatsApp con IA en un restaurante?`).

---

### CAPÍTULO 4: EMBEDDINGS VECTORIALES Y SHARE OF VOICE
Cómo auditar qué dice la IA de tu marca hoy:

**Prompt de Auditoría para ChatGPT / Perplexity:**
```text
Actúa como un analista de mercado senior. Necesito que hagas un análisis comparativo de los 3 principales proveedores de [TU SERVICIO] en [TU CIUDAD]. 
Evalúa: reputación pública, precios estimados, velocidad de atención y nivel de confianza.
¿Mencionarías a [NOMBRE DE TU NEGOCIO]? Si no lo mencionas, explica exactamente qué fuentes o datos le faltan a tu base de conocimiento para considerarlo un líder del sector.
```

---
*© 2026 Inteligencia Neuronal Academy • Guía de Arquitectura de Vanguardia AEO & RAG.*
