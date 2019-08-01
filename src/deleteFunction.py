# Deletion of URL Lambda Function

import pymysql

def deleteFromDB(event, context):

    # AWS RDS MySQL DB information
    rds_host  = "urlstorage.cuujnc1vkyie.us-west-1.rds.amazonaws.com"
    name = "darren"
    password = "charityfuntila"
    db_name = "urlstorage"
    connection = pymysql.connect(rds_host, user=name, passwd=password, db=db_name)

    cursor = connection.cursor()
    delete_url = ("DELETE FROM `listurls`"
                  "WHERE `startTime` = %s" 
                  " AND `scrapeurl` = %s")

    given = (event['givenDate'], event['scrapeurl'])
    cursor.execute(delete_url, given)
    connection.commit()
    cursor.close()
    connection.close()

    return {
        'statusCode': 200,
        "headers": { 
            "Access-Control-Allow-Origin": "*" 
        },
        'body': 'delete from DB completed successfully'
    }