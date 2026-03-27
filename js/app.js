/* ===========================
   GymBros — app.js v1
   PWA Gimnasio — Vanilla JS
   UTC-3 Argentina
   =========================== */

'use strict';

// =============================================
//  DATA — MUSCLES & EXERCISES
// =============================================

const MUSCLES_FRONT = [
  { id: 'hombros',    label: 'Hombros',    cx: 118, cy: 118, r: 13 },
  { id: 'pectorales', label: 'Pectorales', cx: 168, cy: 132, r: 15 },
  { id: 'biceps',     label: 'Bíceps',     cx: 94,  cy: 158, r: 10 },
  { id: 'abdomen',    label: 'Abdomen',    cx: 168, cy: 180, r: 13 },
  { id: 'oblicuos',   label: 'Oblicuos',   cx: 140, cy: 192, r: 9  },
  { id: 'antebrazo',  label: 'Antebrazo',  cx: 86,  cy: 210, r: 9  },
  { id: 'abductores', label: 'Abductores', cx: 120, cy: 268, r: 10 },
  { id: 'aductores',  label: 'Aductores',  cx: 168, cy: 274, r: 10 },
  { id: 'cuadriceps', label: 'Cuádriceps', cx: 144, cy: 302, r: 12 },
];

const MUSCLES_BACK = [
  { id: 'trapecio',       label: 'Trapecio',       cx: 152, cy: 112, r: 13 },
  { id: 'dorsales',       label: 'Dorsales',        cx: 158, cy: 162, r: 15 },
  { id: 'triceps',        label: 'Tríceps',         cx: 102, cy: 160, r: 10 },
  { id: 'lumbares',       label: 'Lumbares',        cx: 158, cy: 202, r: 10 },
  { id: 'gluteos',        label: 'Glúteos',         cx: 158, cy: 240, r: 13 },
  { id: 'isquiotibiales', label: 'Isquiotibiales',  cx: 152, cy: 290, r: 11 },
  { id: 'pantorrillas',   label: 'Pantorrillas',    cx: 158, cy: 332, r: 10 },
];

const ALL_MUSCLES = [...MUSCLES_FRONT, ...MUSCLES_BACK];

// Grupos especiales que no tienen punto en la figura pero sí ejercicios
const SPECIAL_GROUPS = [
  { id: 'core',   label: 'Core',   emoji: '🧱' },
  { id: 'cardio', label: 'Cardio', emoji: '🏃' },
];

const EXERCISES_DB = {
  hombros: [
    { id: 'e_hom_1', name: 'Elevación Lateral (mancuernas)', emoji: '🏋️', muscles: ['Hombros','Trapecio'], desc: 'Trabaja el deltoides lateral. Eleva los brazos hasta la altura de los hombros manteniendo leve flexión.', instructions: ['Parate derecho con una mancuerna en cada mano a los costados del cuerpo.','Elevá las mancuernas hacia los costados hasta que tus brazos estén paralelos al piso.','Mantené una leve flexión en los codos durante todo el movimiento.','Bajá las pesas de forma controlada hasta la posición inicial.','No uses el balanceo del cuerpo para subir el peso, concentrate en el hombro.'] },
    { id: 'e_hom_2', name: 'Press Militar Sentado (mancuernas)', emoji: '💪', muscles: ['Hombros','Tríceps'], desc: 'Ejercicio compuesto para deltoides anterior y lateral. Empuja hacia arriba extendiendo completamente los codos.', instructions: ['Sentate en un banco con respaldo a 90 grados.','Sostené las mancuernas a la altura de las orejas con las palmas hacia adelante.','Empujá las pesas hacia arriba hasta que tus brazos estén casi extendidos.','Bajá lentamente hasta que las mancuernas vuelvan al nivel de tus orejas.','Mantené los pies bien apoyados en el piso para mayor estabilidad.'] },
    { id: 'e_hom_3', name: 'Press Militar (barra)', emoji: '🔱', muscles: ['Hombros','Trapecio','Tríceps'], desc: 'Movimiento compuesto de empuje vertical. Uno de los mejores para masa en hombros.', instructions: ['Parate con los pies al ancho de los hombros.','Sostené la barra sobre la parte superior del pecho con agarre más ancho que los hombros.','Empujá la barra hacia arriba sobre tu cabeza hasta extender los brazos.','Bajá la barra con control hasta que toque suavemente la parte superior del pecho.','Apretá los glúteos y el abdomen para proteger la espalda baja.'] },
    { id: 'e_hom_4', name: 'Elevación Frontal (mancuernas)', emoji: '⬆️', muscles: ['Hombros'], desc: 'Aísla el deltoides anterior. Eleva el brazo extendido hasta la altura del hombro.', instructions: ['Parate derecho con una mancuerna en cada mano frente a tus muslos.','Levantá una mancuerna hacia adelante hasta que el brazo esté paralelo al piso.','Mantené el brazo casi recto con mínima flexión en el codo.','Bajá la mancuerna con control y repetí con el otro brazo.','Evitá balancear el torso para generar impulso.'] },
    { id: 'e_hom_5', name: 'Pájaros con Mancuernas', emoji: '🕊️', muscles: ['Hombros','Dorsales'], desc: 'Trabaja el deltoides posterior con el torso inclinado hacia adelante.', instructions: ['Incliná el torso hacia adelante a unos 45 grados con las rodillas levemente flexionadas.','Sostené las mancuernas con los brazos colgando hacia el piso.','Elevá las mancuernas hacia los costados hasta la altura de los hombros.','Mantenete firme en el torso, no lo balancees.','Bajá lentamente con control total.'] },
  ],
  pectorales: [
    { id: 'e_pec_1', name: 'Press de Banca Plano (barra)', emoji: '🏋️', muscles: ['Pectorales','Tríceps','Hombros'], desc: 'El rey del pecho. Empuja la barra desde el pecho hasta extensión completa de codos.', instructions: ['Recostarte en el banco con los pies apoyados firmemente en el piso.','Agarrá la barra un poco más ancho que el ancho de tus hombros.','Bajá la barra lentamente hasta que toque el pecho en la parte media-baja.','Empujá la barra hacia arriba con fuerza explosiva hasta extender los codos.','Mantenete apretado en el banco, no arqueés la espalda en exceso.'] },
    { id: 'e_pec_2', name: 'Aperturas con Mancuernas', emoji: '🦋', muscles: ['Pectorales'], desc: 'Aísla el pecho. Baja las mancuernas en arco manteniendo leve flexión en codos.', instructions: ['Recostarte en el banco plano con una mancuerna en cada mano sobre el pecho.','Abrí los brazos en arco amplio bajando las mancuernas hacia los costados.','Mantené una leve flexión en los codos en todo momento.','Sentí el estiramiento en el pecho al llegar abajo.','Cerrá los brazos volviendo al punto inicial como si abrazaras un árbol grande.'] },
    { id: 'e_pec_3', name: 'Press Inclinado (mancuernas)', emoji: '📐', muscles: ['Pectorales','Hombros'], desc: 'Enfoca el pecho superior. Banco a 30-45 grados.', instructions: ['Regulá el banco entre 30 y 45 grados de inclinación.','Sentate con una mancuerna en cada mano a la altura de los hombros.','Empujá las mancuernas hacia arriba y levemente hacia adentro al llegar arriba.','Bajá de forma controlada manteniendo tensión en el pecho superior.','No dejes que los codos caigan por debajo del banco.'] },
    { id: 'e_pec_4', name: 'Fondos en Paralelas', emoji: '↕️', muscles: ['Pectorales','Tríceps'], desc: 'Ejercicio con peso corporal. Inclina el torso para mayor activación pectoral.', instructions: ['Agarrá las barras paralelas y subí con los brazos extendidos.','Inclina el torso ligeramente hacia adelante para mayor activación del pecho.','Bajá el cuerpo flexionando los codos hasta que estén a 90 grados.','Empujá hacia arriba hasta extender completamente los codos.','Mantené el core activado durante todo el movimiento.'] },
    { id: 'e_pec_5', name: 'Cruce de Poleas', emoji: '✖️', muscles: ['Pectorales'], desc: 'Excelente para la contracción final del pecho. Cruza las manos en el centro.', instructions: ['Parate en el centro de la máquina de poleas con los cables en posición alta.','Agarrá las manijas y dá un pequeño paso hacia adelante para tensionar.','Llevá las manos hacia adelante y hacia abajo cruzándolas frente a tu abdomen.','Exagerá la contracción al llegar al centro, apretando el pecho.','Volvé de forma controlada sin que los cables tiren bruscamente los brazos.'] },
  ],
  biceps: [
    { id: 'e_bic_1', name: 'Curl Bíceps (barra)', emoji: '💪', muscles: ['Bíceps','Antebrazo'], desc: 'Ejercicio básico y efectivo. Mantén los codos pegados al cuerpo.', instructions: ['Parate con la barra con agarre supino (palmas hacia arriba) al ancho de los hombros.','Pegá los codos al costado del cuerpo y no los muevas.','Flexioná los codos subiendo la barra hacia los hombros de forma controlada.','En la cima apretá el bíceps un momento.','Bajá la barra lentamente sin dejar que los codos se abran.'] },
    { id: 'e_bic_2', name: 'Curl Martillo (mancuernas)', emoji: '🔨', muscles: ['Bíceps','Antebrazo'], desc: 'Agarre neutro. Trabaja bíceps braquial y braquiorradial.', instructions: ['Parate con una mancuerna en cada mano con agarre neutro (pulgar arriba).','Mantené los codos pegados al cuerpo durante todo el movimiento.','Flexioná los codos llevando las mancuernas hacia los hombros.','No gires la muñeca durante el movimiento.','Bajá con control total sin soltar la tensión.'] },
    { id: 'e_bic_3', name: 'Curl Concentrado', emoji: '🎯', muscles: ['Bíceps'], desc: 'Máximo aislamiento del bíceps. Apoya el codo en el muslo interno.', instructions: ['Sentate en el borde de un banco inclinándote levemente hacia adelante.','Apoyá el codo de trabajo en el interior de tu muslo.','Sujetá la mancuerna con agarre supino y bajá el brazo.','Flexioná el codo subiendo la mancuerna hacia el hombro.','Apretá el bíceps en la cima y bajá muy lentamente.'] },
    { id: 'e_bic_4', name: 'Curl en Polea Baja', emoji: '🔗', muscles: ['Bíceps'], desc: 'Tensión constante durante todo el recorrido gracias a la polea.', instructions: ['Configurá la polea en la posición más baja.','Agarrá la manija con agarre supino y dá un paso atrás para tensionar.','Pegá el codo al costado y flexioná llevando la mano hacia el hombro.','Sentí la tensión constante de la polea a diferencia de las mancuernas.','Bajá lentamente resistiendo el tirón del cable.'] },
  ],
  triceps: [
    { id: 'e_tri_1', name: 'Extensión en Polea Alta', emoji: '📉', muscles: ['Tríceps'], desc: 'Empuja el cable hacia abajo extendiendo el codo completamente.', instructions: ['Colocá la polea en la posición alta con una cuerda o barra corta.','Agarrá la cuerda y llevá los codos pegados a los costados del cuerpo.','Empujá hacia abajo extendiendo completamente los codos.','En la posición extendida separás las manos hacia afuera para mayor contracción.','Volvé lentamente a la posición inicial sin que los codos se muevan.'] },
    { id: 'e_tri_2', name: 'Press Francés (mancuernas)', emoji: '🗼', muscles: ['Tríceps'], desc: 'Flexiona el codo trayendo las mancuernas hacia la frente, luego extiende.', instructions: ['Recostarte en el banco con mancuernas sobre el pecho con brazos extendidos.','Manteniendo los codos fijos, flexionalos bajando las mancuernas hacia las sienes.','Bajá hasta que los antebrazos queden paralelos al suelo.','Extendé los codos volviendo a la posición inicial.','Los codos deben apuntar al techo sin abrirse hacia los costados.'] },
    { id: 'e_tri_3', name: 'Fondos en Banco', emoji: '🪑', muscles: ['Tríceps','Pectorales'], desc: 'Peso corporal. Baja el cuerpo flexionando los codos.', instructions: ['Sentate en el borde de un banco y apoyá las manos a los costados de las caderas.','Deslizá el cuerpo hacia adelante separándolo del banco.','Bajá el cuerpo flexionando los codos hasta unos 90 grados.','Empujá hacia arriba extendiendo los codos hasta casi bloquearlos.','Mantené la espalda cerca del banco durante todo el movimiento.'] },
    { id: 'e_tri_4', name: 'Copa (mancuerna)', emoji: '🏆', muscles: ['Tríceps'], desc: 'Agarra la mancuerna con ambas manos, extiende y flexiona detrás de la cabeza.', instructions: ['Parate o sentate con la mancuerna sostenida con ambas manos por encima de la cabeza.','Los codos deben apuntar al techo, brazos extendidos.','Flexioná los codos bajando la mancuerna detrás de la nuca.','Bajá hasta que los antebrazos queden por debajo de la horizontal.','Extendé los codos volviendo arriba sin mover los hombros.'] },
  ],
  dorsales: [
    { id: 'e_dor_1', name: 'Dominadas (agarre ancho)', emoji: '🔝', muscles: ['Dorsales','Bíceps'], desc: 'Jala tu peso corporal. Agarre amplio enfoca la amplitud dorsal.', instructions: ['Colgarte de la barra con agarre pronado (palmas hacia afuera) más ancho que los hombros.','Iniciá el movimiento deprimiendo las escápulas (bajando los omóplatos).','Jalá tu cuerpo hacia arriba hasta que el mentón supere la barra.','En la cima contraé los dorsales al máximo.','Bajá de forma completamente controlada hasta la extensión total de los brazos.'] },
    { id: 'e_dor_2', name: 'Remo con Barra', emoji: '🚣', muscles: ['Dorsales','Bíceps','Trapecio'], desc: 'Torso inclinado. Tira la barra hacia el abdomen bajo.', instructions: ['Parate con los pies al ancho de los hombros con la barra frente a vos.','Incliná el torso hacia adelante a unos 45-60 grados con la espalda recta.','Agarrá la barra con agarre pronado más ancho que los hombros.','Tirá la barra hacia tu abdomen bajo apretando los codos al costado del cuerpo.','En la cima apretá los omóplatos juntos y bajá lentamente.'] },
    { id: 'e_dor_3', name: 'Jalón al Pecho (polea alta)', emoji: '⬇️', muscles: ['Dorsales','Bíceps'], desc: 'Alternativa a dominadas. Jala la barra hacia el pecho.', instructions: ['Sentate en la máquina con las rodillas bien trabadas bajo el soporte.','Agarrá la barra con agarre amplio pronado.','Iniciá jalando hacia abajo deprimiendo las escápulas.','Jalá la barra hacia la parte superior del pecho.','Volvé a la posición inicial con control total sin que los hombros suban.'] },
    { id: 'e_dor_4', name: 'Remo con Mancuerna', emoji: '🏋️', muscles: ['Dorsales','Bíceps'], desc: 'Apoyo en banco. Gran rango de movimiento.', instructions: ['Apoyá la rodilla y la mano del mismo lado sobre el banco para estabilizarte.','Con el otro brazo sostené la mancuerna con el brazo extendido hacia el piso.','Jalá la mancuerna hacia tu cadera lateral apretando el codo cerca del cuerpo.','En la cima apretá el dorsal y el omóplato.','Bajá completamente extendiendo el brazo para máximo rango.'] },
  ],
  trapecio: [
    { id: 'e_tra_1', name: 'Remo Vertical (barra)', emoji: '⬆️', muscles: ['Trapecio','Hombros','Bíceps'], desc: 'Tira la barra hacia el mentón con agarre estrecho.', instructions: ['Parate con la barra con agarre pronado estrecho (manos a 15-20cm de distancia).','Jalá la barra verticalmente hacia arriba pegada al cuerpo.','Llevá la barra hasta la altura del mentón con los codos apuntando hacia afuera.','En la cima los codos deben estar más altos que la barra.','Bajá lentamente manteniendo la barra cerca del cuerpo.'] },
    { id: 'e_tra_2', name: 'Encogimientos (barra)', emoji: '🔼', muscles: ['Trapecio'], desc: 'Eleva los hombros en línea recta hacia las orejas.', instructions: ['Parate con la barra frente a vos con agarre pronado al ancho de los hombros.','Los brazos completamente extendidos durante todo el movimiento.','Encogé los hombros hacia arriba en línea recta como si quisieras tocar las orejas.','No gires los hombros ni hacia adelante ni hacia atrás.','Bajá lentamente sin soltar la tensión del trapecio.'] },
    { id: 'e_tra_3', name: 'Encogimientos (mancuernas)', emoji: '💎', muscles: ['Trapecio'], desc: 'Mayor rango de movimiento que con barra.', instructions: ['Parate con una mancuerna en cada mano a los costados del cuerpo.','Mayor libertad de movimiento que la barra permite mejor rango.','Encogé los hombros hacia arriba apuntando a las orejas.','Mantenete 1-2 segundos arriba apretando el trapecio.','Bajá lentamente sintiendo el estiramiento.'] },
  ],
  abdomen: [
    { id: 'e_abd_1', name: 'Crunchs en Suelo', emoji: '🔄', muscles: ['Abdomen'], desc: 'Contracción abdominal clásica. Lleva las costillas hacia las caderas.', instructions: ['Recostarte boca arriba con las rodillas dobladas y pies apoyados en el piso.','Colocá las manos detrás de la nuca sin jalar la cabeza.','Contraé el abdomen llevando las costillas hacia las caderas.','Levantá apenas los omóplatos del piso, no es un sit-up completo.','Bajá lentamente sin apoyar completamente la espalda entre reps.'] },
    { id: 'e_abd_2', name: 'Plancha Frontal', emoji: '➡️', muscles: ['Abdomen','Lumbares'], desc: 'Isométrico fundamental. Mantén cadera neutra.', defaultUnit: 'seg', instructions: ['Apoyá los antebrazos en el piso con los codos alineados bajo los hombros.','Extendé las piernas atrás apoyando los dedos de los pies.','Contraé abdomen, glúteos y piernas para mantener el cuerpo recto.','La cadera no debe subir ni bajar, debe estar en línea con el cuerpo.','Respirá normalmente manteniendo la tensión el tiempo indicado.'] },
    { id: 'e_abd_3', name: 'Rueda Abdominal', emoji: '⚙️', muscles: ['Abdomen','Dorsales','Hombros'], desc: 'Ejercicio avanzado. Extiende el cuerpo controladamente.', instructions: ['Arrodillate con la rueda frente a vos y agarrá las manijas.','Empujá la rueda hacia adelante extendiendo el cuerpo hacia el piso.','Llegá lo más lejos posible sin tocar el piso con la cadera.','Contraé el abdomen para volver jalando la rueda hacia las rodillas.','Empezá con rangos cortos si sos principiante para proteger la zona lumbar.'] },
    { id: 'e_abd_4', name: 'Elevación de Piernas Colgado', emoji: '🪝', muscles: ['Abdomen'], desc: 'Trabaja especialmente el abdomen inferior.', instructions: ['Colgarte de una barra con agarre pronado al ancho de los hombros.','Mantené el cuerpo estable sin balancearte.','Contraé el abdomen y elevá las rodillas hacia el pecho o las piernas rectas.','Llegá hasta que los muslos queden paralelos al piso como mínimo.','Bajá lentamente sin soltar el control del movimiento.'] },
  ],
  oblicuos: [
    { id: 'e_obl_1', name: 'Crunchs Laterales', emoji: '↗️', muscles: ['Oblicuos'], desc: 'Inclínate hacia los lados de forma controlada.', instructions: ['Recostarte boca arriba con las rodillas dobladas y una mano detrás de la nuca.','Mirá hacia el techo y llevá el codo hacia la rodilla del mismo lado.','Contraé el oblicuo lateral en la cima del movimiento.','Bajá sin rebotar y repetí.','No jales el cuello con la mano, el movimiento viene del abdomen.'] },
    { id: 'e_obl_2', name: 'Plancha Lateral', emoji: '📏', muscles: ['Oblicuos','Abdomen'], defaultUnit: 'seg', desc: 'Isométrico de gran efectividad.', instructions: ['Recostarte de lado apoyando el antebrazo y el costado del pie.','Elevá las caderas hasta que el cuerpo forme una línea recta.','Contraé el oblicuo y el glúteo para mantener la posición.','La cadera no debe caer hacia el piso.','Mantené el tiempo indicado y cambiá de lado.'] },
    { id: 'e_obl_3', name: 'Rotación con Polea', emoji: '🌀', muscles: ['Oblicuos','Abdomen'], desc: 'Rota el torso contra la resistencia de la polea.', instructions: ['Colocá la polea en posición media y parate de costado a la máquina.','Agarrá la manija con ambas manos y alejate un paso para tensar el cable.','Rotá el torso jalando el cable hacia el lado opuesto a la máquina.','Los pies permanecen fijos, el movimiento es solo del torso.','Volvé a la posición inicial de forma controlada sin perder tensión.'] },
  ],
  lumbares: [
    { id: 'e_lum_1', name: 'Hiperextensiones', emoji: '🔙', muscles: ['Lumbares','Glúteos'], desc: 'En el banco romano, extiende la cadera.', instructions: ['Colocate en el banco de hiperextensiones con las caderas apoyadas en el soporte.','Cruzá los brazos sobre el pecho o colocá las manos detrás de la nuca.','Bajá el torso hacia el piso manteniendo la espalda recta.','Contraé los lumbares y los glúteos para subir hasta que el cuerpo quede en línea.','No hiperextiendas más allá de la posición neutra para proteger la columna.'] },
    { id: 'e_lum_2', name: 'Buenos Días (barra)', emoji: '🌅', muscles: ['Lumbares','Isquiotibiales','Glúteos'], desc: 'Inclina el torso con la barra en hombros.', instructions: ['Colocá la barra sobre los trapecios como para una sentadilla.','Con los pies al ancho de los hombros y rodillas levemente flexionadas.','Incliná el torso hacia adelante hasta que quede casi paralelo al piso.','Mantenete con la espalda recta, nunca redondeada.','Volvé a la posición erguida contrayendo los lumbares y los glúteos.'] },
    { id: 'e_lum_3', name: 'Peso Muerto Rumano', emoji: '🏗️', muscles: ['Lumbares','Isquiotibiales','Glúteos'], desc: 'Bisagra de cadera con piernas semirrectas.', instructions: ['Parate con la barra frente a vos con un agarre al ancho de los hombros.','Empujá las caderas hacia atrás manteniendo las rodillas casi rectas.','Deslizá la barra por los muslos bajando hasta la mitad de la tibia.','Sentí el estiramiento en los isquiotibiales al llegar abajo.','Empujá las caderas hacia adelante para volver arriba apretando glúteos.'] },
  ],
  gluteos: [
    { id: 'e_glu_1', name: 'Hip Thrust (barra)', emoji: '🍑', muscles: ['Glúteos','Isquiotibiales'], desc: 'El mejor ejercicio para glúteos. Empuja la cadera hacia arriba.', instructions: ['Apoyá la parte superior de la espalda en un banco con la barra sobre las caderas.','Los pies apoyados en el piso al ancho de los hombros.','Bajá las caderas hacia el piso como posición inicial.','Empujá las caderas hacia arriba apretando glúteos al máximo en la cima.','En la posición alta el torso y los muslos forman una línea recta.'] },
    { id: 'e_glu_2', name: 'Sentadilla Búlgara', emoji: '🎯', muscles: ['Glúteos','Cuádriceps'], desc: 'Pie trasero elevado. Gran activación unilateral.', instructions: ['Colocá el pie trasero sobre un banco o soporte a altura de rodilla.','El pie delantero debe estar suficientemente alejado para hacer la sentadilla.','Bajá el cuerpo flexionando la rodilla delantera hasta que el muslo quede paralelo al piso.','Mantené el torso erguido durante todo el movimiento.','Empujá con el talón delantero para volver arriba apretando el glúteo.'] },
    { id: 'e_glu_3', name: 'Patada Trasera en Polea', emoji: '🦵', muscles: ['Glúteos'], desc: 'Extiende la cadera hacia atrás contra la resistencia.', instructions: ['Colocá el aditamento en el tobillo y conectalo a la polea baja.','Agarrá el soporte de la máquina para estabilizarte.','Llevá la pierna hacia atrás extendiendo la cadera con el glúteo apretado.','No arquees la espalda al llevar la pierna atrás.','Volvé lentamente a la posición inicial sin que el peso toque abruptamente.'] },
    { id: 'e_glu_4', name: 'Peso Muerto Convencional', emoji: '🏋️', muscles: ['Glúteos','Isquiotibiales','Lumbares'], desc: 'Rey de la cadena posterior. Espalda recta, empuja el piso.', instructions: ['Parate con los pies al ancho de los hombros con la barra sobre los pies.','Agarrá la barra con agarre al ancho de los hombros.','Bajá las caderas y levantá el pecho para una espalda recta.','Empujá el piso alejando los pies de la barra para iniciar el levantamiento.','Extendé caderas y rodillas simultáneamente llegando a la posición erguida.'] },
  ],
  cuadriceps: [
    { id: 'e_cua_1', name: 'Sentadilla Libre (barra)', emoji: '👑', muscles: ['Cuádriceps','Glúteos','Isquiotibiales'], desc: 'El rey de los ejercicios de pierna.', instructions: ['Colocá la barra sobre los trapecios y separá los pies al ancho de los hombros.','Los punteros de los pies apuntando levemente hacia afuera.','Bajá como si fueras a sentarte en una silla manteniendo el pecho arriba.','Llegá al menos a que los muslos queden paralelos al piso.','Empujá el piso con los talones para volver arriba apretando glúteos.'] },
    { id: 'e_cua_2', name: 'Extensión de Piernas', emoji: '⬆️', muscles: ['Cuádriceps'], desc: 'Aísla el cuádriceps. Extiende completamente la rodilla.', instructions: ['Sentate en la máquina con la espalda apoyada y el soporte bajo los tobillos.','Agarrá los manubrios laterales para estabilizarte.','Extendé las rodillas hasta que las piernas estén casi rectas.','Mantenete 1 segundo arriba apretando el cuádriceps.','Bajá lentamente resistiendo el peso sin dejar caer.'] },
    { id: 'e_cua_3', name: 'Prensa de Piernas', emoji: '🔩', muscles: ['Cuádriceps','Glúteos'], desc: 'Gran volumen de carga.', instructions: ['Sentate en la prensa y colocá los pies al ancho de los hombros en la plataforma.','Desenganchá los seguros y bajá la plataforma flexionando las rodillas.','Llegá hasta que las rodillas formen un ángulo de 90 grados.','Empujá la plataforma hacia arriba extendiendo las rodillas sin bloquearlas.','No dejes que la zona lumbar se despegue del respaldo durante el movimiento.'] },
    { id: 'e_cua_4', name: 'Zancadas (mancuernas)', emoji: '🚶', muscles: ['Cuádriceps','Glúteos'], desc: 'Unilateral. Excelente para balance y desarrollo funcional.', instructions: ['Parate con una mancuerna en cada mano a los costados del cuerpo.','Dá un paso largo hacia adelante con una pierna.','Bajá el cuerpo hasta que la rodilla trasera casi toque el piso.','La rodilla delantera no debe superar la punta del pie.','Empujá con el talón delantero para volver a la posición inicial.'] },
  ],
  isquiotibiales: [
    { id: 'e_isq_1', name: 'Curl de Piernas Acostado', emoji: '🦿', muscles: ['Isquiotibiales'], desc: 'En la máquina, flexiona las rodillas hacia los glúteos.', instructions: ['Recostarte boca abajo en la máquina con el soporte sobre los tobillos.','Agarrá los manubrios para estabilizarte.','Flexioná las rodillas llevando los talones hacia los glúteos.','Mantenete 1 segundo arriba apretando el isquiotibial.','Bajá lentamente sin dejar caer el peso.'] },
    { id: 'e_isq_2', name: 'Peso Muerto Rumano (mancuernas)', emoji: '🔻', muscles: ['Isquiotibiales','Glúteos','Lumbares'], desc: 'Bisagra de cadera cargada.', instructions: ['Parate con una mancuerna en cada mano frente a los muslos.','Con rodillas levemente flexionadas empujá las caderas hacia atrás.','Deslizá las mancuernas hacia abajo por los muslos y tibias.','Sentí el estiramiento profundo en los isquiotibiales.','Empujá caderas hacia adelante para volver apretando glúteos.'] },
    { id: 'e_isq_3', name: 'Curl Nórdico', emoji: '❄️', muscles: ['Isquiotibiales'], desc: 'Ejercicio avanzado. Desciende controlando con los isquios.', instructions: ['Arrodillate con los tobillos fijados bajo un soporte o con ayuda de un compañero.','Con el cuerpo recto desde las rodillas, caé hacia adelante controladamente.','Los isquiotibiales deben frenar el descenso del cuerpo.','Usá las manos para amortiguar al llegar al piso.','Empujá con las manos para volver a la posición inicial.'] },
  ],
  abductores: [
    { id: 'e_abd2_1', name: 'Abducción en Máquina', emoji: '🦵', muscles: ['Abductores','Glúteos'], desc: 'Abre las piernas contra la resistencia de la máquina.', instructions: ['Sentate en la máquina con las almohadillas en la parte externa de las rodillas.','Partí con las piernas juntas o a 90 grados según la máquina.','Abrí las piernas hacia afuera contra la resistencia hasta el rango completo.','Apretá los abductores en la posición abierta 1 segundo.','Cerrá lentamente sin dejar que el peso caiga solo.'] },
    { id: 'e_abd2_2', name: 'Sentadilla Sumo', emoji: '🏆', muscles: ['Abductores','Cuádriceps','Glúteos'], desc: 'Stance amplio activa más abductores.', instructions: ['Separá los pies más del doble del ancho de los hombros con los pies apuntando hacia afuera.','Colocá la barra sobre los trapecios o sostené una mancuerna frente al pecho.','Bajá manteniendo las rodillas alineadas con la dirección de los pies.','Descendé hasta que los muslos queden paralelos al piso.','Empujá el piso con los talones para volver apretando glúteos.'] },
  ],
  aductores: [
    { id: 'e_adu_1', name: 'Aducción en Máquina', emoji: '🦿', muscles: ['Aductores'], desc: 'Cierra las piernas contra la resistencia.', instructions: ['Sentate en la máquina con las almohadillas en la parte interna de las rodillas.','Partí con las piernas bien abiertas.','Cerrá las piernas hacia adentro contra la resistencia.','Apretá los aductores en la posición cerrada.','Abrí lentamente con control total.'] },
  ],
  antebrazo: [
    { id: 'e_ant_1', name: 'Curl de Muñeca (barra)', emoji: '🖐️', muscles: ['Antebrazo'], desc: 'Flexiona la muñeca con agarre supino.', instructions: ['Sentate con los antebrazos apoyados en los muslos y las manos fuera de las rodillas.','Agarrá la barra con agarre supino (palmas hacia arriba).','Dejá que la barra baje lo más posible abriendo los dedos.','Cerrá los dedos y flexioná la muñeca llevando la barra hacia arriba.','Bajá lentamente sin perder el apoyo del antebrazo en el muslo.'] },
    { id: 'e_ant_2', name: 'Extensión de Muñeca', emoji: '✋', muscles: ['Antebrazo'], desc: 'Agarre prono. Trabaja los extensores.', instructions: ['Sentate con los antebrazos apoyados en los muslos y las manos fuera de las rodillas.','Agarrá la barra con agarre prono (palmas hacia abajo).','Dejá que la barra baje flexionando la muñeca hacia abajo.','Extendé la muñeca hacia arriba contra la resistencia.','Bajá lentamente concentrándote en el estiramiento.'] },
  ],
  pantorrillas: [
    { id: 'e_pan_1', name: 'Elevación de Talones (de pie)', emoji: '👟', muscles: ['Pantorrillas'], desc: 'Sube en punta de pie. Máxima contracción arriba.', instructions: ['Parate con la punta de los pies en el borde de un escalón o plataforma.','Los talones colgando por debajo del escalón para mayor rango.','Bajá los talones lo más posible para estirar la pantorrilla.','Subí en punta de pie lo más alto posible.','Mantente 1-2 segundos arriba apretando la pantorrilla antes de bajar.'] },
    { id: 'e_pan_2', name: 'Elevación de Talones Sentado', emoji: '💺', muscles: ['Pantorrillas'], desc: 'Trabaja el sóleo. Rodillas a 90°.', instructions: ['Sentate en la máquina con las rodillas a 90 grados y el soporte sobre los muslos.','La punta de los pies en el borde de la plataforma.','Bajá los talones para el estiramiento máximo del sóleo.','Subí en punta de pie elevando el soporte.','Apretá 1-2 segundos arriba y bajá lentamente.'] },
    { id: 'e_pan_3', name: 'Saltos a la Comba', emoji: '🪝', muscles: ['Pantorrillas','Cardio'], desc: 'Cardio + pantorrillas. Excelente para acondicionamiento.', instructions: ['Agarrá los mangos de la cuerda con firmeza.','Comenzá con la cuerda detrás de los talones.','Saltá con ambos pies juntos pasando la cuerda por debajo.','Mantenete en punta de pie amortiguando con las pantorrillas.','Comenzá a un ritmo cómodo y aumentá la velocidad progresivamente.'] },
  ],

  core: [
    { id: 'e_cor_1', name: 'Plancha Frontal', emoji: '🧱', muscles: ['Core','Abdomen','Lumbares'], defaultUnit: 'seg', desc: 'Isométrico rey del core. Activa todo el tronco de forma simultánea.', instructions: ['Apoyá los antebrazos en el piso con los codos bajo los hombros.','Extendé las piernas atrás y apoyá los dedos de los pies.','Contraé abdomen, glúteos y piernas para alinear el cuerpo.','La cadera no debe subir ni bajar — cuerpo recto como una tabla.','Respirá de forma constante manteniendo la contracción.'] },
    { id: 'e_cor_2', name: 'Plancha Lateral', emoji: '📐', muscles: ['Core','Oblicuos'], defaultUnit: 'seg', desc: 'Isométrico lateral. Trabaja oblicuos y estabilizadores.', instructions: ['Recostarte de lado apoyando el antebrazo y el borde del pie.','Elevá las caderas hasta que el cuerpo forme una línea recta.','Apuntá la cadera al techo sin dejarla caer.','Podés apoyar el pie de arriba sobre el de abajo para mayor estabilidad.','Mantené el tiempo indicado y cambiá de lado.'] },
    { id: 'e_cor_3', name: 'Dead Bug', emoji: '🐛', muscles: ['Core','Abdomen'], desc: 'Control total del core con movimiento de extremidades opuestas.', instructions: ['Recostarte boca arriba con brazos extendidos al techo y rodillas a 90°.','Activá el core aplastando la zona lumbar contra el suelo.','Bajá simultáneamente el brazo derecho y la pierna izquierda extendida.','Volvé a la posición inicial sin perder el contacto lumbar con el piso.','Alternará lados de forma lenta y controlada.'] },
    { id: 'e_cor_4', name: 'Bird Dog', emoji: '🐦', muscles: ['Core','Lumbares','Glúteos'], desc: 'Estabilidad de columna con extensión de brazo y pierna opuestos.', instructions: ['Colocate en cuatro apoyos con manos bajo hombros y rodillas bajo caderas.','Activá el core para estabilizar la columna en posición neutra.','Extendé simultáneamente el brazo derecho y la pierna izquierda.','Mantenete 2-3 segundos apretando glúteo y core.','Volvé sin tocar el piso y alternará lados.'] },
    { id: 'e_cor_5', name: 'Hollow Body Hold', emoji: '🌙', muscles: ['Core','Abdomen'], defaultUnit: 'seg', desc: 'Posición de compresión total del core. Base de la gimnasia.', instructions: ['Recostarte boca arriba con brazos extendidos sobre la cabeza.','Elevá los hombros y las piernas a unos 15-20cm del piso.','Aplastá la zona lumbar contra el suelo — ese es el punto clave.','Mantenete en esa posición respirando con control.','Si es difícil, doblá las rodillas para reducir la palanca.'] },
    { id: 'e_cor_6', name: 'Rueda Abdominal', emoji: '⚙️', muscles: ['Core','Abdomen','Dorsales','Hombros'], desc: 'Ejercicio avanzado de extensión completa de core.', instructions: ['Arrodillate con la rueda frente a vos y agarrá las manijas.','Activá el core fuerte antes de empezar a rodar.','Empujá la rueda hacia adelante extendiendo el cuerpo despacio.','Llegá lo más lejos posible sin que la cadera caiga.','Contraé el core para volver jalando la rueda hacia las rodillas.'] },
    { id: 'e_cor_7', name: 'Mountain Climbers', emoji: '🧗', muscles: ['Core','Abdomen','Cardio'], desc: 'Cardio + core. Rodillas al pecho alternadas en posición de plancha.', instructions: ['Comenzá en posición de plancha alta con brazos extendidos.','Activá el core para mantener las caderas niveladas.','Llevá la rodilla derecha hacia el pecho de forma explosiva.','Volvé y alternará con la rodilla izquierda.','Aumentá la velocidad progresivamente manteniendo el control de cadera.'] },
    { id: 'e_cor_8', name: 'Superman', emoji: '🦸', muscles: ['Core','Lumbares','Glúteos'], desc: 'Extensión boca abajo para fortalecer la cadena posterior del core.', instructions: ['Recostarte boca abajo con brazos extendidos al frente.','Activá glúteos y lumbares de forma simultánea.','Elevá simultáneamente brazos, pecho y piernas del suelo.','Mantenete 2-3 segundos en la posición elevada.','Bajá lentamente y repetí sin rebotar.'] },
    { id: 'e_cor_9', name: 'Elevación de Piernas Colgado', emoji: '🪝', muscles: ['Core','Abdomen'], desc: 'Trabaja el abdomen inferior. Colgado de una barra.', instructions: ['Colgarte de una barra con agarre pronado al ancho de los hombros.','Mantenete estable sin balancearte.','Contraé el abdomen y elevá las rodillas hacia el pecho.','Para mayor dificultad, extendé las piernas rectas.','Bajá lentamente sin soltarte ni balancearte.'] },
    { id: 'e_cor_10', name: 'Turkish Get Up', emoji: '🏆', muscles: ['Core','Hombros','Glúteos'], desc: 'Movimiento complejo que trabaja todo el cuerpo con enfoque en estabilidad de core.', instructions: ['Recostarte con una pesa rusa/mancuerna extendida al techo con el brazo derecho.','Rodá hacia el lado derecho apoyándote en el codo izquierdo.','Empujá hasta la posición de caballero (rodilla izquierda en el piso).','Levantate completamente de pie manteniendo el brazo extendido.','Deshacé el movimiento de forma controlada volviendo al suelo.'] },
  ],

  cardio: [
    { id: 'e_car_1', name: 'Burpees', emoji: '💥', muscles: ['Cardio','Core','Pectorales'], desc: 'El ejercicio más completo del peso corporal. Cardio + fuerza total.', instructions: ['Parate con los pies al ancho de los hombros.','Bajá en sentadilla y apoyá las manos en el piso.','Saltá los pies atrás a posición de plancha.','Hacé una flexión completa (opcional para intensidad).','Saltá los pies hacia adelante y pegá un salto explosivo arriba con los brazos.'] },
    { id: 'e_car_2', name: 'Salto al Cajón (Box Jump)', emoji: '📦', muscles: ['Cardio','Cuádriceps','Glúteos'], desc: 'Pliometría para potencia de piernas y cardio.', instructions: ['Parate frente al cajón a una distancia de un paso.','Flexioná levemente las rodillas y llevá los brazos atrás.','Saltá explosivamente con los brazos hacia arriba.','Aterrizá sobre el cajón con ambos pies, rodillas levemente flexionadas.','Bajá caminando o saltando suavemente para repetir.'] },
    { id: 'e_car_3', name: 'Sprints (Velocidad)', emoji: '🏃', muscles: ['Cardio','Cuádriceps','Isquiotibiales','Pantorrillas'], defaultUnit: 'seg', desc: 'Sprints de alta intensidad para máximo gasto calórico y potencia.', instructions: ['Calentá bien antes de empezar — mínimo 5 minutos.','Marcá una distancia de 20-40 metros.','Arrancá desde cero a máxima velocidad.','Recuperate caminando el mismo trecho de vuelta.','Repetí 6-10 veces según el nivel.'] },
    { id: 'e_car_4', name: 'Cuerda de Batalla (Battle Ropes)', emoji: '🌊', muscles: ['Cardio','Hombros','Core'], defaultUnit: 'seg', desc: 'Entrenamiento de alta intensidad con cuerdas pesadas.', instructions: ['Agarrá un extremo de cada cuerda con cada mano.','Parate con los pies al ancho de los hombros, rodillas levemente flexionadas.','Alternará los brazos generando ondas hacia la anclaje.','Mantenete con el core activado durante todo el movimiento.','Variantes: ondas simultáneas, círculos, saltos con ondas.'] },
    { id: 'e_car_5', name: 'Remo Ergómetro', emoji: '🚣', muscles: ['Cardio','Dorsales','Piernas','Core'], defaultUnit: 'min', desc: 'Cardio de bajo impacto que trabaja todo el cuerpo.', instructions: ['Sentate en el ergómetro con los pies bien ajustados en los soportes.','Agarrá el remo con las manos a lo ancho de los hombros.','La secuencia es: empuje con piernas → recline el torso → jalar los brazos.','El retorno es el proceso inverso: brazos → torso → doblar piernas.','Mantenete con la espalda recta durante todo el movimiento.'] },
    { id: 'e_car_6', name: 'Jump Rope (Comba)', emoji: '🪢', muscles: ['Cardio','Pantorrillas','Coordinación'], defaultUnit: 'min', desc: 'Cardio clásico. Excelente para coordinación y resistencia.', instructions: ['Agarrá los mangos con firmeza con las muñecas hacia afuera.','Comenzá saltando con ambos pies a un ritmo cómodo.','Usá principalmente las muñecas para girar la cuerda, no los brazos.','Mantenete en punta de pie amortiguando el aterrizaje.','Progresión: doble salto, cruzado, una pierna.'] },
    { id: 'e_car_7', name: 'Jumping Jacks', emoji: '⭐', muscles: ['Cardio','Hombros','Piernas'], desc: 'Calentamiento y cardio de bajo impacto.', instructions: ['Parate con los pies juntos y brazos a los costados.','Saltá abriendo las piernas al ancho de los hombros.','Simultáneamente elevá los brazos por encima de la cabeza.','Volvé a la posición inicial con otro salto.','Mantenete a un ritmo constante y rítmico.'] },
    { id: 'e_car_8', name: 'Escalador de Montaña (Climbers)', emoji: '⛰️', muscles: ['Cardio','Core','Hombros'], defaultUnit: 'seg', desc: 'Cardio en el suelo con alto activación de core.', instructions: ['Comenzá en posición de plancha alta.','Las manos directamente bajo los hombros.','Alternará las rodillas al pecho a máxima velocidad.','Mantenete el core contraído y las caderas niveladas.','Aumentá la velocidad para mayor intensidad cardiovascular.'] },
  ],
};

// =============================================
//  STATE  (localStorage cache + Supabase sync)
// =============================================

// Current authenticated user id (null = not logged in)
let currentUserId = null;

// Debounce timers for cloud sync (avoid hammering DB on rapid changes)
const _syncTimers = {};
function _scheduleSync(key, fn, delay = 1500) {
  clearTimeout(_syncTimers[key]);
  _syncTimers[key] = setTimeout(fn, delay);
}

const S = {
  // ---- PROFILE ----
  get profile()  { return JSON.parse(localStorage.getItem('gymbros_profile') || 'null'); },
  set profile(v) {
    localStorage.setItem('gymbros_profile', JSON.stringify(v));
    if (currentUserId) _scheduleSync('profile', () => dbSaveProfile(currentUserId, v));
  },

  // ---- ROUTINES ----
  get routines() { return JSON.parse(localStorage.getItem('gymbros_routines') || '[]'); },
  set routines(v){
    localStorage.setItem('gymbros_routines', JSON.stringify(v));
    if (currentUserId) _scheduleSync('routines', () => dbSaveRoutines(currentUserId, v));
  },

  // ---- HISTORY ----
  get history()  { return JSON.parse(localStorage.getItem('gymbros_history') || '{}'); },
  set history(v) {
    localStorage.setItem('gymbros_history', JSON.stringify(v));
    if (currentUserId) _scheduleSync('history', () => dbSaveHistory(currentUserId, v));
  },

  // ---- FAVS ----
  get favs()     { return JSON.parse(localStorage.getItem('gymbros_favs') || '[]'); },
  set favs(v)    {
    localStorage.setItem('gymbros_favs', JSON.stringify(v));
    if (currentUserId) _scheduleSync('favs', () => dbSaveFavs(currentUserId, v));
  },

  // ---- CUSTOM EXERCISES ----
  get customEx() { return JSON.parse(localStorage.getItem('gymbros_custom_ex') || '[]'); },
  set customEx(v){ localStorage.setItem('gymbros_custom_ex', JSON.stringify(v)); },
};

let ctx = {
  routine: null,
  day: null,
  muscle: null,
  exercise: null,
  editingExIdx: null,
  detailRoutineId: null,
  bodyFront: true,
  timerSeconds: 60,
  timerInterval: null,
  timerRunning: false,
  filterMode: 'all',
  currentMuscleExercises: [],
  allExercises: [],
  progressExId: null,
  confirmCb: null,
  returnToDetail: false,
  currentUnit: 'kg',
  swMs: 0, swRunning: false, swInterval: null, swLaps: [],
  openAccordionDay: null,
};

// =============================================
//  UTILS
// =============================================

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

function nowAR() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' }));
}

function dateStrAR() {
  const d = nowAR();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function friendlyDate(isoStr) {
  if (!isoStr) return '';
  const [y,m,d] = isoStr.split('-');
  return `${d}/${m}/${y}`;
}

function showToast(msg, ms = 2400) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._to);
  t._to = setTimeout(() => t.classList.remove('show'), ms);
}

function showScreen(id, back = false) {
  const current = document.querySelector('.screen.active');
  const next = document.getElementById(id);
  if (!next) return;
  if (current && current !== next) {
    current.classList.remove('active');
    if (back) {
      // Going back: current exits to right, next enters from left (already at -28% or 0 from before)
      current.classList.add('slide-back');
      next.style.transform = 'translateX(-28%)';
      next.offsetHeight; // force reflow
      next.style.transform = '';
    } else {
      current.classList.add('slide-out');
    }
    setTimeout(() => {
      current.classList.remove('slide-out', 'slide-back');
      next.style.transform = '';
    }, 360);
  }
  next.classList.add('active');
  next.scrollTop = 0;
}

function getAllExercises() {
  const db = Object.values(EXERCISES_DB).flat();
  const custom = S.customEx;
  return [...db, ...custom];
}

function findExercise(id) {
  return getAllExercises().find(e => e.id === id);
}

function greetingByHour() {
  const h = nowAR().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

// =============================================
//  CONFIRM MODAL
// =============================================

function showConfirm({ icon = '⚠️', title, msg, okLabel = 'Eliminar', cb }) {
  document.getElementById('confirm-icon').textContent = icon;
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent = msg;
  document.getElementById('confirm-ok-btn').textContent = okLabel;
  ctx.confirmCb = cb;
  document.getElementById('modal-confirm').style.display = 'flex';
}

function closeConfirm() {
  document.getElementById('modal-confirm').style.display = 'none';
  ctx.confirmCb = null;
}

// =============================================
//  THEME MANAGEMENT
// =============================================

function initTheme() {
  const saved = localStorage.getItem('gymbros_theme');
  let theme;
  if (saved === 'light' || saved === 'dark') {
    theme = saved;
  } else {
    // Detect system preference
    theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  applyTheme(theme, false);

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    // Only follow system if user hasn't manually set a preference
    if (!localStorage.getItem('gymbros_theme')) {
      applyTheme(e.matches ? 'light' : 'dark', true);
    }
  });
}

function applyTheme(theme, animate = true) {
  const root = document.documentElement;
  if (!animate) {
    root.style.transition = 'none';
    document.body.style.transition = 'none';
  }

  if (theme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
  }

  // Update meta theme-color for browser chrome
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'light' ? '#F5F4FF' : '#0F0F1A');
  }

  // Re-enable transition after forced repaint
  if (!animate) {
    requestAnimationFrame(() => {
      root.style.transition = '';
      document.body.style.transition = '';
    });
  }

  localStorage.setItem('gymbros_theme', theme);
}

function toggleTheme() {
  const isLight = document.documentElement.classList.contains('light');
  applyTheme(isLight ? 'dark' : 'light', true);
}

function getTheme() {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

// =============================================
//  AUTH + INIT
// =============================================

async function pushLocalToCloud() {
  if (!currentUserId || !sb) return;
  const profile  = S.profile;
  const routines = S.routines;
  const history  = S.history;
  const favs     = S.favs;
  await Promise.all([
    profile  ? dbSaveProfile(currentUserId, profile)   : Promise.resolve(),
    routines?.length ? dbSaveRoutines(currentUserId, routines) : Promise.resolve(),
    Object.keys(history || {}).length ? dbSaveHistory(currentUserId, history) : Promise.resolve(),
    favs?.length ? dbSaveFavs(currentUserId, favs) : Promise.resolve(),
  ]).catch(e => console.warn('[DB] pushLocalToCloud error:', e));
}

function clearLocalData() {
  ['gymbros_profile','gymbros_routines','gymbros_history','gymbros_favs','gymbros_custom_ex']
    .forEach(k => localStorage.removeItem(k));
}

function hydrateFromCloud(data) {
  // Only overwrite local data if cloud has something non-empty
  // This prevents cloud nulls from wiping good local data
  if (data.profile && data.profile.name)
    localStorage.setItem('gymbros_profile', JSON.stringify(data.profile));
  if (data.routines && data.routines.length)
    localStorage.setItem('gymbros_routines', JSON.stringify(data.routines));
  if (data.history && Object.keys(data.history).length)
    localStorage.setItem('gymbros_history', JSON.stringify(data.history));
  if (data.favs && data.favs.length)
    localStorage.setItem('gymbros_favs', JSON.stringify(data.favs));
}

async function initApp() {
  initTheme();
  initSupabase();
  showScreen('screen-loading');

  // Detect OAuth cancel/error in query params
  const urlParams = new URLSearchParams(window.location.search);
  const oauthError = urlParams.get('error');
  if (oauthError) {
    window.history.replaceState({}, document.title, window.location.pathname);
    if (oauthError !== 'access_denied') showToast('Error al iniciar sesión. Intentá de nuevo.');
    showScreen('screen-welcome');
    return;
  }

  // Detect cancel in hash fragment (#error=access_denied)
  const hashStr = window.location.hash.replace('#', '');
  const hashParams = new URLSearchParams(hashStr);
  const hashError = hashParams.get('error');
  if (hashError) {
    window.history.replaceState({}, document.title, window.location.pathname);
    if (hashError !== 'access_denied') showToast('Error al iniciar sesión. Intentá de nuevo.');
    showScreen('screen-welcome');
    return;
  }

  // If hash contains access_token, Supabase SDK needs a moment to process it
  const hasToken = hashStr.includes('access_token=');
  if (hasToken) {
    // Small wait for SDK to parse hash and establish session
    await new Promise(resolve => setTimeout(resolve, 600));
    // Clean the ugly hash from the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // Now read session (will have it if token was in hash)
  const session = await getSession();

  if (session) {
    currentUserId = session.user.id;

    try {
      const cloudData = await dbLoadAllUserData(currentUserId);
      if (cloudData) hydrateFromCloud(cloudData);

      // Preserve Google avatar if not already in profile
      const googleMeta = session.user.user_metadata;
      if (googleMeta) {
        const avatarUrl = googleMeta.avatar_url || googleMeta.picture;
        if (avatarUrl) {
          const cur = S.profile;
          if (cur && !cur.googleAvatar) {
            S.profile = { ...cur, googleAvatar: avatarUrl };
          }
        }
      }
    } catch (e) {
      console.warn('Cloud sync failed, using local data:', e);
    }
  }

  // Auth state listener for future changes
  let initialRouteDone = false;
  if (sb) {
    sb.auth.onAuthStateChange(async (event, newSession) => {
      if (!initialRouteDone) return;
      if (event === 'SIGNED_IN' && newSession) {
        currentUserId = newSession.user.id;
        try {
          const cloudData = await dbLoadAllUserData(currentUserId);
          if (cloudData) hydrateFromCloud(cloudData);
        } catch (e) { /* use local */ }
        const profile = S.profile;
        if (profile) { renderHome(); showScreen('screen-home'); }
        else showScreen('screen-register');
      } else if (event === 'SIGNED_OUT') {
        currentUserId = null;
        clearLocalData();
        showScreen('screen-welcome');
      }
    });
  }

  // Initial routing
  const profile = S.profile;
  if (profile) {
    renderHome();
    showScreen('screen-home');
  } else if (session) {
    showScreen('screen-register');
  } else {
    showScreen('screen-welcome');
  }

  initialRouteDone = true;
}

async function handleGoogleLogin() {
  const btn = document.getElementById('btn-google-login');
  const label = btn?.querySelector('.google-btn-label');
  if (btn) btn.disabled = true;
  if (label) label.textContent = 'Conectando...';

  const { error } = await signInWithGoogle();

  if (error) {
    showToast('Error al conectar con Google. Intentá de nuevo.');
    if (btn) btn.disabled = false;
    if (label) label.textContent = 'Continuar con Google';
  }
  // On success the page redirects to Google — return handled by getSession() on reload
}

async function handleLogout() {
  showConfirm({
    icon: '👋',
    title: '¿Cerrar sesión?',
    msg: 'Tus datos quedan guardados en la nube.',
    okLabel: 'Cerrar sesión',
    cb: async () => {
      closeConfirm();
      showToast('Cerrando sesión...');
      try {
        await pushLocalToCloud();
      } catch(e) { /* continue anyway */ }
      try {
        await signOut();
      } catch(e) { /* continue anyway */ }
      // Don't wait for onAuthStateChange — navigate directly
      currentUserId = null;
      clearLocalData();
      showScreen('screen-welcome', true);
    }
  });
}

function saveProfile() {
  const name   = document.getElementById('reg-name').value.trim();
  const ageRaw = document.getElementById('reg-age').value.trim();
  const wRaw   = document.getElementById('reg-weight').value.trim();
  const hRaw   = document.getElementById('reg-height').value.trim();
  const sex    = document.querySelector('.sex-btn.selected')?.dataset.sex || '';

  clearFormErrors();
  let hasError = false;

  if (!name || name.length < 2) {
    setFieldError('reg-name', 'El nombre es obligatorio (mín. 2 caracteres).');
    hasError = true;
  }
  const age = parseInt(ageRaw);
  if (ageRaw && (isNaN(age) || age < 10 || age > 99)) {
    setFieldError('reg-age', 'Ingresá una edad entre 10 y 99.');
    hasError = true;
  }
  const weight = parseFloat(wRaw);
  if (wRaw && (isNaN(weight) || weight < 30 || weight > 300)) {
    setFieldError('reg-weight', 'Peso entre 30 y 300 kg.');
    hasError = true;
  }
  const height = parseInt(hRaw);
  if (hRaw && (isNaN(height) || height < 100 || height > 250)) {
    setFieldError('reg-height', 'Altura entre 100 y 250 cm.');
    hasError = true;
  }
  if (hasError) return;

  const existing = S.profile;
  // A "real" existing profile has been completed by the user (has createdAt set properly)
  // A partial Google profile only has name + googleAvatar, no age/weight/height
  const isRealExisting = existing && (existing.age > 0 || existing.weight > 0 || existing.height > 0);

  S.profile = {
    name,
    age: isNaN(age) ? 0 : age,
    weight: isNaN(weight) ? 0 : weight,
    height: isNaN(height) ? 0 : height,
    sex,
    createdAt: existing?.createdAt || dateStrAR(),
    googleAvatar: existing?.googleAvatar || null,
  };

  renderHome();
  if (isRealExisting) {
    renderProfileScreen();
    showScreen('screen-profile');
    showToast('Perfil actualizado ✅');
  } else {
    showScreen('screen-home');
    showToast(`¡Bienvenido/a, ${name}! 💪`);
  }

  // Cloud sync after navigation (non-blocking)
  if (currentUserId) {
    pushLocalToCloud()
      .then(() => console.log('[DB] synced ✅'))
      .catch(e => console.warn('[DB] sync error:', e.message));
  }
}

function setFieldError(fieldId, msg) {
  const input = document.getElementById(fieldId);
  if (!input) return;

  // Mark input red
  input.classList.add('input-error');

  // Find the closest .form-section or .form-half as the container to append under
  const container = input.closest('.form-section') || input.closest('.form-half') || input.parentElement;

  // Don't duplicate
  if (container.querySelector('.field-error-msg')) return;

  const el = document.createElement('p');
  el.className = 'field-error-msg';
  el.textContent = msg;
  container.appendChild(el);

  // Auto-clear this field's error as soon as user types/changes it
  const clear = () => {
    input.classList.remove('input-error');
    el.remove();
    input.removeEventListener('input', clear);
    input.removeEventListener('change', clear);
  };
  input.addEventListener('input', clear);
  input.addEventListener('change', clear);
}

function clearFormErrors() {
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  document.querySelectorAll('.field-error-msg').forEach(el => el.remove());
}

function getBMICategory(bmi) {
  const n = parseFloat(bmi);
  if (isNaN(n) || n === 0) return null;
  if (n < 18.5) return { label: 'Bajo peso',  color: '#60A5FA', bg: 'rgba(96,165,250,0.12)' };
  if (n < 25)   return { label: 'Normal',      color: '#4DFFA0', bg: 'rgba(77,255,160,0.12)' };
  if (n < 30)   return { label: 'Sobrepeso',   color: '#FFB830', bg: 'rgba(255,184,48,0.12)' };
  return              { label: 'Obesidad',     color: '#FF5C7A', bg: 'rgba(255,92,122,0.12)' };
}

function renderProfileScreen() {
  const p = S.profile;
  if (!p) return;
  const initial  = p.name.charAt(0).toUpperCase();
  const bmi      = p.height > 0 ? (p.weight / Math.pow(p.height / 100, 2)).toFixed(1) : null;
  const bmiCat   = bmi ? getBMICategory(bmi) : null;
  const isLight  = getTheme() === 'light';
  const totalRoutines  = S.routines.length;
  const totalExercises = S.routines.reduce((acc, r) =>
    acc + Object.values(r.days || {}).reduce((a, d) => a + (d.exercises || []).length, 0), 0);
  const totalSessions  = Object.values(S.history).reduce((acc, h) => acc + (h.entries?.length || 0), 0);

  document.getElementById('profile-content').innerHTML = `
    <div class="profile-card">
      <div class="profile-card-header">
        <div class="profile-big-avatar">
          ${p.googleAvatar
            ? `<img src="${p.googleAvatar}" class="profile-big-avatar-img" alt="${initial}"/>`
            : initial}
        </div>
        <div class="profile-card-header-info">
          <div class="profile-card-name">${p.name}</div>
          <div class="profile-card-sub">${p.sex === 'M' ? '♂ Masculino' : p.sex === 'F' ? '♀ Femenino' : '⬜ Sin especificar'}${p.age ? ` · ${p.age} años` : ''}</div>
          ${p.createdAt ? `<div class="profile-card-joined">Miembro desde ${friendlyDate(p.createdAt)}</div>` : ''}
        </div>
      </div>
      <div class="profile-stats-row">
        <div class="profile-stat-pill">
          <span class="profile-stat-val">${p.weight || '—'}</span>
          <span class="profile-stat-label">kg</span>
        </div>
        <div class="profile-stat-divider"></div>
        <div class="profile-stat-pill">
          <span class="profile-stat-val">${p.height || '—'}</span>
          <span class="profile-stat-label">cm</span>
        </div>
        <div class="profile-stat-divider"></div>
        <div class="profile-stat-pill${bmiCat ? ' profile-stat-pill--bmi' : ''}" ${bmiCat ? `style="background:${bmiCat.bg}"` : ''}>
          <span class="profile-stat-val" style="${bmiCat ? `color:${bmiCat.color}` : ''}">${bmi || '—'}</span>
          <span class="profile-stat-label" style="${bmiCat ? `color:${bmiCat.color};opacity:0.8` : ''}">IMC${bmiCat ? ` · ${bmiCat.label}` : ''}</span>
        </div>
      </div>
    </div>

    <div class="profile-activity-row">
      <div class="profile-activity-card">
        <span class="profile-activity-val">${totalRoutines}</span>
        <span class="profile-activity-label">Rutinas</span>
      </div>
      <div class="profile-activity-card">
        <span class="profile-activity-val">${totalExercises}</span>
        <span class="profile-activity-label">Ejercicios</span>
      </div>
      <div class="profile-activity-card" onclick="openProgress()" style="cursor:pointer">
        <span class="profile-activity-val" style="color:var(--accent-light)">${totalSessions}</span>
        <span class="profile-activity-label">Sesiones 📊</span>
      </div>
    </div>

    <div class="profile-theme-card">
      <div class="profile-theme-info">
        <span class="profile-theme-icon">${isLight ? '☀️' : '🌙'}</span>
        <div>
          <div class="profile-theme-title">Modo Visual</div>
          <div class="profile-theme-sub">${isLight ? 'Modo Claro activo' : 'Modo Oscuro activo'}</div>
        </div>
      </div>
      <button class="theme-switch" onclick="handleProfileThemeToggle()" aria-label="Cambiar tema">
        <div class="theme-switch-thumb ${isLight ? 'on' : ''}"></div>
      </button>
    </div>

    <div class="profile-danger-zone">
      ${currentUserId ? `<button class="btn-logout" onclick="handleLogout()">👋 Cerrar sesión</button>` : ''}
      <button class="btn-danger-outline" onclick="confirmDeleteProfile()">🗑 Eliminar perfil y todos los datos</button>
    </div>
  `;
}

function openEditProfile() {
  const p = S.profile;
  if (!p) { console.warn('[openEditProfile] no profile'); return; }
  const modal = document.getElementById('modal-edit-profile');
  if (!modal) { console.warn('[openEditProfile] modal not found'); return; }
  document.getElementById('modal-edit-name').value = p.name || '';
  document.getElementById('modal-edit-age').value = p.age > 0 ? p.age : '';
  document.getElementById('modal-edit-weight').value = p.weight > 0 ? p.weight : '';
  document.getElementById('modal-edit-height').value = p.height > 0 ? p.height : '';
  document.querySelectorAll('#modal-edit-sex-selector .sex-btn').forEach(b =>
    b.classList.toggle('selected', b.dataset.sex === p.sex));
  modal.style.display = 'flex';
}

function closeEditProfileModal() {
  document.getElementById('modal-edit-profile').style.display = 'none';
}

function toggleProfileEdit(open) {
  // Now just delegates to modal
  if (open) openEditProfile();
  else closeEditProfileModal();
}

function selectEditSex(btn) {
  document.querySelectorAll('#modal-edit-sex-selector .sex-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function saveInlineEdit() {
  const name   = document.getElementById('modal-edit-name')?.value.trim();
  const ageRaw = document.getElementById('modal-edit-age')?.value.trim();
  const wRaw   = document.getElementById('modal-edit-weight')?.value.trim();
  const hRaw   = document.getElementById('modal-edit-height')?.value.trim();
  const sex    = document.querySelector('#modal-edit-sex-selector .sex-btn.selected')?.dataset.sex || S.profile?.sex || '';

  if (!name || name.length < 2) { showToast('El nombre debe tener al menos 2 caracteres.'); return; }
  const age    = ageRaw ? parseInt(ageRaw)    : 0;
  const weight = wRaw   ? parseFloat(wRaw)    : 0;
  const height = hRaw   ? parseInt(hRaw)      : 0;
  if (ageRaw    && (isNaN(age)    || age < 10    || age > 99))    { showToast('Edad entre 10 y 99 años.');    return; }
  if (wRaw      && (isNaN(weight) || weight < 30 || weight > 300)){ showToast('Peso entre 30 y 300 kg.');    return; }
  if (hRaw      && (isNaN(height) || height < 100|| height > 250)){ showToast('Altura entre 100 y 250 cm.'); return; }

  S.profile = { ...S.profile, name, age, weight, height, sex };
  if (currentUserId) pushLocalToCloud().catch(e => console.warn('[DB] sync error:', e));
  closeEditProfileModal();
  renderHome();
  renderProfileScreen();
  showToast('Perfil actualizado ✅');
}


function handleProfileThemeToggle() {
  toggleTheme();
  renderProfileScreen();
}

function confirmDeleteProfile() {
  showConfirm({
    icon: '⚠️',
    title: '¿Eliminar todo?',
    msg: 'Se borrarán tu perfil, rutinas e historial de forma permanente.',
    okLabel: 'Eliminar todo',
    cb: async () => {
      // Delete from cloud if logged in
      if (currentUserId && sb) {
        await Promise.all([
          sb.from('profiles').delete().eq('user_id', currentUserId),
          sb.from('routines').delete().eq('user_id', currentUserId),
          sb.from('history').delete().eq('user_id', currentUserId),
          sb.from('favs').delete().eq('user_id', currentUserId),
        ]).catch(e => console.warn('Cloud delete error:', e));
        await signOut();
      }
      clearLocalData();
      closeConfirm();
      showScreen('screen-welcome');
    }
  });
}


// =============================================
//  HOME
// =============================================

function renderHome() {
  const p = S.profile;
  const greeting = greetingByHour();
  const name = p?.name || '';
  const initial = name.charAt(0).toUpperCase() || '?';
  document.getElementById('home-greeting').textContent = `${greeting}${name ? ',' : '!'}`;
  const avatar = p?.googleAvatar;
  const avatarImg  = document.getElementById('profile-avatar-img');
  const avatarLetter = document.getElementById('profile-avatar-letter');
  if (avatar && avatarImg) {
    avatarImg.src = avatar;
    avatarImg.style.display = 'block';
    avatarLetter.style.display = 'none';
  } else {
    if (avatarImg) avatarImg.style.display = 'none';
    avatarLetter.style.display = '';
    avatarLetter.textContent = initial;
  }
  const totalEx   = S.routines.reduce((acc, r) => acc + Object.values(r.days || {}).reduce((a, d) => a + (d.exercises || []).length, 0), 0);
  const totalSess = Object.values(S.history).reduce((acc, h) => acc + (h.entries?.length || 0), 0);
  document.getElementById('home-stats-row').innerHTML = `
    ${name ? `<span class="stat-chip"><b>${name}</b></span>` : ''}
    <span class="stat-chip"><b>${S.routines.length}</b> rutina${S.routines.length !== 1 ? 's' : ''}</span>
    <span class="stat-chip"><b>${totalEx}</b> ejercicio${totalEx !== 1 ? 's' : ''}</span>
    ${totalSess > 0 ? `<span class="stat-chip clickable" onclick="openProgress()">📊 <b>${totalSess}</b> sesión${totalSess !== 1 ? 'es' : ''}</span>` : ''}
  `;
  const list = document.getElementById('routines-list');
  const routines = S.routines;
  if (!routines.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🏋️</div><p>Aún no tenés rutinas.<br/>¡Creá la primera!</p></div>`;
    return;
  }
  const lastSessionMap = {};
  for (const [key, val] of Object.entries(S.history)) {
    const routineId = key.split('_')[0];
    const lastEntry = val.entries?.[val.entries.length - 1];
    if (lastEntry && (!lastSessionMap[routineId] || lastEntry.date > lastSessionMap[routineId])) {
      lastSessionMap[routineId] = lastEntry.date;
    }
  }
  list.innerHTML = routines.map(r => {
    const days     = Object.keys(r.days || {}).sort((a,b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
    const totalExR = Object.values(r.days || {}).reduce((a, d) => a + (d.exercises || []).length, 0);
    const dayPills = days.map(d => `<span class="day-pill">${d === 'CORE' ? 'Core' : d.slice(0,3)}</span>`).join('');
    const lastDate = lastSessionMap[r.id];
    return `
      <div class="routine-card" onclick="openRoutineDetail('${r.id}')">
        <div class="routine-card-top">
          <div class="routine-card-name">${r.name}</div>
          <div class="routine-card-actions">
            <button class="routine-card-btn routine-card-btn-edit" title="Editar rutina"
              onclick="event.stopPropagation(); startEditRoutine('${r.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="routine-card-btn routine-card-btn-del" title="Eliminar rutina"
              onclick="event.stopPropagation(); confirmDeleteRoutineFromHome('${r.id}','${r.name.replace(/'/g,"\\'") }')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        </div>
        <div class="routine-card-meta">
          <span>${days.length} día${days.length !== 1 ? 's' : ''}</span>
          <span>${totalExR} ejercicio${totalExR !== 1 ? 's' : ''}</span>
          ${lastDate ? `<span class="routine-card-last">Último: ${friendlyDate(lastDate)}</span>` : ''}
        </div>
        <div class="routine-card-days">${dayPills}</div>
      </div>`;
  }).join('');
}

// =============================================
//  CREATE / EDIT ROUTINE
// =============================================

let selectedDays = [];

function startNewRoutine() {
  ctx.routine = { id: genId(), name: '', days: {} };
  ctx.day = null;
  selectedDays = [];
  document.getElementById('cr-title').textContent = 'Nueva Rutina';
  document.getElementById('routine-name').value = '';
  document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('days-exercises-section').style.display = 'none';
  document.getElementById('day-tabs').innerHTML = '';
  document.getElementById('day-exercises-panel').innerHTML = '<div class="no-day-selected">Seleccioná un día para agregar ejercicios.</div>';

  // Greeting
  const p = S.profile;
  const section = document.getElementById('cr-greeting-section');
  if (p?.name) {
    section.innerHTML = `<div class="greeting-chip">💪 <b>${p.name}</b>, ¡armemos tu nueva rutina!</div>`;
  } else {
    section.innerHTML = '';
  }
  showScreen('screen-create-routine');
}

function startEditRoutine(routineId) {
  const r = S.routines.find(x => x.id === routineId);
  if (!r) return;
  ctx.routine = JSON.parse(JSON.stringify(r));
  selectedDays = Object.keys(ctx.routine.days || {});
  ctx.day = selectedDays[0] || null;

  document.getElementById('cr-title').textContent = 'Editar Rutina';
  document.getElementById('routine-name').value = r.name;

  // Mark selected days
  document.querySelectorAll('.day-btn').forEach(b => {
    b.classList.toggle('selected', selectedDays.includes(b.dataset.day));
  });

  const p = S.profile;
  const section = document.getElementById('cr-greeting-section');
  section.innerHTML = p?.name ? `<div class="greeting-chip">✏️ Editando rutina de <b>${p.name}</b></div>` : '';

  if (selectedDays.length > 0) {
    document.getElementById('days-exercises-section').style.display = 'block';
    renderDayTabs();
  }
  showScreen('screen-create-routine');
}

function toggleDayBtn(btn) {
  const day = btn.dataset.day;
  const ALL = ['CORE','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

  if (day === 'Todos') {
    const allSel = ALL.filter(d => d !== 'CORE').every(d => selectedDays.includes(d));
    document.querySelectorAll('.day-btn:not(.day-btn-all)').forEach(b => {
      b.classList.toggle('selected', !allSel);
    });
    selectedDays = allSel ? [] : [...ALL.filter(d => d !== 'CORE')];
    // Include CORE only if it was already selected
  } else {
    btn.classList.toggle('selected');
    const idx = selectedDays.indexOf(day);
    if (idx < 0) {
      selectedDays.push(day);
      ctx.day = day; // ← jump to the newly selected day
    } else {
      selectedDays.splice(idx, 1);
      // If we deselected the current day, move to first available
      if (ctx.day === day) ctx.day = selectedDays[0] || null;
    }
  }

  // Init empty day data for newly selected days
  selectedDays.forEach(d => {
    if (!ctx.routine.days[d]) ctx.routine.days[d] = { exercises: [] };
  });

  const section = document.getElementById('days-exercises-section');
  if (selectedDays.length > 0) {
    section.style.display = 'block';
    if (!ctx.day || !selectedDays.includes(ctx.day)) ctx.day = selectedDays[0];
    renderDayTabs();
  } else {
    section.style.display = 'none';
  }
}

function removeDay(day) {
  selectedDays = selectedDays.filter(d => d !== day);
  delete ctx.routine.days[day];
  document.querySelectorAll('.day-btn').forEach(b => {
    if (b.dataset.day === day) b.classList.remove('selected');
  });
  if (ctx.day === day) ctx.day = selectedDays[0] || null;
  if (selectedDays.length > 0) renderDayTabs();
  else {
    document.getElementById('days-exercises-section').style.display = 'none';
    document.getElementById('day-tabs').innerHTML = '';
  }
}

const DAY_ORDER = ['CORE','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

function renderDayTabs() {
  const sorted = [...selectedDays].sort((a,b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
  const tabs = document.getElementById('day-tabs');
  tabs.innerHTML = sorted.map(d => `
    <button class="day-tab-btn${ctx.day === d ? ' active' : ''}" onclick="selectDay('${d}')">
      ${d}
      <span class="day-tab-remove" onclick="event.stopPropagation(); confirmRemoveDay('${d}')">✕</span>
    </button>
  `).join('');
  renderDayExercises();
}

function confirmRemoveDay(day) {
  const exCount = ctx.routine.days[day]?.exercises?.length || 0;
  if (exCount > 0) {
    showConfirm({
      icon: '🗓',
      title: `¿Eliminar ${day}?`,
      msg: `Este día tiene ${exCount} ejercicio${exCount !== 1 ? 's' : ''}. Se perderán.`,
      okLabel: 'Eliminar día',
      cb: () => { removeDay(day); closeConfirm(); }
    });
  } else {
    removeDay(day);
  }
}

function selectDay(day) {
  ctx.day = day;
  if (!ctx.routine.days[day]) ctx.routine.days[day] = { exercises: [] };
  renderDayTabs();
}

function renderDayExercises() {
  const panel = document.getElementById('day-exercises-panel');
  if (!ctx.day) { panel.innerHTML = '<div class="no-day-selected">Seleccioná un día.</div>'; return; }

  const exercises = ctx.routine.days[ctx.day]?.exercises || [];
  const exHtml = exercises.map((ex, i) => {
    const seriesSummary = ex.series?.filter(s => s.reps || s.weight)
      .map(s => `${s.reps}×${s.weight}kg`).join(', ') || 'Sin series';
    return `
      <div class="day-exercise-item">
        <div class="day-exercise-thumb">${ex.emoji || '🏋️'}</div>
        <div class="day-exercise-info">
          <div class="day-exercise-name">${ex.name}</div>
          <div class="day-exercise-series">${ex.series?.length || 0} series · ${seriesSummary}</div>
        </div>
        <div class="day-exercise-actions">
          <button class="day-ex-btn day-ex-btn-edit" onclick="editExerciseInDay(${i})">✏️</button>
          <button class="day-ex-btn day-ex-btn-del" onclick="removeExerciseFromDay(${i})">✕</button>
        </div>
      </div>`;
  }).join('');

  panel.innerHTML = `
    ${exercises.length ? exHtml : '<div class="no-day-selected" style="padding:12px 0;">Agregá ejercicios para este día.</div>'}
    <button class="add-exercise-day-btn" onclick="goToSelectMuscle()">
      <span style="font-size:18px;color:var(--accent)">＋</span> Agregar ejercicio
    </button>`;
}

function editExerciseInDay(idx) {
  ctx.editingExIdx = idx;
  const ex = ctx.routine.days[ctx.day].exercises[idx];
  const exDef = findExercise(ex.exerciseId) || ex;
  ctx.exercise = exDef;
  openConfigureExercise(exDef, ex.series, ex.note);
}

function removeExerciseFromDay(idx) {
  ctx.routine.days[ctx.day].exercises.splice(idx, 1);
  renderDayExercises();
}

function saveRoutineFn() {
  const name = document.getElementById('routine-name').value.trim();
  if (!name) { showToast('Ponele un nombre a la rutina'); return; }
  if (selectedDays.length === 0) { showToast('Seleccioná al menos un día'); return; }

  ctx.routine.name = name;
  // Remove days not in selectedDays
  for (const day of Object.keys(ctx.routine.days)) {
    if (!selectedDays.includes(day)) delete ctx.routine.days[day];
  }

  const routines = S.routines;
  const idx = routines.findIndex(r => r.id === ctx.routine.id);
  const isEdit = idx >= 0;
  if (isEdit) routines[idx] = ctx.routine;
  else routines.push(ctx.routine);
  S.routines = routines;

  // Sync only this routine to cloud (not all)
  if (currentUserId) dbSaveRoutine(currentUserId, ctx.routine).catch(e => console.warn('[DB] saveRoutine:', e));

  renderHome();
  showToast('¡Rutina guardada! 💪');

  if (isEdit && ctx.detailRoutineId === ctx.routine.id) {
    // Came from detail edit — go back to detail
    renderRoutineDetailView();
    showScreen('screen-routine-detail');
  } else {
    showScreen('screen-home');
  }
  ctx.routine = null;
  ctx.day = null;
}

// =============================================
//  SELECT MUSCLE
// =============================================

function goToSelectMuscle() {
  // If current day is CORE → skip the body figure, go directly to core/cardio exercise list
  if (ctx.day === 'CORE') {
    ctx.muscle = 'core';
    showCoreExerciseList();
    return;
  }
  ctx.muscle = null;
  ctx.bodyFront = true;
  renderBodyFigure();
  renderMuscleChips();
  document.getElementById('muscle-search').value = '';
  showScreen('screen-select-muscle');
}

function showCoreExerciseList() {
  // Merge core + cardio exercises for the CORE day
  const coreExercises = [
    ...(EXERCISES_DB['core'] || []),
    ...(EXERCISES_DB['cardio'] || []),
    ...S.customEx.filter(e => e.muscleId === 'core' || e.muscleId === 'cardio'),
  ];
  document.getElementById('exercise-list-title').textContent = '🧱 Core & Cardio';
  document.getElementById('filter-muscle-tab').textContent = 'Core & Cardio';
  document.getElementById('exercise-search').value = '';
  ctx.currentMuscleExercises = coreExercises;
  ctx.allExercises = getAllExercises();
  ctx.filterMode = 'muscle';
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('active', t.dataset.filter === 'muscle'));
  renderExerciseCards(coreExercises);
  showScreen('screen-exercise-list');
}

function buildBodySVG(muscles) {
  const isFront  = ctx.bodyFront;
  const isLight  = document.documentElement.classList.contains('light');
  const textFill = isLight ? '#18162E' : '#F0EFFE';
  const lineStroke = isLight ? 'rgba(108,99,255,0.3)' : 'rgba(255,255,255,0.28)';
  const segStroke  = isLight ? 'rgba(108,99,255,0.15)' : 'rgba(255,255,255,0.08)';

  const silhouette = `
    <g fill="url(#bodyGrad)" opacity="0.9" stroke="${segStroke}" stroke-width="0.5">
      <ellipse cx="160" cy="30" rx="10" ry="14"/>
      <path d="M155 44 L152 58 H168 L165 44 Z"/>
      <path d="M152 58 C120 58 100 65 85 85 L100 120 C110 150 120 180 130 225 H190 C200 180 210 150 220 120 L235 85 C220 65 200 58 168 58 Z"/>
      <path d="M85 85 L60 120 L45 180 Q45 195 60 195 L75 180 L85 130 L100 120 Z"/>
      <path d="M235 85 L260 120 L275 180 Q275 195 260 195 L245 180 L235 130 L220 120 Z"/>
      <path d="M135 225 L90 310 L110 420 Q140 425 155 415 L160 320 L165 415 Q180 425 210 420 L230 310 L185 225 Z"/>
    </g>`;

  const segFront = `<g fill="rgba(108,99,255,0.07)" stroke="${segStroke}" stroke-width="0.3">
    <path d="M115 95 Q140 90 160 105 Q180 90 205 95 Q215 130 160 140 Q105 130 115 95 Z"/>
    <path d="M140 150 H180 V215 H140 Z" fill-opacity="0.05"/>
    <line x1="140" y1="173" x2="180" y2="173" stroke="${segStroke}"/>
    <line x1="140" y1="196" x2="180" y2="196" stroke="${segStroke}"/>
    <line x1="160" y1="150" x2="160" y2="215" stroke="${segStroke}"/>
    <path d="M85 90 Q95 85 110 110 L100 130 Q80 120 85 90 Z"/>
    <path d="M235 90 Q225 85 210 110 L220 130 Q240 120 235 90 Z"/>
    <path d="M130 235 Q140 245 150 300 L140 330 Q125 300 130 235 Z"/>
    <path d="M190 235 Q180 245 170 300 L180 330 Q195 300 190 235 Z"/>
  </g>`;

  const segBack = `<g fill="rgba(108,99,255,0.07)" stroke="${segStroke}" stroke-width="0.3">
    <path d="M160 65 L135 90 L160 140 L185 90 Z" fill-opacity="0.1"/>
    <path d="M135 110 Q115 140 125 190 L160 210 L195 190 Q205 140 185 110 Z" fill-opacity="0.08"/>
    <path d="M140 220 Q160 210 180 220 Q190 250 160 260 Q130 250 140 220 Z" fill-opacity="0.1"/>
    <path d="M125 270 Q140 280 150 330 L140 350 Q120 320 125 270 Z"/>
    <path d="M195 270 Q180 280 170 330 L180 350 Q200 320 195 270 Z"/>
  </g>`;

  const hotspots = muscles.map(m => {
    const isActive = ctx.muscle === m.id;
    const side = m.cx > 160 ? 'right' : 'left';
    const labelX = side === 'right' ? m.cx + m.r + 28 : m.cx - m.r - 28;
    const anchor = side === 'right' ? 'start' : 'end';
    const lineX1 = side === 'right' ? m.cx + m.r : m.cx - m.r;
    const lineX2 = side === 'right' ? m.cx + m.r + 24 : m.cx - m.r - 24;
    return `
      <g onclick="selectMuscleHotspot('${m.id}')" style="cursor:pointer">
        <circle cx="${m.cx}" cy="${m.cy}" r="${m.r+10}" fill="transparent"/>
        <circle cx="${m.cx}" cy="${m.cy}" r="${m.r}"
          fill="${isActive ? '#6C63FF' : 'rgba(108,99,255,0.28)'}"
          stroke="${isActive ? '#8B84FF' : 'rgba(108,99,255,0.6)'}"
          stroke-width="${isActive ? 2 : 1}"
          ${isActive ? 'filter="url(#glow)"' : ''}/>
        ${isActive ? `<circle cx="${m.cx}" cy="${m.cy}" r="${m.r+5}" fill="none" stroke="rgba(139,132,255,0.35)" stroke-width="1.5"/>` : ''}
        <line x1="${lineX1}" y1="${m.cy}" x2="${lineX2}" y2="${m.cy}" stroke="${lineStroke}" stroke-width="0.8"/>
        <text x="${labelX}" y="${m.cy+4}" text-anchor="${anchor}"
          font-size="9.5" font-family="Sora,sans-serif" font-weight="600"
          fill="${textFill}" opacity="0.85" style="pointer-events:none"
        >${m.label}</text>
      </g>`;
  }).join('');

  return `<svg viewBox="0 0 320 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bodyGrad" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity="${isLight ? '0.18' : '0.25'}"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="${isLight ? '0.06' : '0.10'}"/>
      </radialGradient>
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    ${silhouette}
    ${isFront ? segFront : segBack}
    ${hotspots}
  </svg>`;
}


function renderBodyFigure() {
  const muscles = ctx.bodyFront ? MUSCLES_FRONT : MUSCLES_BACK;
  document.getElementById('body-figure-container').innerHTML = buildBodySVG(muscles);
}

function renderMuscleChips() {
  const muscles = ctx.bodyFront ? MUSCLES_FRONT : MUSCLES_BACK;
  const regularChips = muscles.map(m =>
    `<button class="muscle-chip${ctx.muscle === m.id ? ' active' : ''}" onclick="selectMuscleHotspot('${m.id}')">${m.label}</button>`
  ).join('');
  // Special groups always visible regardless of front/back
  const specialChips = SPECIAL_GROUPS.map(g =>
    `<button class="muscle-chip muscle-chip-special${ctx.muscle === g.id ? ' active' : ''}" onclick="selectSpecialGroup('${g.id}','${g.label}')">${g.emoji} ${g.label}</button>`
  ).join('');
  document.getElementById('muscle-chips').innerHTML = regularChips + specialChips;
}

function selectMuscleHotspot(id) {
  ctx.muscle = id;
  renderBodyFigure();
  renderMuscleChips();
  const m = ALL_MUSCLES.find(x => x.id === id);
  setTimeout(() => {
    showExerciseList(id, m?.label || id);
    showScreen('screen-exercise-list');
  }, 160);
}

function selectSpecialGroup(id, label) {
  ctx.muscle = id;
  renderMuscleChips(); // update active state without re-rendering SVG
  setTimeout(() => {
    showExerciseList(id, label);
    showScreen('screen-exercise-list');
  }, 80);
}

function rotateBody() {
  const c = document.getElementById('body-figure-container');
  c.classList.add('flipping');
  setTimeout(() => {
    ctx.bodyFront = !ctx.bodyFront;
    renderBodyFigure();
    renderMuscleChips();
    c.classList.remove('flipping');
  }, 200);
}

// =============================================
//  EXERCISE LIST
// =============================================

function showExerciseList(muscleId, label) {
  document.getElementById('exercise-list-title').textContent = label;
  document.getElementById('filter-muscle-tab').textContent = label;
  document.getElementById('exercise-search').value = '';

  const muscleExercises = [...(EXERCISES_DB[muscleId] || []), ...S.customEx.filter(e => e.muscleId === muscleId)];
  const all = getAllExercises();

  ctx.currentMuscleExercises = muscleExercises;
  ctx.allExercises = all;
  ctx.filterMode = 'muscle';

  document.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('active', t.dataset.filter === 'muscle'));
  renderExerciseCards(muscleExercises);
}

function renderExerciseCards(exercises) {
  const grid = document.getElementById('exercises-grid');
  if (!exercises.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:32px 0;font-size:14px;">Sin ejercicios encontrados</div>';
    return;
  }
  const favs = S.favs;
  grid.innerHTML = exercises.map(ex => `
    <div class="exercise-card" onclick="openConfigureExercise(null,'${ex.id}')">
      <div class="exercise-card-anim">
        <span class="anim-figure">${ex.emoji || '🏋️'}</span>
        <button class="exercise-fav-btn${favs.includes(ex.id) ? ' active' : ''}" onclick="toggleFav(event,'${ex.id}')">
          ${favs.includes(ex.id) ? '★' : '☆'}
        </button>
      </div>
      <div class="exercise-card-info">
        <div class="exercise-card-name">${ex.name}</div>
        <div class="exercise-card-muscle">${(ex.muscles || []).join(', ')}</div>
      </div>
    </div>`).join('');
}

function toggleFav(e, id) {
  e.stopPropagation();
  let favs = S.favs;
  const idx = favs.indexOf(id);
  if (idx >= 0) favs.splice(idx, 1); else favs.push(id);
  S.favs = favs;
  const base = ctx.filterMode === 'muscle' ? ctx.currentMuscleExercises
    : ctx.filterMode === 'favs' ? getAllExercises().filter(e => S.favs.includes(e.id))
    : ctx.allExercises;
  renderExerciseCards(base);
}

function filterExercises(query) {
  const q = query.toLowerCase().trim();
  let base = ctx.filterMode === 'muscle' ? ctx.currentMuscleExercises
    : ctx.filterMode === 'favs' ? getAllExercises().filter(e => S.favs.includes(e.id))
    : ctx.allExercises;
  if (!q) { renderExerciseCards(base); return; }
  renderExerciseCards(base.filter(e => e.name.toLowerCase().includes(q) || (e.muscles || []).some(m => m.toLowerCase().includes(q))));
}

// =============================================
//  CONFIGURE EXERCISE
// =============================================

function openConfigureExercise(exObjOrNull, idOrSeries, seriesOrNote, noteOrUndef) {
  let ex, series, note;

  if (typeof idOrSeries === 'string') {
    ex = findExercise(idOrSeries);
    series = [{ reps:'', weight:'', unit:'kg' }, { reps:'', weight:'', unit:'kg' }, { reps:'', weight:'', unit:'kg' }];
    note = '';
    ctx.editingExIdx = null;
  } else if (exObjOrNull && Array.isArray(idOrSeries)) {
    ex = exObjOrNull;
    series = idOrSeries.length ? idOrSeries : [{ reps:'', weight:'', unit:'kg' }, { reps:'', weight:'', unit:'kg' }, { reps:'', weight:'', unit:'kg' }];
    note = seriesOrNote || '';
  } else {
    return;
  }

  if (!ex) return;
  ctx.exercise = ex;

  // Determine unit: from existing series, or from exercise default, or kg
  const detectedUnit = (series[0]?.unit) || ex.defaultUnit || 'kg';
  ctx.currentUnit = detectedUnit;

  document.getElementById('exercise-header-name').textContent = ex.name;
  document.getElementById('exercise-header-muscles').textContent = (ex.muscles || []).join(', ');
  document.getElementById('anim-placeholder-small').textContent = ex.emoji || '🏋️';
  document.getElementById('exercise-note').value = note;
  document.getElementById('note-area').style.display = 'none';

  // Set unit selector UI
  setUnitUI(ctx.currentUnit);

  // Instructions always hidden inline — available via ⓘ button modal only
  document.getElementById('instructions-panel').style.display = 'none';

  renderSeriesRows(series);
  showScreen('screen-configure-exercise');
}

function renderSeriesRows(series) {
  const list = document.getElementById('series-list') || document.getElementById('cfg-series-list');
  if (list) list.innerHTML = series.map((s, i) => buildSeriesRow(i, s)).join('');
  attachSeriesListeners();
}

function setUnitUI(unit) {
  ctx.currentUnit = unit;
  document.querySelectorAll('.cfg-unit-btn, .unit-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.unit === unit);
  });
  document.querySelectorAll('.series-field-unit.weight-unit').forEach(el => {
    el.textContent = unit;
  });
}

function buildSeriesRow(i, s = {}) {
  const unit = s.unit || ctx.currentUnit || 'kg';
  const weightLabel = unit;
  const repsLabel = unit === 'kg' ? 'reps' : 'reps';
  return `
    <div class="series-row" data-index="${i}">
      <div class="series-num">${i + 1}</div>
      <div class="series-fields">
        <div class="series-field-group">
          <input class="series-field-input reps-input" type="number" inputmode="numeric" min="0" max="999" placeholder="0" value="${s.reps || ''}" data-index="${i}" data-cloned="false"/>
          <span class="series-field-unit">${repsLabel}</span>
        </div>
        <div class="series-field-group">
          <input class="series-field-input weight-input" type="number" inputmode="decimal" min="0" max="999" step="0.5" placeholder="0" value="${s.weight || ''}" data-index="${i}" data-cloned="false"/>
          <span class="series-field-unit weight-unit">${weightLabel}</span>
        </div>
      </div>
      <button class="series-delete-btn" onclick="deleteSeriesRow(${i})">✕</button>
    </div>`;
}

function attachSeriesListeners() {
  document.querySelectorAll('.reps-input').forEach((inp, i, all) => {
    inp.addEventListener('input', () => {
      if (parseInt(inp.dataset.index) === 0) {
        all.forEach((other, j) => {
          if (j > 0 && (other.value === '' || other.dataset.cloned === 'true')) {
            other.value = inp.value;
            other.dataset.cloned = 'true';
          }
        });
      } else { inp.dataset.cloned = 'false'; }
    });
    inp.addEventListener('focus', () => inp.select());
  });
  document.querySelectorAll('.weight-input').forEach((inp, i, all) => {
    inp.addEventListener('input', () => {
      if (parseInt(inp.dataset.index) === 0) {
        all.forEach((other, j) => {
          if (j > 0 && (other.value === '' || other.dataset.cloned === 'true')) {
            other.value = inp.value;
            other.dataset.cloned = 'true';
          }
        });
      } else { inp.dataset.cloned = 'false'; }
    });
    inp.addEventListener('focus', () => inp.select());
  });
}

function addSeriesRow() {
  const rows = document.querySelectorAll('.series-row');
  const last = rows[rows.length - 1];
  const lastReps   = last?.querySelector('.reps-input')?.value || '';
  const lastWeight = last?.querySelector('.weight-input')?.value || '';
  const newIdx = rows.length;
  const list = document.getElementById('series-list');
  const div = document.createElement('div');
  div.innerHTML = buildSeriesRow(newIdx, { reps: lastReps, weight: lastWeight, unit: ctx.currentUnit });
  list.appendChild(div.firstElementChild);
  attachSeriesListeners();
  list.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function deleteSeriesRow(idx) {
  const rows = document.querySelectorAll('.series-row');
  if (rows.length <= 1) { showToast('Mínimo 1 serie'); return; }
  const row = rows[idx];
  row.style.transition = 'all 0.18s';
  row.style.opacity = '0';
  row.style.transform = 'translateX(14px)';
  setTimeout(() => {
    row.remove();
    document.querySelectorAll('.series-row').forEach((r, i) => {
      r.dataset.index = i;
      r.querySelector('.series-num').textContent = i + 1;
      r.querySelectorAll('.series-field-input').forEach(inp => inp.dataset.index = i);
      r.querySelector('.series-delete-btn').setAttribute('onclick', `deleteSeriesRow(${i})`);
    });
    attachSeriesListeners();
  }, 200);
}

function getSeriesData() {
  return Array.from(document.querySelectorAll('.series-row')).map(row => ({
    reps: row.querySelector('.reps-input')?.value || '',
    weight: row.querySelector('.weight-input')?.value || '',
    unit: ctx.currentUnit || 'kg',
  }));
}

function saveExerciseFn() {
  if (!ctx.day || !ctx.routine || !ctx.exercise) { showToast('Error al guardar'); return; }
  const series = getSeriesData();
  const note = document.getElementById('exercise-note').value;

  if (!ctx.routine.days[ctx.day]) ctx.routine.days[ctx.day] = { exercises: [] };

  const exEntry = {
    id: genId(),
    exerciseId: ctx.exercise.id,
    name: ctx.exercise.name,
    emoji: ctx.exercise.emoji || '🏋️',
    muscles: ctx.exercise.muscles || [],
    series,
    note,
  };

  if (ctx.editingExIdx !== null && ctx.editingExIdx >= 0) {
    exEntry.id = ctx.routine.days[ctx.day].exercises[ctx.editingExIdx].id;
    ctx.routine.days[ctx.day].exercises[ctx.editingExIdx] = exEntry;
    ctx.editingExIdx = null;
  } else {
    ctx.routine.days[ctx.day].exercises.push(exEntry);
  }

  showToast(`"${ctx.exercise.name}" guardado 💪`);

  if (ctx.returnToDetail) {
    // Persist to storage immediately
    const routines = S.routines;
    const idx = routines.findIndex(r => r.id === ctx.routine.id);
    if (idx >= 0) routines[idx] = ctx.routine;
    else routines.push(ctx.routine);
    S.routines = routines;
    renderHome();
    renderRoutineDetailView();
    ctx.returnToDetail = false;
    showScreen('screen-routine-detail');
  } else {
    renderDayExercises();
    showScreen('screen-create-routine');
  }
}

// =============================================
//  EXERCISE INFO MODAL
// =============================================

function showExerciseInfo() {
  const ex = ctx.exercise;
  if (!ex) return;
  document.getElementById('modal-exercise-name').textContent = ex.name;
  document.getElementById('modal-muscles-list').innerHTML = (ex.muscles || []).map(m =>
    `<span class="modal-muscle-tag">${m}</span>`).join('');
  document.getElementById('modal-exercise-desc').textContent = ex.desc || '';
  document.getElementById('modal-anim-container').innerHTML = `<span class="anim-figure-big">${ex.emoji || '🏋️'}</span>`;

  // Instructions
  const instrWrap = document.getElementById('modal-instructions-wrap');
  const instrList = document.getElementById('modal-instructions-list');
  if (ex.instructions && ex.instructions.length) {
    instrList.innerHTML = ex.instructions.map((step, i) =>
      `<li class="modal-instruction-step"><span class="modal-step-num">${i+1}</span><span>${step}</span></li>`
    ).join('');
    instrWrap.style.display = 'block';
  } else {
    instrWrap.style.display = 'none';
  }

  document.getElementById('modal-exercise-info').style.display = 'flex';
}

// =============================================
//  MANUAL EXERCISE
// =============================================

function openManualExerciseModal() {
  document.getElementById('manual-ex-name').value = '';
  document.getElementById('manual-ex-muscle').value = ctx.muscle || '';
  document.getElementById('manual-ex-emoji').value = '';
  document.getElementById('modal-manual-exercise').style.display = 'flex';
}

function saveManualExercise() {
  const name  = document.getElementById('manual-ex-name').value.trim();
  const muscleId = document.getElementById('manual-ex-muscle').value;
  const emoji = document.getElementById('manual-ex-emoji').value.trim() || '🏋️';
  if (!name) { showToast('Ingresá el nombre del ejercicio'); return; }
  if (!muscleId) { showToast('Seleccioná un grupo muscular'); return; }

  const muscle = ALL_MUSCLES.find(m => m.id === muscleId);
  const newEx = {
    id: 'custom_' + genId(),
    name,
    emoji,
    muscleId,
    muscles: [muscle?.label || muscleId],
    desc: 'Ejercicio personalizado.',
    custom: true,
  };

  const customs = S.customEx;
  customs.push(newEx);
  S.customEx = customs;

  document.getElementById('modal-manual-exercise').style.display = 'none';

  // Refresh exercise list and open configure
  ctx.exercise = newEx;
  ctx.currentMuscleExercises = [...(EXERCISES_DB[muscleId] || []), ...S.customEx.filter(e => e.muscleId === muscleId)];
  renderExerciseCards(ctx.currentMuscleExercises);

  showToast(`Ejercicio "${name}" creado ✅`);
  openConfigureExercise(null, newEx.id);
}

// =============================================
//  ROUTINE DETAIL
// =============================================

function openRoutineDetail(id) {
  const r = S.routines.find(x => x.id === id);
  if (!r) return;
  ctx.detailRoutineId = id;
  ctx.openAccordionDay = null;  // reset open state for new routine
  document.getElementById('routine-detail-title').textContent = r.name;
  renderRoutineDetailView();
  showScreen('screen-routine-detail');
}

// Shared helper to build a single exercise card (used by both detail renders)
function buildDetailExCard(ex, ei, day, exercises) {
  const isFirst = ei === 0, isLast = ei === exercises.length - 1;
  const primaryMuscle = (ex.muscles || [])[0] || '';
  const seriesRows = (ex.series || []).map((s, si) =>
    `<tr>
      <td class="ds-num">${si + 1}</td>
      <td class="ds-val">${s.reps || '—'}</td>
      <td class="ds-val">${s.weight ? `${s.weight} ${s.unit || 'kg'}` : '—'}</td>
    </tr>`
  ).join('');

  return `
    <div class="detail-exercise-card">
      <div class="detail-ex-top">
        <div class="detail-ex-emoji">${ex.emoji || '🏋️'}</div>
        <div class="detail-ex-info">
          <div class="detail-ex-name">${ex.name}</div>
          ${primaryMuscle ? `<span class="detail-ex-muscle-badge">${primaryMuscle.toUpperCase()}</span>` : ''}
          <div class="detail-ex-muscles-sub">Músculos: ${(ex.muscles || []).join(', ')}</div>
        </div>
        <div class="detail-ex-actions">
          <div class="reorder-btns">
            <button class="reorder-btn${isFirst ? ' disabled' : ''}" onclick="moveExercise('${day}',${ei},'up')" ${isFirst ? 'disabled' : ''}>▲</button>
            <button class="reorder-btn${isLast ? ' disabled' : ''}" onclick="moveExercise('${day}',${ei},'down')" ${isLast ? 'disabled' : ''}>▼</button>
          </div>
          <button class="det-ex-btn det-ex-btn-edit" onclick="editExerciseFromDetail('${day}',${ei})">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="det-ex-btn det-ex-btn-del" onclick="confirmRemoveExFromDetail('${day}',${ei})">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
          </button>
        </div>
      </div>
      ${ex.series?.length ? `
      <table class="detail-series-table">
        <thead><tr><th>SERIE</th><th>REPS</th><th>CARGA</th></tr></thead>
        <tbody>${seriesRows}</tbody>
      </table>` : '<p class="detail-no-series">Sin series cargadas.</p>'}
      ${ex.note ? `<p class="detail-ex-note"><span>NOTA:</span> ${ex.note}</p>` : ''}
    </div>`;
}

// Shared helper to build the full accordion HTML
function buildAccordionHTML(days, r, openDay = null) {
  let html = '';
  days.forEach(day => {
    const exercises = r.days[day]?.exercises || [];
    const isOpen = openDay !== null ? day === openDay : false;
    const exCount = exercises.length;
    const exCards = exercises.map((ex, ei) => buildDetailExCard(ex, ei, day, exercises)).join('');

    html += `
      <div class="accordion-item${isOpen ? ' open' : ''}">
        <button class="accordion-header" onclick="toggleAccordion(this)">
          <div class="accordion-header-left">
            <span class="accordion-pill">${day.toUpperCase()}</span>
            <div class="accordion-divider"></div>
          </div>
          <div class="accordion-header-right">
            <span class="accordion-count">${exCount} ejercicio${exCount !== 1 ? 's' : ''}</span>
            <span class="accordion-chevron">${isOpen ? '▾' : '▾'}</span>
          </div>
        </button>
        <div class="accordion-body" style="display:${isOpen ? 'block' : 'none'}">
          ${exercises.length ? exCards : '<p style="color:var(--text-muted);font-size:13px;padding:4px 0 8px;">Sin ejercicios.</p>'}
          <div class="accordion-footer-actions">
            <button class="accordion-add-btn" onclick="addExerciseToDetailDay('${day}')">
              ＋ AGREGAR EJERCICIO A ${day.toUpperCase()}
            </button>
            <button class="accordion-del-day-btn" onclick="confirmRemoveDayFromDetail('${day}')">
              🗑 BORRAR DÍA ${day.toUpperCase()}
            </button>
          </div>
        </div>
      </div>`;
  });
  return `<div class="accordion-list">${html}</div>`;
}

function renderRoutineDetailView() {
  const r = S.routines.find(x => x.id === ctx.detailRoutineId);
  if (!r) return;
  const content = document.getElementById('routine-detail-content');
  const days = Object.keys(r.days || {}).sort((a,b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
  if (!days.length) {
    content.innerHTML = '<p style="padding:20px 16px;color:var(--text-muted);">Sin días configurados.</p>';
    return;
  }
  // Restore previously open accordion (null = all closed)
  const openDay = ctx.openAccordionDay && days.includes(ctx.openAccordionDay)
    ? ctx.openAccordionDay : null;
  const nameHtml = `<div class="detail-routine-name">${r.name}</div>`;
  content.innerHTML = nameHtml + buildAccordionHTML(days, r, openDay);
}

function toggleAccordion(btn) {
  const item = btn.closest('.accordion-item');
  const body = item.querySelector('.accordion-body');
  const chevron = btn.querySelector('.accordion-chevron');
  const isOpen = item.classList.contains('open');

  // Close all other open items first (one-at-a-time)
  document.querySelectorAll('.accordion-item.open').forEach(other => {
    if (other !== item) {
      other.classList.remove('open');
      other.querySelector('.accordion-body').style.display = 'none';
      const ch = other.querySelector('.accordion-chevron');
      if (ch) ch.style.transform = '';
    }
  });

  item.classList.toggle('open', !isOpen);
  body.style.display = isOpen ? 'none' : 'block';
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';

  // Persist which day is open so re-entering the view restores it
  const pill = item.querySelector('.accordion-pill');
  if (pill) {
    const dayLabel = pill.textContent.trim();
    // Map label back to actual day key (pill is uppercase)
    const r = S.routines.find(x => x.id === ctx.detailRoutineId);
    if (r) {
      const matchedDay = Object.keys(r.days).find(d => d.toUpperCase() === dayLabel);
      ctx.openAccordionDay = isOpen ? null : (matchedDay || null);
    }
  }
}

// Edit individual exercise from detail view
function editExerciseFromDetail(day, ei) {
  // Load routine into ctx for editing
  const r = S.routines.find(x => x.id === ctx.detailRoutineId);
  if (!r) return;
  ctx.routine = JSON.parse(JSON.stringify(r));
  ctx.day = day;
  ctx.editingExIdx = ei;
  ctx.returnToDetail = true; // flag to return to detail after save

  const ex = ctx.routine.days[day].exercises[ei];
  const exDef = findExercise(ex.exerciseId) || ex;
  ctx.exercise = exDef;
  openConfigureExercise(exDef, ex.series, ex.note);
}

// Add exercise from detail view (goes through full muscle→exercise flow)
function addExerciseToDetailDay(day) {
  const r = S.routines.find(x => x.id === ctx.detailRoutineId);
  if (!r) return;
  ctx.routine = JSON.parse(JSON.stringify(r));
  ctx.day = day;
  ctx.editingExIdx = null;
  ctx.returnToDetail = true;
  if (day === 'CORE') {
    ctx.muscle = 'core';
    showCoreExerciseList();
  } else {
    goToSelectMuscle();
  }
}

// =============================================
//  ROUTINE DETAIL EDIT MODE
// =============================================

function renderRoutineDetailEdit() {
  const r = S.routines.find(x => x.id === ctx.detailRoutineId);
  if (!r) return;

  const content = document.getElementById('routine-detail-content');
  const days = Object.keys(r.days || {}).sort((a,b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));

  if (!days.length) {
    content.innerHTML = '<p style="padding:20px 16px;color:var(--text-muted);">Sin días configurados.</p>';
    return;
  }

  let html = '';
  days.forEach(day => {
    const exercises = r.days[day]?.exercises || [];

    const exCards = exercises.map((ex, ei) => {
      const seriesInputs = (ex.series || []).map((s, si) =>
        `<tr>
          <td>${si+1}</td>
          <td><input class="series-input-inline" type="number" inputmode="decimal" value="${s.reps || ''}" placeholder="0"
            onchange="updateSeriesField('${ctx.detailRoutineId}','${day}',${ei},${si},'reps',this.value)" /></td>
          <td><input class="series-input-inline" type="number" inputmode="decimal" step="0.5" value="${s.weight || ''}" placeholder="0"
            onchange="updateSeriesField('${ctx.detailRoutineId}','${day}',${ei},${si},'weight',this.value)" /></td>
        </tr>`
      ).join('');

      return `
        <div class="detail-exercise-card">
          <div class="detail-exercise-header">
            <div class="detail-exercise-name">${ex.emoji || '🏋️'} ${ex.name}</div>
            <div class="detail-exercise-actions">
              <button class="det-ex-btn det-ex-btn-del" onclick="confirmRemoveExFromDetail('${day}',${ei})">✕</button>
            </div>
          </div>
          ${ex.series?.length ? `
          <table class="detail-series-table">
            <thead><tr><th>#</th><th>Reps</th><th>Peso (kg)</th></tr></thead>
            <tbody>${seriesInputs}</tbody>
          </table>` : '<p style="font-size:12px;color:var(--text-muted);padding:4px 0;">Sin series.</p>'}
        </div>`;
    }).join('');

    html += `
      <div class="detail-day-section">
        <div class="detail-day-header">
          <div class="detail-day-title">${day}</div>
          <button class="detail-day-del-btn" onclick="confirmRemoveDayFromDetail('${day}')">✕ Día</button>
        </div>
        ${exercises.length ? exCards : '<p style="color:var(--text-muted);font-size:13px;padding:4px 0 8px;">Sin ejercicios.</p>'}
      </div>`;
  });

  content.innerHTML = html;

  // Show save button
  const wrap = document.querySelector('.detail-save-btn-wrap') || (() => {
    const el = document.createElement('div');
    el.className = 'detail-save-btn-wrap visible';
    document.getElementById('routine-detail-content').appendChild(el);
    return el;
  })();
  wrap.style.display = 'block';
  wrap.innerHTML = `<button class="btn-primary btn-block" onclick="saveDetailEdits()">💾 Guardar cambios</button>`;
}

function updateSeriesField(routineId, day, exIdx, seriesIdx, field, value) {
  const routines = S.routines;
  const r = routines.find(x => x.id === routineId);
  if (!r) return;
  const series = r.days[day]?.exercises[exIdx]?.series;
  if (!series || !series[seriesIdx]) return;
  series[seriesIdx][field] = value;
  S.routines = routines;

  // Record history
  recordHistory(routineId, day, exIdx, series, r.days[day].exercises[exIdx].exerciseId || r.days[day].exercises[exIdx].name);
}

function recordHistory(routineId, day, exIdx, series, exerciseKey) {
  const history = S.history;
  const key = `${routineId}_${exerciseKey}`;
  if (!history[key]) history[key] = { exerciseName: '', entries: [] };

  const r = S.routines.find(x => x.id === routineId);
  history[key].exerciseName = r?.days[day]?.exercises[exIdx]?.name || exerciseKey;

  const today = dateStrAR();
  const existing = history[key].entries.findIndex(e => e.date === today);
  const entry = {
    date: today,
    series: JSON.parse(JSON.stringify(series)),
    maxWeight: Math.max(...series.map(s => parseFloat(s.weight) || 0)),
    totalReps: series.reduce((a, s) => a + (parseInt(s.reps) || 0), 0),
  };
  if (existing >= 0) history[key].entries[existing] = entry;
  else history[key].entries.push(entry);
  history[key].entries.sort((a,b) => a.date.localeCompare(b.date));

  S.history = history;
}

function saveDetailEdits() {
  const r = S.routines.find(x => x.id === ctx.detailRoutineId);
  if (currentUserId && r) dbSaveRoutine(currentUserId, r).catch(e => console.warn('[DB]:', e));
  showToast('Cambios guardados ✅');
  renderRoutineDetailView();
  document.getElementById('edit-routine-btn').textContent = 'Editar';
  document.querySelector('.detail-save-btn-wrap')?.remove();
  renderHome();
}

function confirmRemoveExFromDetail(day, ei) {
  const r = S.routines.find(x => x.id === ctx.detailRoutineId);
  const exName = r?.days[day]?.exercises[ei]?.name || 'este ejercicio';
  showConfirm({
    icon: '🏋️',
    title: '¿Eliminar ejercicio?',
    msg: `Se eliminará "${exName}" de ${day}.`,
    okLabel: 'Eliminar',
    cb: () => {
      const routines = S.routines;
      const rr = routines.find(x => x.id === ctx.detailRoutineId);
      if (rr?.days[day]) rr.days[day].exercises.splice(ei, 1);
      S.routines = routines;
      closeConfirm();
      renderRoutineDetailView();
      renderHome();
    }
  });
}

function confirmRemoveDayFromDetail(day) {
  const r = S.routines.find(x => x.id === ctx.detailRoutineId);
  const exCount = r?.days[day]?.exercises?.length || 0;
  showConfirm({
    icon: '🗓',
    title: `¿Eliminar ${day}?`,
    msg: `Este día tiene ${exCount} ejercicio${exCount !== 1 ? 's' : ''}. Se perderán.`,
    okLabel: 'Eliminar día',
    cb: () => {
      const routines = S.routines;
      const rr = routines.find(x => x.id === ctx.detailRoutineId);
      if (rr) delete rr.days[day];
      S.routines = routines;
      closeConfirm();
      renderRoutineDetailView();
      renderHome();
    }
  });
}

function confirmDeleteRoutineFromHome(routineId, routineName) {
  showConfirm({
    icon: '🗑',
    title: '¿Eliminar rutina?',
    msg: `Se eliminará "${routineName}" con todos sus días y ejercicios.`,
    okLabel: 'Eliminar',
    cb: () => {
      S.routines = S.routines.filter(x => x.id !== routineId);
      if (currentUserId) dbDeleteRoutine(routineId).catch(e => console.warn('[DB] deleteRoutine:', e));
      closeConfirm();
      renderHome();
      showToast('Rutina eliminada');
    }
  });
}

function deleteRoutine() {
  const r = S.routines.find(x => x.id === ctx.detailRoutineId);
  if (!r) return;
  showConfirm({
    icon: '⚠️',
    title: '¿Eliminar rutina?',
    msg: `Se eliminará "${r.name}" con todos sus días y ejercicios.`,
    okLabel: 'Eliminar rutina',
    cb: () => {
      const routineId = ctx.detailRoutineId;
      S.routines = S.routines.filter(x => x.id !== routineId);
      if (currentUserId) dbDeleteRoutine(routineId).catch(e => console.warn('[DB] deleteRoutine:', e));
      closeConfirm();
      renderHome();
      showToast('Rutina eliminada');
      showScreen('screen-home');
    }
  });
}

// =============================================
//  PROGRESS / CHARTS
// =============================================

function openProgress() {
  const history = S.history;
  const keys = Object.keys(history);
  const content = document.getElementById('progress-content');

  if (!keys.length) {
    content.innerHTML = `
      <div class="empty-state" style="margin-top:40px;">
        <div class="empty-icon">📊</div>
        <p>Aún no hay historial de entrenamiento.<br/>Editá tus rutinas para registrar progreso.</p>
      </div>`;
    showScreen('screen-progress');
    return;
  }

  // Exercise selector tabs
  const tabs = keys.map(k => `
    <button class="progress-ex-tab${ctx.progressExId === k ? ' active' : ''}" onclick="selectProgressEx('${k}')">${history[k].exerciseName}</button>
  `).join('');

  content.innerHTML = `
    <div class="progress-ex-selector">
      <div class="form-label">Ejercicio</div>
      <div class="progress-exercise-tabs" id="progress-ex-tabs">${tabs}</div>
    </div>
    <div id="progress-chart-area"></div>`;

  if (!ctx.progressExId || !history[ctx.progressExId]) ctx.progressExId = keys[0];
  renderProgressChart(ctx.progressExId);
  showScreen('screen-progress');
}

function selectProgressEx(key) {
  ctx.progressExId = key;
  document.querySelectorAll('.progress-ex-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('onclick').includes(key));
  });
  renderProgressChart(key);
}

function renderProgressChart(key) {
  const history = S.history;
  const data    = history[key];
  const area    = document.getElementById('progress-chart-area');
  if (!data || !data.entries.length) {
    area.innerHTML = '<div class="chart-no-data">Sin datos para este ejercicio.</div>';
    return;
  }
  const entries = data.entries;
  const maxW    = entries.map(e => e.maxWeight);
  const totalR  = entries.map(e => e.totalReps);
  const labels  = entries.map(e => friendlyDate(e.date));
  const prWeight     = Math.max(...maxW);
  const prReps       = Math.max(...totalR);
  const lastEntry    = entries[entries.length - 1];
  const prevEntry    = entries[entries.length - 2];
  const weightTrend  = prevEntry ? lastEntry.maxWeight - prevEntry.maxWeight : 0;

  area.innerHTML = `
    <div class="chart-pr-row">
      <div class="chart-pr-card">
        <span class="chart-pr-label">Peso máx.</span>
        <span class="chart-pr-value">${prWeight}<span class="chart-pr-unit">kg</span></span>
        ${weightTrend !== 0 ? `<span class="chart-pr-trend ${weightTrend > 0 ? 'up' : 'down'}">${weightTrend > 0 ? '↑' : '↓'} ${Math.abs(weightTrend).toFixed(1)}kg</span>` : ''}
      </div>
      <div class="chart-pr-card">
        <span class="chart-pr-label">Reps máx.</span>
        <span class="chart-pr-value">${prReps}<span class="chart-pr-unit">reps</span></span>
      </div>
      <div class="chart-pr-card">
        <span class="chart-pr-label">Sesiones</span>
        <span class="chart-pr-value">${entries.length}</span>
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-title">📈 Peso máximo por sesión</div>
      <div class="chart-wrap">${buildAreaChart(labels, maxW, '#6C63FF', 'kg')}</div>
    </div>
    <div class="chart-card">
      <div class="chart-title">🔢 Reps totales por sesión</div>
      <div class="chart-wrap">${buildBarChart(labels, totalR, '#4DFFA0')}</div>
    </div>
    <div class="chart-card">
      <div class="chart-title">📋 Historial de sesiones</div>
      <div class="progress-history-list">
        ${entries.slice().reverse().map((e, i, arr) => {
          const prev = arr[i + 1];
          const delta = prev ? e.maxWeight - prev.maxWeight : null;
          const cls = delta === null ? '' : delta > 0 ? 'delta-up' : delta < 0 ? 'delta-down' : 'delta-same';
          const str = delta === null ? '—' : delta > 0 ? `+${delta.toFixed(1)}kg` : delta < 0 ? `${delta.toFixed(1)}kg` : '=';
          return `
            <div class="progress-history-item">
              <span class="progress-history-date">${friendlyDate(e.date)}</span>
              <div class="progress-history-vals">
                <span class="progress-history-val">${e.maxWeight}kg</span>
                <span class="progress-history-reps">${e.totalReps} reps</span>
              </div>
              <span class="progress-history-delta ${cls}">${str}</span>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

function buildAreaChart(labels, values, color, unit = '') {
  const W=320, H=140, padL=38, padR=10, padT=16, padB=32;
  const n = values.length;
  if (n < 2) return `<div class="chart-single-point">
    <span class="chart-single-val" style="color:${color}">${values[0]}${unit}</span>
    <span class="chart-single-label">${labels[0]}</span>
    <p class="chart-need-more">Necesitás al menos 2 sesiones para ver el gráfico</p></div>`;
  const minV = Math.min(...values), maxV = Math.max(...values);
  const pad  = (maxV - minV) * 0.15 || 1;
  const lo = minV - pad, hi = maxV + pad, rangeV = hi - lo;
  const iW = W-padL-padR, iH = H-padT-padB;
  const toX = i => padL + (i/(n-1))*iW;
  const toY = v => padT + iH - ((v-lo)/rangeV)*iH;
  const linePts  = values.map((v,i) => `${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ');
  const areaPath = `M${toX(0).toFixed(1)},${toY(values[0]).toFixed(1)} ` +
    values.map((v,i)=>`L${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ') +
    ` L${toX(n-1).toFixed(1)},${(padT+iH).toFixed(1)} L${toX(0).toFixed(1)},${(padT+iH).toFixed(1)} Z`;
  const gridVals = [lo+rangeV*0.25, lo+rangeV*0.5, lo+rangeV*0.75];
  const gridLines = gridVals.map(v => {
    const y = toY(v).toFixed(1);
    const lbl = v%1===0 ? Math.round(v) : v.toFixed(1);
    return `<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" stroke="rgba(108,99,255,0.12)" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="${padL-4}" y="${parseFloat(y)+4}" text-anchor="end" font-size="8.5" fill="var(--text-muted)" font-family="Sora,sans-serif">${lbl}</text>`;
  }).join('');
  const step   = Math.max(1, Math.floor((n-1)/3));
  const xIdxs  = [...new Set([0,...Array.from({length:3},(_,i)=>Math.min(n-1,(i+1)*step)),n-1])];
  const xLabels = xIdxs.map(i =>
    `<text x="${toX(i).toFixed(1)}" y="${H-6}" text-anchor="middle" font-size="8.5" fill="var(--text-muted)" font-family="Sora,sans-serif">${labels[i]}</text>`
  ).join('');
  const dots = values.map((v,i) => {
    const x=toX(i).toFixed(1), y=toY(v).toFixed(1), isMax=v===maxV;
    return `<circle cx="${x}" cy="${y}" r="${isMax?5:3.5}" fill="${color}" opacity="${isMax?1:0.8}"/>
      ${isMax?`<circle cx="${x}" cy="${y}" r="9" fill="${color}" opacity="0.15"/>
        <text x="${x}" y="${parseFloat(y)-12}" text-anchor="middle" font-size="9" font-weight="700" fill="${color}" font-family="Sora,sans-serif">MÁX ${v}${unit}</text>`:''}`;
  }).join('');
  const gid = `ag${color.replace('#','')}`;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
      <stop offset="90%" stop-color="${color}" stop-opacity="0.02"/>
    </linearGradient></defs>
    <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT+iH}" stroke="rgba(108,99,255,0.15)" stroke-width="1"/>
    <line x1="${padL}" y1="${padT+iH}" x2="${W-padR}" y2="${padT+iH}" stroke="rgba(108,99,255,0.15)" stroke-width="1"/>
    ${gridLines}
    <path d="${areaPath}" fill="url(#${gid})"/>
    <polyline points="${linePts}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}${xLabels}
  </svg>`;
}

function buildBarChart(labels, values, color) {
  const W=320, H=120, padL=38, padR=10, padT=12, padB=28;
  const n = values.length;
  if (!n) return '<div class="chart-no-data">Sin datos</div>';
  const maxV = Math.max(...values) || 1;
  const iW=W-padL-padR, iH=H-padT-padB;
  const barW = Math.max(4, Math.min(24, (iW/n)*0.6));
  const gap  = iW/n;
  const bars = values.map((v,i) => {
    const x=padL+i*gap+(gap-barW)/2, bH=(v/maxV)*iH, y=padT+iH-bH, isMax=v===maxV;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${bH.toFixed(1)}" rx="4" fill="${color}" opacity="${isMax?1:0.5}"/>
      ${isMax?`<text x="${(x+barW/2).toFixed(1)}" y="${(y-5).toFixed(1)}" text-anchor="middle" font-size="8.5" font-weight="700" fill="${color}" font-family="Sora,sans-serif">${v}</text>`:''}`;
  }).join('');
  const step  = Math.max(1,Math.floor((n-1)/3));
  const xIdxs = [...new Set([0,...Array.from({length:3},(_,i)=>Math.min(n-1,(i+1)*step)),n-1])];
  const xLbls = xIdxs.map(i=>`<text x="${(padL+i*gap+gap/2).toFixed(1)}" y="${H-6}" text-anchor="middle" font-size="8.5" fill="var(--text-muted)" font-family="Sora,sans-serif">${labels[i]}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT+iH}" stroke="rgba(108,99,255,0.15)" stroke-width="1"/>
    <line x1="${padL}" y1="${padT+iH}" x2="${W-padR}" y2="${padT+iH}" stroke="rgba(108,99,255,0.15)" stroke-width="1"/>
    ${bars}${xLbls}
  </svg>`;
}

// =============================================
//  STOPWATCH (Part 3)
// =============================================

function swFormat(ms) {
  const tot = Math.floor(ms/1000);
  const h = Math.floor(tot/3600), m = Math.floor((tot%3600)/60), s = tot%60;
  const cs = Math.floor((ms%1000)/10);
  return { main: `${h>0?String(h).padStart(2,'0')+':':''}${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`, cs: String(cs).padStart(2,'0') };
}

function swUpdateDisplay() {
  const { main, cs } = swFormat(ctx.swMs);
  const disp = document.getElementById('stopwatch-display');
  if (disp) { disp.childNodes[0].textContent = main; }
  const msEl = document.getElementById('stopwatch-ms');
  if (msEl) msEl.textContent = `.${cs}`;
  const topbar = document.getElementById('stopwatch-topbar-time');
  if (topbar) { topbar.textContent = main; topbar.style.display = ctx.swMs > 0 ? 'inline' : 'none'; }
}

function openStopwatch() {
  swUpdateDisplay();
  renderSwLaps();
  const startBtn = document.getElementById('stopwatch-start-btn');
  if (!startBtn) return;
  startBtn.textContent = ctx.swRunning ? 'Pausar' : ctx.swMs > 0 ? 'Reanudar' : 'Iniciar';
  startBtn.className = ctx.swRunning ? 'btn-danger stopwatch-start-btn' : 'btn-primary stopwatch-start-btn';
  document.getElementById('stopwatch-label').textContent = ctx.swRunning ? 'Sesión en curso...' : ctx.swMs > 0 ? 'Pausado' : 'Listo para empezar';
  document.getElementById('stopwatch-lap-btn').style.display = ctx.swRunning ? 'block' : 'none';
  document.getElementById('modal-stopwatch').style.display = 'flex';
}

function closeStopwatch() {
  document.getElementById('modal-stopwatch').style.display = 'none';
}

function swToggle() {
  if (ctx.swRunning) {
    clearInterval(ctx.swInterval); ctx.swRunning = false;
    document.getElementById('stopwatch-start-btn').textContent = 'Reanudar';
    document.getElementById('stopwatch-start-btn').className = 'btn-primary stopwatch-start-btn';
    document.getElementById('stopwatch-label').textContent = 'Pausado';
    document.getElementById('stopwatch-lap-btn').style.display = 'none';
  } else {
    ctx.swRunning = true;
    const t0 = Date.now() - ctx.swMs;
    ctx.swInterval = setInterval(() => { ctx.swMs = Date.now()-t0; swUpdateDisplay(); }, 33);
    document.getElementById('stopwatch-start-btn').textContent = 'Pausar';
    document.getElementById('stopwatch-start-btn').className = 'btn-danger stopwatch-start-btn';
    document.getElementById('stopwatch-label').textContent = 'Sesión en curso...';
    document.getElementById('stopwatch-lap-btn').style.display = 'block';
  }
}

function swReset() {
  clearInterval(ctx.swInterval); ctx.swRunning = false; ctx.swMs = 0; ctx.swLaps = [];
  swUpdateDisplay(); renderSwLaps();
  document.getElementById('stopwatch-start-btn').textContent = 'Iniciar';
  document.getElementById('stopwatch-start-btn').className = 'btn-primary stopwatch-start-btn';
  document.getElementById('stopwatch-label').textContent = 'Listo para empezar';
  document.getElementById('stopwatch-lap-btn').style.display = 'none';
}

function swLap() {
  if (!ctx.swRunning) return;
  const prev = ctx.swLaps.length > 0 ? ctx.swLaps[ctx.swLaps.length-1].cumMs : 0;
  ctx.swLaps.push({ cumMs: ctx.swMs, splitMs: ctx.swMs - prev });
  renderSwLaps();
}

function renderSwLaps() {
  const c = document.getElementById('stopwatch-laps');
  if (!c) return;
  if (!ctx.swLaps.length) { c.innerHTML = ''; return; }
  c.innerHTML = ctx.swLaps.slice().reverse().map((lap, i) => {
    const num = ctx.swLaps.length - i;
    const { main: cumMain } = swFormat(lap.cumMs);
    const { main: splMain, cs: splCs } = swFormat(lap.splitMs);
    return `<div class="sw-lap-row">
      <span class="sw-lap-num">Vuelta ${num}</span>
      <span class="sw-lap-split">+${splMain}.${splCs}</span>
      <span class="sw-lap-cum">${cumMain}</span>
    </div>`;
  }).join('');
}

// =============================================
//  REORDER EXERCISES (Part 3)
// =============================================

function moveExercise(day, idx, direction) {
  const routines = S.routines;
  const r = routines.find(x => x.id === ctx.detailRoutineId);
  if (!r) return;
  const exs = r.days[day]?.exercises;
  if (!exs) return;
  const ti = direction === 'up' ? idx-1 : idx+1;
  if (ti < 0 || ti >= exs.length) return;
  [exs[idx], exs[ti]] = [exs[ti], exs[idx]];
  S.routines = routines;
  renderRoutineDetailViewKeepOpen(day);
}

function renderRoutineDetailViewKeepOpen(openDay) {
  const r = S.routines.find(x => x.id === ctx.detailRoutineId);
  if (!r) return;
  const content = document.getElementById('routine-detail-content');
  const days = Object.keys(r.days || {}).sort((a,b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
  if (!days.length) { renderRoutineDetailView(); return; }
  const nameHtml = `<div class="detail-routine-name">${r.name}</div>`;
  content.innerHTML = nameHtml + buildAccordionHTML(days, r, openDay);
}

// =============================================
//  TIMER
// =============================================

function openTimerModal() {
  clearInterval(ctx.timerInterval);
  ctx.timerRunning = false;
  ctx.timerSeconds = 60;
  updateTimerDisplay();
  document.getElementById('start-timer-btn').textContent = 'Iniciar';
  document.getElementById('timer-display').className = 'timer-display';
  document.getElementById('modal-rest-timer').style.display = 'flex';
}

function updateTimerDisplay() {
  const m = Math.floor(ctx.timerSeconds / 60).toString().padStart(2, '0');
  const s = (ctx.timerSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timer-display').textContent = `${m}:${s}`;
}

function startTimer() {
  if (ctx.timerRunning) {
    clearInterval(ctx.timerInterval);
    ctx.timerRunning = false;
    document.getElementById('start-timer-btn').textContent = 'Reanudar';
    document.getElementById('timer-display').className = 'timer-display';
    return;
  }
  ctx.timerRunning = true;
  document.getElementById('start-timer-btn').textContent = 'Pausar';
  document.getElementById('timer-display').className = 'timer-display running';
  ctx.timerInterval = setInterval(() => {
    if (ctx.timerSeconds <= 0) {
      clearInterval(ctx.timerInterval);
      ctx.timerRunning = false;
      document.getElementById('timer-display').className = 'timer-display finished';
      document.getElementById('timer-display').textContent = '00:00';
      document.getElementById('start-timer-btn').textContent = '¡Listo!';
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      return;
    }
    ctx.timerSeconds--;
    updateTimerDisplay();
  }, 1000);
}

// =============================================
//  EVENT LISTENERS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- AI ROUTINE ----
  document.getElementById('btn-ai-routine')?.addEventListener('click', openAIModal);
  // Level selector buttons
  document.getElementById('ai-level-group')?.addEventListener('click', e => {
    const btn = e.target.closest('.ai-level-btn');
    if (!btn) return;
    document.querySelectorAll('.ai-level-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('ai-level').value = btn.dataset.value;
  });
  // Days selector buttons
  document.getElementById('ai-days-group')?.addEventListener('click', e => {
    const btn = e.target.closest('.ai-days-btn');
    if (!btn) return;
    document.querySelectorAll('.ai-days-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('ai-days').value = btn.dataset.value;
  });
  // Close AI modal on overlay click
  document.getElementById('modal-ai-routine')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal-ai-routine')) closeAIModal();
  });

  initApp();

  // ---- WELCOME ----
  document.getElementById('btn-register').addEventListener('click', () => {
    document.querySelectorAll('.sex-btn').forEach(b => b.classList.remove('selected'));
    clearFormErrors();
    // Pre-fill fields if editing existing profile
    const existing = S.profile;
    document.getElementById('reg-name').value = existing?.name || '';
    document.getElementById('reg-age').value = existing?.age || '';
    document.getElementById('reg-weight').value = existing?.weight || '';
    document.getElementById('reg-height').value = existing?.height || '';
    if (existing?.sex) {
      document.querySelectorAll('.sex-btn').forEach(b =>
        b.classList.toggle('selected', b.dataset.sex === existing.sex));
    }
    showScreen('screen-register');
  });

  document.getElementById('btn-login-guest')?.addEventListener('click', () => {
    if (S.profile) { renderHome(); showScreen('screen-home'); }
    else showToast('No hay perfil guardado. Registrate primero.');
  });

  document.getElementById('back-welcome-from-register').addEventListener('click', () => {
    if (S.profile) showScreen('screen-profile', true);
    else showScreen('screen-welcome', true);
  });

  // ---- SEX SELECTOR ----
  document.getElementById('sex-selector').addEventListener('click', e => {
    const btn = e.target.closest('.sex-btn');
    if (btn) {
      document.querySelectorAll('.sex-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    }
  });

  // ---- REGISTER ----
  document.getElementById('btn-save-profile').addEventListener('click', saveProfile);

  // ---- HOME ----
  document.getElementById('btn-new-routine').addEventListener('click', startNewRoutine);
  document.getElementById('btn-toggle-theme').addEventListener('click', toggleTheme);

  document.getElementById('btn-open-profile').addEventListener('click', () => {
    renderProfileScreen();
    showScreen('screen-profile');
  });

  // ---- PROFILE ----
  document.getElementById('back-home-from-profile').addEventListener('click', () => showScreen('screen-home', true));
  document.getElementById('btn-edit-profile').addEventListener('click', openEditProfile);

  // ---- CREATE ROUTINE ----
  document.getElementById('back-to-home-cr').addEventListener('click', () => showScreen('screen-home', true));
  document.getElementById('save-routine-btn').addEventListener('click', saveRoutineFn);
  document.getElementById('days-selector').addEventListener('click', e => {
    const btn = e.target.closest('.day-btn');
    if (btn) toggleDayBtn(btn);
  });

  // ---- SELECT MUSCLE ----
  document.getElementById('back-to-routine').addEventListener('click', () => {
    if (ctx.returnToDetail) { ctx.returnToDetail = false; showScreen('screen-routine-detail', true); }
    else showScreen('screen-create-routine', true);
  });
  document.getElementById('rotate-body-btn').addEventListener('click', rotateBody);
  document.getElementById('muscle-search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const all = ctx.bodyFront ? MUSCLES_FRONT : MUSCLES_BACK;
    const filtered = q ? all.filter(m => m.label.toLowerCase().includes(q)) : all;
    const chips = document.getElementById('muscle-chips');
    chips.innerHTML = filtered.map(m =>
      `<button class="muscle-chip${ctx.muscle === m.id ? ' active' : ''}" onclick="selectMuscleHotspot('${m.id}')">${m.label}</button>`
    ).join('');
  });

  // ---- EXERCISE LIST ----
  document.getElementById('exercise-search').addEventListener('input', e => filterExercises(e.target.value));
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      ctx.filterMode = tab.dataset.filter;
      const base = ctx.filterMode === 'muscle' ? ctx.currentMuscleExercises
        : ctx.filterMode === 'favs' ? getAllExercises().filter(e => S.favs.includes(e.id))
        : ctx.allExercises;
      renderExerciseCards(base);
    });
  });
  document.getElementById('btn-add-manual-exercise').addEventListener('click', openManualExerciseModal);

  // ---- CONFIGURE EXERCISE ----
  document.getElementById('back-to-exercises').addEventListener('click', () => {
    showScreen('screen-exercise-list', true);
  });
  // Back from exercise list
  document.getElementById('back-to-muscle').addEventListener('click', () => {
    if (ctx.returnToDetail) {
      ctx.returnToDetail = false;
      showScreen('screen-routine-detail', true);
    } else if (ctx.day === 'CORE') {
      showScreen('screen-create-routine', true);
    } else {
      showScreen('screen-select-muscle', true);
    }
  });
  document.getElementById('save-exercise-btn').addEventListener('click', saveExerciseFn);
  document.getElementById('add-series-btn').addEventListener('click', addSeriesRow);
  document.getElementById('info-btn').addEventListener('click', showExerciseInfo);
  document.getElementById('add-note-btn').addEventListener('click', () => {
    const a = document.getElementById('note-area');
    a.style.display = a.style.display === 'none' ? 'block' : 'none';
  });
  document.getElementById('rest-timer-btn')?.addEventListener('click', openTimerModal);

  // Unit selector (cfg-unit-btn)
  document.getElementById('unit-btn-group').addEventListener('click', e => {
    const btn = e.target.closest('.cfg-unit-btn') || e.target.closest('.unit-btn');
    if (!btn) return;
    const unit = btn.dataset.unit;
    setUnitUI(unit);
    document.querySelectorAll('.series-row').forEach(row => {
      row.querySelectorAll('.series-field-unit.weight-unit').forEach(el => el.textContent = unit);
    });
  });

  // Instructions inline close (panel kept hidden, but keep listener safe)
  document.getElementById('close-instructions-btn')?.addEventListener('click', () => {
    document.getElementById('instructions-panel').style.display = 'none';
  });

  document.getElementById('back-from-progress').addEventListener('click', () => showScreen('screen-home', true));
  // ---- ROUTINE DETAIL ----
  document.getElementById('back-to-home-from-detail').addEventListener('click', () => showScreen('screen-home', true));
  document.getElementById('edit-routine-btn').addEventListener('click', () => startEditRoutine(ctx.detailRoutineId));
  document.getElementById('delete-routine-btn').addEventListener('click', deleteRoutine);
  document.getElementById('btn-open-rest')?.addEventListener('click', openTimerModal);

  // ---- STOPWATCH ----
  document.getElementById('btn-open-stopwatch')?.addEventListener('click', openStopwatch);
  document.getElementById('close-stopwatch-modal')?.addEventListener('click', closeStopwatch);
  document.getElementById('modal-stopwatch')?.addEventListener('click', e => { if (e.target === document.getElementById('modal-stopwatch')) closeStopwatch(); });
  document.getElementById('stopwatch-start-btn')?.addEventListener('click', swToggle);
  document.getElementById('stopwatch-reset-btn')?.addEventListener('click', swReset);
  document.getElementById('stopwatch-lap-btn')?.addEventListener('click', swLap);

  // ---- MODALS ----
  document.getElementById('close-info-modal').addEventListener('click', () => {
    document.getElementById('modal-exercise-info').style.display = 'none';
  });
  document.getElementById('modal-exercise-info').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-exercise-info'))
      document.getElementById('modal-exercise-info').style.display = 'none';
  });

  document.getElementById('close-manual-modal').addEventListener('click', () => {
    document.getElementById('modal-manual-exercise').style.display = 'none';
  });
  document.getElementById('btn-save-manual-exercise').addEventListener('click', saveManualExercise);

  document.getElementById('confirm-cancel-btn').addEventListener('click', closeConfirm);
  document.getElementById('confirm-ok-btn').addEventListener('click', () => {
    if (ctx.confirmCb) ctx.confirmCb();
  });
  document.getElementById('modal-confirm').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-confirm')) closeConfirm();
  });

  document.getElementById('close-timer-modal').addEventListener('click', () => {
    clearInterval(ctx.timerInterval);
    ctx.timerRunning = false;
    document.getElementById('modal-rest-timer').style.display = 'none';
  });
  document.getElementById('modal-rest-timer').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-rest-timer')) {
      clearInterval(ctx.timerInterval);
      ctx.timerRunning = false;
      document.getElementById('modal-rest-timer').style.display = 'none';
    }
  });
  document.getElementById('start-timer-btn').addEventListener('click', startTimer);
  document.querySelectorAll('.timer-ctrl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      ctx.timerSeconds = Math.max(5, Math.min(600, ctx.timerSeconds + parseInt(btn.dataset.delta)));
      updateTimerDisplay();
    });
  });

  // ---- PROGRESS (from home stats) — add button manually ----
  // Exposed as global for inline onclick
});

// Expose globals
window.openProgress = openProgress;
window.selectProgressEx = selectProgressEx;
window.updateSeriesField = updateSeriesField;
window.confirmRemoveExFromDetail = confirmRemoveExFromDetail;
window.confirmRemoveDayFromDetail = confirmRemoveDayFromDetail;
window.editExerciseInDay = editExerciseInDay;
window.removeExerciseFromDay = removeExerciseFromDay;
window.goToSelectMuscle = goToSelectMuscle;
window.openConfigureExercise = openConfigureExercise;
window.selectMuscleHotspot = selectMuscleHotspot;
window.selectDay = selectDay;
window.toggleFav = toggleFav;
window.deleteSeriesRow = deleteSeriesRow;
window.openRoutineDetail = openRoutineDetail;
window.confirmRemoveDay = confirmRemoveDay;
window.renderDayTabs = renderDayTabs;
window.renderDayExercises = renderDayExercises;
window.saveDetailEdits = saveDetailEdits;
window.confirmDeleteProfile = confirmDeleteProfile;
window.toggleAccordion = toggleAccordion;
window.addExerciseToDetailDay = addExerciseToDetailDay;
window.editExerciseFromDetail = editExerciseFromDetail;
window.handleProfileThemeToggle = handleProfileThemeToggle;
// Part 3
window.handleLogout = handleLogout;
window.handleGoogleLogin = handleGoogleLogin;
window.openAIModal = openAIModal;
window.closeAIModal = closeAIModal;
window.onGenerateRoutine = onGenerateRoutine;
window.onSaveAIRoutine = onSaveAIRoutine;
window.moveExercise = moveExercise;
window.toggleProfileEdit = toggleProfileEdit;
window.selectEditSex = selectEditSex;
window.saveInlineEdit = saveInlineEdit;
window.closeEditProfileModal = closeEditProfileModal;
window.selectSpecialGroup = selectSpecialGroup;
window.confirmDeleteRoutineFromHome = confirmDeleteRoutineFromHome;
window.showCoreExerciseList = showCoreExerciseList;
