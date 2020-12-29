# node-apis-project
- Node.js + Javascript + Express + Sequelize


- Developed Api :

    1) Inserted user and item into database.

        - POST : http://localhost:6000/
        - POSTMAN REQUEST:
            {
            "name":"xyzabc",
            "email":"abc330@gmail.com",
            "password":"345",
            "cpassword":"345",
            "mobile":9854637587,
                "items":[{
                    "name":"Updatd",
                    "rent_price":"300",
                    "actual_price":"200",
                    "rent_status":"0",
                    "manufacture_date":"10-01-2020"

                }]
            }
    2) Get users list :
        - GET :  http://localhost:6000/users

    3) Edit user :
        - PUT : http://localhost:6000/1
        - POSTMAN RQUEST :
            {
            "name":"xyzabc",
            "email":"abc3130@gmail.com",
            "password":"345",
            "cpassword":"345",
            "mobile":9854637587            
            }

            
- For DB setup :
    - run `sequelize db:migrate`
- 
