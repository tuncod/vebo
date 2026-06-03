<script setup lang="ts">

</script>

<template>
  <div class="app">
    <h1 class="text-4xl text-red-600">Vebo TV</h1>

    <nav :class="['sidebar', { open: sidebarOpen }]" role="navigation" aria-label="Main navigation">
      <div class="sidebar-header">
        <a class="nav-logo" href="#" @click.prevent="navigate('/')">
          <span class="logo-icon">◈</span>
          <span class="logo-text">CineVault</span>
        </a>
      </div>
      <ul class="nav-links" role="list">
        <li v-for="link in navLinks" :key="link.route">
          <a
            class="nav-link"
            :class="{ active: isActive(link.route) }"
            :aria-label="t(link.label)"
            href="#"
            @click.prevent="navigate(link.route)"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="link.icon"></svg>
            <span>{{ t(link.label) }}</span>
          </a>
        </li>
      </ul>
    </nav>

  </div>
</template>
