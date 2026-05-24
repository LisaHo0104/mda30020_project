"use client";

import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type QuizQuestion = {
  category: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

const quizQuestions: QuizQuestion[] = [
  {
    category: "HPV Basics",
    question: "According to WHO, HPV refers to how many related viruses?",
    options: [
      "Exactly 12 related viruses",
      "More than 200 related viruses",
      "One virus that only affects the cervix",
      "A small group of bacteria",
    ],
    answerIndex: 1,
    explanation:
      "WHO describes HPV as a group of more than 200 related viruses.",
  },
  {
    category: "Natural Course",
    question: "What happens to many HPV infections naturally?",
    options: [
      "They always become cancer immediately",
      "They only affect people over 50",
      "They clear naturally",
      "They can be diagnosed by symptoms alone",
    ],
    answerIndex: 2,
    explanation:
      "Many HPV infections clear naturally, but persistent high-risk infections can lead to serious health problems.",
  },
  {
    category: "Prevention",
    question: "Which pair does WHO identify as key HPV prevention strategies?",
    options: [
      "Avoiding every social media health post",
      "Only waiting until symptoms appear",
      "Replacing medical information with peer opinions",
      "Vaccination and screening",
    ],
    answerIndex: 3,
    explanation:
      "WHO identifies vaccination and screening as key prevention strategies for HPV-related disease.",
  },
  {
    category: "Cancer Risk",
    question: "Persistent high-risk HPV infection can lead to cancers in which areas?",
    options: [
      "Only the cervix",
      "The cervix, vulva, vagina, penis, anus, and mouth or throat",
      "Only the lungs",
      "Only the skin on the hands",
    ],
    answerIndex: 1,
    explanation:
      "The document lists HPV-related cancers of the cervix, vulva, vagina, penis, anus, and mouth or throat.",
  },
  {
    category: "Vietnam Context",
    question: "How many Vietnamese women aged 15 and above are estimated to be at risk of cervical cancer?",
    options: [
      "3.9 million",
      "12 million",
      "39.1 million",
      "79 million",
    ],
    answerIndex: 2,
    explanation:
      "The ICO/IARC HPV Information Centre estimate in the document is 39.1 million Vietnamese women aged 15 and above.",
  },
];

export function HpvFactsQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    () => quizQuestions.map(() => null),
  );

  const currentQuestion = quizQuestions[currentIndex];
  const selectedAnswer = selectedAnswers[currentIndex];
  const hasAnswered = selectedAnswer !== null;
  const isLastQuestion = currentIndex === quizQuestions.length - 1;
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

  const score = useMemo(
    () =>
      selectedAnswers.reduce<number>(
        (total, answer, index) =>
          answer === quizQuestions[index].answerIndex ? total + 1 : total,
        0,
      ),
    [selectedAnswers],
  );

  function selectAnswer(value: string) {
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentIndex] = Number(value);
    setSelectedAnswers(nextAnswers);
  }

  function goToPrevious() {
    setCurrentIndex((index) => Math.max(0, index - 1));
  }

  function goToNext() {
    setCurrentIndex((index) => Math.min(quizQuestions.length - 1, index + 1));
  }

  function restartQuiz() {
    setCurrentIndex(0);
    setSelectedAnswers(quizQuestions.map(() => null));
  }

  return (
    <Card className="hpv-quiz-card border-border/80 bg-card shadow-sm">
      <CardHeader className="gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-accent text-accent-foreground">
            Interactive quiz
          </Badge>
          <Badge variant="outline">HPV fun facts</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <CardTitle className="text-2xl font-semibold sm:text-3xl">
              Question {currentIndex + 1} of {quizQuestions.length}
            </CardTitle>
            <CardDescription className="mt-2 text-base leading-7">
              Test quick HPV facts from the research.
            </CardDescription>
          </div>
          <CardAction className="static col-auto row-auto justify-self-start sm:justify-self-end">
            <div className="rounded-lg bg-muted px-3 py-2 text-sm font-bold text-foreground">
              Score {score}/{quizQuestions.length}
            </div>
          </CardAction>
        </div>
        <div
          aria-label={`Question ${currentIndex + 1} of ${quizQuestions.length}`}
          className="h-2 overflow-hidden rounded-full bg-foreground/15"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={quizQuestions.length}
          aria-valuenow={currentIndex + 1}
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="grid gap-5 px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="grid gap-2">
          <Badge className="w-fit" variant="secondary">
            {currentQuestion.category}
          </Badge>
          <h3 className="max-w-4xl text-2xl font-semibold leading-tight text-foreground">
            {currentQuestion.question}
          </h3>
        </div>

        <RadioGroup
          value={selectedAnswer === null ? "" : String(selectedAnswer)}
          onValueChange={selectAnswer}
        >
          {currentQuestion.options.map((option, optionIndex) => {
            const isSelected = selectedAnswer === optionIndex;
            const isCorrect = optionIndex === currentQuestion.answerIndex;
            const showCorrect = hasAnswered && isCorrect;
            const showIncorrect = hasAnswered && isSelected && !isCorrect;

            return (
              <label
                className={cn(
                  "flex min-h-16 cursor-pointer items-center gap-3 rounded-lg border border-border/80 bg-background/55 px-4 py-3 text-lg font-bold leading-snug text-foreground transition",
                  "hover:border-ring/60 hover:bg-muted/70",
                  showCorrect && "border-accent bg-accent/35",
                  showIncorrect && "border-destructive/40 bg-destructive/10",
                )}
                htmlFor={`hpv-quiz-${currentIndex}-${optionIndex}`}
                key={option}
              >
                <RadioGroupItem
                  id={`hpv-quiz-${currentIndex}-${optionIndex}`}
                  value={String(optionIndex)}
                />
                <span>{option}</span>
              </label>
            );
          })}
        </RadioGroup>

        {hasAnswered ? (
          <div
            aria-live="polite"
            className={cn(
              "rounded-lg border p-4 text-foreground",
              selectedAnswer === currentQuestion.answerIndex
                ? "border-accent bg-accent/35"
                : "border-destructive/30 bg-destructive/10",
            )}
          >
            <p className="text-lg font-bold">
              {selectedAnswer === currentQuestion.answerIndex
                ? "Correct"
                : "Not quite"}
            </p>
            <p className="mt-1 text-base font-semibold leading-7 text-foreground/75">
              {currentQuestion.explanation}
            </p>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            disabled={currentIndex === 0}
            onClick={goToPrevious}
            type="button"
            variant="outline"
          >
            <ArrowLeft aria-hidden="true" />
            Previous
          </Button>

          {isLastQuestion ? (
            <Button disabled={!hasAnswered} onClick={restartQuiz} type="button">
              Restart
              <RotateCcw aria-hidden="true" />
            </Button>
          ) : (
            <Button disabled={!hasAnswered} onClick={goToNext} type="button">
              Next
              <ArrowRight aria-hidden="true" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
