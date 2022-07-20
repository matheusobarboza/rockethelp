import { useNavigation } from "@react-navigation/native";
import {
  Center, FlatList, Heading, HStack,
  IconButton, Text, useTheme, VStack
} from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import { useEffect, useState } from "react";
import Logo from "../assets/logo_secondary.svg";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";

//VStack empilha os elementos e HStack deixa um do lado do outro

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '123',
      patrimony: '123456',
      when: '18/07/2022 às 10:00',
      status: 'open'
    },
    {
      id: '12345',
      patrimony: '202200',
      when: '19/07/2022 às 19:00',
      status: 'closed'
    },
    {
      id: '122345',
      patrimony: '2022003232',
      when: '19/07/2022 às 20:00',
      status: 'closed'
    },
    {
      id: '2815',
      patrimony: '2815',
      when: '19/07/2022 às 20:00',
      status: 'open'
    },
    {
      id: '2816',
      patrimony: '2816',
      when: '19/07/2022 às 20:00',
      status: 'open'
    },
  ]);
  const [list, setList] = useState<OrderProps[]>(orders)

  useEffect(() => {
    if(statusSelected === 'open'){
      setList(
        orders.filter(item => {
          if(item.status === 'open'){
            return true;
          } else {
            return false;
          }
        })
      )
    } else {
      setList(
        orders.filter(item => {
          if(item.status === 'closed') {
            return true;
          } else {
            return false;
          }
        })
      )
    }
  }, [statusSelected])

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId })
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>

          <Text color="gray.200">{ list.length }</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter 
            type="open" 
            title="em andamento" 
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />

          <Filter 
            type="closed" 
            title="finalizados" 
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        <FlatList 
          data={list}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100
          }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText size={40} color={colors.gray[300]} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui { "\n" }
                solicitações { statusSelected === 'open' ? 'em andamento' : 'finalizadas' }
              </Text>
            </Center>
          )}
        />

        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
