document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");
  
    sendButton.addEventListener("click", function () {
      const userMessage = userInput.value.trim();
      if (!userMessage) return;
  
      // 사용자 메시지를 채팅창에 추가
      addMessageToChat("You", userMessage);
      userInput.value = "";
  
      // 서버로 메시지 보내기
      fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })
        .then((response) => response.json())
        .then((data) => {
          // 서버의 응답을 채팅창에 추가
          addMessageToChat("Bot", data.response);
        })
        .catch((error) => {
          console.error("Error:", error);
          addMessageToChat("Bot", "오류가 발생했습니다. 다시 시도해주세요.");
        });
    });
  
    function addMessageToChat(sender, message) {
      const messageDiv = document.createElement("div");
      messageDiv.textContent = `${sender}: ${message}`;
      chatWindow.appendChild(messageDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight; // 스크롤 자동으로 아래로 이동
    }
  });
  