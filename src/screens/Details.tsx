import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { HStack, useTheme, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { OrderProps } from '../components/Order';
import { OrderFirestoreDTO } from '../DTO/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';

interface RouteParams {
  orderId: string;
}

interface OrderDetails extends OrderProps {
  description: string,
  solution: string,
  closed: string
}

export function Details() {
  const [solution, setIsSolution] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const { colors } = useTheme()
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  useEffect(() => {
    setIsLoading(true);

    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, solution, created_at, closed_at } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        });

        setIsLoading(false);
      })
  }, []);

  if(isLoading){
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="solicitação" />
      
      <HStack >

      </HStack>
    </VStack>
  );
}