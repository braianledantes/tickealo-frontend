import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTourStore = create()(
  persist(
    (set) => ({
      hasSeenTour: false,
      currentStep: 0,
      completedSteps: [],
      markStepAsCompleted: (stepId) => set((state) => ({
        completedSteps: [...state.completedSteps, stepId],
      })),
      SkipTour: () => set({ hasSeenTour: true, currentStep:-1}),
      resetTour: () => set({ hasSeenTour: false, currentStep: 0, completedSteps: [] }),
      completeTour: () => set({ hasSeenTour: true, currentStep: -1 }),
    }),
    {
      name: 'tour-storage', // nombre del almacenamiento
    }
  )
);
