/**
 * Chapter composable for Cyno Electric
 * Manages chapter data and navigation
 */

export interface Chapter {
  id: string
  slug: string
  title: string
  titleTh: string
  description: string
  order: number
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  topics: string[]
  interactiveComponents: string[]
  formulas?: string[]
  prerequisites?: string[]
}

export const chapters: Chapter[] = [
  {
    id: '01',
    slug: 'basic-electricity',
    title: 'Basic Electricity',
    titleTh: 'ไฟฟ้าพื้นฐาน',
    description: 'Learn the fundamentals of electricity including atoms, electrons, and electric charge.',
    order: 1,
    duration: '15 min',
    difficulty: 'beginner',
    topics: ['Atoms and Electrons', 'Electric Charge', 'Conductors vs Insulators', 'Current Flow'],
    interactiveComponents: ['ElectronFlow', 'AtomModel'],
    formulas: ['Q = I × t']
  },
  {
    id: '02',
    slug: 'ohms-law',
    title: "Ohm's Law",
    titleTh: 'กฎของโอห์ม',
    description: 'Understand the relationship between voltage, current, and resistance.',
    order: 2,
    duration: '20 min',
    difficulty: 'beginner',
    topics: ['Voltage', 'Current', 'Resistance', 'The Ohm\'s Law Triangle'],
    interactiveComponents: ['CircuitBoard', 'VoltageSource', 'ResistorVisualizer', 'CurrentMeter'],
    formulas: ['V = I × R', 'I = V / R', 'R = V / I'],
    prerequisites: ['basic-electricity']
  },
  {
    id: '03',
    slug: 'series-circuits',
    title: 'Series Circuits',
    titleTh: 'วงจรต่ออนุกรม',
    description: 'Explore how components behave when connected in series.',
    order: 3,
    duration: '25 min',
    difficulty: 'intermediate',
    topics: ['Series Connection', 'Voltage Division', 'Current in Series', 'Resistance Addition'],
    interactiveComponents: ['CircuitBoard', 'VoltageSource', 'ResistorVisualizer', 'WireConnection'],
    formulas: ['R_total = R1 + R2 + R3...', 'V_total = V1 + V2 + V3...', 'I = I1 = I2 = I3...'],
    prerequisites: ['ohms-law']
  },
  {
    id: '04',
    slug: 'parallel-circuits',
    title: 'Parallel Circuits',
    titleTh: 'วงจรต่อขนาน',
    description: 'Learn how parallel circuits distribute current and voltage.',
    order: 4,
    duration: '25 min',
    difficulty: 'intermediate',
    topics: ['Parallel Connection', 'Current Division', 'Voltage in Parallel', 'Conductance'],
    interactiveComponents: ['CircuitBoard', 'VoltageSource', 'ResistorVisualizer', 'CurrentMeter'],
    formulas: ['1/R_total = 1/R1 + 1/R2 + 1/R3...', 'I_total = I1 + I2 + I3...', 'V = V1 = V2 = V3...'],
    prerequisites: ['ohms-law']
  },
  {
    id: '05',
    slug: 'ac-circuits',
    title: 'AC Circuits',
    titleTh: 'วงจรกระแสสลับ',
    description: 'Introduction to alternating current, frequency, and reactance.',
    order: 5,
    duration: '30 min',
    difficulty: 'advanced',
    topics: ['AC Waveforms', 'Frequency and Period', 'Capacitive Reactance', 'Inductive Reactance'],
    interactiveComponents: ['ACWaveform', 'CapacitorVisualizer', 'InductorVisualizer', 'Oscilloscope'],
    formulas: ['Xc = 1/(2πfC)', 'XL = 2πfL', 'f = 1/T'],
    prerequisites: ['ohms-law', 'series-circuits']
  },
  {
    id: '06',
    slug: 'power-energy',
    title: 'Power and Energy',
    titleTh: 'กำลังไฟฟ้าและพลังงาน',
    description: 'Calculate electrical power consumption and energy costs.',
    order: 6,
    duration: '20 min',
    difficulty: 'intermediate',
    topics: ['Power Formulas', 'Energy Consumption', 'Efficiency', 'Cost Calculation'],
    interactiveComponents: ['PowerMeter', 'EnergyCalculator', 'ApplianceList'],
    formulas: ['P = V × I', 'P = I² × R', 'P = V² / R', 'E = P × t'],
    prerequisites: ['ohms-law']
  }
]

export const useChapters = () => {
  // Get all chapters sorted by order
  const getAllChapters = () => {
    return chapters.sort((a, b) => a.order - b.order)
  }

  // Get chapter by slug
  const getChapterBySlug = (slug: string) => {
    return chapters.find(chapter => chapter.slug === slug)
  }

  // Get chapter by ID
  const getChapterById = (id: string) => {
    return chapters.find(chapter => chapter.id === id)
  }

  // Get next chapter
  const getNextChapter = (currentSlug: string) => {
    const current = getChapterBySlug(currentSlug)
    if (!current) return null
    return chapters.find(chapter => chapter.order === current.order + 1) || null
  }

  // Get previous chapter
  const getPreviousChapter = (currentSlug: string) => {
    const current = getChapterBySlug(currentSlug)
    if (!current) return null
    return chapters.find(chapter => chapter.order === current.order - 1) || null
  }

  // Get chapters by difficulty
  const getChaptersByDifficulty = (difficulty: Chapter['difficulty']) => {
    return chapters.filter(chapter => chapter.difficulty === difficulty)
  }

  // Get chapter progress (for future user progress tracking)
  const getChapterProgress = () => {
    // This can be expanded to track user progress
    return {
      completed: [] as string[],
      current: 'basic-electricity'
    }
  }

  return {
    chapters,
    getAllChapters,
    getChapterBySlug,
    getChapterById,
    getNextChapter,
    getPreviousChapter,
    getChaptersByDifficulty,
    getChapterProgress
  }
}
