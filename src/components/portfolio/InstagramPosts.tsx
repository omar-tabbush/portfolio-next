"use client";

import { useRef, useState } from "react";
import { INSTAGRAM_POSTS, INSTAGRAM_PROFILE, INSTAGRAM_HANDLE, embedUrl, postUrl, type InstagramPost } from "./instagram";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
    </svg>
  );
}

function StackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="7" y="7" width="13" height="13" rx="2" />
      <path d="M4 16V6a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

/**
 * Posters are local images; Instagram's player only loads when someone asks
 * for it, so the section costs no third-party requests until then.
 */
export function InstagramPosts({ variant = "grid" }: { variant?: "grid" | "featured" }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<InstagramPost | null>(null);

  const play = (p: InstagramPost) => {
    setOpen(p);
    dialogRef.current?.showModal();
  };
  const close = () => {
    dialogRef.current?.close();
    setOpen(null);
  };

  const [featured, ...rest] = INSTAGRAM_POSTS;

  return (
    <>
      <div className="ig-head">
        <p className="ig-intro">
          Short videos on building with AI <em>without breaking production.</em>
        </p>
        <a className="ig-follow" href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer">
          @{INSTAGRAM_HANDLE} <span aria-hidden>↗</span>
        </a>
      </div>

      {variant === "featured" ? (
        <div className="ig-featured">
          <PosterButton post={featured} onPlay={play} large />
          <div className="ig-featured-copy">
            <span className="ig-kind">Latest reel · {featured.meta}</span>
            <h3 className="ig-featured-title">{featured.title}</h3>
            {featured.points && (
              <ol className="ig-points">
                {featured.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ol>
            )}
            <div className="ig-actions">
              <button type="button" className="ig-btn primary" onClick={() => play(featured)}>
                <PlayIcon /> Watch here
              </button>
              <a className="ig-btn" href={postUrl(featured)} target="_blank" rel="noopener noreferrer">
                Open on Instagram <span aria-hidden>↗</span>
              </a>
            </div>
            {rest.length > 0 && (
              <div className="ig-more">
                <span className="ig-kind">More posts</span>
                <div className="ig-more-row">
                  {rest.map((p) => <PosterButton key={p.code} post={p} onPlay={play} small />)}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="ig-grid">
          {INSTAGRAM_POSTS.map((p) => (
            <article key={p.code} className="ig-card">
              <PosterButton post={p} onPlay={play} />
              <div className="ig-card-body">
                <h3 className="ig-card-title">{p.title}</h3>
                <div className="ig-card-meta">
                  <span>{p.kind === "reel" ? "Reel" : "Carousel"} · {p.meta}</span>
                  <a href={postUrl(p)} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <dialog ref={dialogRef} className="ig-modal" onClose={() => setOpen(null)} onClick={(e) => { if (e.target === dialogRef.current) close(); }}>
        {open && (
          <div className="ig-modal-inner">
            <button type="button" className="ig-close" onClick={close} aria-label="Close">✕</button>
            <iframe
              src={embedUrl(open)}
              title={`Instagram ${open.kind}: ${open.title}`}
              className={`ig-frame ${open.kind}`}
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </dialog>
    </>
  );
}

function PosterButton({ post, onPlay, large, small }: { post: InstagramPost; onPlay: (p: InstagramPost) => void; large?: boolean; small?: boolean }) {
  return (
    <button
      type="button"
      className={`ig-poster ${post.kind}${large ? " large" : ""}${small ? " small" : ""}`}
      onClick={() => onPlay(post)}
      aria-label={`Play ${post.kind}: ${post.title}`}
    >
      {post.kind === "carousel" && post.posters.length > 1 && (
        <span className="ig-stack" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.posters[1]} alt="" loading="lazy" />
        </span>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post.posters[0]} alt="" loading="lazy" />
      <span className="ig-badge" aria-hidden>{post.kind === "reel" ? <PlayIcon /> : <StackIcon />}</span>
      {!small && <span className="ig-dur" aria-hidden>{post.meta}</span>}
    </button>
  );
}
