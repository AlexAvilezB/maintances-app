import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UseWorkers } from '../custom-hooks/api/workers/use-workers';
import { useTitleCase } from '../custom-hooks/misc/use-title-case';
import { router } from 'expo-router';

export default function WorkersScreen() {
  
  const { UseWorkersQuery } = UseWorkers();

  const handleRedirectToCreateWorker = () => {
    router.push("/(screens)/register-worker");
  };

  return (
    <SafeAreaView className="bg-white flex-1 py-2 px-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Trabajadores</Text>
        <TouchableOpacity onPress={
          handleRedirectToCreateWorker
        } className="bg-blue-500 px-4 py-2 rounded-lg">
          <Text className="text-white font-bold">Nuevo</Text>
        </TouchableOpacity>
      </View>

      <FlatList className='mt-6'
        data={ UseWorkersQuery.data } 
        renderItem={
          ({ item }) => (
            <View className="border-b border-gray-300 py-2 flex-row gap-4 items-center text-sm">
              <Text className="flex-1 text-center text-sm">{useTitleCase(`${item.nombre} ${item.apellido}`)}</Text>
              <Text className="flex-1 text-center text-sm">{item.cargo}</Text>
              <Text className={`flex-1 text-center font-bold text-sm ${ item.estadoNombre === 'Activo' ? 'text-green-400' : 'text-red-600' }`}>{item.estadoNombre}</Text>
              <View className="flex-1 gap-4">
                <Text className="flex-1 text-center text-sm">{item.correo}</Text>
                <Text className="flex-1 text-center text-sm">{item.telefono}</Text>
              </View>
            </View>
          )
        }
        ListHeaderComponent={
          <View className="border-b border-gray-300 py-2 flex-row gap-4 text-sm">
            <Text className="flex-1 text-center font-bold">Nombres</Text>
            <Text className="flex-1 text-center font-bold">Cargo</Text>
            <Text className="flex-1 text-center font-bold">Estado</Text>
            <Text className="flex-1 text-center font-bold">Contacto</Text>
          </View>
        } 
        ListEmptyComponent={
          <Text className="text-center mt-4">
            {
              UseWorkersQuery.isPending ? 'Cargando...' : 'No hay trabajadores registrados'
            }
          </Text>
        }
      />

    </SafeAreaView>
  );
}