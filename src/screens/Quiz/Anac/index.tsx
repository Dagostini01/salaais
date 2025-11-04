import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, ScrollView } from "react-native";
import { CircularProgress } from "react-native-circular-progress";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AnswerButton,
  AnswersContainer,
  AnswerText,
  BlockButton,
  BlockButtonText,
  BlocksContainer,
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
  ModalButton,
  ModalButtonCancel,
  ModalButtonsContainer,
  ModalButtonText,
  ModalButtonTextCancel,
  ModalCard,
  ModalContainer,
  ModalText,
  ProgressBarContainer,
  Question,
  QuestionContainer,
  QuizAnac,
  ResultActionButton,
  ResultActionButtonText,
  ResultActionsContainer,
  ResultBlockButton,
  ResultBlockText,
  ResultBlocksContainer,
  ResultModalCard,
  ResultModalContainer,
  ResultModalContent,
  ResultModalScroll,
  ResultModalTitle,
  ScreenContainer,
  ScrollContainer,
  TimerText,
} from "./styles";
import type { Question as QuizQuestion } from "./types";
import { gerarProvaAleatoria, gerarProvaNormal } from "../../../services";
import theme from "../../../global/global/theme";
import { ProgressStatusBar } from "../../../components/ProgressStatusBar";
import { ReviewButton } from "../../../components/ReviewButton";
import { AuthContext } from "../../../contexts/auth";
import { FREE_QUESTIONS_KEYS } from "../../../utils/quizConstants";
import { PermissionType } from "../../../utils/enums";

type BottomTabParamList = {
  Principal: undefined;
  Quiz: undefined;
  Revisao: undefined;
};

type NavigationProps = BottomTabNavigationProp<BottomTabParamList, "Principal">;

export function Anac() {
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(true);
  const [finishModalVisible, setFinishModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string | null;
  }>({});
  const [scorePercentage, setScorePercentage] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [finalTime, setFinalTime] = useState(7200);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [finish, setFinish] = useState(false);
  const [selectedResultBlock, setSelectedResultBlock] = useState(1);
  const [scoreByBlock, setScoreByBlock] = useState<Record<number, number>>({});
  const [quizStarted, setQuizStarted] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const initialTime = 7200;
  const isCommon = user?.permission === PermissionType.COMUM;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        let quizData: {
          data: Array<{
            id: number;
            questao_texto: string;
            bloco: number;
            materia: string;
            descricao: string;
            questao_a: string;
            questao_b: string;
            questao_c: string;
            questao_d: string;
            alternativa_correta: string;
          }>;
        };

        if (isCommon) {
          quizData = await gerarProvaNormal(user?.accessToken as string, {
            keys: FREE_QUESTIONS_KEYS,
          });
        } else {
          quizData = await gerarProvaAleatoria(user?.accessToken as string, {
            curso: "cms",
            blocos: [1, 2, 3, 4],
            questoes_por_bloco: 20,
          });
        }
        const formattedQuestions: QuizQuestion[] = quizData.data.map(
          (question) => ({
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
      } finally {
        setIsLoading(false);
      }
    }
    if (user?.accessToken) {
      fetchQuestions();
    }
  }, [user?.accessToken, isCommon]);

  const handleStartQuiz = () => {
    setModalVisible(false);
    setSelectedBlock(1);
    setQuizStarted(true);
    setTimeLeft(initialTime);
  };

  const handleSelectAnswer = (questionId: number, answerId: string) => {
    if (!isReviewMode) {
      setSelectedAnswers((prevState) => ({
        ...prevState,
        [String(questionId)]: answerId,
      }));
    }
  };

  const handleFinishQuiz = async () => {
    Alert.alert(
      "Finalizar Prova",
      "Tem certeza que deseja finalizar Prova ANAC?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Finalizar",
          onPress: async () => {
            const totalQuestions = questions.length;
            const correctAnswers = questions.filter((question) => {
              const selectedAnswerId = selectedAnswers[String(question.id)];
              const correctAnswer = question.answers.find(
                (answer) => answer.correct
              );
              return selectedAnswerId === correctAnswer?.id;
            }).length;

            const calculatedScorePercentage =
              (correctAnswers / totalQuestions) * 100;
            setScorePercentage(calculatedScorePercentage);

            try {
              await AsyncStorage.setItem(
                "lastQuizResult",
                JSON.stringify(calculatedScorePercentage)
              );
            } catch (error) {
              console.error("Erro ao salvar o resultado do quiz:", error);
            }

            const blocosUnicos = [...new Set(questions.map((q) => q.bloco))];
            const resultadosPorBloco: Record<number, number> = {};

            for (const bloco of blocosUnicos) {
              const questoesDoBloco = questions.filter(
                (q) => q.bloco === bloco
              );
              const acertosDoBloco = questoesDoBloco.filter((q) => {
                const respostaUsuario = selectedAnswers[String(q.id)];
                const correta = q.answers.find((a) => a.correct);
                return respostaUsuario === correta?.id;
              }).length;

              const percentual =
                (acertosDoBloco / questoesDoBloco.length) * 100;
              resultadosPorBloco[bloco] = percentual;
            }

            setScoreByBlock(resultadosPorBloco);
            setSelectedResultBlock(1);
            setFinalTime(timeLeft);
            setFinishModalVisible(true);
            setFinish(true);
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
    setSelectedBlock(1);
    setFinish(false);
    setQuizStarted(false);
    setModalVisible(true);
  };

  const handleReviewQuiz = () => {
    setIsReviewMode(true);
    setFinishModalVisible(false);
  };

  const handleShowInfo = () => {
    Alert.alert(
      "Informações do Simulado",
      `Você acertou ${scorePercentage.toFixed(2)}% das perguntas.\n` +
        `Tempo total: ${formatTime(finalTime)}`
    );
  };

  const handleBackToResults = () => {
    setIsReviewMode(false);
    setFinishModalVisible(true);
  };

  const handleCancelQuiz = () => {
    navigation.navigate("Principal");
  };

  const formatTime = (seconds: number) => {
    const remainingSeconds = seconds % 60;
    const minutes = Math.floor((seconds % 3600) / 60);
    const hour = Math.floor(seconds / 3600);
    return `${hour}:${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  useEffect(() => {
    if (isReviewMode) return;
    if (!quizStarted) return;
    if (modalVisible) return;
    if (!finish) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isReviewMode, finish, modalVisible, quizStarted]);

  useEffect(() => {
    if (timeLeft === 0 && !isReviewMode) {
      Alert.alert("Tempo esgotado!", "O tempo para o quiz acabou.");
      navigation.navigate("Principal");
    }
  }, [timeLeft, isReviewMode, navigation]);

  const handleSelectBlock = (blockNumber: number) => {
    setSelectedBlock(blockNumber);
  };

  const filteredQuestions =
    selectedBlock !== null
      ? questions
          .filter((question) => question.bloco === selectedBlock)
          .slice(0, 20)
      : [];

  const { top } = useSafeAreaInsets();

  return (
    <ScreenContainer paddingTop={top}>
      {isLoading ? (
        <LoadingContainer>
          <LoadingContent>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <LoadingText>Carregando questões...</LoadingText>
            <LoadingSubtext>Preparando seu simulado ANAC</LoadingSubtext>
          </LoadingContent>
        </LoadingContainer>
      ) : (
        <>
          <Modal visible={modalVisible} animationType="fade" transparent={true}>
            <ModalContainer>
              <ModalCard>
                <ModalText>Deseja iniciar o simulado ANAC?</ModalText>
                <ModalButtonsContainer>
                  <ModalButton onPress={handleStartQuiz}>
                    <ModalButtonText>Sim</ModalButtonText>
                  </ModalButton>
                  <ModalButtonCancel onPress={handleCancelQuiz}>
                    <ModalButtonTextCancel>Não</ModalButtonTextCancel>
                  </ModalButtonCancel>
                </ModalButtonsContainer>
              </ModalCard>
            </ModalContainer>
          </Modal>

          <Modal
            visible={finishModalVisible}
            animationType="fade"
            transparent={true}
          >
            <ResultModalContainer>
              <ResultModalCard>
                <ResultModalScroll>
                  <ResultModalContent>
                    <ResultModalTitle>Resultado por Bloco</ResultModalTitle>
                    <ResultBlocksContainer>
                      {[1, 2, 3, 4].map((bloco) => {
                        const nota = scoreByBlock[bloco] ?? 0;
                        let blocoColor = theme.colors.attention;

                        if (nota >= 70) {
                          blocoColor = theme.colors.succes;
                        } else if (nota >= 30 && nota < 70) {
                          blocoColor = theme.colors.primary;
                        }

                        return (
                          <ResultBlockButton
                            key={bloco}
                            backgroundColor={blocoColor}
                            isSelected={selectedResultBlock === bloco}
                            onPress={() => setSelectedResultBlock(bloco)}
                          >
                            <ResultBlockText>Bloco {bloco}</ResultBlockText>
                          </ResultBlockButton>
                        );
                      })}
                    </ResultBlocksContainer>
                    <ProgressBarContainer>
                      <ProgressStatusBar scoreByBlock={scoreByBlock} />
                    </ProgressBarContainer>
                    <CircularProgressContainer>
                      <CircularProgress
                        size={120}
                        width={16}
                        fill={scoreByBlock[selectedResultBlock] ?? 0}
                        tintColor={theme.colors.primary}
                        backgroundColor="#E0E0E0"
                      >
                        {() => (
                          <CircularProgressText>
                            {`${(
                              scoreByBlock[selectedResultBlock] ?? 0
                            ).toFixed(0)}%`}
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
                        <MaterialIcons
                          name="assignment"
                          size={20}
                          color="gray"
                        />
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
                </ResultModalScroll>
              </ResultModalCard>
            </ResultModalContainer>
          </Modal>

          {!modalVisible && (
            <HeaderQuiz>
              <FixedTimerContainer>
                <MaterialIcons name="access-time" size={24} color="white" />
                {!isReviewMode && (
                  <TimerText numberOfLines={1} ellipsizeMode="tail">
                    {formatTime(timeLeft)}
                  </TimerText>
                )}
              </FixedTimerContainer>

              <BlocksContainer>
                {[1, 2, 3, 4].map((blockNumber) => (
                  <BlockButton
                    key={blockNumber}
                    isSelected={selectedBlock === blockNumber}
                    onPress={() => handleSelectBlock(blockNumber)}
                  >
                    <BlockButtonText>Bloco {blockNumber}</BlockButtonText>
                  </BlockButton>
                ))}
              </BlocksContainer>

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
                        <Question>{`${index + 1}. ${
                          questionData.question
                        }`}</Question>
                      </QuestionContainer>

                      <AnswersContainer>
                        {questionData.answers.map((answer) => {
                          const isSelected = selectedAnswerId === answer.id;
                          const isCorrect = answer.correct;

                          let backgroundColor = "gray";

                          if (isReviewMode) {
                            if (isSelected && isCorrect) {
                              backgroundColor = theme.colors.primary;
                            } else if (isSelected && !isCorrect) {
                              backgroundColor = theme.colors.primary;
                            } else if (!isSelected && isCorrect) {
                              backgroundColor = theme.colors.succes;
                            }
                          } else {
                            backgroundColor = isSelected
                              ? theme.colors.primary
                              : "gray";
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
