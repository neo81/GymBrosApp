// =============================================
//  SUPABASE CLIENT — GymBros
// =============================================

const SUPABASE_URL  = 'https://inbfezuypeneqjjusuug.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYmZlenV5cGVuZXFqanVzdXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjM4MzAsImV4cCI6MjA4OTYzOTgzMH0.cxJp0LdJlVqcTErytKRsQI6e0LR20kdOjiT7suL126A';

// We load Supabase from CDN (added in index.html).
// This wrapper provides a single `sb` instance used everywhere.
let sb = null;

function initSupabase() {
  if (window.supabase) {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      }
    });
  } else {
    console.warn('Supabase SDK not loaded — running in local-only mode.');
  }
  return sb;
}

// ---- AUTH HELPERS ----

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

async function getUser() {
  if (!sb) return null;
  const session = await getSession();
  return session?.user || null;
}

// ---- DATABASE HELPERS ----

// Upsert profile row for the current user
async function dbSaveProfile(userId, profile) {
  if (!sb) { console.warn('[DB] Supabase not initialized'); return; }
  const { error } = await sb.from('profiles').upsert({
    user_id: userId,
    data: profile,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  if (error) console.error('[DB] saveProfile error:', error.message, error.code, error.details);
  else console.log('[DB] profile saved ✅');
}

async function dbLoadProfile(userId) {
  if (!sb) return null;
  const { data, error } = await sb.from('profiles').select('data').eq('user_id', userId).single();
  if (error && error.code !== 'PGRST116') console.error('[DB] loadProfile error:', error.message);
  return data?.data || null;
}

async function dbSaveRoutines(userId, routines) {
  if (!sb) return;
  const { error } = await sb.from('routines').upsert({
    user_id: userId,
    data: routines,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  if (error) console.error('[DB] saveRoutines error:', error.message);
  else console.log('[DB] routines saved ✅');
}

async function dbLoadRoutines(userId) {
  if (!sb) return null;
  const { data, error } = await sb.from('routines').select('data').eq('user_id', userId).single();
  if (error && error.code !== 'PGRST116') console.error('[DB] loadRoutines error:', error.message);
  return data?.data || null;
}

async function dbSaveHistory(userId, history) {
  if (!sb) return;
  const { error } = await sb.from('history').upsert({
    user_id: userId,
    data: history,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  if (error) console.error('[DB] saveHistory error:', error.message);
}

async function dbLoadHistory(userId) {
  if (!sb) return null;
  const { data, error } = await sb.from('history').select('data').eq('user_id', userId).single();
  if (error && error.code !== 'PGRST116') console.error('[DB] loadHistory error:', error.message);
  return data?.data || null;
}

async function dbSaveFavs(userId, favs) {
  if (!sb) return;
  const { error } = await sb.from('favs').upsert({
    user_id: userId,
    data: favs,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  if (error) console.error('[DB] saveFavs error:', error.message);
}

async function dbLoadFavs(userId) {
  if (!sb) return null;
  const { data, error } = await sb.from('favs').select('data').eq('user_id', userId).single();
  if (error && error.code !== 'PGRST116') console.error('[DB] loadFavs error:', error.message);
  return data?.data || null;
}

// Load ALL user data in one batch (called on login/app start)
async function dbLoadAllUserData(userId) {
  if (!sb) return null;
  const [p, r, h, f] = await Promise.all([
    dbLoadProfile(userId),
    dbLoadRoutines(userId),
    dbLoadHistory(userId),
    dbLoadFavs(userId),
  ]);
  return { profile: p, routines: r, history: h, favs: f };
}
