"use client";

import { useState, useRef } from "react";
import { Mic, Keyboard, Menu, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface RecordingControlsProps {
  onSkip?: () => void;
  onSubmit?: (data: { mode: "voice" | "type", audioBlob?: Blob, textInput?: string }) => void;
}

export function RecordingControls({ onSkip, onSubmit }: RecordingControlsProps) {
  const { toast } = useToast();
  const [inputMode, setInputMode] = useState<"voice" | "type">("voice");
  const [textInput, setTextInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop Recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start Recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const options = MediaRecorder.isTypeSupported('audio/webm') ? { mimeType: 'audio/webm' } : {};
        const mediaRecorder = new MediaRecorder(stream, options);
        
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blobMimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp3';
          const blob = new Blob(audioChunksRef.current, { type: blobMimeType });
          setAudioBlob(blob);
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        setAudioBlob(null); 
        setTranscript("");

        // Start Speech Recognition overlay
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-US';

          recognition.onresult = (event: any) => {
            let currentTranscript = "";
            for (let i = 0; i < event.results.length; i++) {
              currentTranscript += event.results[i][0].transcript;
            }
            setTranscript(currentTranscript);
          };

          recognition.start();
          recognitionRef.current = recognition;
        }

      } catch (err) {
        console.error("Microphone Access Error:", err);
        alert("Microphone access denied or unavailable. Please check your browser permissions.");
      }
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      toast("Question skipped. Loading next question...", "info");
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSubmit = async () => {
    if (inputMode === "voice" && !audioBlob) {
      toast("Please record an audio answer first before submitting.", "error");
      return;
    }
    if (inputMode === "type" && !textInput.trim()) {
      toast("Please type an answer first before submitting.", "error");
      return;
    }

    setIsEvaluating(true);
    if (isMenuOpen) setIsMenuOpen(false);

    try {
      // Simulate submission network delay if no onSubmit handler exists
      if (!onSubmit) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast("Answer submitted successfully! Loading next question...", "success");
      } else {
        await onSubmit({ 
          mode: inputMode, 
          audioBlob: audioBlob || undefined, 
          textInput: inputMode === "voice" ? transcript : textInput 
        });
      }
      
      // Reset inputs
      if (inputMode === "type") {
        setTextInput("");
      } else {
        setAudioBlob(null);
      }
    } catch (error) {
      console.error("❌ Submission failed:", error);
      toast("Failed to submit answer.", "error");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 lg:static lg:w-auto p-4 md:p-6 lg:p-8 bg-surface lg:bg-transparent lg:glass-panel border-t border-outline-variant/10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] lg:shadow-none transition-transform duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left Controls / Toggle */}
        <div className="flex-1 flex justify-start">
          <div className="flex items-center bg-surface-container-lowest/40 p-1 rounded-full border border-outline-variant/20">
            <button
              onClick={() => setInputMode("voice")}
              className={cn(
                "flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-bold transition-all",
                inputMode === "voice"
                  ? "bg-primary text-on-primary shadow-lg"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <Mic className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden min-[400px]:inline">Voice</span>
            </button>
            <button
              onClick={() => setInputMode("type")}
              className={cn(
                "flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all",
                inputMode === "type"
                  ? "bg-primary text-on-primary shadow-lg"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <Keyboard className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden min-[400px]:inline">Type</span>
            </button>
          </div>
        </div>

        {/* Center Area (Mic or Textarea) */}
        <div className={cn(
          "flex justify-center relative z-10 transition-all duration-300",
          inputMode === "voice" 
            ? "flex-shrink-0 -translate-y-6 lg:-translate-y-12 px-2" 
            : "flex-[2] px-4 min-w-[200px] lg:px-8"
        )}>
          {/* Live Captions Overlay */}
          {isRecording && transcript && (
            <div className="absolute -top-20 lg:-top-24 left-1/2 -translate-x-1/2 w-max max-w-[300px] lg:max-w-xl bg-surface-container-highest/95 backdrop-blur-md border border-outline-variant/30 shadow-2xl rounded-2xl px-4 py-2 text-center pointer-events-none animate-in fade-in slide-in-from-bottom-4">
              <p className="text-on-surface text-xs lg:text-sm font-medium italic line-clamp-3">"{transcript}"</p>
            </div>
          )}

          {inputMode === "voice" ? (
            <button
              onClick={toggleRecording}
              className="group relative flex flex-col items-center gap-3"
            >
              <div
                className={cn(
                  "w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transform group-hover:scale-105 transition-all duration-300",
                  isRecording
                    ? "bg-gradient-to-br from-error to-error-dim mic-glow-active"
                    : "bg-gradient-to-br from-primary to-primary-container mic-glow"
                )}
              >
                <Mic
                  className={cn(
                    "w-6 h-6 lg:w-8 lg:h-8",
                    isRecording ? "text-white" : "text-on-primary"
                  )}
                  fill="currentColor"
                />
              </div>
              <span
                className={cn(
                  "text-[10px] lg:text-xs font-bold uppercase tracking-widest whitespace-nowrap",
                  isRecording ? "text-error animate-pulse" : "text-primary hover:opacity-80 transition-opacity"
                )}
              >
                {isRecording ? "Stop Recording" : (audioBlob ? "Re-Record Answer" : "Start Recording")}
              </span>
            </button>
          ) : (
            <div className="w-full max-w-2xl bg-surface-container-high border border-outline-variant/20 rounded-xl p-2 lg:p-3 shadow-inner">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your answer here..."
                disabled={isEvaluating}
                className="w-full h-16 lg:h-24 bg-transparent resize-none outline-none text-on-surface p-2 text-xs lg:text-sm placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-primary/30 rounded-lg transition-all"
              />
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex-1 flex justify-end relative">
          {/* Desktop Right Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="secondary" size="lg" className="px-8" onClick={handleSkip}>
              Skip Question
            </Button>
            <Button 
              size="lg" 
              className="font-black px-10"
              onClick={handleSubmit}
              disabled={isEvaluating || isRecording}
            >
              {isEvaluating ? "Analyzing..." : "Submit Answer"}
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden relative flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "p-3 rounded-full border transition-colors relative z-50 flex items-center justify-center",
                isMenuOpen 
                  ? "bg-surface-variant border-outline-variant text-on-surface" 
                  : "bg-surface-container-low border-outline-variant/20 hover:bg-surface-variant text-on-surface"
              )}
              aria-expanded={isMenuOpen}
              aria-label="Toggle actions menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Sliding Dropdown Popover */}
            <div
              className={cn(
                "absolute bottom-[calc(100%+1rem)] right-0 flex flex-col gap-3 min-w-[200px] bg-surface-container-highest p-4 rounded-2xl border border-outline-variant/30 shadow-2xl transition-all duration-300 origin-bottom-right z-40",
                isMenuOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-4 pointer-events-none"
              )}
            >
              <Button variant="secondary" className="w-full justify-center" onClick={handleSkip}>
                Skip Question
              </Button>
              <Button 
                className="w-full font-black justify-center"
                onClick={handleSubmit}
                disabled={isEvaluating || isRecording}
              >
                {isEvaluating ? "Analyzing..." : "Submit Answer"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
