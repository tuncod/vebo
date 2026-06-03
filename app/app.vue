<script setup lang="ts">
import 'vidstack/player/styles/base.css';

import 'vidstack/player';
import 'vidstack/player/ui';
// import 'vidstack/icons';

</script>

<template>
  <div>
    <h1 class="text-4xl text-red-600">Vebo TV</h1>
    <media-player
  viewType="video"
  streamType="on-demand"
  logLevel="warn"
  crossOrigin="true"
  playsInline="true"
  title="Sprite Fight"
  poster="https://files.vidstack.io/sprite-fight/poster.webp"
>
  <media-provider>
    <media-poster class="vds-poster"></media-poster>
    <source src="https://files.vidstack.io/sprite-fight/hls/stream.m3u8" />
    <track
      src="https://files.vidstack.io/sprite-fight/subs/english.vtt"
      label="English"
      language="en-US"
      kind="subtitles"
      type="vtt"
      default
    />
    <track
      src="https://files.vidstack.io/sprite-fight/subs/spanish.vtt"
      label="Spanish"
      language="es-ES"
      kind="subtitles"
      type="vtt"
    />
    <track
      src="https://files.vidstack.io/sprite-fight/chapters.vtt"
      language="en-US"
      kind="chapters"
      type="vtt"
      default
    />
  </media-provider>
  <media-video-layout
    thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
  ></media-video-layout>
</media-player>
  </div>
</template>
