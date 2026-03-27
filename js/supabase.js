// =============================================
//  SUPABASE CLIENT — GymBros
// =============================================

const SUPABASE_URL  = 'https://inbfezuypeneqjjusuug.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYmZlenV5cGVuZXFqanVzdXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjM4MzAsImV4cCI6MjA4OTYzOTgzMH0.cxJp0LdJlVqcTErytKRsQI6e0LR20kdOjiT7suL126A';

let sb = null;

function initSupabase() {
  if (window.supabase) {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
    });
  } else {
    console.warn('[DB] Supabase SDK not loaded — running in local-only mode.');
  }
  return sb;
}

// ---- AUTH ----

async function signInWithGoogle() {
  if (!sb) return { error: { message: 'Supabase not initialized' } };
  return sb.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname,
      queryParams: { prompt: 'select_account' },
    }
  });
}

async function signOut() {
  if (!sb) return;
  await sb.auth.signOut();
}

async function getSession() {
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data?.session || null;
}

// ---- PROFILE ----

async function dbSaveProfile(userId, profile) {
  if (!sb) return;
  const { error } = await sb.from('profiles').upsert(
    { user_id: userId, data: profile, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  );
  if (error) console.error('[DB] saveProfile:', error.message);
  else console.log('[DB] profile saved ✅');
}

async function dbLoadProfile(userId) {
  if (!sb) return null;
  const { data, error } = await sb.from('profiles').select('data').eq('user_id', userId).single();
  if (error && error.code !== 'PGRST116') console.error('[DB] loadProfile:', error.message);
  return data?.data || null;
}

// ---- ROUTINES (one row per routine) ----

async function dbSaveRoutine(userId, routine) {
  if (!sb || !routine?.id) return;
  const { error } = await sb.from('routines').upsert({
    id: routine.id, user_id: userId,
    name: routine.name || '', data: routine,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' });
  if (error) console.error('[DB] saveRoutine:', error.message);
}

async function dbDeleteRoutine(routineId) {
  if (!sb || !routineId) return;
  const { error } = await sb.from('routines').delete().eq('id', routineId);
  if (error) console.error('[DB] deleteRoutine:', error.message);
  else console.log('[DB] routine deleted ✅');
}

async function dbSaveRoutines(userId, routines) {
  if (!sb || !routines?.length) return;
  const rows = routines.map(r => ({
    id: r.id, user_id: userId, name: r.name || '',
    data: r, updated_at: new Date().toISOString(),
  }));
  const { error } = await sb.from('routines').upsert(rows, { onConflict: 'id' });
  if (error) console.error('[DB] saveRoutines:', error.message);
  else console.log(`[DB] ${routines.length} routines saved ✅`);
}

async function dbLoadRoutines(userId) {
  if (!sb) return null;
  const { data, error } = await sb.from('routines')
    .select('data').eq('user_id', userId)
    .order('updated_at', { ascending: true });
  if (error) { console.error('[DB] loadRoutines:', error.message); return null; }
  return data?.map(row => row.data) || [];
}

// ---- HISTORY ----

async function dbSaveHistory(userId, history) {
  if (!sb) return;
  const { error } = await sb.from('history').upsert(
    { user_id: userId, data: history, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  );
  if (error) console.error('[DB] saveHistory:', error.message);
}

async function dbLoadHistory(userId) {
  if (!sb) return null;
  const { data, error } = await sb.from('history').select('data').eq('user_id', userId).single();
  if (error && error.code !== 'PGRST116') console.error('[DB] loadHistory:', error.message);
  return data?.data || null;
}

// ---- FAVS ----

async function dbSaveFavs(userId, favs) {
  if (!sb) return;
  const { error } = await sb.from('favs').upsert(
    { user_id: userId, data: favs, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  );
  if (error) console.error('[DB] saveFavs:', error.message);
}

async function dbLoadFavs(userId) {
  if (!sb) return null;
  const { data, error } = await sb.from('favs').select('data').eq('user_id', userId).single();
  if (error && error.code !== 'PGRST116') console.error('[DB] loadFavs:', error.message);
  return data?.data || null;
}

// ---- LOAD ALL (called on login) ----

async function dbLoadAllUserData(userId) {
  if (!sb) return null;
  const [profile, routines, history, favs] = await Promise.all([
    dbLoadProfile(userId),
    dbLoadRoutines(userId),
    dbLoadHistory(userId),
    dbLoadFavs(userId),
  ]);
  return { profile, routines, history, favs };
}
