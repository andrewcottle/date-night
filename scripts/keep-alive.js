// scripts/keep-alive.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function keepAlive() {
  const { data, error } = await supabase
    .from('heartbeat')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', 1);

  if (error) {
    console.error('Error updating heartbeat:', error);
    process.exit(1);
  }
  console.log('Heartbeat updated successfully at:', new Date().toLocaleString());
}

keepAlive();
