import { useState, useEffect } from 'react';
import { TurnoverCase, TurnoverStep, TurnoverStatus } from '@/types/turnover';
import { mockTurnoverCases } from '../data/turnover';

export function useTurnoverCases() {
  const [cases, setCases] = useState<TurnoverCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCases(mockTurnoverCases);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const updateCaseStep = (caseId: string, step: TurnoverStep, status: TurnoverStatus) => {
    setCases(prevCases => 
      prevCases.map(case_ => {
        if (case_.id === caseId) {
          const updatedSteps = case_.steps.map(stepData => {
            if (stepData.step === step) {
              return {
                ...stepData,
                status,
                completedAt: status === TurnoverStatus.COMPLETED ? new Date().toISOString() : stepData.completedAt
              };
            }
            return stepData;
          });

          // Update current step if completed
          let currentStep = case_.currentStep;
          if (status === TurnoverStatus.COMPLETED) {
            const stepOrder = Object.values(TurnoverStep);
            const currentStepIndex = stepOrder.indexOf(step);
            if (currentStepIndex < stepOrder.length - 1) {
              currentStep = stepOrder[currentStepIndex + 1];
            }
          }

          return {
            ...case_,
            steps: updatedSteps,
            currentStep,
            updatedAt: new Date().toISOString()
          };
        }
        return case_;
      })
    );
  };

  const getCasesByStatus = (status: TurnoverStatus) => {
    return cases.filter(case_ => {
      const currentStepData = case_.steps.find(step => step.step === case_.currentStep);
      return currentStepData?.status === status;
    });
  };

  const getCasesByStep = (step: TurnoverStep) => {
    return cases.filter(case_ => case_.currentStep === step);
  };

  const getCasesPriority = (priority: string) => {
    return cases.filter(case_ => case_.priority === priority);
  };

  return {
    cases,
    loading,
    updateCaseStep,
    getCasesByStatus,
    getCasesByStep,
    getCasesPriority
  };
}