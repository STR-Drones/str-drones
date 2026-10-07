<template>
  <div>
    <div class="relative">
      <div class="carousel-wrapper">
        <div v-for="video in videos" :key="video.src" class="story" ref="stories">
          <div class="story-inner">
            <video
              loading="lazy"
              :src="video.src"
              muted
              loop
              autoplay
              playsinline
              preload="metadata"
              class="story-video"
              @click.stop="openFullscreen(video)"
            />
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div
        v-if="activeVideo"
        class="story-viewer"
        role="dialog"
        aria-modal="true"
        :aria-label="activeVideo.label"
        @click="closeFullscreen"
      >
        <video
          loading="lazy"
          :key="activeVideo.src"
          :src="activeVideo.src"
          muted
          loop
          autoplay
          playsinline
          class="story-viewer-video"
          @click.stop
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import horizontalLoop from "~/helpers/hloop"
import { ref, onMounted, onUnmounted } from 'vue'

const stories = ref(null)
const activeVideo = ref(null)
let previousBodyOverflow = ''

const videos = [
  { src: '/videos/stories/story-1.mp4', label: 'Story 1' },
  { src: '/videos/stories/story-4.mp4', label: 'Story 2' },
  { src: '/videos/stories/story-7.mp4', label: 'Story 3' },
  { src: '/videos/stories/story-2.mp4', label: 'Story 4' },
  { src: '/videos/stories/story-5.mp4', label: 'Story 5' },
  { src: '/videos/stories/story-3.mp4', label: 'Story 7' },
  { src: '/videos/stories/story-10.mp4', label: 'Story 8' },
  { src: '/videos/stories/story-9.mp4', label: 'Story 9' },
  { src: '/videos/stories/story-8.mp4', label: 'Story 10' },
  { src: '/videos/stories/story-1.mp4', label: 'Story 1' },
  { src: '/videos/stories/story-4.mp4', label: 'Story 2' },
  { src: '/videos/stories/story-7.mp4', label: 'Story 3' },
  { src: '/videos/stories/story-2.mp4', label: 'Story 4' },
  { src: '/videos/stories/story-5.mp4', label: 'Story 5' },
  { src: '/videos/stories/story-3.mp4', label: 'Story 7' },
  { src: '/videos/stories/story-10.mp4', label: 'Story 8' },
  { src: '/videos/stories/story-9.mp4', label: 'Story 9' },
  { src: '/videos/stories/story-8.mp4', label: 'Story 10' },
]

const openFullscreen = (video) => {
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  activeVideo.value = video
}

const closeFullscreen = () => {
  activeVideo.value = null
  document.body.style.overflow = previousBodyOverflow
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && activeVideo.value) {
    closeFullscreen()
  }
}

onMounted(() => {
  horizontalLoop(stories.value, { paused: false, repeat: true })
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (activeVideo.value) {
    document.body.style.overflow = previousBodyOverflow
  }
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

.story-viewer {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000ef;
  cursor: zoom-out;

  &-video {
    display: block;
    max-width: 100vw;
    max-height: 100dvh;
    padding: var(--sm);
    width: auto;
    height: auto;
    object-fit: contain;
    cursor: default;
    border-radius: 1.5em;
  }
}
</style>