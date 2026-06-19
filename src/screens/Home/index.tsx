import React, { useCallback, useContext, useMemo, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Card } from "../../components/Card";
import { CardImage } from "../../components/CardImage";
import { PerformancePieChart } from "../../components/PerformancePieChart";
import { RecentAnacExams } from "../../components/RecentAnacExams";
import { getDashboardHome } from "../../services";
import {
  EMPTY_HOME_DASHBOARD,
  hasHomeDashboardData,
  type HomeDashboardPayload,
} from "../../types/homeDashboard";
import {
  CardsTest,
  Container,
  DashboardLoading,
  DashboardSection,
  EmptyDashboardCard,
  EmptyDashboardIcon,
  EmptyDashboardIconWrapper,
  EmptyDashboardText,
  EmptyDashboardTitle,
  Header,
  HighlightCards,
  Icon,
  LoadingText,
  NameCardTest,
  Photo,
  ScrollContent,
  ScreenWrapper,
  SectionHeader,
  SectionSubtitle,
  SubscriptionBadge,
  SubscriptionBadgeText,
  SubscriptionInfo,
  SubscriptionInfoLeft,
  SubscriptionInfoRow,
  SubscriptionInfoText,
  SubscriptionInfoTextTime,
  TextViewPlano,
  TitleViewPlano,
  UserGreeting,
  UserInfo,
  UserInfoContent,
  UserName,
  ViewPlano,
} from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ANAC_LOGO from "../../assets/anac-logo.png";
import { PermissionType } from "../../utils/enums";
import theme from "../../global/global/theme";

type BottomTabParamList = {
  Materias: undefined;
  SignIn: undefined;
  Principal: undefined;
  Anac: undefined;
  Planos: undefined;
  Blocos: undefined;
  Configuracoes: undefined;
};

type NavigationProps = BottomTabNavigationProp<BottomTabParamList, "Principal">;

export function Principal() {
  const navigation = useNavigation<NavigationProps>();
  const { user, setUser, getPermissionUser, getDiasRestantes } =
    useContext(AuthContext);
  const { top, bottom } = useSafeAreaInsets();
  const [dashboard, setDashboard] =
    useState<HomeDashboardPayload>(EMPTY_HOME_DASHBOARD);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);

  const isCommon = useMemo(
    () => user?.permission === PermissionType.COMUM,
    [user?.permission],
  );

  const hasDashboardData = useMemo(
    () => hasHomeDashboardData(dashboard),
    [dashboard],
  );

  const handleNavigate = useCallback(
    (route: keyof BottomTabParamList) => {
      navigation.navigate(route);
    },
    [navigation],
  );

  const navigateToSettings = () => handleNavigate("Configuracoes");
  const navigateToAnac = () => handleNavigate("Anac");
  const navigateToBlocos = () => handleNavigate("Blocos");
  const navigateToMaterias = () => handleNavigate("Materias");

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const fetchDashboard = async () => {
        if (!user?.accessToken) return;
        setIsDashboardLoading(true);
        try {
          const data = await getDashboardHome(user.accessToken);
          if (active) setDashboard(data);
        } catch (err) {
          console.error("Erro ao carregar dashboard:", err);
          if (active) setDashboard(EMPTY_HOME_DASHBOARD);
        } finally {
          if (active) setIsDashboardLoading(false);
        }
      };

      const fetchPermission = async () => {
        if (!user?.accessToken) return;
        try {
          const permission = await getPermissionUser(user.accessToken);
          const dias = await getDiasRestantes(user.accessToken);
          if (!active) return;
          if (permission && permission !== user.permission) {
            setUser({ ...user, permission });
          }
          if (dias && dias !== user.diasRestantes) {
            setUser({ ...user, diasRestantes: dias });
          }
        } catch (err) {
          console.error("error", err);
        }
      };

      fetchDashboard();
      fetchPermission();
      return () => {
        active = false;
      };
    }, [
      user?.accessToken,
      user?.permission,
      getPermissionUser,
      setUser,
      user,
      getDiasRestantes,
    ]),
  );

  if (user == null) return null;

  return (
    <ScreenWrapper>
      <Header style={{ paddingTop: top * 1.25 }}>
        <UserInfo>
          <UserInfoContent>
            <Photo
              source={
                user.photoUrl
                  ? { uri: user.photoUrl }
                  : require("../../assets/user.png")
              }
            />
            <View>
              <UserGreeting>Olá {user.name}!</UserGreeting>
              <UserName>Pronto para decolar?</UserName>
            </View>
          </UserInfoContent>
          <TouchableOpacity onPress={navigateToSettings}>
            <Icon name="settings" />
          </TouchableOpacity>
        </UserInfo>
        <SubscriptionInfo>
          <SubscriptionInfoRow>
            <SubscriptionInfoLeft>
              <SubscriptionInfoText>Plano Atual</SubscriptionInfoText>
              <SubscriptionInfoTextTime>
                {isCommon
                  ? "Acesso Gratuito"
                  : `Seu acesso encerra em ${user.diasRestantes ?? 0} dias`}
              </SubscriptionInfoTextTime>
            </SubscriptionInfoLeft>
            <SubscriptionBadge>
              <SubscriptionBadgeText>
                {isCommon ? "Demonstração" : `CMS ${user.permission}`}
              </SubscriptionBadgeText>
            </SubscriptionBadge>
          </SubscriptionInfoRow>
        </SubscriptionInfo>
      </Header>

      <Container>
        <ScrollContent contentContainerStyle={{ paddingBottom: bottom + 20 }}>
          <CardsTest>
            <SectionHeader>
              <NameCardTest>Realizar Simulado</NameCardTest>
              <SectionSubtitle>Escolha como quer estudar</SectionSubtitle>
            </SectionHeader>
            <HighlightCards>
              <CardImage onPress={navigateToAnac} imageUrl={ANAC_LOGO} />
              {!isCommon && (
                <>
                  <Card
                    onPress={navigateToBlocos}
                    title="Blocos"
                    iconName="book"
                  />
                  <Card
                    onPress={navigateToMaterias}
                    title="Matérias"
                    iconName="menu-book"
                  />
                </>
              )}
            </HighlightCards>
          </CardsTest>

          {isDashboardLoading ? (
            <DashboardLoading>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <LoadingText>Carregando seu desempenho...</LoadingText>
            </DashboardLoading>
          ) : hasDashboardData ? (
            <DashboardSection>
              <PerformancePieChart data={dashboard.mediaDesempenho} />
              <RecentAnacExams exams={dashboard.ultimasProvasAnac} />
            </DashboardSection>
          ) : (
            <EmptyDashboardCard>
              <EmptyDashboardIconWrapper>
                <EmptyDashboardIcon name="bar-chart-2" />
              </EmptyDashboardIconWrapper>
              <EmptyDashboardTitle>
                Nenhuma prova realizada ainda
              </EmptyDashboardTitle>
              <EmptyDashboardText>
                Faça seu primeiro simulado ANAC para acompanhar sua média de
                desempenho e ver o histórico das suas provas aqui.
              </EmptyDashboardText>
            </EmptyDashboardCard>
          )}

          {isCommon && (
            <ViewPlano>
              <TitleViewPlano>
                Você está na versão de demonstração.
              </TitleViewPlano>
              <TextViewPlano>
                Com ela, você pode realizar uma prova modelo gratuitamente. Para
                liberar todos os recursos e se preparar com eficiência para a
                ANAC, adquira um plano de estudos clicando no ícone de
                configurações e veja sua conta.
              </TextViewPlano>
            </ViewPlano>
          )}

        </ScrollContent>
      </Container>
    </ScreenWrapper>
  );
}
