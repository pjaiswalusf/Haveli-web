'use client';

import React, { useState, Children, useLayoutEffect, useRef, HTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, Check } from 'lucide-react';
import { Button } from './button';

interface StepperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    children: ReactNode;
    initialStep?: number;
    onStepChange?: (step: number) => void;
    onFinalStepCompleted?: () => void;
    stepCircleContainerClassName?: string;
    stepContainerClassName?: string;
    contentClassName?: string;
    footerClassName?: string;
    backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    backButtonText?: string;
    nextButtonText?: string;
    disableStepIndicators?: boolean;
    renderStepIndicator?: (props: {
        step: number;
        currentStep: number;
        onStepClick: (clicked: number) => void;
    }) => ReactNode;
    isNextDisabled?: boolean;
    hideNextButton?: boolean;
}

export default function Stepper({
    children,
    initialStep = 1,
    onStepChange = () => { },
    onFinalStepCompleted = () => { },
    stepCircleContainerClassName = '',
    stepContainerClassName = '',
    contentClassName = '',
    footerClassName = '',
    backButtonProps = {},
    nextButtonProps = {},
    backButtonText = 'Back',
    nextButtonText = 'Continue',
    disableStepIndicators = false,
    renderStepIndicator,
    isNextDisabled = false,
    hideNextButton = false,
    className,
    ...rest
}: StepperProps) {
    const [currentStep, setCurrentStep] = useState<number>(initialStep);
    const [direction, setDirection] = useState<number>(0);
    const stepsArray = Children.toArray(children);
    const totalSteps = stepsArray.length;
    const isCompleted = currentStep > totalSteps;
    const isLastStep = currentStep === totalSteps;

    const updateStep = (newStep: number) => {
        setCurrentStep(newStep);
        if (newStep > totalSteps) {
            onFinalStepCompleted();
        } else {
            onStepChange(newStep);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            updateStep(currentStep - 1);
        }
    };

    const handleNext = () => {
        if (!isLastStep) {
            setDirection(1);
            updateStep(currentStep + 1);
        }
    };

    const handleComplete = () => {
        setDirection(1);
        updateStep(totalSteps + 1);
    };

    return (
        <div
            className={cn("flex flex-col w-full", className)}
            {...rest}
        >
            <div
                className={cn(
                    "w-full rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden",
                    stepCircleContainerClassName
                )}
            >
                <div className={cn("flex w-full max-w-lg mx-auto items-center p-6 md:p-8", stepContainerClassName)}>
                    {stepsArray.map((_, index) => {
                        const stepNumber = index + 1;
                        const isNotLastStep = index < totalSteps - 1;
                        return (
                            <React.Fragment key={stepNumber}>
                                {renderStepIndicator ? (
                                    renderStepIndicator({
                                        step: stepNumber,
                                        currentStep,
                                        onStepClick: clicked => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        }
                                    })
                                ) : (
                                    <StepIndicator
                                        step={stepNumber}
                                        disableStepIndicators={disableStepIndicators}
                                        currentStep={currentStep}
                                        onClickStep={clicked => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        }}
                                    />
                                )}
                                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
                            </React.Fragment>
                        );
                    })}
                </div>

                <StepContentWrapper
                    isCompleted={isCompleted}
                    currentStep={currentStep}
                    direction={direction}
                    className={cn("px-6 md:px-8", contentClassName)}
                >
                    {stepsArray[currentStep - 1]}
                </StepContentWrapper>

                {!isCompleted && (
                    <div className={cn("p-6 md:p-8 pt-0", footerClassName)}>
                        <div className={cn("flex mt-8 gap-4", currentStep !== 1 ? 'justify-between' : 'justify-end')}>
                            {currentStep !== 1 && (
                                <Button
                                    onClick={handleBack}
                                    variant="outline"
                                    className={cn(
                                        'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-800 transition-colors',
                                        backButtonProps.className
                                    )}
                                    {...backButtonProps}
                                >
                                    <ArrowLeftIcon className="w-4 h-4" />
                                    {backButtonText}
                                </Button>
                            )}
                            {!hideNextButton && (
                                <Button
                                    onClick={isLastStep ? handleComplete : handleNext}
                                    disabled={isNextDisabled}
                                    className={cn(
                                        "flex items-center justify-center rounded-full bg-primary text-black font-medium px-8 py-2.5 transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm hover:shadow-md",
                                        nextButtonProps.className
                                    )}
                                    {...nextButtonProps}
                                >
                                    {isLastStep ? 'Complete Order' : nextButtonText}
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface StepContentWrapperProps {
    isCompleted: boolean;
    currentStep: number;
    direction: number;
    children: ReactNode;
    className?: string;
}

function StepContentWrapper({
    isCompleted,
    currentStep,
    direction,
    children,
    className = ''
}: StepContentWrapperProps) {
    const [parentHeight, setParentHeight] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState(false);

    return (
        <motion.div
            style={{ position: 'relative', overflow: isAnimating ? 'hidden' : 'visible' }}
            animate={{ height: isCompleted ? 0 : parentHeight }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
            className={className}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
        >
            <AnimatePresence initial={false} mode="sync" custom={direction}>
                {!isCompleted && (
                    <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
                        {children}
                    </SlideTransition>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

interface SlideTransitionProps {
    children: ReactNode;
    direction: number;
    onHeightReady: (height: number) => void;
}

function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new ResizeObserver((entries) => {
            // contentRect.height is more precise for observers
            if (entries.length > 0) {
                onHeightReady(entries[0].contentRect.height);
            }
        });

        observer.observe(element);

        // Initial measurement
        onHeightReady(element.offsetHeight);

        return () => observer.disconnect();
    }, [onHeightReady]); // Removed 'children' as observer handles updates

    return (
        <motion.div
            ref={containerRef}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
            className="absolute top-0 left-0 w-full"
        >
            {children}
        </motion.div>
    );
}

const stepVariants: Variants = {
    enter: (dir: number) => ({
        x: dir >= 0 ? '-100%' : '100%',
        opacity: 0,
        position: 'absolute'
    }),
    center: {
        x: '0%',
        opacity: 1,
        position: 'relative'
    },
    exit: (dir: number) => ({
        x: dir >= 0 ? '50%' : '-50%',
        opacity: 0,
        position: 'absolute'
    })
};

interface StepProps {
    children: ReactNode;
}

export function Step({ children }: StepProps) {
    return <div className="w-full">{children}</div>;
}

interface StepIndicatorProps {
    step: number;
    currentStep: number;
    onClickStep: (clicked: number) => void;
    disableStepIndicators?: boolean;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators = false }: StepIndicatorProps) {
    const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

    const handleClick = () => {
        if (step !== currentStep && !disableStepIndicators) {
            onClickStep(step);
        }
    };

    return (
        <motion.div
            onClick={handleClick}
            className={cn(
                "relative z-10 flex items-center justify-center outline-none focus:outline-none transition-all",
                !disableStepIndicators && status !== 'active' ? "cursor-pointer hover:opacity-80" : "cursor-default"
            )}
            initial={false}
            animate={status}
        >
            <motion.div
                variants={{
                    inactive: {
                        scale: 1,
                        backgroundColor: '#ffffff', // bg-white
                        borderColor: '#e4e4e7', // border-zinc-200
                        color: '#a1a1aa' // text-zinc-400
                    },
                    active: {
                        scale: 1.1,
                        backgroundColor: '#d4af37', // bg-primary (gold)
                        borderColor: '#d4af37',
                        color: '#000000' // text-black
                    },
                    complete: {
                        scale: 1,
                        backgroundColor: '#d4af37', // bg-primary
                        borderColor: '#d4af37',
                        color: '#000000'
                    }
                }}
                transition={{ duration: 0.3 }}
                className="flex h-8 w-8 items-center justify-center rounded-full font-semibold border-2"
            >
                {status === 'complete' ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <span className="text-sm">{step}</span>
                )}
            </motion.div>
        </motion.div>
    );
}

interface StepConnectorProps {
    isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
    const lineVariants: Variants = {
        incomplete: { width: 0, backgroundColor: 'transparent' },
        complete: { width: '100%', backgroundColor: '#d4af37' } // bg-primary
    };

    return (
        <div className="relative mx-2 h-[2px] flex-1 overflow-hidden rounded-full bg-zinc-100">
            <motion.div
                className="absolute left-0 top-0 h-full"
                variants={lineVariants}
                initial={false}
                animate={isComplete ? 'complete' : 'incomplete'}
                transition={{ duration: 0.4 }}
            />
        </div>
    );
}
