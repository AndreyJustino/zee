import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Plus } from 'lucide-react';
import styles from './FloatingChat.module.css';
import mascote from "./assets/mascoteZeeIA.png"

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Eu sou a inteligência artificial da Zeelus. Precisa de ajuda com dicas, respostas ou informações simples? Estou aqui para ajudar!',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        isBot: false,
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');

      // Simular resposta do bot após 1 segundo
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: 'Obrigado pela sua mensagem! Como posso ajudá-lo hoje?',
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.logoContainer}>
                <div className={styles.logoCircle}>
                  <div className={styles.logoInner}></div>
                </div>
              </div>
              <div className={styles.headerText}>
                <h3 className={styles.title}>Zee IA</h3>
                <p className={styles.subtitle}>Bem-vindo a Zee IA!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageWrapper} ${msg.isBot ? styles.botMessage : styles.userMessage}`}
              >
                <div className={`${styles.messageBubble} ${msg.isBot ? styles.botBubble : styles.userBubble}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <div className={styles.textareaContainer}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem"
                  className={styles.textarea}
                  rows="1"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={styles.sendButton}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button - Only show when chat is closed */}
      {!isOpen && (
        <div className={styles.floatingButtonContainer}>
          <button
            onClick={() => setIsOpen(true)}
            className={styles.floatingButton}
          >
            {/* Substitua esta div pela sua imagem do mascote */}
            <div className={styles.mascotContainer}>
              <img 
                src={mascote} 
                alt="Mascote" 
                className={styles.mascotImage}
                onError={(e) => {
                  // Fallback caso a imagem não carregue
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <Plus size={20} className={styles.fallbackIcon} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;