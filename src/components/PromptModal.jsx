import React, { useState, useEffect } from 'react';
import { validatePromptContent, copyRateLimit } from '../utils/security';

const PromptModal = ({ prompt, isOpen, onClose, onCopy }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [editablePrompt, setEditablePrompt] = useState('');
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    if (prompt) {
      // Validate prompt content when setting it
      const validatedPrompt = validatePromptContent(prompt.prompt);
      setEditablePrompt(validatedPrompt);
    }
  }, [prompt]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    // Rate limiting to prevent abuse
    const userIdentifier = 'user-copy-action'; // In real app, use session ID or user ID
    
    if (!copyRateLimit.isAllowed(userIdentifier)) {
      setIsRateLimited(true);
      setTimeout(() => setIsRateLimited(false), 5000);
      return;
    }
    
    try {
      // Validate content before copying
      const validatedContent = validatePromptContent(editablePrompt);
      
      if (!validatedContent.trim()) {
        console.warn('Cannot copy empty or invalid content');
        return;
      }
      
      await navigator.clipboard.writeText(validatedContent);
      setIsCopied(true);
      onCopy(prompt);
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !prompt) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--spacing-lg)'
      }}
      onClick={handleBackgroundClick}
    >
      <div 
        className="glass"
        style={{
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-2xl)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-lg)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-xs">{prompt.title}</h2>
            <p className="text-secondary">{prompt.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: 'var(--spacing-sm)' }}
          >
            ✕
          </button>
        </div>

        {/* Prompt Editor */}
        <div className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Interactive Prompt Editor</h3>
            <span className="text-xs text-tertiary">Edit the prompt to fit your needs</span>
          </div>
          
          <textarea
            value={editablePrompt}
            onChange={(e) => {
              // Validate content as user types
              const validatedContent = validatePromptContent(e.target.value);
              setEditablePrompt(validatedContent);
            }}
            className="input"
            style={{
              minHeight: '300px',
              resize: 'vertical',
              fontFamily: 'Monaco, "Cascadia Code", monospace',
              fontSize: '0.875rem',
              lineHeight: 1.6
            }}
            placeholder="Your prompt will appear here..."
          />
          
          <div className="text-xs text-tertiary">
            💡 Tip: You can edit the prompt above to customize it for your specific use case
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center" style={{ paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center gap-md text-sm text-secondary">
            <div className="flex items-center gap-xs">
              <span>👤</span>
              <span>{prompt.author}</span>
            </div>
            <div className="flex items-center gap-xs">
              <span>⬇️</span>
              <span>{prompt.downloads.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-sm">
            <div className="flex items-center gap-xs text-xs text-tertiary">
              <span className="keycap">Esc</span>
              <span>to close</span>
            </div>
            
            <button
              onClick={handleCopy}
              className={`btn ${isCopied ? 'btn-secondary' : isRateLimited ? 'btn-secondary' : 'btn-primary'}`}
              disabled={isRateLimited}
              style={{
                minWidth: '120px'
              }}
            >
              {isRateLimited ? (
                <>
                  <span>⏳</span>
                  <span>Rate Limited</span>
                </>
              ) : isCopied ? (
                <>
                  <span className="animate-bounce-subtle">✅</span>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <span>📋</span>
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
