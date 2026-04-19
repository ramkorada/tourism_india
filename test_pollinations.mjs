// test_pollinations.mjs
// Using built-in fetch (available in modern Node.js)

async function test() {
  const system = "You are a travel guide";
  const prompt = "Hi";
  const urls = [
    `https://text.pollinations.ai/${encodeURIComponent(prompt)}?system=${encodeURIComponent(system)}`,
    `https://text.pollinations.ai/${encodeURIComponent(prompt)}?system=${encodeURIComponent(system)}&model=search`,
    `https://text.pollinations.ai/${encodeURIComponent(prompt)}?system=${encodeURIComponent(system)}&model=openai`,
    `https://text.pollinations.ai/openai`, // POST test
    `https://gen.pollinations.ai/v1/chat/completions` // New API test
  ];

  for (const url of urls) {
    console.log(`\nTesting: ${url}`);
    try {
      const isPost = url.includes('v1/chat/completions') || url.endsWith('openai');
      const resp = await fetch(url, {
        method: isPost ? 'POST' : 'GET',
        headers: isPost ? { 'Content-Type': 'application/json' } : {},
        body: isPost ? JSON.stringify({ 
          messages: [{ role: 'system', content: system }, { role: 'user', content: prompt }],
          model: 'openai'
        }) : undefined
      });
      
      const text = await resp.text();
      console.log(`Status: ${resp.status}`);
      console.log(`Length: ${text.length}`);
      const snippet = text.substring(0, 150).replace(/\n/g, ' ');
      console.log(`Snippet: ${snippet}...`);
      
      if (text.includes("IMPORTANT NOTICE")) {
        console.log("❌ FAILS (Shows notice)");
      } else if (resp.status === 200 && text.length > 0) {
        console.log("✅ WORKS");
      } else {
        console.log("⚠️ WEIRD RESPONSE");
      }
    } catch (e) {
      console.log(`❌ ERROR: ${e.message}`);
    }
    console.log('---');
  }
}

test();
