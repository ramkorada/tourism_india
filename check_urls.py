import urllib.request
import re

urls = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Tawang_Monastery.jpg/800px-Tawang_Monastery.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Kaziranga_National_Park_Elephant_Safari.jpg/800px-Kaziranga_National_Park_Elephant_Safari.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Goa_beach.jpg/800px-Goa_beach.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Alappuzha_Boat_House.jpg/800px-Alappuzha_Boat_House.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Gateway_of_India%2C_Mumbai.jpg/800px-Gateway_of_India%2C_Mumbai.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Hawa_Mahal_2011.jpg/800px-Hawa_Mahal_2011.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Mamallapuram_view.jpg/960px-Mamallapuram_view.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Auli%2C_India.jpg/960px-Auli%2C_India.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/960px-Kinnaur_Kailash.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Hampi_virupaksha_temple.jpg/960px-Hampi_virupaksha_temple.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Rani_ki_vav_02.jpg/960px-Rani_ki_vav_02.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG/960px-Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Dal_Lake_Srinagar_Kashmir.jpg/800px-Dal_Lake_Srinagar_Kashmir.jpg"
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        print(f"OK: {url}")
    except Exception as e:
        print(f"FAIL: {url} - {e}")
