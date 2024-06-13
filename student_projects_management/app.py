from flask import Flask, request, jsonify,json,send_file,make_response
import mysql.connector
from flask_cors import CORS
from flask_cors import cross_origin
from collections import defaultdict
import collections
import numpy as np
from numpy import mean
from datetime import datetime
import io
import os
from io import BytesIO
import PyPDF2
import jwt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from math import sqrt
from sklearn.metrics import confusion_matrix, accuracy_score
from reportlab.lib.pagesizes import letter,landscape
from reportlab.pdfgen import canvas
import pandas as pd
from io import BytesIO
import json
from flask_mail import Mail, Message
import random
import string
import base64
from mysql.connector import Error


app = Flask(__name__)
SECRET_KEY = 'i-bPuLfCdEspfqv5cI1A6__bsEtnJOGKdbNmhbLKQAA'

#app.config['CORS_ORIGINS'] = ['http://localhost:3000']
CORS(app)
CORS(app, resources={r"/api/": {"origins": ""}})

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

#CORS(app, origins='*', headers='Content-Type')
#CORS(app, resources={r"/api/*": {"origins": "*"}})
#CORS(app, resources={r"/useradd": {"origins": "http://localhost:3000"}})
#cors = CORS(app, resources={r"*": {"origins": "http://127.0.0.1:5000/useradd"}})
# MySQL configuration

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'ushasrikande@gmail.com'
app.config['MAIL_PASSWORD'] = 'zwvg pjvw ugul viyp'
app.config['MAIL_DEFAULT_SENDER'] = 'ushasrikande@gmail.com'

mail = Mail(app)

mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Kande@123',
    'database': 'project'
}

# Function to establish MySQL connection
def get_db_connection():
    return mysql.connector.connect(**mysql_config)



# Create a new user

# Get all users

@app.route('/api/listusers/<int:year>',methods =['GET'])
@cross_origin()
def listusers(year):
    connection = get_db_connection()
    cursor = connection.cursor()
    print(year)
    select_query = "SELECT * FROM pbst where year=%s"
    cursor.execute(select_query,(year,))
    users = cursor.fetchall()
    connection.commit()
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in users:
        json_data.append(dict(zip(row_headers,result)))
   
    cursor.close()
    #print(users)
    print(json_data)
    return jsonify(json_data)

@app.route('/api/listusers/',methods =['GET'])
@cross_origin()
def listusersHome():
    connection = get_db_connection()
    cursor = connection.cursor()
    
    select_query = "SELECT * FROM pbst"
    cursor.execute(select_query)
    users = cursor.fetchall()
    connection.commit()
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in users:
        json_data.append(dict(zip(row_headers,result)))
   
    cursor.close()
    #print(users)
    print(json_data)
    return jsonify(json_data)


def generate_otp():
    return ''.join(random.choices(string.digits, k=6))


@app.route('/api/table/<int:id>/<section>/<int:year>',methods=['GET'])
@cross_origin()
def ListTable(id,section,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    print(id)
    print(section)
    print(year)
    query = "select * from student s,pbst p where s.batchno=p.batchno and s.section=p.section and s.year=p.year and p.batchno=%s and p.section=%s and p.year=%s"
    cursor.execute(query,(id,section,year))
    students = cursor.fetchall()
    connection.commit()
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in students:
        json_data.append(dict(zip(row_headers,result)))
    cursor.close()
    return jsonify(json_data)
    
    
@app.route('/submit_form', methods=['POST'])
@cross_origin()
def submit_signup():
    if request.method == 'POST':
        connection = get_db_connection()
        cur = connection.cursor()
        data = request.json
        first_name = data['firstName']
        last_name = data['lastName']
        email = data['email']
        username = data['userName']
        phn = data['phone']
        password = data['password']
        department=data['department']
        
        year=data['year']
        gender = data['gender']
        dob = data['dob']
        sections=data['sections']
        domains = data['domains']
        role=data['role']
        section=data['section']
        cgpa = data['cgpa']
        # Extract other form fields similarly

        # Insert data into MySQL database
        print(sections)
        print(domains)
        
        
        otp = generate_otp()# Send OTP to user's email
        msg = Message('Verification OTP', recipients=[email])
        msg.body = f'Your OTP for verification is: {otp}'

        mail.send(msg)
        
        cur.execute("select * from logins where username=%s and year=%s",(username,year,))
        user = cur.fetchone()
        print(user)
        connection.commit()
        if user:
            error_message = "Credentials already exist."
            return jsonify({'error': error_message}), 400
        
        cur.execute("insert into logins(username,email,password,role,year,otp,verified) values(%s,%s,%s,%s,%s,%s,%s)",(username,email,password,role,year,otp,False,))
        connection.commit()
        
       
        section_names = ['section_a', 'section_b', 'section_c']  # Add more section names as needed
        section_values = {section: 1 if section in sections else 0 for section in section_names}
        print(section_values)
        domains_json = json.dumps(domains)
        print(domains)

        if role=='student':
            cur.execute("select * from student where studentid=%s and year=%s",(username,year,))
            student = cur.fetchone()
            print(student)
            connection.commit()
            if student:
                # Student already exists, return an error
                error_message = "Student with the given ID and year already exists."
                return jsonify({'error': error_message}), 400
            
            cur.execute("insert into student(studentid,first_name,last_name,phn,cgpa,section,branch,year,dob,gender) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(username,first_name,last_name,phn,cgpa,section,department,year,dob,gender,))
            connection.commit()
            
        else:
            cur.execute("select * from guide where guidename=%s and year=%s",(username,year,))
            guide = cur.fetchone()
            print("guide")
            print(guide)
            connection.commit()
            if guide:
                error_message = " Faculty with the given ID and year already exists."
                return jsonify({'error': error_message}), 400
            cur.execute("insert into guide(guidename,section_a,section_b,section_c,domains,branch,year,gender,dob) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)",(first_name+last_name,section_values['section_a'],section_values['section_b'],section_values['section_c'],domains_json,department,year,gender,dob,))
            connection.commit()
        cur.close()
        connection.close()

        return jsonify({'message': 'Form submitted successfully'}),200
    
    
@app.route('/api/update_profile/<username>/<password>/<int:year>', methods=['PUT'])
@cross_origin()
def update_profile(username,password,year):
    try:
        connection = get_db_connection()
        cur = connection.cursor()
        updated_data = request.json

        # Extract fields from updated_data
        firstname = updated_data.get('firstname')
        lastname = updated_data.get('lastname')
        email = updated_data.get('email')
        phn = updated_data.get('phn')
        section = updated_data.get('section')
        year1 = updated_data.get('year')
        cgpa = updated_data.get('cgpa')
        branch = updated_data.get('branch')
        print(email)
        print(firstname)
        print(year)
        print(password)
        print(year)
        print(cgpa)
        print(section)
        print(phn)
        print(branch)
        upd_login = "update logins set email=%s,name=%s,year=%s where username=%s and password=%s and year=%s"        
        cur.execute(upd_login,(email,firstname,year1,username,password,year,))
        connection.commit()
        upt_student = "update student set first_name=%s,last_name=%s,cgpa=%s,section=%s,phn=%s,branch=%s,year=%s where studentid=%s and year=%s"
        cur.execute(upt_student,(firstname,lastname,cgpa,section,phn,branch,year1,username,year,))
        connection.commit()
        cur.close()
        connection.close()

        return jsonify({'message': 'Profile updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
    
@app.route('/api/update_facultyprofile/<username>/<password>/<int:year>', methods=['PUT'])
@cross_origin()
def update_facultyprofile(username,password,year):
    try:
        connection = get_db_connection()
        cur = connection.cursor()
        updated_data = request.json

        # Extract fields from updated_data
        name = updated_data.get('name')
        email = updated_data.get('email')
        
        sections = updated_data.get('sections')
        year1 = updated_data.get('year')
        domains = updated_data.get('domains')
        branch = updated_data.get('branch')
        print(email)
        print(name)
        print(year)
        print(password)
        print(year1)
        print(sections)
        print(domains)
        print(branch)
        
        guide = "select name from logins where username=%s and password=%s and year=%s"
        cur.execute(guide,(username,password,year,))
        guidename = cur.fetchone()[0]
        connection.commit()
        section_names = ['section_a', 'section_b', 'section_c']  # Add more section names as needed
        section_values = {section: 1 if section in sections else 0 for section in section_names}
        section_dict = {section: 0 for section in sections}
        for section in sections:
            if section in section_dict:
                section_dict[section] = 1
        print(section_dict)
        #print(section_values)
        domains_json = json.dumps(domains)
        print(domains)
        
        upd_login = "update logins set email=%s,name=%s,year=%s where username=%s and password=%s and year=%s"        
        cur.execute(upd_login,(email,name,year1,username,password,year,))
        connection.commit()
        upt_student = "update guide set guidename=%s,section_a=%s,section_b=%s,section_c=%s,domains=%s,year=%s where guidename=%s and year=%s"
        cur.execute(upt_student,(name,section_dict['a'],section_dict['b'],section_dict['c'],domains_json,year1,guidename,year,))
        connection.commit()
        cur.close()
        connection.close()

        return jsonify({'message': 'Profile updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    connection = get_db_connection()
    cur = connection.cursor()
    data = request.json

    email = data.get('email')
    print(email)
    entered_otp = data.get('otp')
    
    print(email)
    print("enter otp")
    print(entered_otp)

    # Find the user in the database
    cur.execute("""
        SELECT * FROM logins WHERE email = %s AND otp = %s
    """, (email, entered_otp))

    user = cur.fetchone()
    print(user)
    if not user:
        return jsonify({'error': 'Invalid OTP'}), 401

    # Mark the user as verified
    cur.execute("""
        UPDATE logins SET verified = TRUE WHERE username = %s and email=%s and otp=%s
    """, (user[0],email,entered_otp,))

    connection.commit()

    # Close the database connection
    cur.close()
    connection.close()

    return jsonify({'message': 'OTP verified successfully'}),200

@app.route('/login', methods=['POST'])
@app.route('/login/', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    print(username)
    print(password)
    print(role)
    connection = get_db_connection()
    cursor = connection.cursor()
    select_query = "SELECT * FROM logins where username=%s and password=%s and role = %s"
    cursor.execute(select_query,(username,password,role))
    
    user = cursor.fetchone()
    connection.commit()
    print(user)
    print(user[0])
    print(user[3])
    '''
    year = "select year from student where studentid=%s"
    cursor.execute(year,(username,))
    year_taken = cursor.fetchone()
    print(year_taken[0])
    connection.commit()'''
    cursor.close()
    
    
    if user:
            
        token_payload = {'username': user[0], 'role': user[3]}
        jwt_token = jwt.encode(token_payload, SECRET_KEY, algorithm='HS256')
        #return {'token': jwt_token, 'role': user[3],'year':year_taken[0]}
        return {'token': jwt_token, 'role': user[3],'year':user[5]}
    else:
        return {'error': 'Invalid credentials'}, 401
    
    
@app.route('/forgotpassword', methods=['POST'])
@app.route('/forgotpassword/', methods=['POST'])
@cross_origin()
def forgot_password():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    print(username)
    print(email)
    print(password)
    connection = get_db_connection()
    cursor = connection.cursor()
    select_query = "SELECT * FROM logins where username=%s and email=%s"
    cursor.execute(select_query,(username,email,))
    
    user = cursor.fetchone()
    connection.commit()
    print(user)
    print(user[0])
    print(user[3])
    

    if user:
        update = "update logins set password=%s where username=%s and email=%s"
        cursor.execute(update,(password,username,email))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify(user)
    else:
        return jsonify({'error': 'Invalid credentials'}, 401) 


@app.route('/reset_password/', methods=['POST'])
@app.route('/reset_password', methods=['POST'])
@cross_origin()
def reset_password():
    # Assuming you're receiving JSON data from the frontend
    connection = get_db_connection()
    cursor = connection.cursor()
    data = request.json

    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')
    confirm_password = data.get('confirmPassword')
    year = data.get('year')
    username=data.get('username')
    print(username)
    print(new_password)
    print(old_password)
    print(year)
    # Here you can perform your password validation logic
    if new_password != confirm_password:
        return jsonify({'error': 'New password and confirm password must match.'}), 400
    
    update_pass = "update logins set password =%s where username=%s and password=%s and year=%s"
    cursor.execute(update_pass,(new_password,username,old_password,year,))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Password reset successfully.'}), 200


@app.route('/api/useradd/<sec>/<int:year>',methods=['POST'])
@cross_origin()
def useradd(sec,year):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        title = request.json.get('title')
        domain = request.json.get('domain')
        #category = request.json['category']
        #batchid = request.json.get('inputValue1')
        desc = request.json.get('description')
        category = request.json.get('category')
        batchno = request.json.get('batch')
        print(category)
        print(batchno)
        print(year)
    #batchid = int(batchid)
        try:
            insert_query = "INSERT INTO pbst (title,domain,category,section,batchno,status,description,year) VALUES (%s, %s,%s,%s,%s,'submitted',%s,%s)"
            cursor.execute(insert_query, (title, domain,category,sec,batchno,desc,year,))
            update_query = "update batch set status='submitted' where batchid=%s and section=%s and year=%s"
            cursor.execute(update_query,(batchno,sec,year,))

            connection.commit()
            cursor.close()
            response = jsonify({"message": "User created"})
            return response
        except Exception as e:
            error_message = str(e)
            print(error_message)
            
    except Exception as e:
        #traceback.print_exc()  # Print exception traceback
        error_message = str(e)
        print(error_message)
 


@app.route('/api/automate/<int:year>',methods=['POST'])
@cross_origin()
def AutomateBatchDividing(year):
    connection = get_db_connection()
    cursor = connection.cursor()
    grp_size = request.json.get('inputs')
    sec = request.json.get('inputs1')
    print(sec)
    print(year)
    grp_size = int(grp_size)
    #query = "SELECT studentid, cgpa FROM student where section = %s"
    query = "select s.studentid,s.cgpa from student s where s.studentid not in (select s.studentid from student s,batch b where s.batchno=b.batchid and b.batchtype = 'custom' and b.section=s.section and b.year=s.year and b.year=%s and b.section=%s) and s.section = %s and s.year=%s;"
    cursor.execute(query,(year,sec,sec,year,))

    
    users = cursor.fetchall()

    for i in users:
        upd = cursor.execute("update student set batchno = %s where studentid = %s and year=%s",(0,i[0],year,))
        connection.commit()
        

    sorted_students = sorted(users, key=lambda x: x[1], reverse=True)
    #print(users)
    print(len(sorted_students))
    #print(sorted_students)
    
   
    #print(sorted_students)
    total_students = len(sorted_students)
    top_performers = sorted_students[:total_students // 3]  # Top 1/3 students
    average_performers = sorted_students[total_students // 3: 2 * (total_students // 3)]  # Middle 1/3 students
    poor_performers = sorted_students[2 * (total_students // 3):]  # Bottom 1/3 students
    toppers = top_performers[::-1]
    average = average_performers
    poor = poor_performers[::-1]
     
    print(toppers)
    print()
    print(average)
    print()
    print(poor)
    
    all_students = {
    'toppers': toppers.copy(),
    'average': average.copy(),
    'poor': poor.copy()
    }
    num_groups = grp_size
    groups = [[] for _ in range(num_groups)]
    remaining = sum(len(students) for students in all_students.values())
    all = remaining % num_groups
    print(remaining)
    print(all)
    while remaining > 3*num_groups:
        for group in groups:
            for category, students in all_students.items():
                if students:
                    student = students.pop()
                    group.append(student)
            
                    remaining -= 1
    # Ensure each group gets at least one student from each category
    '''
    for group in groups:
        for category, students in all_students.items():
        
            if students:
                student = students.pop()
                group.append(student)
    
    '''
    
    
    remaining_students = sum(len(students) for students in all_students.values())
    print()
    print("remain")
    print(remaining_students)
    remain_students = all_students
    #print(remain_students)
    re = []
    for category,st in enumerate(remain_students):
        re.append(remain_students[st])
    print(re)
    re1=[]
    for i in re:
        for j in i:
            re1.append(j)
    
    print('')
    print(re1)
    print('')
    sorted_remain = sorted(re1, key=lambda x: x[1], reverse=True)
    print(sorted_remain)
    print(num_groups)
    for i, student in enumerate(sorted_remain):
        group_index = (i % num_groups)
        print(group_index)
        groups[num_groups -1 - group_index].append(student)

# Print the groups
    print('')
    print(remaining_students)
    #print(groups)
    for i, group in enumerate(groups):
        print(f"Group {i + 1}: {group}")
    
    sec_up = sec.upper()
    del_batc = cursor.execute("delete from batch where batchtype <>'custom' and section = %s and year=%s",(sec_up,year,))
    del_batches = len(cursor.fetchall())
    connection.commit()
    batc = cursor.execute("select batchid from batch where batchtype='custom' and section = %s and year=%s",(sec,year,))
    batc = cursor.fetchall()
    batches = len(batc)
    connection.commit()
    batchno = []
    
    total_batchno = []

    for i in batc:
        batchno.append(i[0])
    #print(batc)
    print(batches)
    print(batchno)
    
    for i in range(grp_size + batches):
        if i+1 not in batchno:
            total_batchno.append(i+1)
    print(total_batchno)

        

    
    for i in range(len(groups)):
        #print(i)
        #print(len(json_data[i]))
        
        print(total_batchno[i])
        #print(groups[i][0][0])
        
        res = cursor.execute("insert into batch (batchid,batchleader,section,guidename,batchtype,year) values(%s,%s,%s,'dummy','automate',%s)",(total_batchno[i],groups[i][0][0],sec,year,))
        connection.commit()

    for i in range(len(groups)):
        for j in groups[i]:
            #print(j[0])
            #print((i+1))
            cursor.execute("update student set batchno = %s where studentid = %s and year=%s",(total_batchno[i],j[0],year,))
            connection.commit()

    
    connection.commit()
    cursor.close()
    return jsonify(batchno)
    
  

@app.route('/api/customcreate/<int:year>',methods=['POST'])
@cross_origin()
def CustomDividing(year):
    if request.method == 'POST':
        connection = get_db_connection()
        cursor = connection.cursor()
        data = request.json  # Get the JSON data from the request
        selected_values = data.get('selectedValue',[])  
        sec = data.get('selectedOption1')
        guide = data.get('selectedOption')
        print(sec)
        selected_values = sorted(selected_values)
        print(f"sec is :{sec}")
        print(guide)
        print(f"selected:{selected_values}")
        #getdeta = cursor.execute("select s.studentid from student s,batch b where b.batchid=s.batchno and b.batchtype <> 'custom' and s.section =%s ",(sec,))
        getdeta = cursor.execute("select s.studentid,s.cgpa from student s where s.studentid not in (select s.studentid from student s,batch b where s.batchno=b.batchid and b.batchtype = 'custom' and s.year=b.year and b.year=%s and b.section=%s) and s.section = %s and s.year=%s;",(year,sec,sec,year,))
        users = cursor.fetchall()
        print("users")
        print(users)
        connection.commit()
        
        for i in users:
            upd = cursor.execute("update student set batchno = %s where studentid = %s and year=%s",(0,i[0],year,))
            connection.commit()
        

        del_batc = cursor.execute("delete from batch where batchtype <>'custom' and section = %s and year=%s",(sec,year,))
        del_batches = len(cursor.fetchall())
        connection.commit()
        #print(selected_values)
        le = cursor.execute("select batchid from batch where section = %s and year=%s",(sec,year,))
        
        batc = cursor.fetchall()
        batches = len(batc)
        connection.commit()
        print(batc)
        batchno = []
        total_batchno = []
        for i in batc:
            
            batchno.append(i[0])
    #print(batc)
        print(batches)
        print(batchno)

        for i in range(16):
           if i+1 not in batchno:
               total_batchno.append(i+1)
        print(total_batchno)
        cursor.execute("insert into batch(batchid,batchleader,section,batchtype,guidename,year) values(%s,%s,%s,'custom',%s,%s)",(total_batchno[0],selected_values[0],sec,guide,year,))
        connection.commit()
        
        gui = cursor.execute("select guidename,batch_1,batch_2 from guide where guidename = %s and year=%s",(guide,year,))
        guide_values = cursor.fetchall()
        print("guide values")
        print(guide_values)
        for i in guide_values:
            print(i)
            print(total_batchno[0])
            cursor.execute("update guide set batch_2 = %s where batch_1 !=0 and batch_2 = 0 and guidename=%s and year=%s",(total_batchno[0],guide,year,))

            cursor.execute("update guide set batch_1 = %s where batch_1 = 0 and guidename = %s and year=%s",(total_batchno[0],guide,year,))
            
        for i in selected_values:
            cursor.execute("update student set batchno=%s where studentid=%s and year=%s",(total_batchno[0],i,year,))
            connection.commit()

        
        cursor.close()
        
        #return jsonify({'message': 'Received selected values', 'selectedValues': selected_values})
        return jsonify({"message":"user"})


@app.route('/api/dropdown_values/<int:year>/<selected_value>',methods=['GET'])
@cross_origin()
def GetDropdown(year,selected_value):
    connection = get_db_connection()
    cursor = connection.cursor()
    
    sec = selected_value.lower()
    select_query = "SELECT studentid FROM student where section = %s and year=%s"
    cursor.execute(select_query,(sec,year,))
    users = cursor.fetchall()   
    connection.commit()
    cursor.close()
    print(users)
    #dropdown_values = [item.to_dict() for item in users]  # Assuming to_dict() method returns required data
    dat = []
    for i in users:
        print(i[0])
        dat.append(i[0])
    print(dat)
    
    connection.commit()
    cursor.close()
    return jsonify({"options":dat})
    

@app.route('/api/listcustombatch/<int:year>/<sec>',methods=['GET'])
@cross_origin()
def ListCustomBatch(year,sec):
    connection = get_db_connection()
    cursor = connection.cursor()
    sec = sec.upper()
    select_query = "SELECT * FROM batch where batchtype='custom' and section = %s and year=%s"
    cursor.execute(select_query,(sec,year,))
    users = cursor.fetchall()
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in users:
        json_data.append(dict(zip(row_headers,result)))
    connection.commit()
    cursor.close()
    #print(users)
    print(json_data)
    return jsonify(json_data)

@app.route('/api/listautomatebatch//<int:year>/<sec>',methods=['GET'])
@cross_origin()
def ListAutomateBatch(year,sec):
    connection = get_db_connection()
    cursor = connection.cursor()
    sec = sec.upper()
    select_query = "SELECT * FROM batch where batchtype='automate' and section = %s and year=%s order by batchid"
    cursor.execute(select_query,(sec,year,))
    users = cursor.fetchall()
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in users:
        json_data.append(dict(zip(row_headers,result)))
    connection.commit()
    cursor.close()
    #print(users)
    print(json_data)
    return jsonify(json_data)




@app.route('/api/listbatch/<sec>/<int:year>/',methods=['GET'])
@cross_origin()
def BatchSection(sec,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    sec1 = sec.lower()
    #bat = request.json.get('section')
    select_query = "SELECT * FROM batch where year=%s and section=%s"
    cursor.execute(select_query,(year,sec1))
    users = cursor.fetchall()   
    cursor.close()
    print(users)
    #dropdown_values = [item.to_dict() for item in users]  # Assuming to_dict() method returns required data
    dat = []
    for i in users:
        print(i[0])
        dat.append(i[0])
    print(dat)
    return jsonify(dat)

@app.route('/api/listguide/<int:year>/<sec>',methods=['GET'])
@cross_origin()
def GuideListing(year,sec):
    connection = get_db_connection()
    cursor = connection.cursor()
    print(year)
    if sec == 'A' or sec == 'a':
        select_query = "SELECT guidename FROM guide where year=%s and section_a is not null and section_a !=0 "
        cursor.execute(select_query,(year,))
        users = cursor.fetchall()   
    elif sec == 'B' or sec == 'b':
        select_query = "SELECT guidename FROM guide where year=%s and section_b is not null and section_b !=0 "
        cursor.execute(select_query,(year,))
        users = cursor.fetchall()
    else:
        select_query = "SELECT guidename FROM guide where year=%s and section_c is not null and section_c!=0"
        cursor.execute(select_query,(year,))
        users = cursor.fetchall()

    cursor.close()
    print(users)
    #dropdown_values = [item.to_dict() for item in users]  # Assuming to_dict() method returns required data
    dat = []
    for i in users:
        print(i[0])
        dat.append(i[0])
    print(dat)
    return jsonify(users)


@app.route('/api/batch/<sect>/<int:year>/',methods=['GET'])
@cross_origin()
def Section(sect,year):
    connection = get_db_connection()
    if connection:
        print("Database connection established.")
    else:
        print("Failed to establish database connection.")
    cursor = connection.cursor()
    sect = sect.lower()
    #
    #select_query = "select b.batchid,s.studentid,concat(s.last_name,s.first_name) as full_name,s.phn from batch b,student s where s.batchno = b.batchid and b.section = %s order by 1;"
    #select_query ="select b.*,s.studentid,concat(s.last_name,s.first_name) as full_name,s.phn from (select b.batchid,p.title,b.guidename from batch b,pbst p where p.batchno=b.batchid and b.section = %s) b,student s where s.batchno = b.batchid  order by 1;"
    select_query = "select s.studentid,concat(s.first_name,last_name) as full_name,s.phn,b.batchid,b.guidename,s.year from student s,batch b where s.batchno=b.batchid and b.section=s.section and s.section=%s and s.year=b.year and s.year=%s;"
    cursor.execute(select_query,(sect,year,))
    users = cursor.fetchall()   
    connection.commit()
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in users:
        json_data.append(dict(zip(row_headers,result)))
        
    print(json_data)
    
    select_query1 = "select p.title  from pbst p , batch b  where p.batchno = b.batchid and b.section = p.section and p.section = %s and p.year=b.year and b.year=%s;"
    cursor.execute(select_query1,(sect,year,))
    users1 = cursor.fetchall()   
    connection.commit()
    
    
    print(users1)
    #dropdown_values = [item.to_dict() for item in users]  # Assuming to_dict() method returns required data
    
        
    row_headers1=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data1=[]
    for result in users1:
        json_data1.append(dict(zip(row_headers1,result)))
    final = []
    for item1, item2 in zip(json_data,json_data1):
        print(item1)
        print(item2)
        #item1 = tuple_item1[0]  # Assuming first element in the tuple is a dictionary
        #item2 = tuple_item2[0]  # Assuming first element in the tuple is a dictionary

        if isinstance(item1, dict) and isinstance(item2, dict):
            student_info = {
                "batchid": item1.get('batchid'),
                "full_name": item1.get('full_name'),
                "guidename": item1.get('guidename'),
                "phn": item1.get('phn'),
                "studentid": item1.get('studentid'),
                "title": item2.get('title')
            }

            final.append(student_info)
            
    
    json_data = sorted(json_data, key=lambda x: x['batchid'])
    print(json_data)
    batches = {}
    for student in json_data:
        batch_id = student["batchid"]
        guide_name = student["guidename"]
        year=student['year']
        if batch_id not in batches:
            batches[batch_id] = {"batchNumber": f"{batch_id}","guidename":f"{guide_name}","year":f"{year}","students": []}
        batches[batch_id]["students"].append(student)
    print()
    print(batches)
    # Convert batches dictionary to a list
    batch_list = [batch for _, batch in batches.items()]
        
    cursor.close()
    #print(users)
    
    return jsonify({"groups":batch_list,"Batches":json_data,"Problems":json_data1,"final":final})
    
@app.route('/api/reviewprojects/<sec>/<int:year>/',methods=['GET'])
@app.route('/api/reviewprojects/<sec>/<year>', methods=['GET'])
@cross_origin()
def get_review(sec,year):
    connection = get_db_connection()
    if connection:
        print("Database connection established.")
    else:
        print("Failed to establish database connection.")
    cursor = connection.cursor()
    sect = sec.lower()
    print(sec)
    #reviews = cursor.execute("select * from rev;")
    select_query = "SELECT reviewid,reviewdate,reviewdescription,reviewmode,year FROM review where section=%s and year=%s;"
    
    cursor.execute(select_query,(sec,year,))
    reviews=cursor.fetchall()
    print(reviews)
    '''
    print(reviews)
    connection.commit()
    
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in reviews:
        json_data.append(dict(zip(row_headers,result)))
    '''
    formatted_reviews = []
    for review in reviews:
        # Assuming the date is in the second column, modify accordingly
        date_string = review[1]  # Replace with the actual column index
        #date_object = datetime.strptime(date_string, "%a, %d %b %Y %H:%M:%S %Z")
        formatted_date = date_string.strftime("%A, %d %B %Y")
        #formatted_date = datetime.strptime(date_string, "%a, %d %b %Y %H:%M:%S %Z").strftime("%A, %d %B %Y")
        
        
        # Assuming other columns exist, modify accordingly
        formatted_review = {
            "reviewid": review[0],  # Replace with the actual column index
            "reviewdate": formatted_date,
            "reviewdescription":review[2],
            "reviewmode": review[3],
            "year":review[4]
            
        }

        formatted_reviews.append(formatted_review)
    cursor.close()
    return jsonify(formatted_reviews)
    

@app.route('/api/batchdetails/<id>/<sec>/<int:year>/',methods=['GET'])

@cross_origin()
def Batch(id,sec,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    
    select_query = "SELECT * FROM batch b,student s  where b.batchid=s.batchno and b.section=s.section and b.year=s.year and b.batchid = %s and b.section=%s and b.year=%s"
    cursor.execute(select_query,(id,sec,year,))
    users = cursor.fetchall()

    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in users:
        json_data.append(dict(zip(row_headers,result)))
   
    cursor.close()
    #print(users)
    print(json_data)
    return jsonify(json_data)

@app.route('/api/dropdown_batches/<id>/<sec>/<int:year>/',methods=['GET'])
@app.route('/api/dropdown_batches/<id>/<sec>/<int:year>',methods=['GET'])
@cross_origin()
def GetDropdownBatches(id,sec,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    
    
    select_query = "select batchid from batch where batchid<>%s and section=%s and year=%s;"
    cursor.execute(select_query,(id,sec,year,))
    users = cursor.fetchall()   
    connection.commit()
    cursor.close()
    print(users)
    #dropdown_values = [item.to_dict() for item in users]  # Assuming to_dict() method returns required data
    dat = []
    for i in users:
        print(i[0])
        dat.append(i[0])
    print(dat)
    return jsonify({"options":dat})


@app.route('/api/guidedetails/<id>/<sec>/<guide>/<int:year>',methods=['GET'])

@cross_origin()
def Guide(id,sec,guide,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    
    select_query = "select * from batch where section=%s and batchid=%s and year=%s;"
    cursor.execute(select_query,(sec,id,year,))
    users = cursor.fetchall()

    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in users:
        json_data.append(dict(zip(row_headers,result)))
   
    cursor.close()
    #print(users)
    print(json_data)
    return jsonify(json_data)

@app.route('/api/guideupdate/', methods=['PUT'])
@cross_origin()
def swap_guide():
    # Get additional parameters from request body
    connection = get_db_connection()
    cursor = connection.cursor()
    
    
    
    id = request.json.get('id')
    sec = request.json.get('sec')
    guide = request.json.get('guide')
    batch = request.json.get('Batch')
    Guide = request.json.get('Guide')
    year = request.json.get('year')

    print(id)
    print(sec)
    print(guide)
    print(batch)
    print(Guide)
    print(year)
    
    section = ' '
    if sec == 'a':
        section = 'section_a'
    elif sec=='b':
        section='section_b'
    else:
        section='section_c'
    print(section)
    # Use the received parameters as needed
    #print(f'ID: {id}, Student 1: {student1}, Batch: {batch}, Student 2: {student2}')
    
    #guide = "UPDATE batch SET guidename =  CASE  WHEN batchid = %s and section=%s then %s WHEN batchid = %s and section=%s THEN %s ELSE guidename END WHERE guidename in (%s,%s);"
    guide1 = "update batch set guidename = %s where batchid=%s and section=%s and year=%s"
    cursor.execute(guide1,(Guide,id,sec,year,))
    
    connection.commit()
    
    guide2 = "update batch set guidename = %s where batchid=%s and section=%s and year=%s"
    cursor.execute(guide2,(guide,batch,sec,year,))
    connection.commit()
    
    
    gui1 = "UPDATE guide SET batch_1 = CASE WHEN batch_1 = %s THEN %s ELSE batch_1 END, batch_2 = CASE WHEN batch_2 = %s THEN %s ELSE batch_2 END where guidename=%s and %s is not null and year=%s;"
    cursor.execute(gui1,(id,batch,id,batch,guide,section,year,))
    
    connection.commit()
    
    gui2 = "UPDATE guide SET batch_1 = CASE WHEN batch_1 = %s THEN %s ELSE batch_1 END, batch_2 = CASE WHEN batch_2 = %s THEN %s ELSE batch_2 END where guidename=%s and %s is not null and year=%s;"
    cursor.execute(gui2,(batch,id,batch,id,Guide,section,year,))
    
    connection.commit()
    cursor.close()
    # Return a response (optional)
    return jsonify({'message': 'Guide updated successfully'})


@app.route('/api/user/<id>/<sec>/<int:year>/',methods=['GET'])
@cross_origin()
def GetProjectDetails(id,sec,year):
    print(f"Attempting to retrieve details for batchno: {id}")  # Check if route is being accessed
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        query = "SELECT * FROM pbst WHERE batchno = %s and section=%s and year=%s"
        cursor.execute(query, (id,sec,year,))
        user = cursor.fetchall()
        connection.commit()
        cursor.close()
        if user:
            return jsonify(user)
        else:
            return jsonify({'message': 'No data found for this batchno'})
    else:
        return jsonify({'message': 'Database connection error'})


@app.route('/api/userupdate/<id>/<sec>/<int:year>/',methods=['PUT'])
@app.route('/api/userupdate/<id>/<sec>/<int:year>',methods=['PUT'])
@cross_origin()
def Projectadd(id,sec,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    title = request.json['title']
    domain = request.json.get('domain')
    #category = request.json['category']
    #batchid = request.json.get('inputValue1')
    desc = request.json.get('description')
    category = request.json.get('category')
    
    print(category)
    
    #batchid = int(batchid)
    insert_query = "update pbst set title = %s,domain=%s,category=%s,section = %s,description=%s where batchno = %s and section = %s and year=%s"
    cursor.execute(insert_query, (title, domain,category,sec,desc,id,sec,year,))
    connection.commit()
    cursor.close()
    
    
    response = jsonify({"message": "User created"})
    
    return response


@app.route('/api/reviewupdate/<id>/<sec>/<int:year>',methods=['PUT'])
@cross_origin()
def EditReview(id,sec,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    #reviewdate = request.json['reviewdate']
    #reviewmode=request.json.get('reviewmode')
    #reviewdescription = request.json.get('reviewdescription')
    
    reviewdate = request.form.get('date')
    reviewmode = request.form.get('reviewmode')
    reviewdescription = request.form.get('reviewdescription')
    year = request.form.get('year')
    print(reviewdate)
    print(reviewmode)
    file = request.files['file']
    content = base64.b64decode(file.read())
    
    #batchid = int(batchid)
    update_query = "update review set reviewdate = %s,reviewmode = %s,reviewdescription=%s,name=%s,file=%s where reviewid = %s and section = %s and year=%s"
    cursor.execute(update_query, (reviewdate,reviewmode,reviewdescription,file.filename,content,id,sec,year,))
    connection.commit()
    cursor.close()
    
    
    response = jsonify({"message": "Review Updated"})
    
    return response


@app.route('/api/batchupdate/', methods=['PUT'])
@cross_origin()
def swap_batch():
    # Get additional parameters from request body
    connection = get_db_connection()
    cursor = connection.cursor()
    
    student1 = request.json.get('Student1')
    batch = request.json.get('Batch')
    student2 = request.json.get('Student2')
    id = request.json.get('id')
    year = request.json.get('year')
    # Use the received parameters as needed
    print(f'ID: {id}, Student 1: {student1}, Batch: {batch}, Student 2: {student2},year:{year}')
    
    update_quer = "UPDATE student SET batchno =  CASE  WHEN studentid = %s THEN %s WHEN studentid = %s THEN %s ELSE batchno END WHERE studentid IN (%s,%s) and year=%s;"
    cursor.execute(update_quer,(student1,batch,student2,id,student1,student2,year,))
    
    connection.commit()
    cursor.close()
    # Return a response (optional)
    return jsonify({'message': 'Batch updated successfully'})


@app.route('/api/batchdeletestudent',methods=['PUT'])
@app.route('/api/batchdeletestudent/',methods=['PUT'])
@cross_origin()
def DeleteStudent():
    connection = get_db_connection()
    cursor = connection.cursor()
    
    student1 = request.json.get('Student1')
    id = request.json.get('id')
    sec=request.json.get('sec')
    year = request.json.get('year')
    getdeta = cursor.execute("update student set batchno=%s where batchno=%s and section=%s and studentid=%s and year=%s",(0,id,sec,student1,year,))
    connection.commit()
    cursor.close()
    
    return jsonify({"message":"success deleted"})

@app.route('/api/batchaddstudent',methods=['PUT'])
@app.route('/api/batchaddstudent/',methods=['PUT'])
@cross_origin()
def AddStudent():
    connection = get_db_connection()
    cursor = connection.cursor()
    
    student = request.json.get('Student')
    id = request.json.get('id')
    sec=request.json.get('sec')
    year = request.json.get('year')
    getdeta = cursor.execute("update student set batchno=%s where batchno=%s and section=%s and studentid=%s and year=%s",(id,0,sec,student,year,))
    connection.commit()
    cursor.close()
    
    return jsonify({"message":"success deleted"})


@app.route('/api/availstudents/<sec>/<int:year>',methods=['GET'])
@app.route('/api/availstudents/<sec>/<int:year>/',methods=['GET'])
@cross_origin()
def GetAvailStudents(sec,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    
    cursor.execute("select studentid from student where section=%s and batchno=%s and year=%s",(sec,0,year,))
    users=cursor.fetchall()
    
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in users:
        json_data.append(dict(zip(row_headers,result)))
    connection.commit()
    cursor.close()
    
    
    return jsonify(json_data)


@app.route('/userdelete/<int:id>/<sec>/<int:year>/',methods=['DELETE'])
@app.route('/userdelete/<int:id>/<sec>/<int:year>',methods=['DELETE'])
@cross_origin()
def delete_project(id,sec,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    
    delete_query = "delete from pbst where batchno = %s and section=%s and year=%s"
    cursor.execute(delete_query, (id,sec,year))
    connection.commit()
    cursor.close()
    
    return jsonify({"message":"success deleted"})

@app.route('/reviewdelete/<int:id>/<sec>/<int:year>',methods=['DELETE'])
@cross_origin()
def delete_review(id,sec,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    
    delete_query = "delete from review where reviewid = %s and section=%s and year=%s"
    cursor.execute(delete_query, (id,sec,year,))
    connection.commit()
    cursor.close()
    
    return jsonify({"message":"success deleted"})

@app.route('/api/batchdelete/<id>/<sec>/<guide>/<int:year>',methods=['DELETE'])
@cross_origin()
def BatchDelete(id,sec,guide,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    getdeta = cursor.execute("select studentid from student where batchno = %s and section=%s and year=%s",(id,sec,year,))
    users = cursor.fetchall()
    print(users)
    connection.commit()

    delete_query = "delete from batch where batchid = %s and section=%s and year=%s"
    cursor.execute(delete_query, (id,sec,year,))
    connection.commit()
    section = ' '
    if sec == 'a':
        section = 'section_a'
    elif sec=='b':
        section='section_b'
    else:
        section='section_c'
    print(section)
    update_query = "UPDATE guide SET batch_1 = CASE WHEN batch_1 = %s THEN %s ELSE batch_1 END, batch_2 = CASE WHEN batch_2 = %s THEN %s ELSE batch_2 END where guidename=%s and %s is not null and year=%s;"
    cursor.execute(update_query,(id,0,id,0,guide,section,year,))
    connection.commit()
    
    for i in users:
        upd = cursor.execute("update student set batchno = %s where studentid = %s and section=%s and year=%s",(0,i[0],sec,year,))
        connection.commit()
    cursor.close()
    
    return jsonify({"message":"success deleted"})





@app.route('/api/guidemapping/',methods=['POST'])
@cross_origin()
def guideMapping():
    connection = get_db_connection()
    cursor = connection.cursor()

    column_name = request.json['selectedOption1']
    year = request.json['year']
    print(column_name)
    print(year)
    #column_name = str(column_name)

    print(column_name)
    if column_name=='a':
        #cursor.execute("UPDATE guide SET  batch_1 = COALESCE((SELECT batchid FROM batch WHERE guidename = guide.guidename and section = guide.section_a AND batchtype = 'custom' LIMIT 1), 0),batch_2 = COALESCE((SELECT batchid FROM batch WHERE guidename = guide.guidename AND batchtype = 'custom' LIMIT 1 OFFSET 1), 0);")
        cursor.execute("UPDATE guide SET batch_1 = COALESCE((SELECT batchid FROM batch WHERE section='a' and batchtype = 'custom'and  guidename = guide.guidename and year=guide.year and year = %s LIMIT 1), 0),batch_2 = COALESCE((SELECT batchid FROM batch WHERE section='a' and guidename = guide.guidename  and  batchtype = 'custom' and year=guide.year and year=%s LIMIT 1 OFFSET 1), 0) WHERE guide.section_a IS NOT NULL and guide.section_a > 0 and guide.year=%s;",(year,year,year,))

        
    elif column_name=='b':
        #cursor.execute("UPDATE guide SET  batch_1 = COALESCE((SELECT batchid FROM batch WHERE guidename = guide.guidename and section = guide.section_a AND batchtype = 'custom' LIMIT 1), 0),batch_2 = COALESCE((SELECT batchid FROM batch WHERE guidename = guide.guidename AND batchtype = 'custom' LIMIT 1 OFFSET 1), 0);")
        cursor.execute("UPDATE guide SET batch_1 = COALESCE((SELECT batchid FROM batch WHERE section='b' and guidename = guide.guidename AND batchtype = 'custom' and year=guide.year and year=%s LIMIT 1), 0),batch_2 = COALESCE((SELECT batchid FROM batch WHERE section='b' and guidename = guide.guidename  and  batchtype = 'custom' and year=guide.year and year=%s LIMIT 1 OFFSET 1), 0) WHERE guide.section_b IS NOT NULL and guide.section_b > 0  and guide.year=%s;",(year,year,year,))

    else:
        cursor.execute("UPDATE guide SET batch_1 = COALESCE((SELECT batchid FROM batch WHERE section='c' and guidename = guide.guidename AND batchtype = 'custom' and year=guide.year and year = %s LIMIT 1), 0),batch_2 = COALESCE((SELECT batchid FROM batch WHERE section='c' and guidename = guide.guidename  and  batchtype = 'custom' and year = guide.year and year=%s LIMIT 1 OFFSET 1), 0) WHERE guide.section_c IS NOT NULL and guide.section_c > 0  and guide.year=%s;",(year,year,year,))

    connection.commit()
    
    #batch_query = cursor.execute("select batchno,domain from pbst where section = %s;",(column_name,))
    batch_query = cursor.execute("select b.batchid,p.domain from pbst p,batch b where p.batchno=b.batchid and p.section=b.section and p.year=b.year and p.section = %s and b.guidename='dummy' and p.year=%s;",(column_name,year,))
    batch = cursor.fetchall()
    connection.commit()
    
    print(batch)
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in batch:
        json_data.append(dict(zip(row_headers,result)))

    print(json_data)
    guides = []
    batches= []
    ava =  {}
    json_data1=[]
    if column_name == 'a':
        if column_name:
            query = "select guidename,domains from guide where section_a is not null and section_a >0 and year=%s"
            guide_query = cursor.execute(query,(year,))
            guide = cursor.fetchall()
            connection.commit()
            row_headers1=[x[0] for x in cursor.description] #this will extract row headers
            for result in guide:
                json_data1.append(dict(zip(row_headers1,result)))
                
            batches = json_data
            guides = json_data1
            print(batches)
            print("")
            print(guides)
            avail = cursor.execute(" select guidename , case when batch_1 =0 and batch_2 =0 then 2 when batch_1=0 or batch_2 =0 then 1 else 0  end as cnt from guide where section_a is not null and section_a > 0 and year=%s group by guidename;",(year,))
            avail_guides = cursor.fetchall()
            connection.commit()
            ava = dict(avail_guides)
    elif column_name == 'b':
        if column_name:
            query = "select guidename,domains from guide where section_b is not null and section_b>0 and year=%s"
            guide_query = cursor.execute(query,(year,))
            guide = cursor.fetchall()
            connection.commit()
            row_headers1=[x[0] for x in cursor.description] #this will extract row headers
            for result in guide:
                json_data1.append(dict(zip(row_headers1,result)))
                
            batches = json_data
            guides = json_data1
            print(batches)
            print("")
            print(guides)
            avail = cursor.execute(" select guidename , case when batch_1 =0 and batch_2 =0 then 2 when batch_1=0 or batch_2 =0 then 1 else 0  end as cnt from guide where section_b is not null and section_b>0 and year=%s group by guidename;",(year,))
            avail_guides = cursor.fetchall()
            connection.commit()
            ava = dict(avail_guides)
    else:
        if column_name:
            query = "select guidename,domains from guide where section_c is not null and section_c >0 and year=%s"
            guide_query = cursor.execute(query,(year,))
            guide = cursor.fetchall()
            connection.commit()
            row_headers1=[x[0] for x in cursor.description] #this will extract row headers
            for result in guide:
                json_data1.append(dict(zip(row_headers1,result)))
                
                
            batches = json_data
            guides = json_data1
            print(batches)
            print("")
            print(guides)
            avail = cursor.execute(" select guidename , case when batch_1 =0 and batch_2 =0 then 2 when batch_1=0 or batch_2 =0 then 1 else 0  end as cnt from guide where section_c is not null and section_c>0 and year = %s group by guidename;",(year,))
            avail_guides = cursor.fetchall()
            connection.commit()
            ava = dict(avail_guides)
    for guide in json_data1:
            guide["domains"] = json.loads(guide["domains"])
            
    
    
    #print(ava)
    guide_batches = defaultdict(list)
    allocated_batches = set()
    
    for guide in guides:
        for domain in guide['domains']:
            for batch in batches:
                if batch['domain'] == domain and batch['batchid'] not in allocated_batches:
                    if ava[guide['guidename']] > 1 :
                        ava[guide['guidename']] -=1
                        guide_batches[guide['guidename']].append(batch['batchid'])
                        allocated_batches.add(batch['batchid'])
                        break
                    
    print("")
    print(ava)
    print()
    print(allocated_batches)
    
    print(guide_batches)
    
    def sort(dic):
        sorted_x = sorted(dic.items(), key=lambda kv: kv[1] ,reverse = True)
        sorted_di = dict(sorted_x)
        return sorted_di
    #print(sorted_x)
    sorted_dict = sort(ava)
    #print(sorted_dict)
    
    unallocated_batches = [batch['batchid'] for batch in batches if batch['batchid'] not in allocated_batches]
    print(unallocated_batches)
    
    for batch_id in unallocated_batches:
        sorted_ = sort(sorted_dict)
    
        for guide in sorted_:
        
        #print(sorted_dict[guide] , batch_id)
            if sorted_dict[guide] > 0 :
                sorted_dict[guide] -=1
                guide_batches[guide].append(batch_id)
                allocated_batches.add(batch_id)
                break
            
    for guide in guides:
        guide_name = guide['guidename']
        assigned_batches = guide_batches.get(guide_name, [])
        print(f"Guide: {guide_name}, Assigned Batches: {assigned_batches}")
    
    for guide in guide_batches:
        print(guide)
        assigned = guide_batches.get(guide, [])
        for i in assigned:
            print(f"Guide:{guide},Batch:{i}")
            upd_batc = cursor.execute("update batch set guidename=%s where batchid = %s and section=%s and year=%s",(guide,i,column_name,year,))
            cursor.execute("update guide set batch_2 = %s where batch_1 !=0 and batch_2 = 0 and guidename=%s and year=%s",(i,guide,year,))

            cursor.execute("update guide set batch_1 = %s where batch_1 = 0 and guidename = %s and year=%s",(i,guide,year,))
            
    
    connection.commit()
            
    
    
    cursor.close()
    
    return jsonify({"Batches":batches,"Guides":guides})
    #return jsonify("sucess")



@app.route('/api/group/',methods=['GET'])
@cross_origin()
def group():
    connection = get_db_connection()
    cur = connection.cursor()
    cur.execute("select studentid,cgpa from student where section='b'")
    user = cur.fetchall()
    print(user)
    connection.commit()
    cur.close()
    return jsonify(user)




    
@app.route('/api/review_sch/', methods=['POST'])
@cross_origin()
def save_date():
    #data = request.get_json() # Assuming the date is sent as a JSON object
    #review_no = data.get('reviewno')
    #date = data.get('date')    # Extracting the date from the JSON data
    #sec = data.get('sec')
    #reviewmode = data.get('reviewmode')
    #reviewdesc = data.get('reviewdescription')
    #year = data.get('year')
    
    review_no = request.form.get('reviewno')
    date = request.form.get('date')
    sec = request.form.get('sec')
    reviewmode = request.form.get('reviewmode')
    reviewdesc = request.form.get('reviewdescription')
    year = request.form.get('year')
    file= request.files['file']
    content = base64.b64encode(file.read())
    print(year)
    #review_no = int(review_no)
    #sec = sec.lower()
    print(review_no)
    print(date)
    try:
        connection = get_db_connection()
        cur = connection.cursor()
        # Inserting the date into the database
        cur.execute("INSERT INTO review (reviewid,reviewdate,section,reviewmode,reviewdescription,year,name,file) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)", (review_no,date,sec,reviewmode,reviewdesc,year,file.filename,content,))
        connection.commit()
        cur.close()
        return jsonify({'message': 'Date inserted successfully'}),200
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}),401
    
@app.route('/api/review_update/', methods=['PUT'])
@app.route('/api/review_update', methods=['PUT'])
@cross_origin()
def update_rev():
    #data = request.get_json() # Assuming the date is sent as a JSON object
    #review_no = data.get('reviewno')
    #date = data.get('date')    # Extracting the date from the JSON data
    #sec = data.get('sec')
    #reviewmode = data.get('reviewmode')
    #reviewdesc = data.get('reviewdescription')
    #year = data.get('year')
    
    review_no = request.form.get('reviewno')
    date = request.form.get('date')
    sec = request.form.get('sec')
    reviewmode = request.form.get('reviewmode')
    reviewdesc = request.form.get('reviewdescription')
    year = request.form.get('year')
    file= request.files['file']
    content = base64.b64encode(file.read())
    print(year)
    #review_no = int(review_no)
    #sec = sec.lower()
    print(review_no)
    print(date)
    print()
    try:
        connection = get_db_connection()
        cur = connection.cursor()
        # Inserting the date into the database
        cur.execute("update review set reviewmode=%s,reviewdescription=%s,reviewdate=%s,name=%s,file=%s where reviewid=%s and section=%s and year=%s", (reviewmode,reviewdesc,date,file.filename,content,review_no,sec,year))
        connection.commit()
        cur.close()
        return jsonify({'message': 'Date updated successfully'}),200
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}),401

@app.route('/api/review-numbers/<int:year>/<sec>',methods=['GET'])
@cross_origin()
def get_review_numbers(year,sec):
    # Replace this with your logic to fetch the review numbers
    
    connection = get_db_connection()
    cur = connection.cursor()
    cur.execute("select distinct reviewid from review where year=%s and section=%s",(year,sec,))
    review_numbers = cur.fetchall()
    connection.commit()
    batch_numbers = [row[0] for row in review_numbers]
    cur.close()
    connection.close()
    
    # Return the review numbers as JSON
    return jsonify(batch_numbers)

@app.route('/api/review-numbers/<int:year>/<sec>',methods=['GET'])
@cross_origin()
def review_numbers(year,sec):
    # Replace this with your logic to fetch the review numbers
    
    connection = get_db_connection()
    cur = connection.cursor()
    cur.execute("select distinct reviewid from review where year=%s and section=%s",(year,sec,))
    review_numbers = cur.fetchall()
    connection.commit()
    batch_numbers = [row[0] for row in review_numbers]
    cur.close()
    connection.close()
    
    # Return the review numbers as JSON
    return jsonify(batch_numbers)

def model(scores):
    df = pd.read_csv('synthetic_dataset.csv')
    data = df
    print(data.columns)  # Print the columns for inspection

    # Use all columns except 'id', 'title', 'description', 'status', and 'Overall Score'
    X = data.drop(['id','status', 'Overall Score'], axis=1)
    y = data['Overall Score']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LinearRegression()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    rmse = sqrt(mean_squared_error(y_test, y_pred))
    print(f"Root Mean Squared Error on Test Data: {rmse}")
    '''
    scores = {
        'Creativity': int(input("Rate 'Creativity' (1-5): ")),
        'Technical Skills': int(input("Rate 'Technical Skills' (1-5): ")),
        'Project Management': int(input("Rate 'Project Management' (1-5): ")),
        'Documentation': int(input("Rate 'Documentation' (1-5): ")),
        'Presentation': int(input("Rate 'Presentation' (1-5): "))
    }'''

    input_data = [[scores['creativity'], scores['technicalskills'],
                   scores['projectmanagement'], scores['documentation'], scores['presentation']]]

    overall_score = model.predict(input_data)[0]
    print(f"Predicted Overall Score: {overall_score:.2f}")
    return overall_score



'''
@app.route('/api/submit-form', methods=['POST'])
@cross_origin()
def submit_form():
    conn = get_db_connection()
    cursor = conn.cursor()
    data = request.json
    batchno = data.get('batchNo')
    print(batchno)
    sec = data.get('sec')
    reviewno = data.get('selectedReviewNumber')
    role = data.get('role')
    year = data.get('year')
    print(role)
    print(reviewno)
    
    print(sec)
    print(year)
    
    # Assuming your MySQL table is named 'students'
    
    
    
    query = "insert into rev (year,section,batchno,creativity,presentation,name,technicalskills,projectmanagement,documentation,Overall,role,reviewno) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    #query2 = "update batch set status='reviewed' where batchno = %s and section=%s"
    #cursor.execute(query,(batchno,sec)) 
    cr = []
    tech=[]
    prmng=[]
    docm = []
    pr = []
    for student in data['students']:
        
        values = (year,sec,batchno,student['creativity'], student['presentation'], student['name'],student['technicalskills'],student['projectmanagement'],student['documentation'])
        cr.append(int(student['creativity']))
        tech.append(int(student['technicalskills']))
        prmng.append(int(student['projectmanagement']))
        docm.append(int(student['documentation']))
        pr.append(int(student['presentation']))
        
        scores={'creativity': int(student['creativity']),
        'technicalskills':int(student['technicalskills']),
        'projectmanagement':int(student['projectmanagement']),
        'documentation': int(student['documentation']),
        'presentation': int(student['presentation'])}
        ov_sc_st = model(scores)
        print(ov_sc_st)
        values = values+(ov_sc_st,)
        values = values+(role,)
        values=values+(reviewno,)
        cursor.execute(query, values)
        
    scores={
        'creativity': mean(cr),
        'technicalskills':mean(tech) ,
        'projectmanagement': mean(prmng),
        'documentation': mean(docm),
        'presentation': mean(pr)
    }
    
    print(scores)
    
    ov_sc_bt = model(scores)
    print(ov_sc_bt)
    #cursor.execute("update batch set  review_score=%s where  batchid=%s and section=%s",(ov_sc_bt,batchno,sec))
    
    print(cr)
    print(tech)
    print(prmng)
    print(docm)
    print(pr)
    conn.commit()
    
    
    cursor.close()
    conn.close()
    return jsonify({'message': 'Data stored successfully'})
'''



@app.route('/api/submit-form', methods=['POST'])
@cross_origin()
def submit_form():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        data = request.json
        batchno = data.get('batchNo')
        sec = data.get('sec')
        reviewno = data.get('selectedReviewNumber')
        role = data.get('role')
        year = data.get('year')
        
        query = "insert into rev (year,section,batchno,creativity,presentation,name,technicalskills,projectmanagement,documentation,Overall,role,reviewno) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        
        cr = []
        tech=[]
        prmng=[]
        docm = []
        pr = []
        
        for student in data['students']:
            values = (year, sec, batchno, student['creativity'], student['presentation'], student['name'], student['technicalskills'], student['projectmanagement'], student['documentation'])
            cr.append(int(student['creativity']))
            tech.append(int(student['technicalskills']))
            prmng.append(int(student['projectmanagement']))
            docm.append(int(student['documentation']))
            pr.append(int(student['presentation']))
            
            scores = {
                'creativity': int(student['creativity']),
                'technicalskills': int(student['technicalskills']),
                'projectmanagement': int(student['projectmanagement']),
                'documentation': int(student['documentation']),
                'presentation': int(student['presentation'])
            }
            ov_sc_st = model(scores)
            values = values + (ov_sc_st,)
            values = values + (role,)
            values = values + (reviewno,)
            cursor.execute(query, values)
        
        scores = {
            'creativity': mean(cr),
            'technicalskills': mean(tech),
            'projectmanagement': mean(prmng),
            'documentation': mean(docm),
            'presentation': mean(pr)
        }
        
        ov_sc_bt = model(scores)
        print(ov_sc_bt)
        print(cr)
        print(tech)
        print(prmng)
        print(docm)
        print(pr)
        conn.commit()
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({'message': 'Data stored successfully'})
    except mysql.connector.errors.IntegrityError as e:
        # If the error is due to a duplicate entry, handle it appropriately
        return jsonify({'error': 'Duplicate entry found'}), 400
    except Exception as e:
        # Handle other exceptions
        return jsonify({'error': str(e)}), 500


# New Flask route to get student data
@app.route('/api/get-students', methods=['GET'])
@cross_origin()
def get_students():
    # Assuming your MySQL table is named 'students'
    conn = get_db_connection()
    cursor = conn.cursor()
    
    batchno = request.args.get('batchno', '')
    sec = request.args.get('sec', '')
    year = request.args.get('year')
    cursor = conn.cursor()
    # Assuming your MySQL table is named 'students'
    query = "SELECT studentid FROM student WHERE batchno = %s AND section = %s and year=%s"
    
    cursor.execute(query, (batchno, sec,year,))
    result = cursor.fetchall()
    conn.commit()

    students = [{'name': row[0]} for row in result]
    
    cursor.close()
    conn.close()
    return jsonify({'students': students})

@app.route('/api/get-batch-numbers', methods=['GET'])
@cross_origin()
def get_batch_numbers_faculty():
    # Assuming your MySQL table is named 'students' and contains a 'batchno' column
    conn = get_db_connection()
    cursor = conn.cursor()
    sec = request.args.get('sec', '')
    year = request.args.get('year')
    query = "SELECT DISTINCT batchno FROM student where section=%s and year=%s"

    cursor.execute(query,(sec,year,))
    result = cursor.fetchall()
    conn.commit()
    batch_numbers = [row[0] for row in result]
    cursor.close()
    conn.close()

    return jsonify({'batch_numbers': sorted(batch_numbers)})

@app.route('/api/get-batch-numbers-faculty', methods=['GET'])
@cross_origin()
def get_batch_numbers():
    # Assuming your MySQL table is named 'students' and contains a 'batchno' column
    conn = get_db_connection()
    cursor = conn.cursor()
    guide = request.args.get('guide')
    sec = request.args.get('sec', '')
    year=request.args.get('year')
    print(guide)
    query = "SELECT DISTINCT batchid FROM batch where section=%s and guidename=%s and year=%s"

    cursor.execute(query,(sec,guide,year,))
    result = cursor.fetchall()
    conn.commit()
    batch_numbers = [row[0] for row in result]
    cursor.close()
    conn.close()

    return jsonify({'batch_numbers': sorted(batch_numbers)})

@app.route('/api/get-guide', methods=['GET'])
@cross_origin()
def get_guide():
    user_role = request.args.get('role')
    username = request.args.get('username')
    password=request.args.get('password')
    year = request.args.get('year')

    # You can replace this logic with your own to determine the guide based on the user's role
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("select name from logins where role=%s and username=%s and password = %s and year=%s",(user_role,username,password,year,))
    res = cursor.fetchall()
    conn.commit()
    cursor.close()
    return jsonify(res[0])

@app.route('/top-rank-students/<int:year>',methods=['GET'])
@cross_origin()
def get_top_rank_students(year):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("update batch join (select *,sum(btc)/count(batchno)as cnt from(select *,sum(ov) / count(batchno) as btc from(select name,batchno,section,reviewno,sum(Overall div 2) as ov from rev group by name,reviewno,batchno)sb group by batchno,reviewno)tr group by batchno)t2 on batch.batchid=t2.batchno set batch.review_score=t2.cnt where t2.section=batch.section;")
    conn.commit()
    cursor.execute("select s.studentid from student s,(select * from batch order by review_score desc limit 3)b where s.batchno=b.batchid and s.section=b.section and s.year=b.year and s.year=%s",(year,))
    res = cursor.fetchall()
    res = [row[0] for row in res]
    print(res)
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"top_rank_students":res}), 200



def get_student(student,year):
    conn = get_db_connection()
    cursor = conn.cursor()
    #cursor.execute("update batch join (select *,sum(btc)/count(batchno)as cnt from(select *,sum(ov) / count(batchno) as btc from(select name,batchno,section,reviewno,sum(Overall div 2) as ov from rev  group by name,reviewno,batchno)sb group by batchno,reviewno)tr group by batchno)t2 on batch.batchid=t2.batchno set batch.review_score=t2.cnt where t2.section=batch.section;")
    #conn.commit()
    #cursor.execute("select s.studentid,s.batchno,b.review_score from student s,( select * from batch order by review_score desc limit 3) b where b.batchid = s.batchno and b.section=s.section and s.studentid=%s;",(student,))
    cursor.execute("select s.studentid,s.batchno,b.review_score,b.rank from student s,(select *,ROW_NUMBER() OVER(order by review_score desc) as 'rank' from batch limit 3) b where b.batchid = s.batchno and b.section=s.section and b.year=s.year and s.studentid=%s and s.year=%s",(student,year,))
    students = cursor.fetchall()
    conn.commit()
    print(students)
    print(students)
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in students:
        json_data.append(dict(zip(row_headers,result)))
    print(json_data)
    conn.commit()
    cursor.close()
    conn.close()
    return json_data
    

def generate_certificate(student_data, output_path):
    # Create a PDF canvas
    pdf_canvas = canvas.Canvas(output_path, pagesize=letter)
    background_color=(0.9607843137254902, 0.9607843137254902, 0.8627450980392157)
    pdf_canvas.setFillColorRGB(*background_color)
    # Set up certificate design
    pdf_canvas.setStrokeColorRGB(0.7215686274509804, 0.5254901960784314, 0.043137254901960784)  # Black color for borders
    pdf_canvas.setLineWidth(1)
    # Draw borders
    pdf_canvas.rect(47, 46, 506, 708)
    pdf_canvas.setStrokeColorRGB(0.7215686274509804, 0.5254901960784314, 0.043137254901960784)  # Black color for borders
    pdf_canvas.setLineWidth(1)
    # Draw borders
    pdf_canvas.rect(50, 50, 500, 700)
    # Write content to the certificate
    pdf_canvas.setFont("Helvetica", 30)
    color = (0.8549, 0.6471, 0.1255)
    pdf_canvas.setFillColorRGB(*color)
    pdf_canvas.drawString(120, 630, f"Certificate Of Achievement")
    pdf_canvas.setFont("Helvetica", 15)
    color = (0, 0, 0)
    pdf_canvas.setFillColorRGB(*color)
    pdf_canvas.drawString(165, 570, f"This Certificate is Proudly Presented to  ")
    color = (0, 0, 1)
    pdf_canvas.setFillColorRGB(*color)
    pdf_canvas.setFont("Times-Italic", 30)
    pdf_canvas.drawString(150, 530, f"{student_data['Student Name']}")
    color = (0, 0, 0)
    pdf_canvas.setFillColorRGB(*color)
    pdf_canvas.setFont("Helvetica", 12)
    pdf_canvas.drawString(80, 500, f"This Certificate is given to {student_data['Student Name']} Of batch {student_data['Batch No']} for her top performance")
    pdf_canvas.drawString(80, 485,f"by  securing  {student_data['Rank']} rank   ")
    # pdf_canvas.drawString(80, 470,f"  in computer science and engineering")
    pdf_canvas.save()
    
    
@app.route('/generate-certificate', methods=['POST'])
@cross_origin()
def generate():
    username = request.json.get('username')
    print(username)
    
    year = request.json.get('year')
    print(year)
    user1 = get_student(username,year)
    print("user1 is")
    print(user1)
    
    user = user1[0]
    
    
    student_data = {
        'Batch No':user['batchno'],
        'Student Name':user['studentid'],
        'Marks':user['review_score'],
        'Rank':user['rank']
        
    }
    print(student_data)
    output_path = f"certificate_batch{student_data['Batch No']}_{student_data['Student Name']}.pdf"
    generate_certificate(student_data, output_path)
    #return send_file(output_path, as_attachment=True)
    #return "success"
    return send_file(output_path, as_attachment=True)



@app.route('/profile/<studentid>/<int:year>', methods=['GET'])
@app.route('/profile/<studentid>/<int:year>/', methods=['GET'])
@cross_origin()
def profile(studentid,year):
    print(year)
    conn = get_db_connection()
    cursor = conn.cursor()
    print(studentid)
    cursor.execute("select s.*,lg.email from logins lg,(select studentid,concat(first_name,last_name) as fullname,phn,batchno,section,year from student where studentid=%s and year=%s)s  where lg.username=s.studentid and lg.year=s.year and lg.username=%s and lg.year=%s",(studentid,year,studentid,year,))
    student = cursor.fetchone()
    conn.commit()
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    print(student)
    json_data=dict(zip(row_headers, student))
    student_data_ordered = {
            "studentid": student[0],
            "email": student[6],
            "fullname": student[1],
            "phn": student[2],
            "batchno": student[3],
            "section": student[4],
            "year":student[5]
        }
    
    
    print(student)
    if student:
        if json_data['batchno'] is not None :
            sec = student[4]
            batchno = student[3]
            sql_query_2 = "select * from pbst where batchno=%s and section=%s and year=%s"
            cursor.execute(sql_query_2,(batchno,sec,year,))
            project = cursor.fetchone()
            print(project)
            
            if project:
                row_headers1=[x[0] for x in cursor.description] #this will extract row headers
                json_data1=dict(zip(row_headers1,project))
                json_data['projects'] = json_data1
                print(project)
                conn.commit()
                cursor.close()
                print(student_data_ordered)
                return jsonify({"Student":student_data_ordered,"project":json_data1})
            else:
                return jsonify({"Student":student_data_ordered,"project":[]})
        else:
            return jsonify({"Student":student_data_ordered,"project":[]})
        #return jsonify({"Student":student_data_ordered,"project":json_data1})
    else:
        conn.close()  # Close the connection if no student is found
        return jsonify({"error": "Student not found"}), 404
        




@app.route('/facultyprofile/<facultyid>/<int:year>', methods=['GET'])
@app.route('/facultyprofile/<facultyid>/<int:year>/', methods=['GET'])
@cross_origin()
def Facultyprofile(facultyid,year):
    print(year)
    conn = get_db_connection()
    cursor = conn.cursor()
    print(facultyid)
    cursor.execute("select * from logins l,guide g where l.name=g.guidename and l.year=g.year and l.year=%s and l.username=%s;",(year,facultyid))
    faculty = cursor.fetchone()
    conn.commit()
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    print(faculty)
    json_data=dict(zip(row_headers,faculty))
    if json_data.get('domains'):
        json_data['domains'] = json_data['domains'] = ', '.join(json.loads(json_data['domains']))
    
    combined_sections = []
    if json_data.get('section_a') == 1:
        combined_sections.append('a')
    if json_data.get('section_b') == 1:
        combined_sections.append('b')
    json_data['sections'] = ', '.join(combined_sections)

    # Removing individual section fields
    json_data.pop('section_a', None)
    json_data.pop('section_b', None)
    json_data.pop('section_c', None)
    combined_batches = []
    if json_data.get('batch_1') != 0:
        combined_batches.append(str(json_data['batch_1']))
    if json_data.get('batch_2') != 0:
        combined_batches.append(str(json_data['batch_2']))
    json_data['batches'] = ', '.join(combined_batches)
        
  
    
    print(faculty)
    
    projects = []
    for section in combined_sections:
        for batch in combined_batches:
            cursor.execute("SELECT * FROM pbst WHERE section = %s AND batchno = %s AND year = %s;", (section, batch, year))
            projects += cursor.fetchall()

    # Extract project details
    project_list = []
    for project in projects:
        project_data = dict(zip([x[0] for x in cursor.description], project))
        project_list.append(project_data)

    json_data['projects'] = project_list
    conn.commit()
    cursor.close()
      
        
        
        
        
    return jsonify({"Student":json_data})
    
        
      
    
def extract_text_from_pdf(pdf_data):
    text = ""
    reader = PyPDF2.PdfReader(pdf_data)
    for page in reader.pages:
        text += page.extract_text()
    return text
    

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_document():
    conn = get_db_connection()
    cursor = conn.cursor()
    file = request.files['file']
    content = base64.b64encode(file.read())
    cursor.execute("INSERT INTO document(name, file) VALUES (%s, %s)", (file.filename,content))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Document uploaded successfully'})


@app.route('/uploaddocumentproject/<int:year>/<section>/<int:batchno>/', methods=['POST'])
@cross_origin()
def upload_project_document(year,section,batchno):
    conn = get_db_connection()
    cursor = conn.cursor()
    file = request.files['file']
    content = base64.b64encode(file.read())
    cursor.execute("INSERT INTO document(name, file,year,section,batchno) VALUES (%s, %s,%s,%s,%s)", (file.filename,content,year,section,batchno,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Document uploaded successfully'})

@app.route('/api/num_documents/<int:year>/<section>/<int:batchno>/', methods=['GET'])
@cross_origin()
def num_documents(year,section,batchno):
    connection=get_db_connection()
    cursor = connection.cursor()
    
    cursor.execute("select id,batchno,year,section,name from document where year=%s and section=%s and batchno=%s",(year,section,batchno,))
    documents = cursor.fetchall()
    connection.commit()
    columns = [col[0] for col in cursor.description]

    # Construct list of dictionaries with column names and row values
    data_with_columns = [{columns[i]: row[i] for i in range(len(columns))} for row in documents]

    # Close cursor and connection
    cursor.close()
    connection.close()
    print("data")
    print(data_with_columns)
    return jsonify(data_with_columns)
    


@app.route('/download/<int:file_id>')
def download_file(file_id):
    try:
        connection=get_db_connection()
        cursor = connection.cursor()
        query = "SELECT name, file FROM document WHERE id = %s"
        cursor.execute(query, (file_id,))
        file_data = cursor.fetchone()
        cursor.close()
        decoded_data = base64.b64decode(file_data[1])
        file_stream = BytesIO(decoded_data)
        file_stream.seek(0)  # Reset the file pointer to the beginning
        return send_file(file_stream, download_name=file_data[0], as_attachment=True)
        
    except Error as e:
        print('Error:', e)
        return 'Error downloading file'
    
@app.route('/downloadrev/<int:file_id>/<int:year>/<sec>')
@cross_origin()
def download_file_rev(file_id,year,sec):
    try:
        connection=get_db_connection()
        cursor = connection.cursor()
        query = "SELECT name, file FROM review WHERE reviewid = %s and year=%s and section=%s"
        cursor.execute(query, (file_id,year,sec,))
        file_data = cursor.fetchone()
        connection.commit()
        cursor.close()
        decoded_data = base64.b64decode(file_data[1])
        file_stream = BytesIO(decoded_data)
        file_stream.seek(0)  # Reset the file pointer to the beginning
        return send_file(file_stream, download_name=file_data[0], as_attachment=True)
        
    except Error as e:
        print('Error:', e)
        return 'Error downloading file'
    
@app.route('/downloadproject/<int:id>/<int:year>/<section>/<int:batchno>')
@cross_origin()
def download_file_project(id,year,section,batchno):
    try:
        connection=get_db_connection()
        cursor = connection.cursor()
        query = "SELECT name, file FROM document WHERE id = %s and year=%s and section=%s and batchno=%s"
        cursor.execute(query, (id,year,section,batchno))
        file_data = cursor.fetchone()
        cursor.close()
        decoded_data = base64.b64decode(file_data[1])
        file_stream = BytesIO(decoded_data)
        file_stream.seek(0)  # Reset the file pointer to the beginning
        return send_file(file_stream, download_name=file_data[0], as_attachment=True)
        
    except Error as e:
        print('Error:', e)
        return 'Error downloading file'
    

@app.route('/submit_feedback', methods=['POST'])
@cross_origin()
def submit_feedback():
    data = request.json
    name = data['name']
    email = data['email']
    subject = data['subject']
    message = data['message']
    connection=get_db_connection()
    cursor = connection.cursor()
    query = "insert into feedback(name,email,subject,message) values(%s,%s,%s,%s)"
    cursor.execute(query, (name,email,subject,message,))
    connection.commit()
    cursor.close()
    msg = Message(subject, recipients=['ushasrikande@gmail.com'])
    msg.body = f"Name: {name}\nEmail: {email}\nMessage: {message}"
    mail.send(msg)

    return jsonify({'message': 'Feedback submitted successfully'})


@app.route('/api/facultybatches/<username>/<int:year>',methods=['GET'])
@cross_origin()
def Faculty_batches_marks(username, year):
    connection = get_db_connection()
    cursor = connection.cursor()
   
    cursor.execute("SELECT name FROM logins WHERE username = %s AND year = %s", (username, year))
    guidename_row = cursor.fetchone()
    if guidename_row is None:
        cursor.close()
        connection.close()
        print("no record")
        return jsonify({"error": "No guide found for the given username and year"})
    
    guidename = guidename_row[0]
    
    print(guidename)
    
    cursor.execute("SELECT * FROM batch WHERE guidename = %s AND year = %s", (guidename, year))
    rows = cursor.fetchall()

    
    
    print(rows)
    if not rows:
        return jsonify({"error": "No batches found for the given username and year"})
    
    cursor.execute("select * from student s,batch b where b.batchid=s.batchno and b.section=s.section and s.year=b.year and b.guidename=%s and b.year=%s",(guidename,year,))
    students = cursor.fetchall()
    
  
    connection.commit()
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in students:
        json_data.append(dict(zip(row_headers,result)))
        
    print(json_data)    
    json_data = sorted(json_data, key=lambda x: x['batchid'])
    print(json_data)
    batches = {}
    for student in json_data:
        batch_id = student["batchid"]
        guide_name = student["guidename"]
        year=student['year']
        if batch_id not in batches:
            batches[batch_id] = {"batchNumber": f"{batch_id}","guidename":f"{guide_name}","year":f"{year}","students": []}
        batches[batch_id]["students"].append(student)
    print()
    print(batches)
    # Convert batches dictionary to a list
    batch_list = [batch for _, batch in batches.items()]
        
    cursor.close()
    #print(users)
    
    return jsonify({"groups":batch_list})
    
    
@app.route('/api/adminbatches/<section>/<int:year>',methods=['GET'])
@cross_origin()
def Admin_batches_marks(section, year):
    connection = get_db_connection()
    cursor = connection.cursor()
   
    
    cursor.execute("SELECT * FROM batch WHERE section = %s AND year = %s", (section, year))
    rows = cursor.fetchall()

    
    
    print(rows)
    if not rows:
        return jsonify({"error": "No batches found for the given section and year"})
    
    cursor.execute("select * from student s,batch b where b.batchid=s.batchno and b.section=s.section and s.year=b.year and b.section=%s and b.year=%s",(section,year,))
    students = cursor.fetchall()
    
  
    connection.commit()
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    
    json_data=[]
    for result in students:
        json_data.append(dict(zip(row_headers,result)))
        
    print(json_data)    
    json_data = sorted(json_data, key=lambda x: x['batchid'])
    print(json_data)
    batches = {}
    for student in json_data:
        batch_id = student["batchid"]
        guide_name = student["guidename"]
        year=student['year']
        if batch_id not in batches:
            batches[batch_id] = {"batchNumber": f"{batch_id}","guidename":f"{guide_name}","year":f"{year}","students": []}
        batches[batch_id]["students"].append(student)
    print()
    print(batches)
    # Convert batches dictionary to a list
    batch_list = [batch for _, batch in batches.items()]
        
    cursor.close()
    #print(users)
    
    return jsonify({"groups":batch_list})
        

@app.route('/api/getfacultystudentrev/<int:reviewno>/<section>/<int:year>/<name>/<role>/',methods=['GET'])
@cross_origin()
def faculty_student_Review(reviewno,year,section,name,role):
    connection = get_db_connection()
    cursor = connection.cursor()
    
    cursor.execute("select Overall from rev where name=%s  and reviewno=%s and year=%s and role=%s and section=%s",(name,reviewno,year,role,section,))
    std = cursor.fetchone()
    connection.commit()
    cursor.close()
    if std is not None:  # If a row is found
        std_value = std[0]  # Extract the value from the fetched row
        print(std_value)
        return jsonify(std_value)
    else:  # If no row is found
        return jsonify(0)
    


@app.route("/api/get_student_data/<username>/<int:year>/",methods=['GET'])
@cross_origin()
def get_student_data(username,year):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT name FROM logins WHERE username = %s AND year = %s", (username, year))
    guidename_row = cursor.fetchone()
    if guidename_row is None:
        cursor.close()
        connection.close()
        print("no record")
        return jsonify({"error": "No guide found for the given username and year"})
    
    guidename = guidename_row[0]
    
    print(guidename)
    
    query = """
        SELECT s.studentid, s.year, s.section, s.batchno, 
               JSON_ARRAYAGG(JSON_OBJECT('reviewno', r.reviewno, 'data', r.Overall)) as reviews,
               b.batchid, b.section, b.guidename, b.batchtype, b.review_score, b.status
        FROM student s
        JOIN rev r ON s.studentid = r.name AND s.year = r.year AND s.section = r.section
        JOIN batch b ON s.year = b.year AND s.section = b.section AND s.batchno = b.batchid
        WHERE s.section = 'b' and b.guidename=%s and b.year=%s
        GROUP BY s.studentid, s.year, s.section, s.batchno, b.batchid
        ORDER BY s.batchno, s.studentid
    """

    cursor.execute(query,(guidename,year,))
    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(results)


@app.route('/api/get_faculty_rev_numbers/<int:year>',methods=['GET'])
@cross_origin()
def Faculty_review_numbers(year):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("select reviewid from review where year=%s and section = 'c' ",(year,))
    reviews = cursor.fetchall()
    
    
    connection.commit()
    cursor.close()
    return jsonify({'review_numbers': [review[0] for review in reviews]})
    
if __name__ == '__main__':
    
    app.run(debug=True)
    
