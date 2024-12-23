import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UseEquipments } from '../custom-hooks/api/equipments/use-equipments';
import { useTitleCase } from '../custom-hooks/misc/use-title-case';
import { router } from 'expo-router';

export default function HomeScreen() {

  const { UseEquipmentsQuery } = UseEquipments();

  const handleRedirectToCreateEquipment = () => {
      router.push("/(screens)/register-equipment");
    };

  return (
    <SafeAreaView className="bg-white flex-1 py-2 px-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Equipos</Text>
        <TouchableOpacity 
          onPress={handleRedirectToCreateEquipment}
          className="bg-blue-500 px-4 py-2 rounded-lg">
          <Text className="text-white font-bold">Nuevo</Text>
        </TouchableOpacity>
      </View>

      <FlatList className='mt-6'
      data={ UseEquipmentsQuery.data } 
      renderItem={
        ({ item }) => (
          <View className="border-b border-gray-300 py-2 flex-row gap-4 items-center">
            <Text className="flex-1 text-center text-sm">{useTitleCase(`${item.nombre}`)}</Text>
            <Text className="flex-1 text-center text-sm">{item.modelo}</Text>
            <Text className="flex-1 text-center font-bold text-sm">{item.numeroSerie}</Text>
            <Text className="flex-1 text-center font-bold text-sm">{item.estadoId}</Text>
          </View>
        )
      }
      ListHeaderComponent={
        <View className="border-b border-gray-300 py-2 flex-row gap-4">
          <Text className="flex-1 text-center font-bold">Nombre</Text>
          <Text className="flex-1 text-center font-bold">Modelo</Text>
          <Text className="flex-1 text-center font-bold">Serie</Text>
          <Text className="flex-1 text-center font-bold">ID de Estado</Text>
        </View>
      } 
      ListEmptyComponent={
        <Text className="text-center mt-4">
          {
            UseEquipmentsQuery.isPending ? 'Cargando...' : 'No hay equipos registrados'
          }
        </Text>
      }
    />

    </SafeAreaView>
  );
}