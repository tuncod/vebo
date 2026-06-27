<script setup lang="ts">
import type { SelectScrollDownButtonProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { RiArrowDownSLine } from '@remixicon/vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectScrollDownButton, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/sh/utils'

const props = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectScrollDownButton
    v-bind="forwardedProps"
    data-slot="select-scroll-down-button"
    :class="cn('flex cursor-default items-center justify-center py-1', props.class)"
  >
    <slot>
      <RiArrowDownSLine class="size-4" />
    </slot>
  </SelectScrollDownButton>
</template>
