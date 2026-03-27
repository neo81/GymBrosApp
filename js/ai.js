// =============================================
//  AI ROUTINE GENERATOR — GymBros
//  Uses Groq API — llama-3.3-70b-versatile (free tier)
//  Get your free API key at: https://console.groq.com
// =============================================

// ⚠️  Reemplazá con tu API key de Groq:
// https://console.groq.com/keys
const GROQ_API_KEY = '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';
const GROQ_URL     = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL   = 'llama-3.3-70b-versatile'; // alternativa: 'mixtral-8x7b-32768'

// =============================================
//  MAIN: Generate routine
// =============================================

async function generateAIRoutine(formData) {
  const prompt = buildPrompt(formData);

  const body = {
    model: GROQ_MODEL,
    temperature: 0.7,
    max_tokens: 2048,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: 'Sos un entrenador personal experto. Respondés ÚNICAMENTE con JSON válido, sin texto extra, sin explicaciones, sin markdown.',
      },
      { role: 'user', content: prompt },
    ],
  };

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Respuesta vacía de la IA.');

  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

// =============================================
//  PROMPT BUILDER
// =============================================

function buildPrompt(f) {
  const equipment = {
    gym:     'Gimnasio completo (barras, mancuernas, máquinas, poleas, cables)',
    home:    'Casa con mancuernas y barra',
    minimal: 'Solo peso corporal (sin equipamiento)',
  };
  const levelDesc = {
    beginner:     'Principiante (menos de 6 meses de entrenamiento)',
    intermediate: 'Intermedio (1-3 años de entrenamiento)',
    advanced:     'Avanzado (más de 3 años de entrenamiento)',
  };
  const goalDesc = {
    muscle:    'Hipertrofia muscular (ganar músculo)',
    strength:  'Fuerza máxima (aumentar cargas)',
    fat_loss:  'Pérdida de grasa (definición)',
    endurance: 'Resistencia y acondicionamiento físico',
    wellness:  'Bienestar general y salud',
  };
  const muscleGroups = [
    'hombros','pectorales','biceps','triceps','dorsales','trapecio',
    'abdomen','oblicuos','lumbares','gluteos','cuadriceps',
    'isquiotibiales','abductores','aductores','antebrazo','pantorrillas',
    'core','cardio'
  ];
  const injuryText = f.injury?.trim()
    ? `LESIONES / LIMITACIONES: ${f.injury}. IMPORTANTE: Evitá absolutamente cualquier ejercicio que comprometa esas zonas.`
    : 'Sin lesiones conocidas.';

  // List days to use based on count
  const allDays = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
  const useDays = allDays.slice(0, parseInt(f.days));

  return `Creá una rutina de entrenamiento personalizada.

DATOS DEL USUARIO:
- Objetivo: ${goalDesc[f.goal] || f.goal}
- Nivel: ${levelDesc[f.level] || f.level}
- Días de entrenamiento: ${f.days} días/semana (usar: ${useDays.join(', ')})
- Equipamiento: ${equipment[f.equipment] || f.equipment}
- ${injuryText}
- Info extra: ${f.extra?.trim() || 'Ninguna'}

GRUPOS MUSCULARES DISPONIBLES: ${muscleGroups.join(', ')}

REGLAS:
1. Respondé SOLO con el JSON, nada más.
2. Usá exactamente los días indicados (${useDays.join(', ')}).
3. Cada ejercicio: 3-4 series. Reps como string ("10", "8-12").
4. Isométricos y cardio: unit "seg" o "min". Resto: unit "kg".
5. Si un ejercicio NO existe en la lista habitual, marcá isNew: true y especificá muscleGroup.
6. El campo muscleGroup debe ser uno de la lista de grupos musculares.

FORMATO JSON:
{
  "name": "Nombre descriptivo de la rutina",
  "days": {
    "Lunes": {
      "exercises": [
        {
          "name": "Nombre del ejercicio",
          "emoji": "emoji",
          "muscles": ["Músculo principal", "Músculo secundario"],
          "muscleGroup": "grupo_muscular",
          "desc": "Descripción breve",
          "isNew": false,
          "series": [
            { "reps": "10", "weight": "20", "unit": "kg" },
            { "reps": "10", "weight": "20", "unit": "kg" },
            { "reps": "8",  "weight": "22", "unit": "kg" }
          ]
        }
      ]
    }
  }
}`;
}

// =============================================
//  INJECT AI ROUTINE INTO APP
// =============================================

function injectAIRoutine(aiRoutine, routineName) {
  const name = routineName?.trim() || aiRoutine.name || 'Rutina IA';
  const routine = { id: genId(), name, days: {} };
  const newExercises = [];

  for (const [day, dayData] of Object.entries(aiRoutine.days || {})) {
    if (!DAY_ORDER.includes(day)) continue;
    routine.days[day] = { exercises: [] };

    for (const ex of dayData.exercises || []) {
      const exId = 'ai_' + genId();
      const muscleGroup = (ex.muscleGroup || 'hombros').toLowerCase().replace(/\s+/g, '_');

      if (ex.isNew) {
        const newEx = {
          id: exId, name: ex.name, emoji: ex.emoji || '🏋️',
          muscles: ex.muscles || [], desc: ex.desc || '',
          instructions: [], isAIGenerated: true,
        };
        if (!EXERCISES_DB[muscleGroup]) EXERCISES_DB[muscleGroup] = [];
        if (!EXERCISES_DB[muscleGroup].some(e => e.name === ex.name)) {
          EXERCISES_DB[muscleGroup].push(newEx);
          newExercises.push({ name: ex.name, group: muscleGroup });
        }
      }

      const dbEx = getAllExercises().find(e =>
        e.name.toLowerCase().trim() === ex.name.toLowerCase().trim());

      routine.days[day].exercises.push({
        exerciseId: dbEx?.id || exId,
        name:    ex.name,
        emoji:   ex.emoji || dbEx?.emoji || '🏋️',
        muscles: ex.muscles || dbEx?.muscles || [],
        note:    '',
        series:  (ex.series || []).map(s => ({
          reps: s.reps || '', weight: s.weight || '', unit: s.unit || 'kg',
        })),
      });
    }
  }

  return { routine, newExercises };
}

// =============================================
//  MODAL OPEN / CLOSE
// =============================================

function openAIModal() {
  const modal = document.getElementById('modal-ai-routine');
  if (!modal) return;
  document.getElementById('ai-form').reset();
  document.querySelectorAll('.ai-level-btn, .ai-days-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('ai-level').value = '';
  document.getElementById('ai-days').value  = '';
  document.getElementById('ai-result-section').style.display = 'none';
  document.getElementById('ai-error-msg').style.display = 'none';
  document.getElementById('ai-loading').style.display = 'none';
  document.getElementById('ai-generate-btn').disabled = false;
  modal.style.display = 'flex';
}

function closeAIModal() {
  const modal = document.getElementById('modal-ai-routine');
  if (modal) modal.style.display = 'none';
  window._aiGeneratedRoutine = null;
}

async function onGenerateRoutine() {
  const goal      = document.getElementById('ai-goal').value;
  const level     = document.getElementById('ai-level').value;
  const days      = document.getElementById('ai-days').value;
  const equipment = document.getElementById('ai-equipment').value;
  const injury    = document.getElementById('ai-injury').value.trim();
  const extra     = document.getElementById('ai-extra').value.trim();
  const errEl     = document.getElementById('ai-error-msg');

  if (!goal || !level || !days || !equipment) {
    errEl.textContent = 'Completá todos los campos obligatorios (*)';
    errEl.style.display = 'block';
    return;
  }

  errEl.style.display = 'none';
  document.getElementById('ai-result-section').style.display = 'none';
  document.getElementById('ai-loading').style.display = 'flex';
  document.getElementById('ai-generate-btn').disabled = true;

  try {
    const aiRoutine = await generateAIRoutine({ goal, level, days, equipment, injury, extra });

    document.getElementById('ai-loading').style.display = 'none';
    document.getElementById('ai-generate-btn').disabled = false;
    document.getElementById('ai-result-section').style.display = 'block';
    document.getElementById('ai-routine-name').value = aiRoutine.name || 'Rutina IA';

    const dayKeys = Object.keys(aiRoutine.days || {});
    const totalEx  = dayKeys.reduce((a, d) => a + (aiRoutine.days[d]?.exercises?.length || 0), 0);
    const newExCnt = dayKeys.reduce((a, d) =>
      a + (aiRoutine.days[d]?.exercises?.filter(e => e.isNew).length || 0), 0);

    document.getElementById('ai-preview-summary').innerHTML = `
      <div class="ai-preview-stat"><span>${dayKeys.length}</span><small>días</small></div>
      <div class="ai-preview-stat"><span>${totalEx}</span><small>ejercicios</small></div>
      ${newExCnt > 0 ? `<div class="ai-preview-stat ai-preview-new"><span>${newExCnt}</span><small>nuevos</small></div>` : ''}
    `;

    document.getElementById('ai-preview-days').innerHTML = dayKeys.map(day => `
      <div class="ai-preview-day">
        <div class="ai-preview-day-title">${day}</div>
        <div class="ai-preview-exercises">
          ${(aiRoutine.days[day]?.exercises || []).map(ex => `
            <div class="ai-preview-ex">
              <span>${ex.emoji || '🏋️'}</span>
              <span>${ex.name}</span>
              <span class="ai-preview-ex-series">${ex.series?.length || 0} series</span>
              ${ex.isNew ? '<span class="ai-new-badge">NUEVO</span>' : ''}
            </div>`).join('')}
        </div>
      </div>`).join('');

    window._aiGeneratedRoutine = aiRoutine;

  } catch (err) {
    document.getElementById('ai-loading').style.display = 'none';
    document.getElementById('ai-generate-btn').disabled = false;
    const isApiKey = err.message.includes('API key') || err.message.includes('401') || err.message.includes('Invalid API Key');
    errEl.textContent = isApiKey
      ? '⚠️ API key de Groq no configurada. Revisá js/ai.js.'
      : `Error: ${err.message}`;
    errEl.style.display = 'block';
  }
}

function onSaveAIRoutine() {
  const aiRoutine = window._aiGeneratedRoutine;
  if (!aiRoutine) return;
  const routineName = document.getElementById('ai-routine-name').value.trim();
  if (!routineName) { showToast('Poné un nombre a la rutina.'); return; }

  const { routine, newExercises } = injectAIRoutine(aiRoutine, routineName);
  const routines = S.routines;
  routines.push(routine);
  S.routines = routines;

  // Sync this routine to cloud
  if (typeof currentUserId !== 'undefined' && currentUserId) {
    dbSaveRoutine(currentUserId, routine).catch(e => console.warn('[AI] sync error:', e));
  }

  closeAIModal();
  renderHome();

  const msg = newExercises.length > 0
    ? `✅ Rutina guardada con ${newExercises.length} ejercicio${newExercises.length > 1 ? 's' : ''} nuevo${newExercises.length > 1 ? 's' : ''}!`
    : '✅ Rutina guardada!';
  showToast(msg, 3000);
}
