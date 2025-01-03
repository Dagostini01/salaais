import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CircularProgress } from "react-native-circular-progress";
import { AuthContext } from "../../contexts/auth";
import theme from "../../global/global/theme";
import { gerarProvaAleatoria } from "../../services";
import {
  AnswerText,
  Bloco,
  Container,
  FinishButton,
  FinishButtonText,
  FixedTimerContainer,
  HeaderQuiz,
  ModalButton,
  ModalButtonCancel,
  ModalButtonText,
  ModalButtonTextCancel,
  ModalContainer,
  ModalText,
  Question,
  QuizAnac,
  ScrollContainer,
  TimerText,
} from "./styles";
import type { Question as QuizQuestion } from "./types";

type BottomTabParamList = {
  Principal: undefined;
  Quiz: undefined;
  Revisao: undefined;
};

type NavigationProps = BottomTabNavigationProp<BottomTabParamList, "Principal">;

export function Quiz() {
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(true);
  const [finishModalVisible, setFinishModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string | null;
  }>({});
  const [scorePercentage, setScorePercentage] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [finalTime, setFinalTime] = useState(7200);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null); // Novo estado para o bloco selecionado
  const navigation = useNavigation<NavigationProps>();

  const initialTime = 7200;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const quizData = await gerarProvaAleatoria(
          user?.accessToken as string,
          {
            curso: "cms",
            blocos: [1, 2, 3, 4],
            questoes_por_bloco: 20,
          },
        );
        const formattedQuestions: QuizQuestion[] = quizData.data.map(
          (question: any) => ({
            id: question.id,
            question: question.questao_texto,
            bloco: question.bloco,
            materia: question.materia,
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
          }),
        );
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Erro ao carregar as questões:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const handleStartQuiz = () => {
    setModalVisible(false);
    setSelectedBlock(1); // Inicia o quiz no Bloco 1
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
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter((question) => {
      const selectedAnswerId = selectedAnswers[String(question.id)];
      const correctAnswer = question.answers.find((answer) => answer.correct);
      return selectedAnswerId === correctAnswer?.id;
    }).length;

    const calculatedScorePercentage = (correctAnswers / totalQuestions) * 100;
    setScorePercentage(calculatedScorePercentage);

    // Salva o resultado no AsyncStorage
    try {
      await AsyncStorage.setItem(
        "lastQuizResult",
        JSON.stringify(calculatedScorePercentage),
      );
    } catch (error) {
      console.error("Erro ao salvar o resultado do quiz:", error);
    }

    setFinalTime(timeLeft);
    setFinishModalVisible(true);
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setTimeLeft(initialTime);
    setFinishModalVisible(false);
    setIsReviewMode(false);
    setSelectedBlock(1); // Reinicia no Bloco 1
  };

  const handleReviewQuiz = () => {
    setIsReviewMode(true);
    setFinishModalVisible(false);
  };

  const handleShowInfo = () => {
    Alert.alert(
      "Informações do Simulado",
      `Você acertou ${scorePercentage.toFixed(2)}% das perguntas.\n` +
        `Tempo total: ${formatTime(finalTime)}`,
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
    return `${hour}:${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useFocusEffect(
    useCallback(() => {
      if (isReviewMode) return;

      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }, [isReviewMode]),
  );

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

  return (
    <Container>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Carregando...</Text>
        </View>
      ) : (
        <>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
          >
            <ModalContainer>
              <ModalText>Deseja iniciar o simulado ANAC?</ModalText>
              <ModalButton onPress={handleStartQuiz}>
                <ModalButtonText>Sim</ModalButtonText>
              </ModalButton>
              <ModalButtonCancel onPress={handleCancelQuiz}>
                <ModalButtonTextCancel>Não</ModalButtonTextCancel>
              </ModalButtonCancel>
            </ModalContainer>
          </Modal>

          <Modal
            visible={finishModalVisible}
            animationType="slide"
            transparent={true}
          >
            <ModalContainer style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 16, marginBottom: 20 }}>
                Resultado final simulado ANAC:
              </Text>
              <CircularProgress
                size={120}
                width={15}
                fill={scorePercentage}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
              >
                {() => (
                  <Text
                    style={{ fontSize: 24, color: "#000" }}
                  >{`${scorePercentage.toFixed(0)}%`}</Text>
                )}
              </CircularProgress>

              <View
                style={{
                  flexDirection: "column",
                  marginTop: 30,
                  justifyContent: "space-between",
                }}
              >
                <ModalButton
                  onPress={handleRestartQuiz}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <MaterialIcons
                    name="refresh"
                    size={24}
                    color="gray"
                    style={{ marginRight: 8 }}
                  />
                  <ModalButtonText>Refazer</ModalButtonText>
                </ModalButton>
                <ModalButton
                  onPress={handleReviewQuiz}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <MaterialIcons
                    name="assignment"
                    size={24}
                    color="gray"
                    style={{ marginRight: 8 }}
                  />
                  <ModalButtonText>Revisão</ModalButtonText>
                </ModalButton>
                <ModalButton
                  onPress={handleShowInfo}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <MaterialIcons
                    name="info"
                    size={24}
                    color="gray"
                    style={{ marginRight: 8 }}
                  />
                  <ModalButtonText>Info</ModalButtonText>
                </ModalButton>
                <ModalButton
                  onPress={handleCancelQuiz}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: theme.colors.attention,
                  }}
                >
                  <MaterialIcons
                    name="cancel"
                    size={24}
                    color="white"
                    style={{ marginRight: 8 }}
                  />
                  <ModalButtonText>Cancelar</ModalButtonText>
                </ModalButton>
              </View>
            </ModalContainer>
          </Modal>

          {!modalVisible && (
            <HeaderQuiz>
              <FixedTimerContainer>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name="access-time" size={24} color="white" />
                  {!isReviewMode && (
                    <TimerText>{formatTime(timeLeft)}</TimerText>
                  )}
                </View>
              </FixedTimerContainer>

              {/* Botões para alternar entre os blocos */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginBottom: 20,
                }}
              >
                {[1, 2, 3, 4].map((blockNumber) => (
                  <TouchableOpacity
                    key={blockNumber}
                    onPress={() => handleSelectBlock(blockNumber)}
                    style={{
                      padding: 10,
                      backgroundColor:
                        selectedBlock === blockNumber
                          ? theme.colors.primary
                          : "gray",
                      borderRadius: 10,
                      flex: 1,
                      alignItems: "center",
                      marginHorizontal: 5,
                      marginTop: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 15 }}>
                      Bloco {blockNumber}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <ScrollView
                contentContainerStyle={ScrollContainer}
                showsVerticalScrollIndicator={false}
              >
                {filteredQuestions.map((questionData, index) => (
                  <QuizAnac key={questionData.id}>
                    <Bloco>
                      {/* BL {questionData.bloco} - (
                      {questionData.materia.toUpperCase()}) */}
                    </Bloco>
                    <Question
                      style={{
                        padding: 10,
                        marginHorizontal: 5,
                      }}
                    >{`${index + 1}. ${questionData.question}`}</Question>
                    {questionData.answers.map((answer) => {
                      const isSelected =
                        selectedAnswers[String(questionData.id)] === answer.id;
                      return (
                        <TouchableOpacity
                          key={answer.id}
                          onPress={() =>
                            handleSelectAnswer(questionData.id, answer.id)
                          }
                          style={{
                            padding: 10,
                            marginVertical: 5,
                            backgroundColor: isSelected
                              ? theme.colors.primary
                              : "gray",
                            opacity: isReviewMode ? 0.6 : 1,
                            borderRadius: 10,
                          }}
                          disabled={isReviewMode}
                        >
                          <AnswerText selected={isSelected}>
                            {`${answer.id.toUpperCase()}. ${answer.text}`}
                          </AnswerText>
                        </TouchableOpacity>
                      );
                    })}
                  </QuizAnac>
                ))}
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
    </Container>
  );
}
