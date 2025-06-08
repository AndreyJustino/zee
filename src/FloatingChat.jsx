import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Plus } from 'lucide-react';
import styles from './FloatingChat.module.css';
import mascote from "./assets/mascoteZeeIA.png";
// import { getGeminiResponse } from './geminiApi'; // Descomente e ajuste o caminho

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Eu sou a inteligência artificial da Zeelus. Precisa de ajuda?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef(null);

  // Sempre rola para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Envia mensagem e recebe resposta do Gemini
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(msgs => [...msgs, userMsg]);
    setMessage('');

    try {
      // Troque pelo seu método real de chamada à API Gemini
      const response = await getGeminiResponse(message);
      setMessages(msgs => [
        ...msgs,
        {
          id: msgs.length + 1,
          text: response,
          isBot: true,
          timestamp: new Date()
        }
      ]);
    } catch {
      setMessages(msgs => [
        ...msgs,
        {
          id: msgs.length + 1,
          text: 'Desculpe, não consegui obter uma resposta agora.',
          isBot: true,
          timestamp: new Date()
        }
      ]);
    }
  };

  // Envia ao pressionar Enter (sem Shift)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      {isOpen ? (
        <div className={styles.chatWindow}>
          {/* Cabeçalho */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.logoContainer}>
                <img src={mascote} alt="Mascote Zee" className={styles.mascotImage} />
              </div>
              <div className={styles.headerText}>
                <h3 className={styles.title}>Zee IA</h3>
                <p className={styles.subtitle}>Bem-vindo a Zee IA!</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
              <X size={20} />
            </button>
          </div>

          {/* Mensagens */}
          <div className={styles.messagesContainer}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`${styles.messageWrapper} ${msg.isBot ? styles.botMessage : styles.userMessage}`}
              >
                <div className={`${styles.messageBubble} ${msg.isBot ? styles.botBubble : styles.userBubble}`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            className={styles.inputContainer}
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <div className={styles.inputWrapper}>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua mensagem"
                className={styles.textarea}
                rows={1}
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className={styles.sendButton}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Botão flutuante
        <div className={styles.floatingButtonContainer}>
          <button onClick={() => setIsOpen(true)} className={styles.floatingButton}>
            <div className={styles.mascotContainer}>
              <img src={mascote} alt="Mascote" className={styles.mascotImage} />
              <Plus size={20} className={styles.fallbackIcon} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;