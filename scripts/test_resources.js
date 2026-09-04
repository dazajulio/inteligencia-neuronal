const { createClient } = require('@supabase/supabase-js');
const url = 'https://jkwqjpaexjtvvmrinwwj.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprd3FqcGFleGp0dnZtcmlud3dqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzE5MjU4MCwiZXhwIjoyMTAyNzY4NTgwfQ.USHaKVWH3NbhTbU-H8GRGBGH_79C4Oh8SG9ooIoNhBI';
const client = createClient(url, key);

async function test() {
  const { data: resources, error } = await client.from('academy_resources').select('*').order('order_index', { ascending: true });
  console.log('Error:', error);
  const formatted = (resources || []).map((r) => {
    const isPremium = r.access_type && (r.access_type.includes('PREMIUM') || r.access_type.includes('$'));
    const priceMatch = r.access_type ? r.access_type.match(/\$([0-9.]+)/) : null;
    const priceUsd = priceMatch ? Number(priceMatch[1]) : (isPremium ? 5 : 0);
    const priceDisplay = isPremium ? (priceMatch ? `$${priceMatch[1]} USD` : '$5 USD') : 'GRATIS';
    return {
      id: r.id,
      title: r.title,
      tag: r.tag,
      format: r.format,
      access_type: r.access_type,
      price_display: priceDisplay,
      price_usd: priceUsd,
      file_url: r.file_url,
    };
  });
  console.log(JSON.stringify(formatted, null, 2));
}
test();
