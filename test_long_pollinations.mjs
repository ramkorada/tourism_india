// test_long_pollinations.mjs
async function test() {
  const system = "You are an expert India travel guide.";
  const prompt = "Can you tell me about the best places to visit in Andhra Pradesh, specifically focusing on beaches, temples, and hill stations? I want a detailed itinerary for 10 days including travel times and budget tips.";
  const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?system=${encodeURIComponent(system)}`;
  
  console.log(`Testing long prompt: ${url.substring(0, 100)}...`);
  try {
    const resp = await fetch(url);
    const text = await resp.text();
    console.log(`Status: ${resp.status}`);
    console.log(`Length: ${text.length}`);
    if (text.includes("IMPORTANT NOTICE")) {
      console.log("❌ FAILS (Shows notice)");
    } else {
      console.log("✅ WORKS");
      console.log(`Snippet: ${text.substring(0, 100)}...`);
    }
  } catch (e) {
    console.log(`❌ ERROR: ${e.message}`);
  }
}
test();
