from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
import re
from PIL import Image
from io import BytesIO
import requests
import mysql.connector
from datetime import date, datetime

connection = mysql.connector.connect(
  host= "localhost", user= "root", password= "password", database= "URLStore", auth_plugin='mysql_native_password')

cursor = connection.cursor()
add_url = ("INSERT INTO URLTable "
               "(link, status, startDate) "
               "VALUES (%s, %s, %s)")


# url = 'https://imgur.com/search?q=funny'
url = 'https://pixabay.com/images/search/dog/'
# url = 'https://en.wikipedia.org/wiki/GIF'
# url = 'https://en.wikipedia.org/wiki/Peter_Jeffrey_(RAAF_officer)'

# html = urlopen('https://en.wikipedia.org/wiki/Peter_Jeffrey_(RAAF_officer)')

# html = urlopen(Request(url, headers={'User-Agent': 'Mozilla'}))
html = urlopen(Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
}))

soup = BeautifulSoup(html, 'html.parser')
# images = soup.find_all('img', {'src' : re.compile(r".*?(?=jpeg|jpg|png|gif)")}, width=True, height=True)
images = soup.find_all('img', {'src' : re.compile(r".*?(?=jpeg|jpg|png|gif)")})

largestArea = 0
largestImage = ''

for image in images: 
    # print(image['src'] + '\n')
    try:
        modifiedURL = image['src']
        if image['src'][0:2] == '//':
            modifiedURL = 'https://' + image['src'][2:]
        print(modifiedURL)


        response = requests.get(modifiedURL)
        img = Image.open(BytesIO(response.content))
        width, height = img.size 

        print('current width: ' + str(width) + ' current height: ' + str(height))

        if width * height > largestArea:
            largestArea = width * height
            largestImage = modifiedURL
        print('Largest Image Area: ' + str(largestArea) + ' url: ' + largestImage + '\n')
    except:
        print('request didnt work')
        continue

    
    # print(len(images))
    # print(image['src']+ ' width: ' + image['width'] + ' height: ' + image['height'] + '\n')
    # if int(image['width']) * int(image['height']) > largestArea:

print('Largest Image Area: ' + str(largestArea) + ' url: ' + largestImage)
result = (largestImage, 'Completed', datetime.now())
cursor.execute(add_url, result)


connection.commit()
cursor.close()
connection.close()
