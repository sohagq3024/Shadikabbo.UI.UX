import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Phone,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  Paperclip,
  Smile,
  User,
  MessageSquare,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface ChatMessage {
  id: string;
  sender: 'support' | 'user';
  text: string;
  time: string;
}

interface ShadikabboLiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  helplineNumber?: string;
  userName?: string;
}

export const ShadikabboLiveChatModal: React.FC<ShadikabboLiveChatModalProps> = ({
  isOpen,
  onClose,
  helplineNumber = '+8801711009988',
  userName = 'Member',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'support',
      text: `আসসালামু আলাইকুম ${userName}! শাদী কাব্য (Shadikabbo) অফিসিয়াল ম্যাচমেকার ও সাপোর্ট ডেস্কে আপনাকে স্বাগতম।`,
      time: 'Just now',
    },
    {
      id: 'm-2',
      sender: 'support',
      text: 'আপনার পছন্দের পাত্র/পাত্রী অনুসন্ধান, বায়োডাটা ভেরিফিকেশন, অভিভাবকের সাথে যোগাযোগ কিংবা মেম্বারশিপ সংক্রান্ত যেকোনো বিষয়ে আমরা লাইভ সহায়তা দিতে প্রস্তুত। আপনার প্রয়োজনীয় বার্তাটি লিখুন অথবা নিচের কুইক টপিক সিলেক্ট করুন।',
      time: 'Just now',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Realistic automated support assistant response
    setTimeout(() => {
      setIsTyping(false);
      let replyText =
        'ধন্যবাদ আপনার বার্তার জন্য। আমাদের সিনিয়র রিলেশনশিপ অফিসার আপনার প্রোফাইলটি পর্যবেক্ষণ করছেন এবং শীঘ্রই বিস্তারিত উত্তর প্রদান করবেন। জরুরি হলে উপরে উল্লেখিত সরাসরি হেল্পলাইনে কল করতে পারেন।';

      if (text.includes('ভেরিফাই') || text.includes('বায়োডাটা')) {
        replyText =
          'বায়োডাটা ভেরিফিকেশনের জন্য জাতীয় পরিচয়পত্র (NID) ও শিক্ষাগত যোগ্যতার তথ্য যাচাই করা হয়। আপনার এডিট প্রোফাইল সেকশন থেকে তথ্যগুলো সঠিক রেখেছেন কিনা নিশ্চিত করুন, আমাদের টিম ২৪ ঘণ্টার মধ্যে ভেরিফিকেশন ব্যাজ প্রদান করবে।';
      } else if (text.includes('কল') || text.includes('নম্বর') || text.includes('call')) {
        replyText = `আমাদের শাদী কাব্য হেল্পলাইন সরাসরি এক্টিভ রয়েছে: ${helplineNumber}। আপনি উপরের কল বাটনে ক্লিক করে সরাসরি কথা বলতে পারেন।`;
      } else if (text.includes('প্যাকেজ') || text.includes('প্রিমিয়াম') || text.includes('প্ল্যান')) {
        replyText =
          'শাদী কাব্য গোল্ড এবং ভিআইপি প্যাকেজে সরাসরি ভেরিফাইড পারিবারিক অভিভাবক নম্বর আনলক ও ডেডিকেটেড রিলেশনশিপ ম্যানেজার অ্যাসাইন করা হয়। আপগ্রেড প্ল্যানে ক্লিক করে বিস্তারিত দেখতে পারেন।';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'reply-' + Date.now(),
          sender: 'support',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const quickTopics = [
    'বায়োডাটা ভেরিফাই করার নিয়ম কি?',
    'সরাসরি অভিভাবকের নম্বর কিভাবে পাব?',
    'প্যাকেজ আপগ্রেড করার নিয়ম',
    'আমাকে একটি কল ব্যাক করার অনুরোধ',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl h-[82vh] sm:h-[580px] max-h-[85vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 ring-1 ring-slate-900/10">
        {/* Compact, Sleek Chat Header */}
        <div className="bg-gradient-to-r from-[#16205B] via-[#1B2668] to-[#0E1538] text-white px-3.5 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 shadow-sm flex items-center justify-center">
                <BrandLogo size="xs" variant="icon-only" />
              </div>
              {/* Pulsing Active Status Marker */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500 border-2 border-[#16205B]"></span>
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs sm:text-sm font-bold font-display tracking-tight text-white flex items-center gap-1 truncate">
                  <span>Shadikabbo Live Desk</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </h3>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-[10px] text-slate-300 truncate">
                শাদী কাব্য অফিসিয়াল রিলেশনশিপ সার্ভিস
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Direct Mobile Call Button */}
            <a
              href={`tel:${helplineNumber}`}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#D91B2B] hover:bg-[#b91422] active:scale-95 text-white text-[11px] font-bold shadow-xs transition-all"
              title="Direct call helpline"
            >
              <PhoneCall className="w-3 h-3" />
              <span className="hidden xs:inline">Call</span>
            </a>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close live chat"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>
        </div>

        {/* Compact Status Bar */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-3.5 py-1.5 flex items-center justify-between text-[10px] text-slate-600 gap-2 shrink-0">
          <div className="flex items-center gap-1.5 font-medium truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">Support: <strong>Shadikabbo Team</strong></span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1 text-slate-500 text-[10px]">
              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
              10 AM - 10 PM
            </span>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-slate-50/60 text-xs">
          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2 sm:gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 shadow-2xs p-0.5 shrink-0 flex items-center justify-center">
                    <BrandLogo size="xs" variant="icon-only" />
                  </div>
                )}

                <div
                  className={`max-w-[86%] sm:max-w-md rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-[11px] sm:text-xs leading-relaxed shadow-2xs ${
                    isMe
                      ? 'bg-[#16205B] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {!isMe && (
                    <div className="flex items-center gap-1 font-bold text-[10px] text-[#D91B2B] mb-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Shadikabbo Desk</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      isMe ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {isMe && (
                  <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 shrink-0 flex items-center justify-center font-bold text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 p-0.5 shrink-0 flex items-center justify-center">
                <BrandLogo size="xs" variant="icon-only" />
              </div>
              <div className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 rounded-bl-xs text-[10px] text-slate-500 flex items-center gap-1 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] text-slate-400 ml-1">
                  Typing...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Compact Quick Topic Chips */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-[9px] uppercase font-bold text-slate-400 shrink-0">
            Topics:
          </span>
          {quickTopics.map((topic, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(topic)}
              className="text-[10px] font-medium text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-[#D91B2B] hover:border-rose-200 px-2.5 py-1 rounded-full border border-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Compact Message Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-2.5 sm:p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message / বার্তা লিখুন..."
            className="flex-1 px-3.5 py-2 sm:py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] bg-slate-50/70"
            autoFocus
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="px-4 py-2 sm:py-2.5 rounded-xl bg-[#16205B] hover:bg-[#0e1538] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
