# Lambda Function and Web Scraper that inserts the largest image into MySQL DB

from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
import re
from PIL import Image
from io import BytesIO
import requests
import pymysql

def urlInsert(event, context):

    # AWS RDS MySQL DB information
    rds_host  = "urlstorage.cuujnc1vkyie.us-west-1.rds.amazonaws.com"
    name = "darren"
    password = "charityfuntila"
    db_name = "urlstorage"
    connection = pymysql.connect(rds_host, user=name, passwd=password, db=db_name)

    # Prepare the insert statement
    cursor = connection.cursor()
    add_url = ("INSERT INTO listurls"
                "(scrapeurl, startTime, status, largestImage) "
                "VALUES (%s, %s, %s, %s)")

    url = event['url']

    # set the html to be used later or respectively return the correct status code
    try:
        html = urlopen(Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
        }))
    except:
        return {
        'statusCode': 400,
        "headers": { 
            "Access-Control-Allow-Origin": "*" 
        },
        'body': 'invalid url requested'
    }

    # scrape any image that ends with the following file types
    soup = BeautifulSoup(html, 'html.parser')
    images = soup.find_all('img', {'src' : re.compile(r".*?(?=jpeg|jpg|png|gif)")})

    largestArea = 0
    largestImage = ''

    # iterate through every image for the largest one
    for image in images: 
        print(image)
        try:
            modifiedURL = image['src']
            if image['src'][0:2] == '//':
                modifiedURL = 'https://' + image['src'][2:]
            print(modifiedURL)


            response = requests.get(modifiedURL)
            img = Image.open(BytesIO(response.content))
            width, height = img.size 

            if width * height > largestArea:
                largestArea = width * height
                largestImage = modifiedURL
        except:
            print('request didnt work')
            continue

    print('Largest Image Area: ' + str(largestArea) + ' url: ' + largestImage)
    # commit the insert into the database
    result = (url, event['startTime'], 'Completed', largestImage)
    cursor.execute(add_url, result)
    connection.commit()
    cursor.close()
    connection.close()

    return {
        'statusCode': 200,
        "headers": { 
            "Access-Control-Allow-Origin": "*" 
        },
        'body': 'completed successfully'
    }

# print(urlInsert({'url' : 'www.abcdef.com', 'startTime' : '2019-7-31 21:35:26'},'test'))