import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  User,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { validatePromptContent, copyRateLimit } from "../utils/security";
import { modalContent, fadeIn } from "../utils/animations";

const PromptModal = ({ prompt, isOpen, onClose, onCopy }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [editablePrompt, setEditablePrompt] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    if (prompt) {
      // Validate prompt content when setting it
      const validatedPrompt = validatePromptContent(prompt.prompt);
      setEditablePrompt(validatedPrompt);
    }
  }, [prompt]);

  // Remove the manual escape handling since Dialog handles it

  const handleCopy = async () => {
    // Rate limiting to prevent abuse
    const userIdentifier = "user-copy-action"; // In real app, use session ID or user ID

    if (!copyRateLimit.isAllowed(userIdentifier)) {
      setIsRateLimited(true);
      setTimeout(() => setIsRateLimited(false), 5000);
      return;
    }

    try {
      // Validate content before copying
      const validatedContent = validatePromptContent(editablePrompt);

      if (!validatedContent.trim()) {
        console.warn("Cannot copy empty or invalid content");
        return;
      }

      await navigator.clipboard.writeText(validatedContent);
      setIsCopied(true);
      onCopy(prompt);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold pr-6">
            {prompt?.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {prompt?.description}
          </DialogDescription>
        </DialogHeader>

        {/* Author and Stats */}
        <div className="flex items-center gap-6 pb-4 border-b">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{prompt?.author}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Download className="h-4 w-4" />
            <span>{prompt?.downloads?.toLocaleString()}</span>
          </div>
          {prompt?.category && (
            <Badge variant="secondary" className="text-xs">
              {prompt.category}
            </Badge>
          )}
        </div>

        {/* Prompt Editor */}
        <div className="flex-1 flex flex-col gap-4 py-4 min-h-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Interactive Prompt Editor</h3>
            <span className="text-xs text-muted-foreground">
              Edit the prompt to fit your needs
            </span>
          </div>

          <textarea
            value={editablePrompt}
            onChange={(e) => {
              // Validate content as user types
              const validatedContent = validatePromptContent(e.target.value);
              setEditablePrompt(validatedContent);
            }}
            className="flex-1 min-h-[300px] resize-none rounded-lg border bg-muted/50 px-4 py-3 text-sm font-mono leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Your prompt will appear here..."
          />

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>💡</span>
            <span>
              Tip: You can edit the prompt above to customize it for your
              specific use case
            </span>
          </div>
        </div>

        <DialogFooter className="pt-4 border-t">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                Esc
              </kbd>
              <span>to close</span>
            </div>

            <Button
              onClick={handleCopy}
              disabled={isRateLimited}
              className="min-w-[140px]"
            >
              {isRateLimited ? (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Rate Limited
                </>
              ) : isCopied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Prompt
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromptModal;
