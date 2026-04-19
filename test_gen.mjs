// test_gen_pollinations.mjs
async function test() {
  const url = "https://gen.pollinations.ai/v1/chat/completions";
  const payload = {
    messages: [
      { role: "system", content: "You are a helpful travel guide." },
      { role: "user", content: "hi" }
    ],
    model: "mistral" 
  };

  console.log(`Testing gen.pollinations.ai...`);
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await resp.text();
    console.log(`Status: ${resp.status}`);
    console.log(`Response: ${data}`);
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
  }
}
test();
