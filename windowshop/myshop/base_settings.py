# My shop configurations

# Google Shopping API
API_KEY = "AIzaSyA4tqHma0vcR-VC7iPyo3il69-gF4urh7s"

API_PATH = "https://www.googleapis.com/shopping/search/v1/public/products?key=AIzaSyA4tqHma0vcR-VC7iPyo3il69-gF4urh7s&country=%s&q=%s&startIndex=%s&maxResults=%s&alt=json"

API_CROWD = "&crowdBy=accountId:1"

API_ITEMS_PER_PAGE = 24

# Browse Categories
BROWSE_ITEMS = {
    "Beauty": {
        "Makeup": ["Foundation", "Lipstick", "Lip Gloss", "Eyeshadow", "Mascara", "False Eyelashes"],
        "Skincare": ["Eye cream", "Moisturizer", "Toner", "Sunscreen"]
        },
    "Apparel": {
        "Dresses": ["Cocktail Dress", "Prom", "Bridesmaid", "Wedding Dress"],
        "Activewear": ["Yoga Tops", "Yoga Pants", "Running Jacket", "Running Shorts", "Tennis Skirt"],
        "Men": ["Suits", "Tie", "Tie Pin", "Dress Shirt"]
        },
    "Shoes": {
        "Dress": ["Pumps", "Mary Janes", "Booties", "Loafers"],
        "Casual": ["Flip Flops", "Sneakers", "Sandals", "Slippers", "Espadrilles"]
        },
    "Electronics": {
        "Computers": ["iMac", "MacBook", "Chromebook", "Ultrabooks", "Microsoft Surface"],
        "Phones": ["Android", "iPhone", "Phone Case", "Phone Charger"],
        "Electronics": ["HDTV", "Digital Camera", "Home Theater", "Bluetooth Headset"]
        },
    "Games": {
        "Consoles": ["Xbox 360", "PS3", "Wii", "WiiU", "PS Vista", "Nintendo 3DS"],
        "Video Games": ["Xbox Games", "PS Games", "DS Games", "Super Mario"],
        "Non-Video Games": ["Board Games", "Puzzle Games", "Word Games", "Chess"],
        },
    "Flowers": {
        "Flowers": ["Tulips", "Roses", "Lilies", "Mini Cactus", "Marimo Aquarium", "Preserved Flowers"],
        "Special Occasions": ["Red Roses", "Anniversary Bouquet", "Corsages"]
        }
    }
