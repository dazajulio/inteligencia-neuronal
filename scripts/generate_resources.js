const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const downloadsDir = path.join(__dirname, '..', 'public', 'downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

console.log('[1/4] Generando Matriz Maestra de Escandallos (Excel .xlsx)...');

// 1. MATRIZ DE ESCANDALLOS XLSX
const wb = XLSX.utils.book_new();

// Hoja 1: Guía y Parámetros
const ws1Data = [
  ['INTELIGENCIA NEURONAL ACADEMY :: SISTEMA DE ESCANDALLOS & CONTROL DE FOOD COST'],
  ['Guía Metodológica de Costeo Crudo/Cocido, Factores de Rendimiento y Margen de Contribución'],
  [''],
  ['VARIABLE', 'VALOR OBJETIVO', 'DESCRIPCIÓN OPERATIVA'],
  ['Food Cost Objetivo (%)', '28% - 32%', 'Porcentaje máximo de costo de materia prima sobre el precio de venta sin IVA.'],
  ['Factor de Rendimiento (R%)', 'Cocido / Crudo', 'Relación entre el peso neto utilizable tras cocción/limpieza y el peso bruto comprado.'],
  ['Margen de Seguridad', '3.0%', 'Colchón porcentual para absorber mermas invisibles, evaporación y condimentos menores.'],
  ['Multiplicador de Venta', '3.33x', 'Factor para fijación de precio mínimo recomendado: Precio Sugerido = Costo Total / 0.30'],
  [''],
  ['INSTRUCCIONES DE USO:'],
  ['1. Registre todos los insumos de su despensa en la pestaña "MAESTRO_INGREDIENTES".'],
  ['2. Cree nuevos platos duplicando la pestaña "PLANTILLA_EN_BLANCO".'],
  ['3. Ingrese el peso bruto utilizado. El sistema calculará el costo real cocido y el precio de venta recomendado.'],
  ['4. Nunca fije precios al "ojo" o por intuición: la rentabilidad gastronómica se protege en el gramo.']
];
const ws1 = XLSX.utils.aoa_to_sheet(ws1Data);
ws1['!cols'] = [{ wch: 30 }, { wch: 20 }, { wch: 70 }];
XLSX.utils.book_append_sheet(wb, ws1, 'GUIA_Y_PARAMETROS');

// Hoja 2: Maestro de Ingredientes
const ws2Data = [
  ['MAESTRO CENTRAL DE INGREDIENTES & PRECIOS DE COMPRA (COSTO POR GRAMO/ML)'],
  [''],
  ['CÓDIGO', 'CATEGORÍA', 'NOMBRE INGREDIENTE', 'UNIDAD COMPRA', 'PRECIO COMPRA (USD)', 'FACTOR MERMA %', 'COSTO BASE / GRAMO (USD)'],
  ['ING-001', 'Proteínas', 'Carne de Res 80/20 (Picaña / Ribeye Blend)', '1000 g (1 kg)', 9.50, '15%', 0.0095],
  ['ING-002', 'Proteínas', 'Pechuga de Pollo Fresca', '1000 g (1 kg)', 5.20, '20%', 0.0052],
  ['ING-003', 'Proteínas', 'Tocino Ahumado Premium', '1000 g (1 kg)', 8.80, '35%', 0.0088],
  ['ING-004', 'Panadería', 'Pan Brioche Artesanal con Mantequilla', '1 Unidad', 0.65, '0%', 0.6500],
  ['ING-005', 'Lácteos', 'Queso Cheddar Madurado en Láminas', '1000 g (1 kg)', 11.00, '2%', 0.0110],
  ['ING-006', 'Lácteos', 'Mantequilla sin Sal 82% Grasa', '500 g', 4.50, '0%', 0.0090],
  ['ING-007', 'Vegetales', 'Cebolla Morada Dulce', '1000 g (1 kg)', 1.40, '12%', 0.0014],
  ['ING-008', 'Vegetales', 'Tomate Chonto / Roma Selección', '1000 g (1 kg)', 1.80, '10%', 0.0018],
  ['ING-009', 'Vegetales', 'Lechuga Romana Hidropónica', '1 Unidad (300g)', 1.20, '18%', 0.0040],
  ['ING-010', 'Salsas', 'Salsa Especial Burger Secreta IN', '1000 g (1 kg)', 6.00, '5%', 0.0060],
  ['ING-011', 'Salsas', 'Mayonesa Japonesa Kewpie Style', '1000 g (1 kg)', 7.20, '3%', 0.0072],
  ['ING-012', 'Guarniciones', 'Papas Rústicas Pre-cortadas', '1000 g (1 kg)', 2.50, '10%', 0.0025],
  ['ING-013', 'Aceites', 'Aceite de Girasol Alto Oleico Fritura', '1000 ml (1 L)', 2.80, '2%', 0.0028],
  ['ING-014', 'Packaging', 'Caja Biodegradable Térmica Kraft', '1 Unidad', 0.35, '0%', 0.3500],
  ['ING-015', 'Packaging', 'Papel Antigrasa Personalizado + Sticker', '1 Set', 0.12, '0%', 0.1200]
];
const ws2 = XLSX.utils.aoa_to_sheet(ws2Data);
ws2['!cols'] = [{ wch: 12 }, { wch: 16 }, { wch: 42 }, { wch: 18 }, { wch: 22 }, { wch: 16 }, { wch: 25 }];
XLSX.utils.book_append_sheet(wb, ws2, 'MAESTRO_INGREDIENTES');

// Hoja 3: Escandallo Ejemplo - Smash Burger Doble Especial
const ws3Data = [
  ['FICHA TÉCNICA Y ESCANDALLO: DOUBLE SMASH BURGER ARTESANAL + PAPAS RÚSTICAS'],
  ['Categoría: Platos Fuertes / Hamburguesas • Rendimiento: 1 Porción Completa'],
  [''],
  ['CÓDIGO', 'INGREDIENTE / ELEMENTO', 'CANT. BRUTA (g/u)', 'FACTOR RENDIMIENTO (R%)', 'CANT. NETA (g/u)', 'COSTO UNITARIO ($)', 'COSTO TOTAL INGREDIENTE ($)'],
  ['ING-001', 'Blend de Res 80/20 (2 Medallones de 90g)', 180, '82%', 147.6, 0.0095, 1.71],
  ['ING-004', 'Pan Brioche Artesanal Sellado', 1, '100%', 1.0, 0.6500, 0.65],
  ['ING-005', 'Queso Cheddar Madurado (2 Láminas)', 40, '100%', 40.0, 0.0110, 0.44],
  ['ING-003', 'Tocino Ahumado Crujiente', 35, '65%', 22.75, 0.0088, 0.31],
  ['ING-007', 'Cebolla Caramelizada al Punto', 40, '70%', 28.0, 0.0014, 0.06],
  ['ING-010', 'Salsa Especial de la Casa', 30, '95%', 28.5, 0.0060, 0.18],
  ['ING-006', 'Mantequilla para Tostado de Pan', 10, '100%', 10.0, 0.0090, 0.09],
  ['ING-012', 'Papas Rústicas Especiadas (Acompañamiento)', 180, '90%', 162.0, 0.0025, 0.45],
  ['ING-013', 'Aceite Absorción Fritura Papas', 20, '100%', 20.0, 0.0028, 0.06],
  ['ING-014', 'Caja Kraft Térmica Premium', 1, '100%', 1.0, 0.3500, 0.35],
  ['ING-015', 'Papel Antigrasa + Toallita + Sticker', 1, '100%', 1.0, 0.1200, 0.12],
  [''],
  ['RESUMEN DE COSTOS Y FIJACIÓN DE PRECIO:', '', '', '', '', '', ''],
  ['1. Costo Base de Materia Prima e Insumos:', '', '', '', '', '', 4.42],
  ['2. Margen de Seguridad por Mermas Invisibles (3%):', '', '', '', '', '', 0.13],
  ['3. COSTO TOTAL DE PRODUCCIÓN (FOOD COST REAL):', '', '', '', '', '', 4.55],
  [''],
  ['MÉTRICAS FINANCIERAS & PRECIOS SUGERIDOS:', '', '', '', '', '', ''],
  ['Escenario Conservador (Food Cost Objetivo = 32%):', '', '', '', '', '', '$14.22 USD'],
  ['Escenario Óptimo Recomendado (Food Cost Objetivo = 28%):', '', '', '', '', '', '$16.25 USD'],
  ['Margen de Contribución Bruto por Plato ($):', '', '', '', '', '', '$11.70 USD'],
  ['Margen de Contribución Bruto (%):', '', '', '', '', '', '72.0%']
];
const ws3 = XLSX.utils.aoa_to_sheet(ws3Data);
ws3['!cols'] = [{ wch: 12 }, { wch: 42 }, { wch: 18 }, { wch: 25 }, { wch: 18 }, { wch: 18 }, { wch: 28 }];
XLSX.utils.book_append_sheet(wb, ws3, 'ESCANDALLO_EJEMPLO');

// Hoja 4: Plantilla en Blanco
const ws4Data = [
  ['PLANTILLA MAESTRA DE ESCANDALLO (DUPLIQUE ESTA HOJA PARA CADA PLATO DE SU MENÚ)'],
  ['Nombre del Plato: [ Ingrese Nombre ] • Categoría: [ Entradas / Fuertes / Bebidas ]'],
  [''],
  ['CÓDIGO', 'INGREDIENTE / ELEMENTO', 'CANT. BRUTA (g/u)', 'FACTOR RENDIMIENTO (R%)', 'CANT. NETA (g/u)', 'COSTO UNITARIO ($)', 'COSTO TOTAL ($)'],
  ['ING-001', 'Ingrediente 1', 100, '100%', 100, 0.00, 0.00],
  ['ING-002', 'Ingrediente 2', 50, '100%', 50, 0.00, 0.00],
  ['ING-003', 'Ingrediente 3', 25, '100%', 25, 0.00, 0.00],
  ['ING-004', 'Ingrediente 4', 10, '100%', 10, 0.00, 0.00],
  ['ING-005', 'Packaging / Enpaque', 1, '100%', 1, 0.00, 0.00],
  [''],
  ['1. Costo Base de Materia Prima:', '', '', '', '', '', 0.00],
  ['2. Margen de Seguridad (3%):', '', '', '', '', '', 0.00],
  ['3. COSTO TOTAL DEL PLATO (FOOD COST):', '', '', '', '', '', 0.00],
  ['4. PRECIO DE VENTA SUGERIDO (Food Cost 28%):', '', '', '', '', '', 0.00]
];
const ws4 = XLSX.utils.aoa_to_sheet(ws4Data);
ws4['!cols'] = [{ wch: 12 }, { wch: 35 }, { wch: 18 }, { wch: 25 }, { wch: 18 }, { wch: 18 }, { wch: 22 }];
XLSX.utils.book_append_sheet(wb, ws4, 'PLANTILLA_EN_BLANCO');

const xlsxPath = path.join(downloadsDir, 'matriz-escandallos.xlsx');
XLSX.writeFile(wb, xlsxPath);
console.log('✅ Matriz Excel generada en:', xlsxPath);

// Copia con nombre alternativo compatible
fs.copyFileSync(xlsxPath, path.join(downloadsDir, 'matriz-escandallos-foodcost.xlsx'));

console.log('[2/4] Generando Checklist HACCP y Documentos interactivos...');

// 2. CHECKLIST HACCP (Guía PDF / Markdown interactivo estructurado)
const haccpContent = `# INTELIGENCIA NEURONAL ACADEMY
## MANUAL & CHECKLIST DE AUDITORÍA DE PUNTOS CRÍTICOS HACCP (APPCC)
**Estándar de Inocuidad Alimentaria, Trazabilidad y Control de Mermas**

---

### 1. LOS 7 PRINCIPIOS OBLIGATORIOS DEL SISTEMA HACCP
1. **Análisis de Peligros:** Identificación sistemática de riesgos microbiológicos, químicos, físicos y de alérgenos en cada etapa del flujo de cocina.
2. **Determinación de Puntos Críticos de Control (PCC):** Puntos donde una medida de control previene, elimina o reduce el peligro a un nivel aceptable.
3. **Establecimiento de Límites Críticos:** Valores cuantitativos innegociables (temperatura, tiempo, pH, actividad de agua).
4. **Sistema de Vigilancia y Monitoreo:** Protocolos continuos de verificación termométrica y visual.
5. **Acciones Correctivas Inmediatas:** Medidas de contingencia obligatorias cuando un PCC se desvía del límite seguro.
6. **Procedimientos de Verificación:** Auditorías cruzadas semanales y calibración de termómetros/sensores.
7. **Documentación y Registro Digital:** Bitácora inalterable de auditoría para sanidad y dirección operativa.

---

### 2. MATRIZ DE LÍMITES CRÍTICOS EN PUNTOS DE CONTROL (PCC)

| ETAPA DEL PROCESO | PELIGRO IDENTIFICADO | LÍMITE CRÍTICO INNEGOCIABLE | FRECUENCIA DE MEDICIÓN | ACCIÓN CORRECTIVA INMEDIATA |
| :--- | :--- | :--- | :--- | :--- |
| **1. Recepción Carnes/Lácteos** | Proliferación bacteriana (Salmonella, E. coli) | **Temperatura <= 4.0 °C** (Carnes frescas) / **<= -18 °C** (Congelados) | Cada entrega de proveedor | Rechazo inmediato del lote sin romper cadena de frío |
| **2. Almacenamiento Frío** | Contaminación cruzada y proliferación | Cámaras de refrigeración entre **0.5 °C y 3.5 °C** | Cada 4 horas (Turnos A/B/C) | Reubicación a cámara auxiliar y ajuste técnico |
| **3. Cocción / Pasteurización** | Supervivencia de patógenos | **Centro térmico >= 74.0 °C** por mínimo 15 segundos | Muestreo en cada lote de cocción | Continuar cocción hasta alcanzar lectura de sonda |
| **4. Enfriamiento Rápido** | Germinación de esporas (Clostridium perfringens) | De **60 °C a 10 °C en menos de 2 horas** | Durante ciclo de abatimiento | Descarte del producto si supera 4 horas en zona de peligro (10°C - 60°C) |
| **5. Retención en Caliente (Línea)** | Multiplicación microbiana en servicio | Temperatura en mesa de vapor / KDS **>= 65.0 °C** | Cada 60 minutos en servicio | Recalentar a >75°C o descartar tras 2 horas |
| **6. Sanitización de Superficies** | Contaminación química / biológica | Cloro residual: **100 - 200 ppm** / Amonio: **200 - 400 ppm** | Cada cambio de turno | Ajustar dosificación con tiras reactivas |

---

### 3. CÓDIGO DE COLORES ESTÁNDAR PARA TABLAS DE CORTE
* 🔴 **ROJO:** Carnes rojas crudas (res, cerdo, cordero).
* 🟡 **AMARILLO:** Aves y carnes de pollo crudas.
* 🔵 **AZUL:** Pescados, mariscos y productos del mar crudos.
* 🟢 **VERDE:** Frutas, vegetales y hierbas listas para consumo.
* ⚪ **BLANCO:** Quesos, panes, bollería y alimentos cocinados.
* 🟤 **CAFÉ:** Vegetales con tierra / tubérculos antes de sanitización.

---

### 4. CHECKLIST DIARIO DE AUDITORÍA OPERATIVA

#### ☀️ Turno de Apertura (Checklist de Arranque)
- [ ] Cámara Frigorífica 1 (Proteínas): Temperatura actual registrada: ______ °C (Límite <= 3.5°C).
- [ ] Cámara Frigorífica 2 (Vegetales/Lácteos): Temperatura actual: ______ °C.
- [ ] Congelador Principal: Temperatura actual: ______ °C (Límite <= -18°C).
- [ ] Calibración de termómetros de pincho en agua con hielo (Lectura exacta: 0.0 °C ± 0.5 °C).
- [ ] Estaciones de lavado de manos: Jabón bactericida, papel secante y pedal operativo.
- [ ] Dilución de sanitizante en pulverizadores validada con tira colorimétrica.

#### 🍳 Turno de Producción y Servicio
- [ ] Registro de temperatura interna en cocciones maestras (Sonda térmica en centro de proteína).
- [ ] Rotulado reglamentario en todos los contenedores GastroNorm (Nombre, Fecha Elab, Fecha Caducidad, Responsable).
- [ ] Aislamiento de los 14 alérgenos principales en estación de ensamblaje (Gluten, Frutos secos, Huevos, etc.).
- [ ] Frecuencia de cambio de aceite en freidoras (Compuestos polares <= 24%).
- [ ] Lavado y sanitizado de tablas y cuchillos cada 60 minutos o entre cambio de proteína.

#### 🌙 Turno de Cierre (Checklist Terminal)
- [ ] Limpieza terminal profunda y desinfección de campanas, hornos, planchas y KDS.
- [ ] Guardado hermético de todas las salsas y mise en place en frío según estándar FIFO/PEPS.
- [ ] Sellos de goma de puertas de cámaras limpios y sin fugas de frío.
- [ ] Vaciado, lavado y desinfección de contenedores de basura y trampas de grasa.
- [ ] Firma del Responsable de Calidad y Turno: ____________________________________

---
*Documento oficial emitido por Inteligencia Neuronal Academy para la optimización de procesos gastronómicos.*
`;

fs.writeFileSync(path.join(downloadsDir, 'checklist-haccp.md'), haccpContent, 'utf8');
fs.writeFileSync(path.join(downloadsDir, 'checklist-haccp-restaurantes.pdf'), Buffer.from(haccpContent, 'utf8'));
fs.writeFileSync(path.join(downloadsDir, 'checklist-haccp.pdf'), Buffer.from(haccpContent, 'utf8'));
console.log('✅ Checklist HACCP generado.');

// 3. GUÍA DE INDEXACIÓN PARA MOTORES DE RESPUESTA IA (AEO & RAG) - PREMIUM ($5 USD)
console.log('[3/4] Generando Guía Técnica AEO & RAG...');
const aeoContent = `# INTELIGENCIA NEURONAL ACADEMY
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

#### 1. Schema Maestro \`LocalBusiness\` con RAG-Readiness:
\`\`\`html
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
\`\`\`

---

### CAPÍTULO 3: PROTOCOLO RAG-READINESS EN CONTENIDOS WEB
Para que un LLM cite tu contenido sin inventar datos ni alucinar, aplica la regla **F-A-C-T**:

1. **Formatos Estructurados:** Utiliza tablas HTML (\`<table>\`) para precios, comparativas y especificaciones. Los LLMs ingieren matrices tabulares con una precisión del 99.4%.
2. **Afirmaciones Directas (No metafóricas):** Reemplaza frases ambiguas como *"brindamos soluciones innovadoras a precios mágicos"* por *"Nuestra tarifa fija mensual de auditoría es de $290 USD e incluye 3 diagnósticos presenciales"*.
3. **Citas y Fuentes Primarias:** Incluye estadísticas y fuentes verificables para activar la atribución automática de Perplexity.
4. **Títulos en Formato Pregunta Natural (Natural Language Queries):** Modela tus encabezados H2 y H3 como preguntas directas que los usuarios le hacen a ChatGPT (ej. \`¿Cuánto cuesta implementar un bot de WhatsApp con IA en un restaurante?\`).

---

### CAPÍTULO 4: EMBEDDINGS VECTORIALES Y SHARE OF VOICE
Cómo auditar qué dice la IA de tu marca hoy:

**Prompt de Auditoría para ChatGPT / Perplexity:**
\`\`\`text
Actúa como un analista de mercado senior. Necesito que hagas un análisis comparativo de los 3 principales proveedores de [TU SERVICIO] en [TU CIUDAD]. 
Evalúa: reputación pública, precios estimados, velocidad de atención y nivel de confianza.
¿Mencionarías a [NOMBRE DE TU NEGOCIO]? Si no lo mencionas, explica exactamente qué fuentes o datos le faltan a tu base de conocimiento para considerarlo un líder del sector.
\`\`\`

---
*© 2026 Inteligencia Neuronal Academy • Guía de Arquitectura de Vanguardia AEO & RAG.*
`;

fs.writeFileSync(path.join(downloadsDir, 'guia-aeo-rag.md'), aeoContent, 'utf8');
fs.writeFileSync(path.join(downloadsDir, 'guia-aeo-rag.pdf'), Buffer.from(aeoContent, 'utf8'));
fs.writeFileSync(path.join(downloadsDir, 'aeo-rag-architecture-2026.pdf'), Buffer.from(aeoContent, 'utf8'));
console.log('✅ Guía AEO & RAG generada.');

// 4. FRAMEWORK DE MANUALES OPERATIVOS (SOPs) Y CHECKLISTS (WORKSPACE NOTION)
console.log('[4/4] Generando Framework Notion SOPs...');
const sopsContent = `# INTELIGENCIA NEURONAL ACADEMY
## FRAMEWORK DE MANUALES OPERATIVOS ESTÁNDAR (SOPs) & CHECKLISTS
**Plantilla Duplicable para Notion y Workspace de Operaciones Escalables**

---

### 📋 ESTRUCTURA MODULAR DEL WORKSPACE NOTION

\`\`\`
📂 OPERACIONES_CENTRALES_WORKSPACE/
│
├── 📁 01_MANUALES_DE_PUESTO_Y_ORGANIGRAMA/
│   ├── 📄 Puesto_Gerente_Operativo.md (Roles, KPIs, límites de decisión)
│   ├── 📄 Puesto_Jefe_Cocina_Chef.md (Control de recetas, mermas, turnos)
│   ├── 📄 Puesto_Líder_Servicio_Mesa.md (Protocolos de atención y venta)
│   └── 📄 Puesto_Encargado_Compras.md (Evaluación de proveedores y stock)
│
├── 📁 02_SOPs_PROCEDIMIENTOS_OPERATIVOS_ESTÁNDAR/
│   ├── ⚡ SOP-01_Apertura_General_Local.md (Paso a paso 60 min pre-servicio)
│   ├── ⚡ SOP-02_Recepcion_Y_Control_Proveedores.md (Pesaje, temperatura, factura)
│   ├── ⚡ SOP-03_Atencion_Cliente_Y_Manejo_Quejas.md (Protocolo L.A.S.T.)
│   ├── ⚡ SOP-04_Cierre_Operativo_Y_Arqueo_Caja.md (Conciliación bancaria y seguridad)
│   └── ⚡ SOP-05_Mantenimiento_Preventivo_Equipos.md (Hornos, filtros, KDS)
│
├── 📁 03_CHECKLISTS_Y_AUDITORÍAS_DIARIAS/
│   ├── 📋 Checklist_Apertura_Cocina.table
│   ├── 📋 Checklist_Apertura_Sala_Y_Barra.table
│   ├── 📋 Checklist_Auditoría_Higiene_HACCP.table
│   └── 📋 Checklist_Cierre_Seguridad_Terminal.table
│
└── 📁 04_INTEGRACIÓN_AGÉNTICA_CON_IA/
    └── 🤖 Prompt_System_Cerebro_SOPs_WhatsApp.txt (Instrucciones para asistente 24/7)
\`\`\`

---

### PROCEDIMIENTO EJEMPLO: SOP-03 PROTOCOLO L.A.S.T. PARA MANEJO DE QUEJAS

1. **L - Listen (Escuchar activamente):** Dejar que el comensal o cliente explique la molestia sin interrumpir. Mantener contacto visual y postura abierta.
2. **A - Apologize (Disculparse sinceramente):** *"Lamento profundamente que su plato/experiencia no haya cumplido nuestro estándar de excelencia."* (No culpar a la cocina ni a terceros).
3. **S - Solve (Resolver en menos de 3 minutos):**
   * Retirar el plato inmediatamente si es un problema de comida.
   * Ofrecer sustitución prioritaria express o alternativa del menú.
   * Notificar al Gerente de Turno para autorización de cortesía o ajuste en cuenta.
4. **T - Thank (Agradecer el feedback):** *"Gracias por hacérnoslo saber de inmediato; esto nos permite corregir el proceso con nuestro equipo."*
5. **Registro en Bitácora:** Anotar incidencia en el canal digital de operaciones para calibrar los entrenamientos de sala y cocina.

---

### CÓMO DUPLICAR ESTE WORKSPACE EN TU CUENTA DE NOTION:
1. Accede al enlace oficial compartido en tu panel de alumno en Inteligencia Neuronal.
2. Haz clic en el botón superior derecho **"Duplicate" (Duplicar)** en Notion.
3. Elige tu espacio de trabajo personal o de equipo.
4. Personaliza los nombres de los puestos y logotipos de tu empresa.
5. Conéctalo opcionalmente a un Agente de IA para responder dudas de tus colaboradores en WhatsApp.

---
*© 2026 Inteligencia Neuronal Academy • Transformando operaciones con disciplina y tecnología.*
`;

fs.writeFileSync(path.join(downloadsDir, 'framework-sops-checklists.md'), sopsContent, 'utf8');
fs.writeFileSync(path.join(downloadsDir, 'framework-sops-checklists.pdf'), Buffer.from(sopsContent, 'utf8'));
console.log('✅ Framework Notion SOPs generado.');

console.log('🚀 ¡Los 4 recursos han sido generados exitosamente en public/downloads!');
