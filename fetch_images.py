import urllib.request
import json
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Goa", "Kerala",
    "Maharashtra", "Rajasthan", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand",
    "Himachal Pradesh", "Karnataka", "Gujarat", "West Bengal", "Jammu and Kashmir"
]

results = {}
for state in states:
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(state)}&prop=pageimages&format=json&pithumbsize=800"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            page_id = list(pages.keys())[0]
            if 'thumbnail' in pages[page_id]:
                results[state] = pages[page_id]['thumbnail']['source']
            else:
                results[state] = ""
    except Exception as e:
        results[state] = str(e)

print(json.dumps(results, indent=2))
