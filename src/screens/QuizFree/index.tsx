import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/auth";
import theme from "../../global/global/theme";
import { gerarProvaNormal } from "../../services";
import {
  AnswerText,
  Bloco,
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
import { ProgressStatusBar } from "../../components/ProgressStatusBar";
import { ReviewButton } from "../../components/ReviewButton";

type BottomTabParamList = {
  Principal: undefined;
  Quiz: undefined;
  Revisao: undefined;
};

type NavigationProps = BottomTabNavigationProp<BottomTabParamList, "Principal">;

export function QuizFree() {
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
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null); // Novo estado para o bloco selecionado
  const [finish, setFinish] = useState(false);
  const [selectedResultBlock, setSelectedResultBlock] = useState(1);
  const [scoreByBlock, setScoreByBlock] = useState<Record<number, number>>({});
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps>();

  const initialTime = 7200;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const quizData = await gerarProvaNormal(user?.accessToken as string, {
          keys: [
            "cms-159",
            "cms-340",
            "cms-252",
            "cms-391",
            "cms-107",
            "cms-31",
            "cms-148",
            "cms-244",
            "cms-79",
            "cms-175",
            "cms-39",
            "cms-68",
            "cms-206",
            "cms-230",
            "cms-103",
            "cms-25",
            "cms-144",
            "cms-333",
            "cms-327",
            "cms-318",
            "cms-567",
            "cms-764",
            "cms-790",
            "cms-586",
            "cms-718",
            "cms-516",
            "cms-697",
            "cms-487",
            "cms-645",
            "cms-576",
            "cms-471",
            "cms-797",
            "cms-655",
            "cms-782",
            "cms-628",
            "cms-489",
            "cms-442",
            "cms-733",
            "cms-722",
            "cms-681",
            "cms-1555",
            "cms-1532",
            "cms-1528",
            "cms-1268",
            "cms-1259",
            "cms-1247",
            "cms-1223",
            "cms-1231",
            "cms-1216",
            "cms-1408",
            "cms-1527",
            "cms-1224",
            "cms-1354",
            "cms-1542",
            "cms-1305",
            "cms-1480",
            "cms-1341",
            "cms-1479",
            "cms-1525",
            "cms-1309",
            "cms-951",
            "cms-1162",
            "cms-925",
            "cms-1166",
            "cms-868",
            "cms-888",
            "cms-914",
            "cms-1069",
            "cms-829",
            "cms-863",
            "cms-1142",
            "cms-1138",
            "cms-827",
            "cms-942",
            "cms-906",
            "cms-1157",
            "cms-969",
            "cms-850",
            "cms-959",
            "cms-939",
          ],
        });
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

  const handleFinishQuiz = () => {
    Alert.alert(
      "Finalizar Prova",
      "Tem certeza que deseja finalizar a prova?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Finalizar",
          onPress: async () => {
            try {
              const totalQuestions = questions.length;
              const correctAnswers = questions.filter((question) => {
                const selectedAnswerId = selectedAnswers[String(question.id)];
                const correctAnswer = question.answers.find(
                  (answer) => answer.correct,
                );
                return selectedAnswerId === correctAnswer?.id;
              }).length;

              const calculatedScorePercentage =
                (correctAnswers / totalQuestions) * 100;
              setScorePercentage(calculatedScorePercentage);

              // Salvar o resultado geral
              await AsyncStorage.setItem(
                "lastQuizResult",
                JSON.stringify(calculatedScorePercentage),
              );

              // Cálculo por bloco
              const blocosUnicos = [...new Set(questions.map((q) => q.bloco))];
              const resultadosPorBloco: Record<number, number> = {};

              blocosUnicos.forEach((bloco) => {
                const questoesDoBloco = questions.filter((q) => q.bloco === bloco);
                const acertosDoBloco = questoesDoBloco.filter((q) => {
                  const respostaUsuario = selectedAnswers[String(q.id)];
                  const correta = q.answers.find((a) => a.correct);
                  return respostaUsuario === correta?.id;
                }).length;

                const percentual = (acertosDoBloco / questoesDoBloco.length) * 100;
                resultadosPorBloco[bloco] = percentual;
              });

              setScoreByBlock(resultadosPorBloco);
              setSelectedResultBlock(1); // Começa com bloco 1
              setFinalTime(timeLeft);
              setFinishModalVisible(true);
              setFinish(true);
            } catch (error) {
              console.error("Erro ao salvar o resultado do quiz:", error);
            }
          },
        },
      ],
    );
  };


  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setTimeLeft(initialTime);
    setFinishModalVisible(false);
    setIsReviewMode(false);
    setSelectedBlock(1); // Reinicia no Bloco 1
    setFinish(false);
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

  useEffect(() => {
    if (isReviewMode) return;
    if (!finish) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isReviewMode, finish]),
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
    <View
      style={{
        flex: 1,
        paddingVertical: top,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.background,
      }}
    >
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
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 10,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Resultado por bloco:
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: 20,
                }}
              >
                {[1, 2, 3, 4].map((bloco) => (
                  <TouchableOpacity
                    key={bloco}
                    style={{
                      backgroundColor:
                        selectedResultBlock === bloco
                          ? theme.colors.primary
                          : "gray",
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      borderRadius: 8,
                      marginHorizontal: 5,
                      marginBottom: 5,
                    }}
                    onPress={() => setSelectedResultBlock(bloco)}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Bloco {bloco}
                    </Text>
                  </TouchableOpacity>
                ))}
                <ProgressStatusBar scoreByBlock={scoreByBlock} />
              </View>


              <CircularProgress
                size={120}
                width={15}
                fill={scoreByBlock[selectedResultBlock] ?? 0}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
              >
                {() => (
                  <Text
                    style={{
                      fontSize: 24,
                      color: "#000",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {`${(scoreByBlock[selectedResultBlock] ?? 0).toFixed(0)}%`}
                  </Text>
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
                <MaterialIcons name="access-time" size={24} color="white" />
                {!isReviewMode && <TimerText numberOfLines={1} ellipsizeMode="tail">{formatTime(timeLeft)}</TimerText>}
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
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
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
                    {
                      questionData.answers.map((answer) => {
                        const selectedAnswerId = selectedAnswers[String(questionData.id)];
                        const isSelected = selectedAnswerId === answer.id;
                        const isCorrect = answer.correct;

                        let backgroundColor = "gray";

                        if (isReviewMode) {
                          if (isSelected && isCorrect) {
                            backgroundColor = theme.colors.primary; // Acertou - resposta marcada
                          } else if (isSelected && !isCorrect) {
                            backgroundColor = theme.colors.primary; // Errou - resposta marcada
                          } else if (!isSelected && isCorrect) {
                            backgroundColor = theme.colors.succes; // Mostra a correta (verde)
                          }
                        } else {
                          backgroundColor = isSelected ? theme.colors.primary : "gray";
                        }

                        const uniqueKey = `${questionData.id}-${answer.id}`;
                        
                        return (
                          <>
                            <TouchableOpacity
                              key={uniqueKey}
                              onPress={() => handleSelectAnswer(questionData.id, answer.id)}
                              style={{
                                padding: 10,
                                marginVertical: 5,
                                backgroundColor,
                                opacity: isReviewMode ? 0.6 : 1,
                                borderRadius: 10,
                              }}
                              disabled={isReviewMode}
                            >
                              <AnswerText selected={isSelected}>
                                {`${answer.id.toUpperCase()}. ${answer.text}`}
                              </AnswerText>
                              {/* <ReviewButton/> */}
                            </TouchableOpacity>
                          </>
                        );
                      })}

                    <ReviewButton />
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
    </View>
  );
}
