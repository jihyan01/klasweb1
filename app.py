# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')  
   
    if user_message.lower() == "안녕하세요":
        bot_response = "안녕하세요! 무엇을 도와드릴까요?"
    else:
        bot_response = f"'{user_message}' 라고 말씀하셨군요. 아직 학습 중이에요."
    return jsonify({'response': bot_response}) 

if __name__ == '__main__':
    app.run(debug=True)

