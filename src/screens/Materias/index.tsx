import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
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
import { AuthContext } from "../../contexts/auth";
import { gerarProvaPorMateria } from "../../data/questions";
import { Materia } from "../../enum/enum";
import theme from "../../global/global/theme";
import {
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
  QuizAnac,
  ScrollContainer,
  TimerText,
} from "./styles";
import { Answer, Question } from "./types"; // Importe os tipos do arquivo types.tsx

export function Materias() {
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(true);
  const [finishModalVisible, setFinishModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // Tempo inicial (10 minutos)
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string | null;
  }>({});
  const [scorePercentage, setScorePercentage] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [finalTime, setFinalTime] = useState(600);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null);
  const navigation = useNavigation<NavigationProps>();

  const initialTime = 600; // Tempo inicial

  type BottomTabParamList = {
    Principal: undefined;
    Quiz: undefined;
    Revisao: undefined;
  };

  type NavigationProps = BottomTabNavigationProp<
    BottomTabParamList,
    "Principal"
  >;

  const fetchQuestions = async ({ materia }: { materia: Materia }) => {
    try {
      if (user == null) return;
      const questoes = await gerarProvaPorMateria(user.accessToken, {
        questao_por_materia: [
          {
            curso: "cms",
            materia: materia.toLowerCase(),
            quantidade_questoes: 10,
          },
        ],
      });
      const formattedQuestions = questoes.map((question: any) => ({
        id: question.id,
        question: question.questao_texto,
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
      }));
      setQuestions(formattedQuestions);
    } catch (error) {
      Alert.alert("Erro ao carregar as questões:");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = (materia: Materia) => {
    fetchQuestions({ materia });
    setModalVisible(false);
    setSelectedMateria(materia); // Sem conversão para string, mantém o tipo Materia
  };

  const handleSelectAnswer = (questionId: number, answerId: string) => {
    if (!isReviewMode) {
      setSelectedAnswers((prevState) => ({
        ...prevState,
        [String(questionId)]: answerId,
      }));
    }
  };

  const handleCancelQuiz = () => {
    setModalVisible(false);
    navigation.navigate("Principal");
  };

  const handleFinishQuiz = () => {
    const filteredQuestions =
      selectedMateria !== null
        ? questions.filter(
            (question) =>
              question.materia === selectedMateria?.trim().toLowerCase(),
          ) // Comparação com materia em minúsculas e sem espaços extras
        : [];

    const totalQuestions = filteredQuestions.length;
    const correctAnswers = filteredQuestions.filter((question) => {
      const selectedAnswerId = selectedAnswers[String(question.id)];
      const correctAnswer = question.answers.find((answer) => answer.correct);
      return selectedAnswerId === correctAnswer?.id;
    }).length;

    const calculatedScorePercentage = (correctAnswers / totalQuestions) * 100;
    setScorePercentage(calculatedScorePercentage);
    setFinalTime(timeLeft);
    setFinishModalVisible(true);
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setTimeLeft(initialTime);
    setFinishModalVisible(false);
    setIsReviewMode(false);
    setSelectedMateria(null); // Reinicia a matéria
    setModalVisible(true); // Mostra o modal de seleção novamente
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    if (timeLeft === 0 && !isReviewMode) {
      Alert.alert("Tempo esgotado!", "O tempo para o quiz acabou.");
    }
  }, [timeLeft, isReviewMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isReviewMode && timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isReviewMode, timeLeft]);

  const filteredQuestions =
    selectedMateria !== null
      ? questions.filter(
          (question) =>
            question.materia === selectedMateria?.trim().toLowerCase(),
        ) // Comparação em minúsculas e sem espaços extras
      : [];

  return (
    <Container>
      {/* Modal para seleção de matéria */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <ModalContainer>
          <ModalText>Escolha uma Matéria para Iniciar:</ModalText>

          {/* Bloco 1 */}
          <ModalText style={{ fontWeight: "bold", fontSize: 18 }}>
            Bloco 1
          </ModalText>
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {["EME", "SBV"].map((materia) => (
                <ModalButton
                  key={materia}
                  style={{ margin: 2 }} // Espaçamento entre botões
                  onPress={() => handleStartQuiz(materia as Materia)}
                >
                  <ModalButtonText>{materia}</ModalButtonText>
                </ModalButton>
              ))}
            </View>
          </View>

          {/* Bloco 2 */}
          <ModalText style={{ fontWeight: "bold", fontSize: 18 }}>
            Bloco 2
          </ModalText>
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {["FHU", "SAC", "RAC", "RPA", "SVO"].map((materia) => (
                <ModalButton
                  key={materia}
                  style={{ margin: 2 }} // Espaçamento entre botões
                  onPress={() => handleStartQuiz(materia as Materia)}
                >
                  <ModalButtonText>{materia}</ModalButtonText>
                </ModalButton>
              ))}
            </View>
          </View>

          {/* Bloco 3 */}
          <ModalText style={{ fontWeight: "bold", fontSize: 18 }}>
            Bloco 3
          </ModalText>
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {["AFI", "PSS"].map((materia) => (
                <ModalButton
                  key={materia}
                  style={{ margin: 2 }} // Espaçamento entre botões
                  onPress={() => handleStartQuiz(materia as Materia)}
                >
                  <ModalButtonText>{materia}</ModalButtonText>
                </ModalButton>
              ))}
            </View>
          </View>

          {/* Bloco 4 */}
          <ModalText style={{ fontWeight: "bold", fontSize: 18 }}>
            Bloco 4
          </ModalText>
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {["AER", "NAV", "MET"].map((materia) => (
                <ModalButton
                  key={materia}
                  style={{ margin: 2 }} // Espaçamento entre botões
                  onPress={() => handleStartQuiz(materia as Materia)}
                >
                  <ModalButtonText>{materia}</ModalButtonText>
                </ModalButton>
              ))}
            </View>
          </View>

          <ModalButtonCancel onPress={handleCancelQuiz}>
            <ModalButtonTextCancel>Cancelar</ModalButtonTextCancel>
          </ModalButtonCancel>
        </ModalContainer>
      </Modal>

      {/* Modal de finalização */}
      <Modal
        visible={finishModalVisible}
        animationType="slide"
        transparent={true}
      >
        <ModalContainer style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            Resultado da Matéria: {selectedMateria?.toUpperCase()}
          </Text>
          <CircularProgress
            size={120}
            width={15}
            fill={scorePercentage}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
          >
            {() => (
              <Text style={{ fontSize: 24, color: "#000" }}>
                {`${scorePercentage.toFixed(0)}%`}
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

      {!modalVisible &&
      selectedMateria &&
      filteredQuestions.length > 0 &&
      !isLoading ? (
        <>
          <HeaderQuiz>
            <FixedTimerContainer>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="access-time" size={24} color="white" />
                <TimerText>{formatTime(timeLeft)}</TimerText>
              </View>
            </FixedTimerContainer>

            <ScrollView
              contentContainerStyle={ScrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {filteredQuestions.map((questionData, index) => (
                <QuizAnac key={questionData.id}>
                  <Bloco
                    style={{
                      marginVertical: 5,
                      marginHorizontal: 5,
                      marginTop: 20,
                    }}
                  >
                    Matéria: {questionData.materia.toUpperCase()}
                  </Bloco>
                  <Text>{`${index + 1}. ${questionData.question}`}</Text>
                  {questionData.answers &&
                    questionData.answers.map((answer: Answer) => {
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
                            borderRadius: 10,
                          }}
                        >
                          <Text>{`${answer.id.toUpperCase()}. ${answer.text}`}</Text>
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
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Carregando...</Text>
        </View>
      )}
    </Container>
  );
}
