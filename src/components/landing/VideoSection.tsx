import { useRef, useState } from 'react'
import styles from './VideoSection.module.css'

/**
 * Замените youtubeId на ID вашего ролика с YouTube
 * или укажите mp4Src (локальный /video/about.mp4 или прямая ссылка).
 * Если заданы оба — приоритет у YouTube.
 */
const VIDEO = {
  youtubeId: '',
  mp4Src: 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
  title: 'Амана за 60 секунд',
}

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const hasYoutube = Boolean(VIDEO.youtubeId.trim())

  const startPlayback = () => {
    setPlaying(true)
    if (!hasYoutube) {
      window.requestAnimationFrame(() => {
        void videoRef.current?.play()
      })
    }
  }

  return (
    <section className={`section ${styles.section}`} id="video">
      <div className="container">
        <div className={`section-head ${styles.head}`}>
          <span className="section-eyebrow">Видео</span>
          <h2 className="section-title">Посмотрите, как устроена рассрочка</h2>
          <p className="section-subtitle">
            Коротко о сервисе: прозрачные условия, понятный расчёт и заявка
            без лишних шагов.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.glow} aria-hidden />
          <div className={styles.player}>
            {!playing ? (
              <button
                type="button"
                className={styles.poster}
                onClick={startPlayback}
                aria-label="Смотреть видео"
              >
                <div className={styles.pattern} aria-hidden />
                <div className={styles.posterContent}>
                  <span className={styles.play}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M8.5 6.8v10.4L18 12 8.5 6.8z" fill="currentColor" />
                    </svg>
                  </span>
                  <div>
                    <strong>{VIDEO.title}</strong>
                    <span>Нажмите, чтобы смотреть</span>
                  </div>
                </div>
              </button>
            ) : hasYoutube ? (
              <iframe
                className={styles.media}
                src={`https://www.youtube-nocookie.com/embed/${VIDEO.youtubeId}?autoplay=1&rel=0`}
                title={VIDEO.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                className={styles.media}
                src={VIDEO.mp4Src}
                controls
                playsInline
                autoPlay
                title={VIDEO.title}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
