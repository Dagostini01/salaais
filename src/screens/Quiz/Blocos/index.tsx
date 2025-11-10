import { MaterialIcons } from "@expo/vector-icons";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Alert, Modal, ScrollView } from "react-native";
import { CircularProgress } from "react-native-circular-progress";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  AnswerButton,
  AnswerText,
  AnswersContainer,
  Bloco,
  BlockSelectionButton,
  BlockSelectionButtonText,
  BlockSelectionGrid,
  CircularProgressContainer,
  CircularProgressText,
  FinishButton,
  FinishButtonText,
  FixedTimerContainer,
  HeaderQuiz,
  JustificationContainer,
  JustificationText,
  LoadingContainer,
  LoadingContent,
  LoadingSubtext,
  LoadingText,
  ModalButtonCancel,
  ModalButtonTextCancel,
  ModalButtonsContainer,
  ModalCard,
  ModalContainer,
  ModalText,
  Question,
  QuestionContainer,
  QuizAnac,
  ResultActionButton,
  ResultActionButtonText,
  ResultActionsContainer,
  ResultModalCard,
  ResultModalContainer,
  ResultModalContent,
  ResultModalTitle,
  ScreenContainer,
  ScrollContainer,
  TimerText,
} from "./styles";
import type { Question as QuizQuestion } from "./types";
import { AuthContext } from "../../../contexts/auth";
import theme from "../../../global/global/theme";
import { gerarProvaAleatoria } from "../../../services";
import { ReviewButton } from "../../../components/ReviewButton";

type BottomTabParamList = {
  Principal: undefined;
  Quiz: undefined;
  Revisao: undefined;
};

type NavigationProps = BottomTabNavigationProp<BottomTabParamList, "Principal">;

export function Blocos() {
  const initialTime = 0;
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(true);
  const [finishModalVisible, setFinishModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string | null;
  }>({});
  const [scorePercentage, setScorePercentage] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const navigation = useNavigation<NavigationProps>();
  const { top } = useSafeAreaInsets();

  const fetchQuestions = async (blockNumber: number) => {
    try {
      if (!user?.accessToken) return;
      setIsLoading(true);
      const quizData = await gerarProvaAleatoria(user.accessToken, {
        curso: "cms",
        blocos: [blockNumber],
        questoes_por_bloco: 20,
      });
      const formattedQuestions: QuizQuestion[] = quizData.data.map(
        (question: any) => ({
          id: question.id,
          question: question.questao_texto,
          bloco: question.bloco,
          materia: question.materia,
          descricao: question.descricao,
          answers: [
            {
              id: "a",
              text: question.questao_a,
              correct: question.alternativa_correta === "a",
            },
            {
              id: "b",
              text: question.questao_b,
              correct: question.alternativa_correta === "b",
            },
            {
              id: "c",
              text: question.questao_c,
              correct: question.alternativa_correta === "c",
            },
            {
              id: "d",
              text: question.questao_d,
              correct: question.alternativa_correta === "d",
            },
          ],
        })
      );
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Erro ao carregar as questões:", error);
      Alert.alert(
        "Erro",
        "Não foi possível carregar as questões do bloco selecionado. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = (blockNumber: number) => {
    setSelectedBlock(blockNumber);
    setSelectedAnswers({});
    setIsReviewMode(false);
    setTimeLeft(initialTime);
    setModalVisible(false);
    fetchQuestions(blockNumber);
  };

  const handleCancelQuiz = () => {
    setModalVisible(false);
    navigation.navigate("Principal");
  };

  const handleSelectAnswer = (questionId: number, answerId: string) => {
    if (!isReviewMode) {
      setSelectedAnswers((prevState) => ({
        ...prevState,
        [String(questionId)]: answerId,
      }));
    }
  };

  const handleFinishQuiz = () => {
    Alert.alert(
      "Finalizar Bloco",
      "Tem certeza que deseja finalizar o bloco?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Finalizar",
          onPress: () => {
            const filteredQuestions = questions.filter(
              (question) => question.bloco === selectedBlock
            );
            const totalQuestions = filteredQuestions.length;
            const correctAnswers = filteredQuestions.filter((question) => {
              const selectedAnswerId = selectedAnswers[String(question.id)];
              const correctAnswer = question.answers.find(
                (answer) => answer.correct
              );
              return selectedAnswerId === correctAnswer?.id;
            }).length;

            const calculatedScorePercentage =
              totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

            setScorePercentage(calculatedScorePercentage);
            setFinalTime(timeLeft);
            setFinishModalVisible(true);
          },
        },
      ]
    );
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setTimeLeft(initialTime);
    setFinishModalVisible(false);
    setIsReviewMode(false);
    setSelectedBlock(null);
    setModalVisible(true);
    setQuestions([]);
  };

  const handleReviewQuiz = () => {
    setIsReviewMode(true);
    setFinishModalVisible(false);
  };

  const handleShowInfo = () => {
    Alert.alert(
      "Informações do Simulado",
      `Você acertou ${scorePercentage.toFixed(
        2
      )}% das perguntas.\nTempo total: ${formatTime(finalTime)}`
    );
  };

  const handleBackToResults = () => {
    setIsReviewMode(false);
    setFinishModalVisible(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const quizStarted = useMemo(
    () => selectedBlock !== null && !modalVisible,
    [selectedBlock, modalVisible]
  );

  useEffect(() => {
    if (!quizStarted || isReviewMode || isLoading || finishModalVisible) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, isReviewMode, isLoading, finishModalVisible]);

  const filteredQuestions = useMemo(() => {
    if (selectedBlock == null) return [];
    return questions
      .filter((question) => question.bloco === selectedBlock)
      .slice(0, 20);
  }, [questions, selectedBlock]);

  return (
    <ScreenContainer paddingTop={top}>
      {isLoading ? (
        <LoadingContainer>
          <LoadingContent>
            <CircularProgress
              size={80}
              width={10}
              fill={60}
              tintColor={theme.colors.primary}
              backgroundColor="#E0E0E0"
            />
            <LoadingText>Carregando questões...</LoadingText>
            <LoadingSubtext>Preparando o bloco selecionado</LoadingSubtext>
          </LoadingContent>
        </LoadingContainer>
      ) : (
        <>
          <Modal visible={modalVisible} animationType="fade" transparent>
            <ModalContainer>
              <ModalCard>
                <ModalText>Escolha um bloco para iniciar</ModalText>
                <BlockSelectionGrid>
                  {[1, 2, 3, 4].map((blockNumber) => (
                    <BlockSelectionButton
                      key={blockNumber}
                      onPress={() => handleStartQuiz(blockNumber)}
                    >
                      <BlockSelectionButtonText>
                        {`Bloco ${blockNumber}`}
                      </BlockSelectionButtonText>
                    </BlockSelectionButton>
                  ))}
                </BlockSelectionGrid>
                <ModalButtonsContainer>
                  <ModalButtonCancel onPress={handleCancelQuiz}>
                    <ModalButtonTextCancel>Cancelar</ModalButtonTextCancel>
                  </ModalButtonCancel>
                </ModalButtonsContainer>
              </ModalCard>
            </ModalContainer>
          </Modal>

          <Modal visible={finishModalVisible} animationType="fade" transparent>
            <ResultModalContainer>
              <ResultModalCard>
                <ResultModalContent>
                  <ResultModalTitle>
                    {`Resultado do Bloco ${selectedBlock ?? ""}`}
                  </ResultModalTitle>
                  <CircularProgressContainer>
                    <CircularProgress
                      size={120}
                      width={16}
                      fill={scorePercentage}
                      tintColor={theme.colors.primary}
                      backgroundColor="#E0E0E0"
                    >
                      {() => (
                        <CircularProgressText>
                          {`${scorePercentage.toFixed(0)}%`}
                        </CircularProgressText>
                      )}
                    </CircularProgress>
                  </CircularProgressContainer>
                  <ResultActionsContainer>
                    <ResultActionButton onPress={handleRestartQuiz}>
                      <MaterialIcons name="refresh" size={20} color="gray" />
                      <ResultActionButtonText>Refazer</ResultActionButtonText>
                    </ResultActionButton>
                    <ResultActionButton onPress={handleReviewQuiz}>
                      <MaterialIcons name="assignment" size={20} color="gray" />
                      <ResultActionButtonText>Revisão</ResultActionButtonText>
                    </ResultActionButton>
                    <ResultActionButton onPress={handleShowInfo}>
                      <MaterialIcons name="info" size={20} color="gray" />
                      <ResultActionButtonText>Info</ResultActionButtonText>
                    </ResultActionButton>
                    <ResultActionButton
                      onPress={handleCancelQuiz}
                      variant="danger"
                    >
                      <MaterialIcons name="cancel" size={20} color="white" />
                      <ResultActionButtonText variant="danger">
                        Cancelar
                      </ResultActionButtonText>
                    </ResultActionButton>
                  </ResultActionsContainer>
                </ResultModalContent>
              </ResultModalCard>
            </ResultModalContainer>
          </Modal>

          {quizStarted && (
            <HeaderQuiz>
              <FixedTimerContainer>
                <MaterialIcons name="access-time" size={24} color="white" />
                {!isReviewMode && (
                  <TimerText numberOfLines={1} ellipsizeMode="tail">
                    {formatTime(timeLeft)}
                  </TimerText>
                )}
              </FixedTimerContainer>

              <ScrollView
                contentContainerStyle={ScrollContainer}
                showsVerticalScrollIndicator={false}
              >
                {filteredQuestions.map((questionData, index) => {
                  const selectedAnswerId =
                    selectedAnswers[String(questionData.id)];

                  return (
                    <QuizAnac key={questionData.id}>
                      <QuestionContainer>
                        <Bloco>
                          {`Bloco ${
                            questionData.bloco
                          } · ${questionData.materia.toUpperCase()}`}
                        </Bloco>
                        <Question>{`${index + 1}. ${
                          questionData.question
                        }`}</Question>
                      </QuestionContainer>

                      <AnswersContainer>
                        {questionData.answers.map((answer) => {
                          const isSelected = selectedAnswerId === answer.id;
                          const isCorrect = answer.correct;

                          let backgroundColor = theme.colors.text;

                          if (isReviewMode) {
                            if (isSelected && isCorrect) {
                              backgroundColor = theme.colors.primary;
                            } else if (isSelected && !isCorrect) {
                              backgroundColor = theme.colors.attention;
                            } else if (!isSelected && isCorrect) {
                              backgroundColor = theme.colors.succes;
                            } else {
                              backgroundColor = theme.colors.text;
                            }
                          } else if (isSelected) {
                            backgroundColor = theme.colors.primary;
                          }

                          return (
                            <AnswerButton
                              key={`${questionData.id}-${answer.id}`}
                              backgroundColor={backgroundColor}
                              isReviewMode={isReviewMode}
                              onPress={() =>
                                handleSelectAnswer(questionData.id, answer.id)
                              }
                              disabled={isReviewMode}
                            >
                              <AnswerText selected={isSelected}>
                                {`${answer.id.toUpperCase()}. ${answer.text}`}
                              </AnswerText>
                            </AnswerButton>
                          );
                        })}
                      </AnswersContainer>

                      {isReviewMode && (
                        <>
                          <JustificationContainer>
                            <JustificationText>
                              {questionData.descricao ||
                                "Nenhuma justificativa disponível."}
                            </JustificationText>
                          </JustificationContainer>

                          <ReviewButton
                            questaoKey={`CMS-${questionData.id}`}
                            alternativaAssinalada={
                              selectedAnswers[String(questionData.id)] ?? ""
                            }
                            acertouQuestao={
                              questionData.answers.find((a) => a.correct)
                                ?.id ===
                              selectedAnswers[String(questionData.id)]
                            }
                            token={user?.accessToken ?? ""}
                          />
                        </>
                      )}
                    </QuizAnac>
                  );
                })}
              </ScrollView>

              {!isReviewMode ? (
                <FinishButton onPress={handleFinishQuiz}>
                  <FinishButtonText>Finalizar</FinishButtonText>
                </FinishButton>
              ) : (
                <FinishButton onPress={handleBackToResults}>
                  <FinishButtonText>Voltar ao Resultado</FinishButtonText>
                </FinishButton>
              )}
            </HeaderQuiz>
          )}
        </>
      )}
    </ScreenContainer>
  );
}
