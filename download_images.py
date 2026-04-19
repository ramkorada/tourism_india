import os
import urllib.request
import re

urls = {
    "arunachal-pradesh": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Tawang_Monastery.jpg/800px-Tawang_Monastery.jpg",
    "assam": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Kaziranga_National_Park_Elephant_Safari.jpg/800px-Kaziranga_National_Park_Elephant_Safari.jpg",
    "goa": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Goa_beach.jpg/800px-Goa_beach.jpg",
    "kerala": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Alappuzha_Boat_House.jpg/800px-Alappuzha_Boat_House.jpg",
    "maharashtra": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Gateway_of_India%2C_Mumbai.jpg/800px-Gateway_of_India%2C_Mumbai.jpg",
    "rajasthan": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Hawa_Mahal_2011.jpg/800px-Hawa_Mahal_2011.jpg",
    "tamil-nadu": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Mamallapuram_view.jpg/960px-Mamallapuram_view.jpg",
    "uttar-pradesh": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg",
    "uttarakhand": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Auli%2C_India.jpg/960px-Auli%2C_India.jpg",
    "himachal-pradesh": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/960px-Kinnaur_Kailash.jpg",
    "karnataka": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Hampi_virupaksha_temple.jpg/960px-Hampi_virupaksha_temple.jpg",
    "gujarat": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Rani_ki_vav_02.jpg/960px-Rani_ki_vav_02.jpg",
    "west-bengal": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG/960px-Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG",
    "jammu-kashmir": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop"
}

out_dir = r"c:\Users\abhir\Downloads\tourism_project\andhra-trails-main\andhra-trails\src\assets\states"
os.makedirs(out_dir, exist_ok=True)

import time

for state, url in urls.items():
    out_path = os.path.join(out_dir, f"{state}.jpg")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(out_path, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded: {state}")
    except Exception as e:
        print(f"Failed: {state} - {e}")
        # write a fallback 1x1 image so ts imports don't fail
        with open(out_path, 'wb') as out_file:
            out_file.write(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82')
    time.sleep(0.5)

print("Done")
