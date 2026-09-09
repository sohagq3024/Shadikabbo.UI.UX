import React, { useState, useRef, useEffect } from 'react';
import { ReviewPost, UserAccount, UserRole } from '../../types';
import { INITIAL_REVIEW_POSTS } from '../../data/mockReviews';
import { BrandLogo } from '../common/BrandLogo';
import { useToast } from '../common/Toast';
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  Video as VideoIcon,
  Globe,
  MoreHorizontal,
  Send,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Upload,
  Check,
  ShieldCheck,
  Heart,
  Filter,
  Flame,
} from 'lucide-react';

interface ReviewTimelineProps {
  currentRole: UserRole;
  currentUser: UserAccount | null;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export const ReviewTimeline: React.FC<ReviewTimelineProps> = ({
  currentRole,
  currentUser,
  onOpenLogin,
  onOpenRegister,
}) => {
  const { showToast } = useToast();
  const isAdmin =
    currentRole === 'admin' ||
    currentRole === 'superadmin' ||
    currentRole === 'super_admin';

  // Persisted or initial posts
  const [posts, setPosts] = useState<ReviewPost[]>(() => {
    try {
      const saved = localStorage.getItem('shadikabbo_reviews_posts');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_REVIEW_POSTS;
  });

  // Save to local storage on changes
  useEffect(() => {
    try {
      localStorage.setItem('shadikabbo_reviews_posts', JSON.stringify(posts));
    } catch {
      // ignore
    }
  }, [posts]);

  // Active filter tab (All, Videos, Photos, Success)
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'image' | 'success'>('all');

  // Admin New Post Composer State
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newCategory, setNewCategory] = useState<ReviewPost['category']>('Wedding Success');
  const [newGroomName, setNewGroomName] = useState('');
  const [newBrideName, setNewBrideName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active open comments for posts (record of postId -> boolean)
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Fullscreen image viewer modal
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  // Media presets for quick admin posting demo
  const PRESET_IMAGES = [
    { label: 'Royal Wedding (Dhaka)', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=85' },
    { label: 'Expatriate Match (USA)', url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=1200&auto=format&fit=crop&q=85' },
    { label: 'Garland Ceremony', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=85' },
  ];

  const PRESET_VIDEOS = [
    { label: 'Wedding Celebration Hall Clip', url: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-celebrating-in-a-hall-42861-large.mp4' },
    { label: 'Ring Exchange Ceremony Clip', url: 'https://assets.mixkit.co/videos/preview/mixkit-groom-putting-the-ring-on-the-brides-finger-42864-large.mp4' },
  ];

  // Handle Like Toggle
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const wasLiked = !!p.isLiked;
          return {
            ...p,
            isLiked: !wasLiked,
            likesCount: wasLiked ? p.likesCount - 1 : p.likesCount + 1,
          };
        }
        return p;
      })
    );
  };

  // Handle Add Comment
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const authorName = currentUser?.name || 'Valued Member';
    const authorAvatar =
      currentUser?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop';

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: 'c-' + Date.now(),
                userName: authorName,
                userAvatar: authorAvatar,
                userRole: currentRole === 'admin' ? 'Official Staff' : 'Member',
                comment: text,
                createdAt: 'Just now',
              },
            ],
          };
        }
        return p;
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    showToast('Comment Added', 'Your comment has been posted to the review timeline.', 'success');
  };

  // Handle Share Post
  const handleSharePost = (post: ReviewPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, sharesCount: p.sharesCount + 1 } : p))
    );
    showToast('Post Link Copied!', 'Timeline review link copied to your clipboard.', 'success');
  };

  // Handle File Upload for Admin
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setNewMediaUrl(url);
    if (file.type.startsWith('video/')) {
      setNewMediaType('video');
    } else {
      setNewMediaType('image');
    }
    showToast('Media Attached', `Loaded ${file.name} successfully.`, 'info');
  };

  // Handle Admin Publish
  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) {
      showToast('Caption Required', 'Please enter a 2-3 line caption for the review.', 'error');
      return;
    }
    if (!newMediaUrl.trim()) {
      showToast('Media Required', 'Please attach an image or video for the post.', 'error');
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const newPost: ReviewPost = {
      id: 'post-' + Date.now(),
      authorName: 'Shadikabbo.com',
      authorVerified: true,
      isOnline: true,
      uploadedDate: `Today at ${formattedTime}`,
      relativeTime: 'Just now',
      category: newCategory,
      caption: newCaption.trim(),
      mediaType: newMediaType,
      mediaUrl: newMediaUrl.trim(),
      videoDuration: newMediaType === 'video' ? '0:45' : undefined,
      likesCount: 1,
      isLiked: true,
      sharesCount: 0,
      comments: [],
      coupleDetails:
        newGroomName || newBrideName
          ? {
              groomName: newGroomName,
              brideName: newBrideName,
              weddingLocation: newLocation || 'Dhaka, Bangladesh',
            }
          : undefined,
    };

    setTimeout(() => {
      setPosts((prev) => [newPost, ...prev]);
      setIsSubmitting(false);
      setIsComposerOpen(false);
      setNewCaption('');
      setNewMediaUrl('');
      setNewGroomName('');
      setNewBrideName('');
      setNewLocation('');
      showToast('Review Published!', 'Your post is now live on the public Facebook-style timeline.', 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    if (activeFilter === 'video') return p.mediaType === 'video';
    if (activeFilter === 'image') return p.mediaType === 'image';
    if (activeFilter === 'success') return p.category === 'Wedding Success';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-24 sm:pb-16 pt-2 sm:pt-4">
      {/* Feed Container (Native Facebook Timeline Width) */}
      <div className="max-w-xl sm:max-w-2xl mx-auto px-0 sm:px-3">
        {/* ADMIN ONLY: Facebook-Style "Create Post / What's on your mind?" Card */}
        {isAdmin && (
          <div className="bg-white rounded-none sm:rounded-2xl p-3.5 sm:p-4 mb-3 sm:mb-4 shadow-sm border-y sm:border border-slate-200/90">
            <div className="flex items-center gap-3">
              {/* Profile Avatar with Green Active Mark */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center p-1 overflow-hidden shadow-2xs">
                  <BrandLogo size="xs" variant="icon-only" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>

              {/* Trigger Input Button */}
              <button
                type="button"
                onClick={() => setIsComposerOpen(true)}
                className="flex-1 bg-slate-100 hover:bg-slate-200/90 text-left px-4 py-2.5 rounded-full text-xs sm:text-sm text-slate-500 transition-colors cursor-pointer truncate"
              >
                সাদিকাব্যের নতুন কোনো কাপল রিভিউ বা ভিডিও পোস্ট করুন...
              </button>

              <button
                type="button"
                onClick={() => setIsComposerOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-2 bg-[#D91B2B] hover:bg-[#b81423] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Review</span>
              </button>
            </div>

            {/* Quick Action Buttons Row */}
            <div className="flex items-center justify-around border-t border-slate-100 mt-3 pt-2 text-xs font-semibold text-slate-600">
              <button
                onClick={() => {
                  setNewMediaType('image');
                  setIsComposerOpen(true);
                }}
                className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Photo / Review</span>
              </button>
              <button
                onClick={() => {
                  setNewMediaType('video');
                  setIsComposerOpen(true);
                }}
                className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <VideoIcon className="w-4 h-4 text-rose-600" />
                <span>Video Reel / Clip</span>
              </button>
              <button
                onClick={() => {
                  // Auto fill preset for instant admin demo testing
                  setNewCaption('আলহামদুলিল্লাহ! ঢাকা শেরাটন হোটেলে অনুষ্ঠিত হলো সুমাইয়া ও ইঞ্জি. তামিমের বিবাহোত্তর সংবর্ধনা। দুই পরিবারের প্রতি রইল আন্তরিক শুভকামনা। 💖');
                  setNewMediaType('image');
                  setNewMediaUrl(PRESET_IMAGES[0].url);
                  setNewCategory('Wedding Success');
                  setNewGroomName('Engr. Tamim Chowdhury');
                  setNewBrideName('Dr. Sumaiya Khan');
                  setNewLocation('Sheraton Dhaka');
                  setIsComposerOpen(true);
                }}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-100 text-[#16205B] transition-colors cursor-pointer"
                title="Fill sample demo content in 1 click"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>1-Click Sample</span>
              </button>
            </div>
          </div>
        )}

        {/* ADMIN COMPOSER MODAL */}
        {isComposerOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95">
              {/* Modal Header */}
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center p-1">
                    <BrandLogo size="xs" variant="icon-only" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Create Timeline Review</h3>
                    <p className="text-[10px] text-slate-400">Admin Publisher • Shadikabbo.com</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handlePublishPost} className="p-4 space-y-3.5 max-h-[80vh] overflow-y-auto">
                {/* Category & Visibility */}
                <div className="flex items-center justify-between">
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ReviewPost['category'])}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-[#16205B]/20"
                  >
                    <option value="Wedding Success">💍 Wedding Success</option>
                    <option value="Client Review">⭐ Client Review</option>
                    <option value="Verified Match">💖 Verified Match</option>
                    <option value="Community Story">🌸 Community Story</option>
                  </select>

                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                    <Globe className="w-3 h-3" />
                    Public Post
                  </span>
                </div>

                {/* Caption Textarea (2-3 lines) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Post Caption / Review Story *
                  </label>
                  <textarea
                    rows={3}
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Write 2-3 lines of couple review, wedding success message, or matrimonial journey..."
                    required
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] resize-none"
                  />
                </div>

                {/* Couple Details (Optional) */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                      Groom Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={newGroomName}
                      onChange={(e) => setNewGroomName(e.target.value)}
                      placeholder="e.g. Engr. Tanvir Ahmed"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                      Bride Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={newBrideName}
                      onChange={(e) => setNewBrideName(e.target.value)}
                      placeholder="e.g. Dr. Faria Khan"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                </div>

                {/* Media Type Toggle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Media Attachment (Image or Video) *
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setNewMediaType('image')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                        newMediaType === 'image'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Attach Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewMediaType('video')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                        newMediaType === 'video'
                          ? 'bg-rose-50 border-rose-500 text-rose-700'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <VideoIcon className="w-4 h-4" />
                      <span>Attach Video</span>
                    </button>
                  </div>

                  {/* Upload input or URL */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 border border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-600 cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-slate-500" />
                        <span>Upload from Computer / Mobile</span>
                        <input
                          type="file"
                          accept={newMediaType === 'image' ? 'image/*' : 'video/*'}
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <input
                      type="url"
                      value={newMediaUrl}
                      onChange={(e) => setNewMediaUrl(e.target.value)}
                      placeholder={
                        newMediaType === 'image'
                          ? 'Or paste image URL (https://...)'
                          : 'Or paste direct MP4 video URL (https://...)'
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                    />

                    {/* Quick Preset Selector */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] text-slate-400 font-semibold">Demo Presets:</span>
                      {(newMediaType === 'image' ? PRESET_IMAGES : PRESET_VIDEOS).map((pr, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setNewMediaUrl(pr.url)}
                          className="text-[10px] font-medium text-[#16205B] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md cursor-pointer truncate max-w-[140px]"
                        >
                          {pr.label}
                        </button>
                      ))}
                    </div>

                    {/* Media Preview Box */}
                    {newMediaUrl && (
                      <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 bg-black max-h-48 flex items-center justify-center relative">
                        {newMediaType === 'image' ? (
                          <img
                            src={newMediaUrl}
                            alt="Preview"
                            className="max-h-48 w-full object-cover"
                          />
                        ) : (
                          <video
                            src={newMediaUrl}
                            controls
                            className="max-h-48 w-full object-contain"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => setNewMediaUrl('')}
                          className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newCaption.trim() || !newMediaUrl.trim()}
                    className="px-5 py-2 text-xs font-bold text-white bg-[#D91B2B] hover:bg-[#b81423] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <span>Publishing...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Post to Timeline</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FEED POSTS (Totally Facebook Timeline Scrolling) */}
        <div className="space-y-3 sm:space-y-4">
          {filteredPosts.map((post) => {
            const isCommentsOpen = !!openComments[post.id];
            return (
              <article
                key={post.id}
                className="bg-white rounded-none sm:rounded-2xl border-y sm:border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* 1. Post Header: FB Style */}
                <div className="p-3 sm:p-4 pb-2.5 sm:pb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    {/* Website Logo Avatar with Vibrant Green Active Indicator */}
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center p-1 shadow-2xs">
                        <BrandLogo size="xs" variant="icon-only" />
                      </div>
                      {/* Active Indicator Mark */}
                      <span
                        className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-2xs"
                        title="Active Official Profile"
                      />
                    </div>

                    {/* Author Information */}
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm sm:text-[15px] text-slate-900 hover:text-[#16205B] cursor-pointer">
                          {post.authorName}
                        </span>

                        {/* Blue Verified Badge */}
                        <span
                          className="inline-flex items-center justify-center w-4 h-4 bg-sky-500 text-white rounded-full text-[9px] shadow-2xs"
                          title="Verified Matrimonial Organization"
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>

                        {/* Category Badge */}
                        {post.category && (
                          <span className="text-[10px] font-bold text-[#D91B2B] bg-rose-50 border border-rose-100/90 px-2 py-0.5 rounded-full">
                            {post.category}
                          </span>
                        )}
                      </div>

                      {/* Upload Date, Time & Globe Icon */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                        <span className="font-medium text-slate-500">{post.uploadedDate}</span>
                        <span>•</span>
                        <span title="Public Facebook-style Review">
                          <Globe className="w-3.5 h-3.5 inline text-slate-400" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3-Dots Action Menu */}
                  <button
                    type="button"
                    onClick={() => handleSharePost(post)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Options / Share"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. Post Caption: 2-3 Lines */}
                <div className="px-3 sm:px-4 pb-3">
                  <p className="text-xs sm:text-[13.5px] text-slate-800 leading-relaxed whitespace-pre-line font-normal">
                    {post.caption}
                  </p>

                  {/* Couple details chip if exists */}
                  {post.coupleDetails && (
                    <div className="mt-2.5 inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-xl text-xs text-slate-600">
                      <Heart className="w-3.5 h-3.5 text-[#D91B2B] fill-rose-500" />
                      <span className="font-bold text-slate-800">
                        {post.coupleDetails.groomName} & {post.coupleDetails.brideName}
                      </span>
                      {post.coupleDetails.weddingLocation && (
                        <span className="text-slate-400 text-[11px] hidden sm:inline">
                          ({post.coupleDetails.weddingLocation})
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Media Section: 2:2 Ratio (1:1 Square) */}
                <div className="w-full aspect-square bg-slate-950 relative overflow-hidden">
                  {post.mediaType === 'image' ? (
                    <div
                      className="w-full h-full cursor-pointer group relative overflow-hidden flex items-center justify-center bg-slate-900"
                      onClick={() => setActiveModalImage(post.mediaUrl)}
                    >
                      <img
                        src={post.mediaUrl}
                        alt="Review ceremony"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="bg-black/70 text-white text-xs px-3.5 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5" />
                          Click to Expand
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Native HTML5 Video Player: 2:2 Aspect Ratio */
                    <div className="w-full h-full relative flex items-center justify-center bg-black">
                      <video
                        src={post.mediaUrl}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                      {post.videoDuration && (
                        <span className="absolute top-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs pointer-events-none z-10 shadow-xs">
                          {post.videoDuration}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* 4. Engagement Metrics Bar (Reactions count & Comment count) */}
                <div className="px-3 sm:px-4 py-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center -space-x-1">
                      <span className="w-4.5 h-4.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] border border-white shadow-2xs">
                        👍
                      </span>
                      <span className="w-4.5 h-4.5 rounded-full bg-[#D91B2B] text-white flex items-center justify-center text-[10px] border border-white shadow-2xs">
                        ❤️
                      </span>
                    </span>
                    <span className="font-semibold text-slate-700">
                      {post.likesCount}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] sm:text-xs">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))
                      }
                      className="hover:underline cursor-pointer"
                    >
                      {post.comments.length} comments
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => handleSharePost(post)}
                      className="hover:underline cursor-pointer"
                    >
                      {post.sharesCount} shares
                    </button>
                  </div>
                </div>

                {/* 5. FB Action Row: Like, Comment, Share */}
                <div className="px-2 py-1 flex items-center justify-around border-b border-slate-100">
                  {/* Like Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer select-none ${
                      post.isLiked
                        ? 'text-[#D91B2B] bg-rose-50/70 font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ThumbsUp
                      className={`w-4 h-4 transition-transform active:scale-125 ${
                        post.isLiked ? 'fill-[#D91B2B] stroke-[#D91B2B]' : 'text-slate-500'
                      }`}
                    />
                    <span>Like</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))
                    }
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer select-none ${
                      isCommentsOpen ? 'bg-slate-100 text-[#16205B]' : ''
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-slate-500" />
                    <span>Comment</span>
                  </button>

                  {/* Share Button */}
                  <button
                    type="button"
                    onClick={() => handleSharePost(post)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer select-none"
                  >
                    <Share2 className="w-4 h-4 text-slate-500" />
                    <span>Share</span>
                  </button>
                </div>

                {/* 6. Expandable Comments Section (FB Style) */}
                {isCommentsOpen && (
                  <div className="bg-slate-50/60 p-3 sm:p-4 space-y-3 animate-in fade-in">
                    {/* Existing comments list */}
                    {post.comments.length > 0 ? (
                      <div className="space-y-2.5">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start gap-2.5">
                            <img
                              src={comment.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
                              alt={comment.userName}
                              className="w-7 h-7 rounded-full object-cover border border-white mt-0.5 shrink-0"
                            />
                            <div className="bg-white rounded-2xl px-3 py-2 border border-slate-200/80 shadow-2xs text-xs flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-slate-900">
                                  {comment.userName}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {comment.createdAt}
                                </span>
                              </div>
                              {comment.userRole && (
                                <span className="text-[9px] font-semibold text-[#16205B] block -mt-0.5 mb-1">
                                  {comment.userRole}
                                </span>
                              )}
                              <p className="text-slate-700 leading-snug">
                                {comment.comment}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-xs text-slate-400 py-1">
                        Be the first to congratulate the new couple! 💐
                      </p>
                    )}

                    {/* Write comment input */}
                    <div className="flex items-center gap-2 pt-1">
                      <img
                        src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                        alt="My profile"
                        className="w-7 h-7 rounded-full object-cover border border-white shrink-0"
                      />
                      <div className="flex-1 relative flex items-center">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                          placeholder="Write a comment or congratulations..."
                          className="w-full px-3.5 py-2 pr-9 text-xs rounded-full border border-slate-200 bg-white focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B]"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddComment(post.id)}
                          className="absolute right-2 p-1 text-[#D91B2B] hover:text-[#b81423] cursor-pointer"
                          title="Post comment"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom End of Timeline */}
        <div className="text-center py-6 text-xs text-slate-400 flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center p-1.5 shadow-2xs">
            <BrandLogo size="xs" variant="icon-only" />
          </div>
          <p className="font-semibold text-slate-600">
            You've caught up with all verified reviews & success stories!
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
            <span>100% Authentic Matrimonial Chronicles</span>
          </div>
        </div>
      </div>

      {/* Image Modal Lightbox */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
          onClick={() => setActiveModalImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveModalImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeModalImage}
            alt="Expanded view"
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
