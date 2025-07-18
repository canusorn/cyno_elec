<template>
  <div class="w-full">
    <canvas ref="chartCanvas" class="w-full h-64"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const chartCanvas = ref(null);

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [10, 11, 12, 13, 14, 15, 16],
      datasets: [
        {
          label: 'Device Data',
          data: [120, 190, 300, 250, 220, 310, 400],
          borderColor: '#9FA8DA',
          backgroundColor: 'rgba(159, 168, 218, 0.2)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
</script>

<style scoped>
.w-full {
  width: 100%;
}
.h-64 {
  height: 16rem;
}
</style>
