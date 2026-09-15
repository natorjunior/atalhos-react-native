// Camada de dados: apenas a fonte bruta dos atalhos.
// Adicionar novos itens aqui é o suficiente para que apareçam na busca e nos filtros.
window.App = window.App || {};
window.App.data = window.App.data || {};

window.App.data.SNIPPETS = [
  {
    id: "init-expo",
    title: "Iniciar projeto (Expo)",
    category: "Iniciar Projeto",
    tags: ["iniciar", "criar", "novo projeto", "expo", "setup"],
    description: "Cria um novo projeto React Native usando Expo (recomendado para começar rápido).",
    lang: "bash",
    snack: "",
    code: `npx create-expo-app@latest meu-app
cd meu-app
npx expo start`
  },
  {
    id: "init-cli",
    title: "Iniciar projeto (React Native CLI)",
    category: "Iniciar Projeto",
    tags: ["iniciar", "criar", "novo projeto", "cli", "setup", "bare"],
    description: "Cria um novo projeto React Native puro (sem Expo), com acesso total ao código nativo.",
    lang: "bash",
    snack: "",
    code: `npx @react-native-community/cli init MeuApp
cd MeuApp
npx react-native run-android
npx react-native run-ios`
  },
  {
    id: "safeareaview-basic",
    title: "SafeAreaView básico",
    category: "Layout",
    tags: ["safeareaview", "safe area", "layout", "tela"],
    description: "Envolve a tela evitando notch, status bar e áreas de gestos do sistema.",
    lang: "jsx",
    snack: "",
    code: `import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Conteúdo da tela</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});`
  },
  {
    id: "safeareaview-context",
    title: "SafeAreaView (react-native-safe-area-context)",
    category: "Layout",
    tags: ["safeareaview", "safe area", "context", "provider", "layout"],
    description: "Versão mais completa e recomendada, usando a lib react-native-safe-area-context.",
    lang: "jsx",
    snack: "https://snack.expo.dev/@natorjunior/safeareaview",
    code: `// npm install react-native-safe-area-context

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* conteúdo da tela */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}`
  },
  {
    id: "stack-navigator-setup",
    title: "Instalar Stack Navigator",
    category: "Navegação",
    tags: ["navegação", "navigation", "stack", "instalar", "setup"],
    description: "Instala as dependências necessárias para usar navegação em stack.",
    lang: "bash",
    snack: "",
    code: `npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context`
  },
  {
    id: "stack-navigator-basic",
    title: "Stack de navegação padrão",
    category: "Navegação",
    tags: ["navegação", "navigation", "stack", "rotas", "telas"],
    description: "Estrutura básica de navegação em pilha com duas telas.",
    lang: "jsx",
    snack: "",
    code: `import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`
  },
  {
    id: "stack-navigate-call",
    title: "Navegar entre telas",
    category: "Navegação",
    tags: ["navegação", "navigation", "navigate", "push", "goback"],
    description: "Como navegar, voltar e passar parâmetros entre telas do Stack.",
    lang: "jsx",
    snack: "",
    code: `// Navegar para outra tela
navigation.navigate('Details', { userId: 42 });

// Voltar para a tela anterior
navigation.goBack();

// Ler parâmetros recebidos
const { userId } = route.params;`
  },
  {
    id: "tab-navigator-basic",
    title: "Tab Navigator básico",
    category: "Navegação",
    tags: ["navegação", "tabs", "bottom tabs", "abas"],
    description: "Navegação por abas na parte inferior da tela.",
    lang: "jsx",
    snack: "",
    code: `// npm install @react-navigation/bottom-tabs

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}`
  },
  {
    id: "drawer-navigator-setup",
    title: "Instalar Drawer Navigator",
    category: "Navegação",
    tags: ["navegação", "drawer", "gaveta", "menu lateral", "instalar", "setup"],
    description: "Instala as dependências necessárias para o menu lateral (drawer).",
    lang: "bash",
    snack: "",
    code: `npm install @react-navigation/drawer
npx expo install react-native-gesture-handler react-native-reanimated`
  },
  {
    id: "drawer-navigator-basic",
    title: "Drawer Navigator (menu lateral)",
    category: "Navegação",
    tags: ["navegação", "drawer", "gaveta", "menu lateral"],
    description: "Navegação por menu lateral deslizante.",
    lang: "jsx",
    snack: "",
    code: `import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Perfil" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}`
  },
  {
    id: "nested-navigators",
    title: "Navegadores aninhados (Stack + Tabs)",
    category: "Navegação",
    tags: ["navegação", "aninhado", "nested", "stack", "tabs"],
    description: "Combina um Tab Navigator dentro de um Stack Navigator.",
    lang: "jsx",
    snack: "",
    code: `const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabRoutes} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`
  },
  {
    id: "stack-header-options",
    title: "Customizar header do Stack",
    category: "Navegação",
    tags: ["navegação", "header", "titulo", "options", "customizar"],
    description: "Define título, cores e visibilidade do cabeçalho de cada tela.",
    lang: "jsx",
    snack: "",
    code: `<Stack.Screen
  name="Details"
  component={DetailsScreen}
  options={{
    title: 'Detalhes',
    headerStyle: { backgroundColor: '#6200ee' },
    headerTintColor: '#fff',
    headerShown: true,
  }}
/>`
  },
  {
    id: "use-navigation-hook",
    title: "useNavigation (fora de props)",
    category: "Navegação",
    tags: ["navegação", "usenavigation", "hook"],
    description: "Acessa o objeto de navegação em componentes que não recebem props de tela.",
    lang: "jsx",
    snack: "",
    code: `import { useNavigation } from '@react-navigation/native';

function VoltarButton() {
  const navigation = useNavigation();

  return <Button title="Voltar" onPress={() => navigation.goBack()} />;
}`
  },
  {
    id: "use-route-hook",
    title: "useRoute (ler parâmetros)",
    category: "Navegação",
    tags: ["navegação", "useroute", "hook", "parametros"],
    description: "Lê os parâmetros da rota atual sem precisar da prop route.",
    lang: "jsx",
    snack: "",
    code: `import { useRoute } from '@react-navigation/native';

function DetailsScreen() {
  const route = useRoute();
  const { userId } = route.params;

  return <Text>Usuário: {userId}</Text>;
}`
  },
  {
    id: "flatlist-basic",
    title: "FlatList básica",
    category: "Componentes",
    tags: ["flatlist", "lista", "list", "renderitem"],
    description: "Lista performática para renderizar arrays de dados.",
    lang: "jsx",
    snack: "",
    code: `<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.name}</Text>}
  ListEmptyComponent={<Text>Nenhum item encontrado</Text>}
/>`
  },
  {
    id: "usestate-basic",
    title: "useState básico",
    category: "Hooks",
    tags: ["usestate", "estado", "hook", "state"],
    description: "Controla estado local de um componente.",
    lang: "jsx",
    snack: "",
    code: `import { useState } from 'react';

const [count, setCount] = useState(0);

<Button title="Somar" onPress={() => setCount(count + 1)} />`
  },
  {
    id: "useeffect-basic",
    title: "useEffect básico",
    category: "Hooks",
    tags: ["useeffect", "efeito", "hook", "lifecycle"],
    description: "Executa efeitos colaterais, como chamadas de API, ao montar o componente.",
    lang: "jsx",
    snack: "",
    code: `import { useEffect } from 'react';

useEffect(() => {
  console.log('Componente montado');

  return () => {
    console.log('Componente desmontado');
  };
}, []);`
  },
  {
    id: "touchable-basic",
    title: "Botão pressionável (TouchableOpacity)",
    category: "Componentes",
    tags: ["botão", "touchable", "pressable", "onpress"],
    description: "Componente clicável com efeito de opacidade.",
    lang: "jsx",
    snack: "",
    code: `<TouchableOpacity onPress={() => alert('Clicou!')} style={styles.button}>
  <Text style={styles.buttonText}>Enviar</Text>
</TouchableOpacity>`
  },
  {
    id: "styles-stylesheet",
    title: "StyleSheet padrão",
    category: "Estilização",
    tags: ["estilo", "stylesheet", "css", "layout"],
    description: "Forma recomendada de declarar estilos em React Native.",
    lang: "jsx",
    snack: "",
    code: `import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});`
  },
];
