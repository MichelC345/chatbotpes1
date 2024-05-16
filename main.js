const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Variable to store user's message
const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;
const opcaohtml = document.querySelectorAll(".opcao-html");
//import * as control from "./controlador.js"

class Opcao {
    constructor (desc, intencao) {
        this.desc = desc
        this.intencao = intencao
    }
}

const initOpcoes = (descricoes, intencoes, qtd) => {
    let ops = [], i = 0
    while (i < qtd) {
        ops.push(new Opcao(descricoes[i], intencoes[i]))
        i++
    }

    return ops
}

class Mensagem {
    constructor (texto, opcoes) {
        this.texto = texto
        this.listaOpcoes = opcoes
    }
}

const GetMsgInicial = () => {
    let desc = [
        "Perguntas frequentes",
        "Verificar horários de atendimento em uma UBS",
        "Sobre a vacinação",
        "Cartão SUS (CNS)",
        "Sobre as consultas"
    ]
    let intenc = [
        "ExibirFAQ",
        "ConsultarHorarioUBS",
        "SobreVacinacao",
        "SobreCartaoSUS",
        "SobreConsultas"
    ]
    let opcoes = initOpcoes(desc, intenc, 5)
    return new Mensagem("Olá! Sou o assistente virtual do SUS. Como posso ajudar?", opcoes)
}

const GetMsgFAQ = () => {
    let desc = [
        "Quando devo procurar uma UBS?",
        "Quando devo procurar uma UPA?",
        "Quais os horários de atendimento?",
        "Diante de uma urgência/emergência para quem devo ligar?",
        "Como ver meus resultados de exames?",
        "Retornar"
    ]
    let intenc = [
        "QuandoProcurarUBS",
        "QuandoProcurarUPA",
        "InfoBreveHorarios",
        "UrgenciaEmergencia",
        "InfoResultadosExames",
        "ExibirMsgInicial",
    ]
    let opcoes = initOpcoes(desc, intenc, 6)
    return new Mensagem("Aqui estão algumas perguntas comumente realizadas. Você pode selecionar algumas das opções abaixo caso se identifique com alguma dúvida", opcoes)
}

const GetMsgHorarioUBS = () => {
    let desc = [
        "Quando devo procurar uma UBS?",
        "Quando devo procurar uma UPA?",
        "Quais os horários de atendimento?",
        "Diante de uma urgência/emergência para quem devo ligar?",
        "Como ver meus resultados de exames?",
        "Retornar"
    ]
    let intenc = [
        "QuandoProcurarUBS",
        "QuandoProcurarUPA",
        "InfoBreveHorarios",
        "UrgenciaEmergencia",
        "ComoVacinar",
        "ExibirMsgInicial",
    ]
    let opcoes = initOpcoes(desc, intenc, 6)
    return new Mensagem("Aqui estão algumas perguntas comumente realizadas. Você pode selecionar algumas das opções abaixo caso se identifique com alguma dúvida", opcoes)
}

const GetMsgVacinacao = () => {
    let desc = [
        "Como me vacinar?",
        "Como posso obter meu histórico de vacinação?",
        "Retornar"
    ]
    let intenc = [
        "ComoVacinar",
        "ObterHistoricoVacinacao",
        "ExibirMsgInicial",
    ]
    let opcoes = initOpcoes(desc, intenc, 3)
    return new Mensagem("Você pode consultar informações referentes à vacinação selecionando alguma das opções abaixo.", opcoes)
}

const GetMsgCartaoSUS = () => {
    let desc = [
        "Retornar"
    ]
    let intenc = [
        "ExibirMsgInicial"
    ]
    let opcoes = initOpcoes(desc, intenc, 1)
    let texto = `O Cartão do SUS ou Cartão Nacional de Saúde é um documento gratuito que reúne dados sobre quando e onde
 o usuário foi atendido em toda rede de saúde pública. É possível fazer seu cartão em qualquer UBS de forma gratuita.
 O uso do cartão facilita a marcação de consultas e exames e garante o acesso a medicamentos gratuitos, mas não é obrigatório
 ter o cartão para se vacinar. Você pode ver mais informações sobre o CNS no link
 https://www.gov.br/saude/pt-br/acesso-a-informacao/acoes-e-programas/cns.`
    return new Mensagem(texto, opcoes)
}

const GetMsgConsultas = () => {
    let desc = [
        "Como agendar consultas?",
        "Como ver minha consulta na lista de espera?",
        "Retornar"
    ]
    let intenc = [
        "InfoConsultasAgendamento",
        "InfoConsultasEspera",
        "ExibirMsgInicial"
    ]
    let opcoes = initOpcoes(desc, intenc, 3)
    return new Mensagem("Você pode informar-se sobre as consultas selecionando algumas das opções abaixo.", opcoes)
}

const GetMsgBasicInfoUBS = () => {
    let desc = [
        "Retornar"
    ]
    let intenc = [
        "ExibirMsgInicial"
    ]
    let opcoes = initOpcoes(desc, intenc, 1)
    let texto = `Uma UBS ou USF deve ser procurada sempre que não houver uma situação de urgência ou emergência.
 As UBS (Unidades Básicas de Saúde) e as USF (Unidades de Saúde da Família) são unidades de atenção primária onde são realizados atendimentos de menor complexidade, como nos casos de resfriados e gripes,
 ou para procedimentos de vacinação ou entrega de medicamentos.`
    return new Mensagem(texto, opcoes)
}

const GetMsgBasicInfoUPA = () => {
    let desc = [
        "Retornar"
    ]
    let intenc = [
        "ExibirMsgInicial"
    ]
    let opcoes = initOpcoes(desc, intenc, 6)
    let texto = `Uma UPA deve ser procurada em casos de urgência como pressão e febre alta, fratura, cortes, infarto e derrame.
 O atendimento ocorre 24 horas, sete dias por semana.`
    return new Mensagem(texto, opcoes)
}

const GetMsgBasicInfoHorarios = () => {
    let desc = [
        "Desejo consultar o horário de funcionamento da UBS/USF da minha região",
        "Retornar"
    ]
    let intenc = [
        "HorarioUBS",
        "ExibirMsgInicial"
    ]
    let opcoes = initOpcoes(desc, intenc, 2)
    let texto = `
    As unidades básicas como UBS e USF geralmente funcionam das 8h às 17h, entretanto os horários
 podem variar de acordo com a região. As UPAs funcionam 24 horas por dia, sete dias por semana,
 mas só devem ser procuradas em casos de urgência/emergência.`
    return new Mensagem(texto, opcoes)
}

const GetMsgUrgenciaEmergencia = () => {
    let desc = [
        "Retornar"
    ]
    let intenc = [
        "ExibirMsgInicial"
    ]
    let opcoes = initOpcoes(desc, intenc, 1)
    let texto = `
    Em casos de emergências clínicas como dores no peito repentinas, desmaio, hemorragia, crises de convulsão
 e intoxicação, ligue para o SAMU (192). Já em casos de traumas e ferimentos como acidentes, quedas com fraturas,
 ataques de animais, choques elétricos graves, afogamentos e queimaduras, ligue para o SIATE (193).`
    return new Mensagem(texto, opcoes)
}

const GetMsgProcedVacinacao = () => {
    let desc = [
        "Retornar"
    ]
    let intenc = [
        "ExibirMsgInicial"
    ]
    let opcoes = initOpcoes(desc, intenc, 1)
    let texto = `Para se vacinar, basta ir à Unidade de Saúde da sua localidade portando o documento de identificação
 ou o Cartão Nacional de Saúde (CNS), bem como preferencialmente seu cartão de vacinas.`
    return new Mensagem(texto, opcoes)
}

const GetMsgHistVacinacao = () => {
    let desc = [
        "Como acessar o Meu SUS Digital?",
        "Retornar"
    ]
    let intenc = [
        "InfoConecteSUS",
        "ExibirMsgInicial",
    ]
    let opcoes = initOpcoes(desc, intenc, 2)
    let texto = `É possível acessar seu histórico de vacinação no aplicativo Meu SUS Digital.`
    return new Mensagem(texto, opcoes)
}

const GetMsgAgendaConsultas = () => {
    let desc = [
        "Retornar"
    ]
    let intenc = [
        "ExibirMsgInicial"
    ]
    let opcoes = initOpcoes(desc, intenc, 1)
    let texto = `Como o município não aderiu à funcionalidade do e-SUS digital, a única forma de agendar consultas é indo presencialmente à UBS da sua localidade.`
    return new Mensagem(texto, opcoes)
}

const GetMsgConsultaListaEspera = () => {
    let desc = [
        "Como acessar o autoatendimento?",
        "Retornar"
    ]
    let intenc = [
        "InfoAutoatendimento",
        "ExibirMsgInicial",
    ]
    let opcoes = initOpcoes(desc, intenc, 2)
    let texto = `Você pode visualizar sua consulta na lista de espera usando a ferramenta de autoatendimento
 do município.`
    return new Mensagem(texto, opcoes)
}

const GetMsgConecteSUS = () => {
    let desc = [
        "Voltar ao início"
    ]
    let intenc = [
        "ExibirMsgInicial"
    ]
    let opcoes = initOpcoes(desc, intenc, 1)
    texto = `O Meu SUS Digital permite que você possa obter seus dados de vacinação e verificar
 seu histórico clínico, entre outras funcionalides. Para utilizá-lo é necessário autenticar-se
 com a sua conta gov.br. Para mais informações consulte o link
 https://www.gov.br/pt-br/noticias/saude-e-vigilancia-sanitaria/2021/04/voce-conhece-o-conecte-sus#.
    `
    return new Mensagem(texto, opcoes)
}

const GetMsgAutoatendimento = () => {
    let desc = [
        "Voltar ao início"
    ]
    let intenc = [
        "ExibirMsgInicial"
    ]
    let opcoes = initOpcoes(desc, intenc, 1)
    let texto = `No autoatendimento de Cascavel, você pode usar diversos serviços na área da saúde como resultados de exames,
 consultas agendadas e consultas na lista de espera. Para ter acesso a esses serviços é necessário estar logado com uma
  conta gov.br ou com uma conta cadastrada no site do município. Você pode acessar o autoatendimento pelo link
 https://cascavel.atende.net/autoatendimento/.`
    return new Mensagem(texto, opcoes)
}

const GetMsgResultExames = () => {
    let desc = [
        "Como acessar o Meu SUS Digital?",
        "Como acessar o autoatendimento?",
        "Retornar"
    ]
    let intenc = [
        "InfoConecteSUS",
        "InfoAutoatendimento",
        "ExibirMsgInicial",
    ]
    let opcoes = initOpcoes(desc, intenc, 3)
    let texto = `Você pode acessar os resultados de exames através do Meu SUS Digital ou serviço online de autoatendimento
 de Cascavel. Para mais informações selecione uma das duas opções abaixo.`
    return new Mensagem(texto, opcoes)
}

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

const createChatUl = (opcoes, qtd) => {
    //let qtdOpcoes = 6;
    console.log(opcoes)
    const chatUl = document.createElement("ul");
    chatUl.classList.add("listaOpcoes");
    
    let i = 0
    while (i < qtd) {
        const op = document.createElement("li");
        const bt = document.createElement("button");
        //bt.value = "QuandoProcurarUBS"
        bt.value = opcoes[i].intencao
        //bt.textContent = "Quando devo procurar uma UBS?"
        bt.textContent = opcoes[i].desc
        bt.classList.add("opcao-html")
        bt.addEventListener("click", () => {ExibirMsg(bt.value, bt.textContent.trim())});
        op.appendChild(bt)
        chatUl.appendChild(op)
        i++
    }

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
    //let texto = "teste";
    let msg, qtd;
    console.log(intencao);
    switch (intencao) {
        case "ExibirMsgInicial":
            console.log("Exibindo msg inicial...")
            msg = GetMsgInicial();
            qtd = 5;
            break;
        case "ExibirFAQ":
            //texto = "Aqui estão algumas perguntas comumente realizadas. Você pode selecionar algumas das opções abaixo caso se identifique com alguma dúvida.";
            msg = GetMsgFAQ();
            qtd = 6
            break;
        case "ConsultarHorarioUBS":
            msg = GetMsgHorarioUBS();
            qtd = 1;
            break;
        case "SobreVacinacao":
            msg = GetMsgVacinacao();
            qtd = 3;
            break;
        case "SobreCartaoSUS":
            msg = GetMsgCartaoSUS();
            qtd = 1;
            break;
        case "SobreConsultas":
            msg = GetMsgConsultas();
            qtd = 3;
            break;
        case "QuandoProcurarUBS":
            msg = GetMsgBasicInfoUBS();
            qtd = 1;
            break;
        case "QuandoProcurarUPA":
            msg = GetMsgBasicInfoUPA();
            qtd = 1;
            break;
        case "InfoBreveHorarios":
            msg = GetMsgBasicInfoHorarios();
            qtd = 2;
            break;
        case "UrgenciaEmergencia":
            msg = GetMsgUrgenciaEmergencia();
            qtd = 1;
            break;
        case "ComoVacinar":
            msg = GetMsgProcedVacinacao();
            qtd = 1;
            break;
        case "ObterHistoricoVacinacao":
            msg = GetMsgHistVacinacao();
            qtd = 2;
            break;
        case "InfoConsultasAgendamento":
            msg = GetMsgAgendaConsultas();
            qtd = 1;
            break;
        case "InfoConsultasEspera":
            msg = GetMsgConsultaListaEspera();
            qtd = 2;
            break;
        case "InfoConecteSUS":
            msg = GetMsgConecteSUS();
            qtd = 1;
            break;
        case "InfoAutoatendimento":
            msg = GetMsgAutoatendimento();
            qtd = 1;
            break;
        case "InfoResultadosExames":
            msg = GetMsgResultExames();
            qtd = 3;
            break;
        default:
            msg = GetMsgFail();
            qtd = 1;
            break;
    }
    chatbox.appendChild(createChatLi(descricao, "outgoing")); //mostrar opção selecionada do usuário
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    console.log(msg)
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        //generateResponse(incomingChatLi);
        const msgElem = incomingChatLi.querySelector("p");
        msgElem.textContent = msg.texto;
        
        const chatUl = createChatUl(msg.listaOpcoes, qtd)
        chatbox.appendChild(chatUl)

        chatbox.scrollTo(0, chatbox.scrollHeight); //conversa mais recente
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
opcaohtml.forEach(botao => botao.addEventListener("click", () => {ExibirMsg(botao.value, botao.textContent.trim())}));