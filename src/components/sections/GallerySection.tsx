'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Badge from '@/components/ui/Badge';
import { Heart, MessageCircle, Play, X, ChevronLeft, ChevronRight, Send, Share2, Bookmark } from 'lucide-react';

interface GalleryItem {
  id: string;
  author: string;
  role: 'Head Coach' | 'Admin' | 'Pro Trainer';
  category: 'Workouts' | 'Events' | 'Transformations' | 'Facility' | 'Videos';
  caption: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  time: string;
  likes: number;
  comments: { user: string; text: string; time: string }[];
}

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const filterChips = ['All', 'Workouts', 'Events', 'Transformations', 'Facility', 'Videos'] as const;

  const [posts, setPosts] = useState<GalleryItem[]>([
    {
      id: 'g-1',
      author: 'Vikram Shinde',
      role: 'Head Coach',
      category: 'Workouts',
      caption: 'Heavy squat day with the morning crew! Focus on hip abduction, bracing the core, and progressive overload. When discipline meets technique, personal records follow.',
      mediaUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      time: '2 hours ago',
      likes: 124,
      comments: [
        { user: 'Amit S.', text: 'Form looks immaculate coach!', time: '1h ago' },
        { user: 'Sarth P.', text: 'Best leg session in Narsobawadi 🔥', time: '30m ago' },
      ],
    },
    {
      id: 'g-2',
      author: 'RV Fitness Admin',
      role: 'Admin',
      category: 'Facility',
      caption: 'The newly upgraded competition power racks are calibrated and ready for heavy lifting. Clean, sanitized, and engineered for high volume workouts.',
      mediaUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      time: '1 day ago',
      likes: 89,
      comments: [
        { user: 'Karan D.', text: 'The knurling on these bars is legendary.', time: '18h ago' },
      ],
    },
    {
      id: 'g-3',
      author: 'Pooja Kulkarni',
      role: 'Pro Trainer',
      category: 'Workouts',
      caption: 'Saturday high-intensity sled relays! Nothing builds anaerobic power and cardiovascular endurance quite like 50kg turf pushes.',
      mediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      time: '2 days ago',
      likes: 156,
      comments: [
        { user: 'Neha M.', text: 'My legs are still burning haha!', time: '1d ago' },
      ],
    },
    {
      id: 'g-4',
      author: 'Rahul Patil',
      role: 'Pro Trainer',
      category: 'Transformations',
      caption: 'Proud of our member Rohan. -12 kg of stubborn body fat in 16 weeks while adding 15 kg to his bench press! Consistency with nutrition and heavy mechanical tension.',
      mediaUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      time: '3 days ago',
      likes: 245,
      comments: [
        { user: 'Rohan K.', text: 'Thanks to the entire RV team for keeping me accountable!', time: '2d ago' },
      ],
    },
    {
      id: 'g-5',
      author: 'RV Fitness Admin',
      role: 'Admin',
      category: 'Events',
      caption: 'Highlights from our deadlift showdown! The atmosphere was electric with members cheering every milestone lift.',
      mediaUrl: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      time: '4 days ago',
      likes: 310,
      comments: [
        { user: 'Sanjay B.', text: 'Cant wait for next month tournament!', time: '3d ago' },
      ],
    },
    {
      id: 'g-6',
      author: 'Pooja Kulkarni',
      role: 'Pro Trainer',
      category: 'Facility',
      caption: 'Post-workout eucalyptus steam bath therapy. Recovery is where muscle growth actually happens. Make sure you prioritize your rest days!',
      mediaUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      time: '5 days ago',
      likes: 98,
      comments: [
        { user: 'Sunil G.', text: 'Best recovery in town hands down.', time: '4d ago' },
      ],
    },
  ]);

  const filteredPosts =
    activeFilter === 'All'
      ? posts
      : posts.filter((p) => p.category === activeFilter);

  const activePost = selectedPostIndex !== null ? filteredPosts[selectedPostIndex] : null;

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[postId];
      setPosts((pList) =>
        pList.map((p) =>
          p.id === postId ? { ...p, likes: p.likes + (isLiked ? 1 : -1) } : p
        )
      );
      return { ...prev, [postId]: isLiked };
    });
  };

  const handleDoubleTap = (postId: string) => {
    if (!likedPosts[postId]) {
      toggleLike(postId);
    }
    setShowHeartPop(true);
    setTimeout(() => setShowHeartPop(false), 900);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !activePost) return;

    setPosts((pList) =>
      pList.map((p) =>
        p.id === activePost.id
          ? {
              ...p,
              comments: [
                ...p.comments,
                { user: 'Member', text: commentInput.trim(), time: 'Just now' },
              ],
            }
          : p
      )
    );
    setCommentInput('');
  };

  const nextPost = () => {
    if (selectedPostIndex !== null && selectedPostIndex < filteredPosts.length - 1) {
      setSelectedPostIndex(selectedPostIndex + 1);
    }
  };

  const prevPost = () => {
    if (selectedPostIndex !== null && selectedPostIndex > 0) {
      setSelectedPostIndex(selectedPostIndex - 1);
    }
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          eyebrow="Social Community Feed"
          title="RV Fitness Arena Feed"
          highlightWord="Feed"
          description="Live moments, athlete highlights, daily training routines, and tournament victories shared directly by RV coaches."
        />

        {/* Filter Chips per Section 4.6 */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-4">
          {filterChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === chip
                  ? 'bg-[#FFC62A] text-black shadow-[0_0_15px_rgba(255,198,42,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Instagram-style Media Grid per Section 4.6 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {filteredPosts.map((post, idx) => {
            const isLiked = likedPosts[post.id];

            return (
              <div
                key={post.id}
                onClick={() => setSelectedPostIndex(idx)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 cursor-pointer shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <Image
                  src={post.mediaUrl}
                  alt={post.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Video Play Icon if video */}
                {post.mediaType === 'video' && (
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                )}

                {/* Hover Overlay with Likes & Comments Count */}
                <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-4 text-white p-4 text-center">
                  <div className="flex items-center gap-6 font-bold text-sm">
                    <span className="flex items-center gap-1.5">
                      <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-5 h-5 text-white" />
                      {post.comments.length}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-2">{post.caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal per Section 4.6 */}
      {activePost && (
        <div
          onClick={() => setSelectedPostIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
        >
          {/* Navigation Arrows */}
          {selectedPostIndex !== null && selectedPostIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPost();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/80 text-white hover:text-[#FFC62A] transition-colors hidden md:block"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {selectedPostIndex !== null && selectedPostIndex < filteredPosts.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPost();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/80 text-white hover:text-[#FFC62A] transition-colors hidden md:block"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[88vh] rounded-3xl bg-[#121212] border border-[#FFC62A]/40 overflow-hidden shadow-[0_0_60px_rgba(255,198,42,0.2)] grid grid-cols-1 md:grid-cols-12"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPostIndex(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-900/80 text-white hover:text-[#FFC62A]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Media with Double-Click Heart Like Animation (md:col-span-7) */}
            <div
              onDoubleClick={() => handleDoubleTap(activePost.id)}
              className="md:col-span-7 relative bg-black aspect-square md:aspect-auto md:h-full min-h-[300px] flex items-center justify-center select-none cursor-pointer"
            >
              <Image
                src={activePost.mediaUrl}
                alt={activePost.caption}
                fill
                className="object-contain"
              />

              {/* Heart Pop Animation on Double Tap per Section 4.6 */}
              {showHeartPop && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Heart className="w-24 h-24 text-red-500 fill-red-500 animate-ping" />
                </div>
              )}
            </div>

            {/* Right Side: Details, Author, Likes & Comments Thread (md:col-span-5) */}
            <div className="md:col-span-5 flex flex-col justify-between p-6 bg-zinc-950 border-t md:border-t-0 md:border-l border-zinc-800">
              <div className="space-y-4">
                {/* Author Info */}
                <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFC62A]/20 border border-[#FFC62A] flex items-center justify-center font-black text-xs text-[#FFC62A]">
                    {activePost.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{activePost.author}</h4>
                    <span className="text-[10px] font-mono text-[#FFC62A] uppercase">{activePost.role}</span>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-xs text-zinc-300 leading-relaxed max-h-28 overflow-y-auto pr-1">
                  {activePost.caption}
                </p>

                {/* Comments Thread */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                    Comments ({activePost.comments.length})
                  </span>
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1 text-xs">
                    {activePost.comments.map((c, i) => (
                      <div key={i} className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                        <span className="font-bold text-white mr-1.5">{c.user}:</span>
                        <span className="text-zinc-300">{c.text}</span>
                        <span className="text-[9px] text-zinc-500 block text-right">{c.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Like Button & Comment Input */}
              <div className="border-t border-zinc-800 pt-3 space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleLike(activePost.id)}
                    className="flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedPosts[activePost.id]
                          ? 'text-red-500 fill-red-500 animate-bounce'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    />
                    <span className="text-white">{activePost.likes} likes</span>
                  </button>

                  <span className="text-[10px] font-mono text-zinc-500">{activePost.time}</span>
                </div>

                {/* Add Comment Input Form */}
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#FFC62A] text-black font-bold hover:bg-[#FFE072] transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GallerySection;
