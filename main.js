const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Variable to store user's message
const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;
const opcao = document.querySelector(".opcao");

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    //caso a classe seja outgoing, terá apenas o parágrafo, e caso seja incoming terá o ícone incluso
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message; //elemento parágrafo armazena a mensagem
    return chatLi; // return chat <li> element
}

const createChatUl = (opcoes) => {
    //let qtdOpcoes = 6;
    const chatUl = document.createElement("ul");
    chatUl.classList.add("listaOpcoes");
    
    const op = document.createElement("li");
    const bt = document.createElement("button");
    bt.value = "QuandoProcurarUBS"
    bt.textContent = "Quando devo procurar uma UBS?"
    bt.classList.add("opcao")

    op.appendChild(bt)
    chatUl.appendChild(op)
    return chatUl
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");
    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }
    // Send POST request to API, get response and set the response as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Ops! Algo deu errado. Tente novamente.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}
const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;
    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}
chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

const ExibirMsg = (intencao, descricao) => {
    let texto = "teste";
    console.log(intencao)
    switch (intencao) {
        case "ExibirFAQ":
            texto = "Aqui estão algumas perguntas comumente realizadas. Você pode selecionar algumas das opções abaixo caso se identifique com alguma dúvida.";
            break;
    }
    //return msg;
    chatbox.appendChild(createChatLi(descricao, "outgoing")); //mostrar opção selecionada do usuário
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        //generateResponse(incomingChatLi);
        const msgElem = incomingChatLi.querySelector("p");
        msgElem.textContent = texto;
        
        const chatUl = createChatUl([""])
        chatbox.appendChild(chatUl)

        chatbox.scrollTo(0, chatbox.scrollHeight); //conversa mais recente
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
opcao.addEventListener("click", () => {ExibirMsg(opcao.value, opcao.textContent.trim())});