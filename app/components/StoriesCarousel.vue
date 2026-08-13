<template>
  <div>
    <div class="relative">
      <div class="absolute left-0 top-0 bg-linear-to-r from-background to-transparent h-full z-100 w-[3rem]"></div>
      <div class="absolute right-0 top-0 bg-linear-to-l from-background to-transparent h-full z-100 w-[3rem]"></div>

      <div class="carousel-wrapper">
        <div v-for="video in videos" :key="video.src" class="story" ref="stories">
          <div class="story-inner">
            <video
              :src="video.src"
              muted
              loop
              autoplay
              playsinline
              preload="metadata"
              class="story-video"
            />
            <div class="story-overlay">
              <span>{{ video.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import horizontalLoop from "~/helpers/hloop"
import { ref, onMounted } from 'vue'

const stories = ref(null)

const videos = [
  { src: 'https://www.w3schools.com/html/mov_bbb.mp4', label: 'Bunny' },
  { src: 'https://www.w3schools.com/html/movie.mp4', label: 'Movie' },
  { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', label: 'Flower' },
  { src: 'https://media.w3.org/2010/05/sintel/trailer.mp4', label: 'Sintel' },
  { src: 'https://media.w3.org/2010/05/bunny/trailer.mp4', label: 'Trailer' },
  { src: 'https://media.w3.org/2010/05/video/movie_300.mp4', label: '300' },
  { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm', label: 'Flower WebM' },
  { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4?source=cdn', label: 'Flower CDN' },
  { src: 'https://www.w3schools.com/html/mov_bbb.mp4', label: 'Bunny 2' },
  { src: 'https://www.w3schools.com/html/movie.mp4', label: 'Movie 2' },
  { src: 'https://media.w3.org/2010/05/sintel/trailer.mp4', label: 'Sintel 2' },
]

onMounted(() => {
  horizontalLoop(stories.value, { paused: false, repeat: true })
})
</script>

<style lang="scss">
.carousel-wrapper {
  position: relative;
  width: 100%;
  max-height: 50vh;
  display: flex;
  align-items: center;
  overflow: hidden;

  .story {
    aspect-ratio: 10/16;
    height: 400px;
    padding: var(--xs);
    flex-shrink: 0;

    &-inner {
      position: relative;
      display: flex;
      background: var(--color-primary);
      border-radius: var(--radius-md);
      overflow: hidden;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    &-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      background: #000;
    }

    &-overlay {
      position: absolute;
      inset: auto 0 0 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: var(--sm);
      background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent);
      color: white;
      font-size: 0.875rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  }
}
</style>